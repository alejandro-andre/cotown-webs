// Menu languages
const selectedOption = document.querySelector('.lang-current')
const selectValue = document.querySelector('.lang-value')
const optionContainer = document.querySelector('.lang-list')
const optionList = document.querySelectorAll('.lang-item')
const selectElement = document.querySelector('.icon-corchete-down')   

const selectToggle = () => {
    if (optionContainer.dataset.toggle == 'collapsed') {
        optionContainer.dataset.toggle = '';
        selectElement.classList.replace('icon-corchete-down', 'icon-corchete-up');
    } else {
        optionContainer.dataset.toggle = 'collapsed';
        selectElement.classList.replace('icon-corchete-up', 'icon-corchete-down');
    }
}

selectedOption.addEventListener('click', selectToggle);
optionList.forEach((option) => {
    option.addEventListener('click', (e) => {
        selectValue.innerText = option.innerText;
        selectToggle()
        selectElement.classList.replace('icon-corchete-up', 'icon-corchete-down');
    })
})

// Menu languages Mobile
const selectedOptionMobile = document.querySelector('.lang-current-mobile')
const selectValueMobile = document.querySelector('.lang-value-mobile')
const optionContainerMobile = document.querySelector('.lang-list-mobile')
const optionListMobile = document.querySelectorAll('.lang-item-mobile')
const selectElementMobile = document.querySelector('.icon-corchete-down.mobile')   

const selectToggleMobile = () => {
    if (optionContainerMobile.dataset.toggle == 'collaps') {
        optionContainerMobile.dataset.toggle = '';
        selectElementMobile.classList.replace('icon-corchete-down', 'icon-corchete-up');
    } else {
        optionContainerMobile.dataset.toggle = 'collaps';
        selectElementMobile.classList.replace('icon-corchete-up', 'icon-corchete-down');
    }
}

selectedOptionMobile.addEventListener('click', selectToggleMobile);
optionListMobile.forEach((option) => {
    option.addEventListener('click', (e) => {
        selectValueMobile.innerText = option.innerText;
        selectToggleMobile()
        selectElementMobile.classList.replace('icon-corchete-up', 'icon-corchete-down');
    })
})

// Menu mobile
function showMobileMenu() { 
    document.getElementById('menu-panel').style.position = 'absolute';
    document.getElementById('menu-mobile-head').style.position = 'fixed';
}
function hideMobileMenu() {
    document.getElementById('menu-panel').style.position = 'static';
    document.getElementById('menu-mobile-head').style.position = 'static';
}