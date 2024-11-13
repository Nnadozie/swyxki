<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';

	let container;
	let scene, camera, renderer, geometry, material;
	let mouseX = 0,
		mouseY = 0;

	onMount(() => {
		if (!container) return;

		// Scene setup
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// Particle system setup
		const particleCount = 50000;
		const particles = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);

		// Modified initialization to better distribute particles
		for (let i = 0; i < particleCount * 3; i += 3) {
			// Wider distribution across X axis
			particles[i] = Math.random() * 200 - 100;
			// More even vertical distribution
			particles[i + 1] = Math.random() * 100 - 25;
			// Deeper Z distribution
			particles[i + 2] = Math.random() * 200 - 100;

			// Reduced initial velocities for more stable movement
			velocities[i] = (Math.random() - 0.5) * 0.1;
			velocities[i + 1] = (Math.random() - 0.5) * 0.05;
			velocities[i + 2] = (Math.random() - 0.5) * 0.1;
		}

		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

		material = new THREE.PointsMaterial({
			color: 0xc19a6b,
			size: 0.015, // Slightly larger particles
			transparent: true,
			opacity: 0.75,
			blending: THREE.NormalBlending
		});

		const particleSystem = new THREE.Points(geometry, material);
		scene.add(particleSystem);

		camera.position.z = 50; // Adjusted camera position

		let time = 0;
		const baseWindStrength = 0.1; // Reduced base wind strength
		const turbulence = 0.05; // Reduced turbulence

		function updateMousePosition(event) {
			mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
		}

		function animate() {
			requestAnimationFrame(animate);
			time += 0.005; // Slower time progression

			const positions = geometry.attributes.position.array;

			for (let i = 0; i < particleCount * 3; i += 3) {
				const x = positions[i];
				const y = positions[i + 1];

				const dx = x - mouseX * 50;
				const dy = y - mouseY * 25;
				const distance = Math.sqrt(dx * dx + dy * dy);

				const angle = Math.atan2(dy, dx);

				// Reduced mouse influence radius
				const mouseInfluence = Math.max(0, 1 - distance / 50);

				// Gentler wind pattern
				const windStrength = mouseInfluence * 1.5;
				const windX = windStrength * Math.cos(angle + Math.random() * 0.3);
				const windY = windStrength * Math.sin(angle + Math.random() * 0.3);

				// Reduced turbulence
				const turbulenceStrength = mouseInfluence * 0.75;
				const turbX = (Math.random() - 0.5) * turbulenceStrength;
				const turbY = (Math.random() - 0.5) * turbulenceStrength;

				// Updated movement logic
				positions[i] += velocities[i] + baseWindStrength + windX + turbX;
				positions[i + 1] += velocities[i + 1] + Math.sin(time + i) * turbulence + windY + turbY;
				positions[i + 2] += velocities[i + 2] + Math.cos(time + i) * turbulence;

				// Modified boundary checking and reset logic
				if (positions[i] > 100) {
					positions[i] = -100;
					positions[i + 1] = Math.random() * 100 - 25; // Reset Y position randomly
					velocities[i] = (Math.random() - 0.5) * 0.1;
				} else if (positions[i] < -100) {
					positions[i] = 100;
					positions[i + 1] = Math.random() * 100 - 25;
					velocities[i] = (Math.random() - 0.5) * 0.1;
				}

				// Bounce particles off top and bottom boundaries
				if (positions[i + 1] > 75) {
					positions[i + 1] = 75;
					velocities[i + 1] *= -0.3;
				} else if (positions[i + 1] < -25) {
					positions[i + 1] = -25;
					velocities[i + 1] *= -0.3;
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
