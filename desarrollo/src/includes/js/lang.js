const selectedOption = document.querySelector('.selected-option')
const selectValue = document.querySelector('.select-value')
const optionContainer = document.querySelector('.options')
const optionList = document.querySelectorAll('.option')
const selectElement = document.querySelector('.icon-CorcheteDown')   

const selectToggle = () => {
    if (optionContainer.dataset.toggle == 'collapsed') {
        optionContainer.dataset.toggle = '';
        selectElement.classList.replace('icon-CorcheteDown', 'icon-CorcheteUp');
    } else {
        optionContainer.dataset.toggle = 'collapsed';
        selectElement.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    }
}

selectedOption.addEventListener('click', selectToggle);
optionList.forEach((option) => {
    option.addEventListener('click', (e) => {
        selectValue.innerText = option.innerText;
        selectToggle()
        selectElement.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    })
})