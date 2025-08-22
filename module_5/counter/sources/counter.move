module counter::counter;

// 1. Track the current version of the module 
const VERSION: u64 = 1;
const EWrongVersion: u64 = 1;

public struct Counter has key {
    id: UID,
    owner: ID,
    value: u64,
    version: u64
}

public struct AdminCap has key {
        id: UID,
}


fun init(ctx: &mut TxContext) {
        
    let admin = AdminCap {
            id: object::new(ctx),
    };

    transfer::share_object(Counter {
            id: object::new(ctx),
            owner: object::id(&admin),
            value: 0,
            version: VERSION
    });

    transfer::share_object(admin);
}


public fun increment(counter: &mut Counter) {
        counter.value = counter.value + 1;
}

public fun set_value(counter: &mut Counter, value: u64, ctx: &TxContext) {
   assert!(counter.version == VERSION, EWrongVersion);
        counter.value = value;
}

public entry fun value(counter: &Counter): u64 {
        counter.value
}



