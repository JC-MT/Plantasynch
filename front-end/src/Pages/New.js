import NewPlantForm from '../Components/NewPlantForm'
import Footer from './Footer';
import Scanner from '../Components/Scanner';
import { useState } from 'react';

export default function New({loggedInUser}) {
  const [ toggleAdd, setToggleAdd ] = useState({scanView: true, formView: false})

  return (
    <div>
      <div className="flex flex-row p-3 pb-0 tablet:justify-center">
        <div className='flex flex-col w-full'>
          <h2 className={`font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[45px] tablet:pt-8`}>
        {toggleAdd.scanView ? 'Scan my Plant' : 'Add my Plant'}
          </h2>
          <div className='overscroll-contain place-content-center tablet:flex'>
          <div className='flex flex-row justify-center overscroll-contain place-content-center max-w-[550px]'>
          <div className={`w-[94%] max-w-[550px] absolute ease-in-out transition-transform duration-300 opacity-90 flex flex-col justify-center text-center text-[#D9F8B9] place-items-center ${toggleAdd.formView ? 'translate-x-2/4' : ''}`}>
              <div className={'overscroll-contain place-self-start h-[45px] w-[50%] bg-[#224722] rounded-xl'}></div>
          </div>
            <div className='bg-gray-200 p-2 w-full max-w-[550px] rounded-xl flex flex-row place-content-center shadow-lg'>
              <h1 onClick={() => {setToggleAdd({scanView: true, formView: false})}} className={`${toggleAdd.scanView ? 'text-white' : ''} tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-lg`}>Scan</h1>
              <h1 onClick={() => {setToggleAdd({scanView: false, formView: true})}} className={`${toggleAdd.formView ? 'text-white' : ''} tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-lg`}>Form</h1>
            </div>
          </div>
          </div>
        </div>
      </div>
      { toggleAdd.scanView ? 
      <Scanner className='pt-0' loggedInUser={loggedInUser}/> 
      :
      <NewPlantForm loggedInUser={loggedInUser}/> }
      <Footer/>
    </div>
  );
}