import { Nunito } from "next/font/google"
import './globals.css'
import { Toaster } from "react-hot-toast"
import AuthContext from "./context/AuthContext"
const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger',
  description: 'Messenger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={font.className}>
        <AuthContext>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
