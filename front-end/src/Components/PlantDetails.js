import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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

  const handleDelete = () => {
    axios
      .delete(`${API}/plants/${id}`)
      .then(() => {
        navigate('/my-plants');
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <section>
        <h1 className="text-[50px] text-center mt-[50px]">
          {plant.name}
        </h1>
        <img src={`${plant.image}`} alt='plant'></img>
        <div className="flex gap-[1%] justify-center">
        <Link to={`/snacks`}>
          <button className='w-[100px]'>Back</button>
        </Link>{' '}
        <Link to={`/snacks/${id}/edit`}>
          <button className='w-[100px]'>Edit</button>
        </Link>{' '}
        <button className='w-[100px]' onClick={handleDelete}>
          Delete
        </button>
      </div>
        
    </section>
  );
}