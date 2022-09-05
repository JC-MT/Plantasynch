import PlantDetails from "../Components/PlantDetails"

export default function Show({height, width}){
    return(
        <div className='text-center justify-content'>
            <PlantDetails height={height} width={width}/>
        </div>
    )
}