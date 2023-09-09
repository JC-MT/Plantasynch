import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useToast from '../../Hooks/useToast';
import bgW from '../../icons/bgW.png';
import bgA from '../../icons/bgA.jpeg';
import headshot from '../../icons/headshot.jpeg';
import Footer from '../../Components/Layout/Footer';

export default function Welcome({ loggedInUser, setLoggedInUser }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [hover, setHover] = useState({ github: false, linkedin: false });
  const [sendToast] = useToast('welcome');

  function handleLogOut() {
    setLoggedInUser({});

    if (loggedInUser.id) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      sendToast('success');
    } else {
      sendToast('error');
    }
  }
  const handleClose = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const handleScroll = () => {
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
          className={`absolute flex flex-col top-[50px] tablet:top-[80px] place-items-center`}
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
        <img
          alt="background"
          className={`fixed w-screen h-[600px] tablet:hidden`}
          src={bgW}
        />
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
        className={`z-20 pt-8 px-2 laptop:px-0 pb-0 flex self-center flex-col place-items-center bg-white max-w-[1150px]`}
      >
        <div className="mb-10 tablet:mb-20 flex flex-col items-center laptop:w-[95%] laptop:place-content-between tablet:flex-row gap-2 laptop:gap-8">
          <div
            className="bg-transparent place-self-start w-[350px] h-[250px] tablet:w-[50%] laptop:h-[350px] rounded-xl opacity-90"
            style={{
              background: `url('https://getplanta.com/images/feature_3.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="flex flex-col tablet:w-[48%]">
            <h1 className="place-self-center w-fit text-center z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
              Using Plantasynch
            </h1>
            <p className="tablet:text-[16px]">
              Plantasynch is a user-friendly tool to help plant parents keep
              their plants alive. Feel free to browse through all the different
              features. To ensure you get email reminders, click the edit button
              after pressing the top-right three dots on your plant detail page
              and then save. That's ALL!
            </p>
            <div className="flex tablet:py-2 flex-col gap-1 place-items-center drop-shadow-sm">
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
            <div className="flex flex-row gap-3 justify-center drop-shadow-sm">
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
                  className={`w-[35px] h-[35px] rounded-full delay-100 ${
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
                  className={`w-[44px] h-[44px] place-self-center delay-100 ${
                    hover.linkedin ? 'opacity-50' : ''
                  }`}
                  alt="LinkedIn"
                  src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mb-10 tablet:mb-20 flex gap-2 laptop:gap-8 flex-col items-center laptop:w-[95%] laptop:place-content-between tablet:flex-row-reverse">
          <div
            className="opacity-90 bg-transparent w-[350px] h-[250px] tablet:w-[50%] laptop:h-[350px] rounded-full"
            style={{
              background: `url('https://getplanta.com/images/feature_1.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className=" flex flex-col tablet:place-self-start tablet:w-[48%]">
            <h1 className="place-self-center w-fit z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
              Plant Identification
            </h1>
            <p className="tablet:text-[16px]">
              Not sure what kind of plant you have? You can just take a picture
              of it and we will instantly let you know! With Plantasynch's plant
              scanner you can scan all your house plants to find out there plant
              name. Go to the add page to start!
            </p>
          </div>
        </div>
        <div className="mb-10 tablet:mb-20 flex gap-2 laptop:gap-8 flex-col items-center laptop:w-[95%] laptop:place-content-between tablet:flex-row">
          <div
            className="opacity-90 bg-transparent w-[350px] h-[350px] tablet:w-[50%] laptop:h-[500px] rounded-br-[60%] rounded-xl"
            style={{
              background: `url('https://getplanta.com/images/feature_0.webp') center no-repeat`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="flex flex-col tablet:place-self-start tablet:w-[48%]">
            <h1 className="place-self-center z-20 w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
              Smart Schedule Reminders
            </h1>
            <p className="tablet:text-[16px]">
              Don't know when it’s time to water your plants? Plantasynch knows
              when! Just add them to the app and get notified when it’s time to
              water your plant children. We are working on a custom schedule
              reminders, so you'll have all the power to reset schedules soon.
            </p>
          </div>
        </div>
        <div className="py-2 flex flex-col laptop:flex-row laptop:gap-8 laptop:w-[95%] border-b-2">
          <div className="flex flex-col laptop:w-1/2">
            <h1 className="place-self-center w-fit z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
              Technologies
            </h1>
            <img
              alt="skills"
              className="tablet:place-self-center"
              src="https://skillicons.dev/icons?i=postgres,express,react,nodejs,tailwind"
            />
            <p className="text-left tablet:text-[16px]">
              Plantasynch is using a PERN stack: Postgres, Express, React, Node,
              and TailwindCSS. To send email reminders, our backend is using{' '}
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
          <div className="flex flex-col laptop:w-1/2">
            <h1 className="z-20 w-fit place-self-center text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
              {' '}
              About Plantasynch
            </h1>
            <p className="tablet:text-[16px]">
              <span className="antialiased tracking-wide italic text-lg">
                Plantasynch{' '}
              </span>{' '}
              is a full-stack web-application that makes the life-long problem
              of keeping your plants alive, a thing of the past. Features
              include: scanning any unknown plant, email notifications for when
              your plant needs watering, keeping track of when you watered your
              plants or skiped a day, curated plant information and many more to
              come. Keep your plants alive!
            </p>
          </div>
        </div>
        <div className="flex py-2 flex-col place-self-center laptop:w-[95%]">
          <div className="flex flex-col place-content-center tablet:flex-row laptop:gap-8">
            <a
              className="place-self-center"
              href="https://www.linkedin.com/in/jan-matias/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="rounded-full p-2 w-[200px] h-[200px] tablet:h-[250px] tablet:w-[250px]"
                src={headshot}
                alt="headshot"
              />
            </a>
            <div className="flex flex-col tablet:w-[45%]">
              <h1 className="place-self-center w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#83deae] text-[32px] antialiased">
                About the developer
              </h1>
              <p className="my-2 tablet:text-[16px]">Hi there, I'm Jan 👋🏽</p>
              <p className="text-left tablet:text-[16px]">
                I'm a Full-Stack Software Engineer with a focus in Web
                Development and RESTfull API development. Design inspiration
                comes from{' '}
                <a
                  className="hover:underline italic"
                  href="https://invinciblehouseplants.com/"
                >
                  Invincible House Plants
                </a>{' '}
                blog and the{' '}
                <a
                  className="hover:text-[#173d0a] hover:underline italic"
                  href="https://getplanta.com/"
                >
                  Planta
                </a>{' '}
                landing page. Plantasynch was made out of my wife's constant
                struggle to keep her plant children alive. Hope you find it
                usefull 🪴
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
