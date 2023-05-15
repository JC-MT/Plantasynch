import axios from 'axios';
import { useEffect, useState } from 'react';
import ExplorePlant from './ExplorePlant';

const API = process.env.REACT_APP_API_URL;

export default function ExploreIndex() {
  const [explore, setExplore] = useState([]);
  const [search, setSearch] = useState('');
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/plants/explore`)
      .then((res) => {
        setExplore(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTextChange = (event) => {
    setSearch(event.target.value);
  };

  function handleFiltering(plant, search) {
    if (search.length) {
      let allNames = plant.common;
      for (let name of allNames) {
        if (name.toLowerCase().startsWith(search.toLowerCase().trim())) {
          return plant;
        }
        if (name.split(' ').length > 1) {
          for (let word of name.split(' ')) {
            if (word.toLowerCase().startsWith(search.toLowerCase().trim())) {
              return plant;
            }
          }
        }
      }
    } else {
      return plant.common.length ? plant : null;
    }
  }

  const currentDisplay = (explore, search) => {
    const results = explore
      .filter((plant) => handleFiltering(plant, search))
      .map((plant, idx) => {
        return (
          <ExplorePlant
            key={idx}
            id={plant.id}
            name={plant.common[0]}
            knownAs={plant.common}
            latin={plant.latin}
            category={plant.category}
          />
        );
      });
    return results;
  };

  const explorePlantsContainer = (
    <div className="laptop:grid-view px-2 tablet:px-[12%] tablet:py-6">
      {currentDisplay(explore, search)}
    </div>
  );

  const spinnerStructure = (
    <div id="spinner" className="flex flex-col items-center justify-center p-5">
      <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <p className="w-96 italic text-center p-5">
        Plantasync data is hosted on a free cloud web-service. This may cause a
        response delay of up to 30 seconds for the first request.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 tablet:pt-0">
      <div
        onMouseLeave={() => {
          setAnimation(false);
        }}
        className="bg-transparent flex flex-row p-5 rounded-full h-[94px] w-[94px] fixed bottom-8 right-2 tablet:bottom-12 tablet:right-24 laptop:right-[12%] hover:cursor-n-resize"
      >
        <div
          onClick={() => {
            setAnimation(true);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            setTimeout(() => setAnimation(false), 1000);
          }}
          onMouseEnter={() => {
            setAnimation(true);
          }}
          className={`bg-[#224722] p-2 w-14 h-14 shadow-md rounded-full flex items-center justify-center hover:cursor-n-resize ${
            animation ? 'animate-bounce' : ''
          }`}
        >
          <svg
            class="rotate-180 w-8 h-8 text-[#D9F8B9]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>

      <input
        className="focus:outline-none bg-slate-50 flex place-self-center flex-center sticky top-28 tablet:top-40 items-center justify-center border-2 rounded-full w-[90%] px-4 p-2 shadow-xl tablet:m-0 tablet:w-[400px]"
        type="search"
        id="search"
        placeholder="Search plant by name"
        onChange={handleTextChange}
      />
      {explore.length ? explorePlantsContainer : spinnerStructure}
      <div className="p-4 text-center tracking-wide uppercase antialiased">
        Currently: {currentDisplay(explore, search).length} plant results
      </div>
    </div>
  );
}
