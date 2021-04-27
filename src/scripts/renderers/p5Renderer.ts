import * as seedrandom from 'seedrandom';
import { BaseRenderer } from './baseRenderer';
import gsap from 'gsap';
import P5 from 'p5';

const srandom = seedrandom('b');

let squares = [];

let tl;

let image;
let dw = 0, dh = 0;
let freq;
let minSize;
let px = [];

export default class P5Renderer implements BaseRenderer{

    recording: boolean = false;
    colors = ['#D1CDC4', '#340352', '#732A70', '#FF6EA7', '#FFE15F'];
    backgroundColor = '#FFFFFF';

    canvas: HTMLCanvasElement;
    s: any;

    completeCallback: any;
    delta = 0;
    animating = true;

    width: number = 1920 / 2;
    height: number = 1080 / 2;

    size: number;

    x: number;
    y: number;

    constructor(w, h) {

        this.width = w;
        this.height = h;

        const sketch = (s) => {
            this.s = s;
            s.pixelDensity(1);
            s.setup = () => this.setup(s)
            s.draw = () => this.draw(s)
        }

        new P5(sketch);
    }

    protected setup(s) {
        let renderer = s.createCanvas(this.width, this.height);
        this.canvas = renderer.canvas;
        s.background(0, 0, 0, 255);
        s.colorMode(s.HSB);

        this.x = -10;
        this.y = s.height;
    }

    protected draw(s) {
        if (this.animating) { 
            this.delta += 0.1;
            s.colorMode(s.RGB);
            s.background(0, 0, 0, 10);

            s.colorMode(s.HSB);

            for (let i = 0; i < 10; i++) {
                let x = this.x;
                let y = (s.height / 2) + s.cos(this.delta) * (i + 1) * 2;
                y += s.cos(this.delta / 10) * (i + 1) * 10;

                s.noFill();
                s.circle(x, y, 20);
                s.stroke(((1 + i * 5) + this.delta * 10) % 360, 255, 255, 255)
            }

            let inc = 5;
            this.x = this.x > s.width ? -10 : this.x + inc;
        }
    }

    public render() {

    }

    public play() {
        this.recording = true;
        this.animating = true;

        setTimeout(() => {
            this.completeCallback();
        }, 10000)
    }

    public stop() {
        this.animating = false;
    }

    public setCompleteCallback(completeCallback: any) {
        this.completeCallback = completeCallback;
    }

    public resize() {
        this.s.resizeCanvas(window.innerWidth, window.innerHeight);
        this.s.background(0, 0, 0, 255);
    }
}