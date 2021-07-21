let selectdiv = undefined

document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body')
  let boarddiv
  // let selectdiv = undefined

  function createBoard() {
    const squareList = []
    boarddiv = document.createElement('div')
    boarddiv.setAttribute('class', 'board')
    boarddiv.style.background = '#333'
    // boarddiv.style.width = '450px'
    // boarddiv.style.height = '450px'
    body.appendChild(boarddiv)

    // createSelectSquare()
    boarddiv.addEventListener('mousemove', function (e) {
      // console.log(e.x, e.y)
      if (selectdiv) moveSelectSquare(e.x, e.y)
    })
    // for(j=0;j<3;j++){
    //   for(i=0;i<3;i++){
    //     createSquare()
    //   }
    // }

    for (i = 0; i < 9; i++) {
      createSquare(i)
    }

    // createSelectSquare()
    // boarddiv.addEventListener('click', function () {
    //   console.log('body click', selectdiv.innerHTML)
    //   const elem = document.getElementById('selectbox')
    //   elem.remove()
    // })


    boarddiv.addEventListener('click', () => {
      boarddiv.style.cursor = 'grab'
      console.log('board click')
    })
  }

  function createSelectSquare(x = "0px", y = "150px") {
    selectdiv = document.createElement('div')
    selectdiv.setAttribute('id', 'selectbox')
    selectdiv.innerHTML = '&#9817;'
    selectdiv.style.position = 'absolute';
    selectdiv.style.top = y;
    selectdiv.style.left = x;
    boarddiv.appendChild(selectdiv)

    selectdiv.addEventListener('click', function (e) {
      let sx = 150;
      let sy = 150;
      let i = -1
      let y = e.y
      let x = e.x
      sy += 219;
      sx += 11;
      console.log(sx, sy)
      // y -= 75;
      // x -= 75;
      if (y < sy) {
        if (x < sx) i++
        if (x < 2 * sx) i++
        if (x < 3 * sx) i++
      }
      if (y < 2 * sy) {
        if (x < sx) i++
        if (x < 2 * sx) i++
        if (x < 3 * sx) i++
      }
      if (y < 3 * sy) {
        if (x < sx) i++
        if (x < 2 * sx) i++
        if (x < 3 * sx) i++
      }
      console.log(x, y, i)
      // this.remove()
      // createSquare()
    })

    // selectdiv.addEventListener('mousemove', function(e) {
    //   console.log(e.x, e.y)
    //   moveSelectSquare(e.x, e.y)
    // })
  }

  function moveSelectSquare(x = "0px", y = "50px") {
    // console.log(x, y, pageXOffset, pageYOffset)
    y += pageYOffset;
    x += pageXOffset;
    y -= 75;
    x -= 75;
    selectdiv.style.top = y + "px";
    selectdiv.style.left = x + "px";
    selectdiv.style.cursor = "pointer"
  }

  function createSquare(i) {
    squarediv = document.createElement('div')
    squarediv.style.background = i % 2 ? "#eee" : '#888'
    squarediv.setAttribute('class', 'box')
    squarediv.setAttribute('id', 'id_' + i)
    if (i == 1) {
      squarediv.innerHTML = '&#9817;'
      squarediv.classList.add('occupied')
    }
    // const node = document.createTextNode('&#9817;')
    // squarediv.appendChild(node)
    boarddiv.appendChild(squarediv)

    squarediv.addEventListener('click', clickSquare)
  }

  function clickSquare(e, i) {
    console.log('click', e, i, this.getAttribute('id'))
    // this.innerHTML = this.innerHTML === '' ? this.innerHTML = '&#9817;' : this.innerHTML = ''
    boarddiv.style.cursor = 'crosshair';
    if (this.innerHTML !== '') {
      this.innerHTML = ''
      createSelectSquare()
      console.log('create select square')
      console.log(boarddiv.style.cursor)
      this.classList.remove('occupied')

      const elem = document.getElementById('selectbox')
      if (elem !== null) elem.style.cursor = 'grab';
      boarddiv.style.cursor = 'grab';
      console.log(boarddiv.style.cursor)
    } else {


      const elem = document.getElementById('selectbox')
      if (elem !== null) {
        elem.remove()
        this.innerHTML = '&#9817;'

        console.log('delete select square')
        this.classList.add('occupied')
        boarddiv.style.cursor = 'default';
        console.log(boarddiv.style.cursor)
      }
    }

    // alert(selectdiv)
    // if (selectdiv === undefined) {
    //   console.log('create select square')
    //   // createSelectSquare()
    //   console.log(selectdiv)
    // } else {
    //   console.log('delete select square')
    //   // selectdiv = undefined
    // }
  }

  createBoard()



})
