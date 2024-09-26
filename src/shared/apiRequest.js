// USE THIS OBJECT ONLY FOR DELETE, PUT, POST 
const apiRequest = async(url = '', httpOptions = null, errMsg = '') => {
    try{
        const response = await fetch(url, httpOptions);
        if(!response.ok)
            throw Error('unsuccessfull request');
    } catch(err){
        errMsg = err.message;
    }
    finally{
        return errMsg;
    }
}

export default apiRequest;