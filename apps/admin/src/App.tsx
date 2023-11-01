import { AppGlobalProvider } from 'src/contexts/app-global.context'
import KRSProviders from 'src/components/providers'
import AppRouter from 'src/components/routes'

function App() {
  return (
    <AppGlobalProvider>
      <KRSProviders>
        <AppRouter />
      </KRSProviders>
    </AppGlobalProvider>
  )
}

export default App
