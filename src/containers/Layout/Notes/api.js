export const getNotesApi = async function () {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
      mode: "cors"
    })
    const res = await data.json()
    return res
  } catch (err) {
    console.error(err.message)
  }
}