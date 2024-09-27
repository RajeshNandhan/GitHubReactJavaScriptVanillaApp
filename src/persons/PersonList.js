import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import axiosBase from '../shared/apiAxios/axiosBase';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const PersonList = () => {

    const API_URL = 'http://localhost:5102/api/person';
    const [items, setItems] = useState([]);
    //const [fetchError, setFetchError] = useState(null);

    useEffect(() => {

        const fetchItems = async () => {
          try {
            const response = await axiosBase.get(API_URL);
            setItems(response.data);
            console.log(response.data)
            //setFetchError(null);
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

    const handleDelete = async (personId) => {
      debugger
      try {
        const deleteRequestUrl = `${API_URL}/${personId}`;
        await axiosBase.delete(deleteRequestUrl);
        const newItems = items.filter(item => item.personId !== personId);
        setItems(newItems);
        console.log(newItems);
        //setFetchError(null);
      } catch (err) {
        //setFetchError(err.message);
        console.log(err)
      } finally {
        //setIsLoading(false);
      }
    }

    return (
        <main>
           {items.length ? (
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    <th>Category</th>
                    <th>Date Of Birth</th>
                    <th>Play Cricket?</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                    <tr className="item" key={item.id}>
                        <td><span>{item.firstName}</span> , <span>{item.lastName}</span></td>
                        <td>{item.rank}</td>
                        <td>{item.category}</td>
                        <td>{format(item.dateOfBirth,'MMMM dd, yyyy')}</td>
                        <td>{item.isPlayCricket?'true':'false'}</td>
                        <td>
                          <Link to={`/person/${item.personId}`}><FaEdit title="Press to edit a Person"/></Link>
                        </td>
                        <td>
                          <FaTrashAlt role='button' title="Press to delete a Person"
                           onClick={() => handleDelete(item.personId)}/>
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

export default PersonList