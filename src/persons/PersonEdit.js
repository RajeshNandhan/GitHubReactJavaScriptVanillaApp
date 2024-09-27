import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import axiosBase from "../shared/apiAxios/axiosBase";

const PersonEdit = () => {
    const { id } = useParams();
    const API_URL = 'http://localhost:5102/api/person';
    const [personSelected, setPersonSelected] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchItems = async () => {
            
            try {
                const getRequestUrl = `${API_URL}/${id}`;
                const response = await axiosBase.get(getRequestUrl);
                setPersonSelected(response.data);
                console.log(response.data)
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
        setPersonSelected(prev => ({
            ...prev,
            // [name]: type === 'checkbox' ? checked : value
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        try {
            const updateRequestUrl = `${API_URL}/${id}`;
            const result = await axiosBase.put(updateRequestUrl, personSelected);
            console.log(result.data)
        } catch (err) {
            //setFetchError(err.message);
            console.log(err)
        } finally {
            //setIsLoading(false);
            navigate('/person');
        }
    };

    


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
        e.preventDefault();
        console.log(e)
        navigate('/person');
    };

    return (
        <main>{personSelected ? (
            <form className="personEditForm" onSubmit={(e) => { e.preventDefault();}}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="firstName">First Name</label>
                            </td>
                            <td>
                                <input name="firstName" type="text" value = {personSelected.firstName} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Last Name
                            </td>
                            <td>
                                <input name="lastName"  type="text" value = {personSelected.lastName} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Rank
                            </td>
                            <td>
                                <input name="rank"  type="text" value = {personSelected.rank} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Category
                            </td>
                            <td>
                                <input name="category"  type="text" value = {personSelected.category} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Date of Birth
                            </td>
                            <td>
                                <input name="dateOfBirth" readOnly  type="text" value = {personSelected.dateOfBirth} onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Play Cricket?
                            </td>
                            <td>
                                <input name="isPlayCricket"  readOnly type="text" value = {personSelected.isPlayCricket} onChange={handleChange}/>
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