import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import style from '../styles/Header.module.css'
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
const Header = () => {
    return (
        <>
            <header id={style.header}>
                <Link to='/'>
                    <img src={logo} id={style.img} />
                </Link>
                <div className={style.menu_desktop}>
                    <nav id={style.nav}>
                        <ul id={style.ul}>
                            <li><NavLink to='/' className={(isActive) => isActive ? `${style.a} ${style.active}` : style.a}>Adotar</NavLink></li>
                            <li><NavLink to='/login' className={(isActive) => isActive ? `${style.a} ${style.active}` : style.a}>Entre</NavLink></li>
                            <li><NavLink to='/register' className={(isActive) => isActive ? `${style.a} ${style.active}` : style.a}>Crie sua Conta</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className={style.mobile_menu}>
                    <button id={style.mobile_btn}>
                        <i className="fa_solid_fa_bars"></i>
                    </button>

                </div>
            </header>
        </>
    )
}

export default Header