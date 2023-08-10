import ExploreIndex from '../Components/ExploreIndex';
import Footer from './Footer';

export default function Explore() {
  return (
    <div>
      <div className="tablet:px-[12%] flex flex-row p-2 justify-left tablet:pt-6">
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
          Explore Plants
        </h1>
      </div>
      <p className="tablet:px-[12%] p-2 text-left text-[15px] pt-0 tablet:text-left">
        Click on plant for details or to add to your garden
      </p>
      <ExploreIndex />
      <Footer />
    </div>
  );
}
