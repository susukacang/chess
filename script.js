
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
let currentPiece = ''
let click = true
let turn = 'whpiece' // whpiece, bkpiece

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
  let selectedPiece = ''
  // let currentPiece = '&#9817;'
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
  if (0) {
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
  }
  // label boxes

  const m = ['8', '7', '6', '5', '4', '3', '2', '1']
  const n = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      $boxes[8 * i + j].setAttribute('id', n[j] + m[i])
    }
  }

  const s = ['s-00', 's-10', 's-20', 's-30', 's-40', 's-50', 's-60', 's-70', 's-01', 's-11', 's-21', 's-31', 's-41', 's-51', 's-61', 's-71', 's-06', 's-16', 's-26', 's-36', 's-46', 's-56', 's-66', 's-76', 's-07', 's-17', 's-27', 's-37', 's-47', 's-57', 's-67', 's-77']

  const p = ['&#9820;', '&#9822;', '&#9821;', '&#9818;', '&#9819;', '&#9821;', '&#9822;', '&#9820;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9814;', '&#9816;', '&#9815;', '&#9812;', '&#9813;', '&#9815;', '&#9816;', '&#9814;']
  for (let i = 0; i < 16; i++) {
    const $divp = document.createElement('div')
    $divp.classList.add('bkpiece', s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  }
  for (let i = 16; i < 32; i++) {
    const $divp = document.createElement('div')
    $divp.classList.add('whpiece', s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  }

  const $pieces = document.getElementById('board').querySelectorAll('.whpiece, .bkpiece')
  // $pieces.forEach(($piece) => {
  //   $piece.addEventListener('click', function () {
  //     console.log('click piece', this.classList.item(1))
  //   })
  // })

  const $box0 = document.querySelector('.box')
  const dw = $box0.offsetWidth
  const dh = $box0.offsetHeight
  const boardRect = $board.getBoundingClientRect()
  // const boardRectXOffset = pageXOffset - boardRect.left
  // const boardRectYOffset = pageYOffset - boardRect.top

  // let click = true
  let cancelMouseclick
  // let currentPiece = ''
  // let $pieceClick = false
  // $board.addEventListener('click', function (e) {
  //   console.log('$board click')
  //   console.log('$pieceClick', $pieceClick)
  // })
  // $pieces.forEach(($piece) => {
  //   $piece.addEventListener('click', function (e) {
  //     e.preventDefault()
  //     e.stopPropagation()

  //     console.log('$piece click')
  //     $pieceClick = true
  //   })
  // })

  // cannot be with $piece mouseup 
  $board.addEventListener('mouseup', function (e) {
    console.log('$board.mouseup')
    if (pick) { // move picked piece to empty square
      console.log('move piece to empty square')
      const boardRectXOffset = pageXOffset - boardRect.left
      const boardRectYOffset = pageYOffset - boardRect.top
      const dx = boardRectXOffset + e.x
      const dy = boardRectYOffset + e.y
      const sXY = 's-' + Math.floor(dx / dw) + Math.floor(dy / dh)

      const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
      currentPiece.classList.remove(...currentPiece.classList)
      currentPiece.classList.add(currentPieceColor)
      currentPiece.classList.add(sXY)
      currentPiece.classList.remove('currentSelected')
      click = true
      pick = false
    } else { // click on empty square, do nothing
      const boardRectXOffset = pageXOffset - boardRect.left
      const boardRectYOffset = pageYOffset - boardRect.top
      const dx = boardRectXOffset + e.x
      const dy = boardRectYOffset + e.y
      console.log('$board ' + 's-' + Math.floor(dx / dw) + Math.floor(dy / dh))
      click = true
    }
  })

  function mousedownCallback(e, elem) {
    if (elem.classList.item(0) == turn || 0) {

      click = false
      console.log('mousedown')
      currentPiece = elem
      turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
    }
  }

  $pieces.forEach(($piece) => {
    $piece.addEventListener('click', function (e) {
      console.log('turn', turn)
      if ($piece.classList.item(0) == turn) {
        console.log('turn...', turn)
        turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
      }
    })
  })

  $pieces.forEach(($piece) => {

    $piece.addEventListener('mousedown', function (e) {
      console.log('$piece.mousedown')
      e.preventDefault()
      e.stopPropagation()
      if ($piece.classList.item(0) == turn || 1) {
        cancelMouseclick = setTimeout(mousedownCallback, 500, e, this)
        console.log('turn...', turn)
        // turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
      }
    })

    $piece.addEventListener('mouseup', function (e) {
      console.log('$piece.mouseup')
      e.preventDefault()
      e.stopPropagation()
      clearTimeout(cancelMouseclick)
      const boardRectXOffset = pageXOffset - boardRect.left
      const boardRectYOffset = pageYOffset - boardRect.top
      const dx = boardRectXOffset + e.x
      const dy = boardRectYOffset + e.y
      const sXY = 's-' + Math.floor(dx / dw) + Math.floor(dy / dh)
      // console.log('$piece ' + sXY)

      // const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
      // const $pieceColor = $piece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'

      if (click) {
        console.log('mouseclick')
        if (pick) {
          console.log('exchange')
          const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
          const $pieceColor = this.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
          if (currentPieceColor !== $pieceColor) {
            currentPiece.classList.remove(...currentPiece.classList)
            currentPiece.classList.add(currentPieceColor)
            currentPiece.classList.add(sXY)
            currentPiece.classList.remove('currentSelected')

            this.classList.remove(...this.classList)
            pick = false
          } else {
            console.log('repick')
            this.classList.add('currentSelected')
            currentPiece.classList.remove('currentSelected')
            currentPiece = this

          }

          click = true

        } else {
          if (this.classList.item(0) == turn || 0) {
            console.log('pick')
            this.classList.add('currentSelected')
            currentPiece = this
            pick = true
            click = true
            turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
          }
        }

        // click = true
        // console.log(currentPiece.className)

      } else { // mouse drag
        console.log('mouseup')
        const $piece = document.querySelector('.' + sXY)
        currentPiece.classList.remove('dragging')
        if ($piece === null) {
          console.log('$piece is', $piece)
          currentPiece.removeAttribute("style")
          const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
          currentPiece.classList.remove(...currentPiece.classList)
          currentPiece.classList.add(currentPieceColor)
          currentPiece.classList.add(sXY)
          currentPiece.classList.remove('currentSelected')
          pick = false
        } else {
          currentPiece.removeAttribute("style")
          const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
          const $pieceColor = $piece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
          // console.log(currentPieceColor, $pieceColor)
          // currentPiece.classList.remove(...currentPiece.classList)
          // currentPiece.classList.add(currentPieceColor)
          // currentPiece.classList.add(sXY)
          // console.log('$piece', e.x, e.y)
          // console.log('$piece ' + sXY)

          if (currentPieceColor !== $pieceColor) {
            // $piece is currentPiece on mouseup......
            console.log('debug1')
            currentPiece.classList.remove(...currentPiece.classList)
            currentPiece.classList.add(currentPieceColor)
            currentPiece.classList.add(sXY)
            currentPiece.classList.remove('currentSelected')

            $piece.classList.remove(...$piece.classList)
            pick = false
          } else {
            console.log('debug2')
            // remove style transform translate
            console.log('repick')
            // this.classList.add('currentSelected')
            // currentPiece.classList.remove('currentSelected')
            // currentPiece = this
            currentPiece.removeAttribute('style')

          }
        }

        click = true

      }
      // click = true
      // console.log('end mouseup', click)

    })

    // ref: https://stackoverflow.com/questions/5758090/dragging-a-div-in-jquery-fine-when-mouse-is-slow-but-fails-on-fast-mouse-move
    $board.addEventListener('mousemove', function (e) {
      // e.preventDefault()
      // e.stopPropagation()

      if (!click) {
        // console.log('$piece', e.x, e.y)
        const currentPieceColor = currentPiece.classList.contains('whpiece') ? 'whpiece' : 'bkpiece'
        // currentPiece.classList.remove(...currentPiece.classList)
        // currentPiece.classList.add(currentPieceColor)
        // $piece.classList.value = ''
        let y = pageYOffset + e.y - 50
        let x = pageXOffset + e.x - 50

        const boardRectXOffset = pageXOffset - boardRect.left
        const boardRectYOffset = pageYOffset - boardRect.top
        const dx = boardRectXOffset + e.x - 50
        const dy = boardRectYOffset + e.y - 50
        // console.log(dx, dy)
        // currentPiece.style.top = y + "px"
        // currentPiece.style.left = x + "px"

        currentPiece.classList.add('dragging')
        // this.style.transform = "translate(" + dx + "px, " + dy + "px)"
        currentPiece.style.transform = "translate(" + dx + "%, " + dy + "%)"
        currentPiece.style.cursor = "grabbing"
      }
    })
  })

  if (0)
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

          // if (boxIsOccupied(elem)) {

          //   resetTransform()
          //   pickPiece(elem)
          // }
        }

        // selectedPiece, $boxv, this, takenPiece, innerHTML
        $box.addEventListener('mouseup', mouseupHandler)
        function mouseupHandler(e) {
          console.log('mouseup', this.innerHTML)
          clearTimeout(cancelClick)
          if (clickMode === false) { // mouse drag
            // dragProcess(this)
            console.log('drag')
          }
          else { // clickMode == true
            // clickProcess(this)
            console.log('click')
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

      function movePiece(srcelem, dstelem) {
        dstelem.innerHTML = srcelem.innerHTML
        srcelem.innerHTML = ''
        // srcelem.classList.remove('currentSelected')
        srcelem = ''
        // pick = false
      }

      function exchange(n, elem) {
        switch (n) {
          case 1:
            // selectedPiece.classList.remove('currentSelected')
            selectedPiece = ''
            pick = false
            break
          case 2:
            movePiece(selectedPiece, elem)
            pick = false
            break
          case 3:
            // selectedPiece.classList.remove('currentSelected')
            elem.classList.add('currentSelected')
            selectedPiece = elem
            pick = true
            break
          case 4:  // 2 and 4 the same
            movePiece(selectedPiece, elem)
            pick = false
            break
          case 5:  // 3 and 5 almost the same
            elem.classList.add('currentSelected')
            selectedPiece = elem
            pick = true
            break
        }

      }

      function clickSelect(elem) {
        if (pick) {
          selectedPiece.classList.remove('currentSelected')
          // dest = ownself, empty, same team, enemy
          if (elem.classList.contains('currentSelected')) {
            console.log('ownself')
            exchange(1, elem)
          } else if (!boxIsOccupied(elem)) {
            console.log('move to empty box')
            exchange(2, elem)
          } else if (!capturePiece(elem, selectedPiece)) {
            console.log('repick')
            exchange(3, elem)
          } else {
            console.log('capture')
            // exchange(4, elem)
            exchange(2, elem)
          }
        }
        else {
          if (boxIsOccupied(elem)) {
            console.log('pick')
            exchange(5, elem)
          }
        }
        console.log('pick', pick)
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

  // const $pieces = document.getElementById('pieces').querySelectorAll('.box')
  // $pieces.forEach(($piece) => {
  //   console.log($piece.innerHTML)
  //   $piece.addEventListener('click', function (e) {
  //     console.log(this.innerHTML)
  //     $pieces.forEach(($piece) => $piece.style.background = '')
  //     this.style.background = 'rgba(94, 82, 82, 0.5)';
  //     currentPiece = this.innerHTML
  //     $boxes.forEach(($box) => {
  //       if ($box.innerHTML !== '') $box.innerHTML = currentPiece
  //     })
  //   })
  // })


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
