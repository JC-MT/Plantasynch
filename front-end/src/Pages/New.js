import NewPlantForm from '../Components/NewPlantForm';
import Footer from './Footer';
import Scanner from '../Components/Scanner';
import { useState } from 'react';

export default function New({ loggedInUser }) {
  const [toggleAdd, setToggleAdd] = useState({
    scanView: true,
    formView: false
  });

  return (
    <div>
      <div className="flex flex-row p-2 pb-0 tablet:justify-center tablet:px-[15%]">
        <div className="flex flex-col w-full">
          <h2
            className={`font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[45px] tablet:pt-4`}
          >
            {toggleAdd.scanView ? 'Scan my Plant' : 'Add my Plant'}
          </h2>
          <div className="flex w-full place-self-center flex-row max-w-[500px] max-h-fit">
            <div
              className={`max-w-[250px] w-[50%] absolute ease-in-out transition-transform duration-300 opacity-90 flex text-[#D9F8B9] ${
                toggleAdd.formView
                  ? 'translate-x-[90%] tablet:translate-x-full pl-2 pr-1 tablet:pl-2 tablet:pr-0'
                  : 'pr-2 tablet:pr-0'
              }`}
            >
              <div
                className={
                  'max-w-[250px] w-full h-[45px] bg-[#224722] rounded-xl'
                }
              ></div>
            </div>
            <div className="text-center bg-gray-200 p-2 w-full max-w-[500px] rounded-xl flex flex-row place-content-center shadow-lg">
              <h1
                onClick={() => {
                  setToggleAdd({ scanView: true, formView: false });
                }}
                className={`${
                  toggleAdd.scanView ? 'text-white' : ''
                } cursor-pointer tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-lg`}
              >
                Scan
              </h1>
              <h1
                onClick={() => {
                  setToggleAdd({ scanView: false, formView: true });
                }}
                className={`${
                  toggleAdd.formView ? 'text-white' : ''
                } cursor-pointer tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-lg`}
              >
                Form
              </h1>
            </div>
          </div>
        </div>
      </div>
      {toggleAdd.scanView ? (
        <Scanner className="pt-0" loggedInUser={loggedInUser} />
      ) : (
        <NewPlantForm loggedInUser={loggedInUser} />
      )}
      <Footer />
    </div>
  );
}
