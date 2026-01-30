'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Aggressive mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const check = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                     window.innerWidth < 768 ||
                     navigator.hardwareConcurrency <= 4
      setIsMobile(mobile)
    }
    
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  
  return isMobile
}

// Simplified 3D Ring for mobile - much lighter
function MobileRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })
  
  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.2, 16, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
      </mesh>
    </Float>
  )
}

// Full 3D Ring for desktop
function DesktopRing() {
  const ringRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  const gradientMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#8b5cf6') },
        uColor2: { value: new THREE.Color('#ec4899') },
        uColor3: { value: new THREE.Color('#06b6d4') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vPosition = position;
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
          float t = uTime * 0.15;
          float mixFactor1 = sin(vUv.x * 3.14159 + t) * 0.5 + 0.5;
          float mixFactor2 = cos(vUv.y * 3.14159 - t * 0.7) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, mixFactor1);
          color = mix(color, uColor3, mixFactor2 * 0.5);
          float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          color += pow(rim, 2.0) * 0.3;
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])
  
  const particles = useMemo(() => {
    const count = 48
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.5 + Math.random() * 1.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return { positions, count }
  }, [])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + 0.3
      ringRef.current.rotation.y = time * 0.15
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * 0.12
    }
    gradientMaterial.uniforms.uTime.value = time
  })
  
  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <mesh ref={ringRef}>
          <torusGeometry args={[2, 0.4, 32, 64]} />
          <primitive object={gradientMaterial} attach="material" />
        </mesh>
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.4, 0.15, 16, 32]} />
          <MeshDistortMaterial
            color="#ec4899"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        </mesh>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particles.count} array={particles.positions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#8b5cf6" transparent opacity={0.6} sizeAttenuation />
        </points>
      </group>
    </Float>
  )
}

// Camera controller
function CameraController() {
  const { camera } = useThree()
  
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.3
    camera.position.y = Math.cos(state.clock.getElapsedTime() * 0.08) * 0.2
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Scene component
function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#ec4899" distance={10} />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#06b6d4" distance={10} />
      
      {isMobile ? <MobileRing /> : <DesktopRing />}
      
      <Preload all />
    </>
  )
}

// Static gradient fallback for very slow devices
function MobileGradientFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-spin-slow opacity-40" />
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow-reverse opacity-40" />
    </div>
  )
}

export default function HeroCanvas() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
  }
  
  // On mobile, use simplified version with lower DPR
  if (isMobile) {
    return (
      <div className="canvas-container">
        <Canvas
          dpr={1}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
            stencil: false,
            depth: false,
          }}
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <Scene isMobile={true} />
        </Canvas>
      </div>
    )
  }
  
  return (
    <div className="canvas-container">
      <Canvas
        dpr={Math.min(2, window.devicePixelRatio)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene isMobile={false} />
      </Canvas>
    </div>
  )
}
