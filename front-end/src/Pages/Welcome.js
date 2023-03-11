import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import bgW from '../icons/bgW.png';
import bgA from '../icons/bgA.jpeg';
import headshot from '../icons/headshot.jpeg';
import Footer from './Footer';

import 'react-toastify/dist/ReactToastify.css';

export default function Welcome({ loggedInUser, setLoggedInUser }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [hover, setHover] = useState({ github: false, linkedin: false });

  const notify = (result) => {
    return result
      ? toast.success(`You have been sucessfully logged out.🪴`, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
      : toast.error(
          `We were unable to log you out 🥲 Please check your internet and try again in a few minutes.`,
          {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
          }
        );
  };

  const handleLogOut = () => {
    setLoggedInUser({});

    if (loggedInUser.id) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      notify(true);
    } else {
      notify(false);
    }
  };
  const handleClose = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex absolute flex-col w-screen overflow-x-hidden">
      <header className="flex z-20 top-0 w-screen justify-center place-items-center">
        <div
          className={`absolute flex flex-col top-[50px] tablet:top-[100px] place-items-center`}
        >
          <p className="tracking-wide font-['baskerville-urw'] place-self-start origin-left text-[16px] tablet:text-[20px] italic text-[#173d0a] subpixel-antialiased font-normal text-center">
            Welcome to your one stop Plant Application
          </p>
          <h1 className="text-[#173d0a] text-[32px] font-['brandon-grotesque'] font-bold antialiased tracking-wide tablet:tracking-wider tablet:text-[38px] uppercase mt-5">
            Plantasynch
          </h1>
          <h3 className="text-[#64aa85] text-[18px] font-['brandon-grotesque'] font-bold antialiased tracking-wide tablet:text-[20px]">
            Keep your plants alive
          </h3>
        </div>
      </header>
      <div className={`-z-10 bg-transparent w-screen h-[600px] tablet:hidden`}>
        <img className={`fixed w-screen h-[600px] tablet:hidden`} src={bgW} />
      </div>

      <div
        className="hidden tablet:flex laptop:hidden bg-transparent w-screen h-screen max-h-[600px]"
        style={{
          background: `url(${bgW}) center no-repeat fixed`,
          backgroundSize: '100vmax 100vmax',
          backgroundPositionY: `${-30 - scrollTop / 2}px`
        }}
      ></div>

      <div
        className="hidden tablet:hidden laptop:flex desktop:hidden bg-transparent w-screen h-screen"
        style={{
          background: `url(${bgA}) center no-repeat fixed`,
          backgroundSize: 'cover',
          backgroundPositionY: `${30 - scrollTop / 2}px`
        }}
      ></div>

      <div
        className="hidden laptop:hidden desktop:flex bg-transparent w-screen h-screen"
        style={{
          background: `url(${bgA}) center no-repeat fixed`,
          backgroundSize: 'cover',
          backgroundPositionY: `${0 - scrollTop / 2}px`
        }}
      ></div>

      <div
        className={`z-20 pt-8 p-4 pb-0 flex max-w-[1200px] self-center flex-col place-items-center bg-white`}
      >
        <div className="mb-10 tablet:mb-20 flex flex-col items-center laptop:w-[80%] laptop:place-content-between tablet:flex-row px-2 laptop:px-0 gap-2">
          <div
            className="bg-transparent place-self-start mt-2 w-[350px] h-[250px] tablet:w-[50%] laptop:w-[400px] laptop:h-[300px] rounded-xl opacity-90"
            style={{
              background: `url('https://getplanta.com/images/feature_3.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className='tablet:w-[50%]'>
            <h1 className="text-center z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased tablet:p-2">
              Using Plantasynch
            </h1>
            <p className='tablet:text-[20px]'>
              Plantasynch is a user-friendly tool to help plant parents keep
              their plants alive. Feel free to browse through all the different features.
              To ensure you get email reminders, click the edit button after pressing the 
              top-right three dots on your plant detail page and then save. That's ALL!
            </p>
            <div className="flex tablet:p-2 flex-col gap-1 place-items-center drop-shadow-sm">
              <Link
                onClick={handleClose}
                className="mt-2 button-style text-center w-42"
                to={`${loggedInUser.id ? '/settings' : '/sign-up'}`}
              >
                {loggedInUser.id ? 'Go to settings' : 'Sign in with email'}
              </Link>
              <button
                className={`m-0 button-style text-center w-36 ${
                  loggedInUser.id ? '' : 'hidden'
                }`}
                onClick={handleLogOut}
              >
                Log out
              </button>
              <Link
                onClick={handleClose}
                className={`m-0 button-style text-center w-42 ${
                  loggedInUser.id ? 'hidden' : ''
                }`}
                to={'/log-in'}
              >
                Log in with email
              </Link>
              <Link
                onClick={handleClose}
                className="hover:underline"
                to="/my-plants"
              >
                {loggedInUser.id ? 'Go to my garden' : 'Skip to demo site'}
              </Link>
            </div>
            <div className="flex flex-row gap-3 justify-center drop-shadow-sm p-2">
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
                  className={`w-[45px] h-[45px] rounded-full delay-100 ${
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
                  className={`w-[54px] h-[54px] place-self-center delay-100 ${
                    hover.linkedin ? 'opacity-50' : ''
                  }`}
                  alt="LinkedIn"
                  src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mb-10 tablet:mb-20 flex gap-2 flex-col items-center laptop:w-[80%] laptop:place-content-between tablet:flex-row-reverse px-2 laptop:px-0">
          <div
            className="opacity-90 bg-transparent w-[100%] tablet:w-[50%] h-[300px] laptop:w-[45%] laptop:h-[350px] rounded-full"
            style={{
              background: `url('https://getplanta.com/images/feature_1.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="tablet:place-self-start tablet:w-[50%] tablet:max-w-[50%]">
            <h1 className="text-center z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased tablet:p-2">
              Plant Identification
            </h1>
            <p className='tablet:text-[20px]'>
              Maybe you are not sure which plant you have? You can just take a
              picture of it and we will instantly let you know. With Plantasynch's 
              plant scanner you can scan all your house plants to find out the
              plants name. Go to the add page to start!
            </p>
          </div>
        </div>
        <div className="mb-10 tablet:mb-20 flex gap-2 flex-col items-center laptop:w-[80%] laptop:place-content-between tablet:flex-row px-2 laptop:px-0">
          <div
            className="opacity-90 bg-transparent w-[350px] h-[350px] tablet:w-[50%] laptop:w-[400px] laptop:h-[400px] rounded-br-[60%]"
            style={{
              background: `url('https://getplanta.com/images/feature_0.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="tablet:place-self-start tablet:w-[50%]">
            <h1 className="text-center z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased tablet:p-2">
              Smart Schedule Reminders
            </h1>
            <p className='tablet:text-[20px]'>
              Are you not sure when it’s time to water your plants? Plantasynch knows
              when! Just add them to the app and get notified when it’s time to
              water your plant children. We are working on a custom schedule reminders, 
              so you'll have all the power to reset schedules soon.
            </p>
          </div>
        </div>
        <div className='mb-10 flex flex-col tablet:mb-20 px-2 laptop:w-[80%]'>
        <h1 className="text-center tablet:p-2 z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] tablet:place-self-start text-[32px] antialiased">
          Technologies
        </h1>
        <img
          className="tablet:p-2 tablet:place-self-start p-1"
          src="https://skillicons.dev/icons?i=postgres,express,react,nodejs,tailwind"
        />
        <p className="tablet:p-2 text-left tablet:text-[20px]">
          Plantasynch is using a PERN stack: Postgres, Express, React, Node, and
          TailwindCSS, as CSS framework. To send email reminders, our backend is
          using{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://nodemailer.com/about/"
            className="hover:underline italic"
          >
            Nodemailer
          </a>{' '}
          and{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://render.com/"
            className="hover:underline italic"
          >
            Render's
          </a>{' '}
          Cron job to dynamically send emails to users when plants need
          attention.
        </p>
        </div>
        <div className='flex flex-col mb-10 tablet:mb-20 px-2 laptop:w-[80%]'>
            <h1 className="tablet:p-2 z-20 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] tablet:place-self-start text-[32px] antialiased">
            {' '}
            About Plantasynch
            </h1>
            <p className="tablet:p-2 text-left tablet:text-[20px]">
            <p className="inline antialiased tracking-wide italic text-lg">
                Plantasynch{' '}
            </p>{' '}
            is a full-stack web-application that makes the life-long problem of
            keeping your plants alive, a thing of the past. Features Include:
            Scanning any unknown plant, Email Notifications for when your plant
            needs watering, Keeping track of when you watered your plants or
            skiped a day, Curated plant information and many more to come. Keep
            your plants alive with Plantasynch.
            </p>
        </div>
        <div className='flex flex-col mb-10 tablet:mb-20 px-2'>
        <hr></hr>
        <h1 className="tablet:p-2 text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] tablet:place-self-start text-[32px] antialiased tablet:pl-[20%]">
          About the developer
        </h1>

        <div className="flex pt-0 flex-col place-content-center tablet:flex-row">
          <a
            className="inline tablet:p-2 place-self-center"
            href="https://www.linkedin.com/in/jan-matias/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="rounded-full tablet:p-2 h-[300px] w-screen max-h-[300px] max-w-[300px] tablet:h-[250px] tablet:w-[250px]"
              src={headshot}
            />
          </a>
          <div className="tablet:w-[40%]">
            <p className="tablet:p-2 mt-4 tablet:text-[18px]">
              Hi there, I'm Jan 👋🏽
            </p>
            <p className=" tablet:p-2 mt-4 tablet:mt-0 text-left tablet:text-[18px]">
              I'm a Full-Stack Software Engineer with a focus in Web Development
              and RESTfull API development. Design inspiration comes from <a className='hover:underline italic' href='https://invinciblehouseplants.com/'>Invincible House Plants</a> blog 
              and the <a className='hover:text-[#173d0a] hover:underline italic' href='https://getplanta.com/'>Planta</a> landing page. Plantasynch was made out of my wife's 
              constant struggle to keep her plant children alive. Hope you find it usefull 🪴
            </p>
          </div>
        </div>
        </div>
      </div>

      <div className="z-50">
        <ToastContainer
          limit={1}
          toastStyle={{ color: 'white', backgroundColor: 'black' }}
        />
      </div>
      <Footer />
    </div>
  );
}
