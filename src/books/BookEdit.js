import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import fetchPut from "../shared/apiFetch/fetchPut";

const BookEdit = () => {

    const { id } = useParams();
    const API_URL = 'http://localhost:5102/api/book';
    const [bookSelected, setBookSelected] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchItems = async () => {
            
            try {
                const response = await fetch(`${API_URL}/${id}`);

                if (!response.ok) 
                    throw Error('Did not receive expected data');

                const responseValue = await response.json();
                setBookSelected(responseValue);
                console.log(responseValue)
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookSelected(prev => ({
            ...prev,
            // [name]: type === 'checkbox' ? checked : value
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        const updateRequestUrl = `${API_URL}/${id}`;
        const result = await fetchPut(updateRequestUrl, bookSelected);
        
        if(result) {
            console.log(result)
            //setFetchError(err.message);
        } else {
            navigate('/book');
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        console.log(e)
        navigate('/book');
    };

    return (
        <main>{bookSelected ? (
            <form className="bookEditForm" onSubmit={(e) => { e.preventDefault();}}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="bookName">Name</label>
                            </td>
                            <td>
                                <input name="bookName" type="text" value = {bookSelected.bookName} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Category
                            </td>
                            <td>
                                <input name="bookCategory"  type="text" value = {bookSelected.bookCategory} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Edition
                            </td>
                            <td>
                                <input name="edition"  type="text" value = {bookSelected.edition} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Price
                            </td>
                            <td>
                                <input name="price"  type="text" value = {bookSelected.price} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Image
                            </td>
                            <td>
                                <input name="image"  type="text" value = {bookSelected.image} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr className="item">
                            <td style={{columnSpan : 2}}>
                                <FaBackspace role='button' onClick={handleCancelClick} 
                                    tabIndex="1" name="Cancel" title="Press to Cancel"/>
                                <FaSave role='button' onClick={handleSaveClick} tabIndex="0" 
                                    name="Save" title="Press to Save changes"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
         ): (
            <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
        )}</main>
    )
}

export default BookEdit;