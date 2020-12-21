
/**
 * throttle
 * @param {Number} time
 * @param {Function} fn
 * @returns null
 */

export const throttle = (timeout = 0, fn) => {
  let throttleTimeout = null
  return ()=>{
    if(throttleTimeout) return
    throttleTimeout = setTimeout(() => {
      throttleTimeout = null
      fn()
    }, timeout);
  }
}