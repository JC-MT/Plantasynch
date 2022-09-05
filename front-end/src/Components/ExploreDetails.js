import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function ExploreDetails() {
  const [explore, setExplore] = useState({})
  const [newplant, setNewPlant] = useState({
    name: '',
    image: "",
    origin: '',
    category: '',
    ideal_light: "",
    ideal_watering: "",
    last_water: 0,
    is_healthy: false,
    email: ''
  })
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/explore/${id}`)
      .then((res) => {
        console.log(res)
        setExplore(res.data.payload);
        return res.data.payload
      }).then((res) => {
        setNewPlant({
          name: document.getElementById('name').textContent,
          image: "https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg",
          origin: res.origin,
          category: res.category,
          ideal_light: res.ideallight,
          ideal_watering: res.watering,
          last_water: '',
          is_healthy: false,
          email: ''
        })
      })
      .catch((err) => {
        console.log(err)
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${API}/plants`, newplant)
      .then((res) => {
        notify()
        setNewPlant(res.data)
        setTimeout(() => navigate('/my-plants'), 4000)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  const spinner = (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-b-2 border-gray-900 rounded-full animate-spin mb-6"></div>
    </div>
  );

  const getCommonNames = () => {
    return explore.common ? explore.common[0] : spinner
  }

  const notify = () => toast.info(`We just added ${newplant.name} to your garden. Congrats! 🪴`, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  return (
    <section className='flex flex-col gap-1 place-items-center p-2'>
        <h1 id='name' className="text-[50px] text-center p-2 tablet:text-[70px]">
        {getCommonNames()}
        </h1>
        <img className='place-self-center p-2 rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg`} alt='plant'></img>
        <p><strong>Latin name: </strong>{explore.latin}, from the {explore.family} Family</p>
        <p><strong>Water Tips: </strong>{explore.watering}.</p>
        <p ><strong>Ideal Light: </strong>{explore.ideallight}</p>
        <p><strong>Known as: </strong><em>{explore.common ? `${explore.common.join(' & ')}` : ''}</em></p>
        <div onClick={handleSubmit} className='hover:bg-green-300 hover:cursor-pointer button-style m-0 w-fit flex flex-row gap-1 justify-center place-items-center shadow-xl p-1'>
          <p>Add to</p>
          <img className='place-self-center w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        </div>
        <ToastContainer
          limit={1}
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
    </section>
  );
}