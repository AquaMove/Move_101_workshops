# Basic Information

Sui Wallet Address: olysui.sui

Github: Olympusxvn


# Personal Introduction 
Your email: vo.q.cuong@gmail.com
Contact(Telegram, Discord, X): 
- Tele: @rollonguyen
- Discord: olympusxvn
- X: olympusxvn


# Coin Flip PVP Dapp – How It Works on Sui Move

I. Goal of the Dapp
Two players (A and B) join the app and each bet 1 SUI to play a coin flip game.
The winner receives (2 SUI – 1% fee).
The Dapp owner collects a 1% fee from the total pot.

II. Basic Structure
Inside the Move module, we define three important parts:
1. struct Game
Stores information about a game session:
player1: address of the game creator.
bet_amount: amount each player must bet (e.g., 1 SUI).
house_fee: percentage fee collected by the Dapp owner (e.g., 1%).
This struct represents the “game room” that another player can join.

2. Create_game function

Player A creates a new game.
The system stores a Game object with:
A’s address
bet amount (1 SUI)
house fee (1%).

3. flip function
Player B joins the created game.
B also deposits 1 SUI.
The total pot = 2 SUI.
The system flips a coin (50/50 random).
Winner receives (2 SUI – fee).
Loser receives nothing.
Fee is deducted and sent to the Dapp owner’s address.
The game ends and the Game object is destroyed.

III. Full Workflow

1. Player A creates the game
Call create_game(ctx, bet_amount).
Example: A creates a game with 1 SUI.
A Game object is stored in on-chain state, visible to anyone.

2. Player B joins the game
Call flip(ctx, game_id) with 1 SUI.
The module receives:
1 SUI from A (locked when game was created).
1 SUI from B (just sent).
Total pot = 2 SUI.

3. Coin flip (random)
The module generates a pseudo-random number using the transaction digest.
Result = 0 or 1 (50/50 chance).

4. Payout
If coin = 0 → A wins.
If coin = 1 → B wins.
Winner receives: 2 SUI – 1% fee = 1.98 SUI.
Fee = 0.02 SUI is transferred to the Dapp owner’s fixed address.

5. Game ends
The Game object is deleted (or marked as finished).
No one can flip again.


IV. Summary
A creates game
B joins
Coin is flipped
Winner gets prize (after fee deduction)
Dapp owner gets fee
Game closes



