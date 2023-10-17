import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Home';
import Editor from './Editor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/editor/:pageId' element={<Editor />} />
      </Routes>
    </Router>
  )
}

export default App;