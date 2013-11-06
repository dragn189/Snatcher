#pragma strict
//****************************Default image until we have the other images******************************************
var crosshairImage : Texture2D;
//other images to use depending if player is holding an object or not:
var crosshairImageNormal : Texture2D;
var crosshairImageHeld : Texture2D;
var currentImage : Texture2D;
var colorTexture : Texture2D;
private var toggle : int = 2;

var GM:GameManager;
var WO:WeaponOptions;


function Start () {
    WO = GM.WO;

}

function Update () {
  if(GM.FO.CurrentObj != GM.FO.TempObj)
    currentImage = crosshairImageHeld;
  else
    currentImage = crosshairImageNormal;
    
    if(Input.GetKeyDown(KeyCode.T)){
    toggle ++;
    }
    if(toggle >= 3)
    toggle = 1;

}

function OnGUI (){
if(GM.FO.CurrentObj == GM.FO.TempObj){
    GUI.color = new Color(1, 1, 1, 0.8f);
    GUI.DrawTexture(new Rect((Screen.width * 0.5f) - (crosshairImage.width * 0.5f),
    	(Screen.height * 0.5f) - (crosshairImage.height * 0.5f), crosshairImage.width,
    	crosshairImage.height), crosshairImage);
    GUI.color = Color.white;
}
    
    if(toggle == 2){
    GUI.Label(new Rect(Screen.width * .1, Screen.height * .2,Screen.width/4, Screen.height/4),"Current Object : " + GM.FO.CurrentObj.name);
    GUI.Label(new Rect(Screen.width * .1, Screen.height * .3,Screen.width/4, Screen.height/4),"Ability Selected : " + WO.weaponMode);
    	if(GM.WO.weaponMode == GM.WO.weaponMode.Shooting){
	    
	    }
	    if(GM.WO.weaponMode == GM.WO.weaponMode.Rotating){
	    	GUI.Label(new Rect(Screen.width * .1, Screen.height * .5,Screen.width/4, Screen.height/4),"Weapon Mode Level : " + GM.WO.weaponModeLevel);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .6,Screen.width/4, Screen.height/4),"Object Rotate X : " + GM.FO.CurrentObj.transform.localScale.x);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .7,Screen.width/4, Screen.height/4),"Object Rotate Y  : " + GM.FO.CurrentObj.transform.localScale.y);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .8,Screen.width/4, Screen.height/4),"Object Rotate Z  : " + GM.FO.CurrentObj.transform.localScale.z);
	    
	    }
    	if(GM.WO.weaponMode == GM.WO.weaponMode.Scaling){
	    	GUI.Label(new Rect(Screen.width * .1, Screen.height * .5,Screen.width/4, Screen.height/4),"Weapon Mode Level : " + GM.WO.weaponModeLevel);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .6,Screen.width/4, Screen.height/4),"Object Scale X : " + GM.FO.CurrentObj.transform.localScale.x);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .7,Screen.width/4, Screen.height/4),"Object Scale Y  : " + GM.FO.CurrentObj.transform.localScale.y);
		    GUI.Label(new Rect(Screen.width * .1, Screen.height * .8,Screen.width/4, Screen.height/4),"Object Scale Z  : " + GM.FO.CurrentObj.transform.localScale.z);
	    }
	    if(GM.WO.weaponMode == GM.WO.weaponMode.Moving){
	    	GUI.Label(new Rect(Screen.width * .1, Screen.height * .5,Screen.width/4, Screen.height/4),"Distance from Start  : " + GM.WO.scrollPosition);
	    }
	    if(GM.WO.weaponMode == GM.WO.weaponMode.Energizing){
	    
	    }
    
    }

    
}