import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import bgW from "../icons/bgW.png"
import headshot from "../icons/headshot.jpeg"
import Footer from "./Footer"

import 'react-toastify/dist/ReactToastify.css';

export default function Welcome({loggedInUser, setLoggedInUser}){
    const [scrollTop, setScrollTop] = useState(50);

    const notify = (result) => {
    
        return result ? toast.success(`You have been sucessfully logged out.🪴`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      }) : toast.error(`We were unable to log you out 🥲 Please check your internet and try again in a few minutes.`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      })}

    const handleLogOut = () => {
        setLoggedInUser({})


        if(loggedInUser.id){
            document.body.scrollTop = document.documentElement.scrollTop = 0 
            notify(true)
        } else {
            notify(false)
        }
    }      
    const handleClose = () => {
        
        document.body.scrollTop = document.documentElement.scrollTop = 0 

    };
    
    useEffect(() => {
      const handleScroll = () => {
        // if(window.scrollY > 250){

        // } else {
            setScrollTop(window.scrollY);
        // }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return(
        <div className='flex absolute top-0 right-0 left-0 flex-col laptop:mt-26'>
            <header className='flex z-20 top-0 w-screen justify-center overflow-hidden place-items-center'>
                <img className={`scale-x-[1] pt-[70px] pb-8 h-screen`} src={bgW}/>
                <div className={`absolute flex flex-col top-[120px] place-items-center`}>
                <p className="tracking-wide font-['baskerville-urw'] place-self-start origin-left text-[16px] italic text-[#173d0a] subpixel-antialiased font-normal text-center tablet:text-[70px]">
                Welcome to your one stop Plant Application
                </p>
                <h1 className="text-[#173d0a] text-[32px] font-['brandon-grotesque'] font-bold antialiased tracking-wide uppercase mt-5">Plantasynch</h1>
                <h3 className="text-[#64aa85] text-[18px] font-['brandon-grotesque'] font-bold antialiased tracking-wide">Keep your plants alive</h3>
                </div>
            </header>
            <div className={`z-30 pt-0 p-4 flex flex-col place-items-center bg-white`}>
            <h1 className='z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased'>Using Plantasynch</h1>
            <div className='flex flex-col gap-1 place-items-center drop-shadow-sm'>
                <Link onClick={handleClose} className='mt-2 button-style text-center w-42 tablet:w-52' to={`${ loggedInUser.id ? '/settings' : '/sign-up'}`}>{ loggedInUser.id ? 'Go to settings' : 'Sign in with email'}</Link>
                <button className={`m-0 button-style text-center w-36 tablet:w-52 ${loggedInUser.id ? '' : 'hidden'}`} onClick={handleLogOut}>Log out</button>
                <Link onClick={handleClose} className={`m-0 button-style text-center w-42 tablet:w-52 ${loggedInUser.id ? 'hidden' : ''}`} to={'/log-in'}>Log in with email</Link>
                <Link onClick={handleClose} className='hover:underline' to='/my-plants'>{ loggedInUser.id ? 'Go to my garden' : 'Skip to demo site'}</Link>
            </div>
            <div className='flex flex-row gap-5 justify-center drop-shadow-sm p-5'>
                <a className='flex flex-col place-self-center'href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
                    <img
                    className="w-12 h-12 rounded-full place-self-center hover:bg-[#D9F8B9]"
                    alt="GitHub"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    />
                </a>
                <a className='flex flex-col place-self-center' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                    <img
                    className="w-12 h-12 place-self-center hover:bg-[#D9F8B9]"
                    alt="LinkedIn"
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    />
                </a>
            </div>
            
            {/* <img alt='logo' className='place-self-center w-100px h-[100px] p-1 tablet:w-[100px] tablet:h-[100px] laptop:mt-20' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/> */}
                <h1 className='z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased'>Technologies</h1>
                <img className='place-self-start p-1' src='https://skillicons.dev/icons?i=postgres,express,react,nodejs,tailwind'/>
                <p className='text-left tablet:text-[25px] text-[#173d0a]'>Plantasynch is using a PERN stack: Postgres, Express, React, and Node. To send email reminders, our backend is using <a target="_blank" rel="noreferrer" href='https://nodemailer.com/about/' className='hover:text-[#D9F8B9]'>Nodemailer</a> and <a target="_blank" rel="noreferrer" href='https://render.com/' className='hover:text-[#D9F8B9]'>Render's</a> Cron job to dynamically send emails to users when plants need attention.</p>
                <h1 className='z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased'> About Plantasynch</h1>                
                <p className='text-left tablet:text-[25px] text-[#173d0a]'><p className='inline antialiased tracking-wide'>Plantasynch</p> is a full-stack web-application that makes watering plants easy and provides helpful curated plant information. Keep your plants alive with Plantasynch.</p>
                <h1 className='font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased'> About the Dev</h1>
                <a className='flex flex-col place-self-center' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                <img className='h-[325px] w-screen' src={headshot}/>
                </a>
                <p className='mt-4 place-self-start tablet:text-[25px]'>Hi, I'm Jan</p>
                <p className='mt-4 text-left tablet:text-[25px]'>I recently completed a year-long fellowship that allowed me to grow from zero code to building my own fully deployed websites. <p className='underline-offset-4 inline underline'>Currently, looking for a Entry Level Software Engineering role</p>. This application was made out of my wife's constant struggle to keep her plant children alive. Hope you find it usefull.</p>            
            </div>
            
            <div className='z-50'>
            <ToastContainer
                limit={1}
                toastStyle={{color: 'white', backgroundColor: 'black'}}
                />
            </div>
            <Footer/>
        </div>
    )
}