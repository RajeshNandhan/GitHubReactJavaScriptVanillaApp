import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const PersonList = () => {

    const API_URL = 'http://localhost:5102/api/Person';
    const [items, setItems] = useState([]);
    //const [fetchError, setFetchError] = useState(null);

    useEffect(() => {

        const fetchItems = async () => {
          try {
            const response = await fetch(API_URL);
            if (!response.ok) throw Error('Did not receive expected data');
            const listItems = await response.json();
            console.log(listItems)
            setItems(listItems);
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
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                    <tr key={item.id}>
                        <td><span>{item.firstName}</span> , <span>{item.lastName}</span></td>
                        <td>{item.rank}</td>
                        <td>{item.category}</td>
                        <td>{format(item.dateOfBirth,'MMMM dd, yyyy')}</td>
                        <td>{item.isPlayCricket?'true':'false'}</td>
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