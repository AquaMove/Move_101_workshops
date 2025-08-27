# Module 3: Capabilities and Access Control

## Overview
This module demonstrates Move's capability system and access control patterns through a user management system.

## Learning Objectives
- Understand Move capabilities and their role in access control
- Learn how to implement admin-only functions
- Master user permission patterns
- Practice capability-based security

## Key Concepts

### 1. Capabilities
Capabilities are special objects that grant permissions to perform specific actions.

```move
public struct AdminCap has key {
    id: UID
}

public struct UserCap has key {
    id: UID,
    user_address: address
}
```

### 2. Access Control Patterns
- **Admin Capability**: Grants administrative privileges
- **User Capability**: Grants user-specific permissions
- **Capability Verification**: Functions check for required capabilities

### 3. State Management
```move
public struct State has key {
    id: UID,
    admin: address,
    user_count: u64,
    version: u64
}
```

### 4. Authorization Checks
```move
assert!(tx_context::sender(ctx) == state.admin, ENotAuthorized);
```

## Functions

### `init(ctx: &mut TxContext)`
- Creates admin capability and global state
- Transfers admin capability to deployer
- Shares state object globally

### `create_user(admin_cap, state, user_address, name, email, ctx)`
- **Admin only**: Creates new user
- Generates user capability and profile
- Transfers objects to user address

### `update_profile(user_cap, profile, new_name, new_email)`
- **User only**: Updates own profile
- Verifies user ownership via capability

### `deactivate_user(admin_cap, state, user_cap, profile)`
- **Admin only**: Deactivates user account

### `reactivate_user(admin_cap, state, user_cap, profile)`
- **Admin only**: Reactivates user account

### `get_user_count(state): u64`
- **Public**: Returns total user count

### `is_user_active(profile): bool`
- **Public**: Checks if user is active

## Security Patterns

### 1. Capability-Based Access Control
- Functions require specific capabilities as parameters
- Capabilities are non-transferable by default
- Prevents unauthorized access

### 2. State Verification
- Functions verify sender against stored admin address
- Ensures only authorized users can perform actions

### 3. Object Ownership
- Objects are transferred to appropriate owners
- Users can only modify their own objects

## Testing
```bash
sui move test
```

## Deployment
```bash
sui client publish --gas-budget 10000000
```

## Next Steps
Proceed to [Module 4: Generics and Collections](../module-4-generics/README.md).
