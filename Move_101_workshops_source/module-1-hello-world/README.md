# Module 1: Hello World

## Overview
This module introduces the basic concepts of Sui Move development by creating a simple "Hello World" application.

## Learning Objectives
- Understand basic Move module structure
- Learn about object creation and UID
- Master the `store` capability
- Practice public transfer patterns

## Key Concepts

### 1. Module Structure
```move
module hello_world::hello_world {
    // Module contents
}
```

### 2. Object Definition
```move
public struct HelloWorldObject has key, store {
    id: UID,
    text: String
}
```

### 3. Capabilities
- `key`: Allows the struct to be used as an object
- `store`: Allows the struct to be stored in global storage

### 4. Object Creation
```move
let object = HelloWorldObject {
    id: object::new(ctx),
    text: string::utf8(b"Hello World!")
};
```

## Functions

### `init(ctx: &mut TxContext)`
- Automatically called when the module is published
- Creates and transfers the first HelloWorldObject

### `mint(ctx: &mut TxContext)`
- Public entry function to create new HelloWorldObject
- Transfers the object to the caller

## Testing
Run tests with:
```bash
sui move test
```

## Deployment
Deploy to testnet:
```bash
sui client publish --gas-budget 10000000
```

## Next Steps
After completing this module, proceed to [Module 2: Basic Types and Functions](../module-2-basic-types/README.md).
