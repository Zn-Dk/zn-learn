import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function About() {
  const [flag, setFlag] = useState(false)

  return (
    <div>
      <h2>This is About</h2>
    </div>
  )
}
