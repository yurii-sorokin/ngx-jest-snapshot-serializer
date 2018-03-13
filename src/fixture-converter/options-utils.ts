import * as escapeRegExp from 'escape-string-regexp'

const rRegExpString = /^\/(.*)\/([a-z]*)$/
const parseMatchOption = (value: string): RegExp => {
  const [, regExp = '', flags = ''] = value.match(rRegExpString) || []

  return regExp
    ? new RegExp(regExp, flags)
    : new RegExp(`^${escapeRegExp(value)}$`)
}

export {
  parseMatchOption
}
