import * as dayjs from 'dayjs'
import Watered from "../icons/watering.png"
import Updated from "../icons/refresh.png"
import Skipped from "../icons/skip.png"

export default function PlantHistory({actions}){  

    return(
        <div>
            <h3 className={`p-1 pb-0 h-fit place-self-start text-left font-semibold antialiased tracking-wide uppercase`} >Plant History</h3>
            <div className={`flex flex-col p-2`}>
                {actions.reverse().map((action) => {
                    let icon = { Watered: Watered, Updated: Updated, Skipped: Skipped }
                    let link = { Watered: "https://www.flaticon.com/free-icons/plant", Updated: "https://www.flaticon.com/free-icons/refresh", Skipped: "https://www.flaticon.com/free-icons/skip" }
                    let title = { Watered: "Plant icons created by Freepik - Flaticon", Updated: "Refresh icons created by Freepik - Flaticon", Skipped: "Skip icons created by Gajah Mada - Flaticon" }
                    
                    return (
                        <div className='flex flex-row place-content-between'>
                            <p className={`pb-1 px-1 text-left`}>{action.action} on {dayjs(action.date).format('MMM D, YYYY')} </p>
                            <a href={link[action.action]} target="_blank" title={title[action.action]}>
                                <img className='mr-3 h-6 w-6' src={icon[action.action]}/>
                            </a>
                        </div>)
                    })}
            </div>
        </div>
    )
}