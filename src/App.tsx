import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieList } from './pages/MovieList';
import AddScreen from './pages/AddScreen';
import axios from 'axios';

function App() {
    axios.defaults.baseURL = 'http://localhost:8000/api/';

    useEffect(() => {
        document.body.style.colorScheme = 'dark';
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/add" element={<AddScreen />} />
                <Route path="*" element={<div>404 | Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
