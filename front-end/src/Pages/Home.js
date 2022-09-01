import HomeIndex from "../Components/HomeIndex"

export default function Home(){

    return(
        <div>
            <h1 className="text-[50px] text-center p-[10px]">
                My Plants
            </h1>
            <p className="text-center">Feel free to discover new plant in the <em>"Explore"</em> page or simple go to <em>"Add"</em>.</p>
            <HomeIndex/>
        </div>
    )
}