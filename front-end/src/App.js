import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

// COMPONENTS
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Loader from './Components/Layout/Loader';
import Toast from './Components/UI/Toast';

// PAGES
import Welcome from './Pages/Home/Welcome';
import CreateAccount from './Pages/Account/CreateAccount';
import LogIn from './Pages/Account/LogIn';
import Home from './Pages/Plants/Home';
import Show from './Pages/Plants/Show';
import New from './Pages/Plants/New';
import Edit from './Pages/Plants/Edit';
import ExplorePage from './Pages/ExplorePlants/ExplorePage';
import ExploreShowPage from './Pages/ExplorePlants/ExploreShowPage';

// HOOK
import useNotifications from './Hooks/useNotifications';

export default function App() {
  const { pathname } = useLocation();
  const [notification, reFetch] = useNotifications([]);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <>
      <nav>
        <Navbar notification={notification} loggedInUser={loggedInUser} />
      </nav>
      <main className="pt-20 tablet:pt-24">
        <Loader pathname={pathname} />
        <Routes>
          <Route
            path="/"
            element={
              <Welcome
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<CreateAccount setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/log-in"
            element={<LogIn setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="/my-plants"
            element={
              <Home
                loggedInUser={loggedInUser}
                notification={notification}
                reFetch={() => reFetch()}
              />
            }
          />
          <Route
            path="/my-plants/:id"
            element={<Show notification={notification} />}
          />
          <Route path="/my-plants/:id/edit" element={<Edit />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route
            path="/explore/:id"
            element={<ExploreShowPage loggedInUser={loggedInUser} />}
          />
          <Route path="/new" element={<New loggedInUser={loggedInUser} />} />
        </Routes>
        <Footer pathname={pathname} />
      </main>
      <Toast />
    </>
  );
}
