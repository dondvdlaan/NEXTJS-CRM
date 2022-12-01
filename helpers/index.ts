import {axiosClient} from '../shared/Api';
import { User } from '../types/Client';

// obtiene los datos del vendedor logueado
export const getCurrentSeller = (): User  =>{

    let userDataRaw = localStorage.getItem('userData')

// exclude null
return (userDataRaw != null) ? JSON.parse(userDataRaw) : "" ;
}

// retorna una promesa con todos clientes dado el id del vendedor
export const getClients = (sellerId: string) => {
    return axiosClient.get(`/users?role=client&sellerId=${sellerId}`);
};

export const statusOptions = [
    { value: 'completed', label: 'Completado' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'canceled', label: 'Cancelado' },
];
