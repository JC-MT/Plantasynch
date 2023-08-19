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
  },
  delete: {
    success: `+ has been successfully deleted today 👋`,
    error: `We were unable to delete + 🥲 Please check your internet and try again in a few minutes.`
  },
  scanner: {
    add: {
      success: `We just added + to your garden. Happy Growing 🪴`,
      error: `We were unable to add + to your garden 🥲 Please check your internet and try again in a few minutes.`
    },
    success: `Scanning was successful. Results are in! 🥳`,
    error: `We were unable to scan your image 🥲 Please check your internet and try again in a few minutes.`,
    responseError: `Error code: + Error Message: _`
  }
};

module.exports = toastMessages;
