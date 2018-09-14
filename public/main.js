const main = () => {
  let suits = ['clubs', 'spades', 'diamonds', 'hearts']
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

  let deck = []

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

  console.log(deck)
}

document.addEventListener('DOMContentLoaded', main)
