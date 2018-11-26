const fs = require('fs');

// First I want to read the file
fs.readFile('./clipped-bounding-rect.json',  "utf8",function read(err, data) {
    if (err) {
        throw err;
    }
    processFile(data)
});

function processFile(data) {
  // console.log(data)
    const coupled = data
    .split('\n')
    .reduce((result, value, index, array)  => {
      if (index % 2 === 0)
        result.push(array.slice(index, index + 2));
      return result;
    }, [])
    .map((pair) => {
      // console.log(pair[0])
      const points = JSON.parse(pair[0])
      const otherData = pair[1]
      if (otherData.indexOf('height') === -1)
        return null
      const suffix = otherData.slice(otherData.indexOf('height'))
      const startsWithHeight = suffix.slice(suffix.indexOf('>') + 1)
      const height = parseInt(startsWithHeight.slice(1, suffix.indexOf('"')))
      return {
        points,
        height
      }

    }).filter(Boolean)

    console.log(JSON.stringify(coupled, null, 4))
    
}
