@CustomPropertyDrawer(QuadrantAttribute)
public class QuadrantDrawer extends PropertyDrawer{
	function GetPropertyHeight (property:SerializedProperty, label:GUIContent):float {
		if (!property.isExpanded) {
			return 16f;
		}
        if (!property.isArray || property.FindPropertyRelative("Array.size").hasMultipleDifferentValues) {
			return 36f;
		}
		var height:float = 32f;
		for (var i:int = 0; i < property.arraySize; i++) {
			height += EditorGUI.GetPropertyHeight(property.GetArrayElementAtIndex(i));
		}
		return height;
	}

	function OnGUI (position:Rect, property:SerializedProperty, label:GUIContent):void {
		EditorGUIUtility.LookLikeControls ();
        position.height = 16f;
		ShowFoldout(position, property, label);
		position.y += 16f;
		
		if (!property.isExpanded) {
			return;
		}
        if (!property.isArray) {
			ShowError(position);
			return;
		}
        
        var size:SerializedProperty = property.FindPropertyRelative("Array.size");
		if (size.hasMultipleDifferentValues) {
			ShowDifferentSizesText(position);
			return;
		}
        
		EditorGUI.indentLevel += 1;
		
        EditorGUI.PropertyField(position, property.FindPropertyRelative("Array.size"));
		
        position.y += 16f;
		ShowElements(position, property);
		EditorGUI.indentLevel -= 1;
	}
	
	function ShowFoldout (position:Rect, property:SerializedProperty, label:GUIContent):void  {
		position.x -= 14f;
		position.width += 14f;
		label = EditorGUI.BeginProperty(position, label, property);
		property.isExpanded = EditorGUI.Foldout(position, property.isExpanded, label, true);
		EditorGUI.EndProperty();
	}
    
    function ShowElements (position:Rect, property:SerializedProperty):void {
		for (var i:int = 0; i < property.arraySize; i++) {
			var element:SerializedProperty = property.GetArrayElementAtIndex(i);
			position.height = EditorGUI.GetPropertyHeight(element);
			EditorGUI.PropertyField(position, element, GUIContent("Quadrant " + i),true);
			position.y += position.height;
		}
	}
    function ShowError(position:Rect):void {
		position.x += 2f;
		position.width -= 4f;
		position.height = 20f;
		EditorGUI.HelpBox(position, "Property is not an array nor a list.", MessageType.Error);
	}
    
    function ShowDifferentSizesText(position:Rect):void {
		position.x += 2;
		position.width -= 4f;
		position.height = 20f;
		EditorGUI.HelpBox(position, "Not showing lists with different sizes.", MessageType.Info);
	}
}