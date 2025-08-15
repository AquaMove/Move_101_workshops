
# Create a hello_world package 
- [ ] write a simple mint Helloworld Object 


- write a `exerice_4` contract

```

public struct Box<T: store> has key, store {
        id: UID,
        value: T
}

public fun create_box<T: store>(value: T,  ctx: &mut TxContext){
     transfer::transfer(Box<T> {id: object::new(ctx), value }, ctx.sender())
}

```



- [ ] Call create_box to create a box

```
sui client call --package your_package_id --module simplebox --function create_box --args object_id --type-args "package::hello_world::HelloWorldObject"
```

- [ ] Store sui tokens in box: 

```
sui client call --package your_package --module simplebox --function create_box --args object_id_coin --type-args "0x2::coin::Coin<0x2::sui::SUI>" 
```

- [ ] Generics Unpacking: Unpack and take out sui, add transfer_value function

```
public fun transfer_value<T: key + store>(box: Box<T>, ctx: &mut TxContext) {
    let Box{
        id,
        value
    }= box;


    transfer::public_transfer<T>(value, tx_context::sender(ctx));
    
    object::delete(id) 
}
```


- [ ] upgrade the contract:  You need to first obtain the UpgradeCap obtained when the contract was first released.

hint: Modify the `move.toml` file and add the `publish-at` parameter to fill in the packageid of the published contract

```
[package]
name = "exercise_4"
version = "0.0.1"
published-at = "your_package_id"
​
[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/mainnet" }
​
[addresses]
generics = "0x0"
```


- [ ] Update the contract and execute the unpacking 

```
sui client call --package your_new_package --module simplebox --function transfer_value  --args 0xfe8f1d8d3ef7b2da414084a331c8f50ab138cd2483dcd2f82500cb1c382a0b39 --type-args "0x2::coin::Coin<0x2::sui::SUI>" --gas-budget 10000000
```

- [ ] Check the wallet address, sui has been transferred back 🤣

