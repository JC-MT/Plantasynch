import PlantDetails from "../Components/PlantDetails"
import Footer from "./Footer"

export default function Show({notification}){

    return(
        <div className='text-center'>
            <PlantDetails notification={notification}/>
            <Footer/>
        </div>
    )
}