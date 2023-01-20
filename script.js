class Modal {
  lock = 'df-lock';
  body = 'body';
  mainModal = 'df-modal';
  mainModalActive = 'df-modal_active';

  constructor(data) {
    this.content = data.content;

    this.createMainBlock();
    this.handler(data.trigger);

  }

  handler(trigger) {
    const buttons = document.querySelectorAll(trigger);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const content = document.getElementById(this.content).content.cloneNode(true);

        document.querySelector('.df-modal__content').innerHTML = '';

        document.querySelector(this.body).classList.add(this.lock);
        document.querySelector('.' + this.mainModal).classList.add(this.mainModalActive);

        document.querySelector('.df-modal__content').append(content);
      });
    })
  }

  createMainBlock() {
    if(document.querySelector('.' + this.mainModal)) return;

    const mainBlock = document.createElement('div');
    const mainBlockWrapp = document.createElement('div');
    const close = document.createElement('div');
    const contentWrapp = document.createElement('div');
    const content = document.createElement('div');

    mainBlock.classList.add(this.mainModal);
    mainBlockWrapp.classList.add('df-modal__wrapper');
    close.classList.add('df-modal__close');
    content.classList.add('df-modal__content');
    contentWrapp.classList.add('df-modal__content-wrapper');
    
    close.innerHTML = '<span class="df-modal__line"></span><span class="df-modal__line"></span>'

    contentWrapp.append(content);
    mainBlockWrapp.append(close, contentWrapp);
    mainBlock.append(mainBlockWrapp);

    document.querySelector('body').append(mainBlock);

    this.clickClose();

    this.clickOut();
  }

  closeModal() {
    document.querySelector('.' + this.mainModalActive).classList.remove(this.mainModalActive);
    document.querySelector('.' + this.lock).classList.remove(this.lock);
  }

  clickClose() {
    document.querySelector('.df-modal__close').addEventListener('click', () => {
      this.closeModal();
    });
  }

  lockBody() {
    document.querySelector('body').classList.add(this.lock);
  }

  clickOut() {
    const click = document.querySelector('.df-modal__wrapper');

    document.querySelector('.df-modal').addEventListener('click', (event) => {
      if(!event.composedPath().includes(click)) {
        this.closeModal();
      }
    });
  }
}

const modal = new Modal({content: 'one', trigger: '.click'});
const modal2 = new Modal({content: 'two', trigger: '.click2'});
const modal3 = new Modal({content: 'three', trigger: '.click3'});