import { Link } from "react-router-dom";

export default function CreateAccount(){
    return(
        <div>
            <h1 className="text-[50px] text-center mt-[50px]">
                Create account with email
            </h1>
            <h3>Note: This email doesn't need to be real. The intend for this page is clear app flow.</h3>
            <input type='text' placeholder="Email"/>
            <input type='text' placeholder="Password"/>
            <button>Sign in</button>
            <Link to='/'>Skip to demo site</Link>
        </div>
    )
}