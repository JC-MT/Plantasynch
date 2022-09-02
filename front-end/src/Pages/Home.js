import HomeIndex from "../Components/HomeIndex"

export default function Home(){

    return(
        <div>
            <div className="flex flex-row justify-left drop-shadow-sm p-5">
                <img className='place-self-center w-[70px] h-[70px] p-1' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
                <h1 className="text-[50px] text-center p-[10px]">
                    My Plants
                </h1>
            </div>
            <p className="text-center">Feel free to discover new plant in the <em>"Explore"</em> page or simple go to <em>"Add"</em>.</p>
            <HomeIndex/>
        </div>
    )
}