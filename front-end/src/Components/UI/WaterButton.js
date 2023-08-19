import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useWaterConfirmation from '../../Hooks/useWaterConfirmation';
import useToast from '../../Hooks/useToast';
const API = process.env.REACT_APP_API_URL;

export default function WaterButton({ needsWater, last_water, plant }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sendToast] = useToast('waterButton');

  const handleUpdate = () => {
    axios
      .put(`${API}/plants/water/${id}`)
      .then(() => {
        sendToast(true, plant.name);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        sendToast(false, plant.name);
        console.warn(err);
      });
  };

  function handleWatering() {
    return needsWater || !last_water ? handleUpdate() : setConfirmation(true);
  }
  const [confirmation, setConfirmation, modelConfirmation] =
    useWaterConfirmation({ handleUpdate, plant });

  return (
    <div>
      <div
        onClick={() => handleWatering()}
        className="hover:animate-[pulse_2s_ease-in-out_infinite] flex flex-row place-self-center place-items-center place-content-center button-style mt-0 w-44 h-12"
      >
        <span className="text-lg whitespace-nowrap">Water Plant</span>
        <img
          alt="water icon"
          className="place-self-center hover:cursor-pointer w-[35px] h-[35px]"
          src="https://cdn-icons-png.flaticon.com/512/2514/2514435.png"
        ></img>
      </div>
      {confirmation ? modelConfirmation : ''}
    </div>
  );
}
