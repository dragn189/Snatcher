#pragma strict
var GM:GameManager;

//Since this is a multi-object, we need to bring down a copy of the MoverOptions
//Locally and treat this object as a separate entity
var MO:MoverOptions;


function Start () {

}


function Update () {
    checkHeld();
}

function checkHeld(){
    if(MO.isHeld){       
        var target:Vector3 = GM.FO.TempObj.transform.position;        
        if(transform.position != target){
            transform.position = Vector3.Lerp(transform.position,target, MO.smooth);   
        } else{
            transform.position = target;            
        }  
        rigidbody.constraints = RigidbodyConstraints.FreezePosition;
        rigidbody.freezeRotation = true;
    } else {
        Reset();
    }
}

function OnCollisionEnter(col:Collision){
  if(GM.DisruptableObjects.Contains(col.collider.tag)) Reset();

}

function Reset(){
  if(MO.isHeld == true && MO.isSnatching == false){
	  rigidbody.constraints = RigidbodyConstraints.None; 
      GM.resetPlayer();//Needs to be called something else due to the fact that we're not reseting the actual player
  }    	
}


function useEnergy(value:float){
    if (MO.engergizeHealth >= 0 || MO.engergizeHealth <= MO.energyReset){
        MO.engergizeHealth += value;
    } 
    
    if (MO.engergizeHealth <= 0){
        MO.engergizeHealth = 0; 
    } else if (MO.engergizeHealth >= MO.energyReset){
        MO.engergizeHealth = MO.energyReset; 
    }
    
}
