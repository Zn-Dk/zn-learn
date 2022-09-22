interface List {
  name: string
  age: number
}

export default function (url: string): Promise<List[]> {
  return new Promise(resolve => {
    const xhr: XMLHttpRequest = new XMLHttpRequest()

    xhr.open('GET', url)

    xhr.send(null)

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setTimeout(() => {
          console.log(JSON.parse(xhr.responseText))
          resolve(JSON.parse(xhr.responseText))
        }, 3000)
      }
    }
  })
}
