import HomeIndex from "../Components/HomeIndex"

export default function Home({notification, reFetch}){

    return(
        <div>
            <div className="flex flex-row justify-left p-3">
                <h2 className="text-[40px] text-center tablet:text-[75px]">
                    Your Garden
                </h2>
            </div>
            <p className="text-left p-2 pt-0">Feel free to discover/add new plants from the <em>"Explore"</em> page or simple add your plants with the <em>"Add"</em> page.</p>
            <HomeIndex notification={notification} reFetch={reFetch}/>
        </div>
    )
}