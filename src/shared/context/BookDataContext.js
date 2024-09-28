import { createContext, useState, useEffect } from 'react';
import fetchGet from '../apiFetch/fetchGet';
//import useAxiosFetch from '../hooks/useAxiosFetch';

const BookDataContext = createContext({});

export const BookDataProvider = ({ children }) => {
    const API_URL = 'http://localhost:5102/api/book';
    const [bookItems, setBookItems] = useState([])
    const [bookFetchError, setBookFetchError] = useState(null);
    const [isBookLoading, setIsBookLoading] = useState(false);

    useEffect(() => {
      setBookFetchError(null);
      setIsBookLoading(true);

      const fetchItems = async () => {
        try {
          //console.log('--> Call to BookDataProvider.useEffect to load setBookItems');
          const listItems = await fetchGet(API_URL);
          setBookItems(listItems);
        } catch (err) {
          //console.log('--> Call to PersonDataProvider.useEffect catch error');
          setBookFetchError(err.message);
        } finally {
          //console.log('--> Call to PersonDataProvider.useEffect finally');
          setIsBookLoading(false);
        }
      }

      //setTimeout just for load delay testing
      setTimeout(() => fetchItems(), 2000);
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
        <BookDataContext.Provider value={{
            // search, setSearch,
            // searchResults, fetchError, isLoading,
            // posts, setPosts
            bookItems, setBookItems,
            bookFetchError, setBookFetchError,
            isBookLoading, setIsBookLoading
        }}>
            {children}
        </BookDataContext.Provider>
    )
}

export default BookDataContext;