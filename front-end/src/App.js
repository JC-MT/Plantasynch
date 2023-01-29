import { Routes, Route, useLocation } from "react-router-dom"; 
import { useState, useEffect } from "react";

// COMPONENTS
import Navbar from "./Components/Navbar";

// PAGES
import Welcome from "./Pages/Welcome";
import CreateAccount from "./Pages/CreateAccount";
import LogIn from "./Pages/LogIn"
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Edit from "./Pages/Edit";
import ExploreDetails from "./Components/ExploreDetails";

// HOOK
import useNotifications from "./Hooks/useNotifications";

export default function App() {
  let location = useLocation()
  const [ loader, setLoader] = useState(false)
  const [notification, reFetch] = useNotifications([])
  const [ loggedInUser, setLoggedInUser ] = useState({})

  useEffect(() => {
    setLoader((loader) => { setLoader(!loader) })

    setTimeout(() => {setLoader(false)}, 1000)

  }, [location.pathname])
  
  return (
    <div>
      <nav>
        <Navbar notification={notification}/>
      </nav>
      <main className="pt-24 laptop:mb-24 laptop:mt-24">
      <img className={`${loader ? '' : 'hidden'} z-40 px-2 w-screen top-0 fixed place-self-center bg-white py-20`} src='https://media2.giphy.com/media/daa8oT5L8Ox3ffWVjr/giphy.gif'/>
        <Routes>
          <Route path="/" element={<Welcome loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
          <Route path="/sign-up" element={<CreateAccount setLoggedInUser={setLoggedInUser} />} />
          <Route path="/log-in" element={<LogIn setLoggedInUser={setLoggedInUser} />} />
          <Route path='/my-plants' element={<Home loggedInUser={loggedInUser} notification={notification} reFetch={() => reFetch() }/>} />
          <Route path='/my-plants/:id' element={<Show notification={notification}/>} />
          <Route path='/my-plants/:id/edit' element={<Edit />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/explore/:id' element={<ExploreDetails loggedInUser={loggedInUser}/>} />
          <Route path='/new' element={<New loggedInUser={loggedInUser}/>} />
\        </Routes>
      </main>
    </div>
  );
}
