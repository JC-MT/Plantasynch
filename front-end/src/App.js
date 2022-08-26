import { Routes, Route } from "react-router-dom"; 

// PAGES
import Welcome from "./Pages/Welcome";

export default function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </main>
    </div>
  );
}
