import { Ticker, Tickable } from '../Ticker';

const intervalMs = 150;

const ticker = new Ticker(intervalMs, false);

const tickable: Tickable = {
    tick: (deltaTimeMillis) => {
        console.log(`Hello every ${intervalMs}ms!`);
    }
}

ticker.addTickable(tickable);

ticker.start();