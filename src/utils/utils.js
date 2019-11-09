import Club_A from '../assets/img/cards/A_Clubs.svg'
import Club_2 from '../assets/img/cards/2_Clubs.svg'
import Club_3 from '../assets/img/cards/3_Clubs.svg'
import Club_4 from '../assets/img/cards/4_Clubs.svg'
import Club_5 from '../assets/img/cards/5_Clubs.svg'
import Club_6 from '../assets/img/cards/6_Clubs.svg'
import Club_7 from '../assets/img/cards/7_Clubs.svg'
import Club_8 from '../assets/img/cards/8_Clubs.svg'
import Club_9 from '../assets/img/cards/9_Clubs.svg'
import Club_10 from '../assets/img/cards/10_Clubs.svg'
import Club_J from '../assets/img/cards/J_Clubs.svg'
import Club_Q from '../assets/img/cards/Q_Clubs.svg'
import Club_K from '../assets/img/cards/K_Clubs.svg'
import Diamond_A from '../assets/img/cards/A_Diamonds.svg'
import Diamond_2 from '../assets/img/cards/2_Diamonds.svg'
import Diamond_3 from '../assets/img/cards/3_Diamonds.svg'
import Diamond_4 from '../assets/img/cards/4_Diamonds.svg'
import Diamond_5 from '../assets/img/cards/5_Diamonds.svg'
import Diamond_6 from '../assets/img/cards/6_Diamonds.svg'
import Diamond_7 from '../assets/img/cards/7_Diamonds.svg'
import Diamond_8 from '../assets/img/cards/8_Diamonds.svg'
import Diamond_9 from '../assets/img/cards/9_Diamonds.svg'
import Diamond_10 from '../assets/img/cards/10_Diamonds.svg'
import Diamond_J from '../assets/img/cards/J_Diamonds.svg'
import Diamond_Q from '../assets/img/cards/Q_Diamonds.svg'
import Diamond_K from '../assets/img/cards/K_Diamonds.svg'
import Heart_A from '../assets/img/cards/A_Hearts.svg'
import Heart_2 from '../assets/img/cards/2_Hearts.svg'
import Heart_3 from '../assets/img/cards/3_Hearts.svg'
import Heart_4 from '../assets/img/cards/4_Hearts.svg'
import Heart_5 from '../assets/img/cards/5_Hearts.svg'
import Heart_6 from '../assets/img/cards/6_Hearts.svg'
import Heart_7 from '../assets/img/cards/7_Hearts.svg'
import Heart_8 from '../assets/img/cards/8_Hearts.svg'
import Heart_9 from '../assets/img/cards/9_Hearts.svg'
import Heart_10 from '../assets/img/cards/10_Hearts.svg'
import Heart_J from '../assets/img/cards/J_Hearts.svg'
import Heart_Q from '../assets/img/cards/Q_Hearts.svg'
import Heart_K from '../assets/img/cards/K_Hearts.svg'
import Spade_A from '../assets/img/cards/A_Spades.svg'
import Spade_2 from '../assets/img/cards/2_Spades.svg'
import Spade_3 from '../assets/img/cards/3_Spades.svg'
import Spade_4 from '../assets/img/cards/4_Spades.svg'
import Spade_5 from '../assets/img/cards/5_Spades.svg'
import Spade_6 from '../assets/img/cards/6_Spades.svg'
import Spade_7 from '../assets/img/cards/7_Spades.svg'
import Spade_8 from '../assets/img/cards/8_Spades.svg'
import Spade_9 from '../assets/img/cards/9_Spades.svg'
import Spade_10 from '../assets/img/cards/10_Spades.svg'
import Spade_J from '../assets/img/cards/J_Spades.svg'
import Spade_Q from '../assets/img/cards/Q_Spades.svg'
import Spade_K from '../assets/img/cards/K_Spades.svg'

/**
 * 亂數重新排列`array`
 * @param {Array} array
 */
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// RNG
function FreeCellRNG(seed) {
  return {
    lastNum: seed,
    next() {
      this.lastNum = (214013 * this.lastNum + 2531011) % Math.pow(2, 31)
      return this.lastNum >> 16
    }
  }
}
// Get cards
function getDeck() {
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K'
  ]
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']
  const cards = []
  for (let i = 0; i < ranks.length; i += 1) {
    for (let j = 0; j < suits.length; j += 1) {
      cards.push(`${ranks[i]}_${suits[j]}`)
    }
  }
  return cards
}

/**
 * 隨機產生52張不重複的卡片
 */
