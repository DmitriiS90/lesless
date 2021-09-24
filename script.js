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

    }

    submitSingUpForm() {
        const formData = new FormData(document.forms[0]);
        const values = Object.fromEntries(formData.entries());

        localStorage.setItem('auth', JSON.stringify(values))
        
        console.log(JSON.parse);

    }
}
const singUpForm = new SingUpForm();



