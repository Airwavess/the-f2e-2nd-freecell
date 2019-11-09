import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import './FreeCellCard.styles.scss'
import { getImageObj } from '../../utils/utils'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import {
  dropCardToFreeCell,
  dragCard,
  removeDraggedCard
} from '../../redux/freecell/freecell.action'

const Card = ({ drag, card, isDragging }) => {
  return (
    <div
      ref={drag}
      className='free-cell-card__card'
      style={{
        backgroundImage: `url(${getImageObj(card)})`,
        opacity: isDragging ? 0 : 1
      }}
    />
  )
}

const FreeCellCard = props => {
  const { card, index } = props
  const dispatch = useDispatch()

  const hint = useSelector(state => state.freecell.game.hint)

  const showHint = hint.find(h => h.freeCellIndex === index)

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.FREECEEL },
    begin: () =>
      dispatch(dragCard({ freeCellIndex: index, card, numOfCards: 1 })),
    end: (item, monitor) => dispatch(removeDraggedCard()),
    canDrag: () => card !== null,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
    // eslint-disable-next-line
  }, [])

  const [, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    canDrop: () => card === null,
    drop: () => dispatch(dropCardToFreeCell({ freeCellIndex: index }))
  })

  let cardImg
  if (card) {
    cardImg = <Card drag={drag} card={card} isDragging={isDragging} />
  }

  return (
    <div
      ref={drop}
      className={`free-cell-card ` + (showHint ? 'free-cell-card--hint' : '')}
      key={`card-${index}`}
    >
      {cardImg}
    </div>
  )
}

export default FreeCellCard
