import EventButtons from '../components/buttons/buttonsEvents';

// type sectionElements = {
//   formContainer: HTMLFormElement;
//   replyButton: HTMLButtonElement;
//   soundButton: HTMLLabelElement;
//   timerButton: HTMLLabelElement;
//   timerIn: HTMLInputElement;
//   spinButt: HTMLButtonElement;
//   paragraph: HTMLParagraphElement;
// };

class RollSelectContainer extends EventButtons {
  public hiddenMainContainerElements(): void {
    let child: ChildNode | null = this.section.firstChild;
    while (child) {
      this.section.removeChild(child);
      child = this.section.firstChild;
    }
    this.section.classList.add('main-new-container');
  }

  // public createFormElements(): sectionElements {
  //   const form = document.createElement('form');
  //   form.className = 'form';

  //   const backButton = document.createElement('button');
  //   backButton.className = 'back-button';

  //   const labelSound = document.createElement('label');
  //   const labelTimer = document.createElement('label');
  //   const spinButton = document.createElement('button');
  //   const timerInput = document.createElement('input');
  //   timerInput.className = 'input input-timer';
  //   labelSound.className = 'label-sound';
  //   labelTimer.className = 'label-timer';
  //   spinButton.className = 'button-spin';

  //   const par = document.createElement('p');
  //   par.className = 'paragraph';
  //   par.textContent = 'PRESS START BUTTON';

  //   return {
  //     formContainer: form,
  //     replyButton: backButton,
  //     soundButton: labelSound,
  //     timerButton: labelTimer,
  //     timerIn: timerInput,
  //     spinButt: spinButton,
  //     paragraph: par,
  //   };
  // }

  // public appendSection(): void {
  //   const elements = this.createFormElements();

  //   this.section.appendChild(elements.formContainer);
  //   elements.formContainer.appendChild(elements.replyButton);
  //   elements.formContainer.appendChild(elements.soundButton);
  //   elements.formContainer.appendChild(elements.timerButton);
  //   elements.formContainer.appendChild(elements.timerIn);
  //   elements.formContainer.appendChild(elements.spinButt);
  //   this.section.appendChild(elements.paragraph);
  // }
}

export default RollSelectContainer;
