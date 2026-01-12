'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html, useProgress, Preload } from '@react-three/drei';
import { TextureLoader, BackSide } from 'three';
import { Maximize2, Rotate3d } from 'lucide-react';
import * as THREE from 'three';

interface Interior360ViewerProps {
    imageUrl: string;
    title?: string;
}

function Sphere({ imageUrl }: { imageUrl: string }) {
    const texture = useLoader(TextureLoader, imageUrl);
    return (
        <mesh scale={[-1, 1, 1]}>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={BackSide} toneMapped={false} />
        </mesh>
    );
}

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-xl rounded-2xl border border-gold-primary/30 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="w-12 h-12 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]"></div>
                <div className="text-gold-primary font-mono text-xs tracking-[0.2em] font-bold">{progress.toFixed(0)}% LOADED</div>
            </div>
        </Html>
    );
}

export default function Interior360Viewer({ imageUrl, title = "360° Interior Experience" }: Interior360ViewerProps) {
    const [isInteracting, setIsInteracting] = useState(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        if (isInteracting) {
            const timer = setTimeout(() => setShowHint(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInteracting]);

    return (
        <div className="relative w-full h-[500px] md:h-[600px] bg-neutral-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">

            {/* Header / Overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-10 pointer-events-none">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-sm font-medium mb-3 shadow-lg">
                        <Rotate3d className="w-4 h-4 text-gold-primary" />
                        <span className="font-sans tracking-wide">Interactive 3D View</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white drop-shadow-md hidden md:block font-sans">{title}</h3>
                </div>
                <button
                    className="pointer-events-auto p-3 bg-black/40 hover:bg-gold-primary hover:text-black backdrop-blur-md rounded-xl text-white transition-all duration-300 border border-white/10 hover:border-gold-primary hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    aria-label="Maximize View"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>

            {/* Hint Overlay */}
            {showHint && !isInteracting && (
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-2xl border border-white/10 animate-pulse shadow-2xl">
                        <div className="flex items-center gap-4 text-white font-medium">
                            <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center relative">
                                <span className="absolute w-2 h-2 bg-gold-primary rounded-full animate-ping"></span>
                                <span className="block w-1.5 h-1.5 bg-white rounded-full"></span>
                            </div>
                            <span className="font-sans text-lg tracking-wide">Drag to Explore</span>
                        </div>
                    </div>
                </div>
            )}

            <Canvas
                camera={{ fov: 75, position: [0, 0, 0.1] }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                onPointerDown={() => setIsInteracting(true)}
                className="cursor-move"
            >
                <Suspense fallback={<Loader />}>
                    <Sphere imageUrl={imageUrl} />
                    <Preload all />
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    autoRotate={!isInteracting}
                    autoRotateSpeed={0.5}
                    rotateSpeed={-0.5}
                    zoomSpeed={1.2}
                    minDistance={0.1}
                    maxDistance={100}
                />
            </Canvas>

            {/* Visual Effects Overlays */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-0" />

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10"></div>

            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
                <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-gold-primary"></span>
                    Use Mouse/Touch to Rotate • Scroll to Zoom
                </p>
            </div>
        </div>
    );
}
