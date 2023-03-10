import { parse } from 'node-html-parser/dist/nodes/html'

/**
 * Get the current IPv4 address
 */
async function getIpAddress(): Promise<string | undefined> {
    const rsp = await fetch('https://www.portchecktool.com')
    const html = parse(await rsp.text())
    return html.querySelector('#input-ip')?.getAttribute('value')
}

/**
 * Check the specified port
 *
 * If the port is open, the reason will contain your IPv4 address.
 */
async function checkPort(port: number): Promise<
    | {
          port: number
          isOpen: boolean
          reason: string
      }
    | undefined
> {
    if (!Number.isInteger(port)) {
        throw new Error('Port must be an integer.')
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
            .replace(/[\r\t\f\v]|&nbsp;/g, '')
            .replace(/[\n]/g, ' ')
            .trim()
            .substring(2)
        return {
            port: port,
            isOpen: true,
            reason: reason,
        }
    }
    if (alert.classList.contains('alert-error')) {
        const reason = alert.innerText
            .substring(alert.innerText.indexOf('Reason:') + 7)
            .normalize()
            .trim()
            .replace('&nbsp;', '')
        return {
            port: port,
            isOpen: false,
            reason: reason,
        }
    }
}
export { checkPort, getIpAddress }
