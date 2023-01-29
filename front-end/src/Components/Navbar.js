import { Link } from 'react-router-dom';
import hamburgerMenuIcon from '../icons/hamburgerMenuIcon.png'
import useHamburgerMenu from '../Hooks/useHamburgerMenu';

export default function Navbar({notification}){
  const  [ setActive, hamburgerMenuStructure ] = useHamburgerMenu({notification});                                  

  return (
    <div className="fixed py-2 px-3 z-40 flex flex-row place-content-evenly justify-items-left bg-white antialiased tablet:place-content-evenly w-screen h-[80px] shadow-sm laptop:laptop-display laptop:place-self-center">

      <div className={`flex flex-col place-content-center place-items-center w-[32%]`} onClick={() => {setActive(true)}}>
        <img className='hover:cursor-pointer self-start ml-2' width='30px' height='30px' src={hamburgerMenuIcon} alt='hamburger-icon'/>
      </div>

      <Link to={'/'} onClick={() => {document.body.scrollTop = document.documentElement.scrollTop = 0}}className='flex flex-col place-items-center place-content-center w-[32%] laptop:navbar-icon laptop:basis-1/2 laptop:place-content-start'>
        <img alt='logo' className='place-self-center w-[30px] h-[30px] hover:animate-[wiggle_2s_ease-in-out_infinite]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        <p className="text-[15px] font-['brandon-grotesque'] text-center tracking-normal uppercase">Plantasynch</p>
      </Link>

      <div className='flex w-[32%]'></div>

      {hamburgerMenuStructure}

    </div>
  );
}
