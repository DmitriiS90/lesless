import Validator from './utils/Validator.js';
import Slider from './utils/Slider.js';

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

    class SignUpForm {
        static inputLogin = document.querySelector("input[name='login']")
        static inputPassword = document.querySelector("input[name='password']")
        static cancelButton = document.getElementById('cancelButton');
        static submitButton = document.getElementById('submit');

        static inputs = document.querySelectorAll('input[name]');

        static init() {
            this.cancelButton.addEventListener('click', () => handleModalShow(true))
            this.submitButton.addEventListener('click', SignUpForm.submit);
            this.setInputListeners();
        }

        static setInputListeners() {
            this.inputs.forEach((input) => {
                input.addEventListener('blur', (event) => Validator.validate(event.target));
            });
        }

        static submit() {
            const formData = new FormData(document.forms.singUp);
            const formValues = Object.fromEntries(formData.entries());

            localStorage.setItem('auth', JSON.stringify(formValues));
            window.location.replace('http://127.0.0.1:5500/');
        }
    };
    

    initialButtons();

    checkCurrentUser()

    SignUpForm.init();

    const slider = new Slider();

    slider.init();
}