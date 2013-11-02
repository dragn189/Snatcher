function OnCollisionEnter(col:Collision){
	for(var contact:ContactPoint in col.contacts){
		Debug.DrawLine(contact.point, contact.point + contact.normal, Color.gray, 2, false);
	}
}
