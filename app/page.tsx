import HomePage from '@/components/Home'
import ReduxProvider from './ReduxProvider'

const Home = () => {
  return (
     <ReduxProvider>
        <HomePage/>
     </ReduxProvider>
  )
}

export default Home