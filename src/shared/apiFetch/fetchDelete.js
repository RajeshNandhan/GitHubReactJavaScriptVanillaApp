//This method uses "react fetch" maily to make delete api call
const fetchDelete = async(url = '') => {
    let errMsg = '';
    const deleteOptions = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(url, deleteOptions);
        if(!response.ok)
            throw Error('unsuccessfull request');
    } catch(err) {
        errMsg = err.message;
    }
    finally {
        return errMsg;
    }
}

export default fetchDelete;