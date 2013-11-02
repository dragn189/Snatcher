var GM:GameManager;

public var moveGizmo:GameObject;
public var rotateGizmo:GameObject;
public var xAxisGizmo:GameObject;
public var yAxisGizmo:GameObject;
public var zAxisGizmo:GameObject;
public var xAxisGizmoRotation:GameObject;
public var yAxisGizmoRotation:GameObject;
public var zAxisGizmoRotation:GameObject;
public var debug:boolean = true;
private var offScreen:Vector3 = Vector3(-9999,-9999,-9999);
private var gizmoList:ArrayList = new ArrayList();
function Start () {
    gizmoList.Add(moveGizmo);
    gizmoList.Add(rotateGizmo);
    gizmoList.Add(xAxisGizmo);
    gizmoList.Add(yAxisGizmo);
    gizmoList.Add(zAxisGizmo);
    gizmoList.Add(xAxisGizmoRotation);
    gizmoList.Add(yAxisGizmoRotation);
    gizmoList.Add(zAxisGizmoRotation);

}

function Update () {
    if(debug){
        switch(GM.WO.weaponMode){
            case GM.WO.weaponMode.Shooting: 
                attachGizmo(moveGizmo);
                resetGizmos(moveGizmo); 
                break;
            case GM.WO.weaponMode.Rotating: 
                switch(GM.WO.weaponModeLevel){
                     case GM.WO.weaponModeLevel.X: attachGizmo(xAxisGizmoRotation); resetGizmos(xAxisGizmoRotation); break;
                     case GM.WO.weaponModeLevel.Y: attachGizmo(yAxisGizmoRotation); resetGizmos(yAxisGizmoRotation); break;
                     case GM.WO.weaponModeLevel.Z: attachGizmo(zAxisGizmoRotation); resetGizmos(zAxisGizmoRotation); break;
                     case GM.WO.weaponModeLevel.Uniform: attachGizmo(rotateGizmo); resetGizmos(rotateGizmo); break; 
                }            
                break;
            case GM.WO.weaponMode.Scaling: 
                switch(GM.WO.weaponModeLevel){
                     case GM.WO.weaponModeLevel.X: attachGizmo(xAxisGizmo); resetGizmos(xAxisGizmo); break;
                     case GM.WO.weaponModeLevel.Y: attachGizmo(yAxisGizmo); resetGizmos(yAxisGizmo); break;
                     case GM.WO.weaponModeLevel.Z: attachGizmo(zAxisGizmo); resetGizmos(zAxisGizmo); break;
                     case GM.WO.weaponModeLevel.Uniform: attachGizmo(moveGizmo); resetGizmos(moveGizmo); break; 
                }                
                break;
            case GM.WO.weaponMode.Moving: 
                attachGizmo(moveGizmo); 
                resetGizmos(moveGizmo);
                break;
            case GM.WO.weaponMode.Energizing: 
                attachGizmo(moveGizmo); 
                resetGizmos(moveGizmo);
                break;
        }
    } else {
            resetGizmos(null);    
    }
}

function resetGizmos(currentGizmo:GameObject){
    if(currentGizmo == null){
        for(var g:GameObject in gizmoList){
              g.transform.position = offScreen;        
        }
    } else {
        for(var g:GameObject in gizmoList){
            if(g != currentGizmo){
              g.transform.position = offScreen;
            }
        }
    }
}

function attachGizmo(gizmo:GameObject){
    if(GM.getCurrentObj() != GM.FO.TempObj){
        gizmo.transform.position = GM.getCurrentObj().transform.position;
        gizmo.transform.rotation = GM.getCurrentObj().transform.rotation; 
    } else {
        gizmo.transform.position = offScreen;
    }    
}