document.addEventListener('DOMContentLoaded', function () {

  let selected = false
  let selectedPiece = ''
  let currentPiece = '&#9817;'
  const $boxv = document.getElementById('boxv')
  const $body = document.getElementsByTagName('body')[0]
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
  const $board = document.getElementById('board')
  $board.addEventListener('mousemove', function (e) {
    if (selected) {
      console.log(e.x, e.y)
      $boxv.style.position = 'absolute'
      let y = e.y - 50
      let x = e.x - 50
      $boxv.style.top = y + "px"
      $boxv.style.left = x + "px"
      document.body.style.cursor = "grab"
    }
  })

  const $boxes = document.getElementById('board').querySelectorAll('.box')

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
      document.body.style.cursor = "crosshair"
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
        }
        selected = true
      } else {
        console.log('box vacant')
        if (selected) {
          this.innerHTML = selectedPiece
          this.style.background = '#bbca2b'
          $boxv.innerHTML = ''
          $boxv.style.display = 'none'
        }
        selected = false
      }

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
      $boxes.forEach(($box)=>{
        if($box.innerHTML !== '') $box.innerHTML = currentPiece
      })
    })
  })

})
