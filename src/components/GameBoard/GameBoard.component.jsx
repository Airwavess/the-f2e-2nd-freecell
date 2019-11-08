import React from 'react'
import { useSelector } from 'react-redux'
import './GameBoard.styles.scss'
import FreeCells from '../FreeCells/FreeCells.component'
import HomeCells from '../HomeCells/HomeCells.component'
import Tableau from '../Tableau/Tableau.component'
import EndGameCard from '../EndGameCard/EndGameCard.component'
import { endGameSelector } from '../../redux/freecell/freecell.selectors'

const GameBoard = () => {
  const isEndGame = useSelector(endGameSelector)
  console.log(isEndGame)
  return (
    <div className='game-board'>
      <div className='game-board__top-nav'>
        <FreeCells />
        <HomeCells />
      </div>
      {isEndGame ? <EndGameCard /> : <Tableau />}
    </div>
  )
}

export default GameBoard
