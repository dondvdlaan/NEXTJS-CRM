import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import {axiosClient, useApiClientsPerSeller, useApiDB} from '../shared/Api';
import Swal from 'sweetalert2';
import { getCurrentSeller, getClients, statusOptions } from '../helpers';
import Select from 'react-select';
import { User } from '../types/User';
import { ProductInt } from '../types/Product';
import { ERROR_MSSG } from '../helpers/constants';
import { OrderInt, RawNewOrder } from '../types/Order';

/**
 * Page NewOrder form. User selects customer, products, amount and status before
 * saving
 */
const NewOrder = () => {

    // *** Constants and variables ***
    const initRawNewOrder: RawNewOrder = {
        productID   : [{label: "", value: ""}],
        total       : "",
        clientName  : "",
        status      : ""
    }
    const router                            = useRouter();
    const [clients, setClients]             = useApiClientsPerSeller<User[]>();
    const [products, setProducts]           = useApiDB<ProductInt[]>('products');
    const [rawNewOrder, setRawNewOrder]     = useState<RawNewOrder>(initRawNewOrder);
    let productsOrdered: ProductInt[]       = [];

    if(!products) return <p>Loading products...</p>;
    if(!clients) return <p>Loading clients...</p>;
    
    const clientOptions = clients.map((client) => ({
        label: client.name,
        value: client.name,
    }));

    const productOpstions = products.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    // *** Event handlers ***
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
            // Products are collected in an array based on id
            console.log("rawNewOrder: ", rawNewOrder)
            rawNewOrder.productID.map((id) => {
                let currentProd = products.filter((product) => product.id === id.value)[0];
                productsOrdered.push(currentProd);
            });

            const newOrder = {
                id: uuidv4(),
                products: productsOrdered,
                total: rawNewOrder.total,
                clientName: rawNewOrder.clientName,
                status: rawNewOrder.status,
            };
            await axiosClient.post('orders', newOrder);
            Swal.fire('Añadida!', 'Tu orden ha sido añadida', 'success').then((res) => {
                if (res.value) router.push('/orders');
            });
        } catch (error) {
            console.log(error);
            Swal.fire(ERROR_MSSG);
        }
    };
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nueva Orden</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={e=>onSubmitForm(e)}
                    >
                        <div className="block text-gray-700 text-sm font-bold my-2">Cliente:</div>
                        <Select
                            options={clientOptions}
                            onChange={(e) =>{
                               setRawNewOrder((rawNewOrder) => ({ ...rawNewOrder, clientName: e.value }))} 
                            } 
                        />

                        <div className="block text-gray-700 text-sm font-bold my-2">Productos:</div>
                        <Select
                            isMulti
                            options={productOpstions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e) => {
                                console.log("e: ",e)
                                console.log("rawNewOrder before: ", rawNewOrder)
                                setRawNewOrder((rawNewOrder) => ({ ...rawNewOrder, productID: e }))}
                            }
                        />

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold my-2"
                                htmlFor="total"
                            >
                                Total
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total"
                                type="text"
                                placeholder="Total"
                                onChange={(e) => {
                                    setRawNewOrder((rawNewOrder) => ({ ...rawNewOrder, total: e.target.value }));
                                }}
                            />
                        </div>
                        <div className="block text-gray-700 text-sm font-bold my-2">Status:</div>
                        <Select
                            options={statusOptions}
                            onChange={(e) => setRawNewOrder((rawNewOrder) => ({ ...rawNewOrder, status: e.value }))}
                        />

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Crear Orden"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewOrder;
