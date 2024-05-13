function addElem(addIdx) {
  if(getData.value === '')
    return;

  disableButtons(insertBtns);
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <div class="data">${parseInt(getData.value)}</div>
    <img class="arrow" src="images/pointer.svg" alt=" > ">`;
  node.style.width = '0';
  node.style.opacity = '0';
  node.style.top = -62 + 'px';
  nodes[0].parentElement.insertBefore(node, nodes[addIdx]);
  const prev = node.previousElementSibling;
  getData.value = '';
  makeSpaceAnimate(node);


  function makeSpaceAnimate() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        fadeInAnimate();
        return;
      }
      count++;          
      node.style.width = (count * (84 / turns)) + 'px';
    }, 10);
  }

  function fadeInAnimate() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        pointerDownAnimation();
        return;
      }
      count++;
      node.style.opacity = count * (10 / turns); // 10 represents the full opacity
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
      let translate = count * (31 / turns);
      let rotate = count * (40 / turns);
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
      const translate = count * (31 / turns);
      const rotate = count * (40 / turns);
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
        enableButtons(insertBtns);
        return;
      }
      count++;
      const removeTop = count * (-62 / turns);
      const translate = count * (31 / turns);
      const rotate = count * (40 / turns); 
      node.style.top = (-62 - removeTop) + 'px';
      prev.lastElementChild.style.transform = `translateY(${-31 + translate}px) rotateZ(${-40  + rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${31 - translate}px) rotateZ(${40 - rotate}deg)`;
    }, 10);
  }
}

function removeElem(removeIdx) {
  if(nodes.length === 2)
    return;

  disableButtons(deleteBtns);
  const node = nodes[removeIdx];
  const prev = node.previousElementSibling;
  moveUpAnimation();

  function moveUpAnimation() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        setTimeout(neutralAnimation, 300);
        return;
      }
      count++;
      const addTop = count * (-62 / turns);
      const translate = count * (31 / turns);
      const rotate = count * (40 / turns);
      node.style.top = addTop + 'px';
      prev.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
    }, 10);
  }

  function neutralAnimation() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
        prev.lastElementChild.removeAttribute('style');
        fadeOutAnimate();
        return;
      }
      count++;
      let translate = count * (31 / turns);
      let rotate = count * (40 / turns);
      prev.lastElementChild.style.transform = `translateY(-${31 - translate}px) rotateZ(-${40 - rotate}deg)`;
      node.lastElementChild.style.transform = `translateY(${31 - translate}px) rotateZ(${40 - rotate}deg)`;
    }, 10);
  }
  
  function fadeOutAnimate() {
    const turns = 30;
    let count = 10;
    const intervalId = setInterval(() => {
      if(count === turns){
        clearInterval(intervalId);
        collapseAnimate();
        return;
      }
      count++;
      node.style.opacity = 10 - (count * (10 / turns));
    }, 10);
  }

  function collapseAnimate() {
    const turns = 25;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        node.remove();
        clearInterval(intervalId);
        enableButtons(deleteBtns);
        return;
      }
      count++;          
      node.style.width = (84 - (count * (84 / turns))) + 'px';
    }, 10);
  }
}

function traversalArrow() {
  const arrow = document.querySelector('.single-linked-list .traversal-arrow');
  fadeIn();

  function fadeIn() {
    const turns = 30;
    let count = 0;
    const intervalId = setInterval(() => {
      if(count === turns) {
        clearInterval(intervalId);
      }
      count++;
      arrow.style.opacity = count * (10 / turns);
    }, 10)
  }
}
setTimeout(traversalArrow, 1000)

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