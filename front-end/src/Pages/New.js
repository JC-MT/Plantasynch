import NewPlantForm from '../Components/NewPlantForm'

export default function New() {
  return (
    <div>
      <div className="flex flex-row justify-left p-3 laptop:justify-center">
        <h2 className="text-[40px] text-center tablet:text-[75px]">
        Add to your Garden
        </h2>
      </div>
      <p className=' text-center pb-[10px] text-[15px] tablet:text-[20px]'>*Plantasynch needs at least a name to add your new plant</p>
      <NewPlantForm />
    </div>
  );
}