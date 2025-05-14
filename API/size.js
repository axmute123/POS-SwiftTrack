import { URL } from './connection'

export const retrieveSizes = async () => {
    const res = await fetch(`${URL}/sizes`,
        {
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
            }
    });
    return await res.json();
};

export const storeSizes = async (input) => {
    const res = await fetch(`${URL}sizes`,
        {
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(input)
       })
       return await res.json()
};

export const patchSizes = async (id,body) =>{
    const res = await fetch(`${URL}sizes/${id}?_method=PATCH`,
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

export const destroySizes = async (id) => {
    const res = await fetch(`${URL}sizes/${id}?_method=DELETE`,
        {
            method:'POST',
            headers:{
                Accept:'application/json'
            }
        });
        return await res.json();
}
