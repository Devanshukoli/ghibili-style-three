import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { RedFormat, DataTexture } from "three";

export const Trees = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/trees.glb");
  const toneMap = useMemo(() => {
    const format = RedFormat;
    const colors = new Uint8Array(4);
    for (let c = 0; c <= colors.length; c++) {
      colors[c] = (c / colors.length) * 256;
    }
    const gradientMap = new DataTexture(colors, colors.length, 1, format);
    gradientMap.needsUpdate = true;
    return gradientMap;
  }, []);

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        position={[0.33, -0.05, -0.68]}
      >
        <meshToonMaterial gradientMap={toneMap} color={"#33594e"} />
      </mesh>
    </group>
  );
});

useGLTF.preload("/trees.glb");
