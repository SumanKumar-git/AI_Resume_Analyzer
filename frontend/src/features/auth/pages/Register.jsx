import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader';

const Register = () => {

    const { loading, handleRegister } = useAuth();

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ email, username, password});
        navigate("/login");
    };

    return (
        <main className='w-full relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4 p-4 py-8'>
            {
            loading && <Loader/>
            }
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className='font-bold text-4xl mb-2'>Create Account</h1>
                <p className="text-gray-400">Join us to get started</p>
              </div>

              <form onSubmit={handleSubmit} className='bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl flex flex-col gap-6'>
                <div className='w-full flex flex-col gap-4'>
                  <div className='bg-gray-700 border-2 border-gray-600 focus-within:border-pink-500 rounded-lg p-4 transition-colors'>
                    <label className='text-sm font-medium text-gray-400 block mb-2' htmlFor="username">Username</label>
                    <div className='flex flex-row items-center gap-3'>
                      <UserSvg/>
                      <input 
                        value={username} 
                        onChange={(e) => {setUsername(e.target.value)}} 
                        className='text-base w-full bg-transparent outline-none placeholder:text-gray-500 text-white' 
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Choose a username'
                      />
                    </div>
                  </div>

                  <div className='bg-gray-700 border-2 border-gray-600 focus-within:border-pink-500 rounded-lg p-4 transition-colors'>
                    <label className='text-sm font-medium text-gray-400 block mb-2' htmlFor="email">Email Address</label>
                    <div className='flex flex-row items-center gap-3'>
                      <EmailSvg/>
                      <input 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}} 
                        className='text-base w-full bg-transparent outline-none placeholder:text-gray-500 text-white' 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder='your@email.com'
                      />
                    </div>
                  </div>

                  <div className='bg-gray-700 border-2 border-gray-600 focus-within:border-pink-500 rounded-lg p-4 transition-colors'>
                    <label className='text-sm font-medium text-gray-400 block mb-2' htmlFor="password">Password</label>
                    <div className='flex flex-row items-center gap-3'>
                      <PasswordSvg/>
                      <input 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value)}} 
                        className='text-base w-full bg-transparent outline-none placeholder:text-gray-500 text-white' 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder='Enter password'
                      />
                    </div>
                  </div>
                </div>

                <button className='bg-linear-to-r from-pink-400 to-pink-700 hover:from-pink-400 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition-all transform hover:scale-95 shadow-lg'>
                  Sign Up
                </button>

                <div className='text-center'>
                  <p className='text-gray-400'>
                    Already have an account? <Link to="/login" className='font-medium text-pink-500 hover:text-pink-400 transition-colors'>Sign in</Link>
                  </p>
                </div>
              </form>
            </div>
        </main>
    )
}

export default Register

export const EmailSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /><path d="M3 7l9 6l9 -6" /></svg>
    )
}

export const PasswordSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
    )
}

export const UserSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500 icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
    )
}