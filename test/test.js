const portCheckTool = require('portchecktool-api')

console.log(portCheckTool)

portCheckTool.checkPort(80).then((rsp) => {
    console.log(rsp)
})

portCheckTool.checkPort(65535).then((rsp) => {
    console.log(rsp)
})

portCheckTool.getIpAddress().then((ip) => {
    console.log(ip)
})
