import Data from '../list/data';
import './buttons.css';

class Buttons extends Data {
  protected button: HTMLButtonElement;

  constructor(buttonsClassName: string, buttonsTextContent: string) {
    super();
    this.button = document.createElement('button');
    this.createAddButton(buttonsClassName, buttonsTextContent);
  }

  public createAddButton(buttonsClassName: string, buttonsTextContent: string): void {
    this.button.className = buttonsClassName;
    this.button.textContent = buttonsTextContent;
  }

  public getButtonElement(): HTMLButtonElement {
    return this.button;
  }
}

export default Buttons;
