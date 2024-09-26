import Header from './shared/Header';
import Footer from './shared/Footer';
import BookList from './books/BookList';
import PersonList from './persons/PersonList';
import Nav from './shared/Nav';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookEdit from './books/BookEdit';
import Home from './home/home';

function App() {

  const [search, setSearch] = useState('');

  return (
    <Router>
      <div className="App">
          <Header />
          <Nav search={search} setSearch={setSearch}/>
          <Routes>
            <Route exact path="/book"  element={<BookList/>}/>
            <Route exact path="/book/:id"  element={<BookEdit/>}/>
            <Route exact path="/person" element={<PersonList/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
          <Footer />
      </div>
    </Router>
  );
}

export default App;