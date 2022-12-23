import NewPlantForm from '../Components/NewPlantForm'

export default function New() {
  return (
    <div>
      <div className="flex flex-row justify-left p-5 laptop:justify-center">
        <img alt='logo' className='place-self-center w-[70px] h-[70px] p-1 tablet:w-[100px] tablet:h-[100px] laptop:hidden' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
        <h2 className="text-[40px] text-center tablet:text-[75px]">
        Add to your Garden
        </h2>
      </div>
      <p className=' text-center pb-[10px] text-[15px] tablet:text-[20px]'>*We will need at least a name to add your new plant</p>
      <NewPlantForm />
    </div>
  )
}