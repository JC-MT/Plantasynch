import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useToast(location) {
  const toastMessages = {
    logIn: {
      success: `You are logged in, +. Happy Growing 🪴`,
      error: `We were unable to log you in 🥲 Please check your internet or change your credentials to match our database.`
    },
    signUp: {
      success: `Great job creating your account, +. Happy Growing 🪴`,
      error: `We were unable to create your acount 🥲 Please check your internet and try again in a few minutes.`
    },
    welcome: {
      success: `You have been sucessfully logged out.🪴`,
      error: `We were unable to log you out 🥲 Please check your internet and try again in a few minutes.`
    },
    explore: {
      success: `We just added + to your garden. Happy Growing 🪴`,
      error: `We were unable to add + to your garden 🥲 Please check your internet and try again in a few minutes.`
    },
    edit: {
      success: `Your plant was succesfully updated. Happy Growing 🪴`,
      error: `We were unable to edit your plant 🥲 Please check your internet and try again in a few minutes.`
    },
    new: {
      success: `Your plant was succesfully added. Happy Growing 🪴`,
      error: `We were unable to add your new plant 🥲 Please check your internet and try again in a few minutes.`
    },
    waterButton: {
      success: `Great job watering your +. We'll send an email to remind you when it's time to water your plant again. 🪴`,
      error: `We were unable to water + 🥲 Please check your internet and try again in a few minutes.`
    },
    skip: {
      success: `+ has been successfully skipped today 🪴`,
      error: `We were unable to skip + today 🥲 Please check your internet and try again in a few minutes.`
    }
  };

  function getFormattedToastMessage(result, message, name, response) {
    return result
      ? message.success.replace('+', name)
      : message.error.replace('+', name);
  }

  function sendToast(result, name, response) {
    const formattedMessage = getFormattedToastMessage(
      result,
      toastMessages[location],
      name,
      response
    );

    return result
      ? toast.success(formattedMessage, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined
        })
      : toast.error(formattedMessage, {
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
