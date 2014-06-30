
  var setupFileDrop = function(element)
  {
//      holder = document.createElement( 'div' );
//      holder.setAttribute('id', 'holder');
//      document.body.appendChild( holder );
      holder = document;
      // setup file drop area
      holder.ondragover = function () { this.className = 'hover'; return false; };
      holder.ondragend = function () { this.className = ''; return false; };
      holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.onload = function (event) {

          if ( file.type.match("^image") )
          {

            if ( scene.children.length )
            {
              var texture = THREE.ImageUtils.loadTexture( event.target.result );
              var material = new THREE.MeshBasicMaterial( { map: texture } );
              var object = scene.children[scene.children.length-1];
              for ( var i=0; i<object.children.length; i++ )
                object.children[i].material = material;
            }
            else
            {
              holder.style.background = 'url(' + event.target.result + ') no-repeat center';
            }
          }
          if ( file.name.match(/\.stl$/) )
          {
            // TODO none of the STL stuff works
            var loader = new THREE.STLLoader();

            var geometry = loader.parse( event.target.result );
            var texture = THREE.ImageUtils.loadTexture( 'textures/test.png' );
            texture.anisotropy = rendererMain.getMaxAnisotropy();
            var material = new THREE.MeshBasicMaterial( { map: texture } );

            var mesh = new THREE.Mesh( geometry, cursorMaterial );

            mesh.scale.set( 50, 50, 50 );
            mesh.rotation.set( Math.PI / 2, 0, 0 );

            var brush = new Brush(palette, file.name, mesh);

          }
          if ( file.name.match(/\.obj$/) )
          {
            // load something
            var loader = new THREE.OBJLoader();

            var object = loader.parse( event.target.result );
            var texture = THREE.ImageUtils.loadTexture( 'textures/test.png' );
            texture.anisotropy = rendererMain.getMaxAnisotropy();
            var material = new THREE.MeshBasicMaterial( { map: texture } );

            for ( var i=0; i<object.children.length; i++ )
            {
              object.children[i].material = cursorMaterial;
            }
            object.scale.set(50,50,50);
            object.rotation.set( Math.PI / 2, 0, 0 );

            var brush = new Brush(palette, file.name, object);
          }
          if ( file.name.match(/\.js$/) )
          {
            // initialize our geometry
            var geometry = new THREE.BufferGeometry();
            var input = JSON.parse( event.target.result );

            // we need a way of creating an array of the proper type,
            // defining those types here
            var types = [ Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array ];
            for ( var attr in input.attributes )
            {
              // copy over an attribute
              var sourceAttr = input.attributes[ attr ];
              var sourceArray = sourceAttr.array;
              var attribute = {
                itemSize: sourceAttr.itemSize,
                numItems: sourceAttr.numItems,
                array: null
              };
              // detect our type
              var type = sourceAttr.type;
              function functionName(fun) {
                var ret = fun.toString();
                ret = ret.substr('function '.length);
                ret = ret.substr(0, ret.indexOf('('));
                return ret;
              }
              for ( var i = 0, il = types.length; i < il; i ++ ) {
                var type = types[ i ];
                if ( sourceAttr.type == functionName(type) ) {
                  attribute.array = new type( sourceArray );
                  break;
                }
              }
              // add this attribute
              geometry.attributes[ attr ] = attribute;
            }

            var texture = THREE.ImageUtils.loadTexture( 'textures/test.png' );
            texture.anisotropy = rendererMain.getMaxAnisotropy();
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var mesh = new THREE.Mesh( geometry, material );

            scene.add( mesh );
          }

        }

        if ( file.type.match("^image") )
          reader.readAsDataURL(file);
        else
          reader.readAsText(file);

        return false;
      }; // holder.ondrop
    };

