import React, { useState, useRef } from 'react';
import '../../styles/Form.css';
import { Eye, EyeClosed, User, AtSign, Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(""); // Estado para erro de e-mail

    const inputPassword = useRef();
    const inputConfirm = useRef();
    const inputName = useRef();
    const inputEmail = useRef();
    const inputPhone = useRef();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Estado único para o formulário
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm: ""
    });

    // Função para manipular mudanças nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validação em tempo real para e-mail
        if (name === "email") {
            if (emailRegex.test(value)) {
                setError(""); // Remove o erro se o e-mail for válido
            } else {
                setError("E-mail Inválido"); // Define o erro se o e-mail for inválido
            }
        }
    };

    // Função para limpar o formulário e focar no nome
    const handleSubmit = (e) => {
        e.preventDefault();

        // Valida novamente o e-mail antes de enviar
        if (!emailRegex.test(formData.email)) {
            setError("E-mail Inválido");
            return;
        }

        setFormData({ name: "", email: "", phone: "", password: "", confirm: "" });
        inputName.current.focus();
    };

    // Alternar visibilidade da senha
    const togglePass = () => {
        setOpen((prevOpen) => {
            const newType = !prevOpen ? "text" : "password";
            inputPassword.current.type = newType;
            inputConfirm.current.type = newType;
            return !prevOpen;
        });
    };

    return (
        <main>
            <div className='container'>
                <h1 className='title'>Registrar</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="inputs">
                        <input
                            type="text"
                            name="name"
                            ref={inputName}
                            className="input"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <User className='icon' />
                        <label>Nome</label>
                    </div>

                    <div className="inputs">
                        <input
                            type="text"
                            name="email"
                            className={`input ${error ? 'input-error' : ''}`}
                            required
                            ref={inputEmail}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <AtSign className='icon' />
                        <label>E-Mail</label>
                        {error && <p className='error-message'>{error}</p>}
                    </div>

                    <div className="inputs">
                        <input
                            type="tel"
                            name="phone"
                            className="input"
                            required
                            ref={inputPhone}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <Phone className='icon' />
                        <label>Telefone</label>
                    </div>

                    <div className="inputs">
                        <input
                            type="password"
                            name="password"
                            className="input"
                            required
                            ref={inputPassword}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Lock className='icon' />
                        <span onClick={togglePass}>
                            {open ? <EyeClosed className="eye-c" /> : <Eye className="eye" />}
                        </span>
                        <label>Senha</label>
                    </div>

                    <div className="inputs">
                        <input
                            type="password"
                            name="confirm"
                            className="input"
                            required
                            ref={inputConfirm}
                            value={formData.confirm}
                            onChange={handleChange}
                        />
                        <Lock className='icon' />
                        <label>Confirme Senha</label>
                    </div>

                    <button type="submit" className='btn'>Cadastrar</button>
                </form>
                <p className='question'>
                    Já tem uma Conta? <Link to='/login' id='a'>Entre</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
