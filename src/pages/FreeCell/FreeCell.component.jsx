import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Back from '../../assets/img/Back.svg'
import Hint from '../../assets/img/Hint.svg'
import './FreeCell.styles.scss'
import Header from '../../components/Header/Header.component'
import GameBoard from '../../components/GameBoard/GameBoard.component'
import Menu from '../../components/Menu/Menu.component'
import {
  toggleMenu,
  backOneStep,
  getHint
} from '../../redux/freecell/freecell.action'
import { endGameSelector } from '../../redux/freecell/freecell.selectors'

const FreeCell = () => {
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.freecell.showMenu)
  const canBackOneStep = useSelector(
    state => state.freecell.moveHistories.length > 0
  )
  const isEndGame = useSelector(endGameSelector)

  const handleToggleMenu = () => {
    dispatch(toggleMenu())
  }

  const handleBackOneStep = () => {
    if (canBackOneStep && !isEndGame) {
      dispatch(backOneStep())
    }
  }

  const handleGetHint = () => {
    dispatch(getHint())
  }

  return (
    <div className='free-cell'>
      <header className='free-cell__header'>
        <div className='free-cell__logo'>Freecell</div>
        <Header />
        <div
          className={`free-cell__menu ${
            showMenu ? 'free-cell__menu--active' : ''
          }`}
          onClick={handleToggleMenu}
        >
          <span></span>
        </div>
      </header>
      <Menu isShow={showMenu} handleToggleMenu={handleToggleMenu} />
      <div className='free-cell__game-board'>
        <DndProvider backend={HTML5Backend}>
          <GameBoard />
        </DndProvider>
        <div className='free-cell__game-btn'>
          <div className='free-cell__hint' onClick={handleGetHint}>
            <button>
              <img src={Hint} alt='hint button' />
            </button>
          </div>
          <div className='free-cell__back' onClick={handleBackOneStep}>
            <button>
              <img src={Back} alt='back button' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeCell
