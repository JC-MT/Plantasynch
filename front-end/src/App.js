import { Routes, Route, useLocation } from "react-router-dom"; 
import { useState, useEffect } from "react";

// COMPONENTS
import Navbar from "./Components/Navbar";
import ExploreDetails from "./Components/ExploreDetails";
import Scanner from "./Components/Scanner";

// PAGES
import Welcome from "./Pages/Welcome";
import CreateAccount from "./Pages/CreateAccount";
import LogIn from "./Pages/LogIn"
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Edit from "./Pages/Edit";

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

    document.body.scrollTop = document.documentElement.scrollTop = 0

  }, [location.pathname])

  console.log(notification)
  
  return (
    <div>
      <nav>
        <Navbar notification={notification} loggedInUser={loggedInUser}/>
      </nav>
      <main className="pt-20 tablet:pt-24">
        <div className={`z-50 fixed flex bg-white top-0 left-0 right-0 h-screen p-4 place-content-center w-screen ${loader ? '' : 'hidden'}`}>
          <img className={`place-self-center z-50 px-2 py-20 tablet:p-0 tablet:h-[90%] tablet:w-[40%] tablet:max-w-[450px] tablet:max-h-[550px]`} src='https://media2.giphy.com/media/daa8oT5L8Ox3ffWVjr/giphy.gif'/>
        </div>
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
          <Route path='/scanner' element={<Scanner loggedInUser={loggedInUser}/>} />
        </Routes>
      </main>
    </div>
  );
}
