import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Client from '../components/Client';
import { getCurrentSeller, getClients } from '../helpers';
import { ClientInt, Seller} from '../types/User';
import { ApiStorage } from '../shared/Api';

/**
 * Home starting page. Login is checked, then Customers are listed
 */
export default function Home() {

    // *** Constants and variables ***
    const router                = useRouter();
    const [clients, setClients] = useState<ClientInt[]>([]);
    
    // *** Functions ***
    // Check if user is logged in, then retrieve clients belonging to  user
    useEffect(() => {
        
        if(localStorage.getItem('isAuth') === null) 
            router.push('/login');
        else {
            const seller = ApiStorage<Seller>('userData');

            getClients(seller.id)
            .then((clients) => setClients(clients.data));
        }
    }, []);

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
            
            <Link href="/newClient">
                <div className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
                    Nuevo Cliente
                </div>
            </Link>

            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Nombre</th>
                            <th className="w-1/5 py-2">Compañia</th>
                            <th className="w-1/5 py-2">Email</th>
                            <th className="w-1/5 py-2">Eliminar</th>
                            <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {clients.map((client) => (
                            <Client
                                key={client.id}
                                currentClientData={client}
                                clients={clients}
                                setClients={setClients}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
