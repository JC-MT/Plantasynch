import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

export default function PlantDetails() {
  const [plant, setPlant] = useState([]);
  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [id, navigate]);

  console.log(plant)
  return (
    <section>
        <img src={`${plant.image}`} alt='plant'></img>
        <p>{plant.name}</p>
    </section>
  );
}