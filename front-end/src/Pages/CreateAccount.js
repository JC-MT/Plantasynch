import { Link } from "react-router-dom";

export default function CreateAccount(){
    return(
        <div className='flex flex-col'>
            <h1 className="text-[40px] text-left p-2 tablet:text-[75px]">
                Create your account
            </h1>
            <p className="indent-2 p-1 text-left"><strong>Note:</strong> This email does not need to be real. The intend for this page is clear app flow and ux/ui.</p>
                <div className='flex flex-col place-items-center'>
                    <div className='flex flex-col input-container'>
                        <label className='input-label' htmlFor='email'>Email</label>
                        <input required name='email' className='input-style' type='text' placeholder="Email"/>
                    </div>
                    <div className='flex flex-col input-container'>
                        <label className='input-label' htmlFor='password'>Password</label>
                        <input required name='password' className='input-style' type='text' placeholder="Atleast one character required"/>
                    </div>
                </div>
            <div className='p-2 flex flex-col place-items-center gap-1 drop-shadow-sm'>
                <Link className='button-style mt-1 w-fit text-lg text-center tablet:w-32' to='/my-plants'>Sign in</Link>
                <Link className='hover:underline' to='/my-plants'>Skip to demo site</Link>
            </div>
        </div>
    )
}