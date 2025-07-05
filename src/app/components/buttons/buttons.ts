// import MainSection from '../../app';
import CustomList from '../list/list';
import ListSaver from '../../services/downlocalStorage';
// import { LoadFile } from '../../services/loadFile';
import './buttons.css';

class CustomButtons extends CustomList {
  public button!: HTMLElement;

  public pasteButton!: HTMLElement;

  public clearButton!: HTMLElement;

  public saveButton!: HTMLElement;

  public loadButton!: HTMLElement;

  public startButton!: HTMLElement;

  private listRef!: CustomList;

  constructor(title: string, listRef: CustomList) {
    super(title);
    this.listRef = listRef;
    this.createAddButton();
    this.createPasteListButton();
    this.createClearListButton();
    this.createSaveListButton();
    this.createLoadListButton();
    this.createStartButton();
  }

  public createAddButton(): void {
    this.button = document.createElement('button');
    this.button.className = 'button add-button';
    this.button.textContent = 'Add Option';

    this.button.addEventListener('click', () => {
      this.listRef.addItem();
    });
    this.section.appendChild(this.button);
  }

  public createPasteListButton(): void {
    this.pasteButton = document.createElement('button');
    this.pasteButton.className = 'button paste-button';
    this.pasteButton.textContent = 'Paste List';
    this.section.appendChild(this.pasteButton);
  }

  public createClearListButton(): void {
    this.clearButton = document.createElement('button');
    this.clearButton.className = 'button clear-button';
    this.clearButton.textContent = 'Clear List';
    this.section.appendChild(this.clearButton);

    this.clearButton.addEventListener('click', () => {
      this.listRef.clearList();
    });
  }

  public createSaveListButton(): void {
    this.saveButton = document.createElement('button');
    this.saveButton.className = 'button save-button';
    this.saveButton.textContent = 'Save list to file';
    this.section.appendChild(this.saveButton);

    const listSaver = new ListSaver('My List');
    this.saveButton.addEventListener('click', () => {
      listSaver.saveListToLocalStorage();
    });
  }

  public createLoadListButton(): void {
    this.loadButton = document.createElement('button');
    this.loadButton.className = 'button load-button';
    this.loadButton.textContent = 'Load list from file';
    this.section.appendChild(this.loadButton);

    // const loadFile = new LoadFile('dfg');
    // this.loadButton.addEventListener('click', () => {
    //   this.listRef.clearList();
    //   loadFile.loadListFromFile();

    // });
  }

  public createStartButton(): void {
    this.startButton = document.createElement('button');
    this.startButton.className = 'button start-button';
    this.startButton.textContent = 'Start';
    this.section.appendChild(this.startButton);
  }
}

export default CustomButtons;
