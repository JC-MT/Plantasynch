import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

export default function ExploreDetails() {
  const [plant, setPlant] = useState([]);
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

  const getCommonNames = () => {
    return plant.common ? plant.common[0] : '?'
  }

  return (
    <section>
        <h1 className="text-[50px] text-center mt-[50px]">
        {getCommonNames()}
        </h1>
        <img src={`https://dummyimage.com/200x200/000000/ffffff.jpg&text=House+Plant`} alt='plant'></img>
        <p>Latin name: {plant.latin}, from the {plant.family} Family</p>
        <p>Ideal Light: {plant.ideallight}</p>
        <p>Water Tips: {plant.watering}.</p>
        <p>{plant.common ? `Known as: ${plant.common.join(', ')}` : ''}</p>
    </section>
  );
}