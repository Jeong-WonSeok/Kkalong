export default function FormDataChange(data: any) {
  const formdata = new FormData()
  const info = new Object()

  Object.entries(data).map(([key, value]) => {
    if (key.includes("img")) {
      return formdata.append("file", value as any)
    } else {
      return formdata.append(String(key), value as any)
    }
  })

  // formdata.append("data", new Blob([JSON.stringify(info)], {type: "application/json"}))
  
  return formdata
}