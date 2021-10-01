window.onload = function () {
    const handleModalShow = (isVisible = false) => {
        const modal = document.getElementById('modal');

        modal.classList.toggle('hide', isVisible);
    };

    const initialButtons = () => {
        const buttonIdList = [
            'singUpButton',
            'startButton',
            'selectFreeButton',
            'selectStandardButton',
            'selectPremiumButton',
            'subscribeButton',
        ];

        buttonIdList.forEach((buttonId) => {
            const button = document.getElementById(buttonId);

            if (button) {
                button.addEventListener('click', () => handleModalShow());
            }
        })
    };
    
    const checkCurrentUser = () => {
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
    };

    class SingUpForm {
        static inputLogin = document.querySelector("input[name='login']")
        static inputPassword = document.querySelector("input[name='password']")
        static cancelButton = document.getElementById('cancelButton');
        static submitButton = document.getElementById('submit');

        static init() {
            this.cancelButton.addEventListener('click', () => handleModalShow(true))
            this.submitButton.addEventListener('click', SingUpForm.submit);

            this.inputLogin.addEventListener('blur', this.handleField);
            this.inputPassword.addEventListener('blur', this.handleField);
        }

        static successSubmit(formValues) {
            localStorage.setItem('auth', JSON.stringify(formValues))
            window.location.replace('http://127.0.0.1:5500/');
        }

        static handleField(event) {
            if (Validator.isValid(event.target.name, event.target.value)) {
                Validator.clearValidation(event)
            }
        }

        static submit() {
            const formData = new FormData(document.forms.auth);
            const formValues = Object.fromEntries(formData.entries());
            const isValidate = Validator.validate(formValues);

            if (isValidate) {
                SingUpForm.successSubmit(formValues);
                return;
            };

            return;
        }
    };
    class Validator {
        static errors = [];

        static validate(formValues) {
            this.errors = this.getErrors(formValues);

            if (!!this.errors.length) {
                this.setError(this.errors);
                return;
            }

            return true;
        }

        static isValid(name, value) {
            if (Validator.validateEmpty(value)) {
                return false
            }

            if (name === 'password' && Validator.validatePassword(value)) {
                return false
            }

            if (name === 'login' && Validator.validateLogin(value)) {
                return false
            }

            return true;
        }

        static getErrors(formValues) {
            const data = Object.entries(formValues);
            const validateData = data.reduce((result, [key, value]) => {

                if (Validator.validateEmpty(value)) {
                    return [...result, [key, 'Поле не должно быть пустым']]
                }

                if (key === 'password' && Validator.validatePassword(value)) {
                    return [...result, [key, 'Пароль слишком короткий']]
                }

                if (key === 'login' && Validator.validateLogin(value)) {
                    return [...result, [key, 'логин должен содержать @']]
                }
                
                return result;

            }, [])

            return validateData;
        }

        static validatePassword(value) {
            const pswLength = /[\w]{6,12}$/;

            if (value.match(pswLength) === null) {
                return true;
            }

            return false;

        }
        static validateLogin(value) {
            const login = /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+)+$/i;

            if (value.match(login) === null) {
                return true;
            }

            return false;

        }

        static setError(errors) {
            if (!errors.length) {
                return;
            }

            const [[field, errorMessage]] = errors;
            const targetField = document.querySelector(`input[name=${field}]`);
            const errorTextElement = document.querySelector(`span[data-field="${field}"]`);

            if (field && errorTextElement.innerHTML) {
                return;
            }

            if (field) {
                targetField.classList.toggle('error', true);
                errorTextElement.insertAdjacentText('beforeEnd', errorMessage);
                targetField.dataset.error = 'true';
            }
        }

        static clearValidation(event) {
            const targetField = document.querySelector(`input[name='${event.target.name}']`);
            targetField.classList.toggle('error', false);
            document.querySelector(`span[data-field='${event.target.name}']`).remove();
            delete event.target.dataset.error
        }

        static validateEmpty(value) {
            return !value.length;
        }
    };

    initialButtons();

    checkCurrentUser()

    SingUpForm.init();
}