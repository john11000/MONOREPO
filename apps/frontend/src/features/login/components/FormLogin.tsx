"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginInterface } from '../models/login.model';
import { LOGIN_API } from '@ocmi/frontend/constants/api.constants';
import axios from 'axios';
import { ADMIN_ROUTE } from '@ocmi/frontend/constants/routes.constants';
import { useRouter } from 'next/router';

export default function FormLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInterface>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const onSubmit = async (data: LoginInterface) => {
    try {
      setErrorMessage('')
      const auth = await axios.post(LOGIN_API, data);
      localStorage.setItem('token', auth.data.token);
      localStorage.setItem('role', auth.data.role);
      router.push('/admin')
    } catch (error: any) {
      if (error.response) {
        // Si la respuesta es una respuesta de error (por ejemplo, 400, 404, 500)
        if (error.response.status === 500) {
          // Error interno del servidor
          setErrorMessage('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.');
        } else if (error.response.status === 404) {
          // Usuario no encontrado
          setErrorMessage('Usuario no encontrado. Por favor, verifique sus credenciales.');
          
        } else {
          // Otros errores
          setErrorMessage(error.response?.data.message[0]);
        }
      } else if (error.request) {
        // Si la solicitud se hizo pero no se recibió respuesta
        setErrorMessage('No se recibió respuesta del servidor. Por favor, inténtelo de nuevo más tarde.');
      } else {
        // Otros errores
        setErrorMessage('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="text-red-500 text-md">Field required</span>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="text-red-500 text-md">Field required</span>}
        </div>
        <div className="mb-4">
          {errorMessage && <span className="text-red-500 text-md">{errorMessage}</span>}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
