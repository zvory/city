console.log('script running')
const ground = document.getElementById('ground')



let _counter = 0;
const counter = () => ++_counter;


const randomInRange = (low, high) => Math.floor(low+ (Math.random()*(high-low)))

const emString = em => `${em}em`
const percentString = pct => `${pct}%`

const cubeEdgeLength  = 2
const cubeEdgeLengthEm = emString(cubeEdgeLength)


const getTransformForCubeFace = (faceIndex, edgeLength) => {
  const rotations = [
    'rotateY(0deg)',
    'rotateY(90deg)',
    'rotateY(180deg)',
    'rotateY(270deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)']
  return `${rotations[faceIndex]} translateZ(${edgeLength/2}em)`
}

const createCubeParams = (edgeLength, leftPct, topPct) => {
  const id = counter()
  const edgeLengthEm = emString(edgeLength)

  const container = document.createElement('div')
  container.id = `container-${id}`
  const faces = []
  for (let faceIndex = 0; faceIndex < 6; faceIndex ++) {
    const face  = document.createElement('div')
    face.id = `face-${faceIndex}-${id}`
    container.appendChild(face)
    face.style.backgroundColor = 'black'
    // face.style.margin= -0.5*edgeLengthEm;
    face.style.width = edgeLengthEm;
    face.style.height = edgeLengthEm;
    face.style.position = 'absolute'
    face.classList.add('wireframe')
    
    // console.log(getTransformForCubeFace(faceIndex, edgeLength))
    face.style.transform = getTransformForCubeFace(faceIndex, edgeLength)
  }

  container.style.top = percentString(topPct)
  container.style.position ='absolute'
  container.style.left = percentString(leftPct)
  container.style.transformStyle = 'preserve-3d'
  container.style.transform = `translateZ(${edgeLengthEm})`

  ground.appendChild(container)

}

const getTransformForRectangleFace = (faceIndex, width, height, depth) => {
  const rotations = [
    'rotateY(0deg)',
    'rotateY(90deg)',
    'rotateY(180deg)',
    'rotateY(270deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)']
  const translations = [
    depth/2,
    0,
    depth/2,
    depth/2,
    height,
    -2*height
  ]
  return `${rotations[faceIndex]} translateZ(${emString(translations[faceIndex])})`
}

const styleForFace = (faceIndex, width, height, depth) => {
  const transform = getTransformForRectangleFace(faceIndex, width, height, depth)
  const widthEm = emString(width)
  const heightEm = emString(height)
  const depthEm = emString(depth)
  const sizings = [
    {
      width: widthEm,
      height: heightEm,
    }, {
      width: depthEm,
      height: heightEm,
      left: emString(width-depth/2)
    }, {
      width: widthEm,
      height: heightEm,
    }, {
      width: depthEm,
      height: heightEm,
    }, {
      width: widthEm,
      height: depthEm,
      top: emString(height*2  - depth*0.5)
    }, {
      width: widthEm,
      height: depthEm,
      top: emString(height*2  - depth*0.5)
    }
  ]
  return {
    transform,
    ...sizings[faceIndex]
  }
}

const assignStyles = (element, styles) => {
  for (style in styles) {
    element.style[style] = styles[style]
  }
}

const createRectangularPrismParams = (width, height, depth, rotation) => {
  const id = counter()
  // const widthLengthEm = emString(width)
  // const widthLengthEm = emString(width)

  const container = document.createElement('div')
  container.id = `container-${id}`
  const faces = []
  // 0 - top
  // 1 - right
  // 2 - bottom
  // 3 - left
  // 4 - up
  // 5 - down
  for (let faceIndex = 0; faceIndex < 6; faceIndex ++) {
    if (faceIndex!==2) {


    
      const face  = document.createElement('div')
      face.id = `face-${faceIndex}-${id}`
      container.appendChild(face)
      // face.style.backgroundColor = 'black'
      // face.style.margin= -0.5*edgeLengthEm;
      // console.log(styleForFace(faceIndex, width, height, depth))
      // face.style = {...face.style, ...styleForFace(faceIndex, width, height, depth)}
      assignStyles(face, styleForFace(faceIndex,width, height, depth))
      // console.log(face.style)
      // face.style.width = edgeLengthEm;
      // face.style.height = edgeLengthEm;
      face.style.position = 'absolute'
      face.classList.add('wireframe')

      if (faceIndex === 1) {
        if (randomInRange(0, 10) == 0) {
          if (height > 6)
          face.innerHTML='<img src="edited.png" style="margin-left: 1em; margin-top: 0.5em; width: 1em">'
        } 
      } else if (faceIndex === 3) {
        if (randomInRange(0, 10) == 0) {
          if (height >4)
            face.innerHTML=`<img src="jvc-edited.png" style="margin-top: 1em; margin-left: ${depth-2}em; width: 1em">`// style="margin-left: 1em; margin-bottom: 0.5em; width: 1em">'
        } 
      } else if (faceIndex === 4) {
        if (randomInRange(0, 10) == 0) {
        if (width > 6)
            face.innerHTML=`<img src="amzn-edited.png" style="width: 4em; margin-top: ${depth-2}em; margin-left: 1em;">`// style="margin-top: 1rem; margin-left: ${depth-2}em; width: 1em
        }
      }

    }
    
    // console.log(getTransformForCubeFace(faceIndex, edgeLength))
    // face.style.transform = getTransformForCubeFace(faceIndex, edgeLength)
  }

  // container.style.top = percentString(topPct)
  // container.style.left = percentString(leftPct)
  container.style.position ='absolute'
  container.style.transformStyle = 'preserve-3d'
  container.style.transform = `rotateZ(${rotation}rad) translateZ(${emString(depth/2)})`

  return container

}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

