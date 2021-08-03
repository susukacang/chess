
let selectedPiece = '' // selectedPiece is an object
let takenPiece = ''
let pick = false
let ttop, tleft, dtop, dleft
let srect, trect
let $boxv
let oldColor
let clickMode = true
let dt = 0.1
let cancelClick

document.addEventListener('DOMContentLoaded', function () {

  // setup layout, labels
  const ylabel = ["8", "7", "6", "5", "4", "3", "2", "1"]
  const $ylabels = document.getElementById('ylabels')
  for (let i = 0; i < 8; i++) {
    const $div = document.createElement('div')
    $div.classList.add('ylabel')
    $div.innerHTML = ylabel[i]
    // $div.classList.add('noselect')
    $ylabels.appendChild($div)
  }

  const xlabel = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const $xlabels = document.getElementById('xlabels')
  for (let i = 0; i < 8; i++) {
    const $div = document.createElement('div')
    $div.classList.add('xlabel')
    $div.innerHTML = xlabel[i]
    // $div.classList.add('noselect')
    $xlabels.appendChild($div)
  }

  // let clickMode = false
  let selected = false
  // let selectedPiece = ''
  let currentPiece = '&#9817;'
  $boxv = document.getElementById('boxv')
  const $body = document.getElementsByTagName('body')[0]
  const $board = document.getElementById('board')

  const whitepieces = [{ name: 'KING', value: '&#9812;' }, { name: 'QUEEN', value: '&#9813;' }, { name: 'ROOK', value: '&#9814;' }, { name: 'BISHOP', value: '&#9815;' }, { name: 'KNIGHT', value: '&#9816;' }, { name: 'PAWN', value: '&#9817;' }]
  const blackpieces = [{ name: 'KING', value: '&#9818;' }, { name: 'QUEEN', value: '&#9819;' }, { name: 'ROOK', value: '&#9820;' }, { name: 'BISHOP', value: '&#9821;' }, { name: 'KNIGHT', value: '&#9822;' }, { name: 'PAWN', value: '&#9823;' }]


  for (let i = 0; i < 64; i++) {
    // console.log(i)

    const $div = document.createElement('div')
    $div.classList.add('box')
    $div.classList.add('noselect')
    $board.appendChild($div)

    if (i < 8) {
      if (i % 2 === 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 16) {
      if (i % 2 !== 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 24) {
      if (i % 2 === 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 32) {
      if (i % 2 !== 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 40) {
      if (i % 2 === 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 48) {
      if (i % 2 !== 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 56) {
      if (i % 2 === 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    } else if (i < 64) {
      if (i % 2 !== 0) $div.classList.add('whitebox')
      else $div.classList.add('blackbox')
    }

  }

  const $boxes = document.getElementById('board').querySelectorAll('.box')

  // place pieces
  $boxes.forEach(($box, i) => {
    console.log($box, i)
    if (i >= 8 && i < 16) $box.innerHTML = blackpieces[5].value // 'PAWN'
    if (i === 0 || i === 7) $box.innerHTML = blackpieces[2].value // 'ROOK'
    if (i === 1 || i === 6) $box.innerHTML = blackpieces[4].value // 'KNIGHT'
    if (i === 2 || i === 5) $box.innerHTML = blackpieces[3].value // 'BISHOP'
    if (i === 3) $box.innerHTML = blackpieces[1].value // 'QUEEN'
    if (i === 4) $box.innerHTML = blackpieces[0].value // 'KING'
    if (i >= 48 && i < 56) $box.innerHTML = whitepieces[5].value // 'PAWN'
    if (i === 56 || i === 63) $box.innerHTML = whitepieces[2].value // 'ROOK'
    if (i === 57 || i === 62) $box.innerHTML = whitepieces[4].value // 'KNIGHT'
    if (i === 58 || i === 61) $box.innerHTML = whitepieces[3].value // 'BISHOP'
    if (i === 59) $box.innerHTML = whitepieces[1].value // 'QUEEN'
    if (i === 60) $box.innerHTML = whitepieces[0].value // 'KING'
  })

  // assign class occupied 
  $boxes.forEach(($box) => {
    if ($box.innerHTML !== '')
      $box.classList.add('occupied')
  })

  // label boxes

  const m = ['8', '7', '6', '5', '4', '3', '2', '1']
  const n = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      $boxes[8 * i + j].setAttribute('id', n[j] + m[i])
    }
  }

  $boxes.forEach(($box) => {
    if (1) {
      $box.addEventListener('mousemove', mousemoveHandler)
      function mousemoveHandler(e) {
        if (clickMode === false) {
          selectedPiece.innerHTML = ''
          let y = pageYOffset + e.y - 50
          let x = pageXOffset + e.x - 50
          $boxv.style.top = y + "px"
          $boxv.style.left = x + "px"

          document.body.style.cursor = "grabbing"

          // }
        }
      }
      $box.addEventListener('mousedown', selectHandler)

      function selectHandler(e) {
        cancelClick = setTimeout(dontClick, 500, e, this)
      }

      function dontClick(e, elem) {
        clickMode = false
        mousedownHandler(e, elem)
      }

      function pickPiece(elem) {
        $boxv.innerHTML = elem.innerHTML
        selectedPiece = elem  // note that selectedPiece is  erased. $boxv contains the piece. use $boxv when checking color
        selectedPiece.classList.add('currentSelected')
      }

      function placeVirtualPiece(elem) {
        const rect = elem.getBoundingClientRect()
        // console.log(pageXOffset, pageYOffset, rect.top, rect.left)
        $boxv.style.top = pageYOffset + rect.top + "px"
        $boxv.style.left = pageXOffset + rect.left + "px"
      }

      function capturePiece(selectedPiece, destinationPiece) {
        //  compare this.innerHTML and $boxv.innerHTML. if different color, eat. otherwise, do nothing

        const source = checkColor(selectedPiece)
        const target = checkColor(destinationPiece)
        if (source !== target) return true
        else return false
      }

      function mousedownHandler(e, elem) {

        console.log('mousedown', elem.innerHTML)

        if (boxIsOccupied(elem)) {

          resetTransform()
          pickPiece(elem)
        }
      }

      // selectedPiece, $boxv, this, takenPiece, innerHTML
      $box.addEventListener('mouseup', mouseupHandler)
      function mouseupHandler(e) {
        console.log('mouseup', this.innerHTML)
        clearTimeout(cancelClick)
        if (clickMode === false) { // mouse drag
          dragProcess(this)
        }
        else { // clickMode == true
          clickProcess(this)
          clickSelect(this)
        }
        clickMode = true
      }

      $box.addEventListener('mouseover', mouseoverHandler)
      function mouseoverHandler(e) {
        document.body.style.cursor = "default"
      }
    }

    function dragProcess($this) {
      if (boxIsOccupied($this)) {
        // document.body.style.cursor = "grab"
        const capture = capturePiece($boxv, $this)
        if (capture) { // if drag and drop on box with opponent on it
          console.log('take prisoner')
          $this.innerHTML = $boxv.innerHTML
          $this.classList.add('occupied')

          placeVirtualPiece($this)
          // document.body.style.cursor = "grab"
          selectedPiece.classList.remove('occupied')
          selectedPiece.innerHTML = ''
          selectedPiece = ''
          pick = false
        } else { // if drag and drop on box with own piece on it
          console.log('walk away')

          placeVirtualPiece(selectedPiece)

          selectedPiece.innerHTML = $boxv.innerHTML // since selectedPiece is already empty when mousedown select on it

          pick = true
        }

      }
      else { // this.innerHTML === ''
        const srect = selectedPiece.getBoundingClientRect()
        const drect = $this.getBoundingClientRect()

        // if drag and drop back on itself
        if ($this.classList.contains('currentSelected')) {
          // if (srect.top === drect.top && srect.left === drect.left) {
          $this.innerHTML = $boxv.innerHTML
          $this.classList.add('occupied')
          selectedPiece = $this
          placeVirtualPiece($this)
          pick = true
        } else { // if drag and drop on another empty box/square
          $this.innerHTML = $boxv.innerHTML
          $this.classList.add('occupied')
          placeVirtualPiece($this)
          // document.body.style.cursor = "grab"
          selectedPiece.classList.remove('currentSelected')
          selectedPiece.classList.remove('occupied')
          selectedPiece.innerHTML = ''
          selectedPiece = ''

          pick = false
        }
      }
    }

    function clickSelect(elem){
      // dest = ownself, empty, same team, enemy
      if(elem.classList.contains('currentSelected')){
        console.log('ownself')
      } else if (boxIsOccupied(elem)){
        console.log('empty box')
      } else if(!capturePiece(elem, selectedPiece)){
        console.log('same team')
      } else {
        console.log('capture')
      }
    }

    function clickProcess($this) {
      if (boxIsOccupied($this))
        if (pick === false) {
          console.log('pick')

          resetTransform()
          pickPiece($this)
          placeVirtualPiece($this)

          pick = true
        }
        else {

          const capture = capturePiece($boxv, $this)

          if (capture) { // take and place have the same routine
            console.log('take')
            glide($this)
            pick = false
          } else {
            console.log('walk/repick')
            selectedPiece.classList.remove('currentSelected')
            $this.classList.add('currentSelected')
            // placeVirtualPiece(this)
            selectedPiece = $this
            // selectedPiece.classList.add('currentSelected')
            placeVirtualPiece($this)
            $boxv.innerHTML = $this.innerHTML
            pick = true
          }
        }
      else { // targeting empty square
        if (pick === true) {
          console.log('place')
          glide($this)
          pick = false
        }
      }
    }

    function glide(elem) {

      const s = selectedPiece.getBoundingClientRect()
      const t = elem.getBoundingClientRect()
      const dx = t.left - s.left
      const dy = t.top - s.top

      $boxv.style.removeProperty('--dx')
      $boxv.style.removeProperty('--dy')
      $boxv.style.setProperty('--dt', dt)
      $boxv.style.setProperty('--dx', dx)
      $boxv.style.setProperty('--dy', dy)

      selectedPiece.classList.remove('currentSelected')
      selectedPiece.classList.remove('occupied')
      selectedPiece.innerHTML = ''
      selectedPiece = ''
      takenPiece = elem
      takenPiece.classList.add('occupied')
    }

    function resetTransform() {
      $boxv.style.removeProperty('--dt')
      $boxv.style.removeProperty('--dx')
      $boxv.style.removeProperty('--dy')
    }

    function boxIsOccupied(elem) {
      return elem.innerHTML !== ''
    }
  })


  $boxv.addEventListener('transitionend', function (e) {
    console.log('transitionend')
    takenPiece.innerHTML = $boxv.innerHTML
  })

  const rect = $board.getBoundingClientRect()
  console.log(rect.top, rect.right, rect.bottom, rect.left)

  const $pieces = document.getElementById('pieces').querySelectorAll('.box')
  $pieces.forEach(($piece) => {
    console.log($piece.innerHTML)
    $piece.addEventListener('click', function (e) {
      console.log(this.innerHTML)
      $pieces.forEach(($piece) => $piece.style.background = '')
      this.style.background = 'rgba(94, 82, 82, 0.5)';
      currentPiece = this.innerHTML
      $boxes.forEach(($box) => {
        if ($box.innerHTML !== '') $box.innerHTML = currentPiece
      })
    })
  })


  function checkColor(piece) {
    let el = document.createElement('div')

    let f = whitepieces.some(whitepiece => {

      el.innerHTML = whitepiece.value

      return el.innerHTML == piece.innerHTML
    })
    if (f) return 'white'
    else return 'black'
  }


})
