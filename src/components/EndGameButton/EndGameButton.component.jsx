import React from 'react'
import { useDispatch } from 'react-redux'
import './EndGameButton.styles.scss'
import Check from '../../assets/img/Check.svg'
import {
  endGame,
  toggleMenu
} from '../../redux/freecell/freecell.action'

const EndGameButton = () => {
  const dispatch = useDispatch()

  const handleEndGame = () => {
    dispatch(endGame())
    dispatch(toggleMenu())
  }

  return (
    <div className='end-game-btn' onClick={handleEndGame}>
      <span>End game</span>
      <div
        className='end-game-btn__icon'
        style={{ backgroundImage: `url(${Check})` }}
      />
    </div>
  )
}

export default EndGameButton
