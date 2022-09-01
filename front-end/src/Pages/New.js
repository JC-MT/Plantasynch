import NewPlantForm from '../Components/NewPlantForm'

export default function New() {
  return (
    <div>
      <h1 className='text-[42px] text-center p-[10px]'>Add to your Garden</h1>
      <p className=' text-center pb-[10px] text-[15px]'>*We will need at least a name to add your new plant</p>
      <NewPlantForm />
    </div>
  )
}