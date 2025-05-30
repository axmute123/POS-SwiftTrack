
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


export const retrieveHourlySales = async () => {
    const response = await fetch(`${URL}/getHourlySales`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Failed to fetch hourly sales:', response.status);
        return null;
    }

    return response.json();
}

export const retrieveRevenue = async () => {
    const res = await fetch(`${URL}/getMonthlyRevenue`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.error('Failed to fetch hourly sales:', res.status);
        return null;
    }

    return res.json();
}

export const retrieveTopProducts= async () => {
    const res = await fetch(`${URL}/getMonthlyRevenue`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.error('Failed to fetch hourly sales:', res.status);
        return null;
    }

    return res.json();
}