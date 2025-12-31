import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ClientLayout } from './ClientLayout'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Architectenbureau Jules Zwijsen | Architect van het Samenspel',
    description: "Architect in de Vechtstreek en 't Gooi voor exclusieve villabouw, verbouw en landhuizen.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
            <body className="arch-grid antialiased">
                <div className="noise" />
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
