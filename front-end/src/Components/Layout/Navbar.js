import { Link } from 'react-router-dom';
import { useState } from 'react';
import hamburgerMenuIcon from '../../icons/hamburgerMenuIcon.png';
import useHamburgerMenu from '../../Hooks/useHamburgerMenu';

export default function Navbar({ notification, loggedInUser }) {
  const [setActive, hamburgerMenuStructure] = useHamburgerMenu({
    notification,
    loggedInUser
  });
  const [hover, setHover] = useState({ github: false, linkedin: false });

  return (
    <div className="fixed top-0 py-1 px-3 z-50 flex flex-row place-content-evenly justify-items-left bg-white antialiased w-screen h-[80px] shadow-sm tablet:h-[110px] tablet:px-[8%] tablet:place-content-between">
      <div
        className={`flex flex-col place-content-center place-items-center w-[32%] tablet:hidden`}
        onClick={() => {
          setActive(true);
        }}
      >
        <img
          className="hover:cursor-pointer self-start ml-2"
          width="30px"
          height="30px"
          src={hamburgerMenuIcon}
          alt="hamburger-icon"
        />
      </div>

      <Link
        to={'/'}
        onClick={() => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }}
        className="flex flex-col place-content-center w-[32%]"
      >
        <img
          alt="logo"
          className="place-self-center w-[30px] h-[30px] hover:animate-[wiggle_2s_ease-in-out_infinite] tablet:h-[35px] tablet:w-[35px]"
          src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
        />
        <p className="text-[15px] font-['brandon-grotesque'] text-center tracking-wide uppercase tablet:text-[20px]">
          Plantasynch
        </p>
      </Link>

      <div className="hidden flex-col place-content-center w-[100%] tablet:flex">
        <p className="tracking-wide p-1 font-['baskerville-urw'] text-[18px] text-[#173d0a] subpixel-antialiased font-normal text-center">
          Your one stop Plant Application
        </p>
        <div className="hidden p-1 uppercase font-['baskerville-urw'] tracking-wide flex-row font-md place-content-center place-items-center text-slate-800 tablet:flex">
          <Link
            to={'/my-plants'}
            className="text-[13px] mx-2 py-1 transition-all hover:text-slate-400 hover:cursor-pointer"
          >
            Home
          </Link>

          <Link
            to={'/explore'}
            className="text-[13px] mx-2 py-1 w-min transition-all hover:text-slate-400 hover:cursor-pointer"
          >
            Explore
          </Link>

          <Link
            to={'/new'}
            className="text-[13px] py-1 w-min mx-2 transition-all hover:text-slate-400 hover:cursor-pointer"
          >
            Add
          </Link>

          <Link
            to={'/'}
            className="text-[13px] py-1 w-min mx-2 transition-all hover:text-slate-400 hover:cursor-pointer"
          >
            About
          </Link>
        </div>
      </div>

      <div className="flex place-content-center w-[34%]">
        <div className="hidden flex-row gap-2 tablet:flex">
          <a
            className="place-self-center"
            href="https://github.com/JC-MT/Plantasynch"
            target="_blank"
            rel="noreferrer"
          >
            <img
              onMouseEnter={() => {
                setHover({ ...hover, linkedin: true });
              }}
              onMouseLeave={() => {
                setHover({ github: false, linkedin: false });
              }}
              className={`w-[18px] h-[18px] transition-opacity duration-300 rounded-full ${
                hover.github ? 'opacity-50' : ''
              }`}
              alt="GitHub"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </a>
          <a
            className="place-self-center"
            href="https://www.linkedin.com/in/jan-matias/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              onMouseEnter={() => {
                setHover({ ...hover, github: true });
              }}
              onMouseLeave={() => {
                setHover({ github: false, linkedin: false });
              }}
              className={`w-[24px] h-[24px] place-self-center transition-opacity duration-300 ${
                hover.linkedin ? 'opacity-50' : ''
              }`}
              alt="LinkedIn"
              src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
            />
          </a>
        </div>
      </div>
      {hamburgerMenuStructure}
    </div>
  );
}