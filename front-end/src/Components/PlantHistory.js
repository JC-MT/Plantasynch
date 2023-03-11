import * as dayjs from 'dayjs'
import Watered from "../icons/watering.png"
import Updated from "../icons/refresh.png"
import Skipped from "../icons/skip.png"

export default function PlantHistory({actions}){  

    return(
        <div className='flex flex-col place-self-center text-left p-2 pt-0 tablet:pb-12 w-[80%] max-w-[550px]'>
         <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] text-[32px] antialiased">
              Plant History:
            </h1>             
            <div className={`flex flex-col`}>
                {actions.map((action, id) => {
                    const icon = { Watered: Watered, Updated: Updated, Skipped: Skipped, Created: 'https://cdn-icons-png.flaticon.com/512/628/628324.png'}
                    const link = { Watered: "https://www.flaticon.com/free-icons/plant", Updated: "https://www.flaticon.com/free-icons/refresh", Skipped: "https://www.flaticon.com/free-icons/skip" }
                    const title = { Watered: "Plant icons created by Freepik - Flaticon", Updated: "Refresh icons created by Freepik - Flaticon", Skipped: "Skip icons created by Gajah Mada - Flaticon" }
                    
                    return (
                        <>
                        <div key={id} className='flex flex-row place-content-between'>
                            <p className={`pb-1 px-1 text-left`}>{action.action} on {dayjs(action.date).format('MMM D, YYYY')} </p>
                            <a href={link[action.action] || '#'} rel="noreferrer" target="_blank" title={title[action.action]}>
                                <img alt='action icon' className='mr-3 h-6 w-6' src={icon[action.action]}/>
                            </a>
                        </div>
                        <hr className='pb-2'></hr>
                        </>)
                    })}
            </div>
        </div>
    )
}