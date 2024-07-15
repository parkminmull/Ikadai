import { Box, OrbitControls, useGLTF } from "@react-three/drei"
import { useState, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

function MyElement3D() {
    const model = useGLTF("./models/model.glb")

    const [height, setHeight] = useState(0)
    const ref = useRef()

    useEffect(() => {
        let minY = Infinity, maxY = -Infinity

        model.scene.traverse((item) => {
            if (item.isMesh) {
                item.geometry.computeBoundingBox()
                const geomBbox = item.geometry.boundingBox
                if (minY > geomBbox.min.y) minY = geomBbox.min.y
                if (maxY < geomBbox.max.y) maxY = geomBbox.max.y
            }
        })

        const h = maxY - minY
        setHeight(h)
        console.log(h)
    }, [model.scene])

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01 // 모델을 오른쪽으로 회전
        }
    })

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 1, 0]} />
            <directionalLight position={[1, 2, 8]} intensity={0.7} />

            <primitive
                ref={ref}
                scale={1}
                position-y={-(height / 2) * 0.1}
                object={model.scene}
            />
        </>
    )
}

export default MyElement3D
