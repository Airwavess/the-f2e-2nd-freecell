import FreecellTypes from './freecell.types'
import {
  dropCard,
  dropCardToFreeCell,
  dropCardToHomeCell,
  saveHistory,
  backOneStep,
  getHint
} from './freecell.utils'
import { generateRandomCards } from '../../utils/utils'

const INIT_RAMDOM_CARDS = generateRandomCards()

const INITIAL_STATE = {
  initTableauCards: INIT_RAMDOM_CARDS.map(inner => inner.slice()),
  tableauCards: INIT_RAMDOM_CARDS.map(inner => inner.slice()),
  // tableauCards: [['A_Diamonds'], ['3_Diamonds', '2_Spades'], [], ['4_Spades'], ['3_Diamonds', '2_Diamonds']],
  // tableauCards: [['3_Diamonds', '2_Spades'], [], []],
  // tableauCards: [['4_Spades'], ['3_Diamonds'], ['3_Diamonds']],
  moveHistories: [],
  freeCellCards: [null, null, null, null],
  // freeCellCards: ['3_Diamonds', '3_Diamonds', '3_Diamonds', '3_Diamonds'],
  homeCellCards: [[], [], [], []],
  // homeCellCards: [['2_Diamonds'], [], [], []],
  isDraggedCard: null,
  game: {
    points: 0,
    time: 0,
    hint: []
  },
  showMenu: false
}

const freecellReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FreecellTypes.DRAG_CARD:
      return {
        ...state,
        isDraggedCard: action.payload,
        game: {
          ...state.game,
          hint: []
        }
      }
    case FreecellTypes.REMOVE_DRAGGED_CARD:
      return {
        ...state,
        isDraggedCard: null
      }
    case FreecellTypes.DROP_CARD:
      return {
        ...state,
        ...dropCard(state, action.payload),
        moveHistories: [
          ...state.moveHistories,
          saveHistory(state, action.payload)
        ]
      }
    case FreecellTypes.DROP_CARD_TO_FREE_CELL:
      return {
        ...state,
        ...dropCardToFreeCell(state, action.payload),
        moveHistories: [
          ...state.moveHistories,
          saveHistory(state, action.payload)
        ]
      }
    case FreecellTypes.DROP_CARD_TO_HOME_CELL:
      return {
        ...state,
        ...dropCardToHomeCell(state, action.payload),
        moveHistories: [
          ...state.moveHistories,
          saveHistory(state, action.payload)
        ]
      }
    case FreecellTypes.START_A_NEW_GAME:
      const initTableauCards = generateRandomCards()
      return {
        ...state,
        initTableauCards: initTableauCards.map(inner => inner.slice()),
        tableauCards: initTableauCards.map(inner => inner.slice()),
        freeCellCards: [null, null, null, null],
        homeCellCards: [[], [], [], []],
        moveHistories: [],
        game: {
          points: 0,
          time: 0,
          hint: []
        }
      }
    case FreecellTypes.END_GAME:
      return {
        ...state,
        tableauCards: []
      }
    case FreecellTypes.TOGGLE_MENU:
      if (action.payload === 'close') {
        return {
          ...state,
          showMenu: false
        }
      }
      return {
        ...state,
        showMenu: !state.showMenu
      }
    case FreecellTypes.BACK_ONE_STEP:
      return {
        ...state,
        ...backOneStep(state, action.payload)
      }
    case FreecellTypes.RESTART_THIS_GAME:
      return {
        ...state,
        tableauCards: state.initTableauCards.map(inner => inner.slice()),
        freeCellCards: [null, null, null, null],
        homeCellCards: [[], [], [], []],
        game: {
          points: 0,
          time: 0,
          hint: []
        }
      }
    case FreecellTypes.UPDATE_TIMER:
      return {
        ...state,
        game: { ...state.game, time: state.game.time + 1 }
      }
    case FreecellTypes.INCREASE_GAME_POINTS:
      return {
        ...state,
        game: { ...state.game, points: state.game.points + 5 }
      }
    case FreecellTypes.GET_HINT:
      return {
        ...state,
        game: {
          ...state.game,
          hint: getHint(state)
        }
      }
    default:
      return state
  }
}

export default freecellReducer
