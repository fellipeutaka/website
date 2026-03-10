# Object Calisthenics

Nine exercises by Jeff Bay to improve object-oriented design. Like physical
calisthenics, they're intentionally strict to build muscle. Follow strictly
during practice; relax pragmatically in production code.

---

## Rule 1: One Level of Indentation per Method

Nested indentation hides complexity. Extract inner blocks into well-named
methods.

```typescript
// Violates — multiple levels of nesting
function processOrders(orders: Order[]) {
  for (const order of orders) {
    if (order.isValid()) {
      for (const item of order.items) {
        if (item.inStock) {
          ship(item);
        }
      }
    }
  }
}

// Refactored — one level each
function processOrders(orders: Order[]) {
  orders.filter((o) => o.isValid()).forEach(processOrder);
}

function processOrder(order: Order) {
  order.items.filter((i) => i.inStock).forEach(ship);
}
```

**Why it works:** Forces you to extract methods, which forces you to name
operations, which makes code self-documenting.

---

## Rule 2: Don't Use the `else` Keyword

`else` creates two parallel paths. Prefer early returns, guard clauses, or
polymorphism.

```typescript
// Violates
function getDiscount(user: User): number {
  if (user.isPremium) {
    if (user.yearsActive > 5) {
      return 25;
    } else {
      return 15;
    }
  } else {
    return 0;
  }
}

// Refactored — guard clauses
function getDiscount(user: User): number {
  if (!user.isPremium) return 0;
  if (user.yearsActive > 5) return 25;
  return 15;
}
```

**Techniques:**

- **Early return** — handle edge cases first, then the happy path
- **Ternary** — for simple value selection: `const x = condition ? a : b`
- **Polymorphism** — replace type-checking conditionals with method dispatch
- **Null coalescing** — `value ?? defaultValue`

---

## Rule 3: Wrap All Primitives with Domain Meaning

When a primitive represents a domain concept, wrap it in a value object.
This creates a place for validation, formatting, and behavior.

```typescript
// Primitives — no validation, easy to mix up parameter order
function createUser(email: string, age: number) {}
createUser("25", "alice@test.com" as any); // Oops — swapped!

// Value objects — self-validating, type-safe
class Email {
  readonly value: string;
  constructor(input: string) {
    if (!input.includes("@")) throw new InvalidEmailError(input);
    this.value = input.toLowerCase();
  }
}

class Age {
  readonly value: number;
  constructor(input: number) {
    if (input < 0 || input > 150) throw new InvalidAgeError(input);
    this.value = input;
  }
}

function createUser(email: Email, age: Age) {}
// createUser(new Age(25), new Email("alice@test.com")) — compiler catches the swap
```

**When to wrap:** IDs, emails, money, phone numbers, URLs, coordinates — any
primitive that has validation rules or domain meaning.

**When not to:** Loop counters, simple flags, array indices — internal
implementation details with no domain meaning.

---

## Rule 4: First-Class Collections

Any class that contains a collection should contain no other instance variables.
The collection gets its own class with domain-specific behavior.

```typescript
// Violates — collection mixed with other state
class Order {
  items: OrderItem[] = [];
  customerId: string;

  addItem(item: OrderItem) {
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}

// Refactored — collection is its own class
class OrderItems {
  constructor(private items: OrderItem[] = []) {}

  add(item: OrderItem) {
    this.items = [...this.items, item];
  }

  total(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.lineTotal()),
      Money.zero(),
    );
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  count(): number {
    return this.items.length;
  }
}

class Order {
  constructor(
    private items: OrderItems,
    private customerId: CustomerId,
  ) {}
}
```

**Why it works:** Collection behavior (filtering, summing, validating) gets a
proper home instead of being scattered across consumers.

---

## Rule 5: One Dot per Line (Law of Demeter)

Don't reach through object graphs. Talk only to your immediate friends.

```typescript
// Violates — reaching deep into the chain
const city = order.getCustomer().getAddress().getCity();
const isEligible = user.getSubscription().getPlan().hasFeature("export");

// Refactored — ask the immediate object
const city = order.getShippingCity();
const isEligible = user.canExport();
```

