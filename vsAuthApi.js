
const socket = io({
  transports: ['websocket']
});

// on reconnection, reset the transports option, as the Websocket
// connection may have failed (caused by proxy, firewall, browser, ...)
socket.io.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});

// function makeWS() {
//   let opts = {};
//   if (_about.Proxy) opts.agent = new proxyAgent(_about.Proxy);
//   ws = new WS(db.config.url, opts);
//   ws.alive = true;
//   ws.on('pong', () => {
//     ws.alive = true;
//     for (let q of msgQueue) if (q.n > 2) wsSend(q.msg);
//   });
//   ws.on('error', err => db.logger.error(err.message));
//   ws.on('open', () => {
//     db.logger.debug(`Connected to ${db.config.url = ws.url}${_about.Proxy ? ' via ' + _about.Proxy : ''}`);
//     wsSend({method: "cConnect", platform: "desktop", version: app.getVersion()})
//   })
//   ws.on('message', msg => {
//     if (!_error) procMessage(msg)
//   });
//   ws.on('close', (code, reason) => {
//     ws.alive = false;
//     db.logger.error(`closed ${code} ${reason}`);
//   });
// }