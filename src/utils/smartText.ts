const URL_REG =
  /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

const smartText = (text?: string) => {
  if (!text) {
    return text
  }
  const reg = new RegExp(URL_REG, 'gi')
  return text.replace(reg, '<a href="$1" target="_blank">$1</a>')
}

export default smartText