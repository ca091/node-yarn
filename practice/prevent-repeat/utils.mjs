// => encapsulation:
// want: throttlePromise(fn) => fn

export function throttlePromise(fn) {
  let fetchPromiseMap = new Map()

  return (...args) => {
    console.log('call fn args', args)
    if (fetchPromiseMap.has(args[0])) {
      return fetchPromiseMap.get(args[0])
    }

    let promise = fn(...args)
      .finally(() => {
        fetchPromiseMap.delete(args[0])
      })

    fetchPromiseMap.set(args[0], promise)

    return promise
  }
}
