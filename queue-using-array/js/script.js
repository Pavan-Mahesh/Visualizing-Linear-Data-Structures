const ELEM_WIDTH = 58.28;
const SCALE = 0.35;

let insertCurrentIdx = 0, removeCurrentIdx = 0;

function addElem() {
  const notes = document.querySelector('.notes');
  
  if(insertCurrentIdx === nodes.length) {
    notes.innerText = `Queue is full`;
    return;
  }

  if(getData.value === '') {
    const placeholder = getData.placeholder;
    getData.value = placeholder.match(/\d+/)[0];
  }

  notes.innerText = `Adding element to Queue`;
  getData.disabled = true;
  disableButtons(operationBtns);
  const node = nodes[insertCurrentIdx];
  node.firstElementChild.innerText = getData.value;

  moveRearAnimation();

  function moveRearAnimation() {
    const rearContiner = document.querySelector('#rear-container');
    const initialWidth = rearContiner.getBoundingClientRect().width;
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        scaleInAnimation();
        return;
      }
      count++;
      rearContiner.style.width = (initialWidth + (count * (ELEM_WIDTH / turns))) + 'px';
    }, 10);
  }
  
  function scaleInAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        notes.innerText = `Added ${getData.value} to Queue`;
        insertCurrentIdx++;
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
  if(insertCurrentIdx === 0){
    notes.innerText = `Queue is empty`;
    return;
  }
  notes.innerText = `Removing node from Queue`;

  disableButtons(operationBtns);
  const node = nodes[removeCurrentIdx];

  scaleOutAnimation();

  function scaleOutAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        moveFrontAnimation();
        return;
      }
      count++;
      node.firstElementChild.style.transform = `scale(${1 - (count * (1 / turns))})`;
    }, 10);
  }

  function moveFrontAnimation() {
    const frontContainer = document.querySelector('#front-container');
    const initialWidth = frontContainer.getBoundingClientRect().width;
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        notes.innerText = `Removed ${node.firstElementChild.innerText} from Queue`;
        removeCurrentIdx++;
        if(removeCurrentIdx === insertCurrentIdx)
          setTimeout(resetRearAndFront, 100);
        enableButtons(operationBtns);
        return;
      }
      count++;
      frontContainer.style.width = (initialWidth + (count * (ELEM_WIDTH / turns))) + 'px';
    }, 10);
  }

  function resetRearAndFront() {
    const turns = 25;
    let count = 0;
    const rearContainer = document.querySelector('#rear-container');
    const frontContainer = document.querySelector('#front-container');
    const toRemoveWidth = rearContainer.getBoundingClientRect().width - 58;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        insertCurrentIdx = removeCurrentIdx = 0;
        return;
      }
      count++;
      rearContainer.style.width = (58 + (toRemoveWidth - (count * (toRemoveWidth / turns)))) + 'px';
      frontContainer.style.width = (58 + (toRemoveWidth - (count * (toRemoveWidth / turns)))) + 'px';
    });
  }
}

function searchElem(keyValue) {  
  const notes = document.querySelector('.notes');
  if(insertCurrentIdx === 0){
    notes.innerText = `Queue is empty`;
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
  let pos = removeCurrentIdx;
  const intervalId = setInterval(() => {
    if(pos === insertCurrentIdx) {
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
        notes.innerHTML = `Key: ${keyValue} is found at index ${pos}`; 
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

  if(insertCurrentIdx === 0 && size === nodes.length) {
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
        document.querySelector('#rear-container').removeAttribute('style');
        document.querySelector('#front-container').removeAttribute('style');
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
        insertCurrentIdx = removeCurrentIdx = 0;
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
        document.querySelector('#rear-container').style.width = ((datas.length + 1) * ELEM_WIDTH) + 'px';
        document.querySelector('#front-container').style.width = '58px';
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
        getMultipleData.placeholder = 'ex: 6,2,3,5';
        getMultipleData.disabled = false;
        insertCurrentIdx = datas.length;
        removeCurrentIdx = 0;
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