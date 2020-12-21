import { isNumberPositive, isStr, isObj, calculateSumm } from './utils.js';

const parseStr = (str) => str.split('').map((letter) => letter.toLowerCase());

const isTriangleExist = ([a, b, c]) => a + b > c && a + c > b && b + c > a;

const isValidTriangle = (triangle) => {
  if (!isStr(triangle.vertices)) {
    return false;
  }
  const vertices = parseStr(triangle.vertices);
  if (vertices.length !== 3) {
    return false;
  }
  const isVerticesValid = vertices.every((vertice) => isNumberPositive(triangle[vertice]));
  if (!isVerticesValid) {
    return false;
  }
  const verticesValues = vertices.map((vertice) => triangle[vertice]); 
  return isTriangleExist(verticesValues);
}

function validateArguments (triangles) {
  switch (true) {
    case !Array.isArray(triangles): {
      return 'Triangles arg must be array. Please, make sure that you use correct data type.';
    }
    case !triangles.every((triangle) => isObj(triangle)): {
      return 'Each triangle must be object. Please, make sure that you use correct data type.';
    }
    case !triangles.every((triangle) => isValidTriangle(triangle)): {
      return 'Each triangle must be valid. Please, make sure that each of triangles exist and contain valid vertice names and values.';
    }
    default: 
      return null;
  }
}

const getTriangleSquare = (values) => {
  const p = calculateSumm(...values) / 2;
  return Math.sqrt(p * (p - values[0]) * (p - values[1]) * (p - values[2]));
}
 
export default function sortTriangles (triangles) {
  const validationError = validateArguments(triangles);
  if (validationError) {
    throw new Error(validationError);
  }
  const trianglesWithSquares = triangles.map((triangle) => {
    const verticesNames = parseStr(triangle.vertices);
    const verticesValues = verticesNames.map((name) => triangle[name]);
    return { vertices: triangle.vertices, square: getTriangleSquare(verticesValues) }; 
  });
  return trianglesWithSquares.sort((a, b) => b.square - a.square).map(({ vertices }) => vertices);
}