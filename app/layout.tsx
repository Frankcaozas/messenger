import { Toaster } from "react-hot-toast"
import AuthContext from "./context/AuthContext"
import './globals.css'



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

      <body className="">
        <AuthContext>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
