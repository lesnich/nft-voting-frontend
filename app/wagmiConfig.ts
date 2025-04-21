// app/wagmiConfig.ts
'use client'

import { createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { sepolia } from 'wagmi/chains'
import { http } from 'viem'

export const config = createConfig({
    chains: [sepolia],
    connectors: [injected()],
    publicClient: http()
})
