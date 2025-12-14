"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function GlobeNetwork({ color, secondaryColor }: { color: string, secondaryColor: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate fibonacci sphere points
  const points = useMemo(() => {
    const p = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const n = 600; 
    for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        p.push(x * 12, y * 12, z * 12); // Radius 12
    }
    return new Float32Array(p);
  }, []);

  // Generate random connections
  const connections = useMemo(() => {
    const c = [];
    const n = 600;
    for (let i = 0; i < n; i++) {
        if (Math.random() > 0.9) { // Only some connect
            const j = Math.floor(Math.random() * n);
            const x1 = points[i * 3];
            const y1 = points[i * 3 + 1];
            const z1 = points[i * 3 + 2];
            const x2 = points[j * 3];
            const y2 = points[j * 3 + 1];
            const z2 = points[j * 3 + 2];
            
            // Filter long lines to keep it "globe-like"
            const dist = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2) + Math.pow(z2-z1, 2));
            if(dist < 5) {
                c.push(x1, y1, z1, x2, y2, z2);
            }
        }
    }
    return new Float32Array(c);
  }, [points]);

  useFrame((state) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.001;
    }
    if (linesRef.current) {
       linesRef.current.rotation.y += 0.001; 
    }
  });

  return (
    <group>
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.15} color={color} transparent opacity={0.8} sizeAttenuation />
        </points>
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                 <bufferAttribute
                    attach="attributes-position"
                    args={[connections, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color={secondaryColor} transparent opacity={0.2} linewidth={1} />
        </lineSegments>
    </group>
  );
}

function FloatingRings({ color }: { color: string }) {
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);
    const ringRef3 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if(ringRef1.current) {
            ringRef1.current.rotation.x = Math.sin(t * 0.2) * 0.5;
            ringRef1.current.rotation.y = Math.cos(t * 0.1) * 0.5;
        }
        if(ringRef2.current) {
            ringRef2.current.rotation.x = Math.cos(t * 0.3) * 0.5;
            ringRef2.current.rotation.y = Math.sin(t * 0.2) * 0.5;
        }
    });

    return (
        <group>
             <mesh ref={ringRef1}>
                <torusGeometry args={[16, 0.05, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.1} />
            </mesh>
            <mesh ref={ringRef2} rotation={[Math.PI/2, 0, 0]}>
                <torusGeometry args={[18, 0.05, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.05} />
            </mesh>
        </group>
    )
}

export default function Globe3D() {
  const { theme } = useTheme();
  
  // Decide colors based on theme (defaults to dark if loading)
  const colors = theme === 'light' 
    ? { primary: '#2563eb', secondary: '#7c3aed', background: '#f8fafc' } // Blue/Purple for Light
    : { primary: '#00f0ff', secondary: '#bc13fe', background: '#05060a' }; // Cyan/Violet for Dark

  return (
    <div className="w-full h-full relative">
        <Canvas camera={{ position: [0, 0, 35], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={colors.primary} />
            
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <GlobeNetwork color={colors.primary} secondaryColor={colors.secondary} />
            </Float>
            
            <FloatingRings color={colors.primary} />
            
            {/* Background elements */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
    </div>
  );
}
