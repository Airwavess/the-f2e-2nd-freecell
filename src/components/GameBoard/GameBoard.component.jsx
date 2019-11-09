import React from 'react'
import { useSelector } from 'react-redux'
import './GameBoard.styles.scss'
import FreeCells from '../FreeCells/FreeCells.component'
import HomeCells from '../HomeCells/HomeCells.component'
import Tableau from '../Tableau/Tableau.component'
import EndGameCard from '../EndGameCard/EndGameCard.component'
import CustomDragLayer from '../CustomDragLayer/CustomDragLayer.component'
import { endGameSelector } from '../../redux/freecell/freecell.selectors'

const GameBoard = () => {
  const isEndGame = useSelector(endGameSelector)

  return (
    <div className='game-board'>
      <CustomDragLayer />
      <div className='game-board__top-nav'>
        <FreeCells />
        <HomeCells />
      </div>
      {isEndGame ? <EndGameCard /> : <Tableau />}
    </div>
  )
}

export default GameBoard
