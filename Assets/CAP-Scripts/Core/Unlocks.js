#pragma strict
public var GM:GameManager;

@Range(1, 5)
var abilitiesUnlocked : int = 1;

function Start () {
	GM.abilitiesUnlocked = abilitiesUnlocked;
}

function Update () {
	GM.abilitiesUnlocked = abilitiesUnlocked;

}

function OnTriggerEnter(col: Collider){
	if(col.gameObject.tag == "Ability 2"){
		print("Ability 2");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		abilitiesUnlocked ++;
	}
	if(col.gameObject.tag == "Ability 3"){
		print("Ability 3");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		abilitiesUnlocked ++;
	}
	if(col.gameObject.tag == "Ability 4"){
		print("Ability 4");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		abilitiesUnlocked ++;
	}
	if(col.gameObject.tag == "Ability 5"){
		print("Ability 5");
		col.gameObject.GetComponent(MeshRenderer).active = false;
		col.gameObject.GetComponent(CapsuleCollider).collider.enabled = false;
		abilitiesUnlocked ++;
	}
}