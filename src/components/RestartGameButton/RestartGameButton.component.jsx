import React from 'react'
import { useDispatch } from 'react-redux'
import './RestartGameButton.styles.scss'
import Back from '../../assets/img/Back.svg'
import { restartThisGame, toggleMenu } from '../../redux/freecell/freecell.action'

const RestartGameButton = () => {
  const dispatch = useDispatch()

  const handleRestartThisGame = () => {
    dispatch(restartThisGame())
    dispatch(toggleMenu('close'))
  }

  return (
    <div className='restart-game-btn' onClick={handleRestartThisGame}>
      <span>Restart this game</span>
      <div
        className='restart-game-btn__icon'
        style={{ backgroundImage: `url(${Back})` }}
      />
    </div>
  )
}

export default RestartGameButton
