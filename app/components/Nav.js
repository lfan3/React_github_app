import React from 'react'
import {ThemeConsumer} from '../contexts/theme'
import {NavLink} from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav(){
    return(
        <ThemeConsumer> 
            {({theme, toggleTheme})=>{
                return(
                    <nav className='row space-between'>
                        <ul className='row nav'>
                            <li>
                                <NavLink exact activeStyle = {activeStyle} to='/' className='nav-link'>Popular</NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle = {activeStyle} to='/battle' className='nav-link'>Batttle</NavLink>
                            </li>
                        </ul>
                        <button 
                         style = {{fontSize : 30}}
                         onClick={toggleTheme}>
                            {theme === 'light'? 'Dark' : 'Light'}
                        </button>
                    </nav>
                )
            }}
        </ThemeConsumer>
    )
}