import { URL } from './connection';

export const retrieveProducts = async () => {
    const res = await fetch(`${URL}/products`,
    {
        method: 'GET',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    });
    return await res.json()
}


export const storeProducts = async (input) => {
    const res = await fetch(`${URL}/products`,
    {
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(input)
    })
    console.log(res);
    return await res.json()
};

export const patchProducts = async (id,body) => {
    const res = await fetch(`${URL}/products/${id}?_method=PATCH`,
        {
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
        console.log("Yow");
        return await res.json();
};

export const destroyProducts = async (id) => {
    const res = await fetch(`${URL}/products/${id}?_method=DELETE`,
    {
        method: 'POST',
        headers:{
            Accept:'application.json',
        },
    });
    return await res.json();
};