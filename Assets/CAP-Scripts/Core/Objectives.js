import System.Collections.Generic;
class Objective {
    public var name:String;
    public var target:GameObject;
    public var completed:boolean; 
    public var pointAward:int;
	@HideInInspector
    public var hasBeenAdded:boolean;
    
    public function Objective(n:String){
    	name = n;
    }

}


public var GM:GameManager;
public var Objectives = new ArrayList();
public var quadrants:Objective[];
public var miniPuzzles:Objective[];
public var gunModes:Objective[] = [
	new Objective("Rotating"),
	new Objective("Scaling"),
	new Objective("Moving"),
	new Objective("Engizinging")
];
public var engineParts:Objective[];
public var foodItems:Objective[];

public var totalCompletedPoints: int;
private var maxTotalPoints:int;

function Start(){
	//Add the arrays to a main group array
    Objectives.Add(quadrants);
    Objectives.Add(miniPuzzles);
    Objectives.Add(gunModes);
    Objectives.Add(engineParts);
    Objectives.Add(foodItems);
    
    //calcutate the total max points
    CalculatePointsSystem(false);
    print(maxTotalPoints);
}

function CalculatePointsSystem(addToTotal:boolean){
	//Loop through the main array and get each objective array
    for(var objArr:Objective[] in Objectives){
    	//loop through each Obj array
        for(var obj:Objective in objArr){
        	//check to see if the player obtained the objective
        	
            if( GM.FO.CurrentObj.transform.parent != null && GM.FO.CurrentObj.transform.parent.gameObject == obj.target.gameObject){
        		obj.completed = true;
        	}
        	
        	//if adding to the completed total
	        if(addToTotal){
	        	if(obj.completed == true && obj.hasBeenAdded == false){
	        		totalCompletedPoints += obj.pointAward;
	        		obj.hasBeenAdded = true;
	        		print(totalCompletedPoints);
	        	}
	        } else {
	        	//inital start calculate the max total 
	       		maxTotalPoints += obj.pointAward;
	        }
        }
    }
}

function Update(){
	    if (totalCompletedPoints < maxTotalPoints)
            CalculatePointsSystem(true);
}

function getCompletedPoints():int{
	return totalCompletedPoints;
}

function getMaxPoints():int{
	return maxTotalPoints;
}