function Cards () {
    this.fullDeck = []

    this.addDecks();
}

SINGLEDECK = [
    [2, 'diamond'],[2, 'heart' ],[2, 'spade'],[2, 'clover'],
    [3, 'diamond'],[3, 'heart' ],[3, 'spade'],[3, 'clover'],
    [4, 'diamond'],[4, 'heart' ],[4, 'spade'],[4, 'clover'],
    [5, 'diamond'],[5, 'heart' ],[5, 'spade'],[5, 'clover'],
    [6, 'diamond'],[6, 'heart' ],[6, 'spade'],[6, 'clover'],
    [7, 'diamond'],[7, 'heart' ],[7, 'spade'],[7, 'clover'],
    [8, 'diamond'],[8, 'heart' ],[8, 'spade'],[8, 'clover'],
    [9, 'diamond'],[9, 'heart' ],[9, 'spade'],[9, 'clover'],
    [10,'diamond'],[10,'heart' ],[10,'spade'],[10,'clover'],
    ['J', 'diamond'],['J', 'heart' ],['J', 'spade'],['J', 'clover'],
    ['Q', 'diamond'],['Q', 'heart' ],['Q', 'spade'],['Q', 'clover'],
    ['K', 'diamond'],['K', 'heart' ],['K', 'spade'],['K', 'clover'],
    ['A', 'diamond'],['A', 'heart' ],['A', 'spade'],['A', 'clover']
]

FACECARDVALUES = {
    "J": 10,
    "Q": 10,
    "K": 10,
    "A": [11,1]
}

Cards.DIM_X = 100
Cards.DIM_Y = 150

//This blackjack app will use a total of 6 full deck of cards
Cards.prototype.addDecks = function () {

    for (let i = 0; i < SINGLEDECK.length; i += 1) {
        const singleCard = SINGLEDECK[i]

        for (let n = 1; n <= 6; n += 1) {
            this.fullDeck.push(singleCard)
        }
    }

    return this.fullDeck;
}

//this function will draw a random card and remove that card from the current deck
Cards.prototype.drawCard = function () {
    const cardIndex = Math.floor(Math.random() * this.fullDeck.length);

    return this.fullDeck.splice(cardIndex, 1)
}

//deck gets reshuffled when approximately 60% of the cards have been dealt (312cards / 0.4 = 124.8cards)
Cards.prototype.shuffleDeck = function () {
    
    if (this.fullDeck.length <= 125) {
        this.fullDeck = []
        this.fullDeck.addDecks();
    }
}



module.exports = Cards;
