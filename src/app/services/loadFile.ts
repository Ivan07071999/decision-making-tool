// import AllButtons from '../components/buttons/createAllButtons';
// // import CustomList from '../components/list/list';

// type ListItem = {
//   id: string;
//   title: string;
//   weight: string;
// };

// type ListData = {
//   list: ListItem[];
//   lastId: number;
// };

// export class LoadFile extends AllButtons {
//   private selectedFile: File | null = null;

//   private listRef!: CustomList;

//   // constructor(title: string) {
//   //   super(title);
//   // }

//   public loadListFromFile(): void {
//     const input: HTMLInputElement = document.createElement('input');
//     input.type = 'file';

//     input.accept = '.json';
//     input.style.display = 'none';

//     document.body.appendChild(input);

//     input.addEventListener('change', () => {
//       if (input.files && input.files.length > 0) {
//         this.selectedFile = input.files?.[0] || null;
//         console.log('Выбран файл:', this.selectedFile.name);
//         // Немедленно вызываем чтение файла и запись данных в localStorage
//         this.readFileAndSave();
//         this.addLoadItem();
//       } else {
//         console.log('Файлы не выбраны');
//       }
//       document.body.removeChild(input);
//     });

//     input.click();
//     console.log('работает');
//   }

//   public readFileAndSave(): void {
//     if (!this.selectedFile) {
//       console.error('Файл не выбран');
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = (event: ProgressEvent<FileReader>): void => {
//       const result = event.target?.result;
//       if (typeof result === 'string') {
//         try {
//           const jsonData = JSON.parse(result);
//           localStorage.setItem('myListData', JSON.stringify(jsonData));
//           console.log('Данные успешно сохранены в localStorage');
//         } catch (e) {
//           console.error('Ошибка парсинга JSON:', e);
//         }
//       }
//     };

//     reader.readAsText(this.selectedFile);
//   }

//   public addLoadItem(): void {
//     const ul: HTMLUListElement = document.querySelector('.custom-list');

//     if (!this.listContainer) {
//       console.error('listContainer не найден');
//       return;
//     }
//     const dataStr = localStorage.getItem('myListData');
//     if (!dataStr) {
//       console.warn('Нет данных в localStorage');
//       return;
//     }

//     const data = JSON.parse(dataStr);

//     if (!this.listContainer) {
//       console.error('listContainer не найден');
//       return;
//     }

//     data.list.forEach((item: ListItem) => {
//       const listItem = document.createElement('li');
//       listItem.className = 'list-item';

//       const label = document.createElement('label');
//       label.className = 'label';
//       label.textContent = `${item.id}`;

//       const inputTitle = document.createElement('input');
//       inputTitle.type = 'text';
//       inputTitle.placeholder = 'Title';
//       inputTitle.value = item.title;
//       inputTitle.className = 'input input-title';

//       const inputWeight = document.createElement('input');
//       inputWeight.type = 'text';
//       inputWeight.placeholder = 'Weight';
//       inputWeight.value = item.weight;
//       inputWeight.className = 'input input-weight';

//       const deleteBtn = document.createElement('button');
//       deleteBtn.textContent = 'Delete';
//       deleteBtn.className = 'delete-button';
//       deleteBtn.addEventListener('click', () => {
//         ul.removeChild(listItem);
//       });

//       listItem.appendChild(label);
//       listItem.appendChild(inputTitle);
//       listItem.appendChild(inputWeight);
//       listItem.appendChild(deleteBtn);

//       ul.appendChild(listItem);
//     });

//     console.log(this.listContainer, 'дш');
//     console.log('сработало');
//     // this.itemCount = 2;
//   }
// }
