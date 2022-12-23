import { useState } from 'react';

export default function useWaterConfirmation({handleUpdate, plant}) {
  const [confirmation, setConfirmation] = useState(false);

  const modelConfirmation = (
      <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute -top-96 -right-12 -bottom-96 -left-12 overscroll-contain">
        <div class="bg-white px-16 py-14 rounded-md text-center">
          <h1 class="text-xl mb-4 font-bold text-slate-500">
            Looks like {plant.name} is not ready to be watered. Are you sure you want to water this plant?
          </h1>
          <button
            onClick={() => setConfirmation(false)}
            class="bg-red-500 px-4 py-2 rounded-md text-md text-white hover:bg-red-600"
          >
            Don't water
          </button>
          <button
            onClick={() => handleUpdate()}
            className="bg-green-500 hover:bg-green-600 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Yes, please
          </button>
        </div>
        
      </div>
    );

  return [confirmation, setConfirmation, modelConfirmation];
}
