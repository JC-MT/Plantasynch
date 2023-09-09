import Index from '../../Components/List/Plant/Index';

export default function Home({ loggedInUser, notification, reFetch }) {
  return (
    <div className="flex flex-col place-items-center min-w-[350px] w-full">
      <div className="p-2 tablet:pt-6 w-full tablet:max-w-[650px] laptop:max-w-[1200px]">
        <h1 className="w-fit font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
          {loggedInUser.id ? 'Your' : 'Demo'} Garden
        </h1>
        <p className="text-left px-1 text-md tablet:text-md">
          Discover or add new plants from the <em>Explore</em> page or simple
          scan your plants on the <em>Add</em> page.
        </p>
      </div>
      <Index
        loggedInUser={loggedInUser}
        notification={notification}
        reFetch={reFetch}
      />
    </div>
  );
}
