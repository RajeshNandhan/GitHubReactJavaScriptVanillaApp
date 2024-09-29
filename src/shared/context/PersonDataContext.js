import { createContext, useState, useEffect } from 'react';
import axiosBase from '../apiAxios/axiosBase';
//import useAxiosFetch from '../hooks/useAxiosFetch';

const PersonDataContext = createContext({});

export const PersonDataProvider = ({ children }) => {
    const API_URL = 'http://localhost:5102/api/person';
    const [personItems, setPersonItems] = useState([]);
    const [personFetchError, setPersonFetchError] = useState(null);
    const [isPersonLoading, setIsPersonLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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


    //const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    /*this useEffect is effective only when search and personItems available
      search is set by PersonSearch component via setSearch
      here personItems is filtered based on search and value updated to setSearchResults
      setSearchResults is actually used in UI*/
    
    useEffect(() => {
        
        const results = personItems?.filter((person) =>
          ((person.category).toLowerCase()).includes(search.toLowerCase())
          || ((person.firstName).toLowerCase()).includes(search.toLowerCase())
          || ((person.category).toLowerCase()).includes(search.toLowerCase())
        );

        setSearchResults(results);
        //console.log(results)

    }, [personItems, search])

    return (
        <PersonDataContext.Provider value={{
            personItems, setPersonItems,
            personFetchError, setPersonFetchError,
            isPersonLoading, setIsPersonLoading,
            search, setSearch,
            searchResults, setSearchResults
        }}>
            {children}
        </PersonDataContext.Provider>
    )
}

export default PersonDataContext;