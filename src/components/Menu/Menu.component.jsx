import React from 'react'
import { useSelector } from 'react-redux'
import './Menu.styles.scss'
import RestartGameButton from '../RestartGameButton/RestartGameButton.component'
import NewGameButton from '../NewGameButton/NewGameButton.component'
import EndGameButton from '../EndGameButton/EndGameButton.component'

const Menu = () => {
  const isShow = useSelector(state => state.freecell.showMenu)
  return (
    <div className={`menu ${isShow ? 'menu--active' : ''}`}>
      <div className='menu__content'>
        <RestartGameButton />
        <NewGameButton />
        <EndGameButton />
      </div>
    </div>
  )
}

export default Menu
