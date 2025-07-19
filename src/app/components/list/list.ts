import MainSection from '../../app';
import type { ListElements } from '../../typing';
import './styleList.css';

class CustomList extends MainSection {
  protected listContainer!: HTMLElement;

  protected itemCount: number = 0;

  protected pastListContainer: HTMLElement = document.createElement('div');

  protected pastList: HTMLElement = document.createElement('div');

  protected textArea: HTMLTextAreaElement = document.createElement('textarea');

  constructor() {
    super();
    this.createCustomListContainer();
    this.createListElement();
  }

  public createCustomListContainer(): void {
    this.listContainer = document.createElement('ul');
    this.listContainer.className = 'custom-list';
    this.section.appendChild(this.listContainer);
  }

  public createListElement(): ListElements {
    this.itemCount += 1;
    const item: HTMLElement = document.createElement('li');
    item.className = 'list-item';

    const label: HTMLLabelElement = document.createElement('label');
    label.className = 'label';
    label.textContent = `#${this.itemCount}`;
    label.htmlFor = `input-id-${this.itemCount}`;

    const input1: HTMLInputElement = document.createElement('input');
    input1.type = 'text';
    input1.placeholder = 'Title';
    input1.id = `input-id-${this.itemCount}`;
    input1.className = 'input input-title';

    const input2: HTMLInputElement = document.createElement('input');
    input2.type = 'number';
    input2.placeholder = 'Weight';
    input2.className = 'input input-weight';

    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', () => {
      this.listContainer.removeChild(item);
    });

    item.appendChild(label);
    item.appendChild(input1);
    item.appendChild(input2);
    item.appendChild(deleteButton);

    this.listContainer.appendChild(item);

    return {
      titleInput: input1,
      weightsInput: input2,
      listLabel: label,
    };
  }

  public createList(): void {
    this.listContainer = document.createElement('ul');
    this.listContainer.className = 'custom-list';

    this.section.appendChild(this.listContainer);
  }

  public createPasteList(): void {
    document.body.appendChild(this.pastListContainer);
    this.pastListContainer.appendChild(this.pastList);

    this.pastListContainer.className = 'past-list-container';

    this.pastList.className = 'past-list';
    this.textArea.className = 'text-area';
    this.textArea.rows = 12;
    this.textArea.cols = 64;
    this.textArea.focus();
    this.textArea.placeholder = `Paste a list of new options in a CSV-like format:

title,1                           -> | title                            | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas  | 3 |
title with "quotes",4      ->| title with "quotes";      | 4 |`;
    this.textArea.name = 'table';
    this.pastList.appendChild(this.textArea);
    this.pastList.style.display = 'flex';
    this.pastList.style.flexDirection = 'column-reverse';
  }

  public createValidationWindow(): void {
    const validationWrapper = document.createElement('div');
    const validationContainer = document.createElement('div');
    const validationText = document.createElement('p');
    const validationCloseButton = document.createElement('button');

    validationWrapper.className = 'validation-wrapper validation-container-active';
    validationContainer.className = 'validation-container';
    validationText.className = 'validation-text';
    validationCloseButton.className = 'validation-button';

    validationText.textContent = `Please add at least 2 valid options.
     An option is considered valid if its title is not empty and its weight is greater than 0`;

    validationCloseButton.textContent = 'Close';
    document.body.appendChild(validationWrapper);
    validationWrapper.appendChild(validationContainer);
    validationContainer.appendChild(validationText);
    validationContainer.appendChild(validationCloseButton);

    validationCloseButton.addEventListener('click', () => {
      validationWrapper.classList.remove('validation-container-active');
      setTimeout(() => {
        validationWrapper.remove();
      }, 3000);
    });
  }
}

export default CustomList;
