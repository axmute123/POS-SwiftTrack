
import { URL } from './connection'

export const retrieveTransactions = async (token) => {
    const response = await fetch(`${URL}/getTransactions`,{
        method: 'GET', 
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }, 
    });
    return response.json();
}
export const retrieveDailyTransactions = async () => {
    const response = await fetch(`${URL}/transactions/daily`,{
        method: 'GET', 
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json',
        }, 
    });
    return response.json();
}


export const retrieveHourlySales = async () => {
    const response = await fetch(`${URL}/getHourlySales`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}

export const retrieveRevenue = async () => {
    const year = new Date().getFullYear();
    const res = await fetch(`${URL}/monthly-performance/${year}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return res.json();
}

export const retrieveTopProducts= async () => {
    const res = await fetch(`${URL}/getTopProductsNative`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return res.json();
}