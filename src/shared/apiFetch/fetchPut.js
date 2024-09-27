//This method uses "react fetch" maily to make update api call
const fetchPut = async(url = '', inputBody) => {
    let errMsg = '';
    const updateOptions = {
        method: 'PUT',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputBody) 
    };

    try {
        const response = await fetch(url, updateOptions);
        if(!response.ok)
            throw Error('unsuccessfull request');
    } catch(err) {
        errMsg = err.message;
    }
    finally {
        return errMsg;
    }
}

export default fetchPut;