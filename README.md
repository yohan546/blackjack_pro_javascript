# Blackjack Pro

## Background and Overview
Blackjack Pro is a blackjack Ssmulator to help practice your skills and profit from your next visit to a casino! 
Play against the dealer to see how well or bad you would do at a casino. 

## Functionality and MVP's
### app will display..
* your soft/hard count 
* your chip stack
* your current bet 
* options for how much to bet
* options to split and double down
* options to hit or stand buttons 
* dealers soft/hard count
### MVPS
* Generate 6 decks and assign card values per game 
* blackjack game functionality
* dealer and user player
* betting functionality
* UI/UX design of app 

## Wireframes and File Structure 
![blackjack_wireframe](https://user-images.githubusercontent.com/76585985/113590703-f5076100-9600-11eb-9924-e171849834a7.png)

* /dist 
…
* /src
* * /index.js
* * /js
* * * Game.js
* * * Dealer.js 
* * * Player.js
* * * Cards.js
* * * Chips.js
* * * Chip_card_count.js
* * * Sidebar.js 
* Index.html
* .gitignore
* node_modules
* package.json
* package.lock.json
* postcss.config.js
* README.md
* webpack.common.js
* webpack.dev.js
* webpack.prod.js

## Architecture and Technology
I will implement the deck of cards api from http://deckofcardsapi.com/.
This simulator will implement 6 deck of cards per game. 

## Timplmentation Timeline
### Day 1 
* generate deck and assign card values 

## Day 2 
* start game functionality in game.js 

## Day 3 
* finish game functionality and add dealer and self player 

## Day 4 
* add betting functionality 

## Day 5 
* work on ui/ux design and how game will be displayed 


