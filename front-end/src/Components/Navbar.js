import { Link } from 'react-router-dom';
import { useState } from 'react'

export default function Navbar() {
  const [effect, setEffect] = useState({
    home: false,
    explore: false,
    add: false,
    openTab: 'home'
  })



  return (
    <div className="fixed bottom-0 overscroll-none flex flex-row justify-evenly w-screen h-24 bg-green-200 shadow-lg">
      <Link to={'/'} className='hidden'>Plantasynch</Link>
      <Link to={'/my-plants'} className={`${effect.openTab === 'home' ? 'text-black' : 'text-gray-300'} ${effect.home && "animate-ping drop-shadow-2xl"}`} onClick={() => {setEffect({...effect, home: true, openTab: 'home'});
      }} onAnimationEnd={() => setEffect({...effect, home: false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navbar-icon ml-[2px]">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
        <span className='text-center pr-[4px]'>Home</span>
      </Link>
      <Link to={'/explore'} className={`${effect.openTab === 'explore' ? 'text-black' : 'text-gray-300'} ${effect.explore && "animate-ping drop-shadow-2xl"}`} onClick={() => {setEffect({...effect, explore: true, openTab: 'explore'});
      }} onAnimationEnd={() => setEffect({...effect, explore: false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navbar-icon ml-[6px]"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className='text-center pr-[2px]'>Explore</span>
      </Link>
      <Link to={'/my-plants/new'} className={`${effect.openTab === 'add' ? 'text-black' : 'text-gray-300'} ${effect.add && "animate-ping drop-shadow-2xl"}`} onClick={() => {setEffect({...effect, add: true, openTab: 'add'});
      }} onAnimationEnd={() => setEffect({...effect, add: false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navbar-icon"
        >
          <path
            fillRule="evenodd"
            d="M12 4.25a.75.75 0 01.75.75v6.25H19a.75.75 0 010 1.5h-6.25V19a.75.75 0 01-1.5 0v-6.25H5a.75.75 0 010-1.5h6.25V5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
        <span className='text-center pl-[5px]'>Add</span>
      </Link>
    </div>
  );
}
