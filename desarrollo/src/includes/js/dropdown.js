// Menu languages
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

// Menu locations
const choosedOption = document.querySelector('.change-value')
const Value = document.querySelector('.chang-value')
const optionContain = document.querySelector('.options-loc')
const option = document.querySelectorAll('.option-loc')
const selectIcon = document.querySelector('.icon.icon-CorcheteDown')  
const changeToggle = () => {
    if (optionContain.dataset.toggle == 'close') {
        optionContain.dataset.toggle = '';
        selectIcon.classList.replace('icon-CorcheteDown', 'icon-CorcheteUp');
    } else {
        optionContain.dataset.toggle = 'close';
        selectIcon.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    }
}
choosedOption.addEventListener('click', changeToggle);
option.forEach((option) => {
    option.addEventListener('click', (e) => {
        changeToggle()
        selectIcon.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    })
})   
