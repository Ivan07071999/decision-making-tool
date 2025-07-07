import AllButtons from './createAllButtons';

class EventButtons extends AllButtons {
  constructor() {
    super();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.addButton.getButtonElement().addEventListener('click', () => {
      console.log('Add Button clicked');
      this.createListElement();
    });

    this.pasteButton.getButtonElement().addEventListener('click', () => {
      console.log('Paste Button clicked');
    });

    this.clearListButton.getButtonElement().addEventListener('click', () => {
      console.log('Clear Button clicked');
      this.clearList();
    });

    this.saveListButton.getButtonElement().addEventListener('click', () => {
      console.log('Save Button clicked');
      this.saveListToLocalStorage();
    });

    this.loadListButton.getButtonElement().addEventListener('click', () => {
      console.log('Load Button clicked');
      this.loadListFromFile();
    });

    this.startButton.getButtonElement().addEventListener('click', () => {
      console.log('Start Button clicked');
    });
  }
}

export default EventButtons;
