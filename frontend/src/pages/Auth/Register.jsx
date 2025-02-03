import React, { useState } from 'react'
import '../../styles/Form.css'
import { Eye, EyeClosed, User, AtSign, Phone, LockIcon } from 'lucide-react'
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
                        <p className="required">Nome Inválido</p>
                    </div>
                    <div className="inputs">
                        <input type="text" required name='email' className='input' />
                        <AtSign className='icon' />
                        <label>E-Mail</label>
                        <p className="required">Email Inválido</p>
                    </div>
                    <div className="inputs">
                        <input type="number" name='phone' required className='input' />
                        <Phone className='icon' />
                        <label>Telefone</label>
                        <p className='required'>Telefone Inválido</p>
                    </div>

                    <div className="inputs">
                        <input type="password" name="password" className="input" required />
                        <LockIcon className='icon' />
                        <span onClick={() => setOpen(!open)}>
                            {open ? <EyeClosed className='eye-c' /> : <Eye size={32} className='eye' />}
                        </span>
                        <label>Senha</label>
                        <p className="required">Senha Inválida</p>
                    </div>
                    <div className="inputs">
                        <input type="password" name="password" className="input" required />
                        <LockIcon className='icon' />
                        <label>Confirme Senha</label>
                        <p className="required">Senhas Não Coincidem </p>
                    </div>


                    <button type="submit" className='btn'>Cadastrar</button>
                </form>
            </div>
        </main>
    )
}

export default Register