class formDatasValidation {
  
  validateEmail(mailAddress) {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mailAddress))   return (true)
   else return (false)
  }

  emailFieldControl(emailField, notificationAlert) {
    var Estok = 1
    var errorMessage =  document.getElementById(notificationAlert)
  
    if(emailField.value.length < 2){ 
      errorMessage.innerHTML = "Veuillez saisir une adresse e-mail valide"
      errorMessage.classList.add('displayError')
      Estok = 0
    }
    else if (this.validateEmail(emailField.value) === false) {
      errorMessage.innerHTML = "Adresse e-mail invalide"
      errorMessage.classList.add('displayError')
      Estok = 0
    } else {
      errorMessage.innerHTML = ""
      errorMessage.classList.remove('displayError')
    }
    return Estok
  }

  charactersValue(value) {
    return /^[a-z]+$/i.test(value)
  }

  txtFieldControl(emailField, suffixenotificationAlert, lib) {

    var errorMessage =  document.getElementById('error-' + suffixenotificationAlert) 
    var Estok = 1

    if(emailField.value.length < 2){ 
      errorMessage.innerHTML = "Veuillez saisir au minimum 2 caractères  " + lib + "."
      errorMessage.classList.add('displayError')
      Estok = 0
    }
    if(Estok==1) {
      var retTestAlpha = this.charactersValue(emailField.value)
      if(retTestAlpha === false) {
        errorMessage.innerHTML = "Le " + lib + " ne doit contenir que des caractères alphabétiques"//lib.substr(0,1).toUpperCase()+lib.substr(1)
        errorMessage.classList.add('displayError')
        Estok = 0
      }
    }
    if(Estok==1) {
      errorMessage.innerHTML = ""
      errorMessage.classList.remove('displayError')
    }
    return Estok   
  }

  addEventListenerFormFields() {
    let firstName = document.getElementById('firstName')
    firstName.addEventListener('blur', (event) => {
      this.txtFieldControl(firstName, 'firstName', 'prénom')
    })

    let lastName = document.getElementById('lastName')
    lastName.addEventListener('blur', (event) => {
      this.txtFieldControl(lastName, 'lastName', 'nom')
    })

    let email = document.getElementById('mail')
    email.addEventListener('blur', (event) => {
      this.emailFieldControl(email, 'error-mail')
    })
  }

  checkFormDatas(){
    var formValidation = 1
  
    const lastName = document.getElementById('lastName')
    var returnFieldControl = this.txtFieldControl(lastName, 'lastName', 'nom')
    if(returnFieldControl == 0) formValidation = 0

    const firstName = document.getElementById('firstName')
    var returnFieldControl = this.txtFieldControl(firstName, 'firstName', 'prénom')
    if(returnFieldControl == 0) formValidation = 0
  
    const email = document.getElementById('mail')
    var returnFieldControl = this.emailFieldControl(email, 'error-mail')
    if(returnFieldControl == 0) formValidation = 0

    if (formValidation == '0') {
      return false
    }
    else {
     return true
    }
  }

}