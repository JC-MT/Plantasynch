import EditPlantForm from '../Components/EditPlantForm'

export default function Edit(){

    return(
        <div>   
            <h1 className='hidden tablet:text-[75px]'>
                Edit your plant
            </h1>
            <EditPlantForm />
        </div>
    )
}