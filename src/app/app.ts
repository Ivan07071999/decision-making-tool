class MainSection {
  public section: HTMLElement;

  constructor(title: string) {
    this.section = document.createElement('main');
    this.section.className = 'main';
    const header = document.createElement('h1');
    header.className = 'main-header';
    header.textContent = title;
    this.section.appendChild(header);
  }

  public appendTo(parent: HTMLElement): void {
    parent.appendChild(this.section);
  }
}

export default MainSection;
