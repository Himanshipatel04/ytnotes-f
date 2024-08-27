import React, { useState } from "react";
import Header from "./common/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Footer from "./common/Footer.jsx";
import NoteForm from "./pages/NoteForm.jsx";
import NoteDetail from "./components/NoteDetail.jsx";
import EditNote from "./components/EditNote.jsx";
// import DeleteNote from './components/DeleteNote.jsx';

const App = () => {
  const [searchText, setSearchtext] = useState("");

  const handleSearchText = (val) => {
    setSearchtext(val);
  };

  return (
    <Router>
      <Header searchText={searchText} handleSearchText={handleSearchText} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noteform" element={<NoteForm />} />
        <Route path="/notedetail/:slug" element={<NoteDetail />} />
        <Route path="/editnote/:slug" element={<EditNote />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
