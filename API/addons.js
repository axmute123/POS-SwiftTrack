import { URL } from './connection'

export const retrieveAddOns = async () => {
    const response = await fetch(`${URL}/addons`,{
        method: 'GET', 
        header: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
}