**Allowed calls from a method:**

1. Methods on `this`
2. Methods on parameters
3. Methods on objects created within the method
4. Methods on direct instance variables

**Note:** Fluent APIs and builder patterns are an exception — chaining on `this`
is fine: `builder.setName("x").setAge(5).build()`.

---

## Rule 6: Don't Abbreviate

If a name is too long, the entity probably does too much. Abbreviations hide
design problems.

```typescript
// Abbreviated — saves keystrokes, costs understanding
const custRepo = new CustRepo();
const ord = new Ord();
const calcTtl = (itms: Itm[]) => {};

// Full names — clear and unambiguous
const customerRepository = new CustomerRepository();
const order = new Order();
const calculateTotal = (items: OrderItem[]) => {};
```

**Exception:** Universally understood abbreviations: `id`, `url`, `html`, `css`,
`api`, `http`, `db`, `io`, `os`.

---

## Rule 7: Keep All Entities Small

**Aspirational targets:**

- **Methods:** < 10 lines
- **Classes:** < 50 lines
- **Files:** < 100 lines

If an entity is larger, it's probably doing too much. Split it.

**How to shrink:**

- Extract methods (Rule 1)
- Extract classes (SRP)
- Extract value objects (Rule 3)
- Extract collections (Rule 4)

---

## Rule 8: Limit Instance Variables

Strive for 2-3 instance variables per class. This forces small, focused classes.

```typescript
// Too many — this class does too much
class Order {
  id: string;
  customerId: string;
  items: Item[];
  total: number;
  status: string;
  createdAt: Date;
  shippingAddress: Address;
}

// Refactored — composed of smaller objects
class Order {
  constructor(
    private id: OrderId,
    private details: OrderDetails,
  ) {}
}

class OrderDetails {
  constructor(
    private customer: CustomerId,
    private lineItems: OrderItems,
  ) {}
}
```

**In practice:** 2 is very strict. 3-4 is realistic for most classes. The point
is to notice when a class accumulates too many fields — that's a signal to
extract.

---

## Rule 9: No Getters/Setters

Objects should have behavior, not just expose data. Tell objects what to do
instead of asking for their data and doing it yourself.

```typescript
// Getters/setters — caller does the logic
class Account {
  getBalance(): number { return this.balance; }
  setBalance(value: number) { this.balance = value; }
}

// Caller must know the rules
if (account.getBalance() >= amount) {
  account.setBalance(account.getBalance() - amount);
}

// Behavior-rich — object owns the logic
class Account {
  withdraw(amount: Money): WithdrawResult {
    if (!this.canWithdraw(amount)) {
      return WithdrawResult.insufficientFunds();
    }
    this.balance = this.balance.subtract(amount);
    return WithdrawResult.success(this.balance);
  }

  private canWithdraw(amount: Money): boolean {
    return this.balance.isGreaterThanOrEqual(amount);
  }
}

// Caller tells, object decides
const result = account.withdraw(Money.dollars(50));
```

**In practice:** Some getters are unavoidable (DTOs, serialization, display).
The principle is: if you're getting data to make a decision, that decision
probably belongs inside the object.

---

## Summary Table

| Rule | Strict Target | Pragmatic Guideline |
| ---- | ------------- | ------------------- |
| 1. One indentation level | Strictly one | Max 2 in production |
| 2. No `else` | Zero else keywords | Minimize; use for clarity when needed |
| 3. Wrap primitives | All domain primitives | Wrap when they have validation or behavior |
| 4. First-class collections | Always | When collection has domain behavior |
| 5. One dot per line | Strictly one | Except fluent APIs and builders |
| 6. No abbreviations | Never abbreviate | Allow universal abbreviations (id, url) |
| 7. Small entities | 10/50/100 lines | Keep as small as practical |
| 8. Limited instance vars | Max 2 | 3-4 is realistic |
| 9. No getters/setters | Zero | Minimize; getters OK for display/serialization |
