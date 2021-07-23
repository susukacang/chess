
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
      if (1)
        $box.addEventListener('mousemove', mousemoveHandler)
      function mousemoveHandler(e) {
        if (clickMode === false) {
          $boxv.style.position = 'absolute'
          let y = pageYOffset + e.y - 50
          let x = pageXOffset + e.x - 50
          $boxv.style.top = y + "px"
          $boxv.style.left = x + "px"

          if (boxIsOccupied($boxv)) {
            document.body.style.cursor = "grabbing"
          }
        }
      }
      if (1)
        // $box.addEventListener('mousedown', function (e) {
        //   cancelClick = setTimeout(dontClick, 500, e, this)
        // })
        $box.addEventListener('mousedown', selectHandler)

      function selectHandler(e) {
        cancelClick = setTimeout(dontClick, 500, e, this)
      }

      function dontClick(e, elem) {

        clickMode = false
        mousedownHandler(e, elem)
      }

      function mousedownHandler(e, elem) {
        console.log('mousedown clickMode', clickMode)
        if (clickMode === false) {
          console.log('mousedown', elem.innerHTML)

          if (boxIsOccupied(elem)) {

            resetTransform()

            $boxv.innerHTML = elem.innerHTML
            elem.innerHTML = ''
            document.body.style.cursor = "grabbing"
            selectedPiece = elem  // note that selectedPiece is  erased. $boxv contains the piece. use $boxv when checking color
          }
          else document.body.style.cursor = "default"
        } else {
          console.log('do nothing')
        }

      }
      if (1)
        $box.addEventListener('mouseup', mouseupHandler)
      function mouseupHandler(e) {
        console.log('mouseup', this.innerHTML)
        clearTimeout(cancelClick)
        if (clickMode === false) { // mouse drag
          if (boxIsOccupied(this)) {
            document.body.style.cursor = "grab"

            //  compare this.innerHTML and $boxv.innerHTML. if different color, eat. otherwise, do nothing
            const source = checkColor($boxv)
            const target = checkColor(this)
            if (source !== target) { // opponent on box
              console.log('take prisoner')
              this.innerHTML = $boxv.innerHTML
              // $boxv.innerHTML = ''
              const $this = this.getBoundingClientRect()
              console.log($this.top, $this.left)
              $boxv.style.top = pageYOffset + $this.top + "px"
              $boxv.style.left = pageXOffset + $this.left + "px"

              document.body.style.cursor = "grab"
              selectedPiece = ''
              pick = false
            } else { // friend on box
              console.log('walk away')
              // selectedPiece.innerHTML = $boxv.innerHTML
              // $boxv.innerHTML = ''
              // selectedPiece = ''
              const $this = selectedPiece.getBoundingClientRect()
              console.log($this.top, $this.left)
              $boxv.style.top = pageYOffset + $this.top + "px"
              $boxv.style.left = pageXOffset + $this.left + "px"
              pick = true
              selectedPiece.innerHTML = $boxv.innerHTML // since selectedPiece is already empty when mousedown select on it
              console.log(selectedPiece.innerHTML)
            }

          }
          else { // this.innerHTML === ''
            this.innerHTML = $boxv.innerHTML
            // $boxv.innerHTML = ''
            const $this = this.getBoundingClientRect()
            console.log($this.top, $this.left)
            $boxv.style.top = pageYOffset + $this.top + "px"
            $boxv.style.left = pageXOffset + $this.left + "px"
            document.body.style.cursor = "grab"
            selectedPiece = ''
            piece = false
          }
        }
        else { // clickMode !== false // click mode
          clickMode = true
          if (boxIsOccupied(this))
            if (pick === false) {
              pick = true
              console.log('pick')
              const $this = this.getBoundingClientRect()
              console.log($this.top, $this.left)

              resetTransform()

              console.log(pageXOffset, pageYOffset, $this.top, $this.left)
              $boxv.style.top = pageYOffset + $this.top + "px"
              $boxv.style.left = pageXOffset + $this.left + "px"
              selectedPiece = this
              console.log('selectedPiece', selectedPiece)
              $boxv.innerHTML = selectedPiece.innerHTML
            }
            else {
              // checkColor take or walk
              // const sourceColor = checkColor(selectedPiece)
              const sourceColor = checkColor($boxv)

              const targetColor = checkColor(this)
              console.log(sourceColor, targetColor)
              if (sourceColor === targetColor) {
                console.log('walk/repick')
                // pick = false
                // pick = true
                const $this = this.getBoundingClientRect()
                console.log($this.top, $this.left)
                $boxv.style.top = pageYOffset + $this.top + "px"
                $boxv.style.left = pageXOffset + $this.left + "px"
                selectedPiece = this
                $boxv.innerHTML = this.innerHTML

              } else { // take and place have the same routine
                console.log('take')
                pick = false

                glide(this)

              }
            }
          else { // targeting empty square
            if (pick === true) {
              console.log('place')
              pick = false

              glide(this)

            } else {
              console.log('do nothing')
            }
          }

          console.log('pick', pick)

          clickMode = false

        }
        clickMode = true
      }
      $box.addEventListener('mouseover', mouseoverHandler)
      function mouseoverHandler(e) {
        if (!boxIsOccupied(this)) document.body.style.cursor = "default"
        else document.body.style.cursor = "grab"
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

      selectedPiece.innerHTML = ''
      takenPiece = elem
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
