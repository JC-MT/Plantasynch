import NewPlantForm from '../Components/NewPlantForm'
import Footer from './Footer';

export default function New({loggedInUser}) {
  return (
    <div>
      <div className="flex flex-row justify-left p-3 laptop:justify-center">
        <h2 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[45px] tablet:pt-8">
        Add to your Garden
        </h2>
      </div>
      <p className=' text-center pb-[10px] text-[15px] tablet:text-[15px]'>*Plantasynch needs at least a name to add your new plant</p>
      <NewPlantForm loggedInUser={loggedInUser}/>
      <Footer/>
    </div>
  );
}