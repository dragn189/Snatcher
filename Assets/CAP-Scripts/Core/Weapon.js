//bam

public var GM:GameManager;
private var MouseX:float;
private var MouseY:float;

function Start () {
}
 
function Update(){
	MouseX = Input.GetAxis("Mouse X"); MouseY = Input.GetAxis("Mouse Y");
		
	if(GM.getCurrentObj() != GM.FO.TempObj){ 
        if(GM.FO.GuideObj.gameObject.particleSystem.isStopped)
            GM.setGuideOption(true);
		GM.FO.GuideObj.transform.position = GM.getCurrentObj().transform.position + Vector3(0,-3,0);
	} else {
		//GM.FO.GuideObj.transform.position = Vector3(-1000,-1000,0);
        GM.setGuideOption(false);
	}
	
	if(GM.getCurrentObj() != GM.FO.TempObj) DoAbility();
}

    
function DoAbility(){
    switch(GM.WO.weaponMode){
	    case GM.WO.weaponMode.Shooting:
	    	if(Input.GetMouseButton(1)){throwObj(); GM.resetPlayer();}
	        break;
	    case GM.WO.weaponMode.Rotating:
	        setRotation();
	        break;
	    case GM.WO.weaponMode.Scaling:
	        setScale();
	        if(Input.GetMouseButton(1)) GM.resetPlayer();          
	        break;
	    case GM.WO.weaponMode.Moving:
	        setPosition();
	        if(Input.GetMouseButton(1)) GM.resetPlayer();
	        break;
	    case GM.WO.weaponMode.Energizing:
	        setEnergize();
	        break;
	    case GM.WO.weaponMode.Snatching:
            GM.WO.rotateMode = false;
            if (GM.getCurrentObj() != GM.FO.TempObj)
                if(!GM.getCurrentObj().GetComponent(Mover).isHeld)
                    Snatch();
	        break;
	}
}

function throwObj(){
	if(GM.getCurrentObj() != GM.FO.TempObj){
    	GM.getCurrentObj().rigidbody.constraints = RigidbodyConstraints.None;
    	GM.getCurrentObj().rigidbody.AddForce(GM.FO.FPSCam.transform.forward * GM.WO.throwDistance + (GM.FO.FPSCam.transform.up * GM.WO.throwHeight));
    }
}

function setRotation(){       
     if(Input.GetMouseButton(1)){
        GM.WO.rotateMode = true;
        var rotationX : float = MouseX * GM.WO.sensitivityX;
        var rotationY : float = MouseY * GM.WO.sensitivityY;
   
 
        switch(GM.WO.weaponModeLevel){
            case GM.WO.weaponModeLevel.X:
                //GM.getCurrentObj().transform.Rotate(GM.getCurrentObj().transform.right, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.Rotate(GM.WO.referenceCamera.right, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.eulerAngles =  Vector3(Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.x, GM.getCurrentObj().transform.eulerAngles.x * Time.deltaTime, .05), 0, 0);
                GM.getCurrentObj().transform.localRotation.x += -rotationX * -Mathf.Deg2Rad * .07;
                break;
            case GM.WO.weaponModeLevel.Y:
                //GM.getCurrentObj().transform.Rotate(GM.getCurrentObj().transform.up, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.Rotate(GM.WO.referenceCamera.up, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.eulerAngles =  Vector3(0, Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.y, GM.getCurrentObj().transform.eulerAngles.y * -rotationX, Time.deltaTime), 0);
                GM.getCurrentObj().transform.localRotation.y += -rotationX * -Mathf.Deg2Rad * .07;
                break;
            case GM.WO.weaponModeLevel.Z:
                //GM.getCurrentObj().transform.Rotate(GM.getCurrentObj().transform.forward, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.Rotate(GM.WO.referenceCamera.forward, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.eulerAngles =  Vector3(0,0,Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.z, GM.getCurrentObj().transform.eulerAngles.z * -rotationX, Time.deltaTime));
                GM.getCurrentObj().transform.localRotation.z += -rotationX * -Mathf.Deg2Rad * .07;
                break;
            case GM.WO.weaponModeLevel.Uniform:                
                /*GM.getCurrentObj().transform.eulerAngles =  Vector3(
                                                                    Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.x, GM.getCurrentObj().transform.eulerAngles.x + -rotationX, Time.deltaTime),
                                                                    Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.y, GM.getCurrentObj().transform.eulerAngles.y + -rotationX, Time.deltaTime),
                                                                    Mathf.LerpAngle(GM.getCurrentObj().transform.eulerAngles.z, GM.getCurrentObj().transform.eulerAngles.z + -rotationX, Time.deltaTime)
                                                            ); */
                //GM.getCurrentObj().transform.Rotate(GM.getCurrentObj().transform.up, -Mathf.Deg2Rad * rotationX);
                //GM.getCurrentObj().transform.Rotate(GM.getCurrentObj().transform.right,  Mathf.Deg2Rad * rotationY);
                GM.getCurrentObj().transform.Rotate(GM.WO.referenceCamera.up, -Mathf.Deg2Rad * rotationX);
                GM.getCurrentObj().transform.Rotate(GM.WO.referenceCamera.right,  Mathf.Deg2Rad * rotationY);
                break;
        }          

		
		                 
        
    } else {
        GM.WO.rotateMode = false;       
    }
    
    if(Input.GetMouseButton(0)){
        GM.getCurrentObj().transform.localRotation = Quaternion.identity;
    } else {
        GM.getCurrentObj().rigidbody.freezeRotation = true;
    }
     
}

