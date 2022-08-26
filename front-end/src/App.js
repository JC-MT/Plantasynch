import { Routes, Route } from "react-router-dom"; 

// COMPONENTS
import Navbar from "./Components/Navbar";

// PAGES
import Welcome from "./Pages/Welcome";
import CreateAccount from "./Pages/CreateAccount";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Show from "./Pages/Show";
import New from "./Pages/New"
import Edit from "./Pages/Edit";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<CreateAccount />} />
          <Route path='/my-plants' element={<Home />} />
          <Route path='/my-plants/:id' element={<Show />} />
          <Route path='/my-plants/:id/edit' element={<Edit />} />
          <Route path='/my-plants/new' element={<New />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </main>
    </div>
  );
}
