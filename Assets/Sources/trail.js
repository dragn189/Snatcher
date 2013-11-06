#pragma strict

private var target : Transform;
var zigs : int = 100;
var speed : float = 1f;
var scale : float = 1f;
var startLight : Light;
var endLight : Light;
	
var noise : Perlin;
var oneOverZigs : float;
	
private var particles : Particle[];
	
var GM:GameManager;
	
function Start()
{
	oneOverZigs = 1f / zigs; //converted to float?
	particleEmitter.emit = false;

	particleEmitter.Emit(zigs);
	particles = particleEmitter.particles;
}

function Update ()
{

}
function LateUpdate(){
		target = GM.FO.CurrentObj.transform;
		if (noise == null)
			noise = new Perlin();
			
		var timex : float = Time.time * speed * 0.1365143f;
		var timey : float = Time.time * speed * 1.21688f;
		var timez : float = Time.time * speed * 2.5564f;
		
		for (var i : int = 0; i < particles.Length; i++)
		{
			var position : Vector3 = Vector3.Lerp(transform.position, target.position, oneOverZigs * i);
			var offset : Vector3 = new Vector3(noise.Noise(timex + position.x, timex + position.y, timex + position.z),
										noise.Noise(timey + position.x, timey + position.y, timey + position.z),
										noise.Noise(timez + position.x, timez + position.y, timez + position.z));
			position += (offset * scale * (i * oneOverZigs));
			
			particles[i].position = position;
			particles[i].color = Color.white;
			particles[i].energy = 1f;
		}
		
		particleEmitter.particles = particles;
		
		if (particleEmitter.particleCount >= 2)
		{
			if (startLight)
				startLight.transform.position = particles[0].position;
			if (endLight)
				endLight.transform.position = particles[particles.Length - 1].position;
		}
}
	