function setScale(){ 

 	var scaleVector:Vector3;
    switch(GM.WO.weaponModeLevel){
        case GM.WO.weaponModeLevel.X:
            scaleVector = Vector3(.1,0,0);
            break;
        case GM.WO.weaponModeLevel.Y:
            scaleVector = Vector3(0,.1,0);
            break;
        case GM.WO.weaponModeLevel.Z:
            scaleVector = Vector3(0,0,.1);
            break;
        case GM.WO.weaponModeLevel.Uniform:
            scaleVector =  Vector3(.1,.1,.1);
            break;
    }    

   	if (GM.WO.modeDirection == 1){
		GM.getCurrentObj().transform.localScale += scaleVector;
	}
	else if (GM.WO.modeDirection == -1){
	  	GM.getCurrentObj().transform.localScale -= scaleVector;
	  }
		//GM.FO.TempObj.transform.position += GM.FPSCam.transform.forward * GM.WO.currentScale;
	
   	//GM.WO.currentScale = GM.WO.modeDirection * GM.WO.modifyRate * Time.deltaTime; 
  	
  	// X LIMITS
	if (GM.getCurrentObj().transform.localScale.x < GM.WO.scalingModeLimitLower){
		GM.getCurrentObj().transform.localScale.x = GM.WO.scalingModeLimitLower;
	} else if (GM.getCurrentObj().transform.localScale.x > GM.WO.scalingModeLimitUpper){
		GM.getCurrentObj().transform.localScale.x = GM.WO.scalingModeLimitUpper;
	}
	// Y LIMITS
	if (GM.getCurrentObj().transform.localScale.y < GM.WO.scalingModeLimitLower){
		GM.getCurrentObj().transform.localScale.y = GM.WO.scalingModeLimitLower;
	} else if (GM.getCurrentObj().transform.localScale.y > GM.WO.scalingModeLimitUpper){
		GM.getCurrentObj().transform.localScale.y = GM.WO.scalingModeLimitUpper;
	}
	// Z LIMITS
	if (GM.getCurrentObj().transform.localScale.z < GM.WO.scalingModeLimitLower){
		GM.getCurrentObj().transform.localScale.z = GM.WO.scalingModeLimitLower;
	} else if (GM.getCurrentObj().transform.localScale.z > GM.WO.scalingModeLimitUpper){
		GM.getCurrentObj().transform.localScale.z = GM.WO.scalingModeLimitUpper;		
	}
	
}

function setPosition(){         
	GM.WO.scrollPosition += GM.WO.modeDirection * GM.WO.forwardSpeed * Time.deltaTime;
	
	if(GM.WO.scrollPosition <= 0){
		GM.WO.scrollPosition = 0;
	} else if(GM.WO.scrollPosition >= GM.WO.maxPositionDistance){
		GM.WO.scrollPosition = GM.WO.maxPositionDistance;
		GM.WO.modeDirection = 0;
	}
		
	if(GM.WO.scrollPosition != 0)
    	GM.FO.TempObj.transform.position += GM.FO.FPSCam.transform.forward * GM.WO.modeDirection * GM.WO.forwardSpeed * Time.deltaTime;	
}
	
function setEnergize(){
	//return (GM.modeDirection * GM.WO.energyFillAmmount);    
}

function Snatch(){
    if(!GM.PO.isOnInteractiveObject && GM.getCurrentObj() != GM.FO.TempObj){
      //GM.WO.tetherBeam.particleEmitter.active = true;
      GM.setWeaponOption("tetherOn");
      var origin:Vector3 = GM.getCurrentObj().transform.position;
      var target:Vector3 = GM.FO.TempObj.transform.position;
      var d:float = Vector3.Distance(origin, target);
      
      //[2:47:16 PM] Mike Bechtel: uhhh my skype is in russian.... :/
      
      GM.getCurrentObj().transform.position = Vector3.Lerp(origin, target, GM.WO.snatchSpeed);
     
      if(d >= 1/d){
          GM.getCurrentObj().transform.position.y += .15;
      } else {
          GM.getCurrentObj().transform.position.y -= .15;   
      }   
         
      if(d <= 1.5){
          GM.getCurrentObj().GetComponent(Mover).MO.isHeld = true;
          GM.getCurrentObj().GetComponent(Mover).MO.isSnatching = false;//is the needed?
      } 
    }
}
