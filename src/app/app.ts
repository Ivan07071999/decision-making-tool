class MainSection {
  public section: HTMLElement;

  constructor() {
    this.section = document.createElement('main');
    this.section.className = 'main';
    const header = document.createElement('h1');
    header.className = 'main-header';
    header.textContent = 'Decision Making Tool';
    this.section.appendChild(header);
  }

  public appendTo(parent: HTMLElement): void {
    parent.appendChild(this.section);
    localStorage.setItem(
      'myListData',
      JSON.stringify({
        list: [{ id: '#1', title: 'value1', weight: '10' }],
        lastId: 1,
      })
    );
  }
}

export default MainSection;
