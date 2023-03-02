import { parse } from 'node-html-parser/dist/nodes/html'

class PortCheckTool {
    async checkPort(port: number) {
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
                isOpen: false,
                reason: reason,
            }
        }
    }
}

export default PortCheckTool
