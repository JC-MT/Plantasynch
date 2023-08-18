import { useState, useEffect } from 'react';

export default function Loader({ pathname }) {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 1000);

    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [pathname]);

  return (
    <div
      className={`z-50 fixed flex bg-white top-0 left-0 right-0 h-screen p-4 place-content-center w-screen ${
        loader ? '' : 'hidden'
      }`}
    >
      <img
        alt="loader gif"
        className={`place-self-center z-50 px-2 py-20 tablet:p-0 tablet:h-[90%] tablet:w-[40%] tablet:max-w-[450px] tablet:max-h-[550px]`}
        src="https://media2.giphy.com/media/daa8oT5L8Ox3ffWVjr/giphy.gif"
      />
    </div>
  );
}
