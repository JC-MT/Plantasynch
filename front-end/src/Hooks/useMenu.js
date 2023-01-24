import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export default function useMenu({notification}) {
  const [menu, setMenu] = useState(false);

  const handleClose = () => {
    setMenu(false);
  }
  
  const menuStructure = (
    <div id='hamburgerMenu' className={`${menu ? 'open' : 'close'} bg-white h-screen w-screen`}>
            <div className='w-screen rounded-md text-left p-8 flex flex-col self-start'>
                <div className='flex flex-row place-content-between text-slate-800'>
                <Link to={'/my-plants'} onClick={handleClose} class="pt-5 text-xl mb-4 font-bold delay-150 hover:text-slate-400 hover:cursor-pointer">
                    Home
                </Link >
                <button
                    onClick={handleClose}
                    class="pb-5 px-4 py-2 rounded-md text-xl font-bold hover:text-slate-400 hover:cursor-pointer"
                >
                X
                </button>
                </div>    
                <Link to={'/explore'} onClick={handleClose} class="text-xl mb-4 w-min font-bold delay-150 hover:text-slate-400 hover:cursor-pointer">
                    Explore
                </Link>
                <Link to={'/new'} onClick={handleClose} class="text-xl mb-4 w-min font-bold delay-150 hover:text-slate-400 hover:cursor-pointer">
                    Add
                </Link>
                <Link to={''} onClick={handleClose} class="text-xl mb-4 w-min font-bold delay-150 hover:text-slate-400 hover:cursor-pointer">
                    About
                </Link>
        </div>

    </div>
    );

  return [setMenu, menuStructure];
}