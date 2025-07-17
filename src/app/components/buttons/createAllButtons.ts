import Buttons from './buttons';
import './buttons.css';

class AllButtons extends Buttons {
  public addButton!: Buttons;

  public pasteButton!: Buttons;

  public clearListButton!: Buttons;

  public saveListButton!: Buttons;

  public loadListButton!: Buttons;

  public startButton!: Buttons;

  public cancelButton!: Buttons;

  public confirmButton!: Buttons;

  constructor() {
    super('className', 'textContent');
    this.createModalButtons();
    this.createAllButtons();
  }

  public createAllButtons(): void {
    this.addButton = new Buttons('button add-button', 'Add Option');
    this.pasteButton = new Buttons('button paste-button', 'Paste List');
    this.clearListButton = new Buttons('button clear-button', 'Clear List');
    this.saveListButton = new Buttons('button save-button', 'Save list to file');
    this.loadListButton = new Buttons('button load-button', 'Load list from file');
    this.startButton = new Buttons('button start-button', 'Start');

    this.createPasteList();
    this.section.appendChild(this.addButton.getButtonElement());
    this.section.appendChild(this.pasteButton.getButtonElement());
    this.section.appendChild(this.clearListButton.getButtonElement());
    this.section.appendChild(this.saveListButton.getButtonElement());
    this.section.appendChild(this.loadListButton.getButtonElement());
    this.section.appendChild(this.startButton.getButtonElement());
  }

  public createModalButtons(): void {
    this.cancelButton = new Buttons('button', 'Cancel');
    this.confirmButton = new Buttons('button', 'Confirm');
    this.pastList.appendChild(this.confirmButton.getButtonElement());
    this.pastList.appendChild(this.cancelButton.getButtonElement());
  }
}

export default AllButtons;
