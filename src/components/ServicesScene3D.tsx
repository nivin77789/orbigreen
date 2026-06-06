import { useEffect, useRef } from "react";
import * as THREE from "three";

type FloatingMesh = {
  mesh: THREE.Mesh;
  spin: THREE.Vector3;
  float: THREE.Vector3;
  phase: number;
};

export function ServicesScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "absolute inset-0 h-full w-full";
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    const keyLight = new THREE.DirectionalLight(0xf8faf9, 1.1);
    keyLight.position.set(4, 6, 8);
    const fillLight = new THREE.DirectionalLight(0x5cbf2a, 0.45);
    fillLight.position.set(-6, -2, 4);
    scene.add(ambient, keyLight, fillLight);

    const palette = [0x0b5f7e, 0x5cbf2a, 0x8dd128];
    const configs = [
      { geo: new THREE.TorusGeometry(1.4, 0.38, 20, 64), pos: [-5.5, 2.2, -3], scale: 1 },
      { geo: new THREE.IcosahedronGeometry(1.35, 0), pos: [5.8, -1.4, -4], scale: 1.1 },
      { geo: new THREE.TorusKnotGeometry(0.85, 0.24, 120, 16), pos: [4.2, 3.4, -6], scale: 0.95 },
      { geo: new THREE.OctahedronGeometry(1.2, 0), pos: [-4.5, -2.8, -5], scale: 1 },
      { geo: new THREE.RingGeometry(0.9, 1.35, 48), pos: [0.5, -3.6, -7], scale: 1.2 },
      { geo: new THREE.BoxGeometry(1.5, 1.5, 1.5), pos: [-1.2, 4.2, -8], scale: 0.85 },
    ];

    const meshes: FloatingMesh[] = configs.map((config, index) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: palette[index % palette.length],
        metalness: 0.35,
        roughness: 0.22,
        transmission: 0.15,
        thickness: 0.8,
        transparent: true,
        opacity: 0.72,
        clearcoat: 0.6,
        clearcoatRoughness: 0.15,
      });

      const mesh = new THREE.Mesh(config.geo, material);
      mesh.position.set(config.pos[0], config.pos[1], config.pos[2]);
      mesh.scale.setScalar(config.scale);
      group.add(mesh);

      return {
        mesh,
        spin: new THREE.Vector3(
          0.002 + index * 0.0004,
          0.003 + index * 0.0005,
          0.0015
        ),
        float: new THREE.Vector3(0.4 + index * 0.08, 0.55 + index * 0.06, 0),
        phase: index * 1.4,
      };
    });

    const particles = new THREE.BufferGeometry();
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = -Math.random() * 16 - 2;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x5cbf2a,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particles, particleMaterial);
    scene.add(particleField);

    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (event: PointerEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frameId = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      if (width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = elapsed * 0.08 + mouseX * 0.18;
      group.rotation.x = mouseY * 0.12;

      meshes.forEach(({ mesh, spin, float, phase }) => {
        mesh.rotation.x += spin.x;
        mesh.rotation.y += spin.y;
        mesh.rotation.z += spin.z;
        mesh.position.y += Math.sin(elapsed * 0.9 + phase) * float.y * 0.008;
        mesh.position.x += Math.cos(elapsed * 0.7 + phase) * float.x * 0.006;
      });

      particleField.rotation.z = elapsed * 0.02;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.8, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 0.5, 0.04);
      camera.lookAt(0, 0, -2);

      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      meshes.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      particles.dispose();
      particleMaterial.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(92,191,42,0.07),transparent)]" />
    </div>
  );
}
