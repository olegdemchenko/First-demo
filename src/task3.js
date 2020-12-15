const isNumberValid = (number) => Number.isFinite(number) && number <= Number.MAX_SAFE_INTEGER && number > 0;

const isStrValid = (str) => typeof str === 'string' && str !== '';

const isObj = (arg) => typeof arg === 'object' && arg !== null;

const splitStr = (str) => str.split('').map((letter) => letter.toLowerCase());

const isTriangleExist = ([a, b, c]) => a + b > c && a + c > b && b + c > a;

const isValidTriangle = (triangle) => {
  if (!isStrValid(triangle.vertices)) {
    return false;
  }
  const vertices = splitStr(triangle.vertices);
  if (vertices.length !== 3) {
    return false;
  }
  const isVerticesValid = vertices.every((vertice) => isNumberValid(triangle[vertice]));
  if (!isVerticesValid) {
    return false;
  }
  const verticesValues = vertices.map((name) => triangle[name]); 
  return isTriangleExist(verticesValues);
}

function validateArguments (triangles) {
  switch (true) {
    case !Array.isArray(triangles): {
      return 'Triangles arg must be array';
    }
    case !triangles.every((triangle) => isObj(triangle)): {
      return 'Each triangle must be object';
    }
    case !triangles.every((triangle) => isValidTriangle(triangle)): {
      return 'Each triangle must be valid';
    }
    default: 
      return null;
  }
}

const getTriangleSquare = (values) => {
  const p = (values.reduce((summ, value) => summ + value, 0) / 2);
  return Math.sqrt(p * (p - values[0]) * (p - values[1]) * (p - values[2]));
}
        
function sortTriangles (triangles) {
  const validationError = validateArguments(triangles);
  if (validationError) {
    throw new Error(validationError);
  }
  const trianglesWithSquares = triangles.map((triangle) => {
    const verticesNames = splitStr(triangle.vertices);
    const values = verticesNames.map((name) => triangle[name]);
    return { vertices: triangle.vertices, square: getTriangleSquare(values) }; 
  });
  return trianglesWithSquares.sort((a, b) => b.square - a.square);
}