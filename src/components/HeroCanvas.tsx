'use client'

import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Performance detection - runs once on mount
function usePerformanceLevel() {
  const [level] = useState<'high' | 'medium' | 'low'>(() => {
    if (typeof window === 'undefined') return 'high'
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (hasReducedMotion) return 'low'
    if (isMobile) return 'medium'
    return 'high'
  })
  return level
}

const getPerformanceSettings = (level: string) => {
  switch (level) {
    case 'low':
      return { dpr: 1, segments: 32, distort: 0.2, speed: 0.35, floatIntensity: 0.4, particleCount: 60 }
    case 'medium':
      return { dpr: 1.3, segments: 40, distort: 0.3, speed: 0.42, floatIntensity: 0.55, particleCount: 80 }
    case 'high':
    default:
      return { dpr: Math.min(2, window.devicePixelRatio), segments: 56, distort: 0.38, speed: 0.5, floatIntensity: 0.7, particleCount: 100 }
  }
}

// Memoized gradient shader (regular function)
const createGradientMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#8b5cf6') },
      uColor2: { value: new THREE.Color('#ec4899') },
      uColor3: { value: new THREE.Color('#06b6d4') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        float t = uTime * 0.12;
        vec3 color = mix(uColor1, uColor2, sin(vUv.x * 6.28 + t) * 0.5 + 0.5);
        color = mix(color, uColor3, cos(vUv.y * 6.28 - t * 0.6) * 0.5 + 0.5);
        float rim = pow(1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
        color += rim * 0.35;
        gl_FragColor = vec4(color, 0.92);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  })
}

// Memoized particle system
const useParticles = (count: number) => {
  return useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.3 + Math.random() * 1.7
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.8
      positions[i * 3 + 2] = Math.sin(angle) * radius
      sizes[i] = Math.random() * 1.5 + 0.5
    }
    return { positions, sizes, count }
  }, [count])
}

// Main 3D Ring Component
function AbstractRing({ settings, gradientMaterial }: { settings: ReturnType<typeof getPerformanceSettings>, gradientMaterial: THREE.ShaderMaterial }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const particles = useParticles(settings.particleCount)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.08) * 0.12 + 0.35
      ringRef.current.rotation.y = time * 0.12
      ringRef.current.rotation.z = Math.cos(time * 0.06) * 0.04
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = Math.cos(time * 0.1) * 0.12 - 0.18
      innerRingRef.current.rotation.y = -time * 0.1
      innerRingRef.current.rotation.z = Math.sin(time * 0.08) * 0.06
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04
    }
    
    gradientMaterial.uniforms.uTime.value = time
  })

  return (
    <Float speed={settings.speed} rotationIntensity={0.15} floatIntensity={settings.floatIntensity}>
      <group>
        <mesh ref={ringRef}>
          <torusGeometry args={[1.9, 0.35, settings.segments, settings.segments * 2]} />
          <primitive object={gradientMaterial} attach="material" />
        </mesh>
        
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.35, 0.12, settings.segments / 2, settings.segments]} />
          <MeshDistortMaterial
            color="#ec4899"
            emissive="#8b5cf6"
            emissiveIntensity={0.25}
            roughness={0.25}
            metalness={0.75}
            distort={settings.distort}
            speed={1.8}
            transparent
            opacity={0.75}
          />
        </mesh>
        
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.45, settings.segments / 2, settings.segments / 2]} />
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#3b82f6"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.85}
            distort={settings.distort * 0.4}
            speed={2.5}
          />
        </mesh>
        
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particles.count} array={particles.positions} itemSize={3} />
            <bufferAttribute attach="attributes-size" count={particles.count} array={particles.sizes} itemSize={1} />
          </bufferGeometry>
          <pointsMaterial size={0.025} color="#8b5cf6" transparent opacity={0.55} sizeAttenuation />
        </points>
      </group>
    </Float>
  )
}

// Camera controller
function CameraController() {
  const { camera } = useThree()
  
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    camera.position.set(0, 0, isMobile ? 6.5 : 5.5)
  }, [camera])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    camera.position.x = Math.sin(time * 0.08) * 0.25
    camera.position.y = Math.cos(time * 0.06) * 0.15
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Scene Component
function Scene({ performanceLevel }: { performanceLevel: string }) {
  const settings = getPerformanceSettings(performanceLevel)
  const gradientMaterial = useMemo(() => createGradientMaterial(), [])

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 5, 5]} intensity={0.45} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.25} color="#8b5cf6" />
      <pointLight position={[0, 3, 0]} intensity={0.65} color="#ec4899" distance={12} />
      <pointLight position={[0, -3, 0]} intensity={0.4} color="#06b6d4" distance={12} />
      
      <AbstractRing settings={settings} gradientMaterial={gradientMaterial} />
      <Preload all />
    </>
  )
}

// Main Export
export default function HeroCanvas() {
  const performanceLevel = usePerformanceLevel()
  const settings = getPerformanceSettings(performanceLevel)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/25 via-transparent to-transparent" />
    )
  }

  return (
    <div className="canvas-container">
      <Canvas
        dpr={settings.dpr}
        gl={{
          antialias: performanceLevel !== 'low',
          alpha: true,
          powerPreference: 'default',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <Scene performanceLevel={performanceLevel} />
      </Canvas>
    </div>
  )
}
