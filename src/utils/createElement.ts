const replaceQuote = (str: string): string => str.replace(/__QUOTE_LEFT__/g, '<')

export const createElement = (tag: string): Function => (content = ''): string => {
  return replaceQuote(
    `__QUOTE_LEFT__${tag}>${content}__QUOTE_LEFT__/${tag}>`
  )
}