
let pick = false
// let ttop, tleft, dtop, dleft
// let srect, trect

// let oldColor
let clickMode = true
let dt = 0.1
let cancelClick
let currentPiece
let click = true
let turn = 'whpiece' // whpiece, bkpiece
let $currentSquare
let $board
let $body
let $layout
let $box0
let dw, dh

let _At, _As

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

  $body = document.getElementsByTagName('body')[0]
  $layout = document.getElementById('layout')
  $board = document.getElementById('board')
  currentSquare = document.querySelector('#currentSquare')

  // const whitepieces = [{ name: 'KING', value: '&#9812;' }, { name: 'QUEEN', value: '&#9813;' }, { name: 'ROOK', value: '&#9814;' }, { name: 'BISHOP', value: '&#9815;' }, { name: 'KNIGHT', value: '&#9816;' }, { name: 'PAWN', value: '&#9817;' }]
  // const blackpieces = [{ name: 'KING', value: '&#9818;' }, { name: 'QUEEN', value: '&#9819;' }, { name: 'ROOK', value: '&#9820;' }, { name: 'BISHOP', value: '&#9821;' }, { name: 'KNIGHT', value: '&#9822;' }, { name: 'PAWN', value: '&#9823;' }]


  for (let i = 0; i < 64; i++) {
    // console.log(i)

    const $div = document.createElement('div')
    $div.classList.add('box')
    // $div.classList.add('noselect')
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
  // available pieces
  const t = ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
  // initial positions
  const s = ['s-00', 's-10', 's-20', 's-30', 's-40', 's-50', 's-60', 's-70', 's-01', 's-11', 's-21', 's-31', 's-41', 's-51', 's-61', 's-71', 's-06', 's-16', 's-26', 's-36', 's-46', 's-56', 's-66', 's-76', 's-07', 's-17', 's-27', 's-37', 's-47', 's-57', 's-67', 's-77']
  // physical pieces
  const p = ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;']
  // valid moves for pieces
  const moveRules = {
    // wp: [[-1, -1], [0, -1], [1, -1], [0, -2], [1, -1], [-1, -1]],
    wp: [[0, -1], [0, -2], [-1, -1], [1, -1]],
    wr: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    wn: [[-1, -2], [1, -2], [-1, 2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]],
    wb: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    wq: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    wk: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]],
    // bp: [[-1, 1], [0, 1], [1, 1], [0, 2]],
    bp: [[0, 1], [0, 2], [-1, 1], [1, 1]],
    br: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    bn: [[-1, -2], [1, -2], [-1, 2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]],
    bb: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    bq: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    bk: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]],
  }


  for (let i = 0; i < 16; i++) {
    const $divp = document.createElement('div')
    $divp.classList.add('bkpiece', t[i], s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  }
  for (let i = 16; i < 32; i++) {
    const $divp = document.createElement('div')
    $divp.classList.add('whpiece', t[i], s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  }

  const $pieces = document.getElementById('board').querySelectorAll('.whpiece, .bkpiece')

  const $divc = document.createElement('div')
  $divc.setAttribute('id', 'currentSquare')
  // $divc.classList.add('whpiece')
  $board.appendChild($divc)
  $currentSquare = document.querySelector('#currentSquare')

  const $divn = document.createElement('div')
  $divn.setAttribute('id', 'nextSquare')
  // $divc.classList.add('whpiece')
  $board.appendChild($divn)
  $nextSquare = document.querySelector('#nextSquare')

  $box0 = document.querySelector('.box')
  dw = $box0.offsetWidth
  dh = $box0.offsetHeight
  const boardRect = $board.getBoundingClientRect()

  let cancelMouseclick

  // https://css-tricks.com/working-with-javascript-media-queries/
  function checkMediaQuery() {
    // If the inner width of the window is greater then 768px
    // if (window.innerWidth > 768) {
    //   // Then log this message to the console
    //   console.log('Media Query Matched!')
    // }
    $box0 = document.querySelector('.box')
    dw = $box0.offsetWidth
    dh = $box0.offsetHeight
    console.log('window resize', dw)
  }

  // Add a listener for when the window resizes
  window.addEventListener('resize', checkMediaQuery);


  // cannot be with $piece mouseup 
  $board.addEventListener('mouseup', function (e) {
    console.log('$board.mouseup')

    const [sXY, dX, dY] = getPosition(e)
    // console.log('$board ' + 's-' + Math.floor(dx / dw) + Math.floor(dy / dh))
    if (pick) { // move picked piece to empty square
      console.log('move piece to empty square')
      // if (moveToEmptySquareIsValid(currentPiece, sXY)) {

      if ([...document.querySelectorAll('.hint')].find((e) => e.classList.item(1) === sXY)) {

        console.log('don\'t update currentpiece')
        updateCurrentPiece(sXY)
        setNextSquare(sXY)
        click = true
        pick = false
      }

    } else { // click on empty square, do nothing

      click = true
    }
  })

  function mousedownCallback(e, elem) {

    const [sXY, dX, dY] = getPosition(e)

    setCurrentSquare(sXY)

    if (turnIsCorrect(elem)) {
      click = false
      console.log('mousedown')
      currentPiece = elem
      if (currentPiece !== undefined) showHints(currentPiece)

    }
  }

  $pieces.forEach(($piece) => {

    $piece.addEventListener('mousedown', function (e) {
      console.log('$piece.mousedown')
      e.preventDefault()
      e.stopPropagation()

      cancelMouseclick = setTimeout(mousedownCallback, 500, e, this)

    })

    $piece.addEventListener('mouseup', function (e) {
      console.log('$piece.mouseup')
      e.preventDefault()
      e.stopPropagation()
      clearTimeout(cancelMouseclick)

      const [sXY, dX, dY] = getPosition(e)
      // console.log('$piece ' + sXY)

      if (click) {
        console.log('mouseclick')

        if (pick) {
          console.log('pick')
          console.log(document.querySelectorAll('.capture-hint'), this)
          console.log('debug', [...document.querySelectorAll('.capture-hint')].find((e) => console.log(e.classList.item(1), this.classList.item(2))))

          // comparing sXY values
          if ([...document.querySelectorAll('.capture-hint')].find((e) => e.classList.item(1) === this.classList.item(2))) {
            console.log('capture...')
            document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
            updateCurrentPiece(sXY)
            setNextSquare(sXY)
            removePiece(this)

            console.log('exchange')
            pick = false
          }
        } else {
          selectPiece(this)
          if (currentPiece !== undefined) showHints(currentPiece)
        }


      } else { // mouse drag
        console.log('mousedragup')
        const targetPiece = document.querySelector('.' + sXY)
        currentPiece.classList.remove('dragging')
        currentPiece.removeAttribute("style")
        console.log(this)
        // comparing sXY values
        if ([...document.querySelectorAll('.capture-hint')].find((e) => e.classList.item(1) === sXY)) {
          console.log('capture...')
          document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
          updateCurrentPiece(sXY)
          setNextSquare(sXY)
          removePiece(targetPiece) // remove .capture-hint

          console.log('exchange')
          pick = false
        }
        if ([...document.querySelectorAll('.hint')].find((e) => e.classList.item(1) === sXY)) {
          console.log('capture...2')
          document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
          updateCurrentPiece(sXY)
          setNextSquare(sXY)

          console.log('exchange')
          pick = false
        }

        click = true

      }

    })

    // ref: https://stackoverflow.com/questions/5758090/dragging-a-div-in-jquery-fine-when-mouse-is-slow-but-fails-on-fast-mouse-move
    $board.addEventListener('mousemove', function (e) {
      // e.preventDefault()
      // e.stopPropagation()

      if (!click) {
        const currentPieceColor = currentPiece.classList.item(0)
        let [sXY, dX, dY] = getPosition(e)
        dX -= 50
        dY -= 50
        currentPiece.classList.add('dragging')
        currentPiece.style.transform = "translate(" + dX + "%, " + dY + "%)"
        currentPiece.style.cursor = "grabbing"
      }
    })
  })

  function getPosition(e) {
    const boardRectXOffset = pageXOffset - boardRect.left
    const boardRectYOffset = pageYOffset - boardRect.top
    const dx = boardRectXOffset + e.x
    const dy = boardRectYOffset + e.y
    const dX = dx / dw * 100
    const dY = dy / dh * 100
    const sXY = 's-' + Math.floor(dx / dw) + Math.floor(dy / dh)

    return [sXY, dX, dY]
  }

  function updateCurrentPiece(sXY) {
    const currentPieceColor = currentPiece.classList.item(0)
    const currentPieceType = currentPiece.classList.item(1)

    currentPiece.classList.remove(...currentPiece.classList)
    currentPiece.classList.add(currentPieceColor)
    currentPiece.classList.add(currentPieceType)
    currentPiece.classList.add(sXY)

    switchTurn()
  }

  function showHints(currentPiece) {
    // need to clean up code i.e split into two functions (1) hint div creation (2) exchange. note that once the return statements above are executed, the following routine will be skipped. This routine is also executed when a piece is picked.
    currentPieceColor = currentPiece.classList.item(0)
    currentPieceType = currentPiece.classList.item(1)
    currentPiecePosition = currentPiece.classList.item(2)
    const currPos = { x: 0, y: 0 }
    currPos.x = parseInt(currentPiecePosition[2])
    currPos.y = parseInt(currentPiecePosition[3])

    // Show hint
    document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
    console.log('showHints', currentPieceType)

    let skip1 = false
    let skip2 = false
    let skip3 = false
    let skip4 = false
    let skip5 = false
    let skip6 = false
    let skip7 = false
    let skip8 = false

    moveRules[currentPieceType].forEach((i, idx) => {
      const newPos = { x: 0, y: 0 }
      newPos.x = currPos.x + i[0]
      newPos.y = currPos.y + i[1]
      const sXY = 's-' + newPos.x + newPos.y

      if (newPos.x >= 0 && newPos.x < 8 && newPos.y >= 0 && newPos.y < 8) {

        let skip = false
        if (currentPieceType === 'wp')
          if (currPos.y < 6) { // after initial move, pawn can on advance one step
            if (idx == 1) {
              skip = true
            }
          }
        if (currentPieceType === 'bp')
          if (currPos.y > 1) { // after initial move, pawn can on advance one step
            if (idx == 1) {
              skip = true
            }
          }
        if (currentPieceType === 'wp' || currentPieceType === 'bp') {
          if (idx == 0 || idx == 1) {
            if (document.querySelector('.' + sXY) !== null) { // cannot occupy square in front if occupied
              skip = true
            }
          }
          if (idx == 2 || idx == 3) { // cannot move diagonal if no enemy to take
            if (document.querySelector('.' + sXY) === null) {
              skip = true
            }
          }
        }

        if (idx == 7 || idx == 14 || idx == 21 || idx == 28 || idx == 35 || idx == 42 || idx == 49 || idx == 56) {
          skip1 = false
          skip2 = false
          skip3 = false
          skip4 = false
          skip5 = false
          skip6 = false
          skip7 = false
          skip8 = false
        }

        if (currentPieceType === 'wr' || currentPieceType === 'br' || currentPieceType === 'wb' || currentPieceType === 'bb') {
          const neighborSquare = document.querySelector('.' + sXY)

          skip = false
          if (newPos.x < currPos.x) { // [-1,0] to [-7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip1) {
                createDivCaptureHint(sXY)
              }

              skip1 = true
            }
          } else if (newPos.x > currPos.x) { // [1,0] to [7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip2) {
                createDivCaptureHint(sXY)
              }

              skip2 = true
            }
          } else if (newPos.y < currPos.y) { // [0,-1] to [0,-7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip3) {
                createDivCaptureHint(sXY)
              }

              skip3 = true
            }
          } else if (newPos.y > currPos.y) { // [0,1] to [0,7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip4) {
                createDivCaptureHint(sXY)
              }

              skip4 = true
            }
          }

        }

        if (currentPieceType === 'wq' || currentPieceType === 'bq') {
          const neighborSquare = document.querySelector('.' + sXY)

          skip = false
          if (newPos.x < currPos.x && newPos.y === currPos.y) { // [-1,0] to [-7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip1) {
                createDivCaptureHint(sXY)
              }

              skip1 = true
            }
          } else if (newPos.x > currPos.x && newPos.y === currPos.y) { // [1,0] to [7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip2) {
                createDivCaptureHint(sXY)
              }

              skip2 = true
            }
          } else if (newPos.x === currPos.x && newPos.y < currPos.y) { // [0,-1] to [0,-7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip3) {
                createDivCaptureHint(sXY)
              }

              skip3 = true
            }
          } else if (newPos.x === currPos.x && newPos.y > currPos.y) { // [0,1] to [0,7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip4) {
                createDivCaptureHint(sXY)
              }

              skip4 = true
            }
          }
          if (newPos.x < currPos.x && newPos.y < currPos.y) { // [-1,0] to [-7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip1) {
                createDivCaptureHint(sXY)
              }

              skip5 = true
            }
          } else if (newPos.x > currPos.x && newPos.y > currPos.y) { // [1,0] to [7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip2) {
                createDivCaptureHint(sXY)
              }

              skip6 = true
            }
          } else if (newPos.x < currPos.x && newPos.y > currPos.y) { // [0,-1] to [0,-7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip3) {
                createDivCaptureHint(sXY)
              }

              skip7 = true
            }
          } else if (newPos.x > currPos.x && newPos.y < currPos.y) { // [0,1] to [0,7]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip4) {
                createDivCaptureHint(sXY)
              }

              skip8 = true
            }
          }

        }

        if (!skip && !skip1 && !skip2 && !skip3 && !skip4 && !skip5 && !skip6 && !skip7 && !skip8) {
          console.log(skip, skip1, skip2, skip3, skip4)

          const $div = document.createElement('div')
          $board.appendChild($div)
          const neighborSquare = document.querySelector('.' + sXY)

          if (neighborSquare === null) {
            $div.classList.add('hint', sXY)
          } else {

            const neighborSquareColor = neighborSquare.classList.item(0)
            if (currentPieceColor !== neighborSquareColor) {
              $div.classList.add('capture-hint', sXY)

            }
          }

        }
      }
    })

    document.querySelectorAll('.capture-hint').forEach((e) => console.log(e.classList.value))

  }

  function createDivCaptureHint(sXY) {
    const $div = document.createElement('div')
    $board.appendChild($div)
    $div.classList.add('capture-hint', sXY)
  }

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  function removePiece(elem) {
    elem.classList.remove(...elem.classList)
    elem.classList.add('disabled')
  }

  function reselectPiece(currrentPiece, newPiece) {
    newPiece.classList.add('currentSelected')
    currentPiece.classList.remove('currentSelected')
    currentPiece = newPiece
    console.log(newPiece.classList.value)
  }

  function switchTurn() {
    console.log(turn === 'whpiece' ? "black's turn" : "white's turn")
    turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
  }

  function selectPiece(elem) {
    if (turnIsCorrect(elem)) {
      console.log('pick')
      elem.classList.add('currentSelected')
      currentPiece = elem
      pick = true
      click = true
    }
  }

  function turnIsCorrect(elem) {
    if (elem.classList.item(0) == turn) return true
    return false
  }

  function setCurrentSquare(sXY) {
    if (!pick)
      $nextSquare.classList.remove(...$nextSquare.classList)

    $currentSquare.classList.remove(...$currentSquare.classList)
    const X = parseInt(sXY.slice(2, 3))
    const Y = parseInt(sXY.slice(3))
    const n = X + Y
    console.log(n)
    const color = n % 2 == 0 ? 'whcurrent' : 'bkcurrent'
    $currentSquare.classList.add(color)
    $currentSquare.classList.add(sXY)

    console.log('moved current square')
  }

  function setNextSquare(sXY) {
    $nextSquare.classList.remove(...$nextSquare.classList)
    const X = parseInt(sXY.slice(2, 3))
    const Y = parseInt(sXY.slice(3))
    const n = X + Y
    console.log(n)
    const color = n % 2 == 0 ? 'whcurrent' : 'bkcurrent'
    $nextSquare.classList.add(color)
    $nextSquare.classList.add(sXY)

    console.log('moved next square')
  }


})
