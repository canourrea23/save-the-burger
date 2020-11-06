const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')
const image = document.getElementById('krabby')
const image2 = document.getElementById('broccoli')
// syncing up the canvas's internal height&width to its apparent height&width
const computedStyle = getComputedStyle(game)
const height = computedStyle.height
const width = computedStyle.width

game.height = height.replace('px', '')
game.width = width.replace('px', '')




// grab a context from the canvas
const ctx = game.getContext('2d')

// document.getElementById('status').addEventListener('click', function() {
  //   setInterval(rePaint, 1000 / 60)
  // })
  
class Sprite {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
  }
  render() {
    ctx.drawImage(image, this.x, this.y, this.width, this.height)
  }
}
class Veggies {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = .50
    this.alive = true
  }
  render() {
    ctx.drawImage(image2, this.x += this.speed, this.y, this.width, this.height)
  }
  
} 
class Projectile {
  constructor(x, y, width, color, speed, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.speed =-2.5
  }
  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y += this.speed, this.width, this.height)
  }
}
let fireStatus = 1
const arrProjectiles = [];
  
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'b' && fireStatus === 1) {
      const bullet = new Projectile(player.x - 1 + (player.width/2), player.y -5, 2, 'red', 6, 8)
      arrProjectiles.push(bullet)
      fireStatus *= -1
      setTimeout(fireReady, 350);
      console.log(bullet)
    }
  });
  function fireReady() {
    fireStatus *= -1
  }
  
const player = new Sprite(180, 500, 25, 25)
  // const bullet = new Projectile(190, 490, 2 , '#6645b3', 5, 7)
const veggie = new Veggies(145, 30, 30, 30)
  
  
const arrVeggies = [];
for (let row = 0; row < 5; row++) {
  for(let col = 0; col < 9; col++){
    const veggie = new Veggies (
      col * 35 + 33, row * 35 + 15, 30, 30)
      arrVeggies.push(veggie)
    }
  }
  arrVeggies.forEach(function(par){
    par.render()
  })
  
  function changeMovement () {
    arrVeggies.forEach(function(veggie) {
      if (veggie.x >= 360) {
        arrVeggies.forEach(function(ex) {
          ex.speed *= -1
          ex.y += 15  
          ex.x -= 2 
        }) } else if (veggie.x <= 10) {
          arrVeggies.forEach(function(ex) {
            ex.speed *= -1
            ex.y += 15 
            ex.x += 2
          }) }
        })
      }
        // player.render()

  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowUp' && player.y > 420) {
      player.y -= 30
    } else if (evt.key === 'ArrowLeft' && player.x > 0) {
      player.x -= 30
    } else if (evt.key === 'ArrowDown' && player.y < 495) {
      player.y += 30
    } else if (evt.key === 'ArrowRight' && player.x < 360) {
      player.x += 30
    } else if (evt.keyCode === 32) {
      console.log('x', player.x)
      console.log('y', player.y)
      // Projectile.y
    }
    
    // console.log(typeof evt.keyCode)
    movementDisplay.textContent = `X: ${player.x}, Y: ${player.y}`
  })
    
    // function detectHit() {
      //   // hit coming in from the right
      //   if (bullet.x < veggies.x + veggies.width
      //     && bullet.x + bullet.width > veggies.x
      //     && bullet.y < veggies.y + veggies.height
      //     && bullet.y + bullet.height > veggies.y) {
        //     veggies.alive = false
        //   }
        // }

            
    function rePaint()  {
      ctx.clearRect(0, 0, game.width, game.height)
      player.render()
      arrVeggies.forEach(function (veggie){
        veggie.render()
    })
      arrProjectiles.forEach(function (bullet){
      bullet.render()
    })
      changeMovement()  
    }
    

    document.getElementById('status').addEventListener('click', function() {
      if (document.getElementById.textContent = 'Start Game') {
        setInterval(rePaint, 1000 / 60)
        document.getElementById('status').textContent = 'Reset Game'
      } else {
        
        
        
      
      }
    })
  //render the player and the veggies
//   player.render()
//   if (vegies.alive) {
//     veggies.render()
//   }

//   detectHit()





