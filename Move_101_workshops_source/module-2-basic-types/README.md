# Module 2: Basic Types and Functions

## Overview
This module explores Move's basic data types, functions, and control flow through a calculator application.

## Learning Objectives
- Master Move primitive types (u64, vector, etc.)
- Understand function signatures and visibility
- Learn error handling with `abort`
- Practice mutable and immutable references

## Key Concepts

### 1. Basic Types
```move
// Primitive types
u64: unsigned 64-bit integer
vector<T>: dynamic array
String: UTF-8 string
```

### 2. Struct Definition
```move
public struct Calculator has key, store {
    id: UID,
    value: u64,
    history: vector<u64>
}
```

### 3. Function Types
- `public entry fun`: Callable from transactions
- `public fun`: Callable from other modules
- `fun`: Private function

### 4. Error Handling
```move
const EInvalidOperation: u64 = 0;

if (divisor == 0) {
    abort EInvalidOperation
};
```

## Functions

### `create_calculator(initial_value: u64, ctx: &mut TxContext)`
- Creates a new calculator with initial value
- Transfers ownership to caller

### `add(calculator: &mut Calculator, amount: u64)`
- Adds amount to current value
- Stores previous value in history

### `subtract(calculator: &mut Calculator, amount: u64)`
- Subtracts amount from current value
- Aborts if result would be negative

### `multiply(calculator: &mut Calculator, factor: u64)`
- Multiplies current value by factor

### `divide(calculator: &mut Calculator, divisor: u64)`
- Divides current value by divisor
- Aborts if divisor is zero

### `get_value(calculator: &Calculator): u64`
- Returns current calculator value

### `get_history(calculator: &Calculator): vector<u64>`
- Returns calculation history

## Vector Operations
- `vector::empty()`: Create empty vector
- `vector::push_back(&mut vec, value)`: Add element
- `vector::clear(&mut vec)`: Remove all elements
- `vector::length(&vec)`: Get vector size

## Testing
```bash
sui move test
```

## Deployment
```bash
sui client publish --gas-budget 10000000
```

## Next Steps
Proceed to [Module 3: Capabilities and Access Control](../module-3-capabilities/README.md).
