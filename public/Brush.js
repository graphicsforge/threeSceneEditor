

var ToolPalette = function() {
  this.brushes = [];

  this.domElement = document.createElement( 'div' );
  this.domElement.setAttribute('id', 'model_palette');
  document.body.appendChild( this.domElement );
}

ToolPalette.prototype.deselect = function() {
  for ( var i=0; i<this.brushes.length; i++ )
  {
    this.brushes[i].deselect();
  }
}

var Tool = function(palette, name) {
  this.palette = palette;
  this.name = name;
  this.active = false;
}

Tool.prototype.deselect = function()
{
  this.domElement.style.backgroundColor = "transparent";
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
    self.domElement.style.backgroundColor = "#000";
    self.active = !self.active;
  }
  this.palette.domElement.appendChild( this.domElement );
}


