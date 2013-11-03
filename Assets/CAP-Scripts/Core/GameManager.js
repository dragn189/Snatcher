class FPSObjects{
    var CamControl:GameObject;
    var PermObj:GameObject;
    var TempObj:GameObject;
    var GuideObj:GameObject;
    var GunObj:GameObject;
    var FPSCam:GameObject;
    var GunCam:GameObject;
    var CurrentObj:GameObject;
    var GizmoObj:GameObject;
}

class PlayerOptions extends System.Object{	
	//This should be getting the value from the scorebaord/inventory system
	var hasEnergyPoints:boolean = true;
	var energyPoints:float = 100.0;
    var isOnInteractiveObject:boolean = false;	
}

class WeaponOptions extends System.Object{
	var tetherBeam : GameObject;	
	@Range(0.0, 1.0)
	var snatchSpeed:float = .1;
	@Range(0.0, 20.0)
	var snatchDistance:float = 20.0;
    @Range(0.0, 100.0)
    var maxPositionDistance: float = 10;
    @Range(0.0, 250.0)
    var throwDistance:float = 250.0; // 1:250 ratio on objects mass = 1, 250 meters    
    @Range(0.0, 100.0)
    var throwHeight:float = 100.0;   // 1:60 ratio on objects mass = 1, 250 meters    
	enum Action {
		Snatching,	
		Shooting,
		Rotating,
		Scaling,
		Moving,
		Energizing
	};
    var weaponMode:Action;
    enum ModeLevel{
        X,
        Y,
        Z,
        Uniform
    };	
    var weaponModeLevel:ModeLevel;
    var scalingModeLimitLower:float = 1.0;
    var scalingModeLimitUpper:float = 2.0;
    var CurrentObj:GameObject;
    var hasEnergyPoints:boolean = true;
    @Range (0.0, 1.0)
    var energyFillAmmount:float = 0.1;
    @Range(0.0, 20.0)    
    var forwardSpeed : float = 10.0; 
    var referenceCamera : Transform;
    var modifyRate:float = .5;
    var sensitivityX:float = 360.0;
    var sensitivityY:float = 360.0;
    var currentScale : float = 0.0;
    var scrollPosition : float = 0.0;
	var isSnatching:boolean = false;	
	var modeDirection:int = 0;
	var rotateMode : boolean = false;
	var pickUpRange: Vector2 = Vector2(0, 1.5);	    
}

class MoverOptions{
	var isEnergizable:boolean = false;
	var engergizeHealth:float = 100.0;
	var energyReset:float;
	var isEnergized:boolean = false;
	var isHeld:boolean = false;
	var isSnatching:boolean = false;
	//var _rigidBodyGravity:boolean = true;	//Wasn't being used
	//Smoothing for the object moving to the Holder
	var smooth:float = 0.07;
	//var isColliding: boolean = false; //Wasn't being used
}

enum InteractiveType{
    InteractiveItem,
    ObjectiveItem
};

class InteractiveObject{
    var name:String;
    var type:InteractiveType;
    var theGameObject:GameObject;
    var isObjectiveItem:boolean;
    var objectiveName:String;
    var Mutations:gunModeOptions;
    var isObtainable:boolean;
    var isObtained:boolean;
    var isHeld:boolean;
}

class gunModeOptions{
    var isRotatable:boolean = true;
    var isScalable:boolean = true;
    var isMovable:boolean = true;
    var isEnergizable:boolean = true;
}

var PO:PlayerOptions;
var WO:WeaponOptions;
var MO:MoverOptions;
var FO:FPSObjects; 

var IO:InteractiveObject[];
var InteractiveObjects:ArrayList = new ArrayList();
var DisruptableObjects:ArrayList = new ArrayList();

function Start () { 
    InteractiveObjects.Add("Triggerer");
    InteractiveObjects.Add("Mover");

    DisruptableObjects.Add("Triggerer");
    DisruptableObjects.Add("Ground");
    DisruptableObjects.Add("Player");

    setWeaponOption("tetherOff");
    //FO.FPSCam.GetComponent(Camera).cullingMask = 0;
    //FO.GunCam.GetComponent(Camera).cullingMask = 8;
}

function Update(){
    if(Input.GetKey(KeyCode.Q)){
        WO.modeDirection = 1;
    } else if(Input.GetKey(KeyCode.E)){
        WO.modeDirection = -1;
    } else {
        WO.modeDirection = 0;
    }
    if(FO.CurrentObj == FO.TempObj)
        LeftClickDown();
    
    updateWeaponMode(); 
    
   /**
    * If the object is held, scale the gizmo, 1:1
    **/
    
    FO.GizmoObj.transform.localScale = FO.CurrentObj.transform.localScale;
}


