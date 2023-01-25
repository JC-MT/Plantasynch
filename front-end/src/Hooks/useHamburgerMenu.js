import { useState } from 'react';
import { Link } from 'react-router-dom';
import closeIcon from '../icons/closeIcon.png'
import '../App.css'

export default function useHamburgerMenu({notification}) {
  const [active, setActive] = useState(false);

  const handleClose = (scrollUp) => {

    if(scrollUp) document.body.scrollTop = document.documentElement.scrollTop = 0 

    setActive(false);
  };
  
  const hamburgerMenuStructure = (
    <div id='hamburgerMenu' className={`${active ? 'open' : 'close'} bg-white fixed top-0 left-0 h-screen w-screen`}>
      <div className='w-screen rounded-md text-left p-8 flex flex-col self-start tracking-wider font-medium uppercase'>
        <div className='flex flex-row place-content-between text-slate-800'>
          <Link to={'/my-plants'} onClick={handleClose} class="pt-5 text-xl mb-4 delay-150 hover:text-slate-400 hover:cursor-pointer">
              Home
              <div className={`${notification.length ? 'visible' : 'invisible'} font-['Open_Sans'] inline-flex absolute justify-center items-center w-[20px] h-[20px] text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900 tabular-nums`}>{`${notification.length}`}</div>
          </Link >
          <img
              src={closeIcon}
              width='30px' 
              height='30px'
              onClick={() => handleClose(false)}
              className={`${active ? 'animate-[spin_1.2s_ease-in-out]' : 'animate-reverse-spin'} place-self-center py-4 hover:text-slate-400 hover:cursor-pointer`}
          />
        </div>    

        <Link to={'/explore'} onClick={handleClose} class="text-xl mb-4 w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            Explore
        </Link>

        <Link to={'/new'} onClick={handleClose} class="text-xl mb-4 w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            Add
        </Link>

        <Link to={'/'} onClick={handleClose} class="text-xl mb-4 w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            About
        </Link>

      </div>
    </div>
  );

  return [setActive, hamburgerMenuStructure];
};