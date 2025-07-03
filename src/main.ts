import './style.css';
import MainSection from './app/app';
import CustomList from './app/components/list/list';
import CustomButtons from './app/components/buttons/buttons';

function init(): void {
  const mainSection = new MainSection('Decision Making Tool');
  const customList = new CustomList('Заголовок списка');
  const addButton = new CustomButtons('buttons', customList);
  const pasteButton = new CustomButtons('but', customList);
  const clearButton = new CustomButtons('dsf', customList);
  const saveButton = new CustomButtons('fds', customList);
  const loadButton = new CustomButtons('gfh', customList);
  const startButton = new CustomButtons('fds', customList);

  mainSection.section.appendChild(customList.listContainer);
  mainSection.section.appendChild(addButton.button);
  mainSection.section.appendChild(pasteButton.pasteButton);
  mainSection.section.appendChild(clearButton.clearButton);
  mainSection.section.appendChild(saveButton.saveButton);
  mainSection.section.appendChild(loadButton.loadButton);
  mainSection.section.appendChild(startButton.startButton);

  mainSection.appendTo(document.body);

  customList.addItem();
  addButton.createAddButton();
  pasteButton.createPasteListButton();
  clearButton.createClearListButton();
  saveButton.createSaveListButton();
  loadButton.createLoadListButton();
  startButton.createStartButton();
}

init();
