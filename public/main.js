let dealerHand = []
let playerHand = []
let deck = []

const dealCardToDealer = upOrDown => {
  // Take one card from the deck
  let card = deck.pop()

  // Place that card in the dealer's hand
  dealerHand.push(card)

  // Go find my dealer-hand div
  const dealerHandDiv = document.querySelector('.dealer-hand')

  // Make a new image tag in memory
  let image = document.createElement('img')

  // Tell that image tag where it's image is. We do this dynamically
  // based on the face and the suit
  image.src = `/images/${card.face}${card.suit}.jpg`

  if (upOrDown === 'down') {
    // Do something to display this card down
    image.src = `/img/cardback.png`
  }

  // Push that image tag into the DIV as a child
  dealerHandDiv.appendChild(image)
}

const main = () => {
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
      let newCardForTheDeck = {
        suit: suit,
        value: card.value,
        face: card.face
      }

      // add it to the deck
      deck.push(newCardForTheDeck)
    })
  })

  // Shuffle the deck into a random order
  //
  // Uses [Fisher–Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)
  for (let i = 52 - 1; i > 1; i -= 1) {
    let j = Math.floor(Math.random() * i)
    let firstCard = deck[i]
    let secondCard = deck[j]
    deck[i] = secondCard
    deck[j] = firstCard
  }

  dealCardToDealer('up')
  dealCardToDealer('down')

  document.querySelector('button').addEventListener('click', dealCardToDealer)

  document.querySelector('.new-game').addEventListener('click', () => {
    document.location = '/'
  })
}

document.addEventListener('DOMContentLoaded', main)
