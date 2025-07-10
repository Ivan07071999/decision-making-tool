import AllButtons from './createAllButtons';

class EventButtons extends AllButtons {
  constructor() {
    super();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.addButton.getButtonElement().addEventListener('click', () => {
      this.createListElement();
    });

    this.pasteButton.getButtonElement().addEventListener('click', () => {
      this.pastList.classList.add('past-list-active');
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
    });

    this.confirmButton.getButtonElement().addEventListener('click', () => {
      this.textAreaToLocalStorage();
      this.clearList();
      this.addLoadItem();
    });

    this.cancelButton.getButtonElement().addEventListener('click', () => {
      this.pastList.classList.remove('past-list-active');
    });
  }
}

export default EventButtons;
