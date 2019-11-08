import {
  isDifferentColorSuit,
  substractEqualToOne,
  isSameSuit,
  isDraggable,
  shuffle
} from '../../utils/utils'

const getErea = card => {
  if (typeof card.columnIndex !== 'undefined') {
    return 'tableau'
  } else if (typeof card.freeCellIndex !== 'undefined') {
    return 'freecell'
  } else if (typeof card.homeCellIndex !== 'undefined') {
    return 'homecell'
  }
}

const getDraggedElements = (tableauCards, freeCellCards, isDraggedCard) => {
  let draggedElement
  const dragSource = getErea(isDraggedCard)
  if (dragSource === 'tableau') {
    const tableauColumn = tableauCards[isDraggedCard.columnIndex]
    draggedElement = tableauColumn.splice(
      isDraggedCard.index,
      tableauColumn.length - isDraggedCard.index
    )
  } else if (dragSource === 'freecell') {
    draggedElement = [freeCellCards[isDraggedCard.freeCellIndex]]
    freeCellCards[isDraggedCard.freeCellIndex] = null
  }
  return draggedElement
}

export const dropCard = (state, payload) => {
  const { tableauCards, freeCellCards, isDraggedCard } = state
  const newTableauCards = [...tableauCards]
  const newFreeCellCards = [...freeCellCards]

  const targetColumnIndex = payload.columnIndex
  let draggedElements = getDraggedElements(
    newTableauCards,
    newFreeCellCards,
    isDraggedCard
  )
  newTableauCards[targetColumnIndex].push(...draggedElements)

  return { freeCellCards: newFreeCellCards, tableauCards: newTableauCards }
}

export const dropCardToFreeCell = (state, payload) => {
  const { tableauCards, freeCellCards, isDraggedCard } = state
  const newTableauCards = [...tableauCards]
  const newFreeCellCards = [...freeCellCards]

  const targetColumnIndex = payload.freeCellIndex
  const draggedElement = getDraggedElements(
    newTableauCards,
    newFreeCellCards,
    isDraggedCard
  )
  newFreeCellCards[targetColumnIndex] = draggedElement[0]

  return { freeCellCards: newFreeCellCards, tableauCards: newTableauCards }
}

export const dropCardToHomeCell = (state, payload) => {
  const { tableauCards, homeCellCards, freeCellCards, isDraggedCard } = state
  const newTableauCards = [...tableauCards]
  const newHomeCellCards = [...homeCellCards]
  const newFreeCellCards = [...freeCellCards]

  let draggedElement = getDraggedElements(
    newTableauCards,
    newFreeCellCards,
    isDraggedCard
  )
  const targetColumnIndex = payload.homeCellIndex
  newHomeCellCards[targetColumnIndex].push(draggedElement[0])

  return {
    homeCellCards: newHomeCellCards,
    tableauCards: newTableauCards,
    freeCellCards: newFreeCellCards
  }
}

export const saveHistory = (state, payload) => {
  const { isDraggedCard } = state
  const history = {
    source: isDraggedCard,
    target: payload
  }
  return history
}

const getLastTargetElementList = (
  targetErea,
  target,
  newTableauCards,
  newHomeCellCards,
  newFreeCellCards
) => {
  let lastTargetElement

  if (targetErea === 'freecell') {
    const lastTargetIndex = target.freeCellIndex
    lastTargetElement = [newFreeCellCards[lastTargetIndex]]
    newFreeCellCards[lastTargetIndex] = null
  } else if (targetErea === 'homecell') {
    const lastTargetIndex = target.homeCellIndex
    lastTargetElement = newHomeCellCards[lastTargetIndex].splice(-1, 1)
  } else if (targetErea === 'tableau') {
    const lastTargetIndex = target.columnIndex
    lastTargetElement = newTableauCards[lastTargetIndex].splice(
      target.index,
      target.numOfCards
    )
  }
  return lastTargetElement
}

export const backOneStep = state => {
  const { tableauCards, homeCellCards, freeCellCards } = state
  const newTableauCards = [...tableauCards]
  const newHomeCellCards = [...homeCellCards]
  const newFreeCellCards = [...freeCellCards]

  const lastMove = state.moveHistories.pop()
  const lastMoveSourceErea = getErea(lastMove.source)
  const lastMoveTargetErea = getErea(lastMove.target)

  const lastTargetElementList = getLastTargetElementList(
    lastMoveTargetErea,
    lastMove.target,
    newTableauCards,
    newHomeCellCards,
    newFreeCellCards
  )

  if (lastMoveSourceErea === 'freecell') {
    const lastSourceIndex = lastMove.source.freeCellIndex
    newFreeCellCards[lastSourceIndex] = lastTargetElementList[0]
  } else if (lastMoveSourceErea === 'tableau') {
    const lastSourceIndex = lastMove.source.columnIndex
    newTableauCards[lastSourceIndex].push(...lastTargetElementList)
  }

  return {
    freeCellCards: newFreeCellCards,
    homeCellCards: newHomeCellCards,
    tableauCards: newTableauCards
  }
}

/**
 * 把在tableau中可以拖曳的卡片全部儲存進陣列
 * @param {Array} tableauCards
 */
function getAllTableauDraggableCards(tableauCards) {
  let tableauDraggableCards = []
  for (let columnIndex = 0; columnIndex < tableauCards.length; columnIndex++) {
    if (tableauCards[columnIndex].length === 0) {
      tableauDraggableCards.push({ columnIndex, index: 0 })
      continue
    }
    for (
      let index = tableauCards[columnIndex].length - 1;
      index >= 0;
      index--
    ) {
      if (isDraggable(tableauCards[columnIndex], index)) {
        const [point, suit] = tableauCards[columnIndex][index].split('_')
        tableauDraggableCards.push({
          columnIndex,
          index,
          card: { point, suit }
        })
      } else {
        continue
      }
    }
  }
  return tableauDraggableCards
}

