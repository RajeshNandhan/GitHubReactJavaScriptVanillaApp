import { Link } from 'react-router-dom';

const Nav = ({ search, setSearch }) => {
    return (
        <nav className="Nav">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                <li><Link to="/book">Books</Link></li>
                                <li><Link to="/person">Peoples</Link></li>
                            </ul>
                        </td>
                        <td>
                        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="search">Search Posts</label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search Posts"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </nav>
    )
}

export default Nav