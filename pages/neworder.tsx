import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import {axiosClient, useApiClientsPerSeller, useApiDB} from '../shared/Api';
import Swal from 'sweetalert2';
import { getCurrentSeller, getClients, statusOptions } from '../helpers';
import Select from 'react-select';
import { ClientInt } from '../types/Client';
import { ProductInt } from '../types/Product';
import { ERROR_MSSG } from '../helpers/constants';
import { OrderInt, RawNewOrder } from '../types/Order';

/**
 * Page NewOrder
 */
const NewOrder = () => {

    // *** Constants and variables ***
    const initRawNewOrder: RawNewOrder = {
        productID   : [{key: "", value: ""}],
        total       : "",
        clientName  : "",
        status      : ""
    }
    const router                            = useRouter();
    const [clients, setClients]             = useApiClientsPerSeller<ClientInt[]>();
    const [products, setProducts]           = useApiDB<ProductInt[]>('products');
    const [rawNewOrder, setRawNewOrder]     = useState<RawNewOrder>(initRawNewOrder);
    
    if(!products) return <p>Loading products...</p>;
    if(!clients) return <p>Loading clients...</p>;
    
    console.log("rawNewOrder: ", rawNewOrder);

    const clientOptions = clients.map((client) => ({
        label: client.name,
        value: client.name,
    }));

    const productOpstions = products.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    console.log("productOpstions: ", productOpstions);
    
    // *** Event handlers ***
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
            // se obtiene la informacion de los productos a enviar
            let productsSubmit: ProductInt[] = [];
            rawNewOrder.productID.map((id) => {
                productsSubmit.push(products.filter((product) => product.id === id.value)[0]);
            });
            const order = {
                id: uuidv4(),
                products: productsSubmit,
                total: rawNewOrder.total,
                clientName: rawNewOrder.clientName,
                status: rawNewOrder.status,
            };
            await axiosClient.post('orders', order);
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
                                console.log("e: ",e)
                               setRawNewOrder((rawNewOrder) => ({ ...rawNewOrder, clientName: e.value }))} 
                            //    setRawNewOrder((prev) => ({ ...prev, client: e }))} 
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
                                    // const total = e.target.value;
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
