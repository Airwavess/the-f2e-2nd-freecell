import React from 'react'
import { useSelector } from 'react-redux'
import Time from '../../assets/img/Time icon.svg'
import Diamond from '../../assets/img/Diamond.svg'
import './EndGameCard.styles.scss'
import RestartGameButton from '../RestartGameButton/RestartGameButton.component'
import NewGameButton from '../NewGameButton/NewGameButton.component'
import { getTime } from '../../utils/utils'

const EndGameCard = () => {
  const gameTime = useSelector(state => state.freecell.game.time)
  const gamePoint = useSelector(state => state.freecell.game.points)

  return (
    <div className='end-game'>
      <div className='end-game__content'>
        <div className='end-game__info'>
          <div className='end-game__game-points'>
            <img src={Diamond} alt='diamond' />
            <h1>{gamePoint}</h1>
            <img src={Diamond} alt='diamond' />
          </div>
          <div className='end-game__game-time'>
            <img src={Time} alt='time' />
            <h4>{getTime(gameTime)}</h4>
          </div>
        </div>
        <div className='end-game__operations'>
          <RestartGameButton />
          <NewGameButton />
        </div>
      </div>
    </div>
  )
}

export default EndGameCard
