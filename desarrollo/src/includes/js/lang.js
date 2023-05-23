/** Toggle function languages */
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
/** When click on locotion-option */
selectedOption.addEventListener('click', selectToggle);
/** This function update select value */
const updateSelectValue = (option) => {
    selectValue.innerText = option.innerText;
}
optionList.forEach((option) => {
    option.addEventListener('click', (e) => {
    updateSelectValue(option)
    selectToggle()
    selectElement.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    })
})

/** Toggle function locations */
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
/** When click on selected-option */
choosedOption.addEventListener('click', changeToggle);
option.forEach((option) => {
    option.addEventListener('click', (e) => {
    changeToggle()
    selectIcon.classList.replace('icon-CorcheteUp', 'icon-CorcheteDown');
    })
})   

/** Toggle function menu mobile */
(function (window, document) {
var menu = document.getElementById('blackMenu'),
    rollback,
    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

function toggleHorizontal() {
    menu.classList.remove('closing');
    [].forEach.call(
        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
        function(el){
            el.classList.toggle('pure-menu-horizontal');
        }
    );
};

function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains('open')) {
        menu.classList.add('closing');
        rollBack = setTimeout(toggleHorizontal, 500);
    }
    else {
        if (menu.classList.contains('closing')) {
            clearTimeout(rollBack);
        } else {
            toggleHorizontal();
        }
    }
    menu.classList.toggle('open');
    document.getElementById('menuToggle').classList.toggle('x');
};

function closeMenu() {
    if (menu.classList.contains('open')) {
        toggleMenu();
    }
}

document.getElementById('toggle').addEventListener('click', function (e) {
    toggleMenu();
    e.preventDefault();
});

window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);