import CustomList from './list';

class Functionality extends CustomList {
  public clearList(): void {
    let child: ChildNode | null = this.listContainer.firstChild;
    this.itemCount = 0;
    while (child) {
      this.listContainer.removeChild(child);
      child = this.listContainer.firstChild;
    }
  }

  public dataValidationCheck(): number {
    const listContainer = this.listContainer.childNodes.length;
    const inputTitle = document.querySelectorAll<HTMLInputElement>('.input-title');
    const inputWeight = document.querySelectorAll<HTMLInputElement>('.input-weight');
    const titleArr: HTMLInputElement[] = Array.from(inputTitle);
    const weightArr: HTMLInputElement[] = Array.from(inputWeight);

    if (listContainer < 2) {
      this.createValidationWindow();
      return 0;
    }

    for (let i = 0; i < titleArr.length; i += 1) {
      if (titleArr[i].value.trim().length === 0 && weightArr[i].value === '') {
        this.createValidationWindow();
        return 0;
      }
    }
    return 1;
  }

  public hiddenMainContainerElements(): void {
    let child: ChildNode | null = this.section.firstChild;
    while (child) {
      this.section.removeChild(child);
      child = this.section.firstChild;
    }
    this.section.classList.add('main-new-container');
  }
}

export default Functionality;
