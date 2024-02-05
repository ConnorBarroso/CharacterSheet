"use client"
import React, {useState} from 'react'
import { ShowPasswordTypes } from '@/interfaces/login.interfaces'

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [inputType, setInputType] = useState ({password:"password", password2:"password"})

    const toggleRegister = () =>{
        const changedRegister = !isRegister
        setIsRegister(changedRegister)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ): void =>{
        const name = e.target.name
        const value = e.target.value

        switch (name){
            case 'email': setEmail(value); break;
            case 'password': setPassword(value); break;
            case 'password2': setPassword2(value); break;

            default: console.log('something messed up')
            return
        }
    }


    const showPasswordToggle = (key: string) => {
        let newType = 'text'
        if(inputType[key as keyof ShowPasswordTypes] === 'text'){
            newType = 'password'
        }
        const newObj = {...inputType, [key]: newType}
        setInputType(newObj) 
    }

    const handleSubmit = () =>{
        let postData 
        if(!isRegister){
            postData = {
                type: 'login',
                email: email,
                password: password
            }

            console.log(postData)
            return
        }

         postData = {
            type: 'register',
            email: email,
            password: password,
            confirm: password2
        }

        console.log(postData)
    }

    return (
        <div>
            {
                isRegister && (
                    //register module
                    <div>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <p>email</p>
                            <input className='text-black' value={email} onChange={handleChange} name='email' type='email'/>
                            <p>password</p>
                            <input className='text-black' value={password} onChange={handleChange} name='password' type={inputType.password} /><button type='button' onClick={()=>showPasswordToggle('password')} >show</button>
                            <p>confirm password</p>
                            <input className='text-black' value={password2} onChange={handleChange} name='password2' type={inputType.password2}/><button type='button' onClick={()=>showPasswordToggle('password2')} >show</button>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                )
            }
            {
                !isRegister && (
                    //login module
                    <div></div>
                )
            }
            {isRegister ? (<p onClick={toggleRegister}>Already have an account? Login!</p>):(<p onClick={toggleRegister}>Don't have an account? Register!</p>)}
        </div>
    )
}

export default LoginPage