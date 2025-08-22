module exercise_4::simplebox;

public struct Box<T: store> has key, store {
        id: UID,
        value: T
}

public fun create_box<T: store>(value: T,  ctx: &mut TxContext){
     transfer::transfer(Box<T> {id: object::new(ctx), value }, tx_context::sender(ctx))
}






