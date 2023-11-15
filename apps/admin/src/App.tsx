import KRSProviders from 'src/components/providers'
import AppRouter from 'src/components/routes'

function KRSApp() {
  return (
    <KRSProviders>
      <AppRouter />
    </KRSProviders>
  )
}

export default KRSApp
