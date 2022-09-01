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
    <section className='flex flex-col gap-1 animate-pulse'>
        <h1 className="text-[50px] text-center mt-[50px]">
          {plant.name}
        </h1>
        <img className='place-self-center w-[300px] h-[300px]' src={`${plant.image}`} alt='plant'></img>
        <div className="flex flex-row gap-5 justify-center ">
          <Link to={`/my-plants`}>
            <button className='button-style'>Back</button>
          </Link>{' '}
          <Link to={`/my-plants/${id}/edit`}>
            <button className='button-style'>Edit</button>
          </Link>{' '}
          <button className='button-style' onClick={handleDelete}>
            Delete
          </button>
        </div>
        
    </section>
  );
}