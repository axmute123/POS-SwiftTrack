
import { URL } from './connection'

export const retrieveTransactions = async () => {
    const response = await fetch(`${URL}/getTransactions`,{
        method: 'GET', 
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
        }, 
       
    });

    return response.json();
}