import React, { useState } from 'react'
import '../../styles/Form.css'
import { Eye, EyeClosed, User, AtSign, Phone, LockIcon } from 'lucide-react'
const Register = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='container'>
            <h1 className='title'>Registrar</h1>
            <form className='form'>
                <div className="inputs">
                    <input type="text" name='name' className='input' placeholder='Nome' required />
                    <User className='icon' />
                    <span className="required">Nome Inválido</span>
                </div>
                <div className="inputs">
                    <input type="text" required name='email' className='input' placeholder='E-mail' />
                    <AtSign className='icon' />
                    <span className="required">Nome Inválido</span>
                </div>
                <div className="inputs">
                    <input type="number" name='phone' required className='input' placeholder='Telefone' />
                    <Phone className='icon' />
                    <span className='Telefone Inválido'></span>
                </div>
                <div className="className"></div>
                <input type="password" name="password" className="input" required placeholder='Senha' />
                <LockIcon className='icon' />
                <div onClick={() => setOpen(!open)}>
                    {open ? <EyeClosed className='icon' /> : <Eye size={32} className='icon' />}
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default Register