import MainSection from '../../app';
import './list.css';

type ListItem = {
  id: string;
  title: string;
  weight: string;
};

type ListData = {
  list: ListItem[];
  lastId: number;
};

// type ListItemF = {
//   titleInput: HTMLInputElement;
//   weightsInput: HTMLInputElement;
//   listLabel: HTMLLabelElement;
// };

class CustomList extends MainSection {
  protected listContainer!: HTMLElement;

  protected itemCount: number = 0;

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

  public createListElement(): {
    titleInput: HTMLInputElement;
    weightsInput: HTMLInputElement;
    listLabel: HTMLLabelElement;
    } {
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
    input2.type = 'text';
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
    this.downloadFile();
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
      console.error(`Ошибка при парсинге данных: ${error}`);
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
            console.error('Ошибка при чтении файла:', error);
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
            console.log('Данные успешно сохранены в localStorage');
            resolve();
          } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
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

    console.log(this.listContainer, 'дш');
    console.log('сработало');
    this.itemCount = inputsArray.length;
  }
}

export default CustomList;
