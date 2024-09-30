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
    userStep, userCh, compStep, countU = 10, countC = 10, level = 1, blocked = false, attack = null;


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
            if (level == 1) 
                winner();
            else if (level == 2)
                winner2();
            else if (level == 3)
                winner3();
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
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU--;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'wf':
                case 'gf':
                    result.innerText = 'Враг нанес вам двойной урон!!';
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU -= 2;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'fw':
                case 'ff':
                    result.innerText = 'Враг нанес только половину урона!';
                    sound.setAttribute('src', 'audio/loss.mp3');
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

    function winner2() {
        // fire compStep => grass (f => gr)
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
                case 'agr':
                case 'fgr':
                    result.innerText = 'Вы нанесли двойной урон!!!';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC -= 2;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'fw':
                case 'wgr':
                case 'ggr':
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
                    result.innerText = 'Враг нанес вам урон';
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU--;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'wf':
                case 'gf':
                case 'grg':
                case 'grw':
                    result.innerText = 'Враг нанес вам двойной урон!!';
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU -= 2;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'grf':
                case 'gra':
                    result.innerText = 'Враг нанес только половину урона!';
                    sound.setAttribute('src', 'audio/loss.mp3');
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

    function winner3() {
        // gr compStep => ice (gr => i)
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
                case 'fg':
                case 'fa':
                case 'ai':
                case 'gi':
                    result.innerText = 'Вы нанесли урон!';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC--;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'fi':
                    result.innerText = 'Вы нанесли двойной урон!!!';
                    sound.setAttribute('src', 'audio/win.mp3');
                    sound.play();
                    countC -= 2;
                    countComp.innerText = countC;
                    compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'fw':
                case 'wi':
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
                    result.innerText = 'Враг нанес вам урон';
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU--;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'wg':
                case 'wf':
                case 'gf':
                case 'ig':
                case 'ia':
                    result.innerText = 'Враг нанес вам двойной урон!!';
                    sound.setAttribute('src', 'audio/loss.mp3');
                    sound.play();
                    countU -= 2;
                    countUser.innerText = countU;
                    userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
                    break;
                case 'ww':
                case 'if':
                case 'iw':
                    result.innerText = 'Враг нанес только половину урона!';
                    sound.setAttribute('src', 'audio/loss.mp3');
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
        console.log('countU =', countU);
        console.log('countC =', countC);
        // Проверяем, кто выиграл
        if (countU <= 0) {
            modalContents.forEach(modalContent => {
                modalContent.classList.add('bg-loss');
            });
            modalMessage.innerText = 'К сожалению, вы проиграли эту войну';
            // Показываем модальное окно
            modal.style.display = 'flex';

            // Кнопка для перезапуска игры
            restartButton.addEventListener('click', function() {
                // Скрываем модальное окно и перезапускаем игру
                modal.style.display = 'none';
                window.location.reload(); // Перезапускаем игру
            });
            
        } else if (countC <= 0) {
            if (level == 1) {
                level++;
                playGame()
            }
            else if (level == 2) {
                level++;
                playGame()
            }
            else if (level == 3) {
                modalContents.forEach(modalContent => {
                    modalContent.classList.add('bg-win');
                });
                modalMessage.innerText = 'Вы выйграли эту войну, поздравляю!';
                modal.style.display = 'flex';
            
                // Кнопка для перезапуска игры
                restartButton.addEventListener('click', function() {
                    modal.style.display = 'none';
                    window.location.reload();
                });
            }
        }
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
        // Чтобы не было бага с неизменяемой картинкой в модуле
        document.querySelectorAll('.modal-content').forEach(modalContent => {
            modalContent.classList.remove('bg-loss');
        });
        document.querySelectorAll('.modal-content').forEach(modalContent => {
            modalContent.classList.remove('bg-win');
        });

        if (level == 1) {
            countU = countC = 10;
            result.innerText = 'Сделайте выбор';
            countUser.innerText = '10';
            countComp.innerText = '10';
            field.forEach(item => item.classList.remove('active','error'));
        }
        else if (level == 2) {
            countU = countC = 10;                                                                                                             ;
            result.innerText = 'Сделайте выбор';
            countUser.innerText = '15';
            countComp.innerText = '15';
            field.forEach(item => item.classList.remove('active','error'));
            // Заменяем старого босса на нового
            const fireButton = document.querySelector('.comp-field .fire');
            if (fireButton) {
                fireButton.classList.replace('fire', 'grass');
                fireButton.setAttribute('data-field', 'gr');
            }
            document.querySelector('.enemy').setAttribute('src', 'img/enemy2.svg');
            document.querySelector('.comp-text p').innerText = 'Колючий кэткус';
            document.querySelector('body').style.background = '#394D3E';
        }
        else if (level == 3) {
            countU = countC = 20;
            result.innerText = 'Сделайте выбор';
            countUser.innerText = '20';
            countComp.innerText = '20';
            field.forEach(item => item.classList.remove('active','error'));
            // Заменяем старого босса на нового
            const fireButton = document.querySelector('.comp-field .grass');
            if (fireButton) {
                fireButton.classList.replace('grass', 'ice');
                fireButton.setAttribute('data-field', 'i');
            }
            document.querySelector('body').style.background = '#2B5B70';
            let rand = Math.floor(Math.random()*3);
            console.log("rand =",rand);
            if (rand == 0) {
                document.querySelector('.enemy').setAttribute('src', 'img/enemy3-1.svg');
                document.querySelector('.comp-text p').innerText = 'Ледяной госьт';
            } else if (rand == 1){
                document.querySelector('.enemy').setAttribute('src', 'img/enemy3-2.svg');
                document.querySelector('.comp-text p').innerText = 'Холодные кости';
            } else if (rand == 2){
                document.querySelector('.enemy').setAttribute('src', 'img/enemy3-3.svg');
                document.querySelector('.comp-text p').innerText = 'Морозная кривая';
            }

        }


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