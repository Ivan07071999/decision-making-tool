import CustomList from '../components/list/list';

interface ListItem {
  id: string;
  title: string;
  weight: string;
}

interface ListData {
  list: ListItem[];
  lastId: number;
}

class ListSaver extends CustomList {
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
      console.log(`Ошибка при парсинге данных: ${error}`);
    }
  }
}

export default ListSaver;
