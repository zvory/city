console.log('script running')
const ground = document.getElementById('ground')



let _counter = 0;
const counter = () => ++_counter;


const randomInRange = (low, high) => low+ (Math.random()*(high-low))

const emString = em => `${em}em`
const percentString = pct => `${pct}%`

const cubeEdgeLength  = 2
const cubeEdgeLengthEm = emString(cubeEdgeLength)


const getTransformForFace = (faceIndex, edgeLength) => {
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
    face.style.margin= -0.5*edgeLengthEm;
    face.style.width = edgeLengthEm;
    face.style.height = edgeLengthEm;
    face.style.position = 'absolute'
    face.classList.add('wireframe')
    
    // console.log(getTransformForFace(faceIndex, edgeLength))
    face.style.transform = getTransformForFace(faceIndex, edgeLength)
  }

  container.style.top = percentString(topPct)
  container.style.position ='absolute'
  container.style.left = percentString(leftPct)
  container.style.transformStyle = 'preserve-3d'
  container.style.transform = `translateZ(${edgeLengthEm})`

  ground.appendChild(container)

}


for (let i =0; i < 3; i++) {
  createCubeParams(4, randomInRange(3,93), randomInRange(3,93))
}
