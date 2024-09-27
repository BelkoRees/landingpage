window.addEventListener('load',function () {


let countUser = document.querySelector('.count-user'),
    countComp = document.querySelector('.count-comp'),
    userField = document.querySelector('.user-field'),
    userChoice = document.querySelector('.user-choice'),
    compField = document.querySelector('.comp-field'),
    sound = document.querySelector('.sound'),
    play = document.querySelector('.play'),
    field = document.querySelectorAll('.field'),
    choice = document.querySelectorAll('.choice'),
    result = document.querySelector('.result'),
    userStep, userCh, compStep, countU = 0, countC = 0, blocked = false, attack = null;


    function userAttDef(event) {
        let target = event.target;

        // Если выбрали одну из радио кнопок
        if (target.classList.contains('choice')) {
            userCh = target.value;  // Сохраняем значение выбранной радиокнопки
    
            // Определяем, атака это или защита
            if (userCh === 'att') {
                attack = true;
            } else if (userCh === 'def') {
                attack = false;
            }
        }
    }

    function choiceUser(e) {
        // Не можем выбирать, пока комп не завершил ход или пока не выбрано защита или нападение
        if (blocked) return;
        let target = e.target;
        // Если кликнул по кнопке
        if (target.classList.contains('field') && attack !== null) {
            userStep = target.dataset.field;
            field.forEach(item => item.classList.remove('active', 'error'));
            target.classList.add('active');
            choiceComp();
        }

    }

    function choiceComp() {
        blocked = true;
        let rand = Math.floor(Math.random()*4);
        compField.classList.add('blink');
        let compFields = compField.querySelectorAll('.field');

        setTimeout(() => {
            compField.classList.remove('blink');
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        }, 1000)
    }

    function winner() {
        blocked = false;
        let comb;
        if (attack)
            comb = userStep + compStep;
        else if (attack == false)
            comb = compStep + userStep;
        
        switch(comb) {
            case 'ww':
            case 'wa':
            case 'gg':
            case 'ga':
            case 'gw':
            case 'aa':
            case 'aw':
            case 'ag':
            case 'af':
            case 'ff':
            case 'fa':
            case 'fg':
                result.innerText = 'Ничья!';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;
            case 'wf':
            case 'wg':
            case 'gf':
                result.innerText = 'Победа ваша!';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                break;
            case 'fw':
                result.innerText = 'Победа компа!';
                sound.setAttribute('src', 'audio/loss-test.mp3');
                sound.play();
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                break;
        }
    }

    function playGame() {
        countU = countC = 0;
        result.innerText = 'Сделайте выбор';
        countUser.innerText = '0';
        countComp.innerText = '0';
        field.forEach(item => item.classList.remove('active','error'));
    }

    play.addEventListener('click', playGame);
    userChoice.addEventListener('click', userAttDef);
    userField.addEventListener('click', choiceUser);
    


});