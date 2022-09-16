import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar({notification}) {
  const location = useLocation();
  const [effect, setEffect] = useState({
    home: false,
    explore: false,
    add: false,
    welcome: false
  })

  return (
    <div className="fixed bottom-0 flex flex-row justify-evenly w-screen h-24 bg-green-200 shadow-lg laptop:laptop-display laptop:h-28">
      <Link to={'/'} className='hidden laptop:navbar-icon'>
        <img alt='logo' className='place-self-center w-[80px] h-[80px] mb-4' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        <p className='text-[30px] mb-4'>Plantasync</p>
      </Link>
      <Link to={'/my-plants'} className={`relative ${location.pathname.startsWith('/my-plants') ? 'text-black' : 'text-gray-300'} ${effect.home && "animate-pulse drop-shadow-2xl"}`} onClick={() => {setEffect({...effect, home: true});
      }} onAnimationEnd={() => setEffect({...effect, home: false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navbar-icon ml-[2px] relative">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
        <div className={`${notification[0] ? 'visible' : 'invisible'} inline-flex absolute right-0 top-3 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900`}>{`${notification.length}`}</div>
        <span className='text-center pr-[4px]'>Home</span>
      </Link>
      <Link to={'/explore'} className={`${location.pathname.startsWith('/explore') ? 'text-black' : 'text-gray-300'} ${effect.explore && "animate-pulse"}`} onClick={() => {setEffect({...effect, explore: true });
      }} onAnimationEnd={() => setEffect({...effect, explore: false})}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navbar-icon ml-[6px] "
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className='text-center pr-[2px]'>Explore</span>
      </Link>
      <Link to={'/new'} className={`${location.pathname === '/new' ? 'text-black' : 'text-gray-300'} ${effect.add && "animate-pulse"}`} onClick={() => {setEffect({...effect, add: true });
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
      <Link to={'/'} className={`${location.pathname === '/' || location.pathname === '/sign-in' ? 'text-black' : 'text-gray-300'} ${effect.welcome && "animate-pulse"}`} onClick={() => {setEffect({...effect, welcome: true });
      }} onAnimationEnd={() => setEffect({...effect, welcome: false})}>
      <svg className="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
      </svg>
      <span className='text-center'>About</span>
      </Link>
    </div>
  );
}
