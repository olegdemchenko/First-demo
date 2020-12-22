import printField from './src/task1.js';
import packEnvelope from './src/task2.js';
import sortTriangles from './src/task3.js';
import getPalindrome from './src/task4.js';
import analyzeTickets from './src/task5.js';
import createSequence from './src/task6.js';
import getFibonacciSequence from './src/task7.js';

const renderResults = (results, container) => {
  if (results.status === 'success') {
    container.classList.remove('border-danger', 'text-danger');
    container.classList.add('border', 'border-success');
    container.textContent = results.result;
    return;
  }
  container.classList.remove('border-success');
  container.classList.add('border', 'border-danger', 'text-danger');
  container.textContent = results.reason;
};

const decorateListener = (listener, container) => (...args) => { 
  let res;
  try {
    const result = listener(...args);
    res = { status: 'success', result };
  } catch (e) {
    res = { status: 'failed', reason: e.message };
  }
  renderResults(res, container);
};

const chessListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const width = Number(formData.get('width'));
  const height = Number(formData.get('height'));
  const symbol = formData.get('symbol');
  return printField(width, height, symbol);
};

const envelopesListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const a = Number(formData.get('a'));
  const b = Number(formData.get('b'));
  const c = Number(formData.get('c'));
  const d = Number(formData.get('d'));
  return packEnvelope({ a, b }, { c, d });
};

const trianglesListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = JSON.parse(formData.get('data'));
  return sortTriangles(data);
};

const palindromeListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const numb = Number(formData.get('number'));
  return getPalindrome(numb);
};

const ticketsListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const min = Number(formData.get('min'));
  const max = Number(formData.get('max'));
  return JSON.stringify(analyzeTickets({ min, max }));
};

const sequenceListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const startNumb = Number(formData.get('start'));
  const length = Number(formData.get('length'));
  return createSequence(startNumb, length);
};

const fibonachiListener = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const length = formData.get('length');
  const min = formData.get('min');
  const max = formData.get('max');
  const formValid = length || (min && max);
  if (!formValid) {
    throw new Error('Please, fill the length field or min, max fields');
  }
  return getFibonacciSequence({ min: Number(min), max: Number(max), length: Number(length) });
};

const domStorage = Array(7).fill('task').map((task, index) => task + (index + 1)).map((task) => {
  const taskElems = {
    task,
    form: document.querySelector(`.${task}-form`),
    resultField: document.querySelector(`.${task}-result`),
  }
  return taskElems;
});

const taskListeners = {
  task1: chessListener,
  task2: envelopesListener,
  task3: trianglesListener,
  task4: palindromeListener,
  task5: ticketsListener,
  task6: sequenceListener,
  task7: fibonachiListener,
}

domStorage.forEach(({ task, form, resultField }) => {
  form.addEventListener('submit', decorateListener(taskListeners[task], resultField));
});
