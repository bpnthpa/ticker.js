# ticker.js
A very simple timer supposed to tick every second and emits elapsed seconds.


Methods beside all EventEmitter() methods:
- `start()`: starts ticker. Ticking starts from next realworld second tick. "tick" event is emitted with elapsed seconds from last tick.
- `stop()`: stops ticker. No "tick" emitted.
- `test()`: displays information comparing realworld elapsed seconds and elapsed seconds from ticker
- `comparewithRTC()`: displays computed time by adding elapsed seconds received from ticker and realworld time in RTC format
