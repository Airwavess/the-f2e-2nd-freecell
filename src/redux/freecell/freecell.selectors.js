import { createSelector } from 'reselect'

const tableauCards = state => state.freecell.tableauCards
const freeCellCards = state => state.freecell.freeCellCards
const moveHistories = state => state.freecell.moveHistories

export const endGameSelector = createSelector(
  tableauCards,
  freeCellCards,
  (tableauCards, freeCellCards) => {
    const numOfTableauCard = tableauCards.reduce(
      (count, row) => count + row.length,
      0
    )

    const numOfFreeCellCards = freeCellCards.reduce(
      (count, row) => count + (row !== null ? 1 : 0),
      0
    )
    return numOfTableauCard + numOfFreeCellCards === 0
  }
)

export const canBackOnStepSelector = createSelector(
  moveHistories,
  moveHistories => moveHistories.length > 0
)
