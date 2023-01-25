import { Link } from 'react-router-dom';

export default function Welcome(){
    return(
        <div className='flex flex-col p-3 laptop:mt-26'>
            <img alt='logo' className='place-self-center w-100px h-[100px] p-1 mt-6 tablet:w-[100px] tablet:h-[100px] laptop:mt-20' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
            <h1 className="text-[40px] text-center p-2 tablet:text-[75px] antialiased tracking-wide uppercase">
                Welcome to <h1 className='antialiased tracking-wider uppercase'>Plantasynch</h1>
            </h1>
            <p className='indent-2 p-2 text-left tablet:text-[25px]'><p className='inline antialiased underline tracking-wider uppercase'>Plantasynch</p> is a full-stack web-app that provides users general plant information and suggested plant care for all types of plants.</p>
            <div className='flex flex-col gap-1 place-items-center drop-shadow-sm'>
                <Link className='m-2 button-style text-center w-fit tablet:w-52' to='/sign-in'>Sign in with email</Link>
                <Link className='hover:underline' to='/my-plants'>Skip to demo site</Link>
            </div>
            <div className='flex flex-row gap-5 justify-center drop-shadow-sm p-5'>
                <a className='flex flex-col place-self-center'href="https://github.com/JC-MT/Plantasynch" target="_blank" rel="noreferrer">
                    <img
                    className="w-12 h-12 place-self-center hover:w-14 hover:h-14"
                    alt="GitHub"
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                    />
                </a>
                <a className='flex flex-col place-self-center' href="https://www.linkedin.com/in/jan-matias/" target="_blank" rel="noreferrer" >
                    <img
                    className="w-12 h-12 place-self-center hover:w-14 hover:h-14"
                    alt="LinkedIn"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
                    />
                </a>
            </div>
        </div>
    )
}