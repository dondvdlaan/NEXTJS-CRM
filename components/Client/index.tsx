import React from 'react';
import Router, { useRouter } from 'next/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import {axiosClient} from '../../shared/Api';
import {ClientInt, User} from '../../types/User'
import { CONFIRM_DELETE_MSSG, DELETE_CONFIRMED_MSSG, ERROR_MSSG } from '../../helpers/constants';

interface Props{ 
    currentClientData   : User,
    clients             : User[],
    setClients          : React.Dispatch<React.SetStateAction<ClientInt[]>> }

/**
* Component Client called from Home page displays Client and possibility to edit/delete
*/
const Client = (props:Props) => {

    // *** Constant and variables ***
    const { name, company, email, id } = props.currentClientData;
    const router = useRouter();
    
    // *** Event handlers ***
    const onDeleteClient = () => {
        Swal.fire(CONFIRM_DELETE_MSSG)
            .then(async (result) => {
            if (result.value) {
                try {
                    await axiosClient.delete(`users/${id}`);

                    //Swal.fire(DELETE_CONFIRMED_MSSG);
                    
                    // Refresh current page
                    window.location.reload();

                } catch (error) {
                    console.log(error);
                    Swal.fire(ERROR_MSSG);
                }
            }
        });
    };

    const onEditClient = () => {
        Router.push({
            pathname: '/editclient/[id]',
            query: { id },
        });
    };
    
    return (
        <tr>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{company}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => onDeleteClient()}
                >
                    Eliminar
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 ml-2"
                    >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => onEditClient()}
                >
                    Editar
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 ml-2"
                    >
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default Client;
