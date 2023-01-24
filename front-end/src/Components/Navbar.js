import { Link } from 'react-router-dom';
import hamburgerMenu from '../icons/hamburgerMenu.png'
import useMenu from '../Hooks/useMenu';

export default function Navbar({notification}){
  const  [ setMenu, menuStructure] = useMenu({notification});                                  

  return (
    <div className="fixed gap-0 py-2 px-3 z-40 flex flex-row place-content-evenly justify-items-left antialiased bg-[#fff] tablet:place-content-evenly w-screen h-24 shadow-md laptop:laptop-display laptop:place-self-center">

      <div className={`flex flex-col place-content-center place-items-center w-[32%]`} onClick={() => {setMenu(true)}}>
      <img class='hover:cursor-pointer self-start ml-2' width='30px' height='30px' src={hamburgerMenu} alt='hamburger-icon'/>
      </div>

      <Link to={'/'} className='flex flex-col place-content-center w-[32%] laptop:navbar-icon laptop:basis-1/2 laptop:place-content-start'>
        <img alt='logo' className='place-self-center w-[35px] h-[35px] hover:animate-[wiggle_2s_ease-in-out_infinite]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        <p className='text-[20px] text-center tracking-wide'>Plantasync</p>
      </Link>

      <div className='flex w-[32%]'>

      </div>

      {menuStructure}
    </div>
  );
}