export function generateRandomCards() {
  const seed = Math.floor(Math.random() * 1000000) + 1
  const rng = FreeCellRNG(seed)
  const deck = getDeck()

  const deltCards = [[], [], [], [], [], [], [], []]
  let currentColumn = 0
  let currentRow = 0

  let rand
  let temp
  let card
  while (deck.length > 0) {
    // Choose a random card
    rand = rng.next() % deck.length

    // Swap this random card with the last card in the array
    temp = deck[deck.length - 1]
    deck[deck.length - 1] = deck[rand]
    deck[rand] = temp

    // Remove this card from the array
    card = deck.pop()

    // Deal this card
    deltCards[currentRow].push(card)
    currentColumn += 1
    if (currentColumn === 7 || (currentRow > 3 && currentColumn === 6)) {
      currentColumn = 0
      currentRow += 1
    }
  }

  return deltCards
}

export function getImageObj(card) {
  if (card === 'A_Clubs') {
    return Club_A
  } else if (card === 'A_Diamonds') {
    return Diamond_A
  } else if (card === 'A_Hearts') {
    return Heart_A
  } else if (card === 'A_Spades') {
    return Spade_A
  } else if (card === '2_Clubs') {
    return Club_2
  } else if (card === '2_Diamonds') {
    return Diamond_2
  } else if (card === '2_Hearts') {
    return Heart_2
  } else if (card === '2_Spades') {
    return Spade_2
  } else if (card === '3_Clubs') {
    return Club_3
  } else if (card === '3_Diamonds') {
    return Diamond_3
  } else if (card === '3_Hearts') {
    return Heart_3
  } else if (card === '3_Spades') {
    return Spade_3
  } else if (card === '4_Clubs') {
    return Club_4
  } else if (card === '4_Diamonds') {
    return Diamond_4
  } else if (card === '4_Hearts') {
    return Heart_4
  } else if (card === '4_Spades') {
    return Spade_4
  } else if (card === '5_Clubs') {
    return Club_5
  } else if (card === '5_Diamonds') {
    return Diamond_5
  } else if (card === '5_Hearts') {
    return Heart_5
  } else if (card === '5_Spades') {
    return Spade_5
  } else if (card === '6_Clubs') {
    return Club_6
  } else if (card === '6_Diamonds') {
    return Diamond_6
  } else if (card === '6_Hearts') {
    return Heart_6
  } else if (card === '6_Spades') {
    return Spade_6
  } else if (card === '7_Clubs') {
    return Club_7
  } else if (card === '7_Diamonds') {
    return Diamond_7
  } else if (card === '7_Hearts') {
    return Heart_7
  } else if (card === '7_Spades') {
    return Spade_7
  } else if (card === '8_Clubs') {
    return Club_8
  } else if (card === '8_Diamonds') {
    return Diamond_8
  } else if (card === '8_Hearts') {
    return Heart_8
  } else if (card === '8_Spades') {
    return Spade_8
  } else if (card === '9_Clubs') {
    return Club_9
  } else if (card === '9_Diamonds') {
    return Diamond_9
  } else if (card === '9_Hearts') {
    return Heart_9
  } else if (card === '9_Spades') {
    return Spade_9
  } else if (card === '10_Clubs') {
    return Club_10
  } else if (card === '10_Diamonds') {
    return Diamond_10
  } else if (card === '10_Hearts') {
    return Heart_10
  } else if (card === '10_Spades') {
    return Spade_10
  } else if (card === 'J_Clubs') {
    return Club_J
  } else if (card === 'J_Diamonds') {
    return Diamond_J
  } else if (card === 'J_Hearts') {
    return Heart_J
  } else if (card === 'J_Spades') {
    return Spade_J
  } else if (card === 'Q_Clubs') {
    return Club_Q
  } else if (card === 'Q_Diamonds') {
    return Diamond_Q
  } else if (card === 'Q_Hearts') {
    return Heart_Q
  } else if (card === 'Q_Spades') {
    return Spade_Q
  } else if (card === 'K_Clubs') {
    return Club_K
  } else if (card === 'K_Diamonds') {
    return Diamond_K
  } else if (card === 'K_Hearts') {
    return Heart_K
  } else if (card === 'K_Spades') {
    return Spade_K
  }
}

/**
 * 判斷 `suitA` 與 `suitB` 是否為相反顏色的花色
 * @param {String} suitA
 * @param {String} suitB
 */
export function isDifferentColorSuit(suitA, suitB) {
  if (
    (suitA === 'Diamonds' || suitA === 'Hearts') &&
    (suitB === 'Clubs' || suitB === 'Spades')
  ) {
    return true
  } else if (
    (suitA === 'Clubs' || suitA === 'Spades') &&
    (suitB === 'Diamonds' || suitB === 'Hearts')
  ) {
    return true
  }
  return false
}

