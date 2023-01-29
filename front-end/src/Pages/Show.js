import PlantDetails from "../Components/PlantDetails"
import Footer from "./Footer"

export default function Show({notification, height, width}){
    return(
        <div className='text-center justify-content'>
            <PlantDetails notification={notification} height={height} width={width}/>
            <Footer/>
        </div>
    )
}