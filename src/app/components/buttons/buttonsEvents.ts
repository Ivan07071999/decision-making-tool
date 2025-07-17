// import { Name } from '../../services/loadFile';
// import CreateCanvas from '../../services/canvas';
import AllButtons from './createAllButtons';

class EventButtons extends AllButtons {
  [x: string]: any;

  // private createCanvasInstance!: CreateCanvas;

  constructor() {
    super();
    // this.consoleService = new Name();
    // this.createCanvasInstance = new CreateCanvas();
    this.addEventListeners();
    // this.createNewCanvas = new CreateCanvas();
  }

  public addEventListeners(): void {
    // this.consoleService.console();
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
      this.saveListToLocalStorage();
      // this.hiddenMainContainerElements();
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
}

export default EventButtons;
