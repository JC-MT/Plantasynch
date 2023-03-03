import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import bgW from "../icons/bgW.png"
import bgA from "../icons/bgA.jpeg"
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
        <div className='flex absolute flex-col w-screen overflow-x-hidden'>
            <header className='flex z-20 top-0 w-screen justify-center place-items-center'>
                <img className={`scale-x-[1] pb-12 h-screen w-full tablet:hidden`} src={bgW}/>
                <img className={`hidden py-12 pb-26 w-screen tablet:flex`} src={bgA}/>
                <div className={`absolute flex flex-col top-[50px] tablet:top-[100px] place-items-center`}>
                <p className="tracking-wide font-['baskerville-urw'] place-self-start origin-left text-[16px] tablet:text-[20px] italic text-[#173d0a] subpixel-antialiased font-normal text-center">
                Welcome to your one stop Plant Application
                </p>
                <h1 className="text-[#173d0a] text-[32px] font-['brandon-grotesque'] font-bold antialiased tracking-wide tablet:tracking-wider tablet:text-[38px] uppercase mt-5">Plantasynch</h1>
                <h3 className="text-[#64aa85] text-[18px] font-['brandon-grotesque'] font-bold antialiased tracking-wide tablet:text-[20px]">Keep your plants alive</h3>
                </div>
            </header>
            <div className={`z-30 pt-0 p-4 flex flex-col place-items-center bg-white tablet:px-[15%]`}>
            <h1 className='z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased tablet:p-2'>Using Plantasynch</h1>
            <div className='flex tablet:p-2 flex-col gap-1 place-items-center drop-shadow-sm'>
                <Link onClick={handleClose} className='mt-2 button-style text-center w-42' to={`${ loggedInUser.id ? '/settings' : '/sign-up'}`}>{ loggedInUser.id ? 'Go to settings' : 'Sign in with email'}</Link>
                <button className={`m-0 button-style text-center w-36 ${loggedInUser.id ? '' : 'hidden'}`} onClick={handleLogOut}>Log out</button>
                <Link onClick={handleClose} className={`m-0 button-style text-center w-42 ${loggedInUser.id ? 'hidden' : ''}`} to={'/log-in'}>Log in with email</Link>
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
                <h1 className='tablet:p-2 z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased'> About Plantasynch</h1>                
                <p className='tablet:p-2 text-left tablet:text-[20px]'><p className='inline antialiased tracking-wide italic text-lg'>Plantasynch </p> is a full-stack web-application that makes the life-long problem of keeping your plants alive, a thing of the past. Features Include: Scanning any unknown plant, Email Notifications for when your plant needs watering, Keeping track of when you watered your plants or skiped a day, Curated plant information and many more to come. Keep your plants alive with Plantasynch.</p>
                <h1 className=' tablet:p-2 z-20 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased'>Technologies</h1>
                <img className='tablet:p-2 place-self-start p-1' src='https://skillicons.dev/icons?i=postgres,express,react,nodejs,tailwind'/>
                <p className='tablet:p-2 text-left tablet:text-[20px]'>Plantasynch is using a PERN stack: Postgres, Express, React, Node, and TailwindCSS, as CSS framework. To send email reminders, our backend is using <a target="_blank" rel="noreferrer" href='https://nodemailer.com/about/' className='hover:text-[#D9F8B9]'>Nodemailer</a> and <a target="_blank" rel="noreferrer" href='https://render.com/' className='hover:text-[#D9F8B9]'>Render's</a> Cron job to dynamically send emails to users when plants need attention.</p>
                <h1 className='tablet:p-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:px-[22%]'>About the Dev</h1>
                <div className='flex pt-0 flex-col place-content-center tablet:flex-row'>
                <a className='inline tablet:p-2 place-self-center' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                <img className='tablet:p-2 h-[325px] w-screen tablet:h-[250px] tablet:w-[250px]' src={headshot}/>
                </a>
                <div className='tablet:w-[35%]'>
                    <p className='tablet:p-2 mt-4 tablet:text-[15px]'>Hi there, I'm Jan 👋🏽</p>
                    <p className='tablet:p-2 mt-4 tablet:mt-0 text-left tablet:text-[15px]'>I'm a Full-Stack Software Engineer with focus in Web Development and RESTfull API development using modern frameworks to scale applications quickly. <p className='inline'>Currently, I'm looking for a Software Engineering role in a company that is able to be intential with early career software engineers. </p>This application was made out of my wife's constant struggle to keep her plant children alive. Hope you find it usefull.</p>            
                </div>
                </div>
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