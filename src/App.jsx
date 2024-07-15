import './App.css';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import MyElement3D from './MyElement3d';
import Maru from './maru';

function App() {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <div style={{ 
            color: 'white', 
            fontSize: '6vw',  // 반응형 폰트 크기
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
    </>
  );
}

export default App;
