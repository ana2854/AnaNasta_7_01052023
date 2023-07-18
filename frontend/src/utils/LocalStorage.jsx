/*export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function removeItem(key) {
  localStorage.removeItem(key)
}
*/

export function setItem(key, value) {
  console.log(`Setting item with key "${key}" in local storage...`)
  localStorage.setItem(key, JSON.stringify(value))
  console.log(`Item with key "${key}" set in local storage.`)
}

export function getItem(key) {
  console.log(`Getting item with key "${key}" from local storage...`)
  const value = JSON.parse(localStorage.getItem(key))
  console.log(`Item with key "${key}" retrieved from local storage:`, value)
  return value
}

export function removeItem(key) {
  console.log(`Removing item with key "${key}" from local storage...`)
  localStorage.removeItem(key)
  console.log(`Item with key "${key}" removed from local storage.`)
}
