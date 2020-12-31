
class Storage {
  setItem(key, value) {
    if (value) {
      const sValue = JSON.stringify(value)
      localStorage.setItem(key, sValue)
      return this  // returning the storage context itself
    }
  }

  getItem(key) {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : {}  // if there's an item, parse it and return it
  }
}


export default new Storage()
