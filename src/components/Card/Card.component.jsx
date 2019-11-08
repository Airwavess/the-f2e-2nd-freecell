import React from 'react'
import './Card.styles.scss'
import { getImageObj } from '../../utils/utils'

function getStyles(card, isOver, canDrop, isLastElement) {
  return {
    backgroundImage: `url(${getImageObj(card)})`,
    border: isOver && canDrop && isLastElement ? '3px solid #ffac4e' : '',
    borderRadius: isOver && canDrop && isLastElement ? '16px' : ''
  }
}

const Card = props => {
  const { card, isLastElement, isOver, canDrop } = props
  return (
    <div
      className='card'
      style={getStyles(card, isOver, canDrop, isLastElement)}
      key={card}
    />
  )
}

export default Card
