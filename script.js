console.log('script running')
const ground = document.getElementById('ground')



let _counter = 0;
const counter = () => ++_counter;


const randomInRange = (low, high) => low+ (Math.random()*(high-low))

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
  return `${rotations[faceIndex]} translateZ(${translations[faceIndex]}em)`
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
      top: emString(depth*2)
    }, {
      width: widthEm,
      height: depthEm,
      top: emString(depth*2)
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

const createRectangularPrismParams = (width, height, depth) => {
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
    const face  = document.createElement('div')
    face.id = `face-${faceIndex}-${id}`
    container.appendChild(face)
    // face.style.backgroundColor = 'black'
    // face.style.margin= -0.5*edgeLengthEm;
    // console.log(styleForFace(faceIndex, width, height, depth))
    // face.style = {...face.style, ...styleForFace(faceIndex, width, height, depth)}
    assignStyles(face, styleForFace(faceIndex,width, height, depth))
    console.log(face.style)
    // face.style.width = edgeLengthEm;
    // face.style.height = edgeLengthEm;
    face.style.position = 'absolute'
    face.classList.add('wireframe')
    
    // console.log(getTransformForCubeFace(faceIndex, edgeLength))
    // face.style.transform = getTransformForCubeFace(faceIndex, edgeLength)
  }

  // container.style.top = percentString(topPct)
  // container.style.left = percentString(leftPct)
  container.style.position ='absolute'
  container.style.transformStyle = 'preserve-3d'
  container.style.transform = `translateZ(${depth/2}em)`

  return container

}


for (let i =0; i < 1; i++) {
  // createCubeParams(randomInRange(1,10), randomInRange(3,93), randomInRange(3,93))
  // const rect = createRectangularPrismParams(randomInRange(5,5), randomInRange(12,12), randomInRange(16,16))
  const rect = createRectangularPrismParams(12, 20,16) 
  // 12 width -> 4 left
  // 17 width -> 9 left
  // 3 width -> -5 left
  // -> 
  rect.style.top = percentString(randomInRange(50,50))
  rect.style.left = percentString(randomInRange(30,30))
  ground.appendChild(rect)
}
