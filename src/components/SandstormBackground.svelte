<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container;
	let scene, camera, renderer, geometry, material;

	onMount(() => {
		if (!container) return;

		// Scene setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// Particle system setup
		const particleCount = 50000;
		const particles = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);

		// Initialize particles with random positions and velocities
		for (let i = 0; i < particleCount * 3; i += 3) {
			particles[i] = Math.random() * 100 - 50; // x
			particles[i + 1] = Math.random() * 50; // y
			particles[i + 2] = Math.random() * 100 - 50; // z

			velocities[i] = (Math.random() - 0.5) * 0.2; // vx
			velocities[i + 1] = (Math.random() - 0.5) * 0.1; // vy
			velocities[i + 2] = (Math.random() - 0.5) * 0.2; // vz
		}

		// Create particle geometry and material
		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

		// material = new THREE.PointsMaterial({
		// 	color: 0xd2b48c,
		// 	size: 0.1,
		// 	transparent: true,
		// 	opacity: 0.6,
		// 	blending: THREE.AdditiveBlending
		// });

		// material = new THREE.PointsMaterial({
		// 	color: 0x8b4513, // Saddle brown
		// 	size: 0.15, // Slightly larger particles
		// 	transparent: true,
		// 	opacity: 0.8, // Higher opacity
		// 	blending: THREE.NormalBlending // Changed from AdditiveBlending
		// });

		// material = new THREE.PointsMaterial({
		// 	color: 0x8b4513,
		// 	size: 0.15,
		// 	transparent: true,
		// 	opacity: 0.8,
		// 	blending: THREE.NormalBlending,
		// 	sizeAttenuation: true, // Makes particles scale with distance
		// 	depthWrite: false, // Ensures proper transparency rendering
		// 	vertexColors: false, // Disable vertex colors if you're not using them
		// 	fog: true // Enable fog if you're using it in your scene
		// });

		//     material = new THREE.PointsMaterial({
		//   color: 0x8B4513,  // Saddle brown
		//   size: 0.15,       // Slightly larger particles
		//   transparent: true,
		//   opacity: 0.8,     // Higher opacity
		//   blending: THREE.NormalBlending, // Changed from AdditiveBlending
		// });

		// // Option 2: Golden brown with shadows
		// material = new THREE.PointsMaterial({
		// 	color: 0xb8860b, // Dark golden rod
		// 	size: 0.12,
		// 	transparent: true,
		// 	opacity: 0.9,
		// 	blending: THREE.NormalBlending
		// });

		// Option 3: Rich desert sand
		material = new THREE.PointsMaterial({
			color: 0xc19a6b, // Antique brass
			size: 0.01,
			transparent: true,
			opacity: 0.85,
			blending: THREE.NormalBlending
		});

		// // Option 4: Dark desert sand
		// material = new THREE.PointsMaterial({
		// 	color: 0x967117, // Dark earth tone
		// 	size: 0.14,
		// 	transparent: true,
		// 	opacity: 0.75,
		// 	blending: THREE.NormalBlending
		// });

		const particleSystem = new THREE.Points(geometry, material);
		scene.add(particleSystem);

		// Position camera
		camera.position.z = 1;

		// Animation variables
		let time = 0;
		const windStrength = 0.5;
		const turbulence = 0.35;

		// Animation loop
		function animate() {
			requestAnimationFrame(animate);
			time += 0.01;

			const positions = geometry.attributes.position.array;

			// Update particle positions
			for (let i = 0; i < particleCount * 3; i += 3) {
				// Apply wind force
				positions[i] += velocities[i] + windStrength;
				positions[i + 1] += velocities[i + 1] + Math.sin(time + i) * turbulence;
				positions[i + 2] += velocities[i + 2] + Math.cos(time + i) * turbulence;

				// Reset particles that move too far
				if (positions[i] > 50) {
					positions[i] = -50;
					velocities[i] = (Math.random() - 0.5) * 0.2;
				}

				if (positions[i + 1] < 0 || positions[i + 1] > 50) {
					velocities[i + 1] *= -0.5;
				}
			}

			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
		}

		animate();

		// Handle window resize
		function handleResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		window.addEventListener('resize', handleResize);

		// Return cleanup function
		return () => {
			window.removeEventListener('resize', handleResize);
			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
			geometry.dispose();
			material.dispose();
		};
	});

	onDestroy(() => {
		if (container && renderer?.domElement) {
			container.removeChild(renderer.domElement);
		}
		geometry?.dispose();
		material?.dispose();
	});
</script>

<div
	bind:this={container}
	style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;"
/>
