

var ToolPalette = function() {
  this.brushes = [];

  this.domElement = document.createElement( 'div' );
  this.domElement.setAttribute('id', 'model_palette');
  document.body.appendChild( this.domElement );
}

ToolPalette.prototype.deselect = function() {
  for ( var i=0; i<this.brushes.length; i++ )
    this.brushes[i].deselect();
}

// handle click events
ToolPalette.prototype.intersectClick = function(scene, objects, intersect) {
  for ( var i=0; i<this.brushes.length; i++ )
    if ( this.brushes[i].active )
      this.brushes[i].intersectClick(scene, objects, intersect);
}

var Tool = function(palette, name) {
  this.palette = palette;
  this.name = name;
  this.active = false;
}

Tool.prototype.select = function()
{
  this.domElement.style.backgroundColor = "#000";
  this.active = true;
}
Tool.prototype.deselect = function()
{
  this.domElement.style.backgroundColor = "transparent";
  this.active = false;
}



Brush.prototype = new Tool;
Brush.constructor = Brush;
function Brush(palette, name, object) {
  Tool.call(this, palette, name);
  this.object = object;

  // add ourselves to the palette
  this.palette.brushes.push( this );

  // create our widget and add it
  this.domElement = document.createElement('div');
  this.domElement.innerHTML = this.name;
  this.domElement.style.cursor = "pointer";
  var self = this;
  this.domElement.onclick = function() {
    cursor3d = object;
    self.palette.deselect();
    self.select();
  }
  this.palette.domElement.appendChild( this.domElement );
}

Brush.prototype.intersectClick = function(scene, objects, intersect) {
  // get the normal at this point in global coords
  normalMatrix.getNormalMatrix( intersect.object.matrixWorld );
  var normal = intersect.face.normal.clone();
  normal.applyMatrix3( normalMatrix ).normalize();

  var voxel = this.object.clone();
  if ( voxel.material )
  {
    voxel.material = defaultMaterial;
    objects.push( voxel );
  }
  else
  {
    for ( var i=0; i<voxel.children.length; i++ )
    {
      voxel.children[i].material = defaultMaterial;
      objects.push( voxel.children[i] );
    }
  }

  // get the rotation needed so z-axis is aligned with normal
  var normalRotation = new THREE.Quaternion();
  normalRotation.setFromUnitVectors( new THREE.Vector3(0,1,0), normal );
  voxel.rotation.setFromQuaternion(normalRotation);

  voxel.position.addVectors( intersect.point, normal );
  scene.add( voxel );
}

