#pragma strict
public var GM:GameManager;
var unlockAllGunModes : boolean = false;
//github test
function Start () {
}

function Update () {
// added the and statement so that it will only do this once and not continuously run for loops
	if(unlockAllGunModes && GM.gmObjectives.gunModes[3].completed == false){
		for(var i = 0; i < 4; i++)
		{
		GM.gmObjectives.gunModes[i].completed = true;
		}
	}
}

function OnTriggerEnter(col: Collider){
	if(col.gameObject.tag == "Ability 2"){
		print("Ability 2");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		GM.gmObjectives.gunModes[0].completed = true;
	}
	if(col.gameObject.tag == "Ability 3"){
		print("Ability 3");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		GM.gmObjectives.gunModes[1].completed = true;
	}
	if(col.gameObject.tag == "Ability 4"){
		print("Ability 4");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		GM.gmObjectives.gunModes[2].completed = true;
	}
	if(col.gameObject.tag == "Ability 5"){
		print("Ability 5");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		GM.gmObjectives.gunModes[3].completed = true;
	}
}