'use client'

import { useState } from 'react'
import { writeContract } from 'wagmi/actions'
import { contractAbi } from '@/abi/VotingContractNFT.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

export default function CreateVotingForm() {
    const [title, setTitle] = useState('')
    const [options, setOptions] = useState([''])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options]
        newOptions[index] = value
        setOptions(newOptions)
    }

    const addOption = () => {
        setOptions([...options, ''])
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const result = await writeContract(
                {
                    address: contractAddress,
                    abi: contractAbi,
                    functionName: 'createVoting',
                },
                {
                    args: [title, options],
                }
            )
            setSuccess('✅ Голосування створено! Tx: ' + result.hash)
        } catch (err: any) {
            console.error(err)
            setError('❌ Помилка: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-bold mb-4">Створити нове голосування</h2>
            <input
                className="border p-2 mb-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Назва голосування"
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    className="border p-2 mb-2 w-full"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Опція ${index + 1}`}
                />
            ))}
            <div className="flex items-center gap-2 mb-2">
                <button
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded"
                    onClick={addOption}
                >
                    ➕ Додати опцію
                </button>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Створення...' : 'Створити голосування'}
                </button>
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    )
}
