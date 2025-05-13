import { URL } from './connection'

export const retrieveAddOns = async () => {
    const response = await fetch(`${URL}/addons`,{
        method: 'GET', 
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const storeAddons = async (input) => {
    const res = await fetch(`${URL}addons`,
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


export const destroyAddons = async (id) => {
    const res = await fetch(`${URL}addons/${id}?_method=DELETE`,{
        method:'POST',
        headers:{
            Accept:'application/json',
        },
    });
    if (res.status === 204){
        return {ok:true};
    }
    return await res.json();
}