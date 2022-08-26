import { Routes, Route } from "react-router-dom"; 

// COMPONENTS
import Navbar from "./Components/Navbar";

// PAGES
import Welcome from "./Pages/Welcome";
import CreateAccount from "./Pages/CreateAccount";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<CreateAccount />} />
        </Routes>
      </main>
    </div>
  );
}
