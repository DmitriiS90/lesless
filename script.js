//console.log(document.forms)
window.onload = function(){
    getHeaderButton()
    getCancelbtn()
}
 

function getHeaderButton(){
    const header__button = document.querySelector('.header__button')

    header__button.addEventListener('click', () => {
        document.getElementById('auth').style.display = 'block'
    })
}

function getCancelbtn(){
    const cancelbtn = document.querySelector('.login-form__cancel')

    cancelbtn.addEventListener('click', () => {
        document.getElementById('auth').style.display = 'none'
    })
}



