import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {axiosClient} from '../shared/Api';
import { useRouter } from 'next/router';
import { User } from '../types/Client';
import { INITIAL_VALUES, RESET_MESSAGE } from '../helpers/constants';

/**
 * Login page of this application
 */
export default function Login() {

    // *** Constants and variables ***
    const router                = useRouter();
    const [message, setMessage] = useState(RESET_MESSAGE);
    
    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalido').required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria'),
        }),
        onSubmit: async (formData) => {
            const usersRaw = await axiosClient.get('users');

            // validacion simple para ver si los datos son correctos
            const user: User = usersRaw.data.filter(
                (user: User) => user.email === formData.email && 
                                user.password === formData.password
                                )[0];

            if (user) {
                // set isAuth to true
                localStorage.setItem('isAuth', 'true');
                
                const userAuth = {
                    email   : user.email,
                    name    : user.name,
                    id      : user.id
                };
                
                // set user data as per userAuth
                localStorage.setItem('userData', JSON.stringify(userAuth));
                
                // reroute to home page
                router.push('/');
            }
            // hay algun dato incorrecto
            else {
                setMessage({
                    status: true,
                    msg: 'Contraseña incorrecta',
                });
                localStorage.setItem('isAuth', 'false');
                setTimeout(() => {
                    setMessage({
                        status: false,
                        msg: '',
                    });
                }, 3000);
            }
        },
    });
    return (
        <Layout>
            <h1 className="text-center text-2xl text-white font-light">Login</h1>
            {message.status && (
                <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                    <p>{message.msg}</p>
                </div>
            )}
            
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email Usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password Usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>

                        {formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
                            value="Iniciar Sesión"
                        />
                    </form>
                </div>
            </div>{' '}
        </Layout>
    );
}
