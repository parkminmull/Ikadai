import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float, CubeCamera, MeshReflectorMaterial, ScrollControls, useScroll, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect, forwardRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import { easing } from 'maath';
import MyElement3D from './MyElement3D';
import Maru from './Maru';

function App() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '200vh' }}>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Canvas
          style={{ background: '#000000' }}
          camera={{
            near: 1,
            far: 100,
            position: [7, 3, 0]
          }}
        >
          <Maru />
          <MyElement3D />
        </Canvas>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
          <div style={{
            color: 'white',
            fontSize: '5.5vw',
            padding: '20px',
            fontFamily: 'serif',
            lineHeight: '1.2',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)'
          }}>
            "But afterwards there occurred violent earthquakes and floods; and in a single day and night of rain all your warlike men in a body sank into the earth,
            and the island of Atlantis in like manner disappeared, and was sunk beneath the sea."
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 30], fov: 35, near: 1, far: 60 }} gl={{ antialias: false }}>
          <color attach="background" args={['#050505']} />
          <ambientLight />
          <Screen />
          <Float rotationIntensity={3} floatIntensity={3} speed={1}>
            <CubeCamera position={[-3, -1, -5]} resolution={256} frames={Infinity}>
              {(texture) => (
                <mesh>
                  <sphereGeometry args={[2, 32, 32]} />
                  <meshStandardMaterial metalness={1} roughness={0.1} envMap={texture} />
                </mesh>
              )}
            </CubeCamera>
          </Float>
          <Floor />
          <Rig />
        </Canvas>
      </div>
    </div>
  );
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [5 + state.pointer.x, 0 + +state.pointer.y, 18 + Math.atan2(state.pointer.x, state.pointer.y) * 2], 0.4, delta);
    state.camera.lookAt(0, 0, 0);
  });
}

const Floor = () => (
  <mesh position={[0, -5.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[50, 50]} />
    <MeshReflectorMaterial
      blur={[300, 50]}
      resolution={1024}
      mixBlur={1}
      mixStrength={100}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#202020"
      metalness={0.8}
    />
  </mesh>
);

const Emitter = forwardRef((props, ref) => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/10.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }));
  useEffect(() => void video.play(), [video]);
  return (
    <mesh ref={ref} position={[0, 0, -16]} {...props}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
      <mesh scale={[16.05, 10.05, 1]} position={[0, 0, -0.01]}>
        <planeGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </mesh>
  );
});

function Screen() {
  const [material, set] = useState();
  return (
    <>
      <Emitter ref={set} />
      {material && (
        <EffectComposer disableNormalPass multisampling={8}>
          <GodRays sun={material} exposure={0.34} decay={0.8} blur />
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
        </EffectComposer>
      )}
    </>
  );
}

export default App;
