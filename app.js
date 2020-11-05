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
        this.alive = true
    }
    render() {
        ctx.drawImage(image2, this.x, this.y, this.width, this.height)
    }
    
}

const player = new Sprite(180, 500, 25, 25)
const veggie = new Veggies(145, 30, 30, 30)


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
  const bullet = new Projectile(190, 490, 2 , '#6645b3', 5, 7)
  
player.render()

// document.getElementById('status').addEventListener('click', function() {
//   veggies.render()
// })

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'ArrowUp' && player.y > 420) {
    player.y -= 25
  } else if (evt.key === 'ArrowLeft' && player.x > 0) {
    player.x -= 25
  } else if (evt.key === 'ArrowDown' && player.y < 495) {
    player.y += 25
  } else if (evt.key === 'ArrowRight' && player.x < 360) {
    player.x += 25
  } else if (evt.keyCode === 32) {
    console.log('x', player.x)
    console.log('y', player.y)
    // Projectile.y
  }

  console.log(typeof evt.keyCode)
  movementDisplay.textContent = `X: ${player.x}, Y: ${player.y}`
})

// function detectHit() {
//   // hit coming in from the right
//   if (player.x < veggies.x + veggies.width
//     && player.x + player.width > veggies.x
//     && player.y < veggies.y + veggies.height
//     && player.y + player.height > veggies.y) {
//     veggies.alive = false
//   }
// }

function rePaint()  {
  // clear off the entire canvas
  ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    veggie.render()
    bullet.render()
    console.log(bullet)
}
  //render the player and the veggies
//   player.render()
//   if (vegies.alive) {
//     veggies.render()
//   }

//   detectHit()
//}
 setInterval(rePaint, 1000 / 60) // 60 frames per second




