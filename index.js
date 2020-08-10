const tablet = window.matchMedia('screen and (max-width: 1023px)');
const tablet2 = window.matchMedia('screen and (max-width: 810px)');
const menu = document.querySelector('.menu');
const burgerButton = document.querySelector('#burger-menu');
const buttonSend = document.querySelector('.btn-send')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const message = document.querySelector('#message')

tablet.addListener(validation);
validation(tablet);
function validation(event) {
  if (event.matches) {
    burgerButton.addEventListener('touchstart', toggleMenu) /*para mobile*/
    burgerButton.addEventListener('mouseenter', showMenu) /*para resto de pantallas*/
    menu.addEventListener('mouseleave', hideMenu)
  } else {
    burgerButton.removeEventListener('touchstart', toggleMenu)
    burgerButton.removeEventListener('mouseenter', showMenu)
    menu.removeEventListener('mouseleave', hideMenu)
  }
}

function toggleMenu() {
  hideShow(!menu.classList.contains('is-active'))
}
function showMenu() { hideShow(true) }
function hideMenu() { hideShow(false) }

function hideShow(show) {
  if (!show) {
    menu.classList.remove('is-active');
  } else {
    menu.classList.add('is-active');
  }
}


// Se creo 100 elementos div
const body = document.body
const cont = Math.floor(Math.random() * 100) + 50;
for (let index = 0; index < cont; index++) {
  const animateBubble = document.createElement('animatable-component')
  animateBubble.keyFrames = [
    {
      offset: 0,
      opacity: 0,
      transform: 'translate(0, 0) scale(1)'
    },
    {
      offset: 0.2,
      opacity: 1
    },
    {
      offset: 1,
      opacity: 0,
      transform: `translate(0, -100vh) scale(0.1)`
    }
  ]
  animateBubble.autoPlay = true
  animateBubble.duration = 12000 * Math.random() + 800
  animateBubble.easing = 'ease-in-out'
  animateBubble.delay = Math.random() * 1000
  animateBubble.iterations = Infinity
  animateBubble.classList.add('bubble')
  animateBubble.style.left = `${Math.random() * 100}vw`
  body.prepend(animateBubble)
}

buttonSend.addEventListener('click', function () {
  if (!email.value) {
    alert("El correo es requerido")
  }
  if (!message.value) {
    alert("El mensaje es requerido")
  }
  if (!name.value) {
    alert("El nombre es requerido")
  }

  buttonSend.classList.add('clicked')
  const label = buttonSend.querySelector('p')
  fetch('https://us-central1-website-69a2b.cloudfunctions.net/sendEmail', {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      message: message.value,
      name: name.value
    })
  }).then(function (response) {
    if (!response.ok) {
      throw new Error()
    }
    label.innerText = 'Enviado'
    window.location = './contactAnimation'
  }).catch(function (err) {
    buttonSend.classList.remove('clicked')
    debugger
  })
})