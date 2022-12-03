import axios, { Method } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getClients, getCurrentSeller } from "../helpers";

// *** Constant and variables ***
// local utility type
type SetState<T> = Dispatch<SetStateAction<T>>;

// Create instance of axios
export const axiosClient = axios.create({
  baseURL: "http://localhost:4000/",
});

/**
 * Custom hook Api function for accessing console local storage
 */
export function useApiStorage<T>(path: string, condition: boolean = true) {

  const[data, setData] = useState();

  useEffect(() => {

    if(condition){

      setData(ApiStorage(path));
    }
    
  }, [path]);

return [data, setData];
}

/**
 * Direct Api console local storage function
 */
export function ApiStorage<T>(path: string){

  let userDataRaw = localStorage.getItem(path)

  // exclude null
  return (userDataRaw != null) ? JSON.parse(userDataRaw) : "" ;
}

/**
 * Custom hook Api function for accessing DataBase
 */
export function useApiDB<T>(path: string): [T | undefined, SetState<T | undefined>] {

  const[data, setData] = useState<T>();

  useEffect(() => {

    axiosClient.get(path).then(res=> setData(res.data))
    
  }, [path]);

return [data, setData];
}

/**
 * Api to get clientes per seller
 */
 export function useApiClientsPerSeller<T>(): [T | undefined, SetState<T | undefined>] {

  const[data, setData] = useState<T>();

  useEffect(() => {

    const seller = getCurrentSeller();
        
    getClients(seller.id).then((res) => setData(res.data));
        
    
  }, []);

return [data, setData];
}