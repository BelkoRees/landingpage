/* console.log('Немного хи-хи в консоль');
console.info('Тоже хи-хи');
console.error('Ошибочное хи-хи');
console.warn('Предупреждающее хи-хи');

if (confirm("Хочешь много хи-хи?")) {
    if (confirm("Хочешь хи-хи ещё?")) {
        alert("Ещё?");
        alert("Ещё?");
        alert("Больше хи-хи?");
        alert("Ещё?");
        alert("Ещё больше хи-хи?!");
        alert("Ладно, ты заслужил много хи-хи!");
        var num = 1000;
        while (num > 0) {
            document.writeln("--ХИ-ХИ-ХИ-ХИ-ХИ");
            num--;
        }
    }
    else {
        alert("Ну ты и кринжулькин :(");
    }
} else {
    alert("На нет и суда нет!");
} */

var text = document.getElementById('textik');
text.innerHTML = "Опять хи-хи???";

document.getElementById('main-form').addEventListener('submit', checkForm);

function checkForm(event) {
    event.preventDefault();
    var el = document.getElementById('main-form');

    var name = el.name.value;
    var pass = el.pass.value;
    var repass = el.repass.value;
    var state = el.state.value;

    var error = '';
    if(name == '' || pass == '' || state == '')
        error = "Заполните все поля!";
    else if(name.length <= 1 || name.length > 20)
        error = "Введите норм имя";
    else if(pass != repass)
        error = "Пароли должна совпадать!";
    else if(pass.split("@").length > 1)
        error = "Мы не любим собак!";
    else if(pass.split("3").length > 1)
        error = "Мы не любим цифру 3!";
    else if(pass.split("8").length > 1)
        error = "Мы не любим цифру 8!";
    else if(pass.split("p").length > 1)
        error = "Мы не любим букву p!";

    if (error != "") {
        document.getElementById('error').innerHTML = error;

    } else {
        alert("Все данные корректно заполнены!");
        window.location = 'https://obzorposudy.ru/polezno/cto-znacit-fraza-menya-zaskamili';
    }
}
