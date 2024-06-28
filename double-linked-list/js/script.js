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

  if(isNaN(addIdx)) {
    const placeholder = getPosition[0].placeholder;
    addIdx = parseInt(placeholder.match(/\d+/)[0]);
  }

  const notes = document.querySelector('.notes');
  notes.innerText = `Inserting node at position ${addIdx}`;

  getData.disabled = true;
  getPosition[0].value = addIdx;
  getPosition[0].disabled = true;
  disableButtons(insertBtns);
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <div class="data">${getData.value}</div>
    <div class="position"></div>
    <div class="pointer-container">
      <img class="prev-pointer" src="images/prev.svg" alt=">">
      <img class="next-pointer" src="images/next.svg" alt=">">
    </div>
  `;
  node.style.width = '0';
  node.style.transform = 'scale(0)';
  node.style.transformOrigin = `${DATA_WIDTH / 2}px ${DATA_WIDTH / 2}px`
  node.style.top = DATA_WIDTH + 'px';
  nodes[0].parentElement.insertBefore(node, nodes[addIdx]);

  if(nodes.length === 3) {
    nodes[0].style.marginRight = '0';
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        nodes[0].removeAttribute('style');
        nodes[0].classList.add('null-margin-right');
        nodes[0].parentElement.classList.remove('initial');
        return;
      }
      count++;
      nodes[0].style.marginRight = (count * (NODE_WIDTH / turns)) + 'px';
    }, 10);
  }

  highlightNodeAnimation();

  function highlightNodeAnimation() {
    const turns = 50;
    let count = 0;
    let pos = 1;
    const intervalId = setInterval(() => {
      if(pos === addIdx) {
        clearInterval(intervalId);
        makeSpaceAnimate();
        return;
      } else if(count === turns) {
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
        setTimeout(pointerUpAnimation, 300)
        return;
      }
      count++;
      node.style.transform = `scale(${count * (0.99 / turns)})`;
    }, 10);
  }

  function pointerUpAnimation() {
    const pointerContainer = node.querySelector('.pointer-container');
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(pointerDownAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      pointerContainer.firstElementChild.style.transform = `translateY(${-translate}px) rotateZ(${rotate}deg)`
      pointerContainer.lastElementChild.style.transform = `translateY(${-translate}px) rotateZ(${-rotate}deg)`;
    }, 10);
  }

  function pointerDownAnimation() {
    const prevPointerContainer = node.previousElementSibling.querySelector('.pointer-container');
    const nextPointerContainer = node.nextElementSibling.querySelector('.pointer-container');
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns || !(prevPointerContainer || nextPointerContainer)) {
        clearInterval(intervalId);
        node.children[1].innerText = `pos ${addIdx}`;
        for(let i = addIdx + 1; i < nodes.length - 1; i++) {
          nodes[i].children[1].innerText = `pos ${i}`;
        }
        setTimeout(moveUpAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      if(prevPointerContainer)
        prevPointerContainer.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(+${rotate}deg)`; 
      if(nextPointerContainer)
        nextPointerContainer.firstElementChild.style.transform = `translateY(${translate}px) rotateZ(-${rotate}deg)`;
    }, 10);
  }
  
  function moveUpAnimation() {
    const pointerContainer = node.querySelector('.pointer-container')
    const prevPointerContainer = node.previousElementSibling.querySelector('.pointer-container');
    const nextPointerContainer = node.nextElementSibling.querySelector('.pointer-container');
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        notes.innerText = `Inserted ${getData.value} at position ${addIdx}`;
        if(prevPointerContainer)
          prevPointerContainer.lastElementChild.removeAttribute('style');
        if(nextPointerContainer)
          nextPointerContainer.firstElementChild.removeAttribute('style');
        node.removeAttribute('style');
        pointerContainer.firstElementChild.removeAttribute('style');
        pointerContainer.lastElementChild.removeAttribute('style');
        getData.value = '';
        getData.placeholder = 'ex: ' + (Math.floor(Math.random() * (100 - 1)) + 1);
        getData.disabled = false;
        getPosition[0].value = '';
        getPosition[0].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1)) + 1) + ')';
        getPosition[1].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1 - 1)) + 1) + ')';
        getPosition[0].disabled = false;
        enableButtons(insertBtns);
        return;
      }
      count++;
      const removeTop = count * (DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns); 
      node.style.top = (DATA_WIDTH - removeTop) + 'px';
      if(prevPointerContainer)
        prevPointerContainer.lastElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${ROTATE - rotate}deg)`;
      pointerContainer.firstElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${ROTATE - rotate}deg)`;
      pointerContainer.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE + rotate}deg)`;
      if(nextPointerContainer)
        nextPointerContainer.firstElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${-ROTATE + rotate}deg)`;
    }, 10);
  }
}

function removeElem(removeIdx) {
  if(isNaN(removeIdx)) {
    const placeholder = getPosition[1].placeholder;
    removeIdx = parseInt(placeholder.match(/\d+/)[0]);
  }

  const notes = document.querySelector('.notes');
  if(nodes.length === 2){
    notes.innerText = `Linked list is empty`;
    return;
  }
  notes.innerText = `Deleting node from position ${removeIdx}`;

  getPosition[1].value = removeIdx;
  getPosition[1].disabled = true;
  disableButtons(deleteBtns);
  const node = nodes[removeIdx];

  highlightNodeAnimation();

  function highlightNodeAnimation() {
    const turns = 50;
    let count = 0;
    let pos = 1;
    const intervalId = setInterval(() => {
      if(pos === removeIdx + 1) { // + 1 to highlight the removing node
        clearInterval(intervalId);
        moveDownAnimation();
        return;
      } else if(count === turns) {
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

  function moveDownAnimation() {
    const pointerContainer = node.querySelector('.pointer-container');
    const prevPointerContainer = node.previousElementSibling.querySelector('.pointer-container');
    const nextPointerContainer = node.nextElementSibling.querySelector('.pointer-container');
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        setTimeout(pointerUpAnimation, 250);
        return;
      }
      count++;
      const addTop = count * (DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      node.style.top = addTop + 'px';
      if(prevPointerContainer)
        prevPointerContainer.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
      pointerContainer.firstElementChild.style.transform = `translateY(-${translate}px) rotateZ(${rotate}deg)`;
      pointerContainer.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)`;
      if(nextPointerContainer)
        nextPointerContainer.firstElementChild.style.transform = `translateY(${translate}px) rotateZ(-${rotate}deg)`;
    }, 10);
  }

  function pointerUpAnimation() {
    const prevPointerContainer = node.previousElementSibling.querySelector('.pointer-container');
    const nextPointerContainer = node.nextElementSibling.querySelector('.pointer-container');
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns || !(prevPointerContainer || nextPointerContainer)) {
        clearInterval(intervalId);
        for(let i = removeIdx + 1; i < nodes.length - 1; i++) {
          nodes[i].children[1].innerText = `pos ${i - 1}`;
        }
        setTimeout(pointerDownAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      if(prevPointerContainer)
        prevPointerContainer.lastElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${ROTATE - rotate}deg)`; 
      if(nextPointerContainer)
        nextPointerContainer.firstElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${-ROTATE + rotate}deg)`; 
    }, 10);
  }

  function pointerDownAnimation() {
    const pointerContainer = node.querySelector('.pointer-container');
    const turns = 20;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(scaleOutAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      pointerContainer.firstElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${ROTATE - rotate}deg)`;
      pointerContainer.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE + rotate}deg)`;
    }, 10);
  }
  
  function scaleOutAnimation() {
    const turns = 25;
    let count = 10;
    node.style.transformOrigin = `${DATA_WIDTH / 2}px ${DATA_WIDTH / 2}px`;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        collapseAnimation();
        return;
      }
      count++;
      node.style.transform = `scale(${1 - (count * (1 / turns))})`;
    }, 10);
  }

  function collapseAnimation() {
    if(nodes.length === 3) {
      nodes[0].parentElement.classList.add('initial');
      nodes[0].style.marginRight = '84px';
      const turns = 25;
      let count = 0;
      const intervalId = setInterval(() => {
        if(count === turns) {
          clearInterval(intervalId);
          nodes[0].removeAttribute('style');
          nodes[0].classList.remove('null-margin-right');
          return;
        }
        count++;
        nodes[0].style.marginRight = (NODE_WIDTH - (count * (NODE_WIDTH / turns))) + 'px';
      }, 10);
    }

    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        notes.innerText = `Deleted ${node.firstElementChild.innerText} from position ${removeIdx}`;
        node.remove();
        clearInterval(intervalId);
        getPosition[1].value = '';
        getPosition[1].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1 - 1)) + 1) + ')';
        getPosition[0].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1)) + 1) + ')';
        getPosition[1].disabled = false;
        enableButtons(deleteBtns);
        return;
      }
      count++;          
      node.style.width = (NODE_WIDTH - (count * (NODE_WIDTH / turns))) + 'px';
    }, 10);
  }
}

function searchElem(keyValue) { 
  const notes = document.querySelector('.notes');
  if(nodes.length === 2){
    notes.innerText = `Linked list is empty`;
    getKey.value = '';
    return;
  }

  if(keyValue === '') {
    const placeholder = getKey.placeholder;
    keyValue = placeholder.match(/\d+/)[0];
    getKey.value = keyValue;
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
      getKey.placeholder = 'ex ' + (Math.floor(Math.random() * (100 - 1)) + 1);
      getKey.disabled = false;
      return;
    } else if(count === turns) {
      if(nodes[pos].firstElementChild.innerText === keyValue) {
        clearInterval(intervalId);
        notes.innerHTML = `Key: ${keyValue} is found at position ${pos}`; 
        enableButtons(searchBtns);
        getKey.value = '';
        getKey.placeholder = 'ex ' + (Math.floor(Math.random() * (100 - 1)) + 1);
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
  const dllNodes = nodes[0].parentElement;
  const nodeContainer = dllNodes.parentElement;
  nodeContainer.style.transformOrigin = '50% calc(50% - 26px)';

  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        dllNodes.classList.add('initial');
        dllNodes.innerHTML = `
          <div class="null-node">
            <div class="data" id="prev-null">Null</div>
          </div>
          <div class="null-node">
            <div class="data" id="next-null">Null</div>
          </div>
        `;
        setTimeout(scaleOutAnimate, 250);
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
        getPosition[0].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1)) + 1) + ')';
        getPosition[1].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1 - 1)) + 1) + ')';
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
  const dllNodes = nodes[0].parentElement;
  const nodeContainer = dllNodes.parentElement;
  nodeContainer.style.transformOrigin = '50% calc(50% - 26px)';

  const datas = Array.from(csv.matchAll(/\d+/g), matchArray => parseInt(matchArray[0]));
  let nodesHtml = '';
  for(let i = 0; i < datas.length; i++)
    nodesHtml += `
      <div class="node">
        <div class="data">${datas[i]}</div>
        <div class="position">pos ${i + 1}</div>
        <div class="pointer-container">
          <img class="prev-pointer" src="images/prev.svg" alt=">">
          <img class="next-pointer" src="images/next.svg" alt=">">
        </div>
      </div>
    `;

  scaleInAnimate();

  function scaleInAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        if(dllNodes.classList.contains('initial'))
          dllNodes.classList.remove('initial');
        dllNodes.innerHTML = `
          <div class="null-node null-margin-right">
            <div class="data" id="prev-null">Null</div>
          </div>
          ${nodesHtml}
          <div class="null-node">
            <div class="data" id="next-null">Null</div>
          </div>
        `;
        setTimeout(scaleOutAnimate, 250);
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
        getPosition[0].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1)) + 1) + ')';
        getPosition[1].placeholder = 'Position (ex: ' + (Math.floor(Math.random() * (nodes.length - 1 - 1)) + 1) + ')';
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