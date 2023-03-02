import { parse } from 'node-html-parser/dist/nodes/html'

/**
 * Check the specified port to see status
 */

async function getIpAddress() {
    const rsp = await fetch('https://www.portchecktool.com')
    const html = parse(await rsp.text())
    return html.querySelector('#input-ip')?.getAttribute("value")
}

async function checkPort(port: number) {
    if (!Number.isInteger(port)) {
        throw new Error("Port must be an integer.")
    }
    const data = new FormData()
    data.append('port', port.toString())
    data.append('submit', 'Check+your+port')
    const rsp = await fetch('https://www.portchecktool.com', {
        method: 'post',
        body: data,
    })
    const html = parse(await rsp.text())
    const alert = html.querySelector('.alert')
    if (!alert) {
        return
    }
    // Open port
    if (alert.classList.contains('alert-success')) {
        const reason = alert.innerText
            .normalize()
            .substring(1)
            .trim()
            .replace('\\n\\t', '')
        return {
            port: port,
            isOpen: true,
            reason: reason,
        }
    }
    if (alert.classList.contains('alert-error')) {
        const reason = alert.innerText
            .substring(alert.innerText.indexOf('Reason:'))
            .normalize()
            .trim()
        return {
            port: port,
            isOpen: false,
            reason: reason,
        }
    }
}
export { checkPort, getIpAddress }
