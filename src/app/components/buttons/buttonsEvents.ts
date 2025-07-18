import CanvasEvents from '../../services/canvasEvents';
// import CreateCanvas from '../../services/canvas';

class EventButtons extends CanvasEvents {
  [x: string]: unknown;

  constructor() {
    super();
    this.hiddenMainContainerElements();
    this.itemCount = 0;
    this.section.classList.remove('main-new-container');
    this.createHad();
    this.createCustomListContainer();
    this.createListElement();
    this.createAllButtons();
    this.addEventListeners();
  }

  public addEventListeners(): void {
    this.addButton.getButtonElement().addEventListener('click', () => {
      this.createListElement();
    });

    this.pasteButton.getButtonElement().addEventListener('click', () => {
      this.pastListContainer.classList.add('past-list-active');
      this.textArea.value = '';
    });

    this.clearListButton.getButtonElement().addEventListener('click', () => {
      this.clearList();
    });

    this.saveListButton.getButtonElement().addEventListener('click', () => {
      this.saveListToLocalStorage();
      this.downloadFile();
    });

    this.loadListButton.getButtonElement().addEventListener('click', () => {
      this.loadListFromFile();
    });

    this.startButton.getButtonElement().addEventListener('click', () => {
      this.runCanvas();
    });

    this.confirmButton.getButtonElement().addEventListener('click', () => {
      this.textAreaToLocalStorage();
      this.clearList();
      this.addLoadItem();
    });

    this.cancelButton.getButtonElement().addEventListener('click', () => {
      this.pastListContainer.classList.remove('past-list-active');
    });
  }

  public runCanvas(): void {
    if (this.dataValidationCheck() === 1) {
      this.saveListToLocalStorage();
      this.hiddenMainContainerElements();
      this.init();
    }
  }
}

export default EventButtons;
