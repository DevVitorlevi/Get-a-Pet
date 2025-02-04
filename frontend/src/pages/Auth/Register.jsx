import React, { useState, useRef } from 'react'
import '../../styles/Form.css'
import { Eye, EyeClosed, User, AtSign, Phone, LockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const Register = () => {
    const [open, setOpen] = useState(false)
    const inputRef = useRef()
    const inputName = useRef()
    const inputRef2 = useRef()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPass] = useState("")
    const [confirm, setConfirm] = useState("")
    const handlesubmit = (e) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setPass('')
        setPhone('')
        setConfirm('')
        inputName.current.focus()
    }
    const togglePass = () => {
        setOpen(!open)
        inputRef.current.type = open ? 'password' : 'text'
        inputRef2.current.type = open ? 'password' : 'text'
    }
    return (
        <main>
            <div className='container'>
                <h1 className='title'>Registrar</h1>
                <form className='form' onSubmit={handlesubmit}>
                    <div className="inputs">
                        <input type="text" name='name' ref={inputName} className='input' required value={name} onChange={(e) => setName(e.target.value)} />
                        <User className='icon' />
                        <label>Nome</label>

                    </div>
                    <div className="inputs">
                        <input type="text" required name='email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <AtSign className='icon' />
                        <label>E-Mail</label>

                    </div>
                    <div className="inputs">
                        <input type="number" name='phone' required className='input' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Phone className='icon' />
                        <label>Telefone</label>

                    </div>

                    <div className="inputs">
                        <input type="password" name="password" className="input" id='s' required ref={inputRef} value={password} onChange={(e) => setPass(e.target.value)} />
                        <LockIcon className='icon' />
                        <span onClick={togglePass} >
                            {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                        </span>
                        <label>Senha</label>
                    </div>
                    <div className="inputs">
                        <input type="password" name="password" className="input" required value={confirm} onChange={(e) => setConfirm(e.target.value)} ref={inputRef2} />
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