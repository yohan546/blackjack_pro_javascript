const Cards = require("./cards")
const Player = require("./player")
const Dealer = require("./dealer")

function Game() {
    debugger 
    this.deck = new Cards();
    this.player = new Player();
    this.dealer = new Dealer();
    this.currentDeal = this.player; 
}

Game.prototype.playerBet = function() {
    const currentChips = player.chipStack 

    

}

Game.prototype.countValue = function(currentPlayer) {
    currentPlayer.cardsValue = 0
    const cards = currentPlayer.currentCards;

    debugger
    //at intital count, Aces will value as 11 representing a 'soft' count 
    for (i = 0; i < cards.length; i++) {
        const faceCardValue = null;
        const card = cards[i][0];

        if (Number.isInteger(card[0])) {
            currentPlayer.cardsValue += card[0];            
        } else {
            faceCardValue = FACECARDVALUES[card[0]];
            if (Array.isArray(faceCardValue)) {
                currentPlayer.cardsValue += faceCardValue[0]
            } else {
                currentPlayer.cardsValue += faceCardValue 
            }
        }
    }

    //if the count goes over 21 with an ace, the ace will value as 2 representing a 'hard' count
    for (n = 0; n < cards.length; n++) {
        const isAce = cards[n];
        if (currentPlayer.cardsValue > 21 && isAce[0] === "A") {
            aceValues = FACECARDVALUES[isAce[0]]
            currentPlayer.cardsValue -= aceValues[0];
            currentPlayer.cardsValue += aceValues[1];
        }
    }

    return currentPlayer.cardsValue 
}

Game.prototype.switchDeal = function () {
    if (this.currentDeal === this.player) {
        this.currentDeal = this.dealer
    } 
}

Game.prototype.dealCard = function() {
    const card = this.deck.drawCard();
    this.currentDeal.currentCards.push(card);
    this.countValue(this.currentDeal);
}

//at initalDeal, cards at dealt alternating between player and dealer
//player gets dealt first and ends with the dealer 
Game.prototype.initialDeal = function() {
    while (this.dealer.currentCards.length < 2) {
        this.dealCard();
        this.switchDeal();
    }
}


module.exports = Game;