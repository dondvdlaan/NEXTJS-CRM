import React, { useState, useEffect } from 'react';
import {axiosClient} from '../../shared/Api';
import Select, { SingleValue } from 'react-select';
import { statusOptions } from '../../helpers';
import { OrderInt, OrderStatus } from '../../types/Order';

/**
 * Component Order lists products, terms and conditions for each order
 */
const Order = (props:{ order: OrderInt}) => {
    
    // *** Constants and variables ***
    const { products, clientName, status, total, id } = props.order;
    const [orderStatus, setOrderStatus] = useState<SingleValue<OrderStatus>>(status);
    let borderColor = "";

    // Set top border line color per order card
    if (orderStatus){
        borderColor = orderStatus.value === 'completed' ? `border-green-400`
                      : orderStatus.value === 'pending' ? `border-orange-400`
                                                        : `border-red-600`;
    }
    
    // *** Event handlers ***
    const onOrderStatus = async (value: SingleValue<OrderStatus>) => {
        setOrderStatus(value);
        
        // Pass changes to DB
        try {
            const response = await axiosClient.put(`orders/${id}`, {
                ...props.order,
                status: value,
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div
            className={`shadow-lg border-t-4 bg-white mb-8 rounded-b-lg rounded-t ${borderColor} w-3/4 md:w-2/5 lg:w-1/4 lg:mx-1`}
        >
            <div className="px-6 py-4 mb-2 mt-4 mb-8">
                <div className="capitalize tracking-wide text-c2 mb-2">Productos</div>
                {products.map((product, index) => {
                    
                    const border = "";
                    // const border = (index === products.length) ? `border-b-0"` : ``;
                    return (
                        <div
                            key={product.id}
                            className={`flex border px-4 py-2 text-lg text-grey-darkest ${border}`}
                        >
                            <div className="pl-2">{product.name}</div>
                        </div>
                    );
                })}
                <div className="mt-4 capitalize  tracking-wide text-c2 mb-2">
                    Cliente:
                    <span className="capitalize text-grey-darkest">{' ' + clientName}</span>
                </div>
                <div className="my-2 capitalize tracking-wide text-c2 ">Status:</div>

                <Select
                    defaultValue={orderStatus}
                    options={statusOptions}
                    onChange={(e) => onOrderStatus(e)}
                />
                <div className="mt-2 uppercase tracking-wide text-c2 ">Total: {total}</div>
            </div>
        </div>
    );
};
export default Order;
