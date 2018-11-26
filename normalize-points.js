const fs = require('fs');

// First I want to read the file
fs.readFile('./buildings-height-not-normalized.json',  "utf8",function read(err, data) {
    if (err) {
        throw err;
    }
    processFile(data)
});


const flatten = arr => [].concat.apply([], arr)

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};



function processFile(data) {
  const asJSON= JSON.parse(data)
  const xPoints = flatten(asJSON.map(building => building.points.map(point => point[0])))
  const xMin = xPoints.min()
  const xMax = xPoints.max()
  const yPoints = flatten(asJSON.map(building => building.points.map(point => point[1])))
  const yMin = yPoints.min()
  const yMax = yPoints.max()
  // console.log(yMin, xMin)
  
  const normalized = asJSON.map(building => ({
    height: building.height,
    points: building.points.map(point => [(point[0]-xMin)/(xMax-xMin), (point[1]-yMin)/(yMax-yMin)])
  }))

    console.log('const buildings = ' + JSON.stringify(normalized, null, 4))
    // console.log(normalized.length)
    
}
