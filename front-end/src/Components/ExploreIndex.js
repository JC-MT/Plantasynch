import axios from 'axios';
import { useEffect, useState } from 'react';
import ExplorePlant from './ExplorePlant';

const API = process.env.REACT_APP_API_URL;

export default function ExploreIndex() {
  const [ explore, setExplore ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ animation, setAnimation ] = useState(false);

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

  const currentDisplay = (explore, search) => {
    const results = explore
      .filter(
        (plant) =>
          plant.common[0] &&
          plant.common[0].toLowerCase().startsWith(search.toLowerCase())
      )
      .map((plant, idx) => {
        return (
          <ExplorePlant
            key={idx}
            id={plant.id}
            name={plant.common[0]}
            latin={plant.latin}
            category={plant.category}
          />
        );
      });
    return results;
  };

  const explorePlantsContainer = (<div className="p-1 laptop:grid-view">{currentDisplay(explore, search)}</div>)

  const spinnerStructure = (
    <div id="spinner" className="flex flex-col items-center justify-center p-5">
      <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <p className='w-96 italic text-center p-5'>Plantasync data is hosted on a free cloud web-service. This may cause a response delay of up to 30 seconds for the first request.</p>
    </div>)

  return (
    <div className="flex flex-col gap-2 tablet:p-8">
    <div onMouseLeave={() => {setAnimation(false)}} className='bg-transparent flex flex-row p-5 rounded-full h-[94px] w-[94px] fixed bottom-8 right-2 hover:cursor-n-resize'>
      <div onClick={() => {
        setAnimation(true)
        document.body.scrollTop = document.documentElement.scrollTop = 0
        setTimeout(() => setAnimation(false), 1000) 
        }} 
        onMouseEnter={() => { setAnimation(true) }} class={`bg-[#224722] p-2 w-14 h-14 shadow-md rounded-full flex items-center justify-center hover:cursor-n-resize ${ animation ? 'animate-bounce' : ''}`}>
        <svg class="rotate-180 w-8 h-8 text-[#D9F8B9]" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
      <input
        className="focus:outline-none bg-slate-50 flex flex-center sticky top-28 items-center justify-center border-2 rounded-full px-4 p-2 mx-4 shadow-xl tablet:mb-2 tablet:mx-16 laptop:top-32 laptop:mx-24"
        type="search"
        id="search"
        placeholder="Search plant by name"
        onChange={handleTextChange}
      />
      {explore.length ? explorePlantsContainer : spinnerStructure}
        <div className='p-4 text-center tracking-wide uppercase antialiased'>
          Currently: {currentDisplay(explore, search).length} plant results
        </div>
    </div>
  );
}
