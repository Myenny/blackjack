class Hand {
  constructor () {
    this.cards = []
  }

  hit (deck) {
    let card = deck.takeOneCard()

    this.cards.push(card)

    return card
  }

  value () {
    let total = 0
    this.cards.forEach(card => {
      total += card.value
    })

    return total
  }

  busted () {
    return this.value() > 21
  }

  dealerShouldHit () {
    return this.value() < 17
  }
}

class Card {
  constructor (suit, value, face) {
    this.suit = suit
    this.value = value
    this.face = face
  }

  imageDOM () {
    let image = document.createElement('img')
    image.src = this.imageURL()

    return image
  }

  imageURL () {
    return `/images/${this.face}${this.suit}.jpg`
  }
}

class Deck {
  constructor () {
    this.cards = []

    let suits = ['C', 'S', 'D', 'H']
    let cards = [
      { value: 2, face: '2' },
      { value: 3, face: '3' },
      { value: 4, face: '4' },
      { value: 5, face: '5' },
      { value: 6, face: '6' },
      { value: 7, face: '7' },
      { value: 8, face: '8' },
      { value: 9, face: '9' },
      { value: 10, face: '10' },
      { value: 10, face: 'J' },
      { value: 10, face: 'Q' },
      { value: 10, face: 'K' },
      { value: 11, face: 'A' }
    ]

    // loop through all the suits
    suits.forEach(suit => {
      // Do this for each suit

      // For this suit go through the cards
      cards.forEach(card => {
        // make a new card to put in the deck
        let newCardForTheDeck = new Card(suit, card.value, card.face)

        // add it to the deck
        this.cards.push(newCardForTheDeck)
      })
    })

    // Shuffle the deck into a random order
    //
    // Uses [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
    for (let i = 52 - 1; i > 1; i -= 1) {
      let j = Math.floor(Math.random() * i)
      let firstCard = this.cards[i]
      let secondCard = this.cards[j]
      this.cards[i] = secondCard
      this.cards[j] = firstCard
    }
  }

  takeOneCard () {
    let card = this.cards.pop()
    return card
  }
}

// sets deck to an empty array
let deck = new Deck()

// sets dealer hand to an empty array
let dealerHand = new Hand()

// sets player hand to an empty array
let playerHand = new Hand()

// where the player score is displayed
let showPlayer = document.querySelector('.player-score')

// where the dealer score is diplayed
let showDealer = document.querySelector('.dealer-score')

// where message for game status is diplayed
let displayStatus = document.querySelector('.winlose')

let showPlayerValue = () => {
  showPlayer.textContent = playerHand.value()
}

let showDealerValue = () => {
  showDealer.textContent = dealerHand.value()
  checkWinner()
}

// determines who won
const checkWinner = () => {
  if (dealerHand.value() > playerHand.value()) {
    displayStatus.textContent =
      'DEALER HAS ' + `${showDealer.textContent}` + ', YOU LOSE.'
  }

  if (dealerHand.value() < playerHand.value()) {
    displayStatus.textContent =
      'YOU HAVE ' + `${showPlayer.textContent}` + ', YOU WIN!'
  }

  if (dealerHand.value() === playerHand.value()) {
    displayStatus.textContent =
      'YOU BOTH HAVE' + `${showPlayer.textContent}` + ', THE DEALER WINS.'
  }
}

// arguments for the stay button and ends game if dealer busts
const noMore = () => {
  // hides the stay and hit button and back of card image in dealers hand.
  document.querySelector('.hits').classList.add('hideme')
  document.querySelector('.stays').classList.add('hideme')
  document.querySelector('.back').classList.add('hideme')

  dealCardToDealer()
  showDealerValue()

  if (dealerHand.dealerShouldHit()) {
    noMore()
  }

  if (!dealerHand.dealerShouldHit() && !dealerHand.busted()) {
    checkWinner()
  }

  if (dealerHand.busted()) {
    displayStatus.textContent =
      'DEALER BUSTED WITH ' + `${showDealer.textContent}` + ', YOU WIN!'
  }
}

// argument for the hit button and ends game if player busts
const giveMore = () => {
  dealCardToPlayer()
  showPlayerValue()

  if (playerHand.busted()) {
    document.querySelector('.hits').classList.add('hideme')
    document.querySelector('.stays').classList.add('hideme')
    displayStatus.textContent = 'YOU BUSTED, PLAY AGAIN'
  } else {
    displayStatus.textContent =
      'YOU HAVE ' + `${showPlayer.textContent}` + ', HIT OR STAY'
  }
}

const dealCardToPlayer = upOrDown => {
  let card = playerHand.hit(deck)

  // Go find my dealer-hand div
  const playerHandDiv = document.querySelector('.player-hand')

  playerHandDiv.appendChild(card.imageDOM())

  showPlayerValue()
}

const dealCardToDealer = upOrDown => {
  let card = dealerHand.hit(deck)

  // Go find my dealer-hand div
  const dealerHandDiv = document.querySelector('.dealer-hand')

  // Push that image tag into the DIV as a child
  let newCardImage = card.imageDOM()
  dealerHandDiv.appendChild(newCardImage)
}

const main = () => {
  dealCardToPlayer('up')
  dealCardToPlayer('up')
  dealCardToDealer('up')

  // dealCardToDealer('down')
  showPlayerValue()

  // makes the dealer score a ? at the begining
  showDealer.textContent = '?'

  // message for begining of game
  displayStatus.textContent =
    'YOU HAVE ' + `${showPlayer.textContent}` + ', HIT OR STAY'

  // all the event listener for the buttons
  document.querySelector('.hits').addEventListener('click', giveMore)
  document.querySelector('.stays').addEventListener('click', noMore)
  document.querySelector('.reset').addEventListener('click', () => {
    document.location = '/'
  })
}

document.addEventListener('DOMContentLoaded', main)
