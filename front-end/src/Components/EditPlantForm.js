import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useModel from '../Hooks/useModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageUploadIcon from '../icons/imageUploadIcon.png';

const API = process.env.REACT_APP_API_URL;
const AWS = process.env.REACT_APP_AWS_URL;

export default function EditPlantForm() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    email: '',
    user_id: 0,
    demo_plant: true,
    actions: [],
    skip_count: 0,
    skip_history: []
  });

  useEffect(() => {
    axios
      .get(`${API}/plants/${id}`)
      .then((res) => {
        setPlant(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleTextChange = (event) => {
    setPlant({ ...plant, [event.target.id]: event.target.value });
  };

  const handleUploadChange = (event) => {
    const fileData = event.target.files[0];

    setFile(fileData);
  };

  const notify = (result) => {
    return result
      ? toast.success(`Your plant was succesfully updated. Happy Growing 🪴`, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
      : toast.error(
          `We were unable to edit your plant 🥲 Please check your internet and try again in a few minutes.`,
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

  async function handleSubmit(event) {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      await axios
        .post(`${API}/images/posts`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
          if (res.data.success) plant.image = res.data.imageKey;
        })
        .catch(() => {
          notify(false);
          return;
        });
    }

    axios
      .put(`${API}/plants/${id}`, plant)
      .then(() => {
        notify(true);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        console.warn(err);
        notify(false);
      });
  }

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

  const [model, setModel, modelStructure] = useModel({ handleDelete });

  return (
    <div className="flex flex-col tablet:pt-8 h-[100%]">
      <div className="flex flex-col tablet:flex-row place-content-center tablet:w-[100%] gap-2 tablet:gap-10 place-items-center p-2 tablet:p-4">
        <div className="flex flex-col">
          <header className="relative flex items-center justify-center">
            <img
              className="pt-3 tablet:rounded-br-[200px] shadow-md place-self-center tablet:w-[580px] tablet:h-[500px] brightness-75 static w-screen h-[275px]"
              src={`${AWS}${plant.image}`}
              alt="plant"
            ></img>
            <h3 className="absolute text-white font-semibold text-[40px] text-center tablet:text-[40px]">
              {plant.name}
            </h3>
          </header>
          <p className="p-1 tablet:text-center text-[15px] tablet:text-[15px]">
            Any changes cannot be reverced once updated. Happy growing! 🌱
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[500px] flex-col gap-2 tablet:gap-2 laptop:gap-3 place-items-center tablet:pb-8"
        >
          <h2
            className={`pb-2 tablet:pb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-center text-[32px] antialiased tablet:text-[45px]`}
          >
            Edit my Plant
          </h2>
          <div className="flex flex-col gap-3 tablet:gap-0 tablet:flex-row input-container tablet:w-full place-content-between">
            <input
              id="name"
              placeholder="Name"
              value={plant.name}
              type="text"
              onChange={handleTextChange}
              required
              className="input-style tablet:w-[50%] tablet:mr-4"
            />
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              value={plant.email}
              onChange={handleTextChange}
              className="input-style tablet:w-[50%]"
            />
          </div>
          <div className="flex gap-3 tablet:gap-0 input-container">
            <label className="place-self-center tablet:w-[50%] tablet:mr-4 tablet:px-4 text-[15px]">
              Plant was last watered on?
            </label>
            <input
              id="last_water"
              name="last_water"
              type="date"
              value={plant.last_water}
              onChange={handleTextChange}
              className="input-style tablet:w-[50%]"
            />
          </div>
          <div className="flex flex-col gap-3 tablet:gap-0 tablet:flex-row input-container">
            <label className="custom-file-upload w-full tablet:w-1/2">
              <input
                onChange={handleUploadChange}
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <img
                src={imageUploadIcon}
                height={20}
                width={20}
                alt="upload icon"
              />

              {file
                ? `${file.name.slice(0, 18)}`
                : plant.image
                ? `${plant.image.slice(0, 18)}`
                : 'Upload plant image'}

              {file && file.name.length > 18
                ? '...'
                : plant.image.length > 18
                ? '...'
                : ''}
            </label>
            <input
              id="origin"
              type="text"
              name="origin"
              placeholder="Origin"
              value={plant.origin}
              onChange={handleTextChange}
              className="input-style tablet:w-[50%]"
            />
          </div>
          <div className="flex flex-col gap-3 tablet:gap-0 tablet:flex-row input-container place-content-between">
            <div className="flex flex-col tablet:w-[50%] tablet:mr-4">
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
            <div className="flex flex-col tablet:w-[50%]">
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
          <div className="flex flex-col input-container">
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
          <div className="flex gap-1 flex-col tablet:flex-row w-full tablet:w-[100%] place-content-center">
            <Link
              to={`/my-plants`}
              className="align-center button-style text-center m-0 w-full tablet:w-[100%]"
            >
              <button>Nevermind</button>
            </Link>
            <button
              onClick={handleSubmit}
              className="m-0 button-style w-full tablet:w-[100%]"
            >
              Update
            </button>
            <button
              className="mt-0 button-style w-full tablet:w-[100%]"
              onClick={() => setModel(true)}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div>{model ? modelStructure : ''}</div>
      <div className="z-50">
        <ToastContainer
          limit={1}
          toastStyle={{ color: 'white', backgroundColor: 'black' }}
        />
      </div>
    </div>
  );
}
