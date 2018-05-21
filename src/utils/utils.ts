/**
 * 生成随机字符串
 *
 * @export
 * @returns {string}
 */
export function generateRandomString(): string {
  return Math.random().toString(36).substr(2);
}

/**
 * 弹出新窗口
 *
 * @export
 * @param {string} url
 * @param {string} title
 * @param {number} w
 * @param {number} h
 */
export function popup(url: string, title: string, w: number, h: number): void {
  const dualScreenLeft = window.screenLeft
  const dualScreenTop = window.screenTop

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop
  const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

  if (window.focus && newWindow) {
    newWindow.focus()
  }
}

/**
 * 通过 localStorage 发送信息
 *
 * @export
 * @param {string} message
 */
export function sendMessage(message: string): void {
  localStorage.setItem('message', message)
  localStorage.removeItem('message')
}

/**
 * 等待
 *
 * @export
 * @param {number} ms
 * @returns
 */
export function wait(ms: number): Promise<any>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}