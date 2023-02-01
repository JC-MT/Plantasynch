import * as dayjs from 'dayjs'
import Watered from "../icons/watering.png"
import Updated from "../icons/refresh.png"
import Skipped from "../icons/skip.png"


export default function PlantHistory({actions}){  

    return(
        <div>
            <h3 className={`p-1 pb-0 h-fit place-self-start text-left font-semibold antialiased tracking-wide uppercase tablet:px-[35%]`} >Plant History</h3>
            <div className={`flex flex-col p-2 tablet:pb-20`}>
                {actions.reverse().map((action, id) => {
                    let icon = { Watered: Watered, Updated: Updated, Skipped: Skipped, Created: 'https://cdn-icons-png.flaticon.com/512/628/628324.png'}

                    let link = { Watered: "https://www.flaticon.com/free-icons/plant", Updated: "https://www.flaticon.com/free-icons/refresh", Skipped: "https://www.flaticon.com/free-icons/skip" }
                    let title = { Watered: "Plant icons created by Freepik - Flaticon", Updated: "Refresh icons created by Freepik - Flaticon", Skipped: "Skip icons created by Gajah Mada - Flaticon" }
                    
                    return (
                        <div key={id} className='flex flex-row place-content-between tablet:px-[35%]'>
                            <p className={`pb-1 px-1 text-left`}>{action.action} on {dayjs(action.date).format('MMM D, YYYY')} </p>
                            <a href={link[action.action] || '#'} rel="noreferrer" target="_blank" title={title[action.action]}>
                                <img alt='action icon' className='mr-3 h-6 w-6' src={icon[action.action]}/>
                            </a>
                        </div>)
                    })}
            </div>
        </div>
    )
}