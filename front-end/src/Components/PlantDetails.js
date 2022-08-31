import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

export default function PlantDetails() {
  const [plant, setPlant] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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
  return (
    <section>
        <h1 className="text-[50px] text-center mt-[50px]">
          {plant.name}
        </h1>
        <img src={`${plant.image}`} alt='plant'></img>
        
    </section>
  );
}