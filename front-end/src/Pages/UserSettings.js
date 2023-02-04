import Footer from "./Footer"
import { useState } from "react"
import axios from "axios"

const API = process.env.REACT_APP_API_URL

// const PROJECT = 'all'; // try 'weurope' or 'canada'
const API_URL = 'https://my-api.plantnet.org/v2/identify/all';
const API_PRIVATE_KEY = '2b10MdHFkLAxmbQvRgEAzSi3e';

export default function UserSettings(){
const [ file, setFile] = useState({})
console.log(file)

const handleUpload = (e) => {
    let reader = new FileReader() 
    reader.readAsDataURL(e.target.files[0])
    const fileInput = document.getElementById('picture');
    const images = fileInput.files;
    console.log(images)
    reader.onload = () => {      
        setFile({ queryImage: reader.result      
        })  
    }
}

const identify = async () => {
    // 1. Get the file from an input type=file : 
    const fileInput = document.getElementById('picture');
    const images = fileInput.files;
    if (images.length === 0) {
        console.error('choose a file');
        return false;
    }

    // 2. Build POST form data
    const form = new FormData();
    for (let i = 0; i < images.length; i += 1) {
        console.log(images[i])
        form.append('images', images[i]);
    }

    // 3. Add GET URL parameters
    const url = new URL(API_URL);
    // url.searchParams.append('include-related-images', 'true'); // try false
    url.searchParams.append('api-key', API_PRIVATE_KEY);

    // 4. Send request
    fetch(url.toString(), {
        method: 'POST',
        body: form,
    })
    .then((response) => {
        console.log(response)
        if (response.ok) {
            response.json()
            .then((r) => {
                console.log(r)
                // document.getElementById('results').innerHTML = JSON.stringify(r);
            })
            .catch(console.error);
        } else {
            const resp = `status: ${response.status} (${response.statusText})`;
            // document.getElementById('results').innerHTML = resp;
            console.log(resp)
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

const handleSubmit = (event) => {
    event.preventDefault();  
    // axios.post(`${API}/scan`, file)
    // .then((res) => {
    //     console.log(res.data.payload)
    // })
    // .catch((err) => {
    //     console.warn(err)
    // })
    identify()

}
    return(
        <div className='pt-20'>
            <h1>Hey there, currently working on this page. More features to come</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={handleUpload} id='picture' accept="image/*" type='file' capture change="getFile($event)" ></input>
                <input value='Send Files' type='submit'></input>
                <img className='w-36 h-36' src={file.queryImage}></img>
            </form>
            <Footer/>
        </div>
    )
}