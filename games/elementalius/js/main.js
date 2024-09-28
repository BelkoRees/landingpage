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
    userStep, userCh, compStep, countU = 10, countC = 10, blocked = false, attack = null;


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

             // Блокируем все радиокнопки
             choice.forEach(radio => {
                radio.disabled = true;
            });
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
        if (attack == true) {
            comb = userStep + compStep;
            switch(comb) {
                case 'ga':
                    result.innerText = 'Враг устоял! 0 урона';
                    sound.setAttribute('src', 'audio/draw.mp3');
                    sound.play();
                    break;
                case 'gw':
                case 'gg':
                case 'wa':
                case 'aw':
                case 'ag':
                case 'aa':
                case 'af':
                case 'fg':
                case 'fa':
                    result.innerText = 'Вы нанесли урон!';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC--;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'wf':
                case 'gf':
                    result.innerText = 'Вы нанесли двойной урон!!!';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC -= 2;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'fw':
                case 'ff':
                    result.innerText = 'Вы нанесли лишь половину урона';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC -= 0.5;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
            }
        }
        else if (attack == false) {
            comb = compStep + userStep;
            switch(comb) {
                case 'ga':
                    result.innerText = 'Вы устояли! Враг не нанес вам урона!';
                    sound.setAttribute('src', 'audio/draw.mp3');
                    sound.play();
                    break;
                case 'gw':
                case 'gg':
                case 'wa':
                case 'aw':
                case 'ag':
                case 'aa':
                case 'af':
                case 'fg':
                case 'fa':
                    result.innerText = 'Враг нанес вам урон';
                    sound.setAttribute('src', 'audio/loss-test.mp3');
                    sound.play();
                    countU--;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'wf':
                case 'gf':
                    result.innerText = 'Враг нанес вам двойной урон!!';
                    sound.setAttribute('src', 'audio/loss-test.mp3');
                    sound.play();
                    countU -= 2;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'fw':
                case 'ff':
                    result.innerText = 'Враг нанес только половину урона!';
                    sound.setAttribute('src', 'audio/loss-test.mp3');
                    sound.play();
                    countU -= 0.5;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
        }
        }

        if (countU <= 0 || countC <= 0)
            winnerWindow()

        // Автоматически переключаем радиокнопки
        toggleRadio();
    }


    function winnerWindow() {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        const restartButton = document.getElementById('restart-button');
        const modalContents = document.querySelectorAll('.modal-content');

        // Проверяем, кто выиграл
        if (countU <= 0) {
            modalMessage.innerText = 'К сожалению, вы проиграли эту войну';
            modalContents.forEach(modalContent => {
                modalContent.classList.add('bg-loss');
            });
        } else if (countC <= 0) {
            modalMessage.innerText = 'Вы одолели этого врага, поздравляю!';
            modalContents.forEach(modalContent => {
                modalContent.classList.add('bg-win');
            });
        }
        
        // Показываем модальное окно
        modal.style.display = 'flex';
    
        // Кнопка для перезапуска игры
        restartButton.addEventListener('click', function() {
            // Скрываем модальное окно и перезапускаем игру
            modal.style.display = 'none';
            playGame(); // Перезапускаем игру
        });
    }
    

    function toggleRadio() {
        // Переключаем значения атаки/защиты автоматически
        attack = !attack;
    
        // Элементы для радиокнопок и их метки
        const attackLabel = document.querySelector('label[for="att"]');
        const defenseLabel = document.querySelector('label[for="def"]');
        
        document.querySelector('#att').style.display = 'none'; // Скрыть радиокнопку атаки
        document.querySelector('#def').style.display = 'none'; // Скрыть радиокнопку защиты

        document.getElementById('whatdoyouwant').style.display = 'none';

        if (attack) {
            document.querySelector('#att').checked = true; // Устанавливаем атаку
            attackLabel.style.color = 'white';
            attackLabel.style.display = 'inline';
            attackLabel.innerText = 'Теперь атакуем!';
            defenseLabel.style.display = 'none';
        } else {
            document.querySelector('#def').checked = true; // Устанавливаем защиту
            defenseLabel.style.color = 'white';
            defenseLabel.style.display = 'inline';
            defenseLabel.innerText = 'Теперь защищаемся!';
            attackLabel.style.display = 'none';
        }
    }
    

    function playGame() {
        // Возвращаем всё на свои места
        document.getElementById('whatdoyouwant').style.display = 'block';
        document.querySelector('label[for="att"]').style.display = 'inline';
        document.querySelector('label[for="def"]').style.display = 'inline';
        document.querySelector('label[for="att"]').innerText = 'Атакуем!';
        document.querySelector('label[for="def"]').innerText = 'Защищаемся!';
        document.querySelector('label[for="att"]').style.color = 'white';
        document.querySelector('label[for="def"]').style.color = 'white';

        countU = countC = 10;
        result.innerText = 'Сделайте выбор';
        countUser.innerText = '10';
        countComp.innerText = '10';
        field.forEach(item => item.classList.remove('active','error'));

        // Разблокируем радиокнопки при старте новой игры
        choice.forEach(radio => {
            radio.disabled = false;
            radio.checked = false;
        });

        // Сбрасываем значение атаки
        attack = null;
    }

    play.addEventListener('click', playGame);
    userChoice.addEventListener('click', userAttDef);
    userField.addEventListener('click', choiceUser);
    


});