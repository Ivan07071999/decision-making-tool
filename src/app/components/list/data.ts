import Functionality from './functionality';
import type { ListData, ListElements, ListItem } from '../../typing';

class Data extends Functionality {
  private selectedFile: File | null = null;

  public saveListToLocalStorage(): void {
    const inputTitle = document.querySelectorAll<HTMLInputElement>('.input-title');
    const inputWeight = document.querySelectorAll<HTMLInputElement>('.input-weight');
    const titleArr: HTMLInputElement[] = Array.from(inputTitle);
    const weightArr: HTMLInputElement[] = Array.from(inputWeight);

    const list1 = [];
    let maxId = 0;

    for (let i = 0; i < titleArr.length; i += 1) {
      const titleValue = titleArr[i].value;
      const weightValue = weightArr[i].value;

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

    localStorage.setItem('myListData', JSON.stringify(dataToSave));
  }

  public downloadFile(): void {
    const dataString: string | null = localStorage.getItem('myListData');

    if (!dataString) {
      return;
    }

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
  }

  public loadListFromFile(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.type = 'file';

    input.accept = '.json';
    input.style.display = 'none';

    document.body.appendChild(input);

    input.addEventListener('change', () => {
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files?.[0] || null;
        this.clearList();
        this.readFileAndSave()
          .then(() => {
            this.addLoadItem();
          })
          .catch((error) => {
            throw error;
          });
      }
      document.body.removeChild(input);
    });

    input.click();
  }

  public readFileAndSave(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
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
      return;
    }
    const dataStr = localStorage.getItem('myListData');
    if (!dataStr) {
      return;
    }

    const data: { list: ListItem[] } = JSON.parse(dataStr);

    if (!this.listContainer) {
      return;
    }

    const inputsArray: ListItem[] = data.list;

    for (let i = 0; i < inputsArray.length; i += 1) {
      const newListItem: ListElements = this.createListElement();
      newListItem.titleInput.value = inputsArray[i].title;
      newListItem.weightsInput.value = inputsArray[i].weight ?? '';
    }

    this.itemCount = inputsArray.length;
  }

  public textAreaToLocalStorage(): void {
    const content = this.textArea.value.trim();

    const lines: string[] = content.split('\n');

    const list1: ListItem[] = [];
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
}

export default Data;
