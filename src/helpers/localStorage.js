export async function getItem(key) {
  const item = localStorage.getItem(key)
  if (!item) throw new Error("Item is not defined!")
  return JSON.parse(item) 
}

export async function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}