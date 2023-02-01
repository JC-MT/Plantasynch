const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data');

const PROJECT = 'all'; // try 'weurope' or 'canada'
const API_URL = 'https://my-api.plantnet.org/v2/identify/' + PROJECT + '?api-key=';
const API_PRIVATE_KEY = '2b10Vurt29y4PRUP1tdLtru1Ju'; // secret
// const API_SIMSEARCH_OPTION = '&include-related-images=true'; // optional: get most similar images
// const API_LANG = '&lang=fr'; // default: en

// const IMAGE_1 = '../data/image_1.jpeg';
// const IMAGE_2 = '../data/image_2.jpeg';


const analyzeFile = async ({queryImage}) => {
        let form = new FormData();
        const IMAGE_1 = queryImage;
    
        // form.append('images', queryImage);
        form.append('images', IMAGE_1);
        form.getLengthSync = null;
        // console.log(form)
        try {
            const { status, data } = await axios.post(
                // list of probable species
                API_URL + API_PRIVATE_KEY,
                // list of probable species + most similar images
                // API_URL + API_PRIVATE_KEY + API_SIMSEARCH_OPTION,
                // list of probable species + french common names
                // API_URL + API_PRIVATE_KEY + API_LANG,
                form, {
                    headers: form.getHeaders()
                }
            );
    
            console.log('status', status); // should be: 200
            console.log('data', require('util').inspect(data, false, null, true));
        } catch (error) {
            console.error('This one passes', error);
        }
}

module.exports = { analyzeFile };