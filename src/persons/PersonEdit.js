import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import axiosBase from "../shared/apiAxios/axiosBase";
import PersonDataContext from '../shared/context/PersonDataContext';

const PersonEdit = () => {
    const { id } = useParams();
    const API_URL = 'http://localhost:5102/api/person';
    const navigate = useNavigate();
    const {personItems, setPersonItems} = useContext(PersonDataContext);
    const selectedPerson = personItems.find(item => (item.personId).toString() === id);
    //
    const [personItem, setPersonItem] = useState(null);
    const [personEditError, setPersonEditError] = useState(null);

    /*Update personItem when selectedPerson has a valid data for the ID param*/
    useEffect(() => {
        if (selectedPerson) {
            // setEditTitle(post.title);
            // setEditBody(post.body);
            setPersonItem(selectedPerson);
        }
    }, [selectedPerson])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPersonItem(prev => ({
            ...prev,
            // [name]: type === 'checkbox' ? checked : value
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        setPersonEditError(null);
        try {
            //console.log('--> Call to handleSaveClick to call axiosBase.put');
            const updateRequestUrl = `${API_URL}/${id}`;
            await axiosBase.put(updateRequestUrl, personItem);
            setPersonItems(personItems.map(post => post.personId === personItem.personId ? { ...personItem } : post));
            setPersonItem(null)
            navigate('/person');
        } catch (err) {
            //console.log('--> Call to handleSaveClick with catch err');
            setPersonEditError(err.message);
        }
    };

    // const handleSaveClick = async () => {
    //     const updateRequestUrl = `${API_URL}/${id}`;
    //     const result = await fetchPut(updateRequestUrl, bookItem);

    //     const result = await axiosBase.put(updateRequestUrl, personItem);
        
    //     if(result) {
    //         console.log(result)
    //         //setFetchError(err.message);
    //     } else {
    //         //setBookItems(posts.map(post => post.bookId === id ? { ...response.data } : post));
    //         setPersonItems(personItems.map(post => post.personId === personItem.personId ? { ...personItem } : post));
    //         setPersonItem(null)
    //         console.log('rajesh')
    //         // console.log(bookItems)
    //         // console.log(bookItem)
    //         navigate('/person');
    //     }
    // };


    // const handleEdit = async (id) => {
    //     const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    //     const updatedPost = { id, title: editTitle, datetime, body: editBody };
    //     try {
    //         const response = await api.put(`/posts/${id}`, updatedPost);
    //         setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
    //         setEditTitle('');
    //         setEditBody('');
    //         history.push('/');
    //     } catch (err) {
    //         console.log(`Error: ${err.message}`);
    //     }
    // }



    const handleCancelClick = (e) => {
        setPersonItem(null);
        navigate('/person');
    };

    return (
        <main>
            {personEditError && <p className="statusMsg" style={{ color: "red" }}>{personEditError}</p>}
            {personItem ? (
                <form className="personEditForm" onSubmit={(e) => { e.preventDefault();}}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="firstName">First Name</label>
                                </td>
                                <td>
                                    <input name="firstName" type="text" value = {personItem.firstName} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                                </td>
                                <td>
                                    <input name="lastName"  type="text" value = {personItem.lastName} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Rank
                                </td>
                                <td>
                                    <input name="rank"  type="text" value = {personItem.rank} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Category
                                </td>
                                <td>
                                    <input name="category"  type="text" value = {personItem.category} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Date of Birth
                                </td>
                                <td>
                                    <input name="dateOfBirth" readOnly  type="text" value = {personItem.dateOfBirth} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Play Cricket?
                                </td>
                                <td>
                                    <input name="isPlayCricket"  readOnly type="text" value = {personItem.isPlayCricket} onChange={handleChange}/>
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

export default PersonEdit