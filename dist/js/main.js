(function(){
  const wrapper = document.getElementById("wrapper");
  const menu = document.getElementById("menu");
  menu.addEventListener('click', function() {
    wrapper.classList.toggle("wrapper--collapse");
  })
  
  const studentMenu = document.getElementById("studentMenu");
  studentMenu.addEventListener('click', function() {
    studentMenu.nextElementSibling.classList.toggle("list-opt--active");
  })
  
  const rippleList = document.querySelectorAll('.ripple');
  rippleList.forEach(ripple => {
    ripple.addEventListener('mousedown', e => {
  
      let posX = e.pageX - ripple.getBoundingClientRect().left;
      let posY = e.pageY - ripple.getBoundingClientRect().top;
      let buttonWidth = 1.5 * ripple.offsetWidth;
  
      let divRippleEffect = document.createElement('div');
      divRippleEffect.className = 'ripple__effect';
      divRippleEffect.style.width = `${buttonWidth}px`;
      divRippleEffect.style.height = `${buttonWidth}px`;
      divRippleEffect.style.left = `${ posX - (buttonWidth / 2) }px`;
      divRippleEffect.style.top = `${ posY - (buttonWidth / 2) }px`;
  
      ripple.appendChild(divRippleEffect);
  
      window.setTimeout(() => {
        ripple.removeChild(divRippleEffect);
      }, 2000);
    });
  });

  const fabList = document.querySelectorAll('.fab');
  fabList.forEach(fab => {
    for (let index = 0; index < fab.children.length; index++) {
      const fabChildren = fab.children[index];
      if(fabChildren.classList.contains('fab__more')){
        fabChildren.addEventListener('click', function() {
          fab.classList.toggle("fab--active");
        })
      }
    }
  });

  const accordion = document.querySelectorAll('.accordion__header');
  accordion.forEach(accordion => {
    accordion.addEventListener('click', function() {
      const sibling = accordion.nextElementSibling;
      const parent = accordion.parentElement;

      parent.classList.toggle("accordion--active");
      if(parent.classList.contains("accordion--active")){
        sibling.style.height = `${sibling.scrollHeight}px`
      } else {
        sibling.style.height = '0'
      }
    })
  });
  
  const outsideClickListener = (target, classEl, event) => {
    target.classList.remove(classEl);
    document.removeEventListener('mousedown', event);
  }

  const selects = document.querySelectorAll('.select');
  selects.forEach(select => {
    const selectTitle = select.querySelectorAll('.select__title');
    if(selectTitle.length > 0){
      selectTitle[0].addEventListener('click', function(ev) {
        select.classList.toggle("select--active");
        ev.stopPropagation();
  
        const removeListener = (ev) => {
          if(!ev.target.classList.contains('select__el'))
            outsideClickListener(select, "select--active", removeListener);
        }
        document.addEventListener('mousedown', removeListener)
      })
    }

    const selectElements = select.querySelectorAll('.select__el');
    selectElements.forEach(selectElement => {
      selectElement.addEventListener('click', function(ev) {
        select.classList.remove("select--active");
        if(selectTitle.length > 0){
          selectTitle[0].children[0].innerText=selectElement.innerText
        } 
        ev.stopPropagation();
      })
    })
  });

  // Dialog
  const dialogsButton = document.querySelectorAll('button[data-modal]');
  dialogsButton.forEach(dialogButton => {
    dialogButton.addEventListener('click', () => {
      const modal = document.getElementById(dialogButton.dataset.modal);
      modal.classList.add("dialog--active")
    })
  })
  
  const dialogs = document.querySelectorAll('.dialog');
  dialogs.forEach(dialog => {
    const dialog__overlay = dialog.querySelectorAll('.dialog__overlay')
    if(dialog__overlay.length > 0){
      dialog__overlay[0].addEventListener('click', function() {
        dialog__overlay[0].parentElement.classList.remove("dialog--active");
      })
    }
  })

})()