
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

let $undo, $redo
let undoHistory = []
let redoHistory = []
let undoRedo = 0 // 0 - undo, 1 - redo
// let eventListeners = []
// let bc

let $moves
let moveNumber = 1

let castling = { "wk": { "l": 0, "r": 0 }, "bk": { "l": 0, "r": 0 } }

let skip2wl = false
let skip2wr = false
let skip2bl = false
let skip2br = false

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
    wk: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-2, 0], [2, 0]],
    // bp: [[-1, 1], [0, 1], [1, 1], [0, 2]],
    bp: [[0, 1], [0, 2], [-1, 1], [1, 1]],
    br: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]],
    bn: [[-1, -2], [1, -2], [-1, 2], [1, 2], [-2, -1], [-2, 1], [2, -1], [2, 1]],
    bb: [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    bq: [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]],
    bk: [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-2, 0], [2, 0]],
  }

  const checkRules = {}

  // const notation = { "s-00": "a8", "s-10": "b8", "s-20": "c8", "s-30": "d8", "s-40": "e8", "s-50": "f8", "s-60": "g8", "s-70": "h8", "s-01": "a7", "s-11": "b7", "s-21": "c7", "s-31": "d7", "s-41": "e7", "s-51": "f7", "s-61": "g7", "s-71": "h7", "s-00": "a6", "s-10": "b6", "s-20": "c6", "s-30": "d6", "s-40": "e6", "s-50": "f6", "s-60": "g6", "s-70": "h6" }


  // for (let i = 0; i < 16; i++) {
  //   const $divp = document.createElement('div')
  //   $divp.classList.add('bkpiece', t[i], s[i])
  //   $divp.innerHTML = p[i]
  //   $board.appendChild($divp)
  // }
  // for (let i = 16; i < 32; i++) {
  //   const $divp = document.createElement('div')
  //   $divp.classList.add('whpiece', t[i], s[i])
  //   $divp.innerHTML = p[i]
  //   $board.appendChild($divp)
  // }

  const ibkList = [0, 2, 4, 5, 7]

  ibkList.forEach(i => {
    console.log(i)
    const $divp = document.createElement('div')
    $divp.classList.add('bkpiece', t[i], s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  })

  const iwhList = [24, 26, 28, 29, 31]

  iwhList.forEach(i => {
    console.log(i)
    const $divp = document.createElement('div')
    $divp.classList.add('whpiece', t[i], s[i])
    $divp.innerHTML = p[i]
    $board.appendChild($divp)
  })

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

  $moves = document.querySelector('#moves')

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

  // initialize undo history
  saveHistory()

  $undo = document.querySelector('#undo')
  $undo.addEventListener('click', function () {
    undo()
  })

  $redo = document.querySelector('#redo')
  $redo.addEventListener('click', function () {
    redo()
  })

  // initialize undoHistory
  // savedHistory()

  // bc = $board.addEventListener('click', function () {
  //   console.log('click board')
  // })

  // eventListeners.push(bc)

  // cannot be with $piece mouseup 
  $board.addEventListener('mouseup', function (e) {
    console.log('$board.mouseup')

    const [sXY, dX, dY] = getPosition(e)
    // console.log('$board ' + 's-' + Math.floor(dx / dw) + Math.floor(dy / dh))
    if (pick) { // move picked piece to empty square
      console.log('move piece to empty square')
      // if (moveToEmptySquareIsValid(currentPiece, sXY)) {

      if ([...document.querySelectorAll('.hint')].find((e) => e.classList.item(1) === sXY)) {
        //  if not castling
        // occupy empty square
        movePiece(sXY, null)
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

      if (click) {
        console.log('mouseclick')

        if (pick) {
          // console.log('pick')

          // comparing sXY values; take piece
          if ([...document.querySelectorAll('.capture-hint')].find((e) => e.classList.item(1) === this.classList.item(2))) {
            // console.log('capture...')
            document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
            movePiece(sXY, this)
            setNextSquare(sXY)
            // removePiece(this)

            // console.log('exchange')
            pick = false
          } else { // pick another piece instead
            // console.log('what about repick?')
            selectPiece(this)
            if (currentPiece !== undefined) showHints(currentPiece)
          }
          // castling, only permitted if rook and king has not moved yet
          // if () {

          // }
        } else { // pick piece
          // console.log('first pick')
          selectPiece(this)
          if (currentPiece !== undefined) showHints(currentPiece)
        }


      } else { // mouse drag
        console.log('mousedragup')
        const targetPiece = document.querySelector('.' + sXY)
        currentPiece.classList.remove('dragging')
        currentPiece.removeAttribute("style")
        // console.log(this)
        // comparing sXY values
        if ([...document.querySelectorAll('.capture-hint')].find((e) => e.classList.item(1) === sXY)) {
          // console.log('capture...')
          document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
          movePiece(sXY, targetPiece)
          setNextSquare(sXY)
          // removePiece(targetPiece) // remove .capture-hint

          // console.log('exchange')
          pick = false
        }
        if ([...document.querySelectorAll('.hint')].find((e) => e.classList.item(1) === sXY)) {
          // console.log('capture...2')
          document.querySelectorAll('.hint, .capture-hint').forEach((e) => e.remove())
          movePiece(sXY, null)
          setNextSquare(sXY)

          // console.log('exchange')
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

  // sXY is the position the currentPiece is going to. targetPiece is the piece occupying that position
  function movePiece(sXY, targetPiece) {
    console.log('movePiece')
    const currentPieceColor = currentPiece.classList.item(0)
    const currentPieceType = currentPiece.classList.item(1)
    const currentPieceXY = currentPiece.classList.item(2)

    updateCurrentPiece(sXY, targetPiece)
    console.log('first updatecurrentpiece')
    console.log(castling.wk.r)

    // right side castling
    if (currentPieceType === 'bk' && currentPieceXY === 's-40' && sXY === 's-60') {
      if (castling.bk.r === 0) {
        // move rook
        console.log('castling')
        currentPiece = document.querySelector('.s-70')  // wr
        updateCurrentPiece('s-50', null)
        console.log('right second updatecurrentpiece')
      }
    }
    // left side castling
    if (currentPieceType === 'bk' && currentPieceXY === 's-40' && sXY === 's-20') {
      if (castling.bk.l === 0) {
        // move rook
        console.log('castling')
        currentPiece = document.querySelector('.s-00')  // wr
        updateCurrentPiece('s-30', null)
        console.log('left second updatecurrentpiece')
      }
    }
    // already move, only one castling allowed
    if (currentPieceType === 'bk') {
      castling.bk.r = 1
      castling.bk.l = 1
    }
    if (currentPieceType === 'br' && currentPieceXY === 's-00') {
      castling.bk.l = 1
    }
    if (currentPieceType === 'br' && currentPieceXY === 's-70') {
      castling.bk.r = 1
    }

    // right side castling
    if (currentPieceType === 'wk' && currentPieceXY === 's-47' && sXY === 's-67') {
      if (castling.wk.r === 0) {
        // move rook
        console.log('castling')
        currentPiece = document.querySelector('.s-77')  // wr
        updateCurrentPiece('s-57', null)
        console.log('right second updatecurrentpiece')
      }
    }
    // left side castling
    if (currentPieceType === 'wk' && currentPieceXY === 's-47' && sXY === 's-27') {
      if (castling.wk.l === 0) {
        // move rook
        console.log('castling')
        currentPiece = document.querySelector('.s-07')  // wr
        updateCurrentPiece('s-37', null)
        console.log('left second updatecurrentpiece')
      }
    }
    // already move, only one castling allowed
    if (currentPieceType === 'wk') {
      castling.wk.r = 1
      castling.wk.l = 1
    }
    if (currentPieceType === 'wr' && currentPieceXY === 's-07') {
      castling.wk.l = 1
    }
    if (currentPieceType === 'wr' && currentPieceXY === 's-77') {
      castling.wk.r = 1
    }

    switchTurn()
  }

  function updateCurrentPiece(sXY, targetPiece) {
    const currentPieceColor = currentPiece.classList.item(0)
    const currentPieceType = currentPiece.classList.item(1)

    currentPiece.classList.remove(...currentPiece.classList)
    currentPiece.classList.add(currentPieceColor)
    currentPiece.classList.add(currentPieceType)
    currentPiece.classList.add(sXY)

    // exchange pieces, replace targetPiece with currentPiece
    if (targetPiece !== null) removePiece(targetPiece)

    // switchTurn()

    saveHistory()
    writeMoves(currentPiece, targetPiece)
  }

  // function canCastle(currentPiece) {
  //   if (currentPiece.classList.item(1) === 'wk') {

  //     return false
  //   }
  //   return true
  // }

  function showHints(currentPiece) {
    const currentPieceColor = currentPiece.classList.item(0)
    const currentPieceType = currentPiece.classList.item(1)
    const currentPiecePosition = currentPiece.classList.item(2)
    const currPos = { x: 0, y: 0 }
    currPos.x = parseInt(currentPiecePosition[2])
    currPos.y = parseInt(currentPiecePosition[3])

    // Show hint
    document.querySelectorAll('.hint, .capture-hint, .threat').forEach((e) => e.remove())
    console.log('showHints', currentPieceType)

    let skip1 = false
    let safe = true

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

        // each branch is 7 squares long i.e. rook has top, left, bottom, right branches of squares. after scanning each branch for obstruction, reset the skip1 parameter and scan next branch
        if ((idx % 7) == 0) {
          skip1 = false
        }

        if (currentPieceType === 'wr' || currentPieceType === 'br' || currentPieceType === 'wb' || currentPieceType === 'bb' || currentPieceType === 'wq' || currentPieceType === 'bq') {
          const neighborSquare = document.querySelector('.' + sXY)

          // skip = false

          // if (newPos.x < currPos.x || newPos.x > currPos.x || newPos.y < currPos.y || newPos.y > currPos.y) { // [-1,0] to [-7,0]
          // }

          if (newPos.x !== currPos.x || newPos.y !== currPos.y) { // [-1,0] to [-7,0]
            if (neighborSquare) {
              const neighborSquareColor = neighborSquare.classList.item(0)
              if (currentPieceColor !== neighborSquareColor && !skip1) {
                const $div = createDivCaptureHint(sXY)
                checkKing(currentPiece, neighborSquare, $div)
              }

              skip1 = true
            }
          }

        }

        if (castling.wk.l === 1) {
          skip2wl = true
        }
        if (castling.wk.r === 1) {
          skip2wr = true
        }

        if (castling.bk.l === 1) {
          skip2bl = true
        }
        if (castling.bk.r === 1) {
          skip2br = true
        }

        // castling
        if (currentPieceType === 'bk') {
          // conditions where castling not allowed i.e. king, rook has moved, in line of fire, king checked
          // console.log('currPos.y', currPos.y)
          // if (idx > 7) skip1 = true
          // console.log('skip', skip, 'skip1', skip1, 'skip2bl', skip2bl, 'skip2br', skip2br)
          // console.log('castling.bk.l', castling.bk.l, 'castling.bk.r', castling.bk.r)
          // skip2 = false (can castle, show hint); skip1 = true (cannot castle, don't show hint)
          if (!skip2bl && !skip2br) {
            if (castling.bk.l === 1)
              if (idx === 8) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2bl = true
                // console.log('1b', castling.bk.l, idx)
              }
            if (castling.bk.r === 1)
              if (idx === 9) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2br = true
                // console.log('2b', castling.bk.r, idx)
              }
          }
          if (!skip2bl) {
            if (castling.bk.l === 1)
              if (idx === 8) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2bl = true
                // console.log('3b')
              }
          } else if (!skip2br) {
            if (castling.bk.r === 1)
              if (idx === 9) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2br = true
                // console.log('4b')
              }
          }
          else {

            console.log('idx', idx)

            if (idx === 8) { // cannot move diagonal if no enemy to take
              skip1 = true
              skip2bl = true
              // skip2br = true
              // console.log('5b')
            }
            if (idx === 9) { // cannot move diagonal if no enemy to take
              skip1 = true
              // skip2bl = true
              skip2br = true
              // console.log('6b')
            }
          }
        }

        if (currentPieceType === 'wk') {
          // conditions where castling not allowed i.e. king, rook has moved, in line of fire, king checked
          // console.log('currPos.y', currPos.y)
          // if (idx > 7) skip1 = true
          // console.log('skip', skip, 'skip1', skip1, 'skip2wl', skip2wl, 'skip2wr', skip2wr)
          // console.log('castling.wk.l', castling.wk.l, 'castling.wk.r', castling.wk.r)
          // skip2 = false (can castle, show hint); skip1 = true (cannot castle, don't show hint)
          if (!skip2wl && !skip2wr) {
            if (castling.wk.l === 1)
              if (idx === 8) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2wl = true
                // console.log('1', castling.wk.l, idx)
              }
            if (castling.wk.r === 1)
              if (idx === 9) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2wr = true
                // console.log('2', castling.wk.r, idx)
              }
          }
          if (!skip2wl) {
            if (castling.wk.l === 1)
              if (idx === 8) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2wl = true
                // console.log('3')
              }
          } else if (!skip2wr) {
            if (castling.wk.r === 1)
              if (idx === 9) { // cannot move diagonal if no enemy to take
                skip1 = true
                skip2wr = true
                // console.log('4')
              }
          }
          else {

            // console.log('idx', idx)

            if (idx === 8) { // cannot move diagonal if no enemy to take
              skip1 = true
              skip2wl = true
              // skip2wr = true
              // console.log('5')
            }
            if (idx === 9) { // cannot move diagonal if no enemy to take
              skip1 = true
              // skip2wl = true
              skip2wr = true
              // console.log('6')
            }
          }
        }


        // check if castling squares are not threaten
        if (0)
          if (currentPieceType === 'wk' || currentPieceType === 'bk') {
            safe = isSquareSafe(sXY)
            // console.log('safe',safe)
            if (!safe) {
              console.log(sXY, 'square not safe')
              // const $div = document.querySelector('.' + sXY)
              // console.log($div.classList.value)
            }
          }


        // !skip2wl and wk required to hide hint for castling if not valid anymore
        if (currentPieceType === 'bk') {
          if (!skip && !skip1 && !(skip2bl && idx === 8) && !(skip2br && idx === 9)) {
            // console.log(skip, skip1, skip2, skip3, skip4)

            const $div = document.createElement('div')
            $board.appendChild($div)
            const neighborSquare = document.querySelector('.' + sXY)

            if (safe || 1)
              if (neighborSquare === null) {
                safe = isSquareSafe(sXY)
                if (safe) $div.classList.add('hint', sXY)
                // console.log('add hint', idx)
              } else {

                const neighborSquareColor = neighborSquare.classList.item(0)
                // console.log(currentPieceColor, neighborSquareColor)
                if (currentPieceColor !== neighborSquareColor) {
                  checkKing(currentPiece, neighborSquare, $div)
                  $div.classList.add('capture-hint', sXY)

                }
              }
          }
        } else if (currentPieceType === 'wk') {
          if (!skip && !skip1 && !(skip2wl && idx === 8) && !(skip2wr && idx === 9)) {
            // console.log(skip, skip1, skip2, skip3, skip4)

            const $div = document.createElement('div')
            $board.appendChild($div)
            const neighborSquare = document.querySelector('.' + sXY)

            if (safe || 1)
              if (neighborSquare === null) {
                safe = isSquareSafe(sXY)
                if (safe) $div.classList.add('hint', sXY)
                // console.log('add hint', idx)
              } else {

                const neighborSquareColor = neighborSquare.classList.item(0)
                // console.log(currentPieceColor, neighborSquareColor)
                if (currentPieceColor !== neighborSquareColor) {
                  checkKing(currentPiece, neighborSquare, $div)
                  $div.classList.add('capture-hint', sXY)

                }
              }
          }
        }
        else {
          if (!skip && !skip1) {
            // console.log(skip, skip1, skip2, skip3, skip4)

            const $div = document.createElement('div')
            $board.appendChild($div)
            const neighborSquare = document.querySelector('.' + sXY)

            if (safe || 1)
              if (neighborSquare === null) {
                safe = isSquareSafe(sXY)
                if (safe) $div.classList.add('hint', sXY)
                // console.log('add hint', idx)
              } else {

                const neighborSquareColor = neighborSquare.classList.item(0)
                // console.log(currentPieceColor, neighborSquareColor)
                if (currentPieceColor !== neighborSquareColor) {
                  checkKing(currentPiece, neighborSquare, $div)
                  $div.classList.add('capture-hint', sXY)

                }
              }

          }
        }

      }
    })

    document.querySelectorAll('.capture-hint').forEach((e) => console.log(e.classList.value))

  }

  function checkKing(currentPiece, neighborSquare, $div) {
    const currentPieceColor = currentPiece.classList.item(0)
    const neighborSquareColor = neighborSquare.classList.item(0)
    if (currentPieceColor === "whpiece" && neighborSquare.classList.contains("bk")) {
      console.log('check')
      if ($div !== null) $div.classList.add('check')
    }
    if (currentPieceColor === "bkpiece" && neighborSquare.classList.contains("wk")) {
      console.log('check')
      if ($div !== null) $div.classList.add('check')
    }
  }

  // Check if square is safe to thread over during castling

  function isSquareSafe(pos_sXY) {
    // sXY of possible moves of king
    let safe = true
    let skip = false
    // console.log('is square safe?')

    const currentPieceColor = currentPiece.classList.item(0)
    const enemyPieceColor = currentPieceColor === 'whpiece' ? 'bkpiece' : 'whpiece'

    // const currentPieceType = currentPiece.classList.item(1)
    // const currentPiecePosition = currentPiece.classList.item(2)
    const currPos = { x: 0, y: 0 }
    currPos.x = parseInt(pos_sXY[2])
    currPos.y = parseInt(pos_sXY[3])

// for rook
    checkList = ['wr'] // 'wn'
    checkList.forEach((currentPieceType) => {
      console.log('currentPieceType', currentPieceType)
      moveRules[currentPieceType].forEach((i, idx) => {
        const newPos = { x: 0, y: 0 }
        newPos.x = currPos.x + i[0]
        newPos.y = currPos.y + i[1]
        // sXY for neighborSquareColor i.e. in line of attack by rook, knight, bishop
        const sXY = 's-' + newPos.x + newPos.y
        console.log(idx, i, sXY, skip, safe)
        if (newPos.x >= 0 && newPos.x < 8 && newPos.y >= 0 && newPos.y < 8) {
          // console.log(idx, i, sXY, skip, safe)

          if ((idx % 7) == 0) {
            // safe = true
            skip = false
            console.log('reset skip')
          }

          const elem = document.querySelector('.' + sXY)
          if (elem !== null) {
            if (!elem.classList.contains('hint')) {
              // if (!elem.classList.contains('wk')) {
              if (elem.classList.contains(enemyPieceColor) && !skip) {
                // check if enemy piece has the capability e.g. rook can only move straight, bishop can only move diagonal
                if (1) {
                  // simplify later
                  let possibleEnemy = false

                  if (elem.classList.item(1) === 'wr' || elem.classList.item(1) === 'br') possibleEnemy = true

                  console.log('possibleEnemy', possibleEnemy)
                  if (possibleEnemy) {
                    console.log(pos_sXY, 'under attack', elem.classList.value, skip, safe)
                    // console.log(elem.classList.contains('hint'))
                    safe = false
                    skip = true
                    const $div = document.createElement('div')
                    $board.appendChild($div)
                    $div.classList.add('threat', sXY)
                  }
                }
              } else if (elem.classList.contains(currentPieceColor)) {
                console.log('stop finding in path')
                skip = true
              }

              // }
            }
          } else { // unoccupied square
            // skip = false
          }
        }
      })
    })

// for bishop
    checkList = ['wb'] // 'wn'
    checkList.forEach((currentPieceType) => {
      console.log('currentPieceType', currentPieceType)
      moveRules[currentPieceType].forEach((i, idx) => {
        const newPos = { x: 0, y: 0 }
        newPos.x = currPos.x + i[0]
        newPos.y = currPos.y + i[1]
        // sXY for neighborSquareColor i.e. in line of attack by rook, knight, bishop
        const sXY = 's-' + newPos.x + newPos.y
        console.log(idx, i, sXY, skip, safe)
        if (newPos.x >= 0 && newPos.x < 8 && newPos.y >= 0 && newPos.y < 8) {
          // console.log(idx, i, sXY, skip, safe)

          if ((idx % 7) == 0) {
            // safe = true
            skip = false
            console.log('reset skip')
          }

          const elem = document.querySelector('.' + sXY)
          if (elem !== null) {
            if (!elem.classList.contains('hint')) {
              // if (!elem.classList.contains('wk')) {
              if (elem.classList.contains(enemyPieceColor) && !skip) {
                // check if enemy piece has the capability e.g. rook can only move straight, bishop can only move diagonal
                if (1) {
                  // simplify later
                  let possibleEnemy = false

                  if (elem.classList.item(1) === 'wb' || elem.classList.item(1) === 'bb') possibleEnemy = true

                  console.log('possibleEnemy', possibleEnemy)
                  if (possibleEnemy) {
                    console.log(pos_sXY, 'under attack', elem.classList.value, skip, safe)
                    // console.log(elem.classList.contains('hint'))
                    safe = false
                    skip = true
                    const $div = document.createElement('div')
                    $board.appendChild($div)
                    $div.classList.add('threat', sXY)
                  }
                }
              } else if (elem.classList.contains(currentPieceColor)) {
                console.log('stop finding in path')
                skip = true
              }

              // }
            }
          } else { // unoccupied square
            // skip = false
          }
        }
      })
    })

    return safe
  }

  function mapNotation(currentPiece, targetPiece) {
    const p = currentPiece.classList.item(1)
    const sXY = currentPiece.classList.item(2)
    const x = { 0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h" }
    const y = { 0: "8", 1: "7", 2: "6", 3: "5", 4: "4", 5: "3", 6: "2", 7: "1" }

    const e = targetPiece !== null ? 'x' : ''

    return p[1].toUpperCase() + e + x[sXY[2]] + y[sXY[3]]
  }

  function writeMoves(currentPiece, targetPiece) {
    let moveList = $moves.innerHTML
    const sXY = currentPiece.classList.item(2)
    // console.log(sXY, notation['' + sXY])
    if (currentPiece.classList.item(0) === 'whpiece') {
      moveList = moveList + '<br>' + moveNumber + '.' + mapNotation(currentPiece, targetPiece)
    } else {
      moveList = moveList + ' - ' + mapNotation(currentPiece, targetPiece)
      moveNumber++
    }
    $moves.innerHTML = moveList
    console.log('write moves')
  }

  function saveHistory() {
    const $boardClone = $board.cloneNode(true)
    const $movesClone = $moves.cloneNode(true)
    undoHistory.push([$boardClone, $movesClone])
    console.log('save history')
    // need to save event listeners too.....
  }

  function undo() {
    let $undoItem
    if (undoHistory.length > 0) {
      $undoItem = undoHistory.pop()
      // if (undoRedo === 1) $undoItem = undoHistory.pop()
      // undoRedo = 0
      if ($undoItem !== null || $undoItem !== undefined) {
        const $prevBoard = $undoItem[0]
        const $prevMoves = $undoItem[1]

        const $board = document.querySelector('#board')

        // $board.children[64-95]
        if ($prevBoard) {
          const $prevBoardClone = $prevBoard.cloneNode(true)
          const $movesClone = $moves.cloneNode(true)
          redoHistory.push([$prevBoardClone, $movesClone])

          for (let i = 64; i < 96; i++) {
            $board.children[i].classList.remove(...$board.children[i].classList)
            $board.children[i].classList.add(...$prevBoard.children[i].classList)
          }
        }

        if ($prevMoves !== null) $moves.innerHTML = $prevMoves.innerHTML
        // switchTurn()
      }
    }
  }

  function redo() {
    let $redoItem
    if (redoHistory.length > 0) {
      $redoItem = redoHistory.pop()
      // if (undoRedo === 0) $undoItem = undoHistory.pop()
      // undoRedo = 1
      if ($redoItem !== null || $undoItem !== undefined) {
        const $nextBoard = $redoItem[0]
        const $nextMoves = $redoItem[1]

        const $board = document.querySelector('#board')

        // $board.children[64-95]
        if ($nextBoard) {
          const $nextBoardClone = $nextBoard.cloneNode(true)
          const $movesClone = $moves.cloneNode(true)
          undoHistory.push([$nextBoardClone, $movesClone])

          for (let i = 64; i < 96; i++) {
            $board.children[i].classList.remove(...$board.children[i].classList)
            $board.children[i].classList.add(...$nextBoard.children[i].classList)
          }
        }

        if ($nextMoves !== null) $moves.innerHTML = $nextMoves.innerHTML
        // switchTurn()
      }
    }
  }

  function createDivCaptureHint(sXY) {
    const $div = document.createElement('div')
    $board.appendChild($div)
    $div.classList.add('capture-hint', sXY)
    return $div
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
    console.log('disabled switchTurn')
    if (1) {
      console.log(turn === 'whpiece' ? "black's turn" : "white's turn")
      turn = turn === 'whpiece' ? 'bkpiece' : 'whpiece'
      // savedHistory()
    }
    console.log(turn, '\'s turn')
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
