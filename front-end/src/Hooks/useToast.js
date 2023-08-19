import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastMessages from '../Models/ToastMessages';

export default function useToast(location) {
  function getFormattedToastMessage(result, message, name, response) {
    if (response && name) return message[result][response].replace('+', name);

    if (response)
      return message[result]
        .replace('+', response.statusCode)
        .replace('_', response.message);

    return message[result].replace('+', name);
  }

  function sendToast(result, name, response) {
    const formattedMessage = getFormattedToastMessage(
      result,
      toastMessages[location],
      name,
      response
    );

    return toast[result](formattedMessage, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  }
  return [sendToast];
}
