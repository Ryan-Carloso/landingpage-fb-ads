'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'

const supabase = createClient(
  'https://tlaihqorrptgeflxarvm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYWlocW9ycnB0Z2VmbHhhcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxMDgxMzksImV4cCI6MjAzNzY4NDEzOX0.B5fs0W2dXZPSmKmZ2yoMxVg4n6JBEpdBQh8ZRHOxoBY'
)

export default function Home() {
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const whatsappNumbers = ['+351962248268', '+37257851513', '+447440156075', '+351935992291']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('leads')
        .insert({ whatsapp, email })

      if (error) throw error

      alert('Dados enviados com sucesso!')
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
      alert('Ocorreu um erro ao enviar os seus dados. Por favor, tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    const randomIndex = Math.floor(Math.random() * whatsappNumbers.length)
    const randomWhatsappNumber = whatsappNumbers[randomIndex]

    const whatsappUrl = `https://wa.me/${randomWhatsappNumber}?text=${encodeURIComponent(
      'Olá, gostava de começar a usar o WinnerGPT à borla!'
    )}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-700 via-green-600 to-green-500 flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl">
        <h1 className="flex flex-col items-center mb-6 text-4xl font-extrabold text-gray-900">
          <span className="mb-2">Acesso Gratuito ao</span>
          <div className="flex items-center">
            <span className="text-green-600 text-4xl font-bold mr-2">WinnerGPT</span>
            <Image
              src="/icon.png"
              width={50}
              height={50}
              alt="FootballPro AI icon"
              className="rounded-full"
            />
          </div>
        </h1>
        <p className="mb-6 text-center text-gray-700">
          A aplicação inteligente que te ajuda a analisar jogos de futebol e melhorar suas apostas. Aproveite esta oferta exclusiva por tempo limitado!
        </p>
        <div className="mb-6 flex justify-center space-x-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Precisão</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">500+</div>
            <div className="text-sm text-gray-600">Usuários</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">Gratuito</div>
            <div className="text-sm text-gray-600">apenas hoje!</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="whatsapp" className="block mb-2 text-sm font-medium text-gray-700">
              O teu número de WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ex: +351 948 968 972"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              O teu e-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Ex: nome@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleWhatsAppRedirect}
            className="w-full px-6 py-3 text-white bg-green-600 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'A Enviar...' : 'Quero Acesso Agora'}
          </button>
        </form>
        <p className="mt-2 text-sm text-center text-gray-500">
          Será redirecionado para o WhatsApp para receber as instruções sobre como instalar a aplicação.
        </p>
        <p className="mt-6 text-sm text-center text-gray-500">
          Garantimos a segurança dos teus dados. Esta oferta é válida por tempo limitado.
        </p>
      </div>
    </main>
  )
}