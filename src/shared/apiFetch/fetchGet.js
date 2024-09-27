//This method uses "react fetch" maily to make GET api call
const fetchGet = async(url = '') => {
    const response = await fetch(url);
    if(!response.ok)
        throw Error('unsuccessfull request');
    else
        return await response.json();
}

export default fetchGet;



    // try {
    //     const response = await fetch(url);
    //     if(!response.ok)
    //         throw Error('unsuccessfull request');
    //     else
    //     return await response.json();
    // } catch(err) {
    //     //handle error
    //     return [];
    // }