/**
 * 判斷卡片的花色是否一樣。
 * @param {String} suitA
 * @param {String} suitB
 */
export function isSameSuit(suitA, suitB) {
  return suitA === suitB
}

/**
 * 取得卡片點數對應的數值。
 * @param {String} cardPoint
 */
function valueOfFreeceell(cardPoint) {
  switch (cardPoint) {
    case 'A':
      return 1
    case 'J':
      return 11
    case 'Q':
      return 12
    case 'K':
      return 13
    default:
      return parseInt(cardPoint)
  }
}

/**
 * 判斷卡片的點數相差是否為1。
 * @param {String} pointA
 * @param {String} pointB
 */
export function substractEqualToOne(pointA, pointB) {
  return valueOfFreeceell(pointA) - valueOfFreeceell(pointB) === 1
}

/**
 * 判斷在tableau中的卡片是否可以放入新的一張。只要拖曳的卡片與在tableau的卡片花色成相反顏色，
 * 且拖曳卡片的點數小於tableau中的卡片 1 點，即可放入。
 * @param {*} isDraggedCard
 * @param {*} card
 */
export function isDroppable(isDraggedCard, card) {
  if (isDraggedCard.columnIndex === card.columnIndex) return false

  const [isDraggedCardPoint, isDraggedCardSuit] = isDraggedCard.card.split('_')
  const [cardPoint, cardSuit] = card.card.split('_')

  if (isDraggedCardSuit !== cardSuit && isDraggedCardPoint !== cardPoint) {
    if (
      isDifferentColorSuit(isDraggedCardSuit, cardSuit) &&
      substractEqualToOne(cardPoint, isDraggedCardPoint)
    ) {
      return true
    }
  }
  return false
}

/**
 * 判斷 homecell 是不是可以放入卡片。當 Homecell 儲存的卡片跟拖曳的卡片同一花色，且儲存
 * 的卡片點數小於拖曳卡片點數 1 點，即可放入卡片。
 * @param {String} isDraggedCard
 * @param {String} card
 */
export function canDropHomeCell(isDraggedCard, card) {
  const [isDraggedCardPoint, isDraggedCardSuit] = isDraggedCard.split('_')

  if (typeof card === 'undefined') {
    if (isDraggedCardPoint === 'A') {
      return true
    }
  } else {
    const [cardPoint, cardSuit] = card.split('_')
    if (
      isSameSuit(isDraggedCardSuit, cardSuit) &&
      substractEqualToOne(isDraggedCardPoint, cardPoint)
    ) {
      return true
    }
  }
  return false
}

/**
 * 把總秒數轉換成 min:sec
 * @param {Number} totalSeconds
 */
export function getTime(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds - minutes * 60

  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds
  return `${minutes}:${seconds}`
}

/**
 * 計算空白的排堆共有幾堆
 * @param {Array} cards
 */
function numOfEmptyCards(cards) {
  let count = 0
  cards.forEach(card => {
    if (card === null || card.length === 0) {
      count += 1
    }
  })
  return count
}

/**
 * 判斷在`tableauCards`中的第`columnIndex`行，第`index`張卡片是否可以拖曳。如果
 * `freeCellCards`的空排堆+tableauCards`的空排堆+1小於被拖曳的卡片數量，則不可以拖曳。
 * 且拖曳的卡片必須符合規則。
 * @param {Array} tableauCards
 * @param {Array} freeCellCards
 * @param {Number} columnIndex
 * @param {Number} index
 */
export function isDraggable(tableauCards, freeCellCards, columnIndex, index) {
  const tableauColumn = tableauCards[columnIndex]
  const numOfDraggableCard =
    numOfEmptyCards(tableauCards) + numOfEmptyCards(freeCellCards) + 1
  const numOfDraggingCards = tableauColumn.length - index

  if (numOfDraggingCards > numOfDraggableCard) return false

  const newTableauColumn = [...tableauColumn]
  const cards = newTableauColumn
    .splice(index, tableauColumn.length - index)
    .reverse()
    .map(card => {
      const [point, suit] = card.split('_')
      return { point, suit }
    })
  for (let i = 0; i < cards.length - 1; i++) {
    if (!isDifferentColorSuit(cards[i].suit, cards[i + 1].suit)) {
      return false
    }
    if (!substractEqualToOne(cards[i + 1].point, cards[i].point)) {
      return false
    }
  }

  return true
}
