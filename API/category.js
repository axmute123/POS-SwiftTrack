import { URL } from './connection'

export const retrieveCategory = async () => {
    const response = await fetch(`${URL}/category`,{
        method: 'GET', 
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};


export const storeCategory = async (input) => {
    const res = await fetch(`${URL}category`,
        {
            method:'POST',
            headers:{
                Accept:'application.json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(input)
        })
        return await res.json();
};


export const patchcategory = async (id,body) =>{
    const res = await fetch(`${URL}category/${id}?_method=PATCH`,
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

export const destroycategory = async (id) => {
    const res = await fetch(`${URL}category/${id}?_method=DELETE`,
        {
            method:'POST',
            headers:{
                Accept:'application/json'
            }
        });
        return await res.json();
}