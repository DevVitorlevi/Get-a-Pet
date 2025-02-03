import React from 'react'
import { NavLink, Link } from 'react-router-dom'
const Header = () => {
    return (
        <header>
            <Link to='/'>
                <h1>Logo</h1>
            </Link>
            <nav>
                <ul>
                    <li><NavLink to='/register'>Crie sua Conta</NavLink></li>
                    <li><NavLink to='/login'>Entre</NavLink></li>

                </ul>
            </nav>
        </header>
    )
}

export default Header