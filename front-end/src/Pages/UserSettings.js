import Footer from "./Footer"
import { useState } from "react"
import axios from "axios"

const API = process.env.REACT_APP_API_URL

export default function UserSettings(){
const [ file, setFile] = useState({})
console.log(file)

const handleUpload = (e) => {
    let reader = new FileReader() 
    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {      
        setFile({        
         queryImage: reader.result      
        })  
    }
}
const handleSubmit = (event) => {
    event.preventDefault();  
    axios.post(`${API}/scan`, file)
    .then((res) => {
        console.log(res.data.payload)
    })
    .catch((err) => {
        console.warn(err)
    })


}
    return(
        <div className='pt-20'>
            <h1>Hey there, currently working on this page. More features to come</h1>
            {/* <form onSubmit={handleSubmit}>
                <input accept="image/*" onChange={handleUpload} capture type='file'></input>
                <input value='Send Files' type='submit'></input>
                <img src={file.queryImage}></img>
            </form> */}
            <Footer/>
        </div>
    )
}