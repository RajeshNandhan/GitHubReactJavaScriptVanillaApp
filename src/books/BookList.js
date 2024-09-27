import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import fetchDelete from '../shared/apiFetch/fetchDelete';
import fetchGet from '../shared/apiFetch/fetchGet';

const BookList = (search) => {

    const API_URL = 'http://localhost:5102/api/book';
    const [items, setItems] = useState([]);
    //const [fetchError, setFetchError] = useState(null);

    useEffect(() => {

        const fetchItems = async () => {
          try {
            const listItems = await fetchGet(API_URL)
            setItems(listItems);
            console.log(listItems)
          } catch (err) {
            //setFetchError(err.message);
            console.log(err)
          } finally {
            //setIsLoading(false);
          }
        }

        //setTimeout(() => fetchItems(), 2000);
        fetchItems();
    
    }, [])

    const handleDelete = async (bookId) => {
      const deleteRequestUrl = `${API_URL}/${bookId}`;
      const result = await fetchDelete(deleteRequestUrl);

      if(result) {
        console.log(result)
      } else{
        const newItems = items.filter(item => item.bookId !== bookId);
        setItems(newItems);
        console.log(newItems);
      }
    }
    
    return (
        <main>
           {items.length ? (
                <table>
                <thead>
                    <tr>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Edition</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                    <tr className="item" key={item.id}>
                        <td>{item.bookName}</td>
                        <td>{item.bookCategory}</td>
                        <td>{item.edition}</td>
                        <td>{item.price}</td>
                        <td>{item.image}</td>
                        <td>
                          <Link to={`/book/${item.bookId}`}><FaEdit title="Press to Edit book"/></Link>
                        </td>
                        <td>
                          <FaTrashAlt role='button' tabIndex="0" title="Press to Delete book"
                          onClick={() => handleDelete(item.bookId)}/>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default BookList