import './globals.css'
import AuthProvider from './context/AuthProvider'

export const metadata = {
  title: 'Agenda - Iniciar sesión',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}
