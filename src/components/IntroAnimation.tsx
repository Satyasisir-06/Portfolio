'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
    x: number
    y: number
    targetX: number
    targetY: number
    size: number
    color: string
    vx: number
    vy: number
}

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const init = async () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            // Wait for fonts to load
            try {
                await document.fonts.ready
            } catch (e) {
                // Fallback if fails
            }

            // Create offscreen canvas for text analysis
            const offscreen = document.createElement('canvas')
            offscreen.width = canvas.width
            offscreen.height = canvas.height
            const offCtx = offscreen.getContext('2d')
            if (!offCtx) return

            // Draw text
            const fontSize = Math.min(canvas.width / 8, 120)
            offCtx.font = `bold ${fontSize}px Inter, sans-serif`
            offCtx.fillStyle = 'white'
            offCtx.textAlign = 'center'
            offCtx.textBaseline = 'middle'
            offCtx.fillText('Satya Sisir', canvas.width / 2, canvas.height / 2)

            // Scan for pixels
            const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data
            const step = 4 // Skip pixels for performance and aesthetic

            particles = []

            for (let y = 0; y < canvas.height; y += step) {
                for (let x = 0; x < canvas.width; x += step) {
                    const index = (y * canvas.width + x) * 4
                    if (imageData[index + 3] > 128) {
                        particles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            targetX: x,
                            targetY: y,
                            size: Math.random() * 2 + 1,
                            color: `hsl(${Math.random() * 60 + 240}, 100%, 70%)`, // Blue-Purple range
                            vx: 0,
                            vy: 0
                        })
                    }
                }
            }
        }

        const animate = () => {
            // Fade out effect
            ctx.fillStyle = 'rgba(5, 5, 6, 0.2)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            let arrivedCount = 0

            particles.forEach(p => {
                const dx = p.targetX - p.x
                const dy = p.targetY - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < 1) {
                    p.x = p.targetX
                    p.y = p.targetY
                    arrivedCount++
                } else {
                    p.x += dx * 0.08
                    p.y += dy * 0.08
                }

                ctx.fillStyle = p.color
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })

            if (arrivedCount === particles.length && particles.length > 0) {
                // Animation finished holding phase
                setTimeout(() => {
                    setIsVisible(false)
                    setTimeout(onComplete, 500) // Call onComplete after fade out starts
                }, 1000)
            } else {
                animationFrameId = requestAnimationFrame(animate)
            }
        }

        init().then(() => {
            animate()
        })

        const handleResize = () => {
            init().then(() => {
                // Restart animation loop if needed? 
                // In this simple version, resize resets particles randomly. 
                // We might not want to restart animate loop if it's already running, 
                // but for simplicity it's fine as animate() cleans itself up? No it doesn't.
                // Actually `animate` loops using requestAnimationFrame.
                // If we re-run init, `particles` array is replaced. 
                // `animate` uses `particles` variable from closure scope.
                // So `animate` loop will just start using new particles.
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
                >
                    <canvas ref={canvasRef} className="block" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
