import { useState } from 'react';

export default function useWaterConfirmation({handleUpdate, plant}) {
  const [confirmation, setConfirmation] = useState(false);

  const modelConfirmation = (
      <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center fixed left-0 bottom-0 w-screen h-screen z-50 pt-0">
        <div class="bg-white px-8 py-10 rounded-md text-center w-[90%] tracking-wide font-normal">
          <h1 class="text-xl mb-4 font-bold text-slate-500">
            Looks like {plant.name} is not ready to be watered. Are you sure you want to water this plant?
          </h1>
          <button
            onClick={() => setConfirmation(false)}
            class="bg-red-500 px-2 py-2 rounded-md text-md tracking-wider text-white hover:bg-red-600"
          >
            Don't water
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
