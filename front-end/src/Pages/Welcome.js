import { Link } from 'react-router-dom';

export default function Welcome(){
    return(
        <div>
            <h1 className="text-[50px] text-center mt-[50px]">
                Welcome to Plantasynch
            </h1>
            <h3>Some future bio</h3>
            <Link to='/sign-in'>Sign in with email</Link>
            <Link to='/my-plants'>Skip to demo site</Link>
        </div>
    )
}