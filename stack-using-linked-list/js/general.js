const nodes = document.querySelector('.node-container').children;

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
const operationBtns = document.querySelectorAll('#push-pop button');
operationBtns[0].addEventListener('click', () => {
  addElem(1);
});
operationBtns[1].addEventListener('click', () => {
  removeElem(1);
});

const searchBtns = document.querySelectorAll('#search button');
searchBtns[0].addEventListener('click', () => {
  searchElem(getKey.value);
});

const createBtns = document.querySelectorAll('#create button');
createBtns[0].addEventListener('click', () => {
  clearList();
});
createBtns[1].addEventListener('click', () => {
  if(getMultipleData.value === '')
    getMultipleData.value = '6,2,3,5';
  userDefinedList(getMultipleData.value);
});

// actions
function showOperations(option) {
  switch(option) {
    case 'Create':
      displayOperations(0);
      break;
    case 'Push & Pop': 
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
  const str = event.target.value;
  if(event.data === ',') {
    if(str.length === 1 || str.charAt(str.length - 2) === ',')
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