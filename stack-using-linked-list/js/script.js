const NODE_WIDTH = 84; 
const DATA_WIDTH = 54;
const TRANSLATE = 27;
const ROTATE = 36;
const OUTLINE = 20;

function addElem(addIdx) {
  if(getData.value === '') {
    const placeholder = getData.placeholder;
    getData.value = placeholder.match(/\d+/)[0];
  }

  const notes = document.querySelector('.notes');
  notes.innerText = `Adding node to Stack`;

  getData.disabled = true;
  disableButtons(operationBtns);
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <div class="data">${getData.value}</div>
    <div class="position"></div>
    <img class="pointer" src="images/pointer.svg" alt=">">
  `;
  node.style.width = '0';
  node.style.transform = 'scale(0)';
  node.style.transformOrigin = `${DATA_WIDTH / 2}px ${DATA_WIDTH / 2}px`
  node.style.top = -DATA_WIDTH + 'px';
  nodes[0].parentElement.insertBefore(node, nodes[addIdx]);
  const top = nodes[0];

  makeSpaceAnimate();

  function makeSpaceAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        scaleInAnimate();
        return;
      }
      count++;          
      node.style.width = (count * (NODE_WIDTH / turns)) + 'px';
    }, 10);
  }

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(pointerDownAnimation, 300)
        return;
      }
      count++;
      node.style.transform = `scale(${count * (0.99 / turns)})`;
    }, 10);
  }

  function pointerDownAnimation() {
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(pointerUpAnimation, 300)
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      node.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
    }, 10);
  }

  function pointerUpAnimation() {
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        node.children[1].innerText = `pos ${addIdx}`;
        for(let i = addIdx + 1; i < nodes.length - 1; i++) {
          nodes[i].children[1].innerText = `pos ${i}`;
        }
        setTimeout(moveDownAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      top.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)` 
    }, 10);
  }
  
  function moveDownAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        notes.innerText = `Added ${getData.value} to Stack`;
        top.lastElementChild.removeAttribute('style');
        node.removeAttribute('style');
        node.lastElementChild.removeAttribute('style');
        getData.value = '';
        getData.placeholder = 'Data ex(' + (Math.floor(Math.random() * (100 - 1) + 1)) + ')';
        getData.disabled = false;
        enableButtons(operationBtns);
        return;
      }
      count++;
      const removeTop = count * (-DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns); 
      node.style.top = (-DATA_WIDTH - removeTop) + 'px';
      top.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE  + rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${ROTATE - rotate}deg)`;
    }, 10);
  }
}

function removeElem(removeIdx) {
  const notes = document.querySelector('.notes');
  if(nodes.length === 2){
    notes.innerText = `Stack is empty`;
    return;
  }
  notes.innerText = `Removing node from Stack`;

  disableButtons(operationBtns);
  const node = nodes[removeIdx];
  const top = nodes[0];

  moveUpAnimation();

  function moveUpAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        setTimeout(pointerDownAnimation, 250);
        return;
      }
      count++;
      const addTop = count * (-DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      node.style.top = addTop + 'px';
      top.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
    }, 10);
  }

  function pointerDownAnimation() {
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        node.children[1].remove();
        for(let i = removeIdx + 1; i < nodes.length - 1; i++) {
          nodes[i].children[1].innerText = `pos ${i - 1}`;
        }
        setTimeout(pointerUpAnimation, 250)
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      top.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE + rotate}deg)`;
    }, 10);
  }

  function pointerUpAnimation() {
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(scaleOutAnimate, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      node.lastElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${ROTATE - rotate}deg)`; 
    }, 10);
  }
  
  function scaleOutAnimate() {
    const turns = 25;
    let count = 10;
    node.style.transformOrigin = `${DATA_WIDTH / 2}px ${DATA_WIDTH / 2}px`;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        collapseAnimate();
        return;
      }
      count++;
      node.style.transform = `scale(${1 - (count * (1 / turns))})`;
    }, 10);
  }

  function collapseAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        notes.innerText = `Removed ${node.firstElementChild.innerText} from Stack`;
        node.remove();
        clearInterval(intervalId);
        enableButtons(operationBtns);
        return;
      }
      count++;          
      node.style.width = (NODE_WIDTH - (count * (NODE_WIDTH / turns))) + 'px';
    }, 10);
  }
}

function searchElem(keyValue) {  
  if(getKey.value === '') {
    const placeholder = getKey.placeholder;
    keyValue = placeholder.match(/\d+/)[0];
    getKey.value = keyValue;
  }

  const notes = document.querySelector('.notes');
  if(nodes.length === 2){
    notes.innerText = `Stack is empty`;
    getKey.value = '';
    return;
  }
  notes.innerText = `Searching for key: ${getKey.value}`;

  getKey.disabled = true;
  disableButtons(searchBtns);
  const turns = 50;
  let count = 0;
  let pos = 1;
  const intervalId = setInterval(() => {
    if(pos === nodes.length - 1) {
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
    let outline;
    if(count <= (turns / 2))
      outline = count * (OUTLINE / turns);
    else
      outline = OUTLINE - (count * (OUTLINE / turns));
    nodes[pos].firstElementChild.style.outlineWidth = outline + 'px';
  }, 10);
}

function clearList() {
  if(nodes.length === 2)
    return;

  disableButtons(createBtns);
  getMultipleData.disabled = true;
  document.querySelector('.notes').innerText = '';
  const nodeContainer = nodes[0].parentElement;
  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodeContainer.innerHTML = `
          <div class="node">
            <div class="data" id="top">Top</div>
            <img class="pointer" src="images/pointer.svg" alt=">">
          </div>
          <div class="node">
            <div class="data" id="null">Null</div>
          </div>
        `;
        setTimeout(scaleOutAnimate, 100);
        return;
      }
      count++;
      nodeContainer.style.transform = `scaleY(${1 -(count * (1 / turns))})`;
    }, 10);
  }

  function scaleOutAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodeContainer.removeAttribute('style');
        getMultipleData.disabled = false;
        enableButtons(createBtns);
        return;
      }
      count++;
      nodeContainer.style.transform = `scaleY(${count * (1 / turns)})`;
    }, 10)
  }
}

function userDefinedList(csv) {
  disableButtons(createBtns);
  getMultipleData.disabled = true;
  document.querySelector('.notes').innerText = '';
  const nodeContainer = nodes[0].parentElement;

  const datas = Array.from(csv.matchAll(/\d+/g), matchArray => parseInt(matchArray[0]));
  let nodesHtml = '';
  for(let i = 0; i < datas.length; i++)
    nodesHtml += `
      <div class="node">
        <div class="data">${datas[i]}</div>
        <div class="position">pos ${i + 1}</div>
        <img class="pointer" src="images/pointer.svg" alt=">">
      </div>
    `;

  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodeContainer.innerHTML = `
          <div class="node">
            <div class="data" id="top">Top</div>
            <img class="pointer" src="images/pointer.svg" alt=">">
          </div>
          ${nodesHtml}
          <div class="node">
            <div class="data" id="null">Null</div>
          </div>
        `;
        setTimeout(scaleOutAnimate, 100);
        return;
      }
      count++;
      nodeContainer.style.transform = `scaleY(${1 -(count * (1 / turns))})`;
    }, 10);
  }

  function scaleOutAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodeContainer.removeAttribute('style');
        getMultipleData.value = '';
        getMultipleData.disabled = false;
        enableButtons(createBtns);
        return;
      }
      count++;
      nodeContainer.style.transform = `scaleY(${count * (1 / turns)})`;
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