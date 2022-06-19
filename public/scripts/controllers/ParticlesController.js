class ParticlesControllers {
    update() {
        particles.forEach((particle, index) => {
            if (particle.opacity <= 0.05 || 
                particle.position.x < -1 ||
                particle.position.x > canvas.width ||
                particle.position.y < -1 ||
                particle.position.y > canvas.height) {
                particles.splice(index, 1)
                return;
            }
            particle.update()
        })
    }

    new(x, y, quantity, settings) {
        for (var i = 0; i < quantity; i++) {
            particles.push(new Particle(x, y, settings))
        }
    }
}