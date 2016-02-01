After running npm install go to ./node_modules/socket.io-client/socket.io.js and change line 2985 from  
`var isAndroid = navigator.userAgent.match(/Android/i);` to `var isAndroid = /Android/i.test(navigator.userAgent);`

That should stop the client from crashing (because navigator.userAgent is null) but also means you don't have to do the hack of setting it in your code, which breaks when the Chrome debugger window is open.