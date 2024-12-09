import React from 'react'
import ReduxProvider from '../ReduxProvider'
import Cart from '@/components/Cart'

const page = () => {
  return (
    <ReduxProvider>
      <Cart />
    </ReduxProvider>
  )
}

export default page