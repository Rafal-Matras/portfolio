const header = document.querySelector( '[data-header]' );
const headerBox = document.querySelector( '[data-header-box]' );
const hamburger = document.querySelector( '[data-hamburger]' );
const nav = document.querySelector( '[data-nav]' );
const navItems = document.querySelectorAll( '[data-nav-item]' );

hamburger.addEventListener( 'click', () => {
    hamburger.classList.toggle( 'active' );
    nav.classList.toggle( 'active' );
} );

navItems.forEach( item => {
    item.addEventListener( 'click', () => clickHandler( item ) );
} );

const clickHandler = (item) => {
    navItems.forEach( click => click.classList.remove( 'active' ) );
    item.classList.add( 'active' );
    hamburger.classList.remove( 'active' );
    nav.classList.remove( 'active' );
    const href = item.dataset.navItem;
    let offsetTop;
    if (window.scrollY === 0) {
        offsetTop = document.getElementById( href ).offsetTop - 90;
    } else {
        if (item.dataset.navItem === 'start') {
            offsetTop = 0;
        } else if (document.body.offsetWidth >= 576) {
            offsetTop = document.getElementById( href ).offsetTop - 20;
        } else {
            offsetTop = document.getElementById( href ).offsetTop;
        }
    }
    window.scroll( {
        top: offsetTop - 30,
        behavior: 'smooth'
    } );
    console.log( window.scrollY );
};

const navActiveScroll = (itemNav) => {
    navItems.forEach( item => {
        if (item.dataset.navItem === itemNav) {
            item.classList.add( 'active' );
        } else item.classList.remove( 'active' );
    } );
};

document.addEventListener( 'scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add( 'active' );
        headerBox.classList.add( 'active' );
        hamburger.classList.add( 'none' );
    }
    if (window.scrollY === 0) {
        header.classList.remove( 'active' );
        headerBox.classList.remove( 'active' );
        hamburger.classList.remove( 'none' );
    }
    if (window.scrollY > 100) {
        nav.classList.add( 'top' );
    }
    if (window.scrollY < 100) {
        nav.classList.remove( 'top' );
    }
    if (window.scrollY >= 0 && window.scrollY < 550) {
        navActiveScroll( 'start' );
    }
    if (window.scrollY > 550 && window.scrollY < 2400 && document.body.offsetWidth < 768) {
        navActiveScroll( 'about' );
    }
    if (window.scrollY > 550 && window.scrollY < 1750 && document.body.offsetWidth > 768) {
        navActiveScroll( 'about' );
    }
    if (window.scrollY > 2400 && window.scrollY < 5200 && document.body.offsetWidth < 768) {
        navActiveScroll( 'skills' );
    }
    if (window.scrollY > 1750 && window.scrollY < 3600 && document.body.offsetWidth > 768) {
        navActiveScroll( 'skills' );
    }
    if (window.scrollY > 5200 && window.scrollY < 8000 && document.body.offsetWidth < 768) {
        navActiveScroll( 'portfolio' );
    }
    if (window.scrollY > 3600 && window.scrollY < 5300 && document.body.offsetWidth > 768) {
        navActiveScroll( 'portfolio' );
    }
    if (window.scrollY > 8000 && document.body.offsetWidth < 768) {
        navActiveScroll( 'contact' );
    }
    if (window.scrollY > 5300 && document.body.offsetWidth > 768) {
        navActiveScroll( 'contact' );
    }
} );