const getMinIndex = arr => {
  let min = 0;
  arr.forEach((elt, index) => {
    if (elt <= arr[min])
      min = index
  })
  return min
}

const getMaxIndex = arr => {
  let max = 0;
  arr.forEach((elt, index) => {
    if (elt >= arr[max])
    max = index
  })
  return max
}

function uniq(a) {
  return a.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
  })
}


const getWidthHeightRotation = points => {
  const x = points.map(point => point[0])
  const xMinIndex = getMinIndex(x)
  const xMaxIndex = getMaxIndex(x)
  const y = points.map(point => point[1])
  const yMinIndex = getMinIndex(y)
  const yMaxIndex = getMaxIndex(y)

  if (uniq([xMinIndex, xMaxIndex, yMinIndex, yMaxIndex]).length === 3) {
    console.log('nonrotated shape detected')
  }

  const one = xMinIndex;
  const two = yMinIndex;
  const three = xMaxIndex;
  const four = yMaxIndex;

  const width = getDist([x[one],y[one]], [x[two], y[two]])
  const height = getDist([x[one],y[one]], [x[four], y[four]])
  const rotation = Math.atan((y[one]-y[two])/(x[two]-x[one]))

  const left = x[one]
  const top = y[one]

  return [width, height, rotation, left, top]
}

const getDist = (a, b) => Math.sqrt(Math.pow(a[0]-b[0],2) + Math.pow(a[1]-b[1],2))
const scaleFactor = 160
const threshHold = 2  * scaleFactor;

let added = 0;
buildings.forEach(building => {
  const points= building.points
  let depth = building.height / 3
  if (depth < 20)
    depth +=10
  // console.log(depth)
  const [width, height, rotation, left, top] = getWidthHeightRotation(points)
  const rect = createRectangularPrismParams(width * scaleFactor, height * scaleFactor, depth, rotation+Math.PI * Math.random() * 2)
  rect.style.top = percentString(top*100)
  rect.style.left = percentString(left*100)
  if (scaleFactor* scaleFactor * depth * width * height < threshHold)
    return

  ++added;
  ground.appendChild(rect)
  
})
console.log(added)

const randomAdded=50;
let randomThreshholdPassing = 0;
for (let i =0; i < randomAdded; i++) {
  const tl = [Math.random(), Math.random()]
  const width = Math.random()*20+3;
  const height = Math.random()*20+3;
  let depth = Math.floor(Math.random()*50)
  if (depth < 20)
    depth += 10
  const rect = createRectangularPrismParams(width, height, depth, Math.PI * Math.random() * 2)
  rect.style.top = percentString(Math.random()*400-150)
  rect.style.left = percentString(Math.random()*100)
  if (depth * width * height < threshHold * 5)
    continue
  ++ randomThreshholdPassing

  ground.appendChild(rect)
}
console.log('randoms: ', randomThreshholdPassing)

for (let i =0; i < 0; i++) {
  // createCubeParams(randomInRange(1,10), randomInRange(3,93), randomInRange(3,93))
  const rect = createRectangularPrismParams(randomInRange(2,30), randomInRange(2,30), randomInRange(2,30))
  // const rect = createRectangularPrismParams(12, 12,24) 
  // 20, 15, 3 -> 28.5
  //12, 24, 3 -> 46.5
  // 12, 24, 36 -> 30
  // 12, 24, 24, -> 36
  // 12, 12, 24, -> 12
  rect.style.top = percentString(randomInRange(0,90))
  rect.style.left = percentString(randomInRange(0,90))
  ground.appendChild(rect)
}
