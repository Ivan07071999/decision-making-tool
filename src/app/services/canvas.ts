import AllButtons from '../components/buttons/createAllButtons';
import type { ListData } from '../components/list/list';
import './rollStyle.css';

// type sectionElements = {
//   formContainer: HTMLFormElement;
//   replyButton: HTMLButtonElement;
//   soundButton: HTMLLabelElement;
//   timerButton: HTMLLabelElement;
//   timerIn: HTMLInputElement;
//   spinButt: HTMLButtonElement;
//   paragraph: HTMLParagraphElement;
// };

class CreateCanvas extends AllButtons {
  public isLabelSoundListenerAdded = false;

  public getData!: string | null;

  public data!: ListData;

  private spinButton = document.createElement('div');

  private rotationAngle: number = 0;

  private animationId: number | null = null;

  private ctx!: CanvasRenderingContext2D;

  private form: HTMLFormElement = document.createElement('form');

  private backButton: HTMLButtonElement = document.createElement('button');

  private labelSound = document.createElement('div');

  private labelTimer = document.createElement('label');

  private timerInput = document.createElement('input');

  private par = document.createElement('p');

  private head = document.createElement('h1');

  constructor() {
    super();
    this.init();
  }

  public init(): void {
    localStorage.setItem('audioState', 'play');
    this.getData = localStorage.getItem('myListData');
    this.data = JSON.parse(this.getData || '{"list": [], "lastId": 0}');
    this.hiddenMainContainerElements();
    this.createHad();
    this.createFormElements();
    this.appendSection();
    this.createCanvasElements();
    this.drawStatic();
    this.drawWheel();
    this.setAudio();

    this.form.addEventListener('click', (event: Event): void => {
      const { target } = event;

      if (!(target instanceof HTMLElement)) return;

      if (target.classList.contains('button-spin')) {
        event.stopPropagation();

        this.form.style.pointerEvents = 'none';
        this.form.style.opacity = '0.6';

        const seconds = Number(this.timerInput.value);
        const duration = seconds * 1000;

        this.startSpin(duration, seconds);
        console.log(seconds);
      }

      if (target.classList.contains('back-button')) {
        event.stopPropagation();
        this.hiddenMainContainerElements();
        this.section.classList.remove('main-new-container');
        this.itemCount = 0;
        this.createHad();
        this.createCustomListContainer();
        this.addLoadItem();
        this.createAllButtons();
        this.addEventListeners();
      }
    });

    this.setupLabelSoundClick();
  }

