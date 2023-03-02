const PortCheckTool = require('portchecktool-api').default

const portchecktool = new PortCheckTool()
portchecktool.checkPort(80).then((rsp) => {
    console.log(rsp)
})
