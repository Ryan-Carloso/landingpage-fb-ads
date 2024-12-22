'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tlaihqorrptgeflxarvm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY'
)

export default function Home() {
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert({ whatsapp, email })

      if (error) throw error

      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá, gostaria de receber o produto gratuito!')}`
      window.location.href = whatsappUrl
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent('Olá, gostaria de receber o produto gratuito!')}`
      window.location.href = whatsappUrl
      alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Receba seu Produto Gratuito!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="whatsapp" className="block mb-2 text-sm font-medium text-gray-700">
              WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Receber Produto Gratuito'}
          </button>
        </form>
      </div>
    </main>
  )
}

