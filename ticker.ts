import { EventEmitter } from "events";
const ticker = new EventEmitter();

/*
tickEmitter.on('tick', (elapsedSeconds: Number) => {
    //console.log(elapsedSeconds);
}
);
*/

let tickerInterval: NodeJS.Timer;
let startTime = 0;
let nowTime = 0;
let elapsedSeconds = 0;
let isON = false;

export function start(): void {
    isON = true;
    tickerInterval = setTimeout(startActualTicker, 1000 - Date.now() % 1000);
}

function startActualTicker(): void {
    startTime = Math.floor(Date.now() / 1000);
    console.log('ticking');
    tickerInterval = setTimeout(tick, 1000 - Date.now() % 1000);
}

function tick(): void {
    nowTime = Math.floor(Date.now() / 1000);
    elapsedSeconds = nowTime - startTime;
    if (elapsedSeconds > 0) {
        ticker.emit('tick', elapsedSeconds);
        startTime = nowTime;
    }
    if (isON) tickerInterval = setTimeout(tick, 1000 - Date.now() % 1000);
}

export function stop(): void {
    isON = false;
    console.log("ticking stopped");
}

export function on(event: string, listener: (...args: any[]) => void): void {
    ticker.on(event, listener);
}

export function off(event: string, listener: (...args: any[]) => void) {
    ticker.off(event, listener);
}

let testsum = 0;
let testavg = 0;
let testcount = 0;
let testdrift = 0;
let testelapsedTime: number = 0;
let teststart = Date.now();
let testend: number;
let testisFirst = 1;

function testListener(elapsedSeconds: number) {
    testend = Date.now();
    if (testisFirst) {
        teststart = testend;
        testisFirst = 0;
        return;
    }
    testsum += testend - teststart;
    testcount += elapsedSeconds;
    testavg = testsum / testcount;
    testdrift = testsum / 1000 - testcount;
    console.log("sum: %f, count: %f, average: %f, drift: %f", (testsum / 1000).toPrecision(10), testcount.toPrecision(10), testavg.toPrecision(10), testdrift.toPrecision(10));
    teststart = testend;
}

export function test(): void {
    ticker.on(
        'tick',
        testListener
    );
}

export function stoptest() {
    ticker.off('tick', testListener);
}

let clockMilliseconds: number;
let programTime: Date;
let actualTime: Date;
let isFirst: boolean;
function updateandcheck(elapsedSeconds: number) {
    if (isFirst) {
        clockMilliseconds = Date.now(); 
        isFirst = false;
    }
    else {
        clockMilliseconds += elapsedSeconds * 1000;
    }
    programTime = new Date(clockMilliseconds);
    actualTime = new Date();
    console.log("clockmilliseconds: ", clockMilliseconds, " program time: ", programTime.toLocaleTimeString(), "actual time: ", actualTime.toLocaleTimeString());
}

export function comparewithRTC() {
    isFirst = true;
    ticker.on(
        'tick',
        updateandcheck
    );
}