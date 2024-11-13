<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container;
	let scene, camera, renderer, geometry, material;
	let mouseX = 0,
		mouseY = 0;

	onMount(() => {
		if (!container) return;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		const particleCount = 50000;
		const particles = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const particleTypes = new Float32Array(particleCount); // Store particle type

		// Initialize particles in four groups
		for (let i = 0; i < particleCount; i++) {
			const i3 = i * 3;
			const particleGroup = Math.floor(i / (particleCount / 4)); // 0-3 for four groups
			particleTypes[i] = particleGroup;

			switch (particleGroup) {
				case 0: // Left to Right
					particles[i3] = -100; // Start at left
					particles[i3 + 1] = Math.random() * 100 - 50; // Random Y
					particles[i3 + 2] = Math.random() * 200 - 100; // Random Z
					velocities[i3] = Math.random() * 0.2 + 0.1; // Positive X velocity
					velocities[i3 + 1] = (Math.random() - 0.5) * 0.05; // Slight Y drift
					velocities[i3 + 2] = (Math.random() - 0.5) * 0.05; // Slight Z drift
					break;

				case 1: // Right to Left
					particles[i3] = 100; // Start at right
					particles[i3 + 1] = Math.random() * 100 - 50; // Random Y
					particles[i3 + 2] = Math.random() * 200 - 100; // Random Z
					velocities[i3] = -(Math.random() * 0.2 + 0.1); // Negative X velocity
					velocities[i3 + 1] = (Math.random() - 0.5) * 0.05; // Slight Y drift
					velocities[i3 + 2] = (Math.random() - 0.5) * 0.05; // Slight Z drift
					break;

				case 2: // Top to Bottom
					particles[i3] = Math.random() * 200 - 100; // Random X
					particles[i3 + 1] = 75; // Start at top
					particles[i3 + 2] = Math.random() * 200 - 100; // Random Z
					velocities[i3] = (Math.random() - 0.5) * 0.05; // Slight X drift
					velocities[i3 + 1] = -(Math.random() * 0.2 + 0.1); // Negative Y velocity
					velocities[i3 + 2] = (Math.random() - 0.5) * 0.05; // Slight Z drift
					break;

				case 3: // Bottom to Top
					particles[i3] = Math.random() * 200 - 100; // Random X
					particles[i3 + 1] = -25; // Start at bottom
					particles[i3 + 2] = Math.random() * 200 - 100; // Random Z
					velocities[i3] = (Math.random() - 0.5) * 0.05; // Slight X drift
					velocities[i3 + 1] = Math.random() * 0.2 + 0.1; // Positive Y velocity
					velocities[i3 + 2] = (Math.random() - 0.5) * 0.05; // Slight Z drift
					break;
			}
		}

		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

		material = new THREE.PointsMaterial({
			color: 0xc19a6b,
			size: 0.015,
			transparent: true,
			opacity: 0.75,
			blending: THREE.NormalBlending
		});

		const particleSystem = new THREE.Points(geometry, material);
		scene.add(particleSystem);

		camera.position.z = 50;

		let time = 0;
		const turbulence = 0.05;

		function updateMousePosition(event) {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
		}

		function animate() {
			requestAnimationFrame(animate);
			time += 0.005;

			const positions = geometry.attributes.position.array;

			for (let i = 0; i < particleCount; i++) {
				const i3 = i * 3;
				const particleGroup = particleTypes[i];

				// Add mouse influence
				const x = positions[i3];
				const y = positions[i3 + 1];
				const dx = x - mouseX * 50;
				const dy = y - mouseY * 25;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const mouseInfluence = Math.max(0, 1 - distance / 50);
				const angle = Math.atan2(dy, dx);
				const windStrength = mouseInfluence * 1.5;
				const windX = windStrength * Math.cos(angle);
				const windY = windStrength * Math.sin(angle);

				// Update positions with base movement + mouse influence
				positions[i3] += velocities[i3] + windX;
				positions[i3 + 1] += velocities[i3 + 1] + windY;
				positions[i3 + 2] += velocities[i3 + 2];

				// Reset particles based on their group
				switch (particleGroup) {
					case 0: // Left to Right
						if (positions[i3] > 100) {
							positions[i3] = -100;
							positions[i3 + 1] = Math.random() * 100 - 50;
							positions[i3 + 2] = Math.random() * 200 - 100;
						}
						break;

					case 1: // Right to Left
						if (positions[i3] < -100) {
							positions[i3] = 100;
							positions[i3 + 1] = Math.random() * 100 - 50;
							positions[i3 + 2] = Math.random() * 200 - 100;
						}
						break;

					case 2: // Top to Bottom
						if (positions[i3 + 1] < -25) {
							positions[i3] = Math.random() * 200 - 100;
							positions[i3 + 1] = 75;
							positions[i3 + 2] = Math.random() * 200 - 100;
						}
						break;

					case 3: // Bottom to Top
						if (positions[i3 + 1] > 75) {
							positions[i3] = Math.random() * 200 - 100;
							positions[i3 + 1] = -25;
							positions[i3 + 2] = Math.random() * 200 - 100;
						}
						break;
				}
			}

			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
		}

		animate();

		function handleResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', updateMousePosition);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', updateMousePosition);
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
	style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
/>
