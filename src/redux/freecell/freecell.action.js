import FreecellTypes from './freecell.types'

export const dragCard = payload => ({
  type: FreecellTypes.DRAG_CARD,
  payload: payload
})

export const removeDraggedCard = () => ({
  type: FreecellTypes.REMOVE_DRAGGED_CARD
})

export const dropCard = payload => ({
  type: FreecellTypes.DROP_CARD,
  payload: payload
})

export const dropCardToFreeCell = payload => ({
  type: FreecellTypes.DROP_CARD_TO_FREE_CELL,
  payload: payload
})

export const dropCardToHomeCell = payload => ({
  type: FreecellTypes.DROP_CARD_TO_HOME_CELL,
  payload: payload
})

export const startANewGame = () => ({
  type: FreecellTypes.START_A_NEW_GAME
})

export const endGame = () => ({
  type: FreecellTypes.END_GAME
})

export const toggleMenu = payload => ({
  type: FreecellTypes.TOGGLE_MENU,
  payload: payload
})

export const backOneStep = () => ({
  type: FreecellTypes.BACK_ONE_STEP
})

export const restartThisGame = () => ({
  type: FreecellTypes.RESTART_THIS_GAME
})

export const updateTimer = () => ({
  type: FreecellTypes.UPDATE_TIMER
})

export const increaseGamePoints = () => ({
  type: FreecellTypes.INCREASE_GAME_POINTS
})

export const getHint = () => ({
  type: FreecellTypes.GET_HINT
})
