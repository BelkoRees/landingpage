//Включаем строгий режим
'use strict';

function copySize() {
    const div1 = document.getElementsByClassName('game')[0]; // Исходный элемент
    const div2 = document.getElementsByClassName('typewriter')[0]; // Целевой элемент
    
    // Получаем высоту и ширину div1
    const width = div1.offsetWidth;
    const height = div1.offsetHeight;

    // Получаем позицию (отступы) div1
    const top = div1.offsetTop;
    const left = div1.offsetLeft;
    
    // Присваиваем размеры div2
    div2.style.width = width + 'px';
    div2.style.height = height + 'px';
    
    // Присваиваем позицию div2
    div2.style.position = 'absolute'; // Убедитесь, что position установлен в absolute или relative
    div2.style.top = top + 'px';
    if (window.innerWidth <= 800) {
        // Для мобильных устройств
        div2.style.left = left + 'px';
    } else {
        // Для компьютерных экранов
        div2.style.left = left - 1 + 'px';
    }
}

function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    const cursor = document.createElement('span');
    cursor.classList.add('blinking-cursor');
    element.appendChild(cursor); // Добавляем курсор

    function type() {
        if (i < text.length) {
            element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(type, speed); // Задержка между символами
        } else {
            cursor.remove(); // Удаляем курсор после завершения печати
            if (callback) callback(); // Вызываем callback после завершения
        }
    }
    type();
}

// Функция для скрытия блока .typewriter и кнопки
function hideTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    const hideButton = document.getElementById('hide-button');
    const playButton = document.querySelector('.play');
    
    // Скрываем блок и кнопку
    typewriter.style.display = 'none';
    hideButton.style.display = 'none';
    
    // Показываем кнопку play
    playButton.style.display = 'block'; 
}

let rulesShown = false; // Изначально правила не показаны
function showRulesOnce() {
    if (!rulesShown) { // Если правила ещё не были показаны
        // Открываем блок с правилами
        document.getElementById('rules').style.display = 'block';
        document.getElementById('rules-icon').classList.add('red');
        
        rulesShown = true; // Устанавливаем флаг в true, чтобы код не выполнялся снова
    }
}


