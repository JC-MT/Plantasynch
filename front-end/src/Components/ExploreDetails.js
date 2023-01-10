import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
        setExplore(res.data.payload);
        return res.data.payload
      }).then((res) => {
        setNewPlant({
          name: res.common[0],
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
        notify(true)
        setNewPlant(res.data)
        setTimeout(() => navigate('/my-plants'), 4000)
      })
      .catch((err) => {
        notify(false)
        console.warn(err)
      })
  }

  const spinnerStructure = (
    <div id="spinner" className="flex mt-[25%] justify-center p-5">
      <div className=" flex w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
    </div>)

  const getCommonNames = () => {
    return explore.common ? explore.common[0] : ''
  }

    const notify = (result) => {
    
      return result ? toast.success(`We just added ${newplant.name} to your garden. Congrats! 🪴.`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    }) : toast.error(`We were unable to add ${newplant.name} to your garden 🥲 Please check your internet and try again in a few minutes.`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    })}

  const showExploreStructure = (
    <section className='flex flex-col gap-1 place-items-center p-2'>
        <h1 id='name' className="text-[50px] text-center p-2 tablet:text-[70px]">
        {getCommonNames()}
        </h1>
        <img className='place-self-center p-2 rounded-full w-[300px] h-[300px] tablet:w-[400px] tablet:h-[400px]' src={`https://img.artpal.com/444151/15-20-2-28-3-14-30m.jpg`} alt='plant'></img>
        <div className='flex flex-col gap-1'>
        <Link to={`/explore`}>
            <button className='button-style mt-0 m-0 w-40 p-1 tablet:w-56 hover:bg-green-300'>Back</button>
        </Link>{' '}
        <div onClick={handleSubmit} className='hover:bg-green-300 hover:cursor-pointer button-style m-0 w-40 tablet:w-56 flex flex-row gap-1 justify-center place-items-center shadow-xl p-1'>
          <p>Add to Garden</p>
          <img alt='plant' className='place-self-center w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        </div>
        </div>
        <div className='flex flex-col text-left p-2'>
        <p><strong>Known as: </strong><em>{explore.common ? `${explore.common.join(' & ')}` : ''}</em></p>
        <p><strong>Latin name: </strong>{explore.latin}, from the {explore.family} Family</p>
        <p ><strong>Ideal Light: </strong>{explore.ideallight}</p>
        <p><strong>Water Tips: </strong>{explore.watering}</p> 
        </div>
        <ToastContainer
          limit={1}
          toastStyle={{ color: 'white', backgroundColor: 'black'}}
          className={'z-50'}
          />
    </section>
  );
  return explore.common ? showExploreStructure : spinnerStructure;
}