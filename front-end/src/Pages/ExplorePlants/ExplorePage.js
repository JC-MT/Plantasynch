import Index from '../../Components/List/Explore/Index';

export default function ExplorePage() {
  return (
    <div className="flex flex-col place-items-center min-w-[280px] w-full">
      <div className="flex flex-col p-2 justify-left tablet:pt-6 w-full tablet:max-w-[650px] laptop:max-w-[1200px]">
        <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
          Explore Plants
        </h1>
        <p className="px-1 text-left text-[14px]">
          Browse through a wide variety of plants that can be added directly to
          your garden. Happy growing! 🌱
        </p>
      </div>
      <Index />
    </div>
  );
}
