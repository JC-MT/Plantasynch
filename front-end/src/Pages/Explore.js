import ExploreIndex from '../Components/ExploreIndex';

export default function Explore() {
  return (
    <div className="tablet:px-[10%]">
      <div className="flex flex-row p-2 justify-left tablet:pt-6">
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
          Explore Plants
        </h1>
      </div>
      <p className="p-4 text-left text-[15px] pt-0 tablet:text-left">
        Browse through a wide variety of plants that can be added directly to
        your garden. Happy growing! 🌱
      </p>
      <ExploreIndex />
    </div>
  );
}
