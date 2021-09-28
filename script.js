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

        const startButton = document.getElementById('startButton')
        startButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })

        const selectFreeButton = document.getElementById('selectFreeButton')
        selectFreeButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })
        const selectStandardButton = document.getElementById('selectStandardButton')
        selectStandardButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })
        const selectPremiumButton = document.getElementById('selectPremiumButton')
        selectPremiumButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })

        const subscribeButton = document.getElementById('subscribeButton')
        subscribeButton.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'block'
        })

        const submitButton = document.getElementById('submit')
        submitButton.addEventListener('click', this.submitSingUpForm);

        const user = JSON.parse(localStorage.getItem('auth'))

        if (user) {
            singUpButton.disabled = true
            singUpButton.style.borderColor = "#A9A9A9"
            singUpButton.style.color = "#A9A9A9"
            singUpButton.style.cursor = "default"

            // const userLogin = document.createElement('p')
            // userLogin.innerHTML = user.login
            // document.querySelector(".header__login").append(userLogin)
        }

    }

    static successSubmit(formValues) {
        localStorage.setItem('auth', JSON.stringify(formValues))
        window.location.replace('http://127.0.0.1:5500/');
    }

    submitSingUpForm() {
        const formData = new FormData(document.forms.auth);
        const formValues = Object.fromEntries(formData.entries());
        const isValidate = ValidateSingUpForm.validate(formValues);

        if (isValidate) {
            SingUpForm.successSubmit(formValues);
            return;
        };

        return;
    }
}
class ValidateSingUpForm {
    static validate(formValues) {
        const errors = ValidateSingUpForm.getErrors(formValues);

        if (!!errors.length) {
            ValidateSingUpForm.setError(errors);
            return;
        }

        return true;
    }

    static getErrors(formValues) {
        const data = Object.entries(formValues);
        const validateData = data.reduce((result, [key, value]) => {

            if (ValidateSingUpForm.validateEmpty(value)) {
                return [...result, [[key], ['Поле не должно быть пустым']]]
            }

            return result;
        }, [])
        return validateData;
    }

    static setError(errors) {
        const [[field, errorMessage]] = errors;

        const errorTextElement = `<span>${errorMessage}</span>`;
        const targetElement = document.querySelector(`input[name=${field}]`);
        targetElement.style.border = '#FF0000 1px solid'
        targetElement.insertAdjacentHTML('afterend', errorTextElement);

    }

    static validateEmpty(value) {
        return !value.length;
    }

}

const singUpForm = new SingUpForm();