import ExploreIndex from "../Components/ExploreIndex"

export default function Explore(){

    return(
        <div>
            <div className="flex flex-row justify-left shadow-sm p-5">
                <img alt='logo' className='place-self-center w-[70px] h-[70px] p-1 tablet:w-[100px] tablet:h-[100px]' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
                <h1 className="text-[40px] text-center p-[10px] tablet:text-[75px]">
                    Explore Plants
                </h1>
            </div>
            <p className="text-center text-[15px] p-1">Click on plant for details or to add to your plants.</p>
            <ExploreIndex/>
        </div>
    )
}