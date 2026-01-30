'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment, Preload } from '@react-three/drei'
import * as THREE from 'three'

// Performance detection hook
function usePerformanceLevel() {
  const [level, setLevel] = useState<'high' | 'medium' | 'low'>('high')
  
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isLowEnd = navigator.hardwareConcurrency <= 4
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (hasReducedMotion || (isMobile && isLowEnd)) {
        setLevel('low')
      } else if (isMobile) {
        setLevel('medium')
      } else {
        setLevel('high')
      }
    }
    
    checkPerformance()
  }, [])
  
  return level
}

// Adaptive settings based on performance
function getPerformanceSettings(level: 'high' | 'medium' | 'low') {
  switch (level) {
    case 'low':
      return { 
        dpr: 1, 
        segments: 32, 
        distort: 0.2,
        speed: 0.3,
        floatIntensity: 0.3,
      }
    case 'medium':
      return { 
        dpr: 1.5, 
        segments: 48, 
        distort: 0.3,
        speed: 0.4,
        floatIntensity: 0.5,
      }
    case 'high':
    default:
      return { 
        dpr: 2, 
        segments: 64, 
        distort: 0.4,
        speed: 0.5,
        floatIntensity: 0.7,
      }
  }
}

// Main abstract ring component
function AbstractRing({ settings }: { settings: ReturnType<typeof getPerformanceSettings> }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  // Create custom gradient shader material
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
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float t = uTime * 0.15;
          
          // Create flowing gradient
          float mixFactor1 = sin(vUv.x * 3.14159 + t) * 0.5 + 0.5;
          float mixFactor2 = cos(vUv.y * 3.14159 - t * 0.7) * 0.5 + 0.5;
          
          vec3 color = mix(uColor1, uColor2, mixFactor1);
          color = mix(color, uColor3, mixFactor2 * 0.5);
          
          // Add subtle rim lighting
          float rim = 1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0)));
          rim = pow(rim, 2.0);
          color += rim * 0.3;
          
          // Add metallic sheen
          float sheen = pow(max(0.0, dot(vNormal, normalize(vec3(1.0, 1.0, 1.0)))), 16.0);
          color += sheen * 0.2;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])
  
  // Floating particles around the ring
  const particles = useMemo(() => {
    const count = settings.segments * 2
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 2.5 + Math.random() * 1.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    return { positions, sizes, count }
  }, [settings.segments])
  
  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + 0.3
      ringRef.current.rotation.y = time * 0.15
      ringRef.current.rotation.z = Math.cos(time * 0.08) * 0.05
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = Math.cos(time * 0.12) * 0.15 - 0.2
      innerRingRef.current.rotation.y = -time * 0.12
      innerRingRef.current.rotation.z = Math.sin(time * 0.1) * 0.08
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
    }
    
    gradientMaterial.uniforms.uTime.value = time
  })
  
  return (
    <Float
      speed={settings.speed}
      rotationIntensity={0.2}
      floatIntensity={settings.floatIntensity}
    >
      <group>
        {/* Main outer ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2, 0.4, settings.segments, settings.segments * 2]} />
          <primitive object={gradientMaterial} attach="material" />
        </mesh>
        
        {/* Inner decorative ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.4, 0.15, settings.segments / 2, settings.segments]} />
          <MeshDistortMaterial
            color="#ec4899"
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
            distort={settings.distort}
            speed={2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Central sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, settings.segments / 2, settings.segments / 2]} />
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            distort={settings.distort * 0.5}
            speed={3}
          />
        </mesh>
        
        {/* Floating particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.count}
              array={particles.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={particles.count}
              array={particles.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#8b5cf6"
            transparent
            opacity={0.6}
            sizeAttenuation
          />
        </points>
      </group>
    </Float>
  )
}

// Camera controller for smooth movement
function CameraController() {
  const { camera, size } = useThree()
  
  useEffect(() => {
    // Adjust camera for mobile
    if (size.width < 768) {
      camera.position.set(0, 0, 7)
    } else {
      camera.position.set(0, 0, 5.5)
    }
  }, [camera, size])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Subtle camera movement for cinematic feel
    camera.position.x = Math.sin(time * 0.1) * 0.3
    camera.position.y = Math.cos(time * 0.08) * 0.2
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Main scene component
function Scene({ performanceLevel }: { performanceLevel: 'high' | 'medium' | 'low' }) {
  const settings = getPerformanceSettings(performanceLevel)
  
  return (
    <>
      <CameraController />
      
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -5, -5]}
        intensity={0.3}
        color="#8b5cf6"
      />
      <pointLight
        position={[0, 3, 0]}
        intensity={0.8}
        color="#ec4899"
        distance={10}
      />
      <pointLight
        position={[0, -3, 0]}
        intensity={0.5}
        color="#06b6d4"
        distance={10}
      />
      
      {/* Main 3D object */}
      <AbstractRing settings={settings} />
      
      {/* Environment for reflections - only on high performance */}
      {performanceLevel === 'high' && (
        <Environment preset="night" />
      )}
      
      <Preload all />
    </>
  )
}

// Exported canvas component
export default function HeroCanvas() {
  const performanceLevel = usePerformanceLevel()
  const settings = getPerformanceSettings(performanceLevel)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />
    )
  }
  
  return (
    <div className="canvas-container">
      <Canvas
        dpr={settings.dpr}
        gl={{
          antialias: performanceLevel === 'high',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene performanceLevel={performanceLevel} />
      </Canvas>
    </div>
  )
}
