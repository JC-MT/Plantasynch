import { useState } from 'react';
import * as dayjs from 'dayjs';
import Watered from '../icons/watering.png';
import Updated from '../icons/refresh.png';
import Skipped from '../icons/skip.png';

export default function PlantHistory({ actions }) {
    const [ selected, setSelected] = useState({default: true, created: false, watered: false, updated: false, skipped: false})
    const [ showAmount, setShowAmount ] = useState(0)
    const [ start, setStart] = useState(0)
    const [end, setEnd] = useState(actions.filter(handleFiltering).length)

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

    function handlePagination(start, showAmount, page){

      if(showAmount){
        setShowAmount(showAmount)
        setEnd(showAmount * page)
        setStart(showAmount * (page - 1))

      } else {
        setEnd(actions.filter(handleFiltering).length)
        setStart(0)
        setShowAmount(0)
      }
    }

    function getCurrentPageLength(){
      let amountOfPages = []
      let pageNumber = 1
      const totalEntries = actions.filter(handleFiltering).length

      for(let page = 1; page <= totalEntries; page += showAmount){
        amountOfPages.push(pageNumber)
        pageNumber += 1
      }

      return amountOfPages
    }

  return (
    <div className="flex flex-col place-self-center text-left p-2 pt-0 tablet:pb-12 w-full tablet:w-[80%] max-w-[550px]">
      <div>
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased">
            Plant History:
        </h1>

        <div className='flex flex-col gap-0 pt-0 p-3 px-1'>
            <h3 className='text-left p-1 text-lg'>Filtered by:</h3>
            <div className='flex flex-row'>
              <div onClick={() => handleSelected('created')} className={`hover:cursor-pointer border-2 hover:border-[#64aa85] ${selected.created ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'text-black bg-slate-50 hover:bg-slate-100'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>      
                <p>Created</p>
              </div>
              <div onClick={() => handleSelected('watered')} className={`hover:cursor-pointer border-2 hover:border-[#64aa85] ${selected.watered ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'text-black bg-slate-50 hover:bg-slate-100'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <p>Watered</p>            
              </div>
              <div onClick={() => handleSelected('updated')} className={`hover:cursor-pointer border-2 hover:border-[#64aa85] ${selected.updated ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'text-black bg-slate-50 hover:bg-slate-100'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <p>Updated</p>            
              </div>
              <div onClick={() => handleSelected('skipped')} className={`hover:cursor-pointer border-2 hover:border-[#64aa85] ${selected.skipped ? 'bg-[#64aa85] hover:bg-[#64aa85]' : 'text-black bg-slate-50 hover:bg-slate-100'} p-2 w-fit button-style m-0 gap-1 justify-center place-items-center drop-shadow-2xl`}>
                <p>Skipped</p>            
              </div>
            </div>
        </div>

        { showAmount ? getCurrentPageLength().map((page) => {return <p onClick={() => handlePagination(start, showAmount, page)} >{page}</p>}) : ''}

        <div className='flex h-fit'>
          <div class={`w-fit bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
              <ul class="flex gap-2 p-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                <li>
                  <div class="flex items-center">
                    <input onChange={() => handlePagination()} name='amount' type="radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                    <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clear</label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <input onChange={() => handlePagination(start, 5, 1)}  name='amount' type="radio" value={showAmount} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                    <label  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">5 per page</label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                      <input onChange={() => handlePagination(start, 10, 1)} name='amount' type="radio" value={showAmount} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                      <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">10 per page</label>
                    </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
      <div className={`flex flex-col`}>
        {actions.filter(handleFiltering).slice(start, end).map((action, id) => {
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
