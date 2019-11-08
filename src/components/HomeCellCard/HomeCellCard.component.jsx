import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import './HomeCellCard.styles.scss'
import {
  dropCardToHomeCell,
  increaseGamePoints
} from '../../redux/freecell/freecell.action'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import { getImageObj, canDropHomeCell } from '../../utils/utils'

const HomeCellCard = props => {
  const { card, index } = props

  const dispatch = useDispatch()

  const isDraggedCard = useSelector(state => state.freecell.isDraggedCard)

  const hint = useSelector(state => state.freecell.game.hint)
  const showHint = hint.find(h => h.homeCellIndex === index)

  const [, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    canDrop: () => canDropHomeCell(isDraggedCard.card, card[card.length - 1]),
    drop: () => {
      dispatch(dropCardToHomeCell({ homeCellIndex: index }))
      dispatch(increaseGamePoints())
    }
  })

  let cardImg =
    card.length > 0 ? (
      <div
        key={card}
        className='home-cell-card__card'
        style={{
          backgroundImage: `url(${getImageObj(card[card.length - 1])})`
        }}
      />
    ) : (
      'A'
    )

  return (
    <div
      ref={drop}
      className={`home-cell-card ` + (showHint ? 'home-cell-card--hint' : '')}
      key={`card-${index}`}
    >
      {cardImg}
    </div>
  )
}

export default HomeCellCard
