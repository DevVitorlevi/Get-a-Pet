import React, { useState } from 'react'
import '../../styles/Form.css'
import { Eye, EyeClosed, User, AtSign, Phone, LockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const Register = () => {
    const [open, setOpen] = useState(false)

    return (
        <main>
            <div className='container'>
                <h1 className='title'>Registrar</h1>
                <form className='form'>
                    <div className="inputs">
                        <input type="text" name='name' className='input' required />
                        <User className='icon' />
                        <label>Nome</label>

                    </div>
                    <div className="inputs">
                        <input type="text" required name='email' className='input' />
                        <AtSign className='icon' />
                        <label>E-Mail</label>

                    </div>
                    <div className="inputs">
                        <input type="number" name='phone' required className='input' />
                        <Phone className='icon' />
                        <label>Telefone</label>

                    </div>

                    <div className="inputs">
                        <input type="password" name="password" className="input" id='s' required />
                        <LockIcon className='icon' />
                        <span onClick={() => setOpen(!open)}>
                            {open ? <EyeClosed className='eye-c' /> : <Eye size={32} className='eye' />}
                            {open ? () => (document.querySelector('#s').setAttribute('type', 'text')) : () => (document.querySelector('#s').setAttribute('type', 'password'))}
                        </span>
                        <label>Senha</label>
                    </div>
                    <div className="inputs">
                        <input type="password" name="password" className="input" required />
                        <LockIcon className='icon' />
                        <label>Confirme Senha</label>

                    </div>


                    <button type="submit" className='btn'>Cadastrar</button>
                </form>
                <p className='question'>Já tem uma Conta?<Link to='/login' id='a' >Entre</Link></p>
            </div>
        </main>
    )
}

export default Register