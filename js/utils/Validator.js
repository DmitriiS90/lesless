class Validator {
    formValue;
    static validateRules = {
        'login': [this.validateEmpty, this.validateLogin],
        'password': [this.validateEmpty, this.validatePassword],
    };
    static errors = [];

    static validate(input) {
        const inputName = input.name;
        const inputValue = input.value;
        this.formValue = input.value;

        this.validateRules[inputName].forEach((rule) => {
            const error = rule(inputValue, inputName);

            if (!error) {
                return;
            }
            
            this.addError(inputName, error);
            this.setError();
        });
    }

    static addError(field, error) {
        this.errors = [{ field, error }];
    }

    static setError() {
        const [{ field, error }] = this.errors;
        const targetInput = document.querySelector(`input[name='${field}']`);
        targetInput.classList.toggle('error', true);
        targetInput.dataset.error = 'true';
        const errorTextElement = document.querySelector(`span[data-field="${field}"]`);

        if (field && errorTextElement.innerHTML) {
            return;
        }

        errorTextElement.insertAdjacentText('beforeEnd', error);
    }

    static validatePassword(value, name) {
        const pswLength = /[\w]{6,12}$/;
        return value.match(pswLength) === null ? 'Пароль слишком короткий' : Validator.clearValidation(name);
    }
    static validateLogin(value, name) {
        const login = /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+)+$/i;
        return value.match(login) === null ? 'Email должен содержать @/.com' : Validator.clearValidation(name);
    }
    static validateEmpty(value, name) {
        return !value.length ? 'Поле не должно быть пустым' : Validator.clearValidation(name);
    }

    static clearValidation(name) {
        const targetElement = document.querySelector(`input[name='${name}']`);
        const errorTextElement = document.querySelector(`span[data-field="${name}"]`);
        errorTextElement.remove();
        targetElement.dataset.error = 'false';
        targetElement.insertAdjacentHTML('afterEnd', `<span class='error-message' data-field='${name}'></span>`);
        targetElement.classList.toggle('error', false);
        this.errors = [];
    }
    static finishValidation() {

        if (!this.errors.length && this.formValue) {
            return true
        }

        return false;
    }

    static resetValidator() {
        this.errors = [];
        const errorElements = document.querySelectorAll('.error-message')
        errorElements.forEach((element) => {
            element.remove();
        });
        const inputs = document.querySelectorAll('input[data-error]')
        inputs.forEach((input) => {
            input.classList.toggle('error', false);
            input.value = '';
            input.insertAdjacentHTML('afterEnd', `<span class='error-message' data-field='${input.name}'></span>`);
        });
    }
};

export default Validator;