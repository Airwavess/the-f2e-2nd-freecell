import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import './NestedDraggable.styles.scss'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import Card from '../Card/Card.component'
import {
  dragCard,
  dropCard,
  removeDraggedCard
} from '../../redux/freecell/freecell.action'
import { isDroppable, isDraggable } from '../../utils/utils'

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
  const hint = useSelector(state => state.freecell.game.hint)
  const showHint = hint.find(
    h => h.columnIndex === columnIndex && h.index === index
  )

  const [, drag] = useDrag({
    item: { type: ItemTypes.FREECEEL },
    begin: () =>
      dispatch(
        dragCard({ card, columnIndex, index, numOfCards: cardLength - index })
      ),
    end: () => dispatch(removeDraggedCard()),
    canDrag: monitor => isDraggable(tableauCards[columnIndex], index)
  })

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    canDrop: () => isDroppable(isDraggedCard.card, card),
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
      style={{
        top: index === 0 ? '0px' : 44 + 'px',
        width: '132px',
        height: 44 * (cardLength - index - 1) + 204 + 'px'
      }}
    >
      <Card
        card={card}
        isLastElement={isLastElement}
        cardLength={cardLength}
        isOver={isOver}
        canDrop={canDrop}
      />
      {nested}
    </div>
  )
}

export default NestedDraggable
