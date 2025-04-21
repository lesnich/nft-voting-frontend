'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function Home() {
    const { address, isConnected } = useAccount()
    const { connect, connectors, error, isLoading } = useConnect()
    const { disconnect } = useDisconnect()

    const injectedConnector = connectors.find((c) => c.id === 'injected')

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-4">NFT Voting DApp</h1>

            {isConnected ? (
                <>
                    <p className="mb-2">👛 Підключено: {address}</p>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => disconnect()}
                    >
                        Відключити
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        onClick={() => connect({ connector: injectedConnector })}
                        disabled={isLoading || !injectedConnector}
                    >
                        {isLoading ? 'Підключення...' : 'Підключити MetaMask'}
                    </button>
                    {error && (
                        <p className="text-red-600 mt-4">Помилка: {error.message}</p>
                    )}
                </>
            )}
        </main>
    )
}
