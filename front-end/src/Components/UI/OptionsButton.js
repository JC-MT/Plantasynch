import { useState } from 'react';
import { Link } from 'react-router-dom';
import moreOptions from '../../icons/moreOptions.png';

export default function OptionsButton({ id, setDeleteModel, name }) {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div
      className={`grayscale-0 place-content-center h-[275px] overflow-hidden flex place-items-center flex-col pt-1 pr-0`}
    >
      <div className="px-1 place-self-end">
        <img
          src={moreOptions}
          className={`${
            openOptions ? 'opacity-70' : 'opacity-90'
          } right-0 rotate-90 hover:border-[#D9F8B9] cursor-pointer align-self-center place-self-center border-slate-800 border-2 m-0 w-[40px] h-[40px] rounded-full text-lg`}
          onClick={() => setOpenOptions((state) => !state)}
        />
      </div>
      <h3 className="absolute w-full mt-10 place-self-center text-white font-semibold text-[40px] text-center">
        {name}
      </h3>
      <div
        className={`gap-1 px-5 h-full tablet:pt-20 w-full tablet:w-[400px] transition-transform duration-700 flex flex-col justify-center text-center text-[#D9F8B9] place-items-center ${
          openOptions ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link
          className={'w-full text-lg h-[48px] p-2 bg-[#224722]'}
          to={`/my-plants/${id}/edit`}
        >
          Edit
        </Link>
        <button
          onClick={() => setDeleteModel(true)}
          className="w-full text-lg h-[48px] p-2 bg-[#224722] border-black text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
