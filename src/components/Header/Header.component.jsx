import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Diamond from '../../assets/img/Diamond.svg'
import './Header.styles.scss'
import { updateTimer } from '../../redux/freecell/freecell.action'
import { getTime } from '../../utils/utils'

const Header = () => {
  const isEndGame = useSelector(
    state => state.freecell.tableauCards.length === 0
  )
  const gamePoints = useSelector(state => state.freecell.game.points)
  const gameTime = useSelector(state => state.freecell.game.time)
  const dispatch = useDispatch()
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (!isEndGame) {
      setTimer(
        setInterval(() => {
          dispatch(updateTimer())
        }, 1000)
      )
    } else {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [isEndGame])

  return (
    <div className='header'>
      {!isEndGame ? (
        <>
          <span className='header__points'>{gamePoints}</span>
          <img src={Diamond} alt='diamond' className='header__diamond' />
          <span className='header__time'>{getTime(gameTime)}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Header
