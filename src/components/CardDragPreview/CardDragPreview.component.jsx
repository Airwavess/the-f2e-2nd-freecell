import React from 'react'
import { useSelector } from 'react-redux'
import './CardDragPreview.styles.scss'
import { getImageObj } from '../../utils/utils'

function getPreviewStyle(numOfCards) {
  return { height: 36 * (numOfCards - 1) + 204 + 'px' }
}
function getStyles(card, index) {
  return {
    backgroundImage: `url(${getImageObj(card)})`,
    top: 36 * index + 'px'
  }
}
const CardPreview = ({ card, index }) => {
  return (
    <div
      className='card-drag-preview__card-image'
      key={card}
      style={getStyles(card, index)}
    />
  )
}
const CardDragPreview = props => {
  const tableauCards = useSelector(state => state.freecell.tableauCards)

  const {
    card: { payload }
  } = props

  const renderCard = payload => {
    if (typeof payload.columnIndex !== 'undefined') {
      return (
        <>
          {[...tableauCards[payload.columnIndex]]
            .splice(payload.index, payload.numOfCards)
            .map((card, index) => (
              <CardPreview card={card} index={index} key={card} />
            ))}
        </>
      )
    } else if (typeof payload.freeCellIndex !== 'undefined') {
      return <CardPreview card={payload.card} index={0} />
    }
  }
  return (
    <div
      className='card-drag-preview'
      style={getPreviewStyle(payload.numOfCards)}
    >
      {renderCard(payload)}
    </div>
  )
}

export default CardDragPreview
