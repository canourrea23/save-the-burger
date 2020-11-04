const movementDisplay = document.querySelector('#movement')
const game = document.querySelector('#game')
const image = document.getElementById('krabby')
// const image = document.getElementById('broccoli')
// syncing up the canvas's internal height&width to its apparent height&width
const computedStyle = getComputedStyle(game)
const height = computedStyle.height
const width = computedStyle.width
// game.height = height.replace('px', '')
// game.width = width.replace('px', '')



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
class Projectile {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.velocity = velocity
    }
}

const player = new Sprite(145, 140, 10, 10)


player.render()

// document.getElementById('status').addEventListener('click', function() {
//   veggies.render()
// })

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'ArrowUp' && player.y > 110) {
    player.y -= 10
  } else if (evt.key === 'ArrowLeft' && player.x > 0) {
    player.x -= 10
  } else if (evt.key === 'ArrowDown' && player.y < 140) {
    player.y += 10
  } else if (evt.key === 'ArrowRight' && player.x < 290) {
    player.x += 10
  }
  console.log(player)
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
}
  //render the player and the veggies
//   player.render()
//   if (vegies.alive) {
//     veggies.render()
//   }

//   detectHit()
//}
 setInterval(rePaint, 1000 / 60) // 60 frames per second




