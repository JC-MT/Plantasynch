import HomeIndex from "../Components/HomeIndex"
import Footer from "./Footer"

export default function Home({loggedInUser, notification, reFetch}){

    return(
        <div className="flex flex-col tablet:pt-8">
            <div className="flex flex-row justify-left p-3 tablet:pt-10 tablet:px-[15%]">
                <h2 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px] tablet:px-4">
                    Your Garden
                </h2>
            </div>
            <p className="text-left p-2 pt-0 tablet:px-[15%]">Feel free to discover/add new plants from the <em>"Explore"</em> page or simple add your plants with the <em>"Add"</em> page.</p>
            <HomeIndex loggedInUser={loggedInUser} notification={notification} reFetch={reFetch}/>
            <Footer/>
        </div>
    )
}