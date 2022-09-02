import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

export default function ExploreDetails() {
  const [plant, setPlant] = useState({
    name: "",
    image: "",
    origin: '',
    category: "",
    ideal_light: "",
    ideal_watering: "",
    last_water: 0,
    is_healthy: false
  })
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/explore/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .catch((err) => {
        console.log(err)
        navigate('/not-found');
      });
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`${API}/plants`, plant)
      .then((res) => {
        setPlant(res.data)
        navigate(`/my-plants`)
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
    return plant.common ? plant.common[0] : spinner
  }

  return (
    <section className='flex flex-col gap-1 place-items-center animate-pulse p-2'>
        <h1 className="text-[50px] text-center p-2">
        {getCommonNames()}
        </h1>
        <img className='place-self-center w-[300px] h-[300px] p-2' src={`https://dummyimage.com/200x200/000000/ffffff.jpg&text=House+Plant`} alt='plant'></img>
        <p>Latin name: {plant.latin}, from the {plant.family} Family</p>
        <p>Ideal Light: {plant.ideallight}</p>
        <p>Water Tips: {plant.watering}.</p>
        <p>{plant.common ? `Known as: ${plant.common.join('- ')}` : ''}</p>
        <div onClick={handleSubmit} className='button-style m-0 w-fit flex flex-row gap-1 justify-center place-items-center shadow-sm'>
          <p>Add to</p>
          <img className='place-self-center w-[25px] h-[25px]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        </div>
    </section>
  );
}