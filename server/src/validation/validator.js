//======================================= Name Regex Validation ========================================//


const validateName = (name) => {
  return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name))
}



//====================================== Email Regex Validation =======================================//


const validateEmail = (emailId) => {
  return (/^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/.test(emailId))
}


//===================================== Password Regex Validation ====================================//


const validatePassword = (password) => {
  return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password));
}


const validatePrice = (price) => {
  return ((/^\d{0,8}(\.\d{1,9})?$/).test(price));
};



module.exports = { validateName, validateEmail, validatePassword, validatePrice }