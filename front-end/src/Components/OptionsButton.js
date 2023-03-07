import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import moreOptions from "../icons/moreOptions.png"

export default function OptionsButton({setModel, name}){  
    const { id } = useParams();
    const [ openOptions, setOpenOptions] = useState(false)

    return(
      <div className={`grayscale-0 place-content-center h-[275px] overflow-hidden flex place-items-center flex-col pt-1 pr-0`}>
        <div className='px-1 place-self-end'>
            <img src={moreOptions} className={`${openOptions ? 'opacity-20' : 'opacity-90'} right-0 rotate-90 hover:border-[#D9F8B9] cursor-pointer align-self-center place-self-center border-slate-800 border-2 m-0 w-[40px] h-[40px] rounded-full text-lg`} 
            onClick={() => setOpenOptions((openOptions) => setOpenOptions(!openOptions))} />
        </div>
        <h3 className="absolute w-full mt-10 place-self-center text-white font-semibold text-[40px] text-center">
              {name} 
          </h3> 
          <div className={`px-5 z-40 h-full tablet:pt-20 w-full tablet:w-[400px] transition-transform duration-700 delay-200 opacity-90 flex flex-col justify-center text-center text-[#D9F8B9] translate-x-full place-items-center ${openOptions ? 'translate-x-0' : ''}`}>
              <Link className={'w-full p-2 mb-[2px] bg-[#224722] rounded-full'} to={`/my-plants/${id}/edit`}>Edit</Link>
              <button onClick={() => setModel(true)}className='w-full p-2 bg-[#224722] border-black rounded-full text-center'>Delete</button>
          </div>
      </div>
    )
}