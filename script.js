window.onload = function () {
    singUpForm.getSingUpForm()
}

class SingUpForm {
    constructor(login, password) {
        this.login = login
        this.password = password
    }

    getSingUpForm() {
        const singUpButton = document.getElementById('singUpButton')
        singUpButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })

        const cancelButton = document.getElementById('cancelButton')
        cancelButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none'
        })

        const submitButton = document.getElementById('submit')
        submitButton.addEventListener('click', this.submitSingUpForm);

        const user = JSON.parse(localStorage.getItem('auth'))

        if (user.login) {
            singUpButton.disabled = true
            singUpButton.style.borderColor = "#A9A9A9"
            singUpButton.style.color = "#A9A9A9"
            singUpButton.style.cursor = "default"

            // const userLogin = document.createElement('p')
            // userLogin.innerHTML = user.login
            // document.querySelector(".header__login").append(userLogin)
        }

    }

    submitSingUpForm() {
        const formData = new FormData(document.forms[0]);
        const values = Object.fromEntries(formData.entries());

        localStorage.setItem('auth', JSON.stringify(values))
        
        window.location.replace('http://127.0.0.1:5500/');
    }
}
const singUpForm = new SingUpForm();