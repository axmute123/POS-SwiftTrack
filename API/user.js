import { URL } from './connection';

export const retrieveLoggedUser = async (token) => {
    const response = await fetch(`${URL}user/logged`,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
           Authorization: `Bearer ${token}`,
        }
    });
    return await response.json()
};

export const retrieveUsers = async (token) => {
    const response = await fetch(`${URL}user`,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
           Authorization: `Bearer ${token}`,
        }
    });
    return await response.json()
};

export const patchUser = async(id, data, token) => {
        const res = await fetch(`${URL}user/${id}?_method=PATCH`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(data)
    });
    return await res.json()
}

export const destroyUser=async(id, body, token)=>{
    const res = await fetch(`${URL}user/${id}?_method=DELETE`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(body)
    });
    return await res.json();
}