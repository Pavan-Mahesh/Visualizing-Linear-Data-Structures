const ELEM_WIDTH = 58.28;
const SCALE = 0.35;

let currentIdx = 0;

function addElem() {
  const notes = document.querySelector('.notes');
  
  if(currentIdx === nodes.length) {
    notes.innerText = `Stack is full`;
    return;
  }

  if(getData.value === '') {
    const placeholder = getData.placeholder;
    getData.value = placeholder.match(/\d+/)[0];
  }

  notes.innerText = `Adding element to Stack`;
  getData.disabled = true;
  disableButtons(operationBtns);
  const node = nodes[currentIdx];
  node.firstElementChild.innerText = getData.value;

  moveTopAnimation();

  function moveTopAnimation() {
    const topContiner = document.querySelector('#top-container');
    const initialWidth = topContiner.getBoundingClientRect().width;
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        scaleInAnimation();
        return;
      }
      count++;
      topContiner.style.width = (initialWidth + (count * (ELEM_WIDTH / turns))) + 'px';
    }, 10);
  }
  
  function scaleInAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        notes.innerText = `Added ${getData.value} to Stack`;
        currentIdx++;
        getData.value = '';
        getData.placeholder = 'Data (ex: ' + (Math.floor(Math.random() * (100 - 1) + 1)) + ')';
        getData.disabled = false;
        enableButtons(operationBtns);
        return;
      }
      count++;
      node.firstElementChild.style.transform = `scale(${count * (0.99 / turns)})`;
    }, 10);
  }
}

function removeElem() {
  const notes = document.querySelector('.notes');
  if(currentIdx === 0){
    notes.innerText = `Stack is empty`;
    return;
  }
  notes.innerText = `Removing node from Stack`;

  disableButtons(operationBtns);
  const node = nodes[currentIdx - 1];

  scaleOutAnimation();

  function scaleOutAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        moveTopAnimation();
        return;
      }
      count++;
      node.firstElementChild.style.transform = `scale(${1 - (count * (1 / turns))})`;
    }, 10);
  }

  function moveTopAnimation() {
    const topContiner = document.querySelector('#top-container');
    const initialWidth = topContiner.getBoundingClientRect().width;
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        notes.innerText = `Removed ${node.firstElementChild.innerText} from Stack`;
        currentIdx--;
        enableButtons(operationBtns);
        return;
      }
      count++;
      topContiner.style.width = (initialWidth - (count * (ELEM_WIDTH / turns))) + 'px';
    }, 10);
  }
}

function searchElem(keyValue) {  
  const notes = document.querySelector('.notes');
  if(currentIdx === 0){
    notes.innerText = `Stack is empty`;
    getKey.value = '';
    return;
  }

  if(getKey.value === '') {
    const placeholder = getKey.placeholder;
    keyValue = placeholder.match(/\d+/)[0];
    getKey.value = keyValue;
  }

  notes.innerText = `Searching for key: ${getKey.value}`;

  getKey.disabled = true;
  disableButtons(searchBtns);
  const turns = 50;
  let count = 0;
  let pos = 0;
  const intervalId = setInterval(() => {
    if(pos === currentIdx) {
      clearInterval(intervalId);
      notes.innerHTML = `Key: ${keyValue} is not found`;
      enableButtons(searchBtns);
      getKey.value = '';
      getKey.placeholder = 'ex: ' + (Math.floor(Math.random() * (100 - 1) + 1));
      getKey.disabled = false;
      return;
    } else if(count === turns) {
      if(nodes[pos].firstElementChild.innerText === keyValue) {
        clearInterval(intervalId);
        notes.innerHTML = `Key: ${keyValue} is found at position ${pos}`; 
        enableButtons(searchBtns);
        getKey.value = '';
        getKey.placeholder = 'ex: ' + (Math.floor(Math.random() * (100 - 1) + 1));
        getKey.disabled = false;
        return;
      }
      count = 0;
      pos++;
      return;
    }
    count++;
    let scale;
    if(count <= (turns / 2))
      scale = count * (SCALE / turns);
    else
      scale = SCALE - (count * (SCALE / turns));
    nodes[pos].firstElementChild.style.transform = `scale(${0.99 + scale})`;
  }, 10);
}

