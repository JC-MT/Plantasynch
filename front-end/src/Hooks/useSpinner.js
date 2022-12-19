import { useState } from 'react';

export default function useSpinner() {
  const [spinner, setSpinner] = useState(false);

  const spinnerStructure = (
    <div id="spinner" className="flex flex-col items-center justify-center p-5">
      <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      <p className='w-96 italic text-center p-5'>Plantasync data is hosted on a free cloud web-service. This may cause a response delay of up to 30 seconds for the first request.</p>
    </div>
  );

  return [spinner, setSpinner, spinnerStructure];
}