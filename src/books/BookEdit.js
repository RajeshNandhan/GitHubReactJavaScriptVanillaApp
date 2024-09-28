import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import fetchPut from "../shared/apiFetch/fetchPut";
import BookDataContext from "../shared/context/BookDataContext";

const BookEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const API_URL = 'http://localhost:5102/api/book';
    const {bookItems, setBookItems} = useContext(BookDataContext);
    const selectedBook = bookItems.find(item => (item.bookId).toString() === id);

    const [bookItem, setBookItem] = useState(null);
    const [bookEditError, setBookEditError] = useState(null);

    //console.log(selectedBook)

    // useEffect(() => {
    //     const fetchItems = async () => {
    //         try {
    //             const response = await fetch(`${API_URL}/${id}`);

    //             if (!response.ok) 
    //                 throw Error('Did not receive expected data');

    //             const responseValue = await response.json();
    //             setBookSelected(responseValue);
    //             console.log(responseValue)
    //         } catch (err) {
    //             //setFetchError(err.message);
    //             console.log(err)
    //         } finally {
    //             //setIsLoading(false);
    //         }
    //     }

    //     //setTimeout(() => fetchItems(), 2000);
    //     fetchItems();

    // }, [])


    useEffect(() => {
        if (selectedBook) {
            setBookItem(selectedBook)
        }
    }, [selectedBook])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookItem(prev => ({
            ...prev,
            // [name]: type === 'checkbox' ? checked : value
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        setBookEditError(null);
        const updateRequestUrl = `${API_URL}/${id}`;
        try {
            await fetchPut(updateRequestUrl, bookItem);
            setBookItems(bookItems.map(post => post.bookId === bookItem.bookId ? { ...bookItem } : post));
            setBookItem(null);
            navigate('/book');
        } catch(err){
            //console.log('--> Call to handleSaveClick with catch err');
            setBookEditError(err.message);
        }
    };

    const handleCancelClick = (e) => {
        setBookItem(null);
        navigate('/book');
    };

    return (
        <main>
            {bookEditError && <p className="statusMsg" style={{ color: "red" }}>{bookEditError}</p>}
            {bookItem ? (
                <form className="bookEditForm" onSubmit={(e) => { e.preventDefault();}}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="bookName">Name</label>
                                </td>
                                <td>
                                    <input name="bookName" type="text" value = {bookItem.bookName} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                Category
                                </td>
                                <td>
                                    <input name="bookCategory"  type="text" value = {bookItem.bookCategory} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Edition
                                </td>
                                <td>
                                    <input name="edition"  type="text" value = {bookItem.edition} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Price
                                </td>
                                <td>
                                    <input name="price"  type="text" value = {bookItem.price} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Image
                                </td>
                                <td>
                                    <input name="image"  type="text" value = {bookItem.image} onChange={handleChange}/>
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