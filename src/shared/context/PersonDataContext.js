import { createContext, useState, useEffect } from 'react';
import axiosBase from '../apiAxios/axiosBase';
//import useAxiosFetch from '../hooks/useAxiosFetch';

const PersonDataContext = createContext({});

export const PersonDataProvider = ({ children }) => {
    const API_URL = 'http://localhost:5102/api/person';
    const [personItems, setPersonItems] = useState([]);
    const [personFetchError, setPersonFetchError] = useState(null);
    const [isPersonLoading, setIsPersonLoading] = useState(false);

    useEffect(() => {
        setIsPersonLoading(true);
        setPersonFetchError(null);
        const fetchItems = async () => {
          try {
            //console.log('--> Call to PersonDataProvider.useEffect to load setPersonItems');
            const result = await axiosBase.get(API_URL);
            setPersonItems(result.data);
          } catch (err) {
            //console.log('--> Call to PersonDataProvider.useEffect catch error');
            setPersonFetchError(err.message);
          } finally {
           //console.log('--> Call to PersonDataProvider.useEffect finally');
            setIsPersonLoading(false);
          }
        }

        //setTimeout for load testing
        setTimeout(() => fetchItems(), 3000);
        //fetchItems();
    
    }, []);


    // const [search, setSearch] = useState('');
    // const [searchResults, setSearchResults] = useState([]);

    //const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    // useEffect(() => {
    //     setPosts(data);
    // }, [])

    // useEffect(() => {
    //     const filteredResults = posts.filter((post) =>
    //         ((post.body).toLowerCase()).includes(search.toLowerCase())
    //         || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    //     setSearchResults(filteredResults.reverse());
    // }, [posts, search])

    return (
        <PersonDataContext.Provider value={{
            // search, setSearch,
            // searchResults, fetchError, isLoading,
            // posts, setPosts
            personItems, setPersonItems,
            personFetchError, setPersonFetchError,
            isPersonLoading, setIsPersonLoading
        }}>
            {children}
        </PersonDataContext.Provider>
    )
}

export default PersonDataContext;