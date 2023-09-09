import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer({ pathname }) {
  const [toggleFooterOptions, setToggleFooterOptions] = useState({
    navigation: false,
    contact: false,
    followUs: false
  });

  const handleClose = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  const laptopViewLinks = (
    <div className="hidden tablet:flex flex-row place-content-between text-slate-800">
      <div className="flex flex-col tablet:gap-1">
        <div className="text-[rgb(23,61,10)] pb-2 text-[20px] font-bold antialiased">
          Navigation
        </div>
        <Link
          to={'/my-plants'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Home
        </Link>
        <Link
          to={'/explore'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Explore
        </Link>

        <Link
          to={'/new'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Add
        </Link>

        <Link
          to={'/'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          About
        </Link>
      </div>
      <div className="flex flex-col tablet:gap-1">
        <div className="text-[rgb(23,61,10)] pb-2 text-[20px] font-bold antialiased">
          Contact
        </div>
        <Link
          to={'/my-plants'}
          onClick={handleClose}
          className="text-[15px] delay-150 hover:underline hover:cursor-pointer"
        >
          Help Center
        </Link>
        <Link
          to={'/explore'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Support
        </Link>

        <Link
          to={'/new'}
          onClick={handleClose}
          className="text-[15px] delay-150 hover:underline hover:cursor-pointer"
        >
          Send E-mail
        </Link>
      </div>
      <div className="flex flex-col tablet:gap-1">
        <div className="text-[rgb(23,61,10)] pb-2 text-[20px] font-bold antialiased">
          Follow us
        </div>
        <Link
          to={'/my-plants'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Instagram
        </Link>
        <Link
          to={'/explore'}
          onClick={handleClose}
          className="text-[15px] w-min delay-150 hover:underline hover:cursor-pointer"
        >
          Facebook
        </Link>
      </div>
    </div>
  );

  const mobileViewLinks = (
    <div className="flex tablet:hidden h-[180px] flex-col place-content-between text-slate-800">
      <div className="flex flex-col tablet:gap-1">
        <div
          onClick={() => {
            setToggleFooterOptions({
              contact: false,
              followUs: false,
              navigation: !toggleFooterOptions.navigation
            });
          }}
          className="text-[rgb(23,61,10)] flex flex-row place-content-between h-[40px] text-[20px] font-bold antialiased"
        >
          <div className="place-self-center">Navigation</div>
          <svg
            className={`w-[20px] h-[20px] place-self-center transition-all
              ${toggleFooterOptions.navigation ? ' rotate-180' : ''} `}
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
        <div
          className={
            toggleFooterOptions.navigation
              ? 'flex flex-col absolute text-white w-[91.5%] rounded-lg bg-[#1E1F1D] mt-10'
              : 'hidden'
          }
        >
          <Link
            to={'/my-plants'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Home
          </Link>
          <Link
            to={'/explore'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Explore
          </Link>

          <Link
            to={'/new'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Add
          </Link>

          <Link
            to={'/'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            About
          </Link>
        </div>
      </div>
      <div className="flex flex-col tablet:gap-1 overflow-hidden">
        <div
          onClick={() => {
            setToggleFooterOptions({
              navigation: false,
              followUs: false,
              contact: !toggleFooterOptions.contact
            });
          }}
          className="text-[rgb(23,61,10)] flex flex-row place-content-between h-[40px] text-[20px] font-bold antialiased"
        >
          <div className="place-self-center">Contact us</div>
          <svg
            className={`w-[20px] h-[20px] place-self-center transition-all
              ${toggleFooterOptions.contact ? ' rotate-180' : ''} `}
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
        <div
          className={
            toggleFooterOptions.contact
              ? 'flex flex-col absolute text-white rounded-lg w-[91.5%] bg-[#1E1F1D] mt-10'
              : 'hidden'
          }
        >
          <Link
            to={'/my-plants'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Help Center
          </Link>
          <Link
            to={'/explore'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Support
          </Link>

          <Link
            to={'/new'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Send E-mail
          </Link>
        </div>
      </div>
      <div className="flex flex-col tablet:gap-1">
        <div
          onClick={() => {
            setToggleFooterOptions({
              navigation: false,
              contact: false,
              followUs: !toggleFooterOptions.followUs
            });
          }}
          className="text-[rgb(23,61,10)] flex flex-row place-content-between h-[40px] text-[20px] font-bold antialiased"
        >
          <div className="place-self-center">Follow us</div>
          <svg
            className={`w-[20px] h-[20px] place-self-center transition-all
              ${toggleFooterOptions.followUs ? ' rotate-180' : ''} `}
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
        <div
          className={
            toggleFooterOptions.followUs
              ? 'flex flex-col absolute text-white w-[91.5%] rounded-lg bg-[#1E1F1D] mt-10'
              : 'hidden'
          }
        >
          <Link
            to={'/my-plants'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Instagram
          </Link>
          <Link
            to={'/explore'}
            onClick={handleClose}
            className="text-[17px] px-4 p-2 delay-150 hover:underline hover:cursor-pointer"
          >
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );

  const icons = (
    <div className="hidden tablet:flex flex-row place-content-start pl-1 gap-3">
      <img
        alt="logo"
        className="cursor-pointer place-self-center w-[26px] h-[26px] hover:animate-[wiggle_2s_ease-in-out_infinite]"
        src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
      />
      <a
        className="place-self-center"
        href="https://github.com/JC-MT/Plantasynch"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="w-[22px] h-[22px] rounded-full place-self-center"
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
          className="w-[27px] h-[27px] place-self-center"
          alt="LinkedIn"
          src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
        />
      </a>
    </div>
  );

  return (
    <div
      className={`
    ${
      pathname === '/' ? 'hidden' : ''
    } transition-all delay-200 relative w-screen text-left flex flex-col tablet:flex-row tablet:place-content-center px-12 py-12 h-[560px] tablet:h-[400px] bg-[#9EC2AF]`}
    >
      <div className="flex flex-col mb-10 tablet:mb-0 place-content-between tablet:w-1/2 max-w-[575px]">
        <Link to={'/'} onClick={handleClose}>
          <h1 className="text-[rgb(23,61,10)] text-[32px] font-['brandon-grotesque'] font-bold antialiased tracking-wide uppercase">
            Plantasynch
          </h1>
          <p className="pl-1">Keep your plants alive</p>
        </Link>
        {icons}
      </div>
      <div className="flex flex-col h-full place-content-between tablet:w-1/2 max-w-[575px]">
        {laptopViewLinks}
        {mobileViewLinks}
        <div className="flex flex-col place-content-between tablet:place-content-end h-[60px] tablet:h-full">
          <div className="flex tablet:hidden flex-row place-content-center pl-1 gap-3">
            <img
              alt="logo"
              className="cursor-pointer place-self-center w-[26px] h-[26px] hover:animate-[wiggle_2s_ease-in-out_infinite]"
              src="https://cdn-icons-png.flaticon.com/512/628/628324.png"
            />
            <a
              className="place-self-center"
              href="https://github.com/JC-MT/Plantasynch"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-[22px] h-[22px] rounded-full place-self-center"
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
                className="w-[27px] h-[27px] place-self-center"
                alt="LinkedIn"
                src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
              />
            </a>
          </div>
          <p className="text-center tablet:place-self-end tablet:text-right min-h-[27px] text-md">
            Copyright © Plantasync.netlify.app 2023.
          </p>
        </div>
      </div>
    </div>
  );
}
