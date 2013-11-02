import System;
var GM:GameManager;
var XAxis : Texture;
var YAxis : Texture;
var ZAxis : Texture;
var Uniform:Texture;
var indicatorOffset:float = 100.0;
private var posX:float;
private var posY:float;
private var posZ:float;
private var aTexture:Texture;

function OnGUI() {
    var posV:Vector3 =  GM.FO.FPSCam.GetComponent(Camera).WorldToScreenPoint(GM.FO.CurrentObj.transform.position);
    if(GM.FO.CurrentObj != GM.FO.TempObj){
      switch(GM.WO.weaponMode){
        case GM.WO.weaponMode.Shooting:
            break;  
        case GM.WO.weaponMode.Rotating:
            break;  
        case GM.WO.weaponMode.Scaling:
            switch(GM.WO.weaponModeLevel){
                case GM.WO.weaponModeLevel.X:
                    aTexture = XAxis;
                    //posX = posV.x + indicatorOffset;
                    //posX = posV.x;
                    break;  
                case GM.WO.weaponModeLevel.Y:
                    aTexture = YAxis;
                    //posY = posV.y - indicatorOffset;
                    break;  
                case GM.WO.weaponModeLevel.Z:
                    aTexture = ZAxis;
                    posX = posV.z;
                    break;  
                case GM.WO.weaponModeLevel.Uniform:
                    aTexture = XAxis;
                    break;  
            }
            break;  
        case GM.WO.weaponMode.Moving:
            break;  
        case GM.WO.weaponMode.Energizing:
            break;  
      }
            
    if(aTexture != null && GM.FO.CurrentObj != GM.FO.TempObj && Event.current.type.Equals(EventType.Repaint)){
        Graphics.DrawTexture(Rect(posV.x , posV.y - indicatorOffset, 50, 50), aTexture);
    }

    } 
}