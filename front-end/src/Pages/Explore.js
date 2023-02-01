import ExploreIndex from "../Components/ExploreIndex"
import Footer from "./Footer"

export default function Explore(){

    return(
        <div>
            <div className="flex flex-row p-3 justify-left pb-0 tablet:pt-12 tablet:px-12">
                <h1 className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#173d0a] to-[#64aa85] place-self-start text-[32px] antialiased tablet:text-[40px]">
                    Explore Plants
                </h1>
            </div>
            <p className="text-center text-[15px] p-1 pt-0 tablet:text-left tablet:px-20">Click on plant for details or to add to your garden</p>
            <ExploreIndex/>
            <Footer/>
        </div>
    )
}