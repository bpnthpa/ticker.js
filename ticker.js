"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparewithRTC = exports.stoptest = exports.test = exports.off = exports.on = exports.stop = exports.start = void 0;
const events_1 = require("events");
const ticker = new events_1.EventEmitter();
/*
tickEmitter.on('tick', (elapsedSeconds: Number) => {
    //console.log(elapsedSeconds);
}
);
*/
let tickerInterval;
let startTime = 0;
let nowTime = 0;
let elapsedSeconds = 0;
let isON = false;
function start() {
    isON = true;
    tickerInterval = setTimeout(startActualTicker, 1000 - Date.now() % 1000);
}
exports.start = start;
function startActualTicker() {
    startTime = Math.floor(Date.now() / 1000);
    console.log('ticking');
    tickerInterval = setTimeout(tick, 1000 - Date.now() % 1000);
}
function tick() {
    nowTime = Math.floor(Date.now() / 1000);
    elapsedSeconds = nowTime - startTime;
    if (elapsedSeconds > 0) {
        ticker.emit('tick', elapsedSeconds);
        startTime = nowTime;
    }
    if (isON)
        tickerInterval = setTimeout(tick, 1000 - Date.now() % 1000);
}
function stop() {
    isON = false;
    console.log("ticking stopped");
}
exports.stop = stop;
function on(event, listener) {
    ticker.on(event, listener);
}
exports.on = on;
function off(event, listener) {
    ticker.off(event, listener);
}
exports.off = off;
let testsum = 0;
let testavg = 0;
let testcount = 0;
let testdrift = 0;
let testelapsedTime = 0;
let teststart = Date.now();
let testend;
let testisFirst = 1;
function testListener(elapsedSeconds) {
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
function test() {
    ticker.on('tick', testListener);
}
exports.test = test;
function stoptest() {
    ticker.off('tick', testListener);
}
exports.stoptest = stoptest;
let clockMilliseconds;
let programTime;
let actualTime;
let isFirst;
function updateandcheck(elapsedSeconds) {
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
function comparewithRTC() {
    isFirst = true;
    ticker.on('tick', updateandcheck);
}
exports.comparewithRTC = comparewithRTC;
//# sourceMappingURL=ticker.js.map