function addElem(addIdx) {
  if(getData.value === '')
    return;

  disableButtons(insertBtns);
  const node = document.createElement('div');
  node.classList.add('node');
  node.innerHTML = `
    <div class="data">${parseInt(getData.value)}</div>
    <img class="arrow" src="arrow.svg" alt=" > ">`;
  node.style.width = '0';
  node.style.opacity = '0';
  node.style.top = -62 + 'px';
  nodes[0].parentElement.insertBefore(node, nodes[addIdx]);
  const prev = node.previousElementSibling;
  getData.value = '';
  makeSpaceAnimate(node);


  function makeSpaceAnimate() {
    const intervalId = setInterval(makeSpace, 10);
    let count = 0;
    function makeSpace() {
      if(count === 30) {
        clearInterval(intervalId);
        fadeInAnimate();
        return;
      }
      count++;          
      node.style.width = (count * (84 / 30)) + 'px';
    }
  }

  function fadeInAnimate() {
    const intervalId = setInterval(fadeIn, 10);
    const turns = 20;
    let count = 0;
    function fadeIn() {
      if(count === turns) {
        clearInterval(intervalId);
        pointerDownAnimation();
        return;
      }
      count++;
      node.style.opacity = count * (10 / turns); // 10 represents the full opacity
    }
  }

  function pointerDownAnimation() {
    const intervalId = setInterval(pointDown, 10);
    const turns = 25;
    let count = 0;
    function pointDown() {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(pointerUpAnimation, 300)
        return;
      }
      count++;
      let translate = count * (31 / turns);
      let rotate = count * (40 / turns);
      node.lastElementChild.style.transform = `translateY(${translate}px) rotateZ(${rotate}deg)`;
    }
  }
  function pointerUpAnimation() {
    const intervalId = setInterval(pointUp, 10);
    const turns = 25;
    let count = 0;
    function pointUp() {
      if(count === turns) {
        clearInterval(intervalId);
        setTimeout(moveDownAnimation, 300);
        return;
      }
      count++;
      const translate = count * (31 / turns);
      const rotate = count * (40 / turns);
      prev.lastElementChild.style.transform = `translateY(-${translate}px) rotateZ(-${rotate}deg)` 
    }
  }
  
  function moveDownAnimation() {
    const intervalId = setInterval(moveDown, 10);
    const turns = 30;
    let count = 0;
    function moveDown() {
      // since compare to all reverse rotation takes move time
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
    }
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
    const intervalId = setInterval(moveUp, 10);
    const turns = 30;
    let count = 0;
    function moveUp() {
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
    }
  }

  function neutralAnimation() {
    const intervalId = setInterval(neutral, 10);
    const turns = 25;
    let count = 0;
    function neutral() {
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
    }
  }
  
  function fadeOutAnimate() {
    const intervalId = setInterval(fadeOut, 10);
    const turns = 20;
    let count = 10;
    function fadeOut() {
      if(count === turns){
        clearInterval(intervalId);
        collapseAnimate();
        return;
      }
      count++;
      node.style.opacity = 10 - (count * (10 / turns));
    }
  }

  function collapseAnimate() {
    const intervalId = setInterval(collapse, 10);
    const turns = 25;
    let count = 0;
    function collapse() {
      if(count === turns) {
        node.remove();
        clearInterval(intervalId);
        enableButtons(deleteBtns);
        return;
      }
      count++;          
      node.style.width = (84 - (count * (84 / turns))) + 'px';
    }
  }
}

function disableButtons(btns) {
  btns.forEach(btn => {
    btn.disabled = true;
  })
}

function enableButtons(btns) {
  btns.forEach(btn => {
    btn.disabled = false;
  })
}