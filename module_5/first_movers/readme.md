# Deployment contract info 

```
PackageID: 0x5f7f77a1ac88fccb4274e8ae55d97e4cdd3c89dd3815b4bc3baa5a14fcd9ecdf 
State: 0x315cd1af4437e2e505c63b0286faad16ca0cd7e56bd0f01c9e77a61b1fc5233b
AdminCap: 0xe82cbc3949b9e75f9b7a166a7f4e3faeb9b171bcd5eb461c1a4f571018783db1
UpgradeCap: 0xf51cbfb149f0cb6fdbec0602d0742bc4b4530f77da6b1ce6a6c2e013c054d912
```


Call the `create_profile` function through sui cli:

```
sui client call --package <PACKAGE-ID> --module first_movers --function create_profile --args "Movers" "First Commit" <STATE-ID>
```

you can check it: 

```
sui client object 0x9621f3a03201216469fb9e3cdaef0186ed3b98875621f35f8b4e2cc1a9848b24
[warning] Client/Server api version mismatch, client api version : 1.52.2, server api version : 1.54.1
╭───────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ objectId      │  0x9621f3a03201216469fb9e3cdaef0186ed3b98875621f35f8b4e2cc1a9848b24                                                     │
│ version       │  486818449                                                                                                              │
│ digest        │  4uiuHfktN8EJ7c7utw6X5R2CuTjWVesR4gBrP8ExmjC3                                                                           │
│ objType       │  0x5f7f77a1ac88fccb4274e8ae55d97e4cdd3c89dd3815b4bc3baa5a14fcd9ecdf::first_movers::Profile                              │
│ owner         │ ╭──────────────┬──────────────────────────────────────────────────────────────────────╮                                 │
│               │ │ AddressOwner │  0xb4082d2f32c4ae5ac774cb266d7ffa5d80488fa257c40023e4ec5e4980e121bb  │                                 │
│               │ ╰──────────────┴──────────────────────────────────────────────────────────────────────╯                                 │
│ prevTx        │  5UBdX9jp8FGdQ7j1gCFKLjYzR2XGRYx8pMSNQNDuuSKY                                                                           │
│ storageRebate │  1550400                                                                                                                │
│ content       │ ╭───────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────╮ │
│               │ │ dataType          │  moveObject                                                                                     │ │
│               │ │ type              │  0x5f7f77a1ac88fccb4274e8ae55d97e4cdd3c89dd3815b4bc3baa5a14fcd9ecdf::first_movers::Profile      │ │
│               │ │ hasPublicTransfer │  false                                                                                          │ │
│               │ │ fields            │ ╭─────────────┬───────────────────────────────────────────────────────────────────────────────╮ │ │
│               │ │                   │ │ description │  First Commit                                                                 │ │ │
│               │ │                   │ │ id          │ ╭────┬──────────────────────────────────────────────────────────────────────╮ │ │ │
│               │ │                   │ │             │ │ id │  0x9621f3a03201216469fb9e3cdaef0186ed3b98875621f35f8b4e2cc1a9848b24  │ │ │ │
│               │ │                   │ │             │ ╰────┴──────────────────────────────────────────────────────────────────────╯ │ │ │
│               │ │                   │ │ name        │  Movers                                                                       │ │ │
│               │ │                   │ │ version     │  1                                                                            │ │ │
│               │ │                   │ ╰─────────────┴───────────────────────────────────────────────────────────────────────────────╯ │ │
│               │ ╰───────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────╯ │
╰───────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```


Example contract.tx: 


```ts
export const queryState = async () => {
    const events = await suiClient.queryEvents({
        query: {
            MoveEventType: `${networkConfig.testnet.packageID}::first_movers::ProfileCreated`
        }
    })
    const state:State = {
        users:[]
    }   
    events.data.map((event)=>{
        const user = event.parsedJson as User;
        state.users.push(user);
    })
    return state;
}

export const createProfile = async(name: string, description: string) => {
    const packageID = networkConfig.testnet.packageID;
    const state = networkConfig.testnet.State;
    
    const tx = new Transaction();
    tx.moveCall({
        package: packageID,
        module: "first_movers",
        function: "create_profile",
        arguments: [
            tx.pure.string(name),
            tx.pure.string(description),
            tx.object(state),
        ],
    });
    
    return tx;
}
```
