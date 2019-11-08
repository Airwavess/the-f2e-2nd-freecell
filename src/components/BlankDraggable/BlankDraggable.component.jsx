import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import './BlankDraggable.styles.scss'
import { ItemTypes } from '../../reactdnd/freecell.dndtypes'
import { dropCard } from '../../redux/freecell/freecell.action'

function getStyles(isOver) {
  return {
    border: isOver ? '3px solid #ffac4e' : '',
    borderRadius: isOver ? '16px' : ''
  }
}

const BlankDraggable = ({ columnIndex }) => {
  const dispatch = useDispatch()

  const isDraggedCard = useSelector(state => state.freecell.isDraggedCard)

  const hint = useSelector(state => state.freecell.game.hint)
  const showHint = hint.find(h => h.columnIndex === columnIndex)

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.FREECEEL,
    drop: () => {
      dispatch(
        dropCard({
          columnIndex,
          index: 0,
          numOfCards: isDraggedCard.numOfCards
        })
      )
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div
      ref={drop}
      className={`blank-draggable ` + (showHint ? 'blank-draggable--hint' : '')}
      style={getStyles(isOver)}
    ></div>
  )
}

export default BlankDraggable