function clearList(size) {
  if(isNaN(size)) {
    const placeholder = getSize[0].placeholder;
    size = parseInt(placeholder.match(/\d+/)[0]);
    getSize[0].value = size;
  }

  if(currentIdx === 0 && size === nodes.length) {
    getSize[0].placeholder = 'Size (ex: ' + (Math.floor(Math.random() * (10 - 1)) + 1) + ')';
    return;
  }

  disableButtons(createBtns);
  getMultipleData.disabled = true;
  document.querySelector('.notes').innerText = '';
  const container = document.querySelector('.array-container');
  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        let html = '';
        for(let i = 0; i < size; i++) {
          html += `
          <div class="elem">
            <div class="data"></div>
            <div class="idx">${i}</div>
          </div>
          `;
        }
        nodes[0].parentElement.innerHTML = html;
        document.querySelector('#top-container').removeAttribute('style');
        setTimeout(scaleOutAnimate, 100);
        return;
      }
      count++;
      container.style.transform = `scaleY(${1 -(count * (1 / turns))})`;
    }, 10);
  }

  function scaleOutAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        container.removeAttribute('style');
        getMultipleData.disabled = false;
        getSize[0].value = '';
        getSize[0].placeholder = 'Size (ex: ' + (Math.floor(Math.random() * (15 - 1)) + 1) + ')';
        currentIdx = 0;
        enableButtons(createBtns);
        return;
      }
      count++;
      container.style.transform = `scaleY(${count * (1 / turns)})`;
    }, 10)
  }
}

function userDefinedList(csv, size) {
  if(isNaN(size)) {
    const placeholder = getSize[1].placeholder;
    getSize[1].value = placeholder.match(/\d+/)[0];
    size = parseInt(getSize[1].value);
  }

  disableButtons(createBtns);
  getMultipleData.disabled = true;
  document.querySelector('.notes').innerText = '';
  const container = document.querySelector('.array-container');

  const datas = Array.from(csv.matchAll(/\d+/g), matchArray => parseInt(matchArray[0]));
  let html = '';
  for(let i = 0; i < datas.length; i++)
    html += `
      <div class="elem">
        <div class="data" style="transform: scale(0.99)">${datas[i]}</div>
        <div class="idx">${i}</div>
      </div>
    `;

  for(let i = datas.length; i < size; i++)
    html += `
      <div class="elem">
        <div class="data"></div>
        <div class="idx">${i}</div>
      </div>
    `;    

  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodes[0].parentElement.innerHTML = html;
        const topContiner = document.querySelector('#top-container');
        topContiner.style.width = ((datas.length + 1) * ELEM_WIDTH) + 'px';
        setTimeout(scaleOutAnimate, 100);
        return;
      }
      count++;
      container.style.transform = `scaleY(${1 -(count * (1 / turns))})`;
    }, 10);
  }

  function scaleOutAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        container.removeAttribute('style');
        getSize[1].value = '';
        getSize[1].placeholder = 'ex: ' + (Math.floor(Math.random() * (15 - 4)) + 4);
        getMultipleData.value = '';
        getMultipleData.disabled = false;
        currentIdx = datas.length;
        enableButtons(createBtns);
        return;
      }
      count++;
      container.style.transform = `scaleY(${count * (1 / turns)})`;
    }, 10)
  }
}

function disableButtons(btns) {
  optionMenu.disabled = true;
  btns.forEach(btn => {
    btn.disabled = true;
  })
}

function enableButtons(btns) {
  optionMenu.disabled = false;
  btns.forEach(btn => {
    btn.disabled = false;
  })
}