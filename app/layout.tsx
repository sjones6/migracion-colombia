import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Migration Colombia',
  description: 'Easily find which migracion locations have available appointments',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-screen w-screen'>
      <body className={`${inter.className} h-screen w-screen overflow-hidden flex flex-col`}>
        <nav className='flex flex-row justify-between border-b border-gray-700'>
          <div className='p-8'>
            <h1 className='font-bold font-2xl'>Migration Colombia</h1>
          </div>
          <div className='flex-grow flex flex-row justify-end gap-4 p-8'>
            <a className='bg-white hover:text-gray-900 active:text-gray-900 py-1 px-3 text-gray-600 hover:ring ring-white ring-offset-2 rounded flex flex-row gap-2 align-items-center' href="https://agendamigracol.naturasoftware.com/agenda" rel="noreferer noopener">
              Schedule appointment
              <ArrowTopRightOnSquareIcon className='w-6 h-6' />
            </a>
          </div>
        </nav>
        <main className="flex-grow flex flex-row justify-center overflow-scroll py-12">
          <div className='h-full'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
