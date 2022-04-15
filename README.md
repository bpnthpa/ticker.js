# ticker.js
A very simple timer supposed to tick every realworld second and emits `"tick"` event and `elapsed seconds` after last tick.</br>

Methods beside all EventEmitter() methods:
- `start()`: starts ticker. Ticking starts from next realworld second tick. `"tick"` event is emitted with `elapsed seconds` from last tick.
- `on("tick", listener)`: attach listener to `"tick"` event.
-  `listener`: function that receives `elapsedSeconds` as argument eg. `onTick(elapsedSeconds)`
- `stop()`: stops ticker. No `"tick"` emitted.
- `test()`: displays information comparing realworld elapsed seconds and elapsed seconds from ticker
- `comparewithRTC()`: displays computed time by adding elapsed seconds received from ticker and realworld time in RTC format

## Node
```javascript
import * as ticker from "./ticker.js"

ticker.start();
ticker.on("tick",(elapsedSeconds) => { //do something } );

ticker.comparewithRTC(); // test
ticker.stop();
```
