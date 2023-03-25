import { useState } from 'react';
import * as dayjs from 'dayjs';
import Watered from '../icons/watering.png';
import Updated from '../icons/refresh.png';
import Skipped from '../icons/skip.png';

export default function PlantHistory({ actions }) {
    const [ selected, setSelected] = useState({default: true, created: false, watered: false, updated: false, skipped: false})

    function handleSelected(option){
        setSelected({...selected, default: false, [option]: !selected[option]})
    }

    function handleFiltering(action){
        if(selected.default === false && selected.created === false && selected.watered === false && selected.updated === false && selected.skipped === false){
            setSelected({...selected, default: true})
        }

        if(selected[action.action.toLowerCase()] === true || selected.default === true){
            return action
        }
    }

  return (
    <div className="flex flex-col place-self-center text-left p-2 pt-0 tablet:pb-12 w-full tablet:w-[80%] max-w-[550px]">
      <div>
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased">
            Plant History:
        </h1>

        <div className='flex flex-row place-items-center gap-2 p-2'>
            <h3>Filtered by:</h3>
            <div onClick={() => handleSelected('created')} className={`hover:cursor-pointer ${selected.created ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'bg-slate-50 hover:bg-slate-200'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <img alt='plant' className='place-self-center w-[26px] h-[26px] tablet:w-[30px] tablet:h-[30px]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
            </div>
            <div onClick={() => handleSelected('watered')} className={`hover:cursor-pointer ${selected.watered ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'bg-slate-50 hover:bg-slate-200'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <img alt='plant' className='place-self-center w-[26px] h-[26px] tablet:w-[30px] tablet:h-[30px]' src={Watered}/>
            </div>
            <div onClick={() => handleSelected('updated')} className={`hover:cursor-pointer ${selected.updated ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'bg-slate-50 hover:bg-slate-200'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <img alt='plant' className='place-self-center w-[26px] h-[26px] tablet:w-[30px] tablet:h-[30px]' src={Updated}/>
            </div>
            <div onClick={() => handleSelected('skipped')} className={`hover:cursor-pointer ${selected.skipped ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'bg-slate-50 hover:bg-slate-200'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <img alt='plant' className='place-self-center w-[26px] h-[26px] tablet:w-[30px] tablet:h-[30px]' src={Skipped}/>
            </div>
        </div>
      </div>
      <div className={`flex flex-col`}>
        {actions.filter(handleFiltering).map((action, id) => {
          const icon = {
            Watered: Watered,
            Updated: Updated,
            Skipped: Skipped,
            Created: 'https://cdn-icons-png.flaticon.com/512/628/628324.png'
          };
          const link = {
            Watered: 'https://www.flaticon.com/free-icons/plant',
            Updated: 'https://www.flaticon.com/free-icons/refresh',
            Skipped: 'https://www.flaticon.com/free-icons/skip'
          };
          const title = {
            Watered: 'Plant icons created by Freepik - Flaticon',
            Updated: 'Refresh icons created by Freepik - Flaticon',
            Skipped: 'Skip icons created by Gajah Mada - Flaticon'
          };

          return (
            <div key={id}>
              <div key={id} className="flex flex-row place-content-between">
                <p className={`pb-1 px-1 text-left`}>
                  {action.action} on {dayjs(action.date).format('MMM D, YYYY')}{' '}
                </p>
                <a
                  href={link[action.action] || '#'}
                  rel="noreferrer"
                  target="_blank"
                  title={title[action.action]}
                >
                  <img
                    alt="action icon"
                    className="mr-3 h-6 w-6"
                    src={icon[action.action]}
                  />
                </a>
              </div>
              <hr className="pb-2"></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}
