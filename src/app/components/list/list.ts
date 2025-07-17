import MainSection from '../../app';
import './styleList.css';

type ListItem = {
  id: string;
  title: string;
  weight: string;
};

export type ListData = {
  list: ListItem[];
  lastId: number;
};

type ListElements = {
  titleInput: HTMLInputElement;
  weightsInput: HTMLInputElement;
  listLabel: HTMLLabelElement;
};

// type ListItemF = {
//   titleInput: HTMLInputElement;
//   weightsInput: HTMLInputElement;
//   listLabel: HTMLLabelElement;
// };

class CustomList extends MainSection {
  protected listContainer!: HTMLElement;

  protected itemCount: number = 0;

  protected pastListContainer: HTMLElement = document.createElement('div');

  protected pastList: HTMLElement = document.createElement('div');

  protected textArea: HTMLTextAreaElement = document.createElement('textarea');

  private selectedFile: File | null = null;

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

  public clearList(): void {
    let child: ChildNode | null = this.listContainer.firstChild;
    this.itemCount = 0;
    while (child) {
      this.listContainer.removeChild(child);
      child = this.listContainer.firstChild;
    }
  }

  public saveListToLocalStorage(): void {
    const inputTitle: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-title');
    const inputWeight: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-weight');
    const titleArr: HTMLInputElement[] = Array.from(inputTitle);
    const weightArr: HTMLInputElement[] = Array.from(inputWeight);

    const list1 = [];
    let maxId = 0;

    for (let i = 0; i < titleArr.length; i += 1) {
      const titleValue = titleArr[i].value;
      const weightValue = weightArr[i].value;
      console.log(titleValue, weightValue);

      const idNumber = i + 1;
      const id1 = `#${idNumber}`;

      if (idNumber > maxId) {
        maxId = idNumber;
      }

      list1.push({
        id: id1,
        title: titleValue,
        weight: weightValue,
      });
    }

    const dataToSave = {
      list: list1,
      lastId: maxId,
    };

    console.log('Данные перед сохранением:', dataToSave);

    localStorage.setItem('myListData', JSON.stringify(dataToSave));
  }

  public downloadFile(): void {
    const dataString: string | null = localStorage.getItem('myListData');

    if (!dataString) {
      return;
    }

    try {
      const data: ListData = JSON.parse(dataString);
      const jsonStr: string = JSON.stringify(data);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'listData.json';

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  }

  public loadListFromFile(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';

    input.accept = '.json';
    input.style.display = 'none';

    document.body.appendChild(input);
    console.log(input);

    input.addEventListener('change', () => {
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files?.[0] || null;
        console.log('Выбран файл:', this.selectedFile.name);
        this.clearList();
        this.readFileAndSave()
          .then(() => {
            this.addLoadItem();
          })
          .catch((error) => {
            console.error('Ошибка:', error);
          });
      } else {
        console.log('Файлы не выбраны');
      }
      document.body.removeChild(input);
    });

    input.click();
    console.log('работает');
  }

  public readFileAndSave(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        console.error('Файл не выбран');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          try {
            const jsonData = JSON.parse(result);
            localStorage.setItem('myListData', JSON.stringify(jsonData));
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      };
      reader.readAsText(this.selectedFile);
    });
  }

  public addLoadItem(): void {
    if (!this.listContainer) {
      console.error('listContainer не найден');
      return;
    }
    const dataStr = localStorage.getItem('myListData');
    if (!dataStr) {
      console.warn('Нет данных в localStorage');
      return;
    }

    const data: { list: ListItem[] } = JSON.parse(dataStr);

    if (!this.listContainer) {
      console.error('listContainer не найден');
      return;
    }

    console.log(data, 'Data');

    const inputsArray: ListItem[] = data.list;
    console.log(inputsArray);

    for (let i = 0; i < inputsArray.length; i += 1) {
      const newListItem = this.createListElement();
      console.log(newListItem);
      newListItem.titleInput.value = inputsArray[i].title;
      newListItem.weightsInput.value = inputsArray[i].weight;
    }

    this.itemCount = inputsArray.length;
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

  public textAreaToLocalStorage(): void {
    const content = this.textArea.value.trim();

    const lines = content.split('\n');

    const list1: { id: string; title: string; weight: string }[] = [];
    let lastId1 = 0;
    let idNumber: number;

    lines.forEach((line, index) => {
      const parts = line.split(',');
      if (parts.length === 2) {
        const title1 = parts[0].trim();
        const weight1 = parts[1].trim();
        idNumber = index + 1;
        list1.push({
          id: `#${idNumber}`,
          title: title1,
          weight: weight1,
        });
        if (idNumber > lastId1) {
          lastId1 = idNumber;
        }
      }
    });

    const result = {
      list: list1,
      lastId: lastId1,
    };

    localStorage.setItem('myListData', JSON.stringify(result));
    this.itemCount = lines.length;
    this.pastListContainer.classList.remove('past-list-active');
  }

  public hiddenMainContainerElements(): void {
    let child: ChildNode | null = this.section.firstChild;
    while (child) {
      this.section.removeChild(child);
      child = this.section.firstChild;
    }
    this.section.classList.add('main-new-container');
  }

  public dataValidationCheck(): number {
    const listContainer = this.listContainer.childNodes.length;
    console.log(listContainer);
    const inputTitle: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-title');
    const inputWeight: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-weight');
    const titleArr: HTMLInputElement[] = Array.from(inputTitle);
    const weightArr: HTMLInputElement[] = Array.from(inputWeight);
    console.log(titleArr, weightArr);

    if (listContainer < 2) {
      this.createValidationWindow();
      return 0;
    }

    for (let i = 0; i < titleArr.length; i += 1) {
      if (titleArr[i].value.trim().length === 0 && weightArr[i].value === '') {
        console.log('невалидная хуйня', titleArr.length);
        this.createValidationWindow();
        return 0;
      }
    }
    return 1;
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
