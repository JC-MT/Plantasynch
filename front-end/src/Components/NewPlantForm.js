import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import imageUploadIcon from '../icons/imageUploadIcon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = process.env.REACT_APP_API_URL;

export default function NewPlantForm({ loggedInUser }) {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [plant, setPlant] = useState({
    name: '',
    image: '',
    origin: '',
    category: '',
    ideal_light: '',
    ideal_watering: '',
    last_water: '',
    is_healthy: false,
    email: loggedInUser.email || '',
    user_id: loggedInUser.id || 0,
    demo_plant: true,
    actions: [],
    skip_count: 0,
    skip_history: []
  });

  const handleTextChange = (event) => {
    if (loggedInUser.id) {
      plant.demo_plant = false;
    }
    setPlant({ ...plant, [event.target.id]: event.target.value });
  };

  const handleUploadChange = (event) => {
    const fileData = event.target.files[0];

    setFile(fileData);
    setPlant({ ...plant, image: fileData.name });
  };

  const notify = (result) => {
    return result
      ? toast.success(`Your plant was succesfully added. Happy Growing 🪴`, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
      : toast.error(
          `We were unable to add your new plant 🥲 Please check your internet and try again in a few minutes.`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      axios.post(`${API}/images/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    axios
      .post(`${API}/plants`, plant)
      .then(() => {
        notify(true);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        console.warn(err);
        notify(false);
      });
  }

  return (
    <div className="flex place-content-center w-[100%] gap-10 place-items-center p-4">
      <div className="flex flex-col">
        <img
          alt="garden of house plants"
          className="pt-3 rounded-br-[200px] shadow-md place-self-center w-[250px] h-[150px] tablet:w-[580px] tablet:h-[500px]"
          src={`https://getplanta.com/images/feature_2.webp`}
        />
        <p className="p-1 text-center text-[15px] tablet:text-[15px]">
          Plantasynch needs at least a name to add your plant
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 place-items-center tablet:pb-8"
      >
        <h2
          className={`pb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-center text-[32px] antialiased tablet:text-[45px]`}
        >
          Add my Plant
        </h2>
        <div className="flex input-container w-full place-content-between">
          <input
            id="name"
            placeholder="Name"
            value={plant.name}
            type="text"
            onChange={handleTextChange}
            required
            className="input-style w-[50%] mr-4"
          />
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            value={plant.email}
            onChange={handleTextChange}
            className="input-style w-[50%]"
          />
        </div>
        <div className="flex input-container h-[41px]">
          <label className="place-self-center w-[50%] mr-4 px-4 text-[15px]">
            Plant was last watered on?
          </label>
          <input
            id="last_water"
            name="last_water"
            type="date"
            value={plant.last_water}
            onChange={handleTextChange}
            className="input-style w-[50%]"
          />
        </div>
        <div className="flex input-container">
          <label className="custom-file-upload">
            <input
              onChange={handleUploadChange}
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
            />
            <img src={imageUploadIcon} height={20} width={20} />
            {plant.image ? `${plant.image.slice(0, 18)}` : 'Upload plant image'}
            {plant.image.length > 18 ? '...' : ''}
          </label>
          <input
            id="origin"
            type="text"
            name="origin"
            placeholder="Origin"
            value={plant.origin}
            onChange={handleTextChange}
            className="input-style w-[50%] h-[41px]"
          />
        </div>
        <div className="flex input-container w-full place-content-between h-[41px]">
          <div className="flex flex-col w-[50%] mr-4">
            <select
              name="category"
              id="category"
              onChange={handleTextChange}
              className="input-style"
              value={plant.category}
            >
              <option className="" value="" disabled selected hidden>
                Categories
              </option>
              <option value="Tropical">Tropical</option>
              <option value="Bromeliad">Bromeliad</option>
              <option value="Fern">Fern</option>
              <option value="Cactus & Succulent">Cactus & Succulent</option>
              <option value="Aglaonema">Aglaonema</option>
              <option value="Flower">Flower</option>
              <option value="Foliage plant">Foliage plant</option>
              <option value="Anthurium">Anthurium</option>
              <option value="Palm">Palm</option>
              <option value="Dracaena">Dracaena</option>
              <option value="Dieffenbachia">Dieffenbachia</option>
              <option value="Palm">Palm</option>
              <option value="Ficus">Ficus</option>
              <option value="Aralia">Aralia</option>
              <option value="Philodendron">Philodendron</option>
              <option value="Grass">Grass</option>
              <option value="Topiairy">Topiairy</option>
              <option value="Sansevieria">Sansevieria</option>
              <option value="Spathiphyllum">Spathiphyllum</option>
              <option value="Schefflera">Schefflera</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col w-[50%]">
            <select
              name="ideal_light"
              id="ideal_light"
              onChange={handleTextChange}
              className="input-style"
              value={plant.ideal_light}
            >
              <option value="" disabled selected hidden>
                Ideal Lights
              </option>
              <option value="Direct Light">Direct Light</option>
              <option value="Bright Indirect Light">
                Bright Indirect Light
              </option>
              <option value="Medium Light">Medium Light</option>
              <option value="Low Light">Low Light</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col input-container h-[41px]">
          <select
            name="ideal_watering"
            id="ideal_watering"
            onChange={handleTextChange}
            className="input-style"
            value={plant.ideal_watering}
          >
            <option value="" disabled selected hidden>
              Ideal Watering
            </option>
            <option value="Keep moist between watering. Must not be dry between watering.">
              Keep moist between watering. Must not be dry between watering.
            </option>
            <option value="Keep moist between watering. Water when soil is half dry.">
              Keep moist between watering. Water when soil is half dry.
            </option>
            <option value="Water only when the soil is dry. Must be dry between watering.">
              Water only when the soil is dry. Must be dry between watering.
            </option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-row w-[100%] place-content-center px-4">
          <Link to={`/my-plants`} className="w-[50%]">
            <button className="button-style m-0 w-[100%]">Nevermind</button>
          </Link>
          <input
            value="Add Plant"
            type="submit"
            className="m-0 button-style w-[50%]"
          />
        </div>
      </form>
      <div className="z-50">
        <ToastContainer
          limit={1}
          toastStyle={{ color: 'white', backgroundColor: 'black' }}
        />
      </div>
    </div>
  );
}
