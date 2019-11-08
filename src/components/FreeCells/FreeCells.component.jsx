import React from 'react'
import { useSelector } from 'react-redux'
import './FreeCells.styles.scss'
import FreeCellCard from '../FreeCellCard/FreeCellCard.component'

const FreeCells = () => {
  const freeCellCards = useSelector(state => state.freecell.freeCellCards)

  return (
    <div className='free-cells'>
      {freeCellCards.map((card, index) => (
        <FreeCellCard card={card} index={index} key={`free cell ${index}`}/>
      ))}
    </div>
  )
}

export default FreeCells
