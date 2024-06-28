const nodes = document.querySelector('.array').children;

// option menu
const optionMenu = document.querySelector('.option-menu');
optionMenu.addEventListener('change', event => {
  document.querySelector('.notes').innerText = '';
  const first = event.target.firstElementChild;
  if(first.id === 'default')
    first.remove();
  showOperations(event.target.value);
});


// input fields
const getSize = document.querySelectorAll('.get-size');
getSize[0].placeholder = 'Size (ex: ' + (Math.floor(Math.random() * (15 - 1)) + 1) + ')';
getSize[0].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100);
});

getSize[1].placeholder = 'ex: ' + (Math.floor(Math.random() * (15 - 4)) + 4);
getSize[1].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100);
  switch(getSize[1].value) {
    case '1':
      getMultipleData.placeholder = 'ex: 35';
      break;
    case '2':
      getMultipleData.placeholder = 'ex: 62,35';
      break;
    case '3':
      getMultipleData.placeholder = 'ex: 4,11,3';
      break;
    default:
      getMultipleData.placeholder = 'ex: 6,2,3,5';
  }
});

const getData = document.querySelector('.get-data');
getData.placeholder = 'Data (ex: ' + (Math.floor(Math.random() * (100 - 1)) + 1) + ')';
getData.addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100);
});

const getKey = document.querySelector('.get-key');
getKey.placeholder = 'ex: ' + (Math.floor(Math.random() * (100 - 1)) + 1);
getKey.addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100); // position for deletion
});

const getMultipleData = document.querySelector('.get-multiple-data');
getMultipleData.addEventListener('input', (event) => {
  allowCommaSeparatedValues(event, 1, 100);
});


// buttons
const operationBtns = document.querySelectorAll('#enqueue-dequeue button');
operationBtns[0].addEventListener('click', () => {
  addElem(0);
});
operationBtns[1].addEventListener('click', () => {
  removeElem(1);
});

const searchBtns = document.querySelectorAll('#search button');
searchBtns[0].addEventListener('click', () => {
  searchElem(getKey.value);
});

const createBtns = document.querySelectorAll('#create button');
createBtns[1].addEventListener('click', () => {
  clearList(parseInt(getSize[0].value));
});
createBtns[3].addEventListener('click', () => {
  if(getMultipleData.value === '')
    getMultipleData.value = '6,2,3,5';
  userDefinedList(getMultipleData.value, parseInt(getSize[1].value));
});

// actions
function showOperations(option) {
  switch(option) {
    case 'Create':
      displayOperations(0);
      break;
    case 'Enqueue & Dequeue': 
      displayOperations(1);
      break;
    case 'Search': 
      displayOperations(2);
      break;
  }

  function displayOperations(showIdx) {
    const operationMenu = document.querySelector('.operations-container').children;
    for(let i = 0; i < operationMenu.length; i++) {
      if(i === showIdx && !operationMenu[i].classList.contains('displayBlock'))
        operationMenu[i].classList.add('displayBlock');
      else if(operationMenu[i].hasAttribute('class'))
        operationMenu[i].removeAttribute('class');
    }
  }
}

function allowOnlyNumber(event, lowerLimit, upperLimit) {
  if(event.inputType === 'deleteContentBackward')
    return;
  const data = parseInt(event.data);
  let value = event.target.value;
  if(!Number.isInteger(data) || parseInt(value) < lowerLimit || parseInt(value) >= upperLimit) {
    event.target.value = value.slice(0, value.length-1);
  }
}

function allowCommaSeparatedValues(event, lowerLimit, upperLimit) {
  if(event.inputType === 'deleteContentBackward')
    return;
  if(getSize[1].value === '') {
    const placeholder = getSize[1].placeholder;
    getSize[1].value = placeholder.match(/\d+/)[0];
  }
  const commaCount = parseInt(getSize[1].value) - 1;
  const str = event.target.value;
  if(event.data === ',') {
    if(str.length === 1 || str.charAt(str.length - 2) === ',' || str.match(/[,]/g).length > commaCount)
      event.target.value = str.slice(0, str.length - 1);
    return;
  }
  const data = parseInt(event.data);
  if(Number.isInteger(data)) {
    const presentNum = str.match(/\d+$/);
    if(presentNum < lowerLimit || presentNum > upperLimit)
      event.target.value = str.slice(0, str.length-1);
  } else 
    event.target.value = str.slice(0, str.length-1);
}