/**
 * 擷取所有的free cell
 * @param {Array} freeCellCards 
 */
function getAllFreeCellCards(freeCellCards) {
  return freeCellCards.map((card, freeCellIndex) => ({
    freeCellIndex,
    card
  }))
}

/**
 * 擷取所有的 home cell
 * @param {Array} homeCellCards 
 */
function getAllHomeCellCards(homeCellCards) {
  return homeCellCards.map((card, homeCellIndex) => {
    if (card.length === 0) return { homeCellIndex, card }
    const [point, suit] = card[card.length - 1].split('_')
    return {
      homeCellIndex,
      card: { point, suit }
    }
  })
}

export const getHint = state => {
  let tableauCards = [...state.tableauCards]
  let homeCellCards = [...state.homeCellCards]
  let freeCellCards = [...state.freeCellCards]

  let tableauDraggableCards = shuffle(getAllTableauDraggableCards(tableauCards))

  freeCellCards = getAllFreeCellCards(freeCellCards)

  homeCellCards = getAllHomeCellCards(homeCellCards)

  let hint = []

  // 如果在home cell 中有可以放的位置優先處理
  for (let i = 0; i < tableauDraggableCards.length; i++) {
    const tableauCard = tableauDraggableCards[i]

    if (typeof tableauCard.card === 'undefined') continue
    for (let j = 0; j < homeCellCards.length; j++) {
      const homeCellCard = homeCellCards[j]
      if (
        (homeCellCard.card.length === 0 && tableauCard.card.point === 'A') ||
        (isSameSuit(tableauCard.card.suit, homeCellCard.card.suit) &&
          substractEqualToOne(
            tableauCard.card.point,
            homeCellCard.card.point
          ) &&
          tableauCard.index ===
            tableauCards[tableauCard.columnIndex].length - 1)
      ) {
        hint = [
          {
            columnIndex: tableauCard.columnIndex,
            index: tableauCard.index
          },
          {
            homeCellIndex: homeCellCard.homeCellIndex
          }
        ]
        return hint
      }
    }
  }

  // 如果在tableau中有可拖曳與放置的位置，則第二順位處理
  for (let i = 0; i < tableauDraggableCards.length - 1; i++) {
    const tableauCardA = tableauDraggableCards[i]

    if (typeof tableauCardA.card === 'undefined') continue

    for (let j = i + 1; j < tableauDraggableCards.length; j++) {
      const tableauCardB = tableauDraggableCards[j]

      if (typeof tableauCardB.card === 'undefined') continue
      if (
        isDifferentColorSuit(tableauCardA.card.suit, tableauCardB.card.suit) &&
        ((tableauCardA.card.point - tableauCardB.card.point === 1 &&
          tableauCardA.index ===
            tableauCards[tableauCardA.columnIndex].length - 1) ||
          (tableauCardB.card.point - tableauCardA.card.point === 1 &&
            tableauCardB.index ===
              tableauCards[tableauCardB.columnIndex].length - 1)) &&
        tableauCardA.columnIndex !== tableauCardB.columnIndex
      ) {
        hint = [
          {
            columnIndex: tableauCardA.columnIndex,
            index: tableauCardA.index
          },
          {
            columnIndex: tableauCardB.columnIndex,
            index: tableauCardB.index
          }
        ]
        return hint
      }
    }
  }

  // 如果在 free cell中有可以儲存 tableau 中的卡片，則第三順位處理。有三種可以拖曳並放置卡片的情況，
  // 第一種為 tableau 中有空白的行，且 free cell中有卡片；第二種為 free cell 中有空白的位置，且
  // tableau 中有卡片；第三種為 free cell 中的卡片可以放至 tableau 的卡片上。
  for (let i = 0; i < tableauDraggableCards.length; i++) {
    const tableauCard = tableauDraggableCards[i]
    for (let j = 0; j < freeCellCards.length; j++) {
      const freeCellCard = freeCellCards[j]
      if (
        (typeof tableauCard.card === 'undefined' &&
          freeCellCard.card !== null) ||
        (typeof tableauCard.card !== 'undefined' && freeCellCard.card === null)
      ) {
        hint = [
          {
            columnIndex: tableauCard.columnIndex,
            index: tableauCard.index
          },
          {
            freeCellIndex: freeCellCard.freeCellIndex
          }
        ]
        return hint
      }
      if (
        isDifferentColorSuit(tableauCard.card.suit, freeCellCard.card.suit) &&
        substractEqualToOne(tableauCard.card.point, freeCellCard.card.point)
      ) {
        hint = [
          {
            columnIndex: tableauCard.columnIndex,
            index: tableauCard.index
          },
          {
            freeCellIndex: freeCellCard.freeCellIndex
          }
        ]
        return hint
      }
    }
  }

  // 最後一種為 tableau 中有一個可拖曳的卡片，而另一個則為空白的行。
  for (let i = 0; i < tableauDraggableCards.length; i++) {
    const tableauCardA = tableauDraggableCards[i]
    for (let j = i + 1; j < tableauDraggableCards.length; j++) {
      const tableauCardB = tableauDraggableCards[j]
      if (
        (typeof tableauCardA.card === 'undefined' &&
          typeof tableauCardB.card !== 'undefined') ||
        (typeof tableauCardA.card !== 'undefined' &&
          typeof tableauCardB.card === 'undefined')
      ) {
        hint = [
          {
            columnIndex: tableauCardA.columnIndex,
            index: tableauCardA.index
          },
          {
            columnIndex: tableauCardB.columnIndex,
            index: tableauCardB.index
          }
        ]
        return hint
      }
    }
  }

  return hint
}
