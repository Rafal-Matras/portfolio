const header = document.querySelector('[data-header]');
const headerBox = document.querySelector('[data-header-box]');
const hamburger = document.querySelector('[data-hamburger]');
const nav = document.querySelector('[data-nav]');
const navItems = document.querySelectorAll('[data-nav-item]');
const flagImage = document.querySelector('[data-flag-img]');
const themeImage = document.querySelector('[data-theme-img]');
const navLeague = document.querySelector('[data-nav-language]');
const navTheme = document.querySelector('[data-nav-theme]');
const textLeague = document.querySelectorAll('[data-language]');
const nextLogo = document.querySelector('[data-next-logo]');
let windowTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const setTheme = () => {
    const themeText = flagImage.dataset.flagImg === 'en' ? 'zmień motyw' : 'change theme';
    if (windowTheme) {
        themeImage.setAttribute('src', './image/sun.png');
        themeImage.dataset.themeImg = 'dark';
        navTheme.innerHTML = `<img src="./image/sun.png" alt="ikonka zmiany motywu">${themeText}`;
        document.documentElement.setAttribute("data-theme", "dark")
        nextLogo.setAttribute('src','./image/nextjsw.svg')
    } else {
        themeImage.setAttribute('src', './image/moon.png');
        themeImage.dataset.themeImg = 'light';
        navTheme.innerHTML = `<img src="./image/moon.png" alt="ikonka zmiany motywu">${themeText}`;
        document.documentElement.setAttribute("data-theme", "light")
        nextLogo.setAttribute('src','./image/nextjsb.svg')
    }
};

const changeTheme = () => {
    windowTheme = !windowTheme;
    setTheme();
};

const changeLeague = () => {
    if (flagImage.dataset.flagImg === 'pl') {
        flagImage.setAttribute('src', './image/english.png');
        flagImage.dataset.flagImg = 'en';
        navLeague.innerHTML = '<img src="./image/english.png" alt="ikonka flagi">english';
        textLeague.forEach(item => {
            if (item.dataset.language === 'en') {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
        setTheme();
    } else {
        flagImage.setAttribute('src', './image/poland.png');
        flagImage.dataset.flagImg = 'pl';
        navLeague.innerHTML = '<img src="./image/poland.png" alt="ikonka flagi">polski';
        textLeague.forEach(item => {
            if (item.dataset.language === 'pl') {
                item.classList.add('disabled');
            } else {
                item.classList.remove('disabled');
            }
        });
        setTheme();
    }
};

const clickHandler = (item) => {
    navItems.forEach(click => click.classList.remove('active'));
    item.classList.add('active');
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    const href = item.dataset.navItem;
    let offsetTop;
    if (window.scrollY === 0) {
        offsetTop = document.getElementById(href).offsetTop - 90;
    } else {
        if (item.dataset.navItem === 'start') {
            offsetTop = 0;
        } else if (document.body.offsetWidth >= 576) {
            offsetTop = document.getElementById(href).offsetTop - 20;
        } else {
            offsetTop = document.getElementById(href).offsetTop;
        }
    }
    window.scroll({
        top: offsetTop - 30,
        behavior: 'smooth',
    });
};

const navActiveScroll = (itemNav) => {
    navItems.forEach(item => {
        if (item.dataset.navItem === itemNav) {
            item.classList.add('active');
        } else item.classList.remove('active');
    });
};

document.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('active');
        headerBox.classList.add('active');
        hamburger.classList.add('none');
    }
    if (window.scrollY === 0) {
        header.classList.remove('active');
        headerBox.classList.remove('active');
        hamburger.classList.remove('none');
    }
    if (window.scrollY > 100) {
        nav.classList.add('top');
    }
    if (window.scrollY < 100) {
        nav.classList.remove('top');
    }
    if (window.scrollY >= 0 && window.scrollY < 550) {
        navActiveScroll('start');
    }
    if (window.scrollY > 550 && window.scrollY < 2400 && document.body.offsetWidth < 768) {
        navActiveScroll('about');
    }
    if (window.scrollY > 550 && window.scrollY < 1750 && document.body.offsetWidth > 768) {
        navActiveScroll('about');
    }
    if (window.scrollY > 2400 && window.scrollY < 5200 && document.body.offsetWidth < 768) {
        navActiveScroll('skills');
    }
    if (window.scrollY > 1750 && window.scrollY < 3600 && document.body.offsetWidth > 768) {
        navActiveScroll('skills');
    }
    if (window.scrollY > 5200 && window.scrollY < 8000 && document.body.offsetWidth < 768) {
        navActiveScroll('portfolio');
    }
    if (window.scrollY > 3600 && window.scrollY < 5300 && document.body.offsetWidth > 768) {
        navActiveScroll('portfolio');
    }
    if (window.scrollY > 8000 && document.body.offsetWidth < 768) {
        navActiveScroll('contact');
    }
    if (window.scrollY > 5300 && document.body.offsetWidth > 768) {
        navActiveScroll('contact');
    }
});

flagImage.addEventListener('click', changeLeague);
navLeague.addEventListener('click', changeLeague);

themeImage.addEventListener('click', changeTheme);
navTheme.addEventListener('click', changeTheme);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => clickHandler(item));
});

setTheme();