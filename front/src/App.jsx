import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { updateInputs, userInputs } from "./components/form/formSource";
import Update from "./pages/update/Update";
import Login from "./pages/sign/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/new" element={<New inputs={userInputs} title="Add New User" />} />
        <Route path="/users/update" element={<Update inputs={updateInputs} title="Update User" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
