import AllButtons from '../components/buttons/createAllButtons';
import type { ListData } from '../typing';

class CreateCanvas extends AllButtons {
  public isLabelSoundListenerAdded: boolean = false;

  public getData!: string | null;

  public data!: ListData;

  public labelSound: HTMLElement = document.createElement('div');

  public spinButton: HTMLElement = document.createElement('div');

  public rotationAngle: number = 0;

  public animationId: number | null = null;

  public ctx!: CanvasRenderingContext2D;

  public form: HTMLFormElement = document.createElement('form');

  public backButton: HTMLButtonElement = document.createElement('button');

  public labelTimer: HTMLLabelElement = document.createElement('label');

  public timerInput: HTMLInputElement = document.createElement('input');

  public par: HTMLParagraphElement = document.createElement('p');

  public head: HTMLHeadElement = document.createElement('h1');

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

  public appendSection(): void {
    this.section.appendChild(this.form);
    this.form.appendChild(this.backButton);
    this.form.appendChild(this.labelSound);
    this.form.appendChild(this.labelTimer);
    this.form.appendChild(this.timerInput);
    this.form.appendChild(this.spinButton);
    this.section.appendChild(this.par);
  }

  protected drawWheel(): void {
    const { ctx } = this;
    ctx.save();

    ctx.translate(250, 250);
    ctx.rotate(this.rotationAngle);
    ctx.translate(-250, -250);

    ctx.beginPath();
    ctx.arc(250, 250, 220, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

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

  protected drawStatic(): void {
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
}

export default CreateCanvas;
