import React from 'react'
import style from '../styles/Content.module.css'
const Content = ({ children }) => {
    return (
        <div className={style.content}>{children}</div>
    )
}

export default Content