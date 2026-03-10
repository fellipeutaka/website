# Naming Guidelines

## The Seven Properties of Good Names

### 1. Consistency (Highest Priority)

Same concept = same name everywhere. One name per concept across the codebase.

```typescript
// Bad — three names for the same concept
getUserById(id: string);
fetchCustomerById(id: string);
retrieveClientById(id: string);

// Good — consistent vocabulary
getUser(id: string);
getOrder(id: string);
getProduct(id: string);
```

Establish a project glossary: if "user" is the term, don't use "customer",
"client", "account" interchangeably.

### 2. Intent-Revealing

Names should answer: **why does this exist, what does it do, how is it used?**

```typescript
// Bad — requires reading the implementation to understand
const d = new Date();
const flag = true;
function calc(a: number, b: number) {}

// Good — intent is clear from the name alone
const accountCreatedAt = new Date();
const isEligibleForDiscount = true;
function calculateShippingCost(weight: number, distance: number) {}
```

### 3. Specific

Avoid vague, generic names. If a name could mean anything, it means nothing.

```typescript
// Bad — vague
class DataManager {}
class UserInfo {}
function processData(data: any) {}
function handleEvent(event: Event) {}
const temp = getValue();

// Good — specific
class OrderRepository {}
class UserProfile {}
function validatePaymentDetails(payment: Payment) {}
function onFormSubmit(event: SubmitEvent) {}
const unparsedResponse = getValue();
```

**Names to avoid as class suffixes:** `Manager`, `Handler`, `Processor`, `Data`,
`Info`, `Helper`, `Utils`. They're vague — every class "manages" or "handles"
something.

### 4. Searchable

Names should be unique enough to find with grep/search.

```typescript
// Bad — too common, impossible to search for
const e = getError();
const data = fetch();
const MAX = 100;

// Good — unique, greppable
const validationError = getValidationError();
const orderSummary = fetchOrderSummary();
const MAX_LOGIN_ATTEMPTS = 100;
```

### 5. Brief (But Not Cryptic)

Short names are good only if meaning is preserved. Clarity always wins over
brevity.

```typescript
// Too cryptic
const usrLst = getUsrs();
const genymdhms = generateTimestamp();

// Too verbose
const listOfAllCurrentlyActiveUsersInTheEntireSystem = getActiveUsers();

// Just right
const activeUsers = getActiveUsers();
const timestamp = generateTimestamp();
```

### 6. Pronounceable

You should be able to say the name in conversation without sounding ridiculous.

```typescript
// Bad — try saying these in a code review
const cstmrAddr = getAddress();
const modymdhms = new Date();

// Good
const customerAddress = getAddress();
const modificationTimestamp = new Date();
```

### 7. Honest (No Disinformation)

Don't use names that imply something the code doesn't do.

```typescript
// Bad — it's a Map, not a List
const accountList = new Map<string, Account>();

// Bad — doesn't actually validate, just checks format
function validateEmail(email: string): boolean {
  return email.includes("@"); // Only checks format, not validity
}

// Good
const accountsByName = new Map<string, Account>();

function hasValidEmailFormat(email: string): boolean {
  return email.includes("@");
}
```

---

## Naming Conventions by Type

### Classes and Types

Nouns or noun phrases. Describe **what it is**.

```typescript
// Good
class Invoice {}
class ShippingAddress {}
class PaymentProcessor {} // acceptable — "Processor" is specific here
type OrderStatus = "pending" | "shipped" | "delivered";

// Bad
class DoPayment {}      // verb — should be a function
class AbstractData {}   // vague
class UserManager {}    // what does "manage" mean?
```

### Functions and Methods

Verbs or verb phrases. Describe **what it does**.

```typescript
// Good
function createOrder(data: OrderData): Order {}
function isEligibleForRefund(order: Order): boolean {}
function calculateTax(subtotal: Money): Money {}
async function sendConfirmationEmail(order: Order): Promise<void> {}

// Bad
function order(data: OrderData) {}   // noun — ambiguous
function data(): OrderData {}         // noun — what does this do?
```

### Booleans

Question form — should read naturally in `if` statements.

```typescript
// Good — reads as English
if (user.isActive) {}
if (order.hasItems) {}
if (canProceedToCheckout) {}
if (shouldRetry) {}

// Bad
if (user.active) {}     // adjective, not a question
if (order.items) {}     // truthy check on the array itself
if (checkout) {}        // noun — is this a boolean or an object?
```

### Constants

`UPPER_SNAKE_CASE` for truly global constants. `camelCase` for module-scoped.

```typescript
// Global constants
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 25;
const API_BASE_URL = "https://api.example.com";

// Module-scoped — camelCase is fine
const defaultTimeout = 5000;
const supportedLocales = ["en", "pt", "es"] as const;
```

### Generics

Single letter for simple generics, descriptive for complex ones.

```typescript
// Simple — single letter is fine
function identity<T>(value: T): T {}
function map<T, U>(items: T[], fn: (item: T) => U): U[] {}

// Complex — descriptive names help
interface Repository<TEntity, TId> {
  findById(id: TId): Promise<TEntity | undefined>;
  save(entity: TEntity): Promise<void>;
}

type EventHandler<TEvent extends BaseEvent> = (event: TEvent) => void;
```

---

## Renaming Heuristics

If you struggle to name something, it's often a design problem, not a naming
problem:

| Naming Struggle | Likely Cause |
| --------------- | ------------ |
| Name is too long | Class/function does too much — split it |
| Name uses "And" or "Or" | Multiple responsibilities — split it |
| Can't find a good noun | Maybe it should be a function, not a class |
| Can't find a good verb | Maybe it should be a class, not a function |
| Name is too generic | Unclear responsibility — clarify the role |
