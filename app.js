const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')
const image = document.getElementById('krabby')
const image2 = document.getElementById('broccoli')
const image3 =document.getElementById('drop')
const image4 = document.getElementById('lose')
const sound = document.getElementById('sound')
const start = document.getElementById('start')
const fail = document.getElementById('fail')
const score = document.getElementById('top-left')

let playerImage = image
var gameScore = 0;
//make append element
let playerStatus = true
let playerHealth = 3
//const gameScore = document.getElementById('top-left', 'score:0')
// syncing up the canvas's internal height&width to its apparent height&width
const computedStyle = getComputedStyle(game)
const height = computedStyle.height
const width = computedStyle.width

game.height = height.replace('px', '')
game.width = width.replace('px', '')

// grab a context from the canvas
const ctx = game.getContext('2d')

//burger
class Sprite {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
  }
  render() {
    ctx.drawImage(playerImage, this.x, this.y, this.width, this.height)
  }
}
//veggies 
class Veggies {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = 5
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
let player = new Sprite(180, 500, 25, 25)
const veggie = new Veggies(145, 30, 30, 30)
  
// veggies array
const arrVeggies = [];                              
function populateVeggies() {
  for(let row = 0; row < 4; row++) {
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
                    gameScore += 25
                 }
            }
        }
    }
    function detectPlayerHit() {
      for(a = 0; a < arrVeggies.length; a++) {
              if(player.x < arrVeggies[a].x + 33
                  && player.x + 3.5 > arrVeggies[a].x
                  && player.y < arrVeggies[a].y + 30
                  && player.y + 17 > arrVeggies[a].y) {
                  arrVeggies.splice(a,1)
                  player.alive  =  false                 
                }
              } 
      }
      function spawn() {
        if (player.alive === false) {
          arrVeggies.splice(0, arrVeggies.length)
          populateVeggies()
          changeMovement()
          player.alive = true
          player.x = 180
          player.y = 500
          playerHealth -= 1
          if (playerHealth === 2) {
            document.getElementById('btm-left').textContent = 'Lives 🍔  🍔'
          } else if (playerHealth === 1) {
            document.getElementById('btm-left').textContent = 'Lives 🍔'
          }
        }
      }    
      function gameOver() {
        if (playerHealth < 1) {
          playerImage = image4  
          arrVeggies.length = 0         
          player.alive = true
          document.getElementById('btm-left').textContent = 'Game Over'
          start.pause()
          fail.play()
        }
      }     
      function gameWon() {
        if (arrVeggies.length === 0 && playerHealth > 0) {
          document.getElementById('btm-left').textContent = 'Game Won'
          player.alive = true
          player.render()          
        }
      }
        function scoreUpdate() {
         document.getElementById('top-left').textContent = 'SCORE:' + gameScore   
    }
    //resart function   
    function rePaint(resetStatus = false)  {
      if (resetStatus){
        arrVeggies.length = 0
        populateVeggies()
        
        if (fireStatus) {

        } else {
          fireStatus *= -1          
          arrProjectiles.length = 0
          player = new Sprite(180, 500, 25, 25)
          return 
        }
        player.render()
      }  

      ctx.clearRect(0, 0, game.width, game.height)
      arrVeggies.forEach(function (veggie){
        if (veggie.alive) {
          veggie.render()
        }        
        detectHit()
        detectPlayerHit()
        if (player.alive === true) {
          player.render()
        }
      })
      arrProjectiles.forEach(function (bullet){
        bullet.render()
      })
      changeMovement()
      scoreUpdate()
      spawn()
      gameOver()
      gameWon()
      
    }
    //start button and reset button 
    document.getElementById('status').addEventListener('click', function() {
      // let timer = setInterval(rePaint, 1000 / 60)
      if (document.getElementById('status').textContent === 'Start Game') {
        setInterval(rePaint, 1000 / 60)
        start.play()
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
    
  