import { Link } from "react-router-dom"

export default function Footer(){  
    const handleClose = () => {
        
        document.body.scrollTop = document.documentElement.scrollTop = 0 

    };

    return(
        <div className="text-left flex flex-col place-content-between pt-32 py-12 px-4 h-screen bg-[#9EC2AF]">
            <div>
            <Link to={'/'} onClick={handleClose}>
                <h1 class="text-[rgb(23,61,10)] text-[32px] font-['brandon-grotesque'] font-bold antialiased tracking-wide uppercase">Plantasynch</h1>
            </Link>
                <p className="px-2">Keep your plants alive</p>
            </div>
        <div className="flex flex-row place-content-center gap-2">
                <a className='place-self-center'href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
                    <img
                    className="w-6 h-6 rounded-full place-self-center"
                    alt="GitHub"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    />
                </a>
                <a className='place-self-center' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                    <img
                    className="w-8 h-8 place-self-center"
                    alt="LinkedIn"
                    src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-HD.png"
                    />
                </a>
        </div>

        <div className="flex flex-col">
        <div className='flex flex-row place-content-evenly text-slate-800 p-4'>
          <Link to={'/my-plants'} onClick={handleClose} class="text-xl delay-150 hover:text-slate-400 hover:cursor-pointer">
              Home
        </Link >
        <Link to={'/explore'} onClick={handleClose} class="text-xl w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            Explore
        </Link>

        <Link to={'/new'} onClick={handleClose} class="text-xl w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            Add
        </Link>

        <Link to={'/'} onClick={handleClose} class="text-xl w-min delay-150 hover:text-slate-400 hover:cursor-pointer">
            About
        </Link>
        </div>
        <p className="text-sm">© 2023 Plantasynch, a project with no intention to profit.</p>
        </div>

        </div>

    )
}