import { Link } from "react-router-dom";

export default function CreateAccount(){
    return(
        <div className='flex flex-col place-items-center'>
            <img className='place-self-center w-100px h-[100px] p-1 mt-6' src='https://cdn-icons-png.flaticon.com/512/628/628324.png'/>
            <h1 className="text-[40px] text-center p-2 tablet:text-[75px]">
                Create an account with your email
            </h1>
            <p className="indent-8 p-1 text-center"><strong>Note:</strong> This email does not need to be real. The intend for this page is clear app flow and ux/ui.</p>
            <div className='flex flex-col w-fit p-1'>
                <label htmlFor='email'>Email:</label>
                <input name='email' className='input-style' type='text' placeholder="Email"/>
            </div>
            <div className='flex flex-col w-fit p-1'>
                <label htmlFor='password'>Password:</label>
                <input name='password' className='input-style' type='text' placeholder="Password"/>
            </div>
            <div className='flex flex-col gap-1 place-items-center drop-shadow-sm'>
                <Link className='button-style mt-1 hover:bg-green-300' to='/my-plants'>Sign in</Link>
                <Link className='hover:underline' to='/my-plants'>Skip to demo site</Link>
            </div>
        </div>
    )
}