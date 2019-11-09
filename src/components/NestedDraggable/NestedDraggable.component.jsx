import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import './NestedDraggable.styles.scss'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import Card from '../Card/Card.component'
import {
  dragCard,
  dropCard,
  removeDraggedCard
} from '../../redux/freecell/freecell.action'
import { isDroppable, isDraggable } from '../../utils/utils'

function getTop(cardLength, index) {
  if (cardLength > 15) {
    if (cardLength - index > 7) {
      return 20
    }
  } else {
    if (cardLength - index > 9) {
      return 20
    }
  }

  return 36
}

function getStyle(cardLength, index, isDragging) {
  return {
    top: index === 0 ? '0px' : getTop(cardLength, index) + 'px',
    width: '132px',
    height: isDragging
      ? 0
      : getTop(cardLength, index) * (cardLength - index - 1) + 204 + 'px',
    opacity: isDragging ? 0 : 1
  }
}

const NestedDraggable = props => {
  const {
    nested,
    card: { card, index },
    columnIndex,
    cardLength,
    isLastElement
  } = props
  const dispatch = useDispatch()

  const isDraggedCard = useSelector(state => state.freecell.isDraggedCard)
  const tableauCards = useSelector(state => state.freecell.tableauCards)
  const freeCellCards = useSelector(state => state.freecell.freeCellCards)

  const hint = useSelector(state => state.freecell.game.hint)
  const showHint = hint.find(
    h => h.columnIndex === columnIndex && h.index === index
  )

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.FREECEEL },
    begin: () =>
      dispatch(
        dragCard({ card, columnIndex, index, numOfCards: cardLength - index })
      ),
    end: () => dispatch(removeDraggedCard()),
    canDrag: monitor =>
      isDraggable(tableauCards, freeCellCards, columnIndex, index),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
    // eslint-disable-next-line
  }, [])

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    canDrop: () => isDroppable(isDraggedCard, { card, columnIndex, index }),
    drop: () => {
      dispatch(
        dropCard({
          columnIndex,
          index: index + 1,
          numOfCards: isDraggedCard.numOfCards
        })
      )
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  const propsRef = { ref: drag }
  if (isDraggedCard && isDraggedCard.card !== card) {
    propsRef.ref = drop
  }

  return (
    <div
      {...propsRef}
      className={
        `nested-draggable ` + (showHint ? 'nested-draggable--hint' : '')
      }
      style={getStyle(cardLength, index, isDragging)}
    >
      <Card
        card={card}
        isLastElement={isLastElement}
        cardLength={cardLength}
        isOver={isOver}
        canDrop={canDrop}
        isDragging={isDragging}
      />
      {nested}
    </div>
  )
}

export default NestedDraggable
