import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import style from "../styles/Header.module.css";

const Header = () => {
    const [isOpen, setisOpen] = useState(false);

    return (
        <>
            <header className={style.header}>
                <Link to="/">
                    <img src={logo} className={style.img} alt="Logo Petshop" />
                </Link>

                {/* Menu Desktop */}
                <nav className={style.menu_desktop}>
                    <ul className={style.ul}>
                        <li><NavLink to="/" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a} >Adotar</NavLink></li>
                        <li><NavLink to="/login" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a}>Entrar</NavLink></li>
                        <li><NavLink to="/register" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a}>Criar Conta</NavLink></li>
                    </ul>
                </nav>

                {/* Botão Mobile */}
                <button className={style.menu_btn} onClick={() => setisOpen(!isOpen)}>
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Menu Mobile */}
                <div className={`${style.mobile_menu} ${isOpen ? style.open : ''}`}>
                    <nav>
                        <ul className={style.mobile_nav_list}>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a}>Adotar</NavLink></li>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a}>Entrar</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive }) => isActive ? `${style.a} ${style.active}` : style.a}>Criar Conta</NavLink></li>
                        </ul>
                    </nav>
                </div>

                {/* Overlay */}
                {isOpen && <div className={style.overlay} onClick={() => setisOpen(false)}></div>}
            </header>
        </>
    );
};

export default Header;
