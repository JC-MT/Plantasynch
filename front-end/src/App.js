import { Routes, Route } from "react-router-dom"; 

// COMPONENTS
import Navbar from "./Components/Navbar";

// PAGES
import Welcome from "./Pages/Welcome";
import CreateAccount from "./Pages/CreateAccount";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import ExploreDetails from "./Components/ExploreDetails";

// HOOK
import useNotifications from "./Hooks/useNotifications";

export default function App() {
  const [notification, reFetch] = useNotifications([])

  return (
    <div>
      <nav>
        <Navbar notification={notification}/>
      </nav>
      <main className="mb-24 laptop:mb-24 laptop:mt-24">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<CreateAccount />} />
          <Route path='/my-plants' element={<Home notification={notification} reFetch={() => reFetch()}/>} />
          <Route path='/my-plants/:id' element={<Show />} />
          <Route path='/my-plants/:id/edit' element={<Edit />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/explore/:id' element={<ExploreDetails />} />
          <Route path='/new' element={<New />} />
        </Routes>
      </main>
    </div>
  );
}
