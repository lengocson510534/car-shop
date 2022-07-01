let hero_slide = document.querySelector('#hero-slide')
let hero_slide_items = hero_slide.querySelectorAll('.slide-item')
let hero_slide_index = 0
let hero_slide_play = true
let hero_slide_control_items = hero_slide.querySelectorAll('.slide-control-item')
let hero_slide_next = hero_slide.querySelector('.slide-next')
let hero_slide_prev = hero_slide.querySelector('.slide-prev')
let header = document.querySelector('header')

//responsive 
let menu = document.querySelector('.header-menu')
let toggleMenu = document.querySelector('.toggle')
let menuClose = document.querySelector('.header-menu-close')

showSlide = (index) => {
    hero_slide.querySelector('.slide-item.active').classList.remove('active')
    hero_slide.querySelector('.slide-control-item.active').classList.remove('active')
    hero_slide_control_items[index].classList.add('active')
    hero_slide_items[index].classList.add('active')
}
nextSlider = () => {
    hero_slide_index = hero_slide_index + 1 === hero_slide_items.length ? 0 : hero_slide_index + 1
    showSlide(hero_slide_index)
}
prevSlider = () => {
    hero_slide_index = hero_slide_index - 1 < 0 ? hero_slide_items.length - 1 : hero_slide_index - 1
    showSlide(hero_slide_index) 
}
//pause slide when mouse come in slider 
hero_slide.addEventListener('mouseover', () => hero_slide_play = false);
//resume slide when mouse leave out slider
hero_slide.addEventListener('mouseleave', () => hero_slide_play = true);

hero_slide_next.addEventListener('click',() => nextSlider());
hero_slide_prev.addEventListener('click',() => prevSlider());

hero_slide_control_items.forEach((item, index) => {
    item.addEventListener('click', ()=> showSlide(index))
})

setTimeout(() => hero_slide_items[0].classList.add('active'), 200);
//auto slide 
setInterval(() => {
    if(!hero_slide_play) 
        return
    nextSlider()
}, 5000)

//change header style when scroll 
window.addEventListener('scroll', () =>{
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        header.classList.add('shrink')
    }
    else {
        header.classList.remove('shrink')
    }
})

// element show on scroll
let scroll = window.requestAnimationFrame || function(callback){window.setTimeout(callback, 1000/60)}

let el_to_show = document.querySelectorAll('.show-on-scroll')
isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()
    let distance = 200
    return rect.top <= (window.innerHeight - distance || document.documentElement.clientHeight - distance)
}

loop = () => {
    el_to_show.forEach(el => {
        if (isElInViewPort(el)) el.classList.add('show')
    })
    scroll(loop)
}

loop()

//click toggle 
toggleMenu.addEventListener('click', () => {
    menu.style.display = 'block';
})

menuClose.addEventListener('click', () => {
    menu.style.display = 'none';
})