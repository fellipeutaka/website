# Code Smells & Refactoring

Code smells are indicators that something may need refactoring. Not bugs — the
code works — but design friction that makes code hard to understand, change,
or test.

## The Five Categories

### 1. Bloaters — Code That Grew Too Large

#### Long Method

**Symptom:** Method > 20 lines, doing multiple things.

```typescript
// Smell
function processOrder(order: Order) {
  // Validate
  if (!order.items.length) throw new Error("Empty order");
  if (!order.customer) throw new Error("No customer");
  for (const item of order.items) {
    if (item.quantity <= 0) throw new Error("Invalid quantity");
  }

  // Calculate total
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
    if (item.discount) subtotal -= item.discount;
  }

  // Apply tax
  const taxRate = getTaxRate(order.customer.state);
  const total = subtotal * (1 + taxRate);

  // Save
  db.orders.insert({ ...order, total });

  // Notify
  emailService.send(order.customer.email, "Order confirmed");
}

// Refactored — each step is a focused function
function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order);
  saveOrder(order, total);
  notifyCustomer(order);
}
```

#### Large Class

**Symptom:** Class with many unrelated responsibilities.

```typescript
// Smell — god class
class User {
  // Identity
  name: string;
  email: string;

  // Auth
  login() {}
  logout() {}
  resetPassword() {}

  // Preferences
  setTheme() {}
  setLanguage() {}

  // Notifications
  sendEmail() {}
  sendSMS() {}

  // Billing
  charge() {}
  refund() {}
}

// Refactored — each concern is its own class
class User { name: string; email: string; }
class AuthService { login(); logout(); resetPassword(); }
class UserPreferences { setTheme(); setLanguage(); }
class NotificationService { sendEmail(); sendSMS(); }
class BillingService { charge(); refund(); }
```

#### Primitive Obsession

**Symptom:** Using raw strings/numbers for domain concepts.

```typescript
// Smell — primitives everywhere
function createUser(email: string, age: number, zipCode: string) {
  if (!email.includes("@")) throw new Error("Invalid email");
  if (age < 0 || age > 150) throw new Error("Invalid age");
  // Validation scattered, easy to pass wrong values
}

// Refactored — value objects enforce validity at construction
class Email {
  constructor(private value: string) {
    if (!value.includes("@")) throw new InvalidEmailError(value);
  }
  toString() { return this.value; }
}

class Age {
  constructor(private value: number) {
    if (value < 0 || value > 150) throw new InvalidAgeError(value);
  }
}

function createUser(email: Email, age: Age) {
  // Types guarantee validity — no defensive checks needed
}
```

---

### 2. Object-Orientation Abusers

#### Switch Statements on Type

**Symptom:** Same switch/if-else on a type field appears in multiple places.

```typescript
// Smell — duplicated type dispatch
function getArea(shape: { type: string; radius?: number; width?: number; height?: number }) {
  switch (shape.type) {
    case "circle": return Math.PI * shape.radius! ** 2;
    case "rectangle": return shape.width! * shape.height!;
  }
}

function getPerimeter(shape: { type: string; radius?: number; width?: number; height?: number }) {
  switch (shape.type) { // Same switch AGAIN
    case "circle": return 2 * Math.PI * shape.radius!;
    case "rectangle": return 2 * (shape.width! + shape.height!);
  }
}

// Refactored — polymorphism eliminates all switches
interface Shape {
  getArea(): number;
  getPerimeter(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  getArea() { return Math.PI * this.radius ** 2; }
  getPerimeter() { return 2 * Math.PI * this.radius; }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  getArea() { return this.width * this.height; }
  getPerimeter() { return 2 * (this.width + this.height); }
}
```

---

### 3. Change Preventers

#### Divergent Change

**Symptom:** One class gets modified for many different reasons.

If you change the class for database reasons AND for business rule reasons AND
for UI reasons — it has divergent change. Apply SRP: split by reason to change.

#### Shotgun Surgery

**Symptom:** One change requires editing many files.

The opposite of divergent change. Related logic is scattered. Move it together
into a cohesive module.

---

### 4. Dispensables

#### Dead Code

**Symptom:** Unreachable code, unused variables, commented-out blocks.

**Fix:** Delete it. Git remembers everything.

#### Speculative Generality

**Symptom:** Abstractions, parameters, or classes built "just in case."

```typescript
// Smell — built for hypothetical future needs
interface PaymentProcessor {
  process(): void;
  rollback(): void;          // not used
  audit(): void;              // not used
  generateReport(): void;     // not used
  scheduleRecurring(): void;  // not used
}

// Refactored — only what's needed NOW
interface PaymentProcessor {
  process(): void;
}
// Add methods when actually needed (YAGNI)
```

---

### 5. Couplers

#### Feature Envy

**Symptom:** A method uses another class's data more than its own.

```typescript
// Smell — Order envies Customer
class Order {
  calculateShipping(customer: Customer): number {
    if (customer.country === "US") {
      if (customer.state === "CA") return 10;
      return 15;
    }
    return 25;
  }
}

// Refactored — move behavior to where the data lives
class Customer {
  getShippingCost(): number {
    if (this.country === "US") {
      if (this.state === "CA") return 10;
      return 15;
    }
    return 25;
  }
}

class Order {
  calculateShipping(): number {
    return this.customer.getShippingCost();
  }
}
```

#### Message Chains (Law of Demeter)

**Symptom:** `a.getB().getC().getD().doSomething()`

```typescript
// Smell — reaching deep into object graphs
const city = order.getCustomer().getAddress().getCity();

// Refactored — ask immediate friend
const city = order.getShippingCity();
```

#### Inappropriate Intimacy

**Symptom:** Classes access each other's private internals.

```typescript
// Smell — Order reaches into Inventory internals
class Order {
  process() {
    const stock = this.inventory.stockLevels[this.item.sku];
    stock.quantity -= this.quantity; // Directly mutating!
  }
}

// Refactored — tell, don't ask
class Inventory {
  reserve(sku: string, quantity: number): ReserveResult {
    // Inventory manages its own state
  }
}

class Order {
  process(inventory: Inventory) {
    inventory.reserve(this.item.sku, this.quantity);
  }
}
```

---

## When to Refactor

1. **When it's in your path** — you're already touching that code
2. **When it's blocking a new feature** — the smell is in the way
3. **When it's causing bugs** — design problems become runtime problems
4. **Boy Scout Rule** — leave code better than you found it

## When NOT to Refactor

- Code that works and won't change
- Code being replaced soon
- No test coverage (write tests first, then refactor)
