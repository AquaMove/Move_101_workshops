# Basic Information

- Sui Wallet Address: 222tee.sui
- Dev address: 0x4e4ab932a358e66e79cce1d94457d50029af1e750482ca3619ea3dd41f1c62b4
- Github: teededung

# Personal Introduction

- Email: rongmauhong@protonmail.com
- Tele: @rongmauhong
- X: https://x.com/teelevelup

# Give your hash digest:

https://testnet.suivision.xyz/txblock/9iD6QR6q2jBDASM6YaqPeoa9otwzx96y849YnYvT7kr9

## Deployment and Usage Examples

### Publish Wheel Contract

```
sui client publish --gas-budget 100000000
```

Published package ID: `0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09`

### Example Entries by SUI Address

```
0x4e4ab932a358e66e79cce1d94457d50029af1e750482ca3619ea3dd41f1c62b4
0x860de660df6f748354e7a6d44b36d302f9dbe70938b957837bf8556d258ca35f
```

### Create Wheel & Share Wheel Object

```
sui client ptb \
  --make-move-vec "<address>" "[@0x4e4ab932a358e66e79cce1d94457d50029af1e750482ca3619ea3dd41f1c62b4, @0x860de660df6f748354e7a6d44b36d302f9dbe70938b957837bf8556d258ca35f]" \
  --assign entries \
  --make-move-vec "<u64>" "[2000000000]" \
  --assign prize_amounts \
  --assign delay_ms 0 \
  --assign claim_window_ms 0 \
  --move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::create_wheel entries prize_amounts delay_ms claim_window_ms \
  --assign wheel \
  --move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::share_wheel wheel \
  --gas-budget 100000000
```

### Donate 2 SUI to Wheel's Pool

```
sui client ptb \
--split-coins gas "[2000000000]" \
--assign donation_coin \
--move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::donate_to_pool @<WHEEL_OBJECT_ID> donation_coin \
--gas-budget 100000000
```

### Spin

```
sui client ptb \
--move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::spin_wheel @<WHEEL_OBJECT_ID> @0x8 @0x6 \
--gas-budget 100000000
```

### Claim Prize

Remember to switch wallet to winner.

```
sui client ptb \
--move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::claim_prize @<WHEEL_OBJECT_ID> @0x6 \
--assign claimed_coin \
--merge-coins gas "[claimed_coin]" \
--gas-budget 100000000
```

### Reclaim Pool (Only for Organizer)

```
sui client ptb \
--move-call 0x70b44c598b4bffa29dc75e99fb03ebeee93bfbd3ef34066086a57d1b524a7f09::sui_wheel::reclaim_pool @<WHEEL_OBJECT_ID> @0x6 \
--assign claimed_coin \
--merge-coins gas "[claimed_coin]" \
--gas-budget 100000000
```
