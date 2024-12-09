import ReduxProvider from '@/app/ReduxProvider'
import React from 'react'
import Navbar from './Navbar'

const Nav = () => {
  return (
    <ReduxProvider>
        <Navbar />
    </ReduxProvider>
  )
}

export default Nav