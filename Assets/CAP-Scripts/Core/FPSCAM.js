#pragma strict
@HideInInspector
var rotateMode:boolean = false;

private var GM:GameManager;
function Start () {
	GM = GameObject.Find("GameManager").GetComponent(GameManager);
}

function Update () {
  SendMessage("setRotationMode", GM.WO.rotateMode);
}