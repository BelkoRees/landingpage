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
    userStep, userCh, compStep, countU = 10, countC = 10, level = 1, blocked = false, attackMode = null;


    function userAttDef(event) {
        let target = event.target;

        // Если выбрали одну из радио кнопок
        if (target.classList.contains('choice')) {
            userCh = target.value;  // Сохраняем значение выбранной радиокнопки
    
            // Определяем, атака это или защита
            if (userCh === 'att') {
                attackMode = true;
            } else if (userCh === 'def') {
                attackMode = false;
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
        if (target.classList.contains('field') && attackMode !== null) {
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
            else if (level == 4)
                winner4();
            else if (level == 5)
                winner5();
        }, 1000)
    }

    // Основные игровые состояния
    const outcomes = {
        attack: {
            // Раунд 1
            'wg': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'wf': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'gf': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'gw': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'gg': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'wa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'aw': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'ag': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'aa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'af': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'fg': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'fa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'ff': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'fw': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'ww': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'ga': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 2
            'agr': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'fgr': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'wgr': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'ggr': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            // Раунд 3
            'fi': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'ai': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'gi': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'wi': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            // Раунд 4
            'ge': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'we': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'fe': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'ae': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            // Раунд 5
            'gfa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'wfa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'ffa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'afa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' }
        },
        defense: {
            // Раунд 1
            'wg': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'wf': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'gf': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'gw': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'gg': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'wa': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'aw': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'ag': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'aa': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'af': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'fg': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'fa': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'ww': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'fw': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'ff': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'ga': { message: 'Вы устояли! Враг не нанес вам урона!', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 2
            'grg': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'grw': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'grf': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'gra': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            // Раунд 3
            'ig': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ia': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'if': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'iw': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            // Раунд 4
            'ew': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ea': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ef': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'eg': { message: 'Враг устояли. Вы не нанесли ему урона!', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 5
            'faw': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'fag': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'faa': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'faf': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' }
        }
    };

    // Универсальная функция для обработки победы
    function processWinner(attackMode) {
        blocked = false;

        // Определяем комбинацию шагов
        const comb = attackMode ? userStep + compStep : compStep + userStep;

        // Выбираем подходящую конфигурацию (атака или защита)
        const mode = attackMode ? outcomes.attack : outcomes.defense;

        if (mode[comb]) {
            const { message, damage, sound } = mode[comb];
            result.innerText = message;
            playSound(sound);

            if (attackMode) {
                // Атака - урон противнику
                countC -= damage;
                countComp.innerText = countC;
                compField.querySelector('[data-field=' + compStep + ']').classList.add('error');
            } else {
                // Защита - урон игроку
                countU -= damage;
                countUser.innerText = countU;
                userField.querySelector('[data-field=' + userStep + ']').classList.add('error');
            }
        }

        // Автоматическое переключение радиокнопок
        toggleRadio();

        // Проверка конца раунда
        if (countU <= 0 || countC <= 0) {
            winnerWindow();
        }
    }

    // Воспроизведение звука
    function playSound(src) {
        sound.setAttribute('src', src);
        sound.play();
    }

    // Вызов функции в зависимости от режима атаки или защиты
    function winner() {
        processWinner(attackMode);
    }

    function winner2() {
        processWinner(attackMode);
    }

    function winner3() {
        processWinner(attackMode);
    }

    function winner4() {
        processWinner(attackMode);
    }

    function winner5() {
        processWinner(attackMode);
    }

    function winnerWindow() {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        const restartButton = document.getElementById('restart-button');
        const modalContents = document.querySelectorAll('.modal-content');
        // Проверяем, кто выиграл
        if (countU <= 0) {
            modalContents.forEach(modalContent => {
                modalContent.classList.add('bg-loss');
            });
            modalMessage.style.backgroundColor = '#000000';
            modalMessage.style.color = '#FFFFFF';
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
                level++;
                playGame()
            }
            else if (level == 4) {
                level++;
                playGame()
            }
            else if (level == 5) {
                modalContents.forEach(modalContent => {
                    modalContent.classList.add('bg-win');
                });
                modalMessage.style.backgroundColor = '#FFFFFF';
                modalMessage.style.color = '#000000';
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
        attackMode = !attackMode;
    
        // Элементы для радиокнопок и их метки
        const attackLabel = document.querySelector('label[for="att"]');
        const defenseLabel = document.querySelector('label[for="def"]');
        
        document.querySelector('#att').style.display = 'none'; // Скрыть радиокнопку атаки
        document.querySelector('#def').style.display = 'none'; // Скрыть радиокнопку защиты

        document.getElementById('whatdoyouwant').style.display = 'none';

        if (attackMode) {
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
    
    const LEVELS = {
        1: { count: 10, enemyClass: '', enemyText: '', background: '#394D3E' },
        2: { count: 15, enemyClass: 'enemy2', enemyText: 'Колючий кэткус', background: '#394D3E' },
        3: { count: 20, enemyClass: 'enemy3', enemyText: 'Ледокрылый страж', background: '#2B5B70' },
        4: { count: 25, enemyClass: 'enemy4', enemyText: 'Электро бишок', background: '#6F702B' },
        5: { count: 30, enemyClass: 'enemy5', enemyText: 'Фейная зая', background: '#634B3B' }
    };

    function updateUIForLevel(level) {
        const { count, enemyClass, enemyText, background } = LEVELS[level];
        
        countU = countC = count;
        result.innerText = 'Сделайте выбор';
        countUser.innerText = count;
        countComp.innerText = count;
        field.forEach(item => item.classList.remove('active', 'error'));
    
        // Обновление врага
        if (enemyClass == "enemy2") {
            const fireButton = document.querySelector('.comp-field .fire');
            fireButton.classList.replace('fire', 'grass');
            fireButton.setAttribute('data-field', 'gr');
            document.querySelector('.sprite-img.enemy').classList.replace('enemy', enemyClass);
            document.querySelector('.comp-text p').innerText = enemyText;
            document.querySelector('body').style.background = background;
        }
        else if (enemyClass == "enemy3") {
            const grassButton = document.querySelector('.comp-field .grass');
            grassButton.classList.replace('grass', 'ice');
            grassButton.setAttribute('data-field', 'i');
            document.querySelector('.sprite-img.enemy2').classList.replace('enemy2', enemyClass);
            document.querySelector('.comp-text p').innerText = enemyText;
            document.querySelector('body').style.background = background;
        }
        else if (enemyClass == "enemy4") {
            const grassButton = document.querySelector('.comp-field .ice');
            grassButton.classList.replace('ice', 'electro');
            grassButton.setAttribute('data-field', 'e');
            document.querySelector('.sprite-img.enemy3').classList.replace('enemy3', enemyClass);
            document.querySelector('.comp-text p').innerText = enemyText;
            document.querySelector('body').style.background = background;
        }
        else if (enemyClass == "enemy5") {
            const grassButton = document.querySelector('.comp-field .electro');
            grassButton.classList.replace('electro', 'fairy');
            grassButton.setAttribute('data-field', 'fa');
            document.querySelector('.sprite-img.enemy4').classList.replace('enemy4', enemyClass);
            document.querySelector('.comp-text p').innerText = enemyText;
            document.querySelector('body').style.background = background;
        }
    }
    
    function playGame() {
        // Сброс состояния радиокнопок
        const radioButtons = document.getElementsByName('action');
        radioButtons.forEach(radio => radio.checked = false);
        // Возвращаем всё на свои места
        document.getElementById('whatdoyouwant').style.display = 'block';
        document.querySelector('label[for="att"]').style.display = 'inline';
        document.querySelector('label[for="def"]').style.display = 'inline';
        document.querySelector('label[for="att"]').innerText = 'Атакуем!';
        document.querySelector('label[for="def"]').innerText = 'Защищаемся!';
        document.querySelector('label[for="att"]').style.color = 'white';
        document.querySelector('label[for="def"]').style.color = 'white';
        // Чтобы не было бага с неизменяемой картинкой в модуле
        const modalContents = document.querySelectorAll('.modal-content');
        modalContents.forEach(modalContent => {
            modalContent.classList.remove('bg-loss', 'bg-win');
        });
    
        // Обновляем UI в зависимости от уровня
        if (LEVELS[level]) {
            updateUIForLevel(level);
        }
    
        // Разблокируем радиокнопки при старте новой игры
        choice.forEach(radio => {
            radio.disabled = false;
            radio.checked = false;
        });
    
        // Сбрасываем значение атаки
        attackMode = null;
    }
    


    // Для работы иконки правил
    document.getElementById('rules-icon').addEventListener('click', function () {
        const rules = document.getElementById('rules');
        const icon = document.getElementById('rules-icon');
    
        // Переключение видимости картинки правил
        if (rules.style.display == 'block') {
            rules.style.display = 'none'; 
            icon.classList.remove('red'); // Добавляем фильтр для красного цвета
        } else {
            rules.style.display = 'block';
            icon.classList.add('red'); // Убираем фильтр красного цвета
        }
    });
    

    play.addEventListener('click', playGame);
    userChoice.addEventListener('click', userAttDef);
    userField.addEventListener('click', choiceUser);
    

});