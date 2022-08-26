import { Routes, Route } from "react-router-dom"; 

// COMPONENTS
import Navbar from "./Components/Navbar";

// PAGES
import Welcome from "./Pages/Welcome";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </main>
    </div>
  );
}
