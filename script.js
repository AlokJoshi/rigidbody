window.addEventListener('load',function(){
  const canvas=document.getElementById('canvas1')
  const ctx=canvas.getContext('2d')
  canvas.width=window.innerWidth
  canvas.height=window.innerHeight

  const TYPE_LINE=1
  const TYPE_CIRCLE=2
  const TYPE_SQUARE=3
  const TYPE_IMAGE=4

  const COLOR_RED=1
  const COLOR_GREEN=2
  const COLOR_BLUE=3
  const COLOR_YELLOW=4
  const COLOR_RANDOM=5

  const MAX_INCREMENT = 0.2
  const MIN_INCREMENT = 0.01

  let line1=150
  let smoothness = 50
  // let fps = 5
  let theta = 0
  // let vx=0.05
  // let dist=0
  let angleMultiplier=0
  let sinAngleMultiplier=1
  let cosAngleMultiplier=1
  let timerid=0
  let useSinAngleMultiplier=false
  let useCosAngleMultiplier=false
  let drawingType = TYPE_CIRCLE
  let images=[]
  let imageSize = 100
  let imageNumber = 0
  let lineThickness = 1
  let radius=5
  let squareSize=5
  let color=COLOR_RED
  
  let line1El = document.getElementById('line1')
  line1El.value=line1
  let smoothnessEl = document.getElementById('smoothness')
  smoothnessEl.value=smoothness
  let angleMultiplierEl = document.getElementById('angleMultiplier')
  angleMultiplierEl.value = angleMultiplier
  let sinAngleMultiplierEl = document.getElementById('sinAngleMultiplier')
  sinAngleMultiplierEl.value=sinAngleMultiplier
  let cosAngleMultiplierEl = document.getElementById('cosAngleMultiplier')
  cosAngleMultiplierEl.value=cosAngleMultiplier
  let useSinAngleMultiplierEl=document.getElementById('useSinAngleMultiplier')
  useSinAngleMultiplierEl.checked =useSinAngleMultiplier
  let useCosAngleMultiplierEl=document.getElementById('useCosAngleMultiplier')
  useCosAngleMultiplierEl.checked =useCosAngleMultiplier
  ctx.strokeStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
  let imageSizeline1El = document.getElementById('imagesize')
  imageSizeline1El.value=imageSize
  let lineThicknessEl = document.getElementById('linethickness')
  lineThicknessEl.value = lineThickness
  let radiusEl = document.getElementById('radius')
  radiusEl.value = radius
  let squareSizeEl = document.getElementById('squaresize')
  squareSizeEl.value = squareSize

  let colorRedEl = document.getElementById('colorred')
  let colorGreenEl = document.getElementById('colorgreen')
  let colorBlueEl = document.getElementById('colorblue')
  let colorYellowEl = document.getElementById('coloryellow')
  let colorRandomEl = document.getElementById('colorrandom')

  
  let increment = getIncrement(smoothness)

  function draw(){
    ctx.beginPath()
    timerid = setInterval(function(){
      // ctx.moveTo(canvas.width/2,canvas.height/2)
      // ctx.beginPath()
      // ctx.arc(canvas.width/2,canvas.height/2,3,0,Math.PI*2)
      // ctx.fill()
      ctx.save()
      ctx.translate(canvas.width/2,canvas.height/2)

      //just ot study where this point lies
      // ctx.beginPath()
      // ctx.arc(0,0,2,0,Math.PI*2)
      // ctx.fill()

      ctx.rotate(theta)

      //just to figure out the y coordinate direction
      // ctx.beginPath()
      // ctx.moveTo(0,0)
      // ctx.lineTo(0,150)
      // ctx.stroke()
      // ctx.closePath()

      ctx.translate(0,line1)
      ctx.rotate(theta*angleMultiplier)
      ctx.translate(line1,0)
      // ctx.moveTo(0,0)
      // ctx.beginPath()

      //just ot study where this point lies
      // ctx.beginPath()
      // ctx.arc(0,0,2,0,Math.PI*2)
      // ctx.fill()

      // ctx.translate(line1*Math.sin(theta*7),0)
      // ctx.translate(line1*Math.tan(theta*5),0)
      if(useCosAngleMultiplier){
        ctx.translate(line1*Math.cos(cosAngleMultiplier*theta)*Math.cos(cosAngleMultiplier*theta),0)
      }
      if(useSinAngleMultiplier){
        ctx.translate(line1*Math.sin(sinAngleMultiplier*theta)*Math.sin(sinAngleMultiplier*theta),0)
      }
      // ctx.translate(dist,0)
      // dist+=vx
      // if(dist==5)
      // {dist=-5
      //   vx=0.01
      // }else {
      //   dist=5
      //   vx=-0.01
      // }

      // ctx.strokeStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
      // ctx.fillStyle=`red`
      // ctx.beginPath()
      // ctx.arc(0,0,20,0,Math.PI*2)
      // ctx.fill()
      // ctx.fillRect(0,0,2,2)
      if(drawingType==TYPE_LINE){
        if(color!=COLOR_RANDOM){
          ctx.strokeStyle= color==COLOR_RED?'red':color==COLOR_GREEN?'green':color==COLOR_BLUE?'blue':color==COLOR_YELLOW?'yellow':'black'
        }else{
          ctx.strokeStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`   
        }
        ctx.lineWidth=lineThickness
        ctx.lineTo(0,0)
        ctx.stroke()
      }else if(drawingType==TYPE_CIRCLE){
        ctx.strokeStyle='black'
        ctx.fillStyle=color==COLOR_RED?'red':color==COLOR_GREEN?'green':color==COLOR_BLUE?'blue':color==COLOR_YELLOW?'yellow':'black'
        ctx.beginPath()
        ctx.arc(0,0,radius,0,Math.PI*2)
        ctx.fill()
        ctx.stroke()
      }else if(drawingType==TYPE_SQUARE){
        ctx.strokeStyle='black'
        ctx.fillStyle=color==COLOR_RED?'red':color==COLOR_GREEN?'green':color==COLOR_BLUE?'blue':color==COLOR_YELLOW?'yellow':'black'
        ctx.fillRect(-squareSize/2,-squareSize/2,squareSize,squareSize)
        ctx.rect(-squareSize/2,-squareSize/2,squareSize,squareSize)
        ctx.stroke()
      }else if(drawingType==TYPE_IMAGE){
        let img = images[imageNumber]
        ctx.drawImage(img,0,0,img.width,img.height,-imageSize/2,-imageSize/2,imageSize,imageSize)
        imageNumber++
        if(imageNumber>=images.length)imageNumber=0
      }
      ctx.restore()
      ctx.restore()
      theta+=increment*Math.PI
      if(theta>2*Math.PI) clearInterval(timerid)
    },5)

    // ctx.closePath()
    // ctx.stroke()

    // ctx.beginPath()
    // ctx.strokeStyle="red"
    // ctx.moveTo(600,600)
    // ctx.lineTo(600,650)
    // ctx.stroke()
    // ctx.closePath()
    // ctx.beginPath()
    // ctx.moveTo(600,650)
    // ctx.strokeStyle="green"
    // ctx.lineTo(600,700)
    // ctx.stroke()
  
    // ctx.save()
    // ctx.strokeStyle="rgb(100,150,170)"
    // ctx.strokeStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
    // ctx.beginPath()
    
    // ctx.translate(canvas.width/2,canvas.height/2)
    // ctx.rotate(theta)
    // ctx.beginPath()
    // angle1+=0.1*Math.PI
    // ctx.moveTo(0,0)
    // ctx.lineWidth=2
    // ctx.strokeStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
    // ctx.lineTo(line1,0)
    // ctx.arc(line1,0,40,0,Math.PI*2)
    // ctx.stroke()
    // ctx.save()
    // ctx.translate(line2,0)
    // ctx.fillStyle=`rgb(${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)},${Math.floor(Math.random()*250)})`
    // ctx.fillRect(line2,0,15,15)
    // ctx.beginPath()
    // ctx.arc(line2,0,100,0,Math.PI*2)
    // ctx.stroke()
    // ctx.restore()
    // ctx.restore()
    // break
  }
  loadImages(images,draw)
  //draw()
  // function animate(timeStamp){
  //   const deltaTime=timeStamp-lastTime
  //   lastTime = timeStamp
  //   //ctx.clearRect(0,0,canvas.width,canvas.height)
  //   draw(deltaTime)
  //   requestAnimationFrame(animate)
  // }
  // animate(0)
  
  line1El.addEventListener('change',(el)=>{
    let value = el.target.value<10?10:el.target.value>300?300:el.target.value
    line1=value
    el.target.value=line1
  })
  smoothnessEl.addEventListener('change',(el)=>{
    smoothness=el.target.value
    increment = getIncrement(smoothness)
    console.log(increment)
  })
  sinAngleMultiplierEl.addEventListener('change',(el)=>{
    sinAngleMultiplier=el.target.value
  })
  cosAngleMultiplierEl.addEventListener('change',(el)=>{
    cosAngleMultiplier=el.target.value
  })
  useSinAngleMultiplierEl.addEventListener('change',(el)=>{
    useSinAngleMultiplier=el.target.checked
    console.log(useSinAngleMultiplier,useCosAngleMultiplier)
  })
  useCosAngleMultiplierEl.addEventListener('change',(el)=>{
    useCosAngleMultiplier=el.target.checked
    console.log(useSinAngleMultiplier,useCosAngleMultiplier)
  })

  let againEl = document.getElementById('again')
  againEl.addEventListener('click',(el)=>{
    theta=0
    draw() 
  })
  let clearEl = document.getElementById('clear')
  clearEl.addEventListener('click',(el)=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    clearInterval(timerid)
  })
  angleMultiplierEl.addEventListener('change',(el)=>{
    angleMultiplier=el.target.value
  })

  let typeLineEl = document.getElementById('typeline')
  typeLineEl.addEventListener('change',(el)=>{
    drawingType=TYPE_LINE
  })

  let typeCircleEl = document.getElementById('typecircle')
  typeCircleEl.addEventListener('change',(el)=>{
    drawingType=TYPE_CIRCLE
  })

  let typeSquareEl = document.getElementById('typesquare')
  typeSquareEl.addEventListener('change',(el)=>{
    drawingType=TYPE_SQUARE
  })

  let typeImageEl = document.getElementById('typeimage')
  typeImageEl.addEventListener('change',(el)=>{
    drawingType=TYPE_IMAGE
  })

  imageSizeline1El.addEventListener('change',(el)=>{
    imageSize=el.target.value
  })

  lineThicknessEl.addEventListener('change',(el)=>{
    lineThickness=el.target.value
  })

  radiusEl.addEventListener('change',(el)=>{
    radius=el.target.value
  })

  squareSizeEl.addEventListener('change',(el)=>{
    squareSize=el.target.value
  })

  colorRedEl.addEventListener('change',(el)=>{
    color=COLOR_RED
  })
  colorGreenEl.addEventListener('change',(el)=>{
    color=COLOR_GREEN
  })
  colorBlueEl.addEventListener('change',(el)=>{
    color=COLOR_BLUE
  })
  colorYellowEl.addEventListener('change',(el)=>{
    color=COLOR_YELLOW
  })
  colorRandomEl.addEventListener('change',(el)=>{
    color=COLOR_RANDOM
  })

  
  function getIncrement(smoothness){
    return smoothness*(MIN_INCREMENT-MAX_INCREMENT)/100 + MAX_INCREMENT
  }
})


function loadImages(images,callback){
  for (let i = 0; i < 24; i++) {
    let img = new Image();
    img.src=`./images/composition-${i+1}.png`
    images.push(img)
  }
  callback()
}