  public setupLabelSoundClick(): void {
    if (this.isLabelSoundListenerAdded) return;
    this.isLabelSoundListenerAdded = true;

    this.labelSound.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      console.log('labelSound clicked');

      if (localStorage.getItem('audioState') === 'play') {
        localStorage.setItem('audioState', 'silence');
        this.labelSound.style.backgroundImage = "url('/src/app/assets/volumeOff.png')";
      } else {
        localStorage.setItem('audioState', 'play');
        this.labelSound.style.backgroundImage = "url('/src/app/assets/volumeUp.png')";
      }
      console.log('labelSound clicked2');
    });
  }

  public addEventListeners(): void {
    throw new Error('Method not implemented.');
  }

  public stopSpin(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public createCanvasElements(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    this.section.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    this.ctx = ctx;
  }

  public createFormElements(): void {
    this.form.className = 'form';
    this.backButton.className = 'back-button';
    this.timerInput.className = 'input input-timer';
    this.labelSound.className = 'label-sound';
    this.labelTimer.className = 'label-timer';
    this.timerInput.type = 'number';
    this.timerInput.id = 'input-time';
    this.timerInput.value = '5';
    this.labelTimer.htmlFor = 'input-time';
    this.spinButton.className = 'button-spin';
    this.par.className = 'paragraph';
    this.par.textContent = 'PRESS START BUTTON';
  }

  public createHad(): void {
    this.head.className = 'main-header';
    this.head.textContent = 'Decision Making Tool';
    this.section.appendChild(this.head);
  }

  public hiddenMainContainerElements(): void {
    let child: ChildNode | null = this.section.firstChild;
    while (child) {
      this.section.removeChild(child);
      child = this.section.firstChild;
    }
    this.section.classList.add('main-new-container');
  }

  public appendSection(): void {
    this.section.appendChild(this.form);
    this.form.appendChild(this.backButton);
    this.form.appendChild(this.labelSound);
    this.form.appendChild(this.labelTimer);
    this.form.appendChild(this.timerInput);
    this.form.appendChild(this.spinButton);
    this.section.appendChild(this.par);
  }

  public startSpin(duration: number = 5000, fullCircles: number = 5): void {
    // Выбор сектора
    const totalWeight = this.data.list.reduce((sum, item) => sum + Number(item.weight), 0);
    console.log(totalWeight);
    const rand = Math.random();
    let cumulative = 0;
    let selectedIndex = 0;

    for (let i = 0; i < this.data.list.length; i += 1) {
      cumulative += Number(this.data.list[i].weight) / totalWeight;
      console.log(rand * ((180 / Math.PI) * 2), 'Рандовмно опр угол');
      console.log(cumulative * ((180 / Math.PI) * 2), `${i}-№ сектора`);
      if (rand <= cumulative) {
        selectedIndex = i;
        console.log(selectedIndex, 'выбран сектор');
        break;
      }
    }

    const totalAngle = Math.PI * 2;
    console.log(totalAngle * (180 / Math.PI), 'Общий угол');
    let startAngle = 0;
    for (let i = 0; i < selectedIndex; i += 1) {
      startAngle += (Number(this.data.list[i].weight) / totalWeight) * totalAngle;
      console.log(startAngle * ((180 / Math.PI) * 2), 'стартовый угол');
    }
    const sectorFraction = Number(this.data.list[selectedIndex].weight) / totalWeight;
    console.log(sectorFraction * (180 / Math.PI), 'сектор');
    const sectorMidPoint = startAngle + (sectorFraction * totalAngle) / 2;
    console.log(sectorMidPoint * (180 / Math.PI), 'сектор средней точки');
    const targetAngle = Math.abs(Math.PI / 2 - sectorMidPoint);
    console.log(targetAngle * (180 / Math.PI), 'Целевой угол');

    const totalRotation = targetAngle + fullCircles * 2 * Math.PI;
    console.log(totalRotation * (180 / Math.PI), 'полное вращение');

    if (this.animationId) cancelAnimationFrame(this.animationId);

    const startTime = performance.now();
    const initialAngle = this.rotationAngle;
    console.log(initialAngle * (180 / Math.PI), 'Текущий угол перед запуском');

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3; // easing

      this.rotationAngle = initialAngle + easedProgress * totalRotation;
      console.log(this.rotationAngle * (180 / Math.PI) + Math.PI, 'Обновленный угол, начиная с текущего');

      this.drawStatic();
      this.drawWheel();

      const currentAngle = (this.rotationAngle % (Math.PI * 2)) + Math.PI;
      console.log(currentAngle, 'Обновленный сектор');
      const currentSectorLabel = this.getSectorLabelByAngle(currentAngle);
      console.log(currentSectorLabel, 'Текущий сектор на барабане');
      this.par.textContent = `${currentSectorLabel}`;

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.rotationAngle = initialAngle + totalRotation;
        this.drawStatic();
        this.drawWheel();

        const finalAngle = (this.rotationAngle % (Math.PI * 2)) + Math.PI;
        const finalSectorLabel = this.getSectorLabelByAngle(finalAngle);
        this.par.textContent = `Result: ${finalSectorLabel}`;

        this.animationId = null;
      }
    };

    this.animationId = requestAnimationFrame(animate);
    setTimeout(
      () => {
        this.soundPlay();
        this.form.style.pointerEvents = 'auto';
        this.form.style.opacity = '1.0';
      },
      Number(this.timerInput.value) * 1000
    );
  }

  private getSectorLabelByAngle(currentRotation: number): string {
    const totalWeight = this.data.list.reduce((sum, item) => sum + Number(item.weight), 0);

    // куда указывает стрелка
    const pointerPosition = (Math.PI / 2 - currentRotation) % (2 * Math.PI);
    console.log(pointerPosition, 'позиция стрелки');

    // от 0 до 360- делаем нормальный диапазон
    const normalizedPointer = (pointerPosition + 2 * Math.PI) % (2 * Math.PI);
    // const normalizedPointer = Math.PI / 2;
    console.log(normalizedPointer, 'нормализация стрелки');

    let startAngle = 0;
    for (let i = 0; i < this.data.list.length; i += 1) {
      const item = this.data.list[i];
      const sectorFraction = Number(item.weight) / totalWeight;
      console.log(sectorFraction);
      const sectorAngle = sectorFraction * 2 * Math.PI;
      // const helperNormalized = Math.PI;

      if (normalizedPointer >= startAngle && normalizedPointer < startAngle + sectorAngle) {
        return item.title;
      }

      startAngle += sectorAngle;
    }
    return '';
  }

  private drawWheel(): void {
    const { ctx } = this;
    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-250, -250);

    // Внешний круг (фон)
    ctx.beginPath();
    ctx.arc(250, 250, 220, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Общие параметры
    const totalWeight = this.data.list.reduce((sum, item) => sum + Number(item.weight), 0);
    let startAngle = 0;
    const colors = [
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#F333FF',
      '#33FFF5',
      '#FFBD33',
      '#8D33FF',
      '#33FFF1',
      '#FF3380',
      '#33FFBD',
    ];

    this.data.list.forEach((item, index) => {
      const sectorAngle = (Number(item.weight) / totalWeight) * Math.PI * 2;

      const gradient = ctx.createRadialGradient(
        250 + Math.cos(startAngle + sectorAngle / 2) * 100,
        250 + Math.sin(startAngle + sectorAngle / 2) * 100,
        10,
        250 + Math.cos(startAngle + sectorAngle / 2) * 100,
        250 + Math.sin(startAngle + sectorAngle / 2) * 100,
        220
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, colors[index % colors.length]);

      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 220, startAngle, startAngle + sectorAngle);
      ctx.lineTo(250, 250);

      ctx.fillStyle = gradient;
      ctx.fill();

      const middleAngle = startAngle + sectorAngle / 2;
      const textRadius = 120;
      const textX = 250 + Math.cos(middleAngle) * textRadius;
      const textY = 250 + Math.sin(middleAngle) * textRadius;

      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.title, textX, textY);

      startAngle += sectorAngle;
    });

    ctx.beginPath();
    ctx.arc(250, 250, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.restore();
  }

  private drawStatic(): void {
    const { ctx } = this;

    ctx.clearRect(0, 0, 500, 500);

    ctx.save();
    ctx.translate(250, 240);
    ctx.beginPath();
    ctx.moveTo(0, -210);
    ctx.lineTo(-10, -240);
    ctx.lineTo(10, -240);
    ctx.closePath();
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.restore();
  }

  private soundPlay(): void {
    if (localStorage.getItem('audioState') === 'silence') return;

    const audio = new Audio('/src/app/assets/sound.mp3');
    audio.volume = 0.4;
    audio.play();
  }

  private setAudio(): void {
    localStorage.setItem('audioState', 'play');
  }
}

export default CreateCanvas;
