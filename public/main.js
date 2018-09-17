let dealerHand = []
let playerHand = []
let deck = []
let playerTotal = 0
let dealerTotal = 0

let countPlayerTotal = () => {
  if (playerHand.length === 2) {
    playerTotal = playerHand[0].value + playerHand[1].value
    document.querySelector(
      '.playertotal'
    ).textContent = `Total = ${playerTotal}`
  }

  if (playerHand.length === 3) {
    playerTotal =
      playerHand[0].value + playerHand[1].value + playerHand[2].value
    document.querySelector(
      '.playertotal'
    ).textContent = `Total = ${playerTotal}`
  }

  if (playerHand.length === 4) {
    playerTotal =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value
    document.querySelector(
      '.playertotal'
    ).textContent = `Total = ${playerTotal}`
  }

  if (playerHand.length === 5) {
    playerTotal =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value +
      playerHand[4].value
    document.querySelector(
      '.playertotal'
    ).textContent = `Total = ${playerTotal}`
  }
}

let countDealerTotal = () => {
  if (dealerHand.length === 2) {
    dealerTotal = dealerHand[0].value + dealerHand[1].value
  }

  if (dealerHand.length === 3) {
    dealerTotal =
      dealerHand[0].value + dealerHand[1].value + dealerHand[2].value
  }

  if (dealerHand.length === 4) {
    dealerTotal =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value
  }

  if (dealerHand.length === 5) {
    dealerTotal =
      dealerHand[0].value +
      dealerHand[1].value +
      dealerHand[2].value +
      dealerHand[3].value +
      dealerHand[4].value
  }
}

const dealCardToPlayer = upOrDown => {
  // Take one card from the deck
  let card = deck.pop()

  // Place that card in the dealer's hand
  playerHand.push(card)

  // Go find my dealer-hand div
  const playerHandDiv = document.querySelector('.player-hand')

  // Make a new image tag in memory
  let image = document.createElement('img')

  // Tell that image tag where it's image is. We do this dynamically
  // based on the face and the suit
  image.src = `/images/${card.face}${card.suit}.jpg`

  // Push that image tag into the DIV as a child
  playerHandDiv.appendChild(image)
}

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

const winnerDeclared = () => {
  let winDeclareStatement = document.querySelector('.outcome')

  countDealerTotal()
  countPlayerTotal()

  if (dealerTotal !== 0 && playerTotal !== 0) {
    if (dealerTotal >= 22) {
      winDeclareStatement.textContent =
        'Dealer Busts with ' + `${dealerTotal}` + '.You Win!'
    }

    if (dealerTotal > playerTotal && dealerTotal <= 21) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerTotal}` + '. You Lose'
    }

    if (dealerTotal < playerTotal) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerTotal}` + '. You Win!'
    }

    if (dealerTotal === playerTotal) {
      winDeclareStatement.textContent =
        'Dealer has ' + `${dealerTotal}` + '. You Lose'
    }
  }
}

playerChoseToHit = () => {
  dealCardToPlayer()
  countPlayerTotal()
  if (playerTotal >= 22) {
    document.querySelector('.outcome').textContent = 'You Bust. Dealer Wins!'
    document.querySelector('.hitbutton').classList.add('hide-button')
    document.querySelector('.staybutton').classList.add('hide-button')
  }
}

let dealerUnderSeventeen = () => {
  if (dealerTotal < 17) {
    dealCardToDealer()
    winnerDeclared()
  }
}

playerChoseToStay = () => {
  document.querySelector('.hide').classList.add('hidden')
  document.querySelector('.hitbutton').classList.add('hide-button')
  document.querySelector('.staybutton').classList.add('hide-button')

  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()
  dealerUnderSeventeen()

  if (dealerTotal >= 17 && dealerTotal <= 21) {
    winnerDeclared()
  }

  if (dealerTotal >= 22) {
    winnerDeclared()
  }
}
// If player hand is great than 21 player loses

// If player stays dealers needs a hand better than players

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

  dealCardToPlayer('up')
  dealCardToPlayer('up')
  countPlayerTotal()

  let playerHit = document.querySelector('.hitbutton')
  playerHit.addEventListener('click', playerChoseToHit)

  let playerStay = document.querySelector('.staybutton')
  playerStay.addEventListener('click', playerChoseToStay)

  document
    .querySelector('.hitbutton')
    .addEventListener('click', dealCardToPlayer)

  document
    .querySelector('.hitbutton')
    .addEventListener('click', countPlayerTotal)

  document.querySelector('.staybutton').addEventListener('click, stayButton')

  document.querySelector('.new-game').addEventListener('click', () => {
    document.location = '/'
  })
}

document.addEventListener('DOMContentLoaded', main)
