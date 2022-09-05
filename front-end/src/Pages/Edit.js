import EditPlantForm from '../Components/EditPlantForm'

export default function Edit(){

    return(
        <div>   
            <h1 className='text-[50px] text-center p-[10px] pb-[20px] tablet:text-[75px]'>
                Edit your plant
            </h1>
            <EditPlantForm />
        </div>
    )
}