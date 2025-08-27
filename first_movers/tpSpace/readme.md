# Basic Information

* Sui Wallet Address: 0x903d678b7972c31068cf49e76981754074fe609e7c9f5e6a70d3fe7a0aa77fb2

* Github: [tpSpace/bau-cua-onchain](https://github.com/tpSpace/bau-cua-onchain)

* Try the game: [https://phenomenal-sunshine-6259d8.netlify.app/en/](https://phenomenal-sunshine-6259d8.netlify.app/en/)

## Personal Introduction

* My email: [nmvkhoi@gmail.com](mailto:nmvkhoi@gmail.com)
* Telegram: @Rocky2077
* Discord: never__settle
* X: [https://x.com/nmvkhoi1](https://x.com/nmvkhoi1)

## Contract Design

### Module Structure

Defined a `bau_cua` module to encapsulate the game logic on the Sui blockchain.

### Data Structures

Created a `Bank` struct to manage game funds:

* id: Unique identifier for the bank object.
* treasury: Stores SUI coins for bets and payouts.
* admin: Address of the contract administrator.

Defined a `PlayEvent` struct to record game outcomes:

* player: Address of the player.
* dice: Vector of three numbers (0–5) for dice rolls.
* total_bet: Total amount bet by the player.
* winnings: Amount won by the player.

### Core Functionalities

Bank Creation (`create_bank`):

* Initializes a shared `Bank` object with an initial SUI coin deposit.
* Sets the transaction sender as the admin.

Admin Withdrawal (`admin_withdraw`):

* Allows the admin to withdraw a specified amount of SUI from the treasury.
* Transfers withdrawn funds to a designated recipient.

Donation (`donate`):

* Permits anyone to contribute SUI coins to the bank’s treasury.

Game Play (`play`):

* Enables players to bet on symbols (0–5) with corresponding amounts using a SUI coin stake.
* Validates bets: ensures symbols are valid (0–5) and stake matches total bet.
* Uses `sui::random` for secure generation of three dice rolls.
* Calculates winnings: 2x the bet amount per matching die, multiplied by the number of matches.
* Updates treasury: keeps the stake and pays out winnings if applicable.
* Emits a `PlayEvent` with game details.

### Security and Validation

* Ensures only the admin can withdraw funds.
* Validates bet inputs (symbol range, stake amount).
* Checks treasury balance before paying winnings.
* Uses domain-separated randomness for fair dice rolls.
