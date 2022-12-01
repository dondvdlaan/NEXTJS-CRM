import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import {axiosClient, useApiDB} from '../shared/Api'
import Order from '../components/Order';
import { OrderInt } from '../types/Order';

/**
 * Page to list orders and to add a new order
 */
export default function Orders() {
    
    // *** Constants and variables ***
    const [orders, setOrders] = useApiDB<OrderInt[]>('orders');

    if(!orders) return <p>Loading orders...</p>;

      return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Ordenes</h1>
            <Link href="/neworder">
                <div className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
                    Nueva Orden
                </div>
            </Link>
            <div className="flex flex-wrap justify-around mt-4">
                {orders.map((order) => (
                    <Order key={order.id} order={order} />
                ))}
            </div>
        </Layout>
    );
}
