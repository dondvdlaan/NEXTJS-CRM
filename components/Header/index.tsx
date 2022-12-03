import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApiStorage } from '../../shared/Api';
import { User } from '../../types/User';

/**
 * Header Component is called in the Layout and displays user name and log out button
 */
const Header = () => {

    // *** Constants and variables ***
    const router            = useRouter();
    const [user, setUser]   = useApiStorage<User>('userData');
  
    // Check if user exists
    if (!user || Object.keys(user).length === 0) return null;

    // *** Event handler ***
    const onLogOut = () => {
        localStorage.setItem('isAuth', 'false');
        localStorage.setItem('userData', '{}');
        router.push('/login');
    };

    return (
        <header className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {user.name}</p>

            <button
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={onLogOut}
            >
                Log out
            </button>
        </header>
    );
};

export default Header;
