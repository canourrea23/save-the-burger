const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')
const image = document.getElementById('krabby')
const image2 = document.getElementById('broccoli')
const image3 =document.getElementById('drop')
const image4 = document.getElementById('salad')
const sound = document.getElementById('sound')
const start = document.getElementById('start')
const fail = document.getElementById('fail')
const startGame = document.getElementById('status')
let playerStatus = true
// const gameScore = document.getElementById('status', 'score:, 0')
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

//burger
class Sprite {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = playerStatus
  }
  render() {
    ctx.drawImage(image, this.x, this.y, this.width, this.height)
  }
}
//veggies 
class Veggies {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = 1.20
    this.alive = true
  }
  render() {
    ctx.drawImage(image2, this.x += this.speed, this.y, this.width, this.height)
  } 
} 
//ketchup bullet
class Projectile {
  constructor(x, y, width, color, speed, height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.speed =-1.5
  }
  render() {
    ctx.drawImage(image3, this.x, this.y += this.speed, this.width, this.height)
  }
}
//shooting ketchup bullet
let fireStatus = 1
const arrProjectiles = [];
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'b' && fireStatus === 1) {
      const bullet = new Projectile(player.x - 1 + (player.width/2), player.y -5, 6, 'red', 25, 8)
      arrProjectiles.push(bullet)
      fireStatus *= -1
      setTimeout(fireReady, 350);
      sound.play()
    }
  });
  function fireReady() {
    fireStatus *= -1
  }
//my objects on screen
let player = new Sprite(180, 500, 25, 25, true)
// const bullet = new Projectile(190, 490, 2 , '#6645b3', 5, 7)
const veggie = new Veggies(145, 30, 30, 30)
  
// veggies array
const arrVeggies = [];                              
function populateVeggies() {
  for(let row = 0; row < 5; row++) {
     for(let col = 0; col < 9; col++){
      const veggie = new Veggies (
        col * 35 + 33, row * 35 + 15, 30, 30)
        arrVeggies.push(veggie)
     }
  }
}
//veggies movement 
populateVeggies()
  function changeMovement (resetStatus) {
    if (resetStatus) {
      arrVeggies.length = 0
      populateVeggies()
    } else
    arrVeggies.forEach(function(veggie) {
      if (veggie.x >= 360) {
        arrVeggies.forEach(function(ex) {         
          ex.speed *= -1                          
          ex.y += 25  
          ex.x -= 2 
        }) } else if (veggie.x <= 10) {
          arrVeggies.forEach(function(ex) {
            ex.speed *= -1
            ex.y += 25 
            ex.x += 2
          }) }           
        })
      }
        // player.render()
  //key controls
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowUp' && player.y > 420) {
      player.y -= 30
    } else if (evt.key === 'ArrowLeft' && player.x > 0) {
      player.x -= 30
    } else if (evt.key === 'ArrowDown' && player.y < 495) {
      player.y += 30
    } else if (evt.key === 'ArrowRight' && player.x < 360) {
      player.x += 30
    }
    
    // console.log(typeof evt.keyCode)
    movementDisplay.textContent = `X: ${player.x}, Y: ${player.y}`
  })
    // hit detection for the veggies being hit
    function detectHit() {
        for(a = 0; a < arrVeggies.length; a++) {
            for(b = 0; b < arrProjectiles.length; b++) {
                if(arrProjectiles[b].x < arrVeggies[a].x + 33
                    && arrProjectiles[b].x + 3.5 > arrVeggies[a].x
                    && arrProjectiles[b].y < arrVeggies[a].y + 30
                    && arrProjectiles[b].y + 17 > arrVeggies[a].y) {
                    arrVeggies.splice(a,1)
                    arrProjectiles.splice(b,1)
                    //gameScore += 50
                }
            }
        }
    }
    function detectPlayerHit() {
      for(a = 0; a < arrVeggies.length; a++) {
          // for(b = 0; b < player.length; b++) {
              if(player.x < arrVeggies[a].x + 33
                  && player.x + 3.5 > arrVeggies[a].x
                  && player.y < arrVeggies[a].y + 30
                  && player.y + 17 > arrVeggies[a].y) {
                  arrVeggies.splice(a,1)
                  player.width = 0
                  player.height = 0
                }
              }
      }
  // }

    //game win if array veggies gone  

    //resart function   
    function rePaint(resetStatus = false)  {
      if (resetStatus){
        arrVeggies.length = 0
        populateVeggies()
        if (fireStatus){
        } else fireStatus *= -1          
        arrProjectiles.length = 0
        player = new Sprite(180, 500, 25, 25)
      return }
      ctx.clearRect(0, 0, game.width, game.height)
      player.render()
      arrVeggies.forEach(function (veggie){
        if (veggie.alive) {
          veggie.render()
        }      
        detectHit()
        detectPlayerHit()
        
      })
      arrProjectiles.forEach(function (bullet){
        bullet.render()
      })
      changeMovement()
    }
    //start button and reset button 
    document.getElementById('status').addEventListener('click', function() {
      // let timer = setInterval(rePaint, 1000 / 60)
      if (document.getElementById('status').textContent === 'Start Game') {
        setInterval(rePaint, 1000 / 60)
        document.getElementById('status').textContent = 'Reset Game'
      } else if(document.getElementById('status').textContent ==='Reset Game') {
        for(i=0; i<100; i++)
      {
        window.clearInterval(i);
      }
        rePaint(true)
        document.getElementById('status').textContent = 'Start Game'
      }
    })
  // render the player and the veggies
  // player.render()
  // if (veggie.alive) {
  //   veggie.render()
  // }
  // detectHit()
// for (let row = 0; row < 5; row++) {
  //   for(let col = 0; col < 9; col++){
  //     const veggie = new Veggies (
  //       col * 35 + 33, row * 35 + 15, 30, 30)
  //       arrVeggies.push(veggie)
  //     }
  //   }
    // arrVeggies.forEach(function(par){
    //   par.render()
    // })

// function detectPlayerHit()
//   for (a = 0; a < arrVeggies.length; a++) {
//     for(b = 0; b < player. length; b++) {
//       if(player[b].x < arrVeggies[a].x + 33 &&
//     player.x < arrVeggies.x + arrVeggies.width &&
//     player.x + player.width > arrVeggies.x &&
//     player.y < arrVeggies.y + arrVeggies.height &&
//     player.y + player.height > arrVeggies.y) {
//      // collision detected!
//  } 
