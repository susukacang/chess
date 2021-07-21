
let selectedPiece = '' // selectedPiece is an object
let pick = false
let ttop, tleft, dtop, dleft
let srect, trect
let $boxv

document.addEventListener('DOMContentLoaded', function () {

  let clickMode = false
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

  // $body.addEventListener('click', function(){
  //   document.body.style.cursor = "default"
  //     console.log('body')
  // })

  // const $box1 = document.getElementById('box1')
  // $box1.addEventListener('click', function () {
  //   document.body.style.cursor = "crosshair"
  //   // console.log('box1')
  //   if (this.innerHTML !== '') {
  //     console.log('box1 occupied')
  //     if (!selected) {
  //       selectedPiece = this.innerHTML
  //       $boxv.style.display = 'inline-flex'
  //       $boxv.innerHTML = this.innerHTML
  //       // $boxv.classList.add('move')

  //       this.innerHTML = ''
  //       this.style.background = '#f6f668'
  //     }
  //     selected = true
  //   } else {
  //     console.log('box1 vacant')
  //     if (selected) {
  //       this.innerHTML = selectedPiece
  //       this.style.background = '#bbca2b'
  //       $boxv.innerHTML = ''
  //       $boxv.style.display = 'none'
  //     }
  //     selected = false
  //   }

  // })

  // const $box2 = document.getElementById('box2')
  // $box2.addEventListener('click', function () {
  //   document.body.style.cursor = "default"
  //   // console.log('box2')

  //   if (this.innerHTML !== '') {
  //     console.log('box2 occupied')
  //     if (!selected) {
  //       selectedPiece = this.innerHTML
  //       $boxv.style.display = 'inline-flex'
  //       $boxv.innerHTML = this.innerHTML
  //       // $boxv.classList.add('move')

  //       this.innerHTML = ''
  //       this.style.background = '#f6f668'
  //     }
  //     selected = true
  //   } else {
  //     console.log('box2 vacant')
  //     if (selected) {
  //       this.innerHTML = selectedPiece
  //       this.style.background = '#bbca2b'
  //       $boxv.innerHTML = ''
  //       $boxv.style.display = 'none'
  //     }
  //     selected = false
  //   }
  // })

  let drag = false

  if (0) {
    $board.addEventListener('mousemove', function (e) {
      if (selected) {
        // console.log(e.x, e.y)
        $boxv.style.position = 'absolute'
        let y = pageYOffset + e.y - 50
        let x = pageXOffset + e.x - 50
        $boxv.style.top = y + "px"
        $boxv.style.left = x + "px"
        document.body.style.cursor = "grabbing"
      }
    })
  }
  if (0)
    $boxes.forEach(($box) => {
      console.log($box)
      // $box.addEventListener('mousedown', function (e) {
      //   if (selected) {
      //     drag = true
      //     console.log('drag', drag)
      //   }
      // })

      // $box.addEventListener('mouseup', function (e) {
      //   if (selected) {
      //     drag = false
      //     console.log('drag', drag)
      //   }
      // })

      $box.addEventListener('click', function () {
        console.log('click')
      })


      if (0) {

        $box.addEventListener('mousedown', function () {
          console.log('mousedown')
          document.body.style.cursor = "grab"
          // console.log('box1')
          if (this.innerHTML !== '') {
            console.log('box occupied')
            if (!selected) {
              selectedPiece = this.innerHTML
              $boxv.style.display = 'inline-flex'
              $boxv.innerHTML = this.innerHTML
              // $boxv.classList.add('move')

              this.innerHTML = ''
              $boxes.forEach(($box) => $box.style.background = '')
              this.style.background = '#f6f668'
              selected = true
              console.log('mouse down 1')

            } else {
              console.log('mouse down 2')
            }
            // selected = true
          } else {
            console.log('box vacant')
            if (selected) {
              this.innerHTML = selectedPiece
              this.style.background = '#bbca2b'
              $boxv.innerHTML = ''
              $boxv.style.display = 'none'
              selected = false
            }
            // selected = false
          }

        })
      }

      $box.addEventListener('mousedown', function () {
        console.log('mousedown', this.innerHTML)
        document.body.style.cursor = "grabbing"
        if (this.innerHTML !== '') {
          selected = true
          $boxv.style.display = 'inline-flex'
          $boxv.innerHTML = this.innerHTML
          selectedPiece = this.innerHTML
        }
        // if (this.innerHTML === '') {
        //   this.innerHTML = selectedPiece
        //   this.style.background = '#bbca2b'
        //   $boxv.innerHTML = ''
        //   $boxv.style.display = 'none'
        //   selected = false
        // }
      })


      $box.addEventListener('mouseup', function () {
        console.log('mouseup', this.innerHTML)
        document.body.style.cursor = "grab"
        if (this.innerHTML === '') {
          this.innerHTML = selectedPiece
          this.style.background = '#bbca2b'
          $boxv.innerHTML = ''
          $boxv.style.display = 'none'
          selected = false
        }
      })


      if (0)
        $box.addEventListener('mouseup', function () {
          document.body.style.cursor = "grab"
          console.log('mouseup')
          if (this.innerHTML !== '') {
            console.log('box occupied')
            console.log(selected)
            if (!selected) {
              selectedPiece = this.innerHTML
              $boxv.style.display = 'inline-flex'
              $boxv.innerHTML = this.innerHTML
              // $boxv.classList.add('move')

              this.innerHTML = ''
              $boxes.forEach(($box) => $box.style.background = '')
              this.style.background = '#f6f668'
              selected = true
              console.log('mouse up 1')
            } else {
              console.log('mouse up 2')
            }
          } else {
            console.log('box vacant')
            if (selected) {
              this.innerHTML = selectedPiece
              this.style.background = '#bbca2b'
              $boxv.innerHTML = ''
              $boxv.style.display = 'none'
              selected = false
            }
            // selected = false
          }
        })

      $box.addEventListener('mouseover', function () {
        if (this.innerHTML === '') document.body.style.cursor = "default"
        else document.body.style.cursor = "grab"
      })


    })

  $boxes.forEach(($box) => {
    if (0) {
      $box.addEventListener('mousemove', function (e) {
        if (clickMode === false) {
          // if (selected) {
          // console.log(e.x, e.y)
          $boxv.style.position = 'absolute'
          let y = pageYOffset + e.y - 50
          let x = pageXOffset + e.x - 50
          $boxv.style.top = y + "px"
          $boxv.style.left = x + "px"
          // document.body.style.cursor = "grabbing"
          // $boxv.style.display = 'inline-flex'
          // $boxv.innerHTML = this.innerHTML
          // }
        }
      })

      $board.addEventListener('mousemove', function (e) {
        if (clickMode === false)
          if ($boxv.innerHTML !== '') {
            document.body.style.cursor = "grabbing"
          }
      })

      $box.addEventListener('mousedown', function (e) {
        if (clickMode === false) {
          e.preventDefault()
          console.log('mousedown', $box.innerHTML)

          if (this.innerHTML !== '') {
            $boxv.style.display = 'inline-flex'
            $boxv.innerHTML = this.innerHTML
            this.innerHTML = ''
            document.body.style.cursor = "grabbing"
            selectedPiece = this
          }
          else document.body.style.cursor = "default"
        } else {
          e.preventDefault()
        }

      })

      $box.addEventListener('mouseup', function (e) {

        console.log('mouseup', this.innerHTML)
        if (clickMode === false) {
          // e.preventDefault()
          if (this.innerHTML !== '') {
            document.body.style.cursor = "grab"

            //  compare this.innerHTML and $boxv.innerHTML. if different color, eat. otherwise, do nothing
            const source = checkColor($boxv)
            const target = checkColor(this)
            if (source !== target) {
              console.log('take prisoner')
              this.innerHTML = $boxv.innerHTML
              $boxv.style.display = 'none'
              $boxv.innerHTML = ''
              document.body.style.cursor = "grab"
              selectedPiece = ''
            } else {
              console.log(source, target)
              console.log('walk away')
              console.log(selectedPiece)
              selectedPiece.innerHTML = $boxv.innerHTML
              $boxv.style.display = 'none'
              $boxv.innerHTML = ''
              selectedPiece = ''
            }

          }
          else { // this.innerHTML === ''
            this.innerHTML = $boxv.innerHTML
            $boxv.style.display = 'none'
            $boxv.innerHTML = ''
            document.body.style.cursor = "grab"
            selectedPiece = ''
          }
        }
        else { // clickMode !== false
          if (this.innerHTML !== '') {
            console.log('clicked and occupied')
          } else {
            console.log('clicked and vacant')
          }
          // clickMode = false // reset click
          // selectedPiece = ''
        }
      })

      $box.addEventListener('mouseover', function () {
        if (this.innerHTML === '') document.body.style.cursor = "default"
        else document.body.style.cursor = "grab"
      })
    }
    if (1)
      $box.addEventListener('click', function (e) {
        e.preventDefault()
        console.log('click', selectedPiece)
        clickMode = false
        console.log('click', clickMode)
        if (this.innerHTML !== '')
          if (pick === false) {
            pick = true
            selectedPiece = this
            console.log('pick')
            srect = selectedPiece.getBoundingClientRect()
            console.log(srect.top, srect.left)
            let y = srect.top
            let x = srect.left
            $boxv.style.top = y + "px"
            $boxv.style.left = x + "px"
          }
          else {
            // checkColor take or walk
            const source = checkColor(selectedPiece)
            const target = checkColor(this)
            if (source === target) {
              console.log('walk')
              pick = false
            } else {
              console.log('take')
              // this.innerHTML = selectedPiece.innerHTML
              // selectedPiece.innerHTML = ''
              // pick = false

              // srect = selectedPiece.getBoundingClientRect()
              trect = this.getBoundingClientRect()
              console.log(srect.top, srect.left)
              console.log(trect.top, trect.left)
              $boxv.innerHTML = selectedPiece.innerHTML
              $boxv.style.position = 'absolute'
              // let y = srect.top
              // let x = srect.left
              // $boxv.style.top = y + "px"
              // $boxv.style.left = x + "px"

              dtop = trect.top - srect.top
              dleft = trect.left - srect.left

              // $boxv.style.transform = "translate(0px,500px)"
              $boxv.style.transform = "translate(" + dleft + "px, " + dtop + "px)"
              // this.innerHTML = selectedPiece.innerHTML
              selectedPiece.innerHTML = ''
              selectedPiece = ''
              pick = false
            }
          }
        else {
          if (pick === true) {
            console.log('placed')
            pick = false
            this.innerHTML = selectedPiece.innerHTML
            selectedPiece.innerHTML = ''
            selectedPiece = ''
            // need to remove source piece
          } else {
            console.log('do nothing')
          }
        }

        console.log('pick', pick)


        if (0)
          if (selectedPiece === '') {
            console.log('no selectedPiece')
            if (this.innerHTML !== '') {
              selectedPiece = this
              $boxv.innerHTML = this.innerHTML
            } else {
              console.log('do nothing')
            }
          } else { // selectedPiece !== ''
            console.log('selectedPiece')
            if (this.innerHTML !== '') {
              console.log('checkColor and decide take/walk')
              // selectedPiece = this

              //  compare this.innerHTML and $boxv.innerHTML. if different color, eat. otherwise, do nothing
              // const source = checkColor($boxv)
              // const target = checkColor(this)
              // if (source !== target) {
              //   console.log('take prisoner')
              //   this.innerHTML = $boxv.innerHTML
              //   $boxv.style.display = 'none'
              //   $boxv.innerHTML = ''
              //   document.body.style.cursor = "grab"
              // } else {
              //   console.log(source, target)
              //   console.log('walk away')
              //   console.log(selectedPiece)
              //   selectedPiece.innerHTML = $boxv.innerHTML
              //   $boxv.style.display = 'none'
              //   $boxv.innerHTML = ''
              // }


            } else {
              console.log('occupy empty square/box')
              let s = selectedPiece.getBoundingClientRect()
              console.log(s.top, s.right, s.bottom, s.left)
              let t = $box.getBoundingClientRect()
              console.log(t.top, t.right, t.bottom, t.left)
              // $boxv.style.transform = 'translate(200px, 100px)'
              console.log(selectedPiece.innerHTML)
              $box.innerHTML = selectedPiece.innerHTML
              selectedPiece.innerHTML = ''
              $boxv.style.display = 'none'
              $boxv.innerHTML = ''
            }
          }

        // this.style.background = '#f6f668'
      })
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
    // el.innerHTML = whitepieces[0].value
    // console.log(el.innerHTML)
    let f = whitepieces.some(whitepiece => {

      el.innerHTML = whitepiece.value

      console.log(el.innerHTML, piece.innerHTML)
      return el.innerHTML == piece.innerHTML
    })
    if (f) return 'white'
    else return 'black'
  }


})
