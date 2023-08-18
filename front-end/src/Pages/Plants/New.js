import NewPlantForm from '../../Components/Forms/NewPlantForm';
import Scanner from '../../Components/Forms/Scanner';
import Toast from '../../Components/UI/Toast';
import { useState } from 'react';

export default function New({ loggedInUser }) {
  const [toggleAdd, setToggleAdd] = useState({
    scanView: true,
    formView: false
  });

  return (
    <div className="tablet:p-6 tablet:px-[8%]">
      <div className="flex flex-row p-2 pb-0 tablet:justify-center">
        <div className="flex flex-col w-full">
          <div className="flex w-full place-self-center flex-row max-w-[500px] max-h-fit">
            <div
              className={`max-w-[250px] rounded-xl w-[50%] absolute ease-in-out transition-transform duration-300 opacity-90 flex text-[#D9F8B9] ${
                toggleAdd.formView
                  ? 'translate-x-[93.5%] tablet:translate-x-full pl-2 pr-1 tablet:pl-2 tablet:pr-0'
                  : 'pr-2 tablet:pr-0'
              }`}
            >
              <div
                className={
                  'max-w-[250px] w-full h-[32px] tablet:h-[45px] bg-[#224722] rounded-xl'
                }
              ></div>
            </div>
            <div className="text-center bg-slate-200 p-1 tablet:p-2 w-full max-w-[500px] rounded-xl flex flex-row place-content-center shadow-lg">
              <h1
                onClick={() => {
                  setToggleAdd({ scanView: true, formView: false });
                }}
                className={`${
                  toggleAdd.scanView ? 'text-white' : ''
                } transition-all duration-700 cursor-pointer tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-md tablet:text-lg`}
              >
                Scan
              </h1>
              <h1
                onClick={() => {
                  setToggleAdd({ scanView: false, formView: true });
                }}
                className={`${
                  toggleAdd.formView ? 'text-white' : ''
                } transition-all duration-700 cursor-pointer tracking-wide text-center z-40 w-[50%] tablet:w-[550px] text-md tablet:text-lg`}
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
      <Toast />
    </div>
  );
}
