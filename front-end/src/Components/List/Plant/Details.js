import axios from 'axios';
import * as dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SkipButton from '../../UI/SkipButton';
import PlantHistory from '../../UI/PlantHistory';
import OptionsButton from '../../UI/OptionsButton';
import WaterButton from '../../UI/WaterButton';
import useDeleteModel from '../../../Hooks/useDeleteModel';

const API = process.env.REACT_APP_API_URL;
const AWS = process.env.REACT_APP_AWS_URL;

export default function Details({ notification }) {
  const { id } = useParams();
  const [plant, setPlant] = useState([]);
  const [needsWater, setNeedsWater] = useState(false);
  const navigate = useNavigate();
  const [deleteModel, setDeleteModel, modelStructure] = useDeleteModel({
    id,
    plant
  });

  useEffect(() => {
    function getNeedsWater(notification) {
      let foundInNotifications = notification.find(
        (plant) => plant.id === Number(id)
      );

      if (foundInNotifications) {
        setNeedsWater(true);
      }
    }

    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .then(() => {
        getNeedsWater(notification);
      })
      .catch(() => {
        navigate('/not-found');
      });
  }, [id, navigate, notification]);

  const spinnerStructure = (
    <div id="spinner" className="flex flex-col items-center justify-center p-5">
      <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <p className="w-96 italic text-center p-5">
        Plantasync data is hosted on a free cloud web-service. This may cause a
        response delay of up to 30 seconds for the first request.
      </p>
    </div>
  );

  const showStructure = (
    <div className="p-2 tablet:pt-12 flex flex-col tablet:flex-row tablet:gap-10 place-items-center place-content-center gap-1 text-center">
      <header className="flex items-center justify-center tablet:place-self-start">
        <div
          className="w-screen tablet:w-[400px] h-[380px] place-self-center"
          style={{
            background: `url('${AWS}${plant.image}') no-repeat center`,
            backgroundSize: '400px 380px'
          }}
        >
          <OptionsButton
            id={id}
            setDeleteModel={setDeleteModel}
            name={plant.name}
          />
        </div>
      </header>
      <div className="flex flex-col place-self-center text-left p-2 tablet:pt-6 w-screen max-w-[500px]">
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased">
          Plant Details:
        </h1>
        <p
          className={`${
            !plant.last_water || needsWater
              ? 'animate-[pulse_1s_ease-in-out_infinite] text-red-400'
              : ''
          }`}
        >
          <strong>Last Watered:</strong>
          {plant.last_water
            ? ` ${dayjs(plant.last_water).format('dddd, MMM D, YYYY')}`
            : ` Has never been watered. Please edit the date or press the water plant button to water today.`}
        </p>
        <p>
          <strong>Category:</strong> {plant.category}
        </p>
        <p>
          <strong>Origin:</strong> {plant.origin}
        </p>
        <p>
          <strong>Ideal Light:</strong> {plant.ideal_light}
        </p>
        <p>
          <strong>Water Tips:</strong> {plant.ideal_watering}
        </p>
        <div className="flex mt-2 flex-row h-12 w-full justify-center">
          <SkipButton name={plant.name} skip_count={plant.skip_count} />
          <WaterButton
            needsWater={needsWater}
            last_water={plant.last_water}
            plant={plant}
          />
        </div>
        <Link to={`/my-plants`} className="flex place-self-center">
          <button className="text-slate-500 place-self-center text-center hover:text-[#1E1F1D] text-lg w-min mt-1 tablet:w-32">
            ⬅︎ Back
          </button>
        </Link>{' '}
        <PlantHistory actions={plant.actions} />
      </div>
      {deleteModel ? modelStructure : ''}
    </div>
  );

  return plant.name ? showStructure : spinnerStructure;
}
