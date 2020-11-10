# save-the-burger
Is a 2d game were the object is to shoot all the broccoli before the broccoli touchs you.
Play my game at https://canourrea23.github.io/

## To start
create and open HTML and add images, sounds and your containers

```
<div id="container">
    <aside id="top-left"><h2>SCORE:0</h2></aside>
    <aside id="top-right"><h2 id="movement"></h2></aside>
    <main>
      <canvas id="game" width="300" height="300"></canvas>
        <img src='./Krabby_Patty.png' id='krabby'>
        <img src='./broccoli.png' id='broccoli'>
```

### Layout
To use canvas you need to add it to your layout
```
canvas {
    background-image: url('https://media.istockphoto.com/videos/old-retro-video-game-arcade-clouds-moving-on-a-blue-sky-video-id532530708?s=640x640');
    background-repeat: repeat;
    width: 100%;
    height: 525px;
  }   

  #container {
  max-width: 50em;
  /* max-height: 950px; */
  background-color: green;
  margin: 0 auto;
  padding: 1em;
  display: grid;
  grid-gap: 1em;
  grid-template-rows: .25fr .5fr .25fr;   
  grid-template-columns: .25fr .5fr .25fr;
  grid-template-areas: "top-left game top-right"
                        "left game right"
                        "btm-left game btm-right";
  }
  ```

#### Functions and Rendering
Add functions to tell javaScript what to do with the objects

```
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
```

## Rules

one player against computer

you start with 3 lives 

where having objects increasingly coming down and you have to shoot at it before you get hit

shooting will be with [b] and to move ⬅⬆⬇➡

player can play freely across bottom floor and up can only go up 3 spaces 

shoot all the broccoli, you win!

