const doesUserExist = (users, logInInfo) => {
    console.log(users, logInInfo)
    for(let user of users){
        if(user.name === logInInfo.name && user.password === logInInfo.password){
            return user
        }
    }

    return []
}
  module.exports = {
    doesUserExist
  };