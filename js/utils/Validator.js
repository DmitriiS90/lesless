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
        });
    }

    static addError(field, error) {
        this.errors = [...this.errors, {field, error}];
    }

    static setError() {
        const [{field, error}] = this.errors;
        const targetInput = document.querySelector(`input[name='${field}']`);

        targetInput.classList.toggle('error', true);
        targetInput.insertAdjacentHTML('afterEnd', `<span class='error-message'>${error}</span>`);
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
        return value.match(pswLength) === null ? 'Пароль слишком короткий' : '';
    }
    static validateLogin(value) {
        const login = /^[a-z0-9.]+@[a-z0-9]+(\.[a-z]+)+$/i;
        return value.match(login) === null ? 'Email должен содержать @' : '';
    }

    /*static setError(errors) {
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
    }*/

    static clearValidation(event) {
        const targetField = document.querySelector(`input[name='${event.target.name}']`);
        targetField.classList.toggle('error', false);
        document.querySelector(`span[data-field='${event.target.name}']`).remove();
        delete event.target.dataset.error
    }

    static validateEmpty(value) {
        return !value.length ? 'Поле не должно быть пустым' : '';
    }
};

export default Validator;