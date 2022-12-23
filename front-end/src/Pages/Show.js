import PlantDetails from "../Components/PlantDetails"

export default function Show({notification, height, width}){
    return(
        <div className='text-center justify-content'>
            <PlantDetails notification={notification} height={height} width={width}/>
        </div>
    )
}