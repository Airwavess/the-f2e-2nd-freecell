import React from 'react'
import './TableauColumn.styles.scss'
import NestedDraggable from '../NestedDraggable/NestedDraggable.component'
import BlankDraggable from '../BlankDraggable/BlankDraggable.component'

const TableauColumn = props => {
  const { cards, columnIndex } = props

  return (
    <div className='tableau-column'>
      <div className='tableau-column__card-nested-group'>
        {cards.length > 0 ? (
          cards
            .map((card, index) => ({ card, index }))
            .reverse()
            .reduce(
              (nested, card) => (
                <NestedDraggable
                  nested={nested}
                  cardLength={cards.length}
                  card={card}
                  columnIndex={columnIndex}
                  isLastElement={card.index === cards.length - 1}
                />
              ),
              null
            )
        ) : (
          <BlankDraggable
            columnIndex={columnIndex}
          />
        )}
      </div>
    </div>
  )
}

export default TableauColumn
