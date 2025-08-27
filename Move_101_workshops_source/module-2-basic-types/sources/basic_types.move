module basic_types::basic_types {
    use std::string::{Self, String};
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// A simple calculator object that demonstrates basic types and functions
    public struct Calculator has key, store {
        id: UID,
        value: u64,
        history: vector<u64>
    }

    /// Error codes
    const EInvalidOperation: u64 = 0;
    const EOverflow: u64 = 1;

    /// Create a new calculator with initial value
    public entry fun create_calculator(initial_value: u64, ctx: &mut TxContext) {
        let calculator = Calculator {
            id: object::new(ctx),
            value: initial_value,
            history: vector::empty()
        };
        transfer::public_transfer(calculator, tx_context::sender(ctx));
    }

    /// Add a number to the current value
    public entry fun add(calculator: &mut Calculator, amount: u64) {
        let new_value = calculator.value + amount;
        vector::push_back(&mut calculator.history, calculator.value);
        calculator.value = new_value;
    }

    /// Subtract a number from the current value
    public entry fun subtract(calculator: &mut Calculator, amount: u64) {
        if (calculator.value < amount) {
            abort EInvalidOperation
        };
        let new_value = calculator.value - amount;
        vector::push_back(&mut calculator.history, calculator.value);
        calculator.value = new_value;
    }

    /// Multiply the current value by a number
    public entry fun multiply(calculator: &mut Calculator, factor: u64) {
        let new_value = calculator.value * factor;
        vector::push_back(&mut calculator.history, calculator.value);
        calculator.value = new_value;
    }

    /// Divide the current value by a number
    public entry fun divide(calculator: &mut Calculator, divisor: u64) {
        if (divisor == 0) {
            abort EInvalidOperation
        };
        let new_value = calculator.value / divisor;
        vector::push_back(&mut calculator.history, calculator.value);
        calculator.value = new_value;
    }

    /// Get the current value
    public fun get_value(calculator: &Calculator): u64 {
        calculator.value
    }

    /// Get the calculation history
    public fun get_history(calculator: &Calculator): vector<u64> {
        calculator.history
    }
}
