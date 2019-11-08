import React from 'react'
import { useSelector } from 'react-redux'
import './HomeCells.styles.scss'
import HomeCellCard from '../HomeCellCard/HomeCellCard.component'

const HomeCells = () => {
  const homeCellCards = useSelector(state => state.freecell.homeCellCards)

  return (
    <div className='home-cells'>
      {homeCellCards.map((card, index) => (
        <HomeCellCard card={card} index={index} key={`home cell ${index}`} />
      ))}
    </div>
  )
}

export default HomeCells
