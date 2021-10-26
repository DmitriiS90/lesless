class Validator {
    static validateRules = {
        'login': [this.validateEmpty, this.validateLogin],
        'password': [this.validateEmpty, this.validatePassword],
        'agreement': [this.validateEmpty],
    };
    static errors = [];

    static validate(input) {
        const inputName = input.name;
        const inputValue = input.value;

        this.validateRules[inputName].forEach((rule) => {
            const error = rule(inputValue);

            if (error.length) {
                this.addError(inputName, error);
                this.setError();
            }

            if (!error.length) {
                this.clearValidation(inputName);
            }

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

        targetInput.classList.toggle('error');
        errorTextElement.insertAdjacentText('beforeEnd', error);
    }

    static validatePassword(value) {
        const pswLength = /[\w]{6,12}$/;
        return value.match(pswLength) === null ? 'Пароль слишком короткий' : '';
    }
    static validateLogin(value) {
        const login = /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+)+$/i;
        return value.match(login) === null ? 'Email должен содержать @' : '';
    }
    static validateEmpty(value) {
        return !value.length ? 'Поле не должно быть пустым' : '';
    }

    static clearValidation(name) {
        const targetElement = document.querySelector(`input[name='${name}']`);
        const errorTextElement = document.querySelector(`span[data-field="${name}"]`);
        errorTextElement.remove();
        targetElement.insertAdjacentHTML('afterEnd', `<span class='error-message' data-field='${name}'></span>`);
        targetElement.classList.toggle('error', false);
        this.errors = [];
    }
    static finishValidation() {

        if (!this.errors.length) {
            return true
        }

        return false;
    }
};

export default Validator;