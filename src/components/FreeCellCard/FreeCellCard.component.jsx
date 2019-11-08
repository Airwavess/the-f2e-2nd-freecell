import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import './FreeCellCard.styles.scss'
import { getImageObj } from '../../utils/utils'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import {
  dropCardToFreeCell,
  dragCard,
  removeDraggedCard
} from '../../redux/freecell/freecell.action'

const FreeCellCard = props => {
  const { card, index } = props
  const dispatch = useDispatch()

  const hint = useSelector(state => state.freecell.game.hint)
  const showHint = hint.find(h => h.freeCellIndex === index)

  const [, drag] = useDrag({
    item: { type: ItemTypes.FREECEEL },
    begin: () => dispatch(dragCard({ freeCellIndex: index, card })),
    end: (item, monitor) => dispatch(removeDraggedCard()),
    canDrag: () => card !== null
  })

  const [, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    canDrop: () => card === null,
    drop: () => dispatch(dropCardToFreeCell({ freeCellIndex: index }))
  })

  let cardImg
  if (card) {
    cardImg = (
      <div
        className='free-cell-card__card'
        ref={drag}
        style={{ backgroundImage: `url(${getImageObj(card)})` }}
      />
    )
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
