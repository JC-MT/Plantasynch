import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function ExploreDetails({ loggedInUser }) {
  const [explore, setExplore] = useState({});
  const [newplant, setNewPlant] = useState({
    name: '',
    image: '15-20-2-28-3-14-30m.jpeg',
    origin: '',
    category: '',
    ideal_light: '',
    ideal_watering: '',
    last_water: '',
    is_healthy: false,
    email: '',
    user_id: 0,
    demo_plant: true,
    actions: [],
    skip_count: 0,
    skip_history: []
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/explore/${id}`)
      .then((res) => {
        setExplore(res.data.payload);
        return res.data.payload;
      })
      .then((res) => {
        let demoUser = true;
        if (loggedInUser.id) {
          demoUser = false;
        }
        setNewPlant({
          ...newplant,
          name: res.common[0],
          origin: res.origin,
          category: res.category,
          ideal_light: res.ideallight,
          ideal_watering: res.watering,
          email: loggedInUser.email || '',
          user_id: loggedInUser.id || 0,
          demo_plant: demoUser
        });
      })
      .catch((err) => {
        console.log(err);
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    axios
      .post(`${API}/plants`, newplant)
      .then((res) => {
        notify(true);
        setNewPlant(res.data);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        notify(false);
        console.warn(err);
      });
  };

  const spinnerStructure = (
    <div id="spinner" className="flex flex-col items-center justify-center p-5">
      <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <p className="w-96 italic text-center p-5">
        Plantasync data is hosted on a free cloud web-service. This may cause a
        response delay of up to 30 seconds for the first request.
      </p>
    </div>
  );

  const getCommonNames = () => {
    return explore.common ? explore.common[0] : '';
  };

  const notify = (result) => {
    return result
      ? toast.success(
          `We just added ${newplant.name} to your garden. Congrats! 🪴.`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        )
      : toast.error(
          `We were unable to add ${newplant.name} to your garden 🥲 Please check your internet and try again in a few minutes.`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
  };

  const showExploreStructure = (
    <section>
      <div className="flex flex-col tablet:flex-row tablet:gap-8 gap-1 place-items-center place-content-center p-2 h-screen max-h-[600px] tablet:py-12">
        <header className="relative flex items-center justify-center tablet:place-self-start">
          <img
            className="grayscale-[50%] brightness-75 place-self-center static w-screen h-[275px] tablet:w-[400px] tablet:h-[400px]"
            src={`https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg`}
            alt="plant"
          ></img>
          <h3 className="absolute text-white font-semibold text-[40px] text-center tablet:text-[40px]">
            {getCommonNames()}
          </h3>
        </header>
        <div className="place-self-start tablet:pt-10">
          <div className="flex flex-col text-left tablet:p-2 pt-0 tablet:text-[18px]">
            <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased">
              Plant Details:
            </h1>
            <p className="pl-1">
              <strong>Known as: </strong>
              <em>{explore.common ? `${explore.common.join(' & ')}` : ''}</em>
            </p>
            <p className="pl-1">
              <strong>Latin name: </strong>
              {explore.latin}, from the {explore.family} Family
            </p>
            <p className="pl-1">
              <strong>Ideal Light: </strong>
              {explore.ideallight}
            </p>
            <p className="pl-1">
              <strong>Water Tips: </strong>
              {explore.watering}
            </p>
          </div>
          <div className="flex w-[100%] place-items-center text-center flex-row gap-1 tablet:p-2 tablet:pb-8">
            <Link
              to={`/explore`}
              className="flex place-content-center mt-0 m-0 w-[50%] button-style h-[40px] tablet:h-[50px] p-1"
            >
              <div className="place-self-center">Back to List</div>
            </Link>{' '}
            <div
              onClick={handleSubmit}
              className="hover:cursor-pointer w-[50%] h-[40px] tablet:h-[50px] button-style m-0 flex flex-row gap-1 justify-center place-items-center shadow-xl p-1"
            >
              <p>Add to Garden</p>
              <img
                alt="plant"
                className="place-self-center w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]"
                src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
              />
            </div>
          </div>
        </div>
        <div className="z-50">
          <ToastContainer
            limit={1}
            toastStyle={{ color: 'white', backgroundColor: 'black' }}
          />
        </div>
      </div>
    </section>
  );
  return explore.common ? showExploreStructure : spinnerStructure;
}
