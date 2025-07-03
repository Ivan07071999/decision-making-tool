import MainSection from '../../app';
import './list.css';

class CustomList extends MainSection {
  public listContainer!: HTMLElement;

  private itemCount: number = 0;

  constructor(title: string) {
    super(title);
    this.createList();
  }

  public addItem(): void {
    this.itemCount += 1;
    const item = document.createElement('li');
    item.className = 'list-item';

    const label = document.createElement('label');
    label.className = 'label';
    label.textContent = `#${this.itemCount}`;
    label.htmlFor = `input-id-${this.itemCount}`;

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.placeholder = 'Title';
    input1.id = `input-id-${this.itemCount}`;
    input1.className = 'input input-title';

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.placeholder = 'Weight';
    input2.className = 'input input-weight';

    const deleteButton = document.createElement('button');
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
  }

  public createList(): void {
    this.listContainer = document.createElement('ul');
    this.listContainer.className = 'custom-list';

    this.section.appendChild(this.listContainer);
  }

  public clearList(): void {
    let child: ChildNode | null = this.listContainer.firstChild;
    while (child) {
      this.listContainer.removeChild(child);
      child = this.listContainer.firstChild;
    }
  }
}

export default CustomList;
