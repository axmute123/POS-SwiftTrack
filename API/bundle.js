import { URL } from './connection'

export const retrieveBundles = async () => {
    const response = await fetch(`${URL}/bundle`,{
        method: 'GET', 
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};


export const storeBundles = async (input) => {
    const res = await fetch(`${URL}/bundle`,
        {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(input)
        })
        return await res.json();
};


export const patchBundle = async (id,body) =>{
    const res = await fetch(`${URL}/bundle/${id}?_method=PATCH`,
        {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    return await res.json();
};

export const destroybundle = async (id) => {
    const res = await fetch(`${URL}bundle/${id}?_method=DELETE`,
        {
            method:'POST',
            headers:{
                Accept:'application/json'
            }
        });
        return await res.json();
}