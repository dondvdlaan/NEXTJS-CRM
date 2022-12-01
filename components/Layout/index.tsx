import React from 'react';
import Head from 'next/head';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useRouter } from 'next/router';

interface Props{
    children: React.ReactNode
}

/**
 * Layout Component devides the Home page in Sidebar and main part
 */
const Layout = (props: Props) => {
    
    const router = useRouter();

    return (
    <>
         <Head>
             <title>Sistema CRM </title>
        </Head>
        {router.pathname === '/login' || router.pathname === '/NewClient' ? (
            <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                <div>{props.children}</div>
            </div>
        ) : (
            <div className="bg-gray-200 min-h-screen">
                 <div className="sm:flex min-h-screen">
                    <Sidebar />

                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                         <Header />
                        {props.children}
                    </main>
                </div>
            </div>
            )}
        </>
    );
};

export default Layout;
