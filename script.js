window.onload = function () {
    const handleModalShow = (isVisible = false) => {
        const modal = document.getElementById('modal');

        modal.classList.toggle('hide', isVisible);
    }

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

    class SingUpForm {
        constructor(login, password) {
            this.login = login
            this.password = password
        }

        initial() {
            const cancelButton = document.getElementById('cancelButton')
            cancelButton.addEventListener('click', () => handleModalShow(true))

            const submitButton = document.getElementById('submit')
            submitButton.addEventListener('click', this.submit);

            this.checkCurrentUser()
        }

        checkCurrentUser() {
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

        submit() {
            const formData = new FormData(document.forms.auth);
            const formValues = Object.fromEntries(formData.entries());
            const isValidate = Validator.validate(formValues);

            if (isValidate) {
                SingUpForm.successSubmit(formValues);
                return;
            };

            return;
        }
    }
    class Validator {
        static validate(formValues) {
            const errors = Validator.getErrors(formValues);
            //console.log(errors)

            if (!!errors.length) {
                Validator.setError(errors);
                return;
            }

            return true;
        }

        static getErrors(formValues) {
            const data = Object.entries(formValues);
            const validateData = data.reduce((result, [key, value]) => {

                if (Validator.validateEmpty(value)) {
                    return [...result, [[key], ['Поле не должно быть пустым']]]
                }

                if (key === 'password' && Validator.validatePassword(value)) {
                    return [...result, [[key], ['Пароль должен...']]]
                }

                if (key === 'login' && Validator.validatePassword(value)) {
                    return [...result, [[key], ['login должен...']]]
                }

                return result;
            }, [])
            console.log(validateData)
            return validateData;
        }

        static validatePassword() {
            const targetElement = document.querySelector(`input[name=password]`);
            const pswLength = /[\w]{6,12}$/;

            if (!targetElement.value.match(pswLength)) {
                targetElement.insertAdjacentText('afterend', 'Пароль слишком короткий');
            }
            
        }
        static validateLogin() {
            const targetElement = document.querySelector(`input[name=login]`);
            const email = /^[a-zA-Z0-9_-]{3,16}$/;
            
            if (!targetElement.value.match(email)) {
                targetElement.insertAdjacentText('afterend', 'Неправельный логин');
            }

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

    initialButtons();

    const singUpForm = new SingUpForm();

    singUpForm.initial();
}