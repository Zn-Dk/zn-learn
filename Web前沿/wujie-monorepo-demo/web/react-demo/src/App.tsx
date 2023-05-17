import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { foo,rdm, fetchData } from 'common'


function App() {
  const [data, setData] = useState(null)
  const [msgFromMain, setMsgFromMain] = useState('')
  const [msgFromVue, setMsgFromVue] = useState('')
  useEffect(() => {
    getData()

    window.$wujie?.bus?.$on('main',(msg:string)=>{
      setMsgFromMain(msg)
    })
    window.$wujie?.bus?.$on('msg-vue',(msg:string)=>{
      setMsgFromVue(msg)
    })
  }, [])

  const getData = async () => {
    const data = await fetchData()
    setData(data);
  }

  const sendMsgToMain = () =>{
    window.$wujie?.bus?.$emit('sub-react','hello from react')
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div>foo is: {foo}</div>
      <div>random is: {rdm(123)}</div>
      <div>random is: {rdm(123)}</div>
      <div>data is: {JSON.stringify(data)}</div>
      <div>
        msgFromMain: {msgFromMain}
        msgFromVue: {msgFromVue}
      </div>
      <div>
        <button onClick={sendMsgToMain}>sendMsgToMain</button>
      </div>
    </>
  )
}

export default App
