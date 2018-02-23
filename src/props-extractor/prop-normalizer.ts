const rComplexValue = /Observable|Promise/

const simplifyComplexValue = (value: any) =>
  Object.create(value.constructor.prototype)

const isComplexValue = (value: any) =>
  value && value.constructor && value.constructor.name.match(rComplexValue)

const normalizeProp = (value: any) =>
  isComplexValue(value) ? simplifyComplexValue(value) : value

export {
  normalizeProp
}
