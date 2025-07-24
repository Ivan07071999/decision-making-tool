import CreateCanvas from './canvas';
import audioUrl from '../assets/sound.mp3';
import volumeOffUrl from '../assets/volumeOff.png';
import volumeUpUrl from '../assets/volumeUp.png';

class CanvasEvents extends CreateCanvas {
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    localStorage.setItem('audioState', 'play');
    this.getData = localStorage.getItem('myListData');
    this.data = JSON.parse(this.getData || '{"list": [{"id": "#1", "title": "value", "weight": "5"}], "lastId": 1}');
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
      }

      if (target.classList.contains('back-button')) {
        event.preventDefault();
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

      if (localStorage.getItem('audioState') === 'play') {
        localStorage.setItem('audioState', 'silence');
        this.labelSound.style.backgroundImage = `url(${volumeOffUrl})`;
      } else {
        localStorage.setItem('audioState', 'play');
        this.labelSound.style.backgroundImage = `url(${volumeUpUrl})`;
      }
    });
  }

  public startSpin(duration: number = 5000, fullCircles: number = 5): void {
    const totalWeight = this.data.list.reduce((sum, item) => sum + Number(item.weight), 0);
    const rand = Math.random();
    let cumulative = 0;
    let selectedIndex = 0;

    for (let i = 0; i < this.data.list.length; i += 1) {
      cumulative += Number(this.data.list[i].weight) / totalWeight;
      if (rand <= cumulative) {
        selectedIndex = i;
        break;
      }
    }

    const totalAngle = Math.PI * 2;
    let startAngle = 0;
    for (let i = 0; i < selectedIndex; i += 1) {
      startAngle += (Number(this.data.list[i].weight) / totalWeight) * totalAngle;
    }
    const sectorFraction = Number(this.data.list[selectedIndex].weight) / totalWeight;
    const sectorMidPoint = startAngle + (sectorFraction * totalAngle) / 2;
    const targetAngle = Math.abs(Math.PI / 2 - sectorMidPoint);

    const totalRotation = targetAngle + fullCircles * 2 * Math.PI;

    if (this.animationId) cancelAnimationFrame(this.animationId);

    const startTime = performance.now();
    const initialAngle = this.rotationAngle;

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;

      this.rotationAngle = initialAngle + easedProgress * totalRotation;

      this.drawStatic();
      this.drawWheel();

      const currentAngle = (this.rotationAngle % (Math.PI * 2)) + Math.PI;
      const currentSectorLabel = this.getSectorLabelByAngle(currentAngle);
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
    const pointerPosition = (Math.PI / 2 - currentRotation) % (2 * Math.PI);
    const normalizedPointer = (pointerPosition + 2 * Math.PI) % (2 * Math.PI);

    let startAngle = 0;
    for (let i = 0; i < this.data.list.length; i += 1) {
      const item = this.data.list[i];
      const sectorFraction = Number(item.weight) / totalWeight;
      const sectorAngle = sectorFraction * 2 * Math.PI;

      if (normalizedPointer >= startAngle && normalizedPointer < startAngle + sectorAngle) {
        return item.title;
      }

      startAngle += sectorAngle;
    }
    return '';
  }

  private soundPlay(): void {
    if (localStorage.getItem('audioState') === 'silence') return;

    const audio = new Audio(audioUrl);
    audio.volume = 0.4;
    audio.play();
  }

  private setAudio(): void {
    localStorage.setItem('audioState', 'play');
  }
}

export default CanvasEvents;
