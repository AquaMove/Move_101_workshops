// module capabilities::capabilities {
//     use std::string::{Self, String};
//     use sui::object::{Self, UID};
//     use sui::transfer;
//     use sui::tx_context::{Self, TxContext};

//     /// Error codes
//     const ENotAuthorized: u64 = 0;
//     const EUserNotFound: u64 = 1;
//     const EUserAlreadyExists: u64 = 2;

//     /// Admin capability - only the admin can perform certain operations
//     public struct AdminCap has key {
//         id: UID
//     }

//     /// User capability - represents user permissions
//     public struct UserCap has key {
//         id: UID,
//         user_address: address
//     }

//     /// User profile object
//     public struct UserProfile has key, store {
//         id: UID,
//         name: String,
//         email: String,
//         is_active: bool,
//         created_at: u64
//     }

//     /// Global state object
//     public struct State has key {
//         id: UID,
//         admin: address,
//         user_count: u64,
//         version: u64
//     }

//     /// Event emitted when a user is created
//     public struct UserCreated has copy, drop {
//         user_address: address,
//         name: String
//     }

//     /// Initialize the module
//     fun init(ctx: &mut TxContext) {
//         let admin_cap = AdminCap {
//             id: object::new(ctx)
//         };

//         let state = State {
//             id: object::new(ctx),
//             admin: tx_context::sender(ctx),
//             user_count: 0,
//             version: 1
//         };

//         // Transfer admin capability to the deployer
//         transfer::transfer(admin_cap, tx_context::sender(ctx));
        
//         // Share the state object
//         transfer::share_object(state);
//     }

//     /// Create a new user (only admin can do this)
//     public entry fun create_user(
//         admin_cap: &AdminCap,
//         state: &mut State,
//         user_address: address,
//         name: String,
//         email: String,
//         ctx: &mut TxContext
//     ) {
//         // Verify admin
//         assert!(tx_context::sender(ctx) == state.admin, ENotAuthorized);

//         let user_cap = UserCap {
//             id: object::new(ctx),
//             user_address
//         };

//         let user_profile = UserProfile {
//             id: object::new(ctx),
//             name: name,
//             email: email,
//             is_active: true,
//             created_at: tx_context::epoch(ctx)
//         };

//         // Transfer user capability to the user
//         transfer::transfer(user_cap, user_address);
        
//         // Transfer profile to the user
//         transfer::transfer(user_profile, user_address);

//         // Update state
//         state.user_count = state.user_count + 1;
//     }

//     /// Update user profile (only the user can update their own profile)
//     public entry fun update_profile(
//         user_cap: &UserCap,
//         profile: &mut UserProfile,
//         new_name: String,
//         new_email: String
//     ) {
//         // Verify the user owns this profile
//         assert!(tx_context::sender(tx_context::dummy_context()) == user_cap.user_address, ENotAuthorized);
        
//         profile.name = new_name;
//         profile.email = new_email;
//     }

//     /// Deactivate user (only admin can do this)
//     public entry fun deactivate_user(
//         admin_cap: &AdminCap,
//         state: &mut State,
//         user_cap: &UserCap,
//         profile: &mut UserProfile
//     ) {
//         // Verify admin
//         assert!(tx_context::sender(tx_context::dummy_context()) == state.admin, ENotAuthorized);
        
//         profile.is_active = false;
//     }

//     /// Reactivate user (only admin can do this)
//     public entry fun reactivate_user(
//         admin_cap: &AdminCap,
//         state: &mut State,
//         user_cap: &UserCap,
//         profile: &mut UserProfile
//     ) {
//         // Verify admin
//         assert!(tx_context::sender(tx_context::dummy_context()) == state.admin, ENotAuthorized);
        
//         profile.is_active = true;
//     }

//     /// Get user count (public read function)
//     public fun get_user_count(state: &State): u64 {
//         state.user_count
//     }

//     /// Check if user is active
//     public fun is_user_active(profile: &UserProfile): bool {
//         profile.is_active
//     }

//     /// Get user profile info
//     public fun get_user_info(profile: &UserProfile): (String, String, bool, u64) {
//         (profile.name, profile.email, profile.is_active, profile.created_at)
//     }
// }
