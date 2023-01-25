import ExploreIndex from "../Components/ExploreIndex"

export default function Explore(){

    return(
        <div>
            <div className="flex flex-row justify-left p-3 pb-0">
                <h1 className="text-[40px] text-center p-2 tablet:text-[75px]">
                    Explore Plants
                </h1>
            </div>
            <p className="text-center text-[15px] p-1 pt-0">Click on plant for details or to add to your garden</p>
            <ExploreIndex/>
        </div>
    )
}