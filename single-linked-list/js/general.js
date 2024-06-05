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
getData.placeholder = 'ex: ' + (Math.floor(Math.random() * (100 - 1)) + 1);
getData.addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100);
});

const getPosition = document.querySelectorAll('.get-position');
getPosition[0].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1)) + 1) + ')';
getPosition[0].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, nodes.length); // position for insertion
});
getPosition[1].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1 - 1)) + 1) + ')';
getPosition[1].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, nodes.length - 1); // position for deletion
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
const insertBtns = document.querySelectorAll('#insert button');
insertBtns[0].addEventListener('click', () => {
  addElem(1); // element before index 1
});
insertBtns[1].addEventListener('click', () => {
  addElem(nodes.length - 1); // element before index n - 1
});
insertBtns[2].addEventListener('click', () => {
  addElem(parseInt(getPosition[0].value));
});

const deleteBtns = document.querySelectorAll('#delete button');
deleteBtns[0].addEventListener('click', () => {
  removeElem(1); // element at index 1
});
deleteBtns[1].addEventListener('click', () => {
  removeElem(nodes.length - 2); // element at index n - 2 (before tail)
});
deleteBtns[2].addEventListener('click', () => {
  removeElem(parseInt(getPosition[1].value));
});

const searchBtns = document.querySelectorAll('#search button');
searchBtns[0].addEventListener('click', () => {
  searchElem(getKey.value);
});

const createBtns = document.querySelectorAll('#create button');
createBtns[0].addEventListener('click', () => {
  clearList();
});
createBtns[2].addEventListener('click', () => {
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
    case 'Insert': 
      displayOperations(1);
      break;
    case 'Delete': 
      displayOperations(2);
      break;
    case 'Search':
      displayOperations(3);
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