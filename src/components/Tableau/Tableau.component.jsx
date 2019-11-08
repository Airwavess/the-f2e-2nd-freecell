import React from 'react'
import { useSelector } from 'react-redux'
import './Tableau.styles.scss'
import TableauColumn from '../TableauColumn/TableauColumn.component'

const Tableau = () => {
  const tableauCards = useSelector(state => state.freecell.tableauCards)

  return (
    <div className='tableau'>
      {tableauCards.map((cards, index) => (
        <TableauColumn
          key={`tableau ${index}`}
          cards={cards}
          columnIndex={index}
        />
      ))}
    </div>
  )
}

export default Tableau
