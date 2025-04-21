// app/layout.tsx
'use client'

import './globals.css'
import { ReactNode, useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './wagmiConfig'

export default function RootLayout({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <html lang="en">
        <body>
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiConfig>
        </body>
        </html>
    )
}