function updateWeaponMode(){
	if(FO.CurrentObj != FO.TempObj && FO.CurrentObj.GetComponent(Mover).MO.isHeld){
		if(WO.weaponMode == WO.weaponMode.Snatching){
			WO.weaponMode = WO.weaponMode.Shooting; 
		}
			if(Input.GetKeyDown(KeyCode.Alpha1))
				WO.weaponMode = WO.weaponMode.Shooting;  
			else if(Input.GetKeyDown(KeyCode.Alpha2))
				WO.weaponMode = WO.weaponMode.Rotating;  
			else if(Input.GetKeyDown(KeyCode.Alpha3))
				WO.weaponMode = WO.weaponMode.Scaling;  
			else if(Input.GetKeyDown(KeyCode.Alpha4))
				WO.weaponMode = WO.weaponMode.Moving;  
			else if(Input.GetKeyDown(KeyCode.Alpha5))
				WO.weaponMode = WO.weaponMode.Energizing;
			else if(Input.GetKeyDown(KeyCode.Tab)){
	  			WO.weaponModeLevel+=1;
	  			if(WO.weaponModeLevel==4){
	  				WO.weaponModeLevel = 0;
	  			}
	  		}
	 } else {
	 	WO.weaponMode = WO.weaponMode.Snatching;  
	 }
}

function OnTopOfBox(){   
    if( Vector3.Distance(FO.CamControl.transform.position, FO.CurrentObj.transform.postion) >= WO.pickUpRange[0] &&
        Vector3.Distance(FO.CamControl.transform.position, FO.CurrentObj.transform.postion) <= WO.pickUpRange[1]){
        PO.isOnInteractiveObject = true; 
    } else {
        PO.isOnInteractiveObject = false;
    }
}

function LeftClickDown(){
	if(Input.GetMouseButton(0)){
		var ray = Camera.main.ScreenPointToRay(Vector3(Screen.width/2, Screen.height/2, 0.0));
		var hit: RaycastHit;
		setWeaponOption("tetherOn");
		setWeaponOption("snatchingOn");
        //Test if the player in on the object here.
        //will set _PLAYER.isOnInteractiveObject to true or false
        //OnTopOfBox();
		if (Physics.Raycast(ray, hit, WO.snatchDistance)){
			Debug.DrawLine(ray.origin, hit.point);
            
            if(InteractiveObjects.Contains(hit.collider.gameObject.tag)) {
                setCurrentObj(hit.collider.gameObject);
            }
		}         
	} else {
        setWeaponOption("tetherOff");
    }
}

function getPlayer(option){
    switch(option){
        case "position" : return FO.CamControl.transform.position; break;
        case "rotation" : return FO.CamControl.transform.rotation; break;
    }
}

function getWeapon(option):Object{
    switch(option){
        case "pickUpRange" : return WO.pickUpRange; break;
    }
}

function setPlayerOption(option:String){

}

function getSnatchDistance():float{
    return WO.snatchDistance;
}

function setWeaponOption(option:String){
    switch(option){
        case "tetherOn": 
            //WO.tetherBeam.particleEmitter.active = true; break;
            WO.tetherBeam.SetActive(true); break;
        case "tetherOff": 
            //WO.tetherBeam.particleEmitter.active = false; break;
            WO.tetherBeam.SetActive(false); break;
        case "snatchingOn": WO.isSnatching = true; break;
        case "snatchingOff": WO.isSnatching = false; break;
    }
}

function setGuideOption(b:boolean){
    if(b){
        FO.GuideObj.gameObject.particleSystem.Play();
    } else {
        FO.GuideObj.gameObject.particleSystem.Stop();
    } 
}



function getInterativeObject(){

}

function getInteractiveObjectOption(){

}

function setPlayerControllerObject(){

}

function setCurrentObj(obj:GameObject){
    FO.CurrentObj = obj;
}

function getCurrentObj(){
    return FO.CurrentObj;
}

function getMover(){
    return FO.CurrentObj.GetComponent(Mover);
}

function getHolderPosition():Vector3{
    return FO.HolderObj.transform.position;
}

function resetPlayer(){
	if(FO.CurrentObj != FO.TempObj){
	  WO.scrollPosition = 0; //</=-=-=-=-=-=NOT BEING RESET!
      WO.rotateMode = false;
	  FO.CurrentObj.GetComponent(Mover).MO.isHeld = false; //Drop the object
	  FO.CurrentObj.rigidbody.useGravity = true;//gravity on ??? is this needed?
	  FO.CurrentObj.rigidbody.constraints = RigidbodyConstraints.None;
	  //FO.CurrentObj.layer = 0;
	  FO.CurrentObj = FO.TempObj;
	  FO.TempObj.transform.position = FO.PermObj.transform.position;  
      setWeaponOption("tetherOff");
	}
}