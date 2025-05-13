import { URL } from './connection'

export const getpaymentMethod = async () => {
    const response = await fetch(`${URL}/payment_method`,{
        method: 'GET', 
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
        }, 
       
    });
    return response.json();
}