import React from 'react'
import { useDispatch } from 'react-redux'
import './NewGameButton.styles.scss'
import Plus from '../../assets/img/Plus.svg'
import { startANewGame, toggleMenu } from '../../redux/freecell/freecell.action'

const NewGameButton = () => {
  const dispatch = useDispatch()

  const handleStartANewGame = () => {
    dispatch(startANewGame())
    dispatch(toggleMenu('close'))
  }

  return (
    <div className='new-game-btn' onClick={handleStartANewGame}>
      <span>Start a new game</span>
      <div
        className='new-game-btn__icon'
        style={{ backgroundImage: `url(${Plus})` }}
      />
    </div>
  )
}

export default NewGameButton
