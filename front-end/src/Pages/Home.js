import HomeIndex from "../Components/HomeIndex"
import Footer from "./Footer"

export default function Home({loggedInUser, notification, reFetch}){

    return(
        <div className="flex flex-col tablet:pt-8">
            <div className="flex flex-row justify-left p-2 tablet:pt-10 tablet:px-[12%]">
                <h2 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
                    Your Garden
                </h2>
            </div>
            <p className="text-left px-2 text-md tablet:text-lg tablet:p-0 tablet:px-[12%]">Discover or add new plants from the <em>Explore</em> page or simple scan your plants on the <em>Add</em> page.</p>
            <HomeIndex loggedInUser={loggedInUser} notification={notification} reFetch={reFetch}/>
            <Footer/>
        </div>
    )
}