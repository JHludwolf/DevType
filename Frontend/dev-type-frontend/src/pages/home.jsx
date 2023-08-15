import React from 'react'
import TextEditorWindow from '../components/textEditorWindow'
import '../style/home/home.css'

const Home = () => {
  return (
    <div className="home-div">
      <h1 className='home-h1'>DevType</h1>
      <TextEditorWindow />
    </div>
  )
}

export default Home