// Запускаем печать текста при загрузке страницы
window.onload = function() {
    copySize();
    const text = "Привет! Теперь ты маг стихий, поздравляю. Но вот незадача... Ты случайно оказываешься заперт в мистическом лабиринте древнего храма, где тебя ждут пять опасных противников. Кто-то привел тебя сюда, чтобы спасти мир от надвигающейся катастрофы, заполучив пять недостающих стихийных камней. Ты должен победить этих врагов, используя свою уникальную способность управлять четырьмя стихиями: огонь, вода, земля и воздух.";
    
    // Выводим текст с анимацией
    typeWriter(text, 'typing-text', 10, function() {
        // Показываем кнопку после завершения печати
        document.getElementById('hide-button').style.display = 'block';
    });

    // Добавляем событие для скрытия блока и кнопки по нажатию
    document.getElementById('hide-button').addEventListener('click', function() {
        hideTypewriter();
        showRulesOnce()
    });
};


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
    userStep, userCh, compStep, countU = 10, countC = 10, level = 1, blocked = false, attackMode = null, lvlFinished = false;

    // Зададим тексту одну высоту текста, чтобы ничего не скакало
    if(window.innerWidth <= 800)
        document.querySelector('.result').style.height = "50px";

    function copySize() {
        const div1 = document.getElementsByClassName('game')[0]; // Исходный элемент
        const div2 = document.getElementsByClassName('typewriter')[0]; // Целевой элемент
        
        // Получаем высоту и ширину div1
        const width = div1.offsetWidth;
        const height = div1.offsetHeight;
    
        // Получаем позицию (отступы) div1
        const top = div1.offsetTop;
        const left = div1.offsetLeft;
        
        // Присваиваем размеры div2
        div2.style.width = width + 'px';
        div2.style.height = height + 'px';
        
        // Присваиваем позицию div2
        div2.style.position = 'absolute'; // Убедитесь, что position установлен в absolute или relative
        div2.style.top = top + 'px';
        if (window.innerWidth <= 800) {
            // Для мобильных устройств
            div2.style.left = left + 'px';
        } else {
            // Для компьютерных экранов
            div2.style.left = left - 1 + 'px';
        }
    }
    
    function typeWriter(text, elementId, speed, callback) {
        let i = 0;
        const element = document.getElementById(elementId);
        const cursor = document.createElement('span');
        cursor.classList.add('blinking-cursor');
        element.appendChild(cursor); // Добавляем курсор
    
        function type() {
            if (i < text.length) {
                element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
                i++;
                setTimeout(type, speed); // Задержка между символами
            } else {
                cursor.remove(); // Удаляем курсор после завершения печати
                if (callback) callback(); // Вызываем callback после завершения
            }
        }
        type();
    }
    
    // Функция для скрытия блока .typewriter и кнопки
    function hideTypewriter() {
        const typewriter = document.querySelector('.typewriter');
        const hideButton = document.getElementById('hide-button');
        const playButton = document.querySelector('.play');
        
        // Скрываем блок и кнопку
        typewriter.style.display = 'none';
        hideButton.style.display = 'none';
        
        // Показываем кнопку play
        playButton.style.display = 'block'; 
    }

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
            // Раунд 2 (w => s, f => gr)
            'agr': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'fgr': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'wgr': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'ggr': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'ws': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'as': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'gs': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            'fs': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 3 (s => gh, gr => i)
            'fi': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'ai': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'gi': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'wi': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            'agh': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'fgh': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'wgh': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            'ggh': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 4 (gh => a, g => e, i => e)
            'ge': { message: 'Вы нанесли двойной урон!!!', damage: 2, sound: 'audio/win.mp3' },
            'we': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'fe': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'ae': { message: 'Вы нанесли половину урона', damage: 0.5, sound: 'audio/win.mp3' },
            // Раунд 5 (a(1) => f, e(1) => g, e(2) => fa)
            'wfa': { message: 'Вы нанесли урон!', damage: 1, sound: 'audio/win.mp3' },
            'gfa': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' },
            'ffa': { message: 'Ваш огненный удар был поглащен!', damage: -2, sound: 'audio/loss.mp3' },
            'afa': { message: 'Враг устоял! 0 урона', damage: 0, sound: 'audio/draw.mp3' }
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
            // Раунд 2 (w => s, f => gr)
            'grg': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'grw': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'grf': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'gra': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'sa': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'sf': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'sw': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'sg': { message: 'Вы устояли! Враг не нанес вам урона!', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 3 (s => gh, gr => i)
            'ig': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ia': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'if': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'iw': { message: 'Враг нанес только половину урона', damage: 0.5, sound: 'audio/loss.mp3' },
            'ghw': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ghg': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ghf': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'gha': { message: 'Вы устояли! Враг не нанес вам урона!', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 4 (gh => a, g => e, i => e)
            'ew': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ea': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'ef': { message: 'Враг нанес вам урон', damage: 1, sound: 'audio/loss.mp3' },
            'eg': { message: 'Вы устояли! Враг не нанес вам урона!', damage: 0, sound: 'audio/draw.mp3' },
            // Раунд 5 (a(1) => f, e(1) => g, e(2) => fa)
            'faw': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'fag': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'faa': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' },
            'faf': { message: 'Враг нанес вам двойной урон!', damage: 2, sound: 'audio/loss.mp3' }
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
    
        // Функция для перезапуска игры
        const restartGame = () => {
            modal.style.display = 'none';
            window.location.reload();
        };
    
        // Функция для обработки проигрыша
        const showLoss = () => {
            modalContents.forEach(modalContent => modalContent.classList.add('bg-loss'));
            modalMessage.style.color = '#000000';
            modalMessage.innerText = 'К сожалению, вы проиграли эту войну';
            modal.style.display = 'flex';
            restartButton.addEventListener('click', restartGame);
            const sound = 'audio/looser.mp3';
            playSound(sound);
        };
    
        // Функция для показа модального окна в случае победы
        const showWin = (text) => {
            modalContents.forEach(modalContent => modalContent.classList.add('bg-win'));
            modalMessage.style.color = '#000000';
            modalMessage.innerText = 'Вы выбрались из лабиринта живым, поздравляю!';
            modal.style.display = 'flex';
            restartButton.addEventListener('click', restartGame);
            const sound = 'audio/winner.mp3';
            playSound(sound);
        };
    
        // Функция для отображения текста с анимацией
        const displayTextWithAnimation = (text, backgroundColor, callback) => {
            document.getElementById('typing-text').textContent = '';
            document.getElementsByClassName('typewriter')[0].style.display = 'block';
            document.getElementsByClassName('typewriter')[0].style.background = backgroundColor;
            document.getElementsByClassName('play')[0].style.display = 'none';
            copySize();
            typeWriter(text, 'typing-text', 10, () => {
                callback();
            });
        };

        // Получаем элементы кнопок
        const hideButton = document.getElementById('hide-button');
        const continueButton = document.getElementById('continue-button');

        // Проверка на победу или поражение
        if (countU <= 0) {
            showLoss();
        } else if (countC <= 0) {
            // Обработка уровней
            switch (level) {
                case 1:
                    level++;
                    
                    // Запускаем первую анимацию
                    displayTextWithAnimation(
                        "Противник, которого ты сейчас одолел — таинственная черная материя. Она владела темной магией копирования способностей противников и охраняла камень тьмы у входа в лабиринт. Теперь он твой и ты, внезапно для себя, получаешь способность копировать здоровье противников в начале битвы, поздравляю!",
                        '#393B48',
                        () => {
                            // После завершения первой анимации создаем новую кнопку для перехода ко второй анимации
                            continueButton.innerHTML = 'Супер!';
                            continueButton.style.display = 'block';
                
                            // Добавляем обработчик для новой кнопки
                            continueButton.addEventListener('click', function() {
                                // Скрываем кнопку после клика
                                continueButton.style.display = "none";
                
                                // Запускаем вторую анимацию
                                displayTextWithAnimation(
                                    "Ты идешь прямо, и немного подсмотрев из-за угла, видишь своего следующего противника...",
                                    '#394D3E',
                                    () => {
                                        // Показываем исходную кнопку после второй анимации
                                        hideButton.innerHTML = "Подойти ближе";
                                        hideButton.style.display = "block";
                
                                        // Добавляем обработчик для hide-button
                                        document.getElementById('hide-button').addEventListener('click', hideTypewriter);
                                        lvlFinished = true
                                        playGame();
                                    }
                                );
                            });
                        }
                    );
                
                    break;
                
                           
    
                case 2:
                    level++;

                    hideButton.style.display = "none";
                    displayTextWithAnimation(
                        "Второй побежденный тобой противник был ожившим кактусом в форме котенка. Он защищал пустынный оазис от непрошенных гостей. Кажется, он атаковал тебя с помощью своей стихии растений и вызывал песчаные бури. Помимо своей колючести, Кэткус также хитёр и любил периодически прятаться за защитными барьерами из земли. За его горшком ты находишь камень жизни.",
                        '#394D3E',
                        () => {
                            continueButton.innerHTML = 'Идти дальше';
                            continueButton.style.display = 'block';
                            continueButton.addEventListener('click', function() {
                                continueButton.style.display = "none";                            
                                displayTextWithAnimation(
                                    "После знойного оазиса ты проходишь в комнату дальше по лабиринту. Это большое пространство с кучей полок и миллионами различных книг и свитков. Только почему-то здесь подозрительно холодно...",
                                    '#2B5B70',
                                    () => {
                                        hideButton.innerHTML = "Обернуться";
                                        hideButton.style.display = "block";
                                        document.getElementById('hide-button').addEventListener('click', hideTypewriter);
                                        lvlFinished = true
                                        playGame();
                                    }
                                );
                            });
                        }
                    );
                
                    break;
    
                case 3:
                    level++;
                    hideButton.style.display = "none";
                    displayTextWithAnimation(
                        "Из упавшей с полки книги, ты узнаешь, что твоим третьим врагом был Совиный Призрак, древнее существо, которое давно умерло, но его дух охраняет библиотеку утерянных знаний. Совиный Призрак использует ледяные ветра и призрачные силы, чтобы защитить камень смерти и замораживать всех противников. Порыскавши по полкам, за одной из книг ты находишь камень смерти.",
                        '#2B5B70',
                        () => {
                            continueButton.innerHTML = 'Взять камень';
                            continueButton.style.display = 'block';
                            continueButton.addEventListener('click', function() {
                                continueButton.style.display = "none";   
                                displayTextWithAnimation(
                                    "Из книги ты уже узнал, кто будет твоим следующим противником, поэтому воду при защите и атаке наверное лучше не использовать...",
                                    '#6F702B',
                                    () => {
                                        hideButton.innerHTML = "В бой!";
                                        hideButton.style.display = "block";
                                        document.getElementById('hide-button').addEventListener('click', hideTypewriter);
                                        lvlFinished = true;
                                        playGame();
                                    }
                                );
                            });
                        }
                    );
                
                    break;
    
                case 4:
                    level++;
                    hideButton.style.display = "none";
                    displayTextWithAnimation(
                        "Тебе с трудом, но удается победить! Ты получаешь камень энергии. Это сильно заряжает тебя на последний бой, удачи!",
                        '#6F702B',
                        () => {
                            continueButton.innerHTML = 'Спасибо';
                            continueButton.style.display = 'block';
                            continueButton.addEventListener('click', function() {
                                continueButton.style.display = "none";                               
                                displayTextWithAnimation(
                                    "Последний и самый опасный противник. Это обычная зайка, которая каким-то образом получила силу фей и стала охранять стихийный камень света. Она использует магию фей и не настроена враждебно, но ради защиты камня, пойдет на всё! Ой, кажется она что-то сделала с твоей силой...",
                                    '#634B3B',
                                    () => {
                                        hideButton.innerHTML = "Страшно, но я справлюсь!";
                                        hideButton.style.display = "block";
                                        document.getElementById('hide-button').addEventListener('click', hideTypewriter);
                                        lvlFinished = true;
                                        playGame();
                                    }
                                );
                            });
                        }
                    );
                
                    break;
    
                case 5:
                    level++;
                    hideButton.style.display = "none";
                    displayTextWithAnimation(
                        "Это невероятно, но тебе удалось одолеть всех пятерых противников и все нужные камни у тебя! Что будешь делать дальше?",
                        '#634B3B',
                        () => {
                            continueButton.innerHTML = 'Не знаю...';
                            continueButton.style.display = 'block';
                            continueButton.addEventListener('click', function() {
                                continueButton.style.display = "none";    
                                displayTextWithAnimation(
                                    "Я тебе подскажу: напиши автору этой игры, что тебе больше всего понравилось и что стоит изменить. Я уверен, он это оценит!",
                                    '#634B3B',
                                    () => {
                                        document.getElementById('hide-button').addEventListener('click', hideTypewriter);
                                        showWin();
                                    }
                                );
                            });
                        }
                    );

                    break;

                default:
                    break;
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
        3: { count: 20, enemyClass: 'enemy3', enemyText: 'Ледокрылый буб', background: '#2B5B70' },
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
        
        if (lvlFinished == true) {
            // Обновление врага
            if (enemyClass == "enemy2") {
                const fireButton = document.querySelector('.comp-field .fire');
                const waterButton = document.querySelector('.comp-field .water');
                fireButton.classList.replace('fire', 'grass');
                fireButton.setAttribute('data-field', 'gr');
                waterButton.classList.replace('water', 'sand');
                waterButton.setAttribute('data-field', 's');
                document.querySelector('.sprite-img.enemy').classList.replace('enemy', enemyClass);
                document.querySelector('.comp-text p').innerText = enemyText;
                document.querySelector('body').style.background = background;
            }
            else if (enemyClass == "enemy3") {
                const grassButton = document.querySelector('.comp-field .grass');
                const sandButton = document.querySelector('.comp-field .sand');
                grassButton.classList.replace('grass', 'ice');
                grassButton.setAttribute('data-field', 'i');
                sandButton.classList.replace('sand', 'ghost');
                sandButton.setAttribute('data-field', 'gh');
                document.querySelector('.sprite-img.enemy2').classList.replace('enemy2', enemyClass);
                document.querySelector('.comp-text p').innerText = enemyText;
                document.querySelector('body').style.background = background;
            }
            else if (enemyClass == "enemy4") {
                const iceButton = document.querySelector('.comp-field .ice');
                const groundButton = document.querySelector('.comp-field .ground');
                const ghostButton = document.querySelector('.comp-field .ghost');
                iceButton.classList.replace('ice', 'electro1');
                iceButton.setAttribute('data-field', 'e');
                ghostButton.classList.replace('ghost', 'air1');
                ghostButton.setAttribute('data-field', 'a');
                groundButton.classList.replace('ground', 'electro2');
                groundButton.setAttribute('data-field', 'e');
                document.querySelector('.sprite-img.enemy3').classList.replace('enemy3', enemyClass);
                document.querySelector('.comp-text p').innerText = enemyText;
                document.querySelector('body').style.background = background;
            }
            else if (enemyClass == "enemy5") {
                const electro1Button = document.querySelector('.comp-field .electro1');
                const electro2Button = document.querySelector('.comp-field .electro2');
                const air1Button = document.querySelector('.comp-field .air1');
                electro2Button.classList.replace('electro2', 'fairy');
                electro2Button.setAttribute('data-field', 'fa');
                electro1Button.classList.replace('electro1', 'ground');
                electro1Button.setAttribute('data-field', 'g');
                air1Button.classList.replace('air1', 'fire');
                air1Button.setAttribute('data-field', 'f');
                document.querySelector('.sprite-img.enemy4').classList.replace('enemy4', enemyClass);
                document.querySelector('.comp-text p').innerText = enemyText;
                document.querySelector('body').style.background = background;
            }
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

        lvlFinished = false;

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
            icon.classList.remove('red'); 
        } else {
            rules.style.display = 'block';
            icon.classList.add('red'); 
        }
    });

    play.addEventListener('click', playGame);
    userChoice.addEventListener('click', userAttDef);
    userField.addEventListener('click', choiceUser);
    
});