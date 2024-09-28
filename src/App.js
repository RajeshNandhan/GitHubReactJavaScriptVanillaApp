import Header from './shared/component/Header';
import Footer from './shared/component/Footer';
import BookList from './books/BookList';
import PersonList from './persons/PersonList';
import Nav from './shared/component/Nav';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BookEdit from './books/BookEdit';
import Home from './home/home';
import PersonEdit from './persons/PersonEdit';
import { BookDataProvider } from './shared/context/BookDataContext';
import { PersonDataProvider } from './shared/context/PersonDataContext';

function App() {

  const [search, setSearch] = useState('');

  return (
    <Router>
      <div className="App">
        <Header />
        <Nav search={search} setSearch={setSearch} />
        <PersonDataProvider>
          <BookDataProvider>
            <Routes>

              <Route exact path="/book" element={<BookList search={search} />} />
              <Route exact path="/book/:id" element={<BookEdit />} />

              <Route exact path="/person" element={<PersonList />} />
              <Route exact path="/person/:id" element={<PersonEdit />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BookDataProvider>
        </PersonDataProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;