import { useState } from 'react';

export default function useSkipConfirmation({handleUpdate, name}) {
  const [confirmation, setConfirmation] = useState(false);

  const modelConfirmation = (
      <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed left-0 bottom-0 w-screen h-screen z-50 pt-0">
        <div className="bg-white px-8 py-10 rounded-md text-center w-[90%] max-w-[600px] tracking-wide font-normal">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Are you sure you want to skip your {name} today?
          </h1>
          <button
            onClick={() => setConfirmation(false)}
            className="bg-red-500 px-2 py-2 rounded-md text-md tracking-wider text-white hover:bg-red-600"
          >
            Don't skip
          </button>
          <button
            onClick={() => handleUpdate()}
            className="bg-green-500 hover:bg-green-600 px-2 py-2 ml-2 tracking-wider rounded-md text-md text-white"
          >
            Yes, please
          </button>
        </div>
        
      </div>
    );

  return [confirmation, setConfirmation, modelConfirmation];
}
