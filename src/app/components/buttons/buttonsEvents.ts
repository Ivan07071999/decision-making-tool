import AllButtons from './createAllButtons';

class EventButtons extends AllButtons {
  constructor() {
    super();
    this.addEventListeners();
  }

  private addEventListeners(): void {
    this.addButton.getButtonElement().addEventListener('click', () => {
      console.log('Add Button clicked');
    });

    this.pasteButton.getButtonElement().addEventListener('click', () => {
      console.log('Paste Button clicked');
    });

    this.clearListButton.getButtonElement().addEventListener('click', () => {
      console.log('Clear Button clicked');
    });

    this.saveListButton.getButtonElement().addEventListener('click', () => {
      console.log('Save Button clicked');
    });

    this.loadListButton.getButtonElement().addEventListener('click', () => {
      console.log('Load Button clicked');
    });

    this.startButton.getButtonElement().addEventListener('click', () => {
      console.log('Start Button clicked');
    });
  }
}

export default EventButtons;
