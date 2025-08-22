module helloworld::helloworld;

use std::string::{Self, String};

public struct HelloWorldObject has key, store {
    id: UID,
    text: String
}


fun init(ctx: &mut TxContext) {
    let object = HelloWorldObject {
        id: object::new(ctx),
        text: string::utf8(b"Hello World!")
    };
    transfer::public_transfer(object, ctx.sender());
}

// public fun mint(ctx: &mut TxContext) {
//     let object = HelloWorldObject {
//         id: object::new(ctx),
//         text: string::utf8(b"Hello World!")
//     };

//     transfer::public_transfer(object, ctx.sender());
// }