const NODE_WIDTH = 84; 
const DATA_WIDTH = 54;
const TRANSLATE = 27;
const ROTATE = 36;
const OUTLINE = 20;

function addElem(addIdx) {
  if(getData.value === '')
    return;

  getData.disabled = true;
  getPosition[0].disabled = true;
  disableButtons(insertBtns);
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <div class="data">${parseInt(getData.value)}</div>
    <img class="arrow" src="images/pointer.svg" alt=" > ">`;
  node.style.width = '0';
  node.style.transform = 'scale(0)';
  node.style.transformOrigin = `${DATA_WIDTH / 2}px ${DATA_WIDTH / 2}px`
  node.style.top = -DATA_WIDTH + 'px';
  nodes[0].parentElement.insertBefore(node, nodes[addIdx]);
  const prev = node.previousElementSibling;

  highlightNodeAnimation();

  function highlightNodeAnimation() {
    const turns = 100;
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
    const turns = 40;
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
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(pointerDownAnimation, 300)
        return;
      }
      count++;
      node.style.transform = `scale(${count * (1 / turns)})`;
    }, 10);
  }

  function pointerDownAnimation() {
    const turns = 25;
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
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(moveDownAnimation, 300);
        return;
      }
      count++;
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      prev.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)` 
    }, 10);
  }
  
  function moveDownAnimation() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        prev.lastElementChild.removeAttribute('style');
        node.removeAttribute('style');
        node.lastElementChild.removeAttribute('style');
        getData.disabled = false;
        getData.value = '';
        getPosition[0].disabled = false;
        getPosition[0].value = '';
        enableButtons(insertBtns);
        return;
      }
      count++;
      const removeTop = count * (-DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns); 
      node.style.top = (-DATA_WIDTH - removeTop) + 'px';
      prev.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE  + rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${TRANSLATE - translate}px) rotateZ(${ROTATE - rotate}deg)`;
    }, 10);
  }
}

function removeElem(removeIdx) {
  if(nodes.length === 2)
    return;

  getPosition[1].disabled = true;
  disableButtons(deleteBtns);
  const node = nodes[removeIdx];
  const prev = node.previousElementSibling;

  highlightNodeAnimation();

  function highlightNodeAnimation() {
    const turns = 100;
    let count = 0;
    let pos = 1;
    const intervalId = setInterval(() => {
      if(pos === removeIdx + 1) { // + 1 to highlight the removing node
        clearInterval(intervalId);
        moveUpAnimation();
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

  function moveUpAnimation() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        setTimeout(pointerDownAnimation, 300);
        return;
      }
      count++;
      const addTop = count * (-DATA_WIDTH / turns);
      const translate = count * (TRANSLATE / turns);
      const rotate = count * (ROTATE / turns);
      node.style.top = addTop + 'px';
      prev.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
    }, 10);
  }

  function pointerDownAnimation() {
    const turns = 25;
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
      prev.lastElementChild.style.transform = `translateY(${-TRANSLATE + translate}px) rotateZ(${-ROTATE + rotate}deg)`;
    }, 10);
  }

  function pointerUpAnimation() {
    const turns = 25;
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
    const turns = 30;
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
    const turns = 40;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        node.remove();
        clearInterval(intervalId);
        getPosition[1].disabled = false;
        getPosition[1].value = '';
        enableButtons(deleteBtns);
        return;
      }
      count++;          
      node.style.width = (NODE_WIDTH - (count * (NODE_WIDTH / turns))) + 'px';
    }, 10);
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