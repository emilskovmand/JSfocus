const menu = document.getElementsByClassName('menuContainer')[0];
const menuButton = document.getElementsByClassName('menubutton')[0];
const SmoothieCon = document.getElementsByClassName('smoothieContainer')[0];
const DollarCon = document.getElementsByClassName('dollarContainer')[0];

var Dollar = 0;
var Smoothies = 0;
var DollarPerSecond = 0;
var SmoothiePerSecond = 0;
var ClickSmoothie = 1;
var ClickDollar = 1;

// ! Rapporterer til vores infoboks
let reports = []

function report(e) {
    let reportBox = document.getElementById('reporter')
    reportID = 'RP' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    reportBox.innerHTML = `<div id ="` + reportID + `">` + e + `</div>`

}

// ! BurgerMenu bevægelser
function burgerMovements(e) {
    let lines = document.getElementsByClassName('line');
    // ! Åbn
    if (e == "a") {
        lines[0].style.transform = 'rotate(35deg)'
        lines[1].style.opacity = '0'
        lines[2].style.opacity = '0'
        // Bugfix Here :)
        setTimeout(() => {
            lines[1].style.opacity = '0'
            lines[2].style.opacity = '0'
        }, 280);
        // ! Luk
    } else if (e == "d") {
        lines[0].style.transform = 'rotate(0deg)'
        setTimeout(() => {
            lines[1].style.opacity = '1'
            lines[2].style.opacity = '1'
        }, 280);
    }
};

// ! Når vi klikker på burgermenuen
menuButton.addEventListener('click', () => {
    // ! Hvis menuen er åben
    if (menu.classList.contains('showMenu')) {
        menu.classList.replace('showMenu', 'hideMenu')
        burgerMovements("d")
        // ! Hvis menuen er lukket
    } else if (menu.classList.contains('hideMenu')) {
        menu.classList.replace('hideMenu', 'showMenu')
        burgerMovements("a")
        // ! Hvis menuen åbnes for første gang
    } else {
        menu.classList.add('showMenu')
        burgerMovements("a")
    }
})

// ! Købemenu funktioner og skift 

let productBox = document.getElementsByClassName('productsBox')[0]

// * Liste af produkter i et array
var productArray = [
    // ! Smoothie smoothie
    [{
            id: 'S_minion',
            price: 50,
            owned: 0
        },
        {
            id: 'S_blender',
            price: 100,
            owned: 0
        },
        {
            id: 'S_tree',
            price: 500,
            owned: 0,
            purchaseAble: false
        }
    ],
    // ! Dollar dollar
    [{
            id: 'D_booth',
            price: 50,
            owned: 0
        },
        {
            id: 'D_cafe',
            price: 500,
            owned: 0
        },
        {
            id: 'D_admin',
            price: 1000,
            owned: 0
        }
    ]
];

function shopManager(e) {
    // For alle smoothie produkter
    return
    if (e.id.startsWith('S')) {
        for (let i = 0; i < productArray[0].length; i++) {
            productBox.innerHTML += `<div id=`+productArray[0][i].id+` class="product">
            <img src="images/Products/smo/" alt="">
            <div class="productInfo">

            </div>
        </div>`
        }
    }
    // For alle dollar produkter 
    else if (e.id.startsWith('D')) {
        for (let i = 0; i < productArray[1].length; i++) {
            productBox.innerHTML += `<div id=`+productArray[1][i].id+` class="product">
            <img src="images/Products/smo/" alt="">
            <div class="productInfo">

            </div>
        </div>`
        }
    }
    console.log(productBox)
}


document.querySelectorAll('.menuButton').forEach(b => b.addEventListener('click', () => {
    // * Hvis den valgte menu allerede er åben
    buttons = document.getElementsByClassName('menuButton');
    productMenus = document.getElementsByClassName('productsBox');
    if (b.classList.contains('currentMenu')) {
        return
    }
    if (b == buttons[0]) {
        // * Åbn Smoothie menu
        buttons[0].classList.add('currentMenu')
        buttons[1].classList.remove('currentMenu')
        shopManager(b)
    } else if (b == buttons[1]) {
        // * Åbn Dollar menu
        buttons[1].classList.add('currentMenu')
        buttons[0].classList.remove('currentMenu')
        shopManager(b)
    }
}))

// ! Slut på Købemenu funktioner og skift

var DollarCounter = document.getElementById('ALLDOL');
var DollarPerSecondCounter = document.getElementById('CPSDOL');
var SmoothieCounter = document.getElementById('ALLSMO');
var SmoothiePerSecondCounter = document.getElementById('CPSSMO');
var wave = document.getElementsByClassName('waveContainer')[0].style;
var Wwave = document.getElementsByClassName('wave')[0].style;

window.onload = () => {
    shopManager(document.querySelector('.menuButton'))
    setInterval(() => {
        DollarCounter.innerHTML = Math.round(Dollar);
        DollarPerSecondCounter.innerHTML = DollarPerSecond.toFixed(2);
        SmoothieCounter.innerHTML = Math.round(Smoothies);
        SmoothiePerSecondCounter.innerHTML = SmoothiePerSecond.toFixed(2);
        wave.height = Smoothies * 0.0009 + 1 + "vh";
        if (Smoothies <= 99999) {
            Wwave.animationDuration = "5000s"
        }
        else if (Smoothies >= 100000) {
            let speed = Smoothies - 100000; 
            let duration = (5000 - (speed * 0.0001));
            if (duration <= 100) {
                Wwave.animationDuration = "100s"
            }
            else {
                Wwave.animationDuration = duration + "s";
            }
        }    
    }, 10)
}

// * Når man klikker på smoothien eller dollarsedlen

function ClickNum(X, Y, argument) {
    if (argument == "S") {
        SmoothieCon.insertAdjacentHTML = `<div class="ClickNum" style="top:` + Y + `px;left:` + X + `px;">` + ClickSmoothie + `</div>`
    }
    else if (argument == "D") {
        DollarCon.insertAdjacentHTML = `<div class="ClickNum" style="top:` + Y + `px;left:` + X + `px;">` + ClickDollar + `</div>`
    }
}


document.querySelectorAll('.CLICKER').forEach(e => e.addEventListener('click', (_) => {
    console.log(_)
    if (e.id == "smoothie") {
        Smoothies += ClickSmoothie
        ClickNum(_.clientX, _.clientY, "S")
    } else if (e.id == "dollar" && Smoothies >= 1) {
        Smoothies -= ClickDollar
        Dollar += ClickDollar
        ClickNum(_.clientX, _.clientY, "D")
    }
}))