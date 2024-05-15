const nodes = document.querySelector('.node-container').children;

const optionMenu = document.querySelector('.option-menu');
optionMenu.addEventListener('change', event => {
  document.querySelector('.notes').innerText = '';
  const first = event.target.firstElementChild;
  if(first.id === 'default')
    first.remove();
  showOperations(event.target.value);
});

const getData = document.querySelector('.get-data');
getData.addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100);
});

const getPosition = document.querySelectorAll('.get-position');
getPosition[0].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, nodes.length); // position for insertion
});
getPosition[1].addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, nodes.length - 1); // position for deletion
});

const getKey = document.querySelector('.get-key');
getKey.addEventListener('input', (event) => {
  allowOnlyNumber(event, 1, 100); // position for deletion
});

const insertBtns = document.querySelectorAll('#insertion button');
insertBtns[0].addEventListener('click', () => {
  addElem(1); // element before index 1
});
insertBtns[1].addEventListener('click', () => {
  addElem(nodes.length - 1); // element before index n - 1
});
insertBtns[2].addEventListener('click', () => {
  if(getPosition[0].value !== '') {
    addElem(parseInt(getPosition[0].value));
  }
});

const deleteBtns = document.querySelectorAll('#deletion button');
deleteBtns[0].addEventListener('click', () => {
  removeElem(1); // element at index 1
});
deleteBtns[1].addEventListener('click', () => {
  removeElem(nodes.length - 2); // element at index n - 2 (before tail)
});
deleteBtns[2].addEventListener('click', () => {
  if(getPosition[1].value !== '')
    removeElem(parseInt(getPosition[1].value));
});

const searchBtn = document.querySelector('#search button');
searchBtn.addEventListener('click', () => {
  if(getKey.value !== '')  
    searchElem(getKey.value);
});

function showOperations(option) {
  switch(option) {
    case 'Insert': 
      displayOperations(0);
      break;
    case 'Delete': 
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
  const data = parseInt(event.data);
  let value = event.target.value;
  if(!Number.isInteger(data) || parseInt(value) < lowerLimit || parseInt(value) >= upperLimit) {
    value = value.slice(0, value.length-1);
    event.target.value = value;
  }
}