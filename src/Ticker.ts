
export interface Tickable {
    tick: (deltaTimeMillis: number) => void;
}

export class Ticker {
    readonly delayMs: number;
    private readonly tickables: Tickable[] = [];
    private readonly realtime: boolean;

    private prevTime: number = 0;
    private running: boolean = false;

    constructor(delayMs: number, realtime: boolean){
        this.delayMs = delayMs;
        this.realtime = realtime;
    }

    addTickable = (tickable: Tickable) => {
        if(this.tickables.indexOf(tickable) == -1) this.tickables.push(tickable);
    }

    removeTickable = (tickable: Tickable) => {
        const index = this.tickables.indexOf(tickable);
        if(index >= 0) this.tickables.splice(index, 1);
    }

    start = () => {
        this.running = true;
        this.tick();
    }

    stop = () => {
        this.running = false;
        this.prevTime = 0;
    }

    private tick = () => {
        const startTime = Date.now();

        let timeDiffMillis = this.delayMs;

        if(this.realtime){
            timeDiffMillis = this.prevTime == 0 ? this.delayMs : startTime - this.prevTime;
        }

        for(let i = 0; i < this.tickables.length; i++){
            this.tickables[i].tick(timeDiffMillis);
        }

        this.prevTime = startTime;

        const executionTime = Date.now() - startTime;

        const delay = Math.max(this.delayMs - executionTime, 0);

        if(this.running){
            setTimeout(this.tick, delay);
        }
    }
}
