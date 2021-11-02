console.log('fak jeee')
console.log('fak jeee')

import "./hammer.min.js";

let img = null
let container = null
let imgWidth = null
let imgHeight = null
let viewportWidth = null
let viewportHeight = null
let scale = null
let lastScale = null
let curWidth = null
let curHeight = null
let lastX = null
let lastY = null


// wyłącz podstawowe akcje przeglądarki
let disableImgEventHandlers = function () {
  let events = ['onclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover',
                'onmouseup', 'ondblclick', 'onfocus', 'onblur']

  events.forEach(function (event) {
    img[event] = function () {
      return false;
    }
  })
}

let translate = function (deltaX, deltaY) {
  console.log('translate')
  img.style.marginLeft = lastX + deltaX + 'px'
  img.style.marginTop = lastY + deltaY + 'px'
}

let updateLastPos = function (deltaX, deltaY) {
  console.log('updateLastPos')
  lastX = lastX + deltaX
  lastY = lastY + deltaY
}

let zoom = function () {
  console.log('zoom')
  if (lastScale === 1) {
    scale = 2
  } else if (lastScale === 2) {
    scale = 1
  }

  curWidth = imgWidth * scale
  curHeight = imgHeight * scale

  img.width = curWidth
  img.height = curHeight

  if (lastScale === 1) {
    translate((-1)*curWidth / 4, (-1)*curHeight / 4)
    updateLastPos((-1)*curWidth / 4, (-1)*curHeight / 4)
  } else if (lastScale === 2) {
    img.width = curWidth
    img.height = curHeight
    img.style.marginLeft = 0
    img.style.marginTop = 0
    lastX = 0
    lastY = 0
  }
  console.log(curWidth, curHeight)

  updateLastScale(scale)
}

let updateLastScale = function (scale) {
  console.log('updateLastScale')
  lastScale = scale
}

let getInfo = function () {
  console.log(img.style.marginLeft)
}

img = document.querySelector(".image")
container = img.parentElement

disableImgEventHandlers()

imgWidth = img.width
imgHeight = img.height
viewportWidth = img.width
viewportHeight = img.height
scale = viewportWidth / imgWidth
lastScale = scale
curWidth = imgWidth * scale
curHeight = imgHeight * scale
lastX = 0
lastY = 0

let hammer = new Hammer(container, {
  domEvents: true
})

hammer.on('pan', function (e) {
  translate(e.deltaX, e.deltaY)
})

hammer.on('panend', function (e) {
  updateLastPos(e.deltaX, e.deltaY)
})

hammer.on('tap', function (e) {
  console.log(e)
  zoom(lastScale)
})


// let mc = new Hammer(el, {
//   domEvents: true
// })

// mc.get('tap');
// mc.on("tap", function(ev) {
//   console.log(ev)
//     if(el.style.transform === "scale(2)") {
//       console.log('skala wynosi 2')
//       el.style.transform = "scale(1)"
//     } else {
//        el.style.transform = "scale(2)"
//     }
// })