class Iframe {

  $dom: HTMLElement

  constructor(el: HTMLElement) {
    this.$dom = el
  }

  setHTML(html: string): void {
    const iframe = this.createIframe()

    if(this.$dom.parentNode) {
      this.$dom.parentNode.replaceChild(iframe, this.$dom)
    }
    if(iframe.contentWindow) {
      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(html)
      iframe.contentWindow.document.close()
    }

    this.$dom = iframe
  }

  createIframe(): HTMLIFrameElement {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('scrolling', 'yes')
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.border = '0'
    return iframe
  }
}

export default Iframe