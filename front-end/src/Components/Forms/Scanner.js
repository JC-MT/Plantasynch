import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL_PLANT;

export default function Scanner({ loggedInUser }) {
  const navigate = useNavigate();
  const [file, setFile] = useState({});
  const [result, setResult] = useState({});
  const [requested, setRequested] = useState(false);
  const [newplant, setNewPlant] = useState({
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

  const handleUpload = (event) => {
    const reader = new FileReader();
    const fileData = event.target.files[0];

    reader.readAsDataURL(fileData);

    reader.onload = () => {
      setFile({
        queryImage: reader.result,
        queryFile: fileData
      });
    };
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const formData = new FormData();
    formData.append('image', file.queryFile);

    await axios
      .post(`${API}/images/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        if (res.data.success) newplant.image = res.data.imageKey;
      })
      .catch((err) => {
        notifyAdd(false, err.data);
        return;
      });

    await axios
      .post(`${API}/plants`, newplant)
      .then((res) => {
        notifyAdd(true);
        setNewPlant(res.data);
        setTimeout(() => navigate('/my-plants'), 4000);
      })
      .catch((err) => {
        notifyAdd(false);
        console.warn(err);
      });
  };

  const identify = async () => {
    if (file.queryFile.length === 0) {
      setRequested(false);
      notify(false);
      return false;
    }

    const form = new FormData();
    form.append('images', file.queryFile);

    fetch(`${API_URL}?include-related-images=true&api-key=${API_KEY}`, {
      method: 'POST',
      body: form
    })
      .then(async (response) => {
        if (response.ok) {
          notify(true);
          setRequested(false);
          return response
            .json()
            .then((result) => {
              setResult(result);
              return result;
            })
            .then((res) => {
              let demoUser = true;
              if (loggedInUser.id) {
                demoUser = false;
              }
              setNewPlant({
                ...newplant,
                name: res.results[0].species.commonNames[0],
                category: res.results[0].species.genus.scientificName,
                email: loggedInUser.email || '',
                user_id: loggedInUser.id || 0,
                demo_plant: demoUser
              });
            })
            .catch(() => {
              setRequested(false);
              notify(false);
            });
        } else {
          const errorData = await response.json();
          setRequested(false);
          notify(false, errorData);
        }
      })
      .catch(() => {
        setRequested(false);
        notify(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRequested(true);
    identify();
  };

  const notify = (result, response) => {
    return result
      ? toast.success(`Scanning was successful. Results are in! 🥳`, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
      : toast.error(
          `${
            response
              ? `Error code: ${response.statusCode} Error Message: ${response.message}`
              : `We were unable to scan your image 🥲 Please check your internet and try again in a few minutes.`
          }`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
  };

  const notifyAdd = (result) => {
    return result
      ? toast.success(
          `We just added ${newplant.name} to your garden. Congrats! 🪴.`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        )
      : toast.error(
          `We were unable to add ${newplant.name} to your garden 🥲 Please check your internet and try again in a few minutes.`,
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
  };

  let results = (
    <div className="flex flex-col place-self-center px-3 tablet:pr-[8%]">
      <h1 className="tracking-normal font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
        Best Match
      </h1>
      <div className="border-2 rounded-lg tablet:mb-4">
        <div className="p-2 flex rounded-tl-md rounded-tr-md flex-row place-content-between bg-slate-300">
          <div>
            <h1 className="tracking-wide font-['baskerville-urw'] subpixel-antialiased font-normal text-[20px]">
              {result.bestMatch}
              <span> 🪴 </span>
            </h1>
            <h1 className="px-1">
              Known as:{' '}
              {result.bestMatch
                ? result.results[0].species.commonNames.join(', ')
                : 'Missing Data!'}
            </h1>
          </div>
          <div>
            <span className="tracking-wide font-['baskerville-urw'] subpixel-antialiased font-normal text-[20px] text-emerald-600">
              {result.bestMatch
                ? Math.round(result.results[0].score * 100)
                : 'Missing Data!'}
              %
            </span>
          </div>
        </div>
        <div className="flex gap-1 h-fit w-fit flex-row place-content-start overflow-scroll p-2">
          {result.bestMatch
            ? result.results[0].images.map((image, idx) => {
                return (
                  <img
                    alt="best-match images"
                    key={idx}
                    className="w-48 h-48"
                    src={`${image.url.m}`}
                  />
                );
              })
            : 'Missing Data!'}
        </div>
      </div>
      <div
        onClick={handleAdd}
        className="mt-3 place-self-center hover:cursor-pointer button-style m-0 w-40 h-12 tablet:w-56 flex flex-row gap-1 justify-center place-items-center shadow-xl p-1"
      >
        <p>Add to Garden</p>
        <img
          alt="plant"
          className="place-self-center w-[30px] h-[30px] tablet:w-[40px] tablet:h-[40px]"
          src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
        />
      </div>

      <h1 className="pt-4 w-full tracking-normal font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
        Other Results
      </h1>
      {result.bestMatch
        ? result.results.slice(1, 5).map((plant) => {
            return (
              <div className="mb-4 border-2 rounded-lg tablet:mb-4">
                <div className="p-2 rounded-tl-md rounded-tr-md flex flex-row place-content-between bg-slate-300">
                  <div>
                    <h1 className="tracking-wide font-['baskerville-urw'] subpixel-antialiased font-normal text-[20px]">
                      {plant.species.scientificName}
                      <span> 🪴 </span>
                    </h1>
                    <h1 className="px-1">
                      Known as:{' '}
                      {plant.species.commonNames.length
                        ? plant.species.commonNames.join(', ')
                        : plant.species.scientificNameWithoutAuthor}
                    </h1>
                  </div>
                  <div>
                    <span className="tracking-wide font-['baskerville-urw'] subpixel-antialiased font-normal text-[20px] text-emerald-600">
                      {plant.score
                        ? Math.round(plant.score * 100)
                        : 'missing score'}
                      %
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-fit w-fit flex-row place-content-start overflow-scroll p-2">
                  {plant.images.length
                    ? plant.images.map((image) => {
                        return (
                          <img
                            alt="other-result images"
                            className="w-48 h-48"
                            src={`${image.url.m}`}
                          />
                        );
                      })
                    : 'Missing Data!'}
                </div>
              </div>
            );
          })
        : 'Missing Data!'}
    </div>
  );

  return (
    <section>
      <div className="flex flex-col tablet:flex-row p-2 tablet:p-4 w-[100%] place-items-center place-content-center">
        <div className="tablet:w-[50%] max-w-[600px] pt-3">
          <div
            className="opacity-90 bg-transparent tablet:mt-10 tablet:w-[600px] h-[220px] tablet:h-[300px] laptop:h-[400px] rounded-tr-[200px] rounded-br-[200px]"
            style={{
              background: `url('https://getplanta.com/images/feature_1.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <p className="p-1 text-md text-left tablet:px-2">
            With the Plantasynch scanner, you will be able to add your plants
            that might be difficult to name. We will analyze your image and send
            top matches your way. <strong>Note:</strong> Clear, Direct, and
            Focused pictures will yield the best results. Happy growing! 🌱
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-screen place-items-center p-2 tablet:w-[45%] tablet:max-w-[600px]"
        >
          <h2
            className={`pb-1 tablet:pb-6 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-center text-[32px] antialiased tablet:text-[45px]`}
          >
            Scan my Plant
          </h2>

          <div
            class={`flex items-center justify-center w-[100%] tablet:w-[400px]`}
          >
            <label
              htmlFor="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div
                class={`flex flex-col items-center justify-center pt-5 pb-6 ${
                  file.queryImage ? 'hidden' : ''
                }`}
              >
                <img
                  alt="plant"
                  className="place-self-center mb-3 w-[40px] h-[40px] tablet:w-[40px] tablet:h-[40px]"
                  src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
                />
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">
                    Click here upload or capture your image
                  </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, or JPG(recommended) (MAX. 800x1280px)
                </p>
              </div>
              <img
                alt="scan-request"
                className={`${
                  file.queryImage ? '' : 'hidden'
                } place-self-center absolute w-[300px] h-[200px]`}
                src={file.queryImage}
              ></img>
              <div
                class={`${
                  requested ? 'before:animate-scanning' : 'hidden'
                } relative w-[300px] h-[200px] before:scanner-clip before:absolute before:w-[2px] place-self-center before:top-0 before:left-0 before:bottom-0`}
              >
                <input
                  onChange={handleUpload}
                  id="dropzone-file"
                  accept="image/*"
                  type="file"
                  className="opacity-0"
                />
              </div>
            </label>
          </div>
          <div className="w-full flex flex-row place-content-center tablet:p-3">
            <div
              className={`${
                file.queryImage
                  ? 'hover:cursor-pointer'
                  : 'hover:cursor-not-allowed'
              } button-style w-full mt-2 m-0 tablet:w-[400px] flex tablet:p-1 flex-row gap-1 justify-center place-items-center shadow-xl p-[10px]`}
            >
              <input
                className={`${
                  file.queryImage
                    ? 'hover:cursor-pointer'
                    : 'hover:cursor-not-allowed pointer-events-none'
                }`}
                value={`${
                  file.queryImage
                    ? 'Analyze my plant for a match'
                    : 'Upload your plant for a match'
                }`}
                type="submit"
              ></input>
              <img
                alt="plant"
                className="place-self-center w-[25px] h-[25px] tablet:w-[40px] tablet:h-[40px]"
                src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="z-50">
        <ToastContainer
          limit={1}
          toastStyle={{ color: 'white', backgroundColor: 'black' }}
        />
      </div>
      {result.bestMatch ? results : ''}
    </section>
  );
}
