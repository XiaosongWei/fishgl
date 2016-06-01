/*! ie-fishbowl | http://ie.microsoft.com/testdrive/performance/fishbowl/ | 2015-10-27 */
!function() {
    function a() {
        var a = !1;
        try {
            var b = document.createElement("canvas");
            if (window.WebGLRenderingContext) {
                var c = b.getContext("experimental-webgl") || b.getContext("webgl");
                a = !!c
            }
            b = void 0
        } catch (d) {
            a = !1
        }
        return a
    }
    var b = {
        REVISION: "0.0.1"
    };
    b.axisX = new THREE.Vector3(1,0,0),
    b.axisY = new THREE.Vector3(0,1,0),
    b.axisZ = new THREE.Vector3(0,0,1),
    b.Vector3Zero = new THREE.Vector3(0,0,0),
    b.Vector2Zero = new THREE.Vector2(0,0),
    b.toDEGREES = 180 / Math.PI,
    b.toRADIANS = Math.PI / 180,
    b.lerp = function(a, b, c) {
        return a + (b - a) * c
    }
    ,
    b.getRandomInRange = function(a, b) {
        return a % 1 === 0 && b % 1 === 0 ? Math.floor(Math.random() * (b - (a - 1)) + a) : Math.random() * (b - a) + a
    }
    ,
    b.clamp = function(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }
    ,
    b.clampAngle = function(a, c, d) {
        return -360 > a && (a += 360),
        a > 360 && (a -= 360),
        b.clamp(a, c, d)
    }
    ,
    b.shuffle = function(a) {
        var b, c, d = a.length;
        if (0 === d)
            return a;
        for (; --d; )
            b = Math.floor(Math.random() * (d + 1)),
            c = a[d],
            a[d] = a[b],
            a[b] = c;
        return a
    }
    ,
    b.JackIntoThree = function() {
        THREE.Object3D.prototype.arrowAxisX = null ,
        THREE.Object3D.prototype.arrowAxisY = null ,
        THREE.Object3D.prototype.arrowAxisZ = null ,
        THREE.Object3D.prototype.DrawAllAxis = function(a) {
            null  != this.arrowAxisX && this.remove(this.arrowAxisX),
            null  != this.arrowAxisY && this.remove(this.arrowAxisY),
            null  != this.arrowAxisZ && this.remove(this.arrowAxisZ),
            void 0 === a && (a = 1),
            this.arrowAxisX = this.DrawAxis(b.axisX, a, 16711680),
            this.arrowAxisY = this.DrawAxis(b.axisY, a, 65280),
            this.arrowAxisZ = this.DrawAxis(b.axisZ, a, 255)
        }
        ,
        THREE.Object3D.prototype.DrawAxis = function(a, c, d) {
            void 0 === c && (c = 1),
            void 0 === d && (d = 16776960);
            var e = new THREE.ArrowHelper(a,this.position,c,d);
            return e.position = b.Vector3Zero,
            e.rotation.copy(b.Vector3Zero),
            e.updateMatrix(),
            this.add(e),
            e
        }
        ,
        THREE.Object3D.prototype.ShowFaceNormals = function(a, b) {
            void 0 === a && (a = 1),
            void 0 === b && (b = 16776960);
            for (var c = 0; c < this.geometry.faces.length; c++) {
                var d = new THREE.ArrowHelper(this.geometry.faces[c].normal,this.geometry.faces[c].centroid,a,b);
                this.add(d)
            }
        }
    }
    ,
    b.prepGeometry = function(a) {
        a.computeTangents(),
        a.computeFaceNormals(),
        a.computeVertexNormals(),
        a.hasTangents && a.computeTangents()
    }
    ,
    b.triangulateQuads = function(a) {
        c.threeVersion <= 66 ? THREE.GeometryUtils.triangulateQuads(a) : (a.computeFaceNormals(),
        a.computeVertexNormals(),
        a.hasTangents && a.computeTangents())
    }
    ,
    b.getRayFromMouse = function(a, b) {
        var d, e;
        if (c.threeVersion <= 68) {
            d = new THREE.Vector3(2 * (a.x / window.innerWidth) - 1,1 - 2 * (a.y / window.innerHeight),1);
            var f = new THREE.Projector;
            e = f.pickingRay(d.clone(), b.camera)
        } else
            d = new THREE.Vector2,
            d.x = a.x / b.renderer.domElement.width * 2 - 1,
            d.y = 2 * -(a.y / b.renderer.domElement.height) + 1,
            e = new THREE.Raycaster,
            e.setFromCamera(d, b.camera);
        return e
    }
    ;
    var c = window.ieFishbowl = window.ieFishbowl || {};
    c.arm = "arm" === window.navigator.cpuClass,
    window.ieFishbowl = c,
    c.ComplexityLevel = Object.freeze({
        LOW: 0,
        MEDIUM: 1,
        HIGH: 2
    }),
    c.AssetTypes = Object.freeze({
        IMAGE: "image",
        OBJ: "OBJ",
        DAE: "DAE",
        BIN: "BIN"
    }),
    c.FishTypes = Object.freeze({
        GOLDFISH: "goldFish",
        SHARK: "shark",
        WHALE: "whale"
    }),
    c.LogLevels = Object.freeze({
        LOG: 0,
        INFO: 1,
        DEBUG: 2,
        WARN: 3,
        ERROR: 4
    }),
    c.Main = null ,
    c.camera = null ,
    c.fishManager = null ,
    c.assetManager = null ,
    c.treasureChest = null ,
    c.bubbleMinInterval = 60,
    c.bubbleMaxInterval = 100,
    c.bubbleMaterial = null ,
    c.bubbleMinScale = .1,
    c.bubbleMaxScale = 3,
    c.bubbleMinRate = .1,
    c.bubbleMaxRate = .45,
    c.bubbleComplexity = 7,
    c.scaler = 40.2,
    c.nominalRate = .05,
    c.counterStep = .095,
    c.calcScale = .025,
    c.lerpScale = .125,
    c.dummyMove = 3,
    c.turnScale = 12,
    c.rateLerpScale = .312,
    c.fishScaleMin = .2,
    c.fishScaleMax = .5,
    c.fishScale = .5,
    c.setFishScale = function(a) {
        if (0 === a)
            c.fishScale = c.fishScaleMax;
        else {
            var b = a / 400;
            c.fishScale = c.fishScaleMax - (c.fishScaleMax - c.fishScaleMin) * b
        }
    }
    ,
    c.obstacles = [],
    c.lensFlareObstacles = [],
    c.doCollisionDetection = !0,
    c.currentComplexity = c.ComplexityLevel.MEDIUM,
    c.logLevel = c.LogLevels.info,
    c.consoleInfo = window.console.info,
    c.consoleDebug = window.console.debug,
    c.consoleWarn = window.console.warn,
    c.consoleError = window.console.error,
    window.console.info = function(a) {
        c.logLevel >= c.LogLevels.INFO && c.consoleInfo.apply(this, arguments)
    }
    ,
    window.console.debug = function(a) {
        c.logLevel >= c.LogLevels.DEBUG && c.consoleDebug.apply(this, arguments)
    }
    ,
    window.console.warn = function(a) {
        c.logLevel >= c.LogLevels.WARN && c.consoleWarn.apply(this, arguments)
    }
    ,
    window.console.error = function(a) {
        c.logLevel === c.LogLevels.ERROR && c.consoleError.apply(this, arguments)
    }
    ;
    var d = {};
    if (d.normFragment = "uniform sampler2D textureMap;\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nuniform float lightIntensity;\nuniform vec3 tint;\n\nvarying vec2 vUv;\nvarying mat3 tbn;\nvarying vec3 vLightVector;\n\nvoid main() {\n    /** Transform texture coordinate of normal map to a range (-1, 1) */\n    vec3 normalCoordinate = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;\n    \n    normalCoordinate.xy = normalScale * normalCoordinate.xy;\n\n    /** Transform the normal vector in the RGB channels to tangent space */\n    vec3 normal = normalize(tbn * normalCoordinate.rgb);\n\n    /** Lighting intensity is calculated as dot of normal vector and \n        the vertex-to-light vector */\n    /*0.07*/\n    float intensity = max(lightIntensity, dot(normal, vLightVector));\n    vec4 lighting = vec4(intensity, intensity, intensity, 1.0);\n    \n    /** Final color is calculated with the lighting applied */\n    gl_FragColor = texture2D(textureMap, vUv) * lighting;\n    gl_FragColor = mix(gl_FragColor, vec4(tint,0.75), 0.075);\n}",
    d.normVertex = "attribute vec4 tangent;\n\nuniform vec2 uvScale;\nuniform vec3 lightPosition;\n\nvarying vec2 vUv;\nvarying mat3 tbn;\nvarying vec3 vLightVector;\n\nvoid main() {\n    vUv = uvScale * uv;\n\n    /** Create tangent-binormal-normal matrix used to transform\n        coordinates from object space to tangent space */\n    vec3 vNormal = normalize(normalMatrix * normal);\n    vec3 vTangent = normalize( normalMatrix * tangent.xyz );\n    vec3 vBinormal = normalize(cross( vNormal, vTangent ) * tangent.w);\n    tbn = mat3(vTangent, vBinormal, vNormal);\n\n    /** Calculate the vertex-to-light vector */\n    vec4 lightVector = viewMatrix * vec4(lightPosition, 1.0);\n    \n    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n    \n    vLightVector = normalize(lightVector.xyz - modelViewPosition.xyz);\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n",
    d.pointFragment = "uniform vec3 pointColor;\nuniform float maxX;\nuniform float maxY;\nuniform float maxZ;\nuniform vec3 origin;\nuniform float alpha;\nuniform bool antialiased;\n\nvarying float x;\nvarying float y;\nvarying float z;\n\nvoid main() \n{\n    if ( x > -maxX+origin.x && maxX+origin.x > x && \n         y > -maxY+origin.y && maxY+origin.y > y &&\n         z > -maxZ+origin.z && maxZ+origin.z > z\n         )\n    {                     \n        float dist = distance( gl_PointCoord, vec2(0.5) );\n        if (!antialiased) {\n            if (dist > 0.5) discard;\n            else gl_FragColor = vec4(pointColor,alpha);\n        }\n        else {\n            if (dist > 0.5) discard;\n            else\n            {\n                float preAlpha = 1.0 - smoothstep(0.0,alpha, dist);\n                gl_FragColor = vec4(pointColor, preAlpha);\n            }\n        }\n    }\n    else discard;\n}\n",
    d.pointVertex = "uniform float pointSize;\n\nvarying float x;\nvarying float y;\nvarying float z;\n\nvoid main(void)\n{                   \n    vec4 wp = modelMatrix * vec4(position,1.0);\n    \n    x = wp.x;\n    y = wp.y;\n    z = wp.z;\n    \n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n    gl_PointSize = pointSize;           \n}\n",
    d.tintFragment = "uniform vec3 colorStart;\nuniform vec3 colorEnd;\nuniform float amt;\nuniform sampler2D bumpMap;\nuniform float bumpAmt;\nuniform sampler2D tDiffuse;\nuniform bool doDistortion;\nuniform float time;\nuniform float noiseScale;\nuniform float baseSpeed;\n\n\nvarying vec2 vUv;\nvarying mat4 MVP;\n\nvec2 MultiplyUV( in mat4 mat, in vec2 inUV ) {\n    vec4 temp;\n    temp = vec4( inUV.x , inUV.y , 0.000000, 0.000000);\n    temp = ( mat * temp );\n    return temp.xy ;\n}\n\nvoid main() {\n    \n    vec4 texel = texture2D( tDiffuse, vUv );\n    \n    if( doDistortion ){\n       vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * time * baseSpeed; // time * baseSpeed\n       vec2 bump = texture2D( bumpMap, uvTimeShift).rg * 2.0 - 1.0;\n       vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( bump.r, bump.g );\n       texel = texture2D( tDiffuse, uvNoiseTimeShift );\n    // vec2 bump = texture2D( bumpMap, vUv).rg * 2.0 - 0.5;\n    // vec2 offset = bump * bumpAmt;\n    // texel = texture2D( tDiffuse, MultiplyUV(MVP,(vUv+offset)) );\n    \n    } \n    \n    vec4 cs = vec4(colorStart, 1.0);\n    vec4 ce = vec4(colorEnd, 1.0);\n    vec4 mc = mix(cs, ce, amt);\n\n    gl_FragColor = vec4(texel.rgb*mc.rgb, 1.0);\n\n}",
    d.tintVertex = "varying vec2 vUv;\nvarying mat4 MVP;\n\nvoid main() {\n    \n    vUv = uv;\n    MVP = modelViewMatrix;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n}",
    d.waterFragment = "uniform sampler2D baseTexture;\nuniform float baseSpeed;\nuniform sampler2D noiseTexture;\nuniform float noiseScale;\nuniform float alpha;\nuniform float time;\nuniform float offsetX;\nuniform float offsetY;\nuniform vec3 tint;\n\nvarying vec2 vUv;\nvoid main() \n{\n    vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * time * baseSpeed;  \n    vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );\n    vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );\n    vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift * vec2(offsetX, offsetY));\n\n    baseColor.a = alpha;\n    gl_FragColor = baseColor*vec4(tint,1.0);\n}",
    d.waterVertex = "varying vec2 vUv;\nvoid main() \n{ \n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n}",
    c.AssetLoader = function(a, b) {
        this.asset = a,
        this.manager = b,
        this.loader = null 
    }
    ,
    c.AssetLoader.prototype = {
        constructor: c.AssetLoader,
        load: function() {
            switch (this.asset.type) {
            case c.AssetTypes.IMAGE:
                this.loader = new THREE.ImageLoader(this.manager),
                this.loader.load(this.asset.url, $.proxy(this.handleImageLoadComplete, this));
                break;
            case c.AssetTypes.OBJ:
                this.loader = new THREE.OBJLoader(this.manager),
                this.loader.load(this.asset.url, $.proxy(this.handleOBJLoadComplete, this));
                break;
            case c.AssetTypes.DAE:
                this.loader = new THREE.ColladaLoader(this.manager),
                this.loader.options.convertUpAxis = this.asset.convertUpAxis,
                this.loader.load(this.asset.url, $.proxy(this.handleDAELoadComplete, this));
                break;
            case c.AssetTypes.BIN:
                this.manager.itemStart(this.asset.url),
                this.loader = new THREE.BinaryLoader,
                this.loader.load(this.asset.url, $.proxy(this.handleBINLoadComplete, this))
            }
        },
        handleBINLoadComplete: function(a, b) {
            var c = b.length >= 0 ? b[0] : null ;
            this.asset.mesh = new THREE.Mesh(a,c),
            this.manager.itemEnd(this.asset.url)
        },
        handleOBJLoadComplete: function(a) {
            this.asset.asset = a,
            a.traverse($.proxy(this.handleOBJChildFound, this))
        },
        handleOBJChildFound: function(a) {
            a instanceof THREE.Mesh && (this.asset.mesh = a)
        },
        handleDAELoadComplete: function(a) {
            this.asset.asset = a,
            this.asset.mesh = a.scene
        },
        handleImageLoadComplete: function(a) {
            this.asset.asset = a,
            this.asset.texture.image = a,
            this.asset.texture.needsUpdate = !0
        }
    },
    c.AssetManager = function() {
        c.assetManager = this,
        this.assetLibrary = {},
        this.assetLoaderList = [],
        this.percentage = 0,
        this.loadingManager = new THREE.LoadingManager($.proxy(this.handleLoadComplete, this),$.proxy(this.handleLoadingProgress, this),$.proxy(this.handleLoadingError, this)),
        $.extend(this, THREE.EventDispatcher.prototype)
    }
    ,
    c.AssetManager.LOAD_COMPLETE = "loadComplete",
    c.AssetManager.PROGRESS = "progress",
    c.AssetManager.prototype = {
        constructor: c.AssetManager,
        addToAssetList: function(a) {
            void 0 !== this.assetLibrary[a.id] ? console.info("ASSET ALREADY EXISTS IN LIBRARY: " + a.id) : this.assetLibrary[a.id] = a
        },
        loadAssetList: function() {
            this.percentage = 0;
            for (var a in this.assetLibrary) {
                var b = new c.AssetLoader(this.assetLibrary[a],this.loadingManager);
                this.assetLoaderList.push(b),
                b.load()
            }
        },
        getObjectByName: function(a) {
            return this.assetLibrary[a]
        },
        handleLoadingProgress: function(a, b, d) {
            this.percentage = Math.floor(b / d * 100),
            this.dispatchEvent({
                type: c.AssetManager.PROGRESS,
                percentLoaded: this.percentage
            })
        },
        handleLoadComplete: function() {
            this.assetLoaderList = null ,
            window.setTimeout($.proxy(function() {
                this.doFinalDispatch()
            }, this), 0)
        },
        doFinalDispatch: function() {
            this.dispatchEvent({
                type: c.AssetManager.LOAD_COMPLETE
            })
        },
        handleLoadingError: function(a, b) {
            console.log("ERROR IN LOAD: ", a)
        }
    },
    c.FishManager = function(a) {
        c.fishManager = this,
        this.scene = a,
        this.fishModels = {},
        this.fishList = [],
        this.goldFishWPList = [],
        this.sharkWPList = [],
        this.whaleWPList = [],
        this.fishFoodList = [],
        this.entryPoint = new THREE.Object3D,
        this.entryPoint.position.copy(c.Main.origin),
        this.entryPoint.rotateOnAxis(b.axisY, 90 * b.toRADIANS),
        this.entryPoint.translateOnAxis(b.axisY, .43),
        this.entryPoint.translateOnAxis(b.axisZ, -.55),
        this.entryPoint.translateOnAxis(b.axisX, -.1),
        this.entryPoint.rotateOnAxis(b.axisX, 15 * b.toRADIANS),
        this.scaler = 1.5,
        this.gWidth = 67.85,
        this.gHeight = 42,
        this.gDepth = 28.35,
        this.sWidth = 44.22 * this.scaler,
        this.sHeight = 30 * this.scaler,
        this.sDepth = 17.085 * this.scaler,
        this.wWidth = 1.15,
        this.wHeight = .8,
        this.wDepth = .4,
        this.tWidth = 48.24 * this.scaler,
        this.tHeight = 30 * this.scaler,
        this.tDepth = 22.11 * this.scaler,
        this.top = c.Main.origin.clone().y + this.bHeightHalf - .1;
        var d = new THREE.MeshBasicMaterial({
            color: 16776960,
            wireframe: !0
        })
          , e = new THREE.CubeGeometry(this.gWidth,this.gHeight,this.gDepth,30,30,30);
        this.goldFishBox = new THREE.Mesh(e,d),
        this.goldFishBox.position.copy(c.Main.origin),
        this.goldFishBox.translateOnAxis(b.axisY, -2);
        var f = new THREE.MeshBasicMaterial({
            color: 16711680,
            wireframe: !0
        })
          , g = new THREE.CubeGeometry(this.sWidth,this.sHeight,this.sDepth,10,10,10);
        this.sharkBox = new THREE.Mesh(g,f),
        this.sharkBox.position.copy(c.Main.origin),
        this.FISH_0 = "fish_0",
        this.GOLDFISH = "goldfish",
        this.fish_a = "Fish_A",
        this.fish_b = "Fish_B",
        this.fish_c = "Fish_C",
        this.fish_d = "Fish_D",
        this.fish_e = "Fish_E",
        this.fishIDList = [this.fish_a, this.fish_b, this.fish_c, this.fish_d, this.fish_e],
        this.FISH_PREP_COMPLETE = "fishPrepComplete",
        this.createWayPoints(c.FishTypes.GOLDFISH),
        $.extend(this, THREE.EventDispatcher.prototype)
    }
    ,
    c.FishManager.prototype = {
        constructor: c.FishManager,
        createAssetList: function() {
            var a = this.fishIDList.length - 1;
            do
                c.assetManager.addToAssetList(new c.ImageAsset(this.fishIDList[a] + "_COLOR","meshes/fish/LP_" + this.fishIDList[a] + "_COLOR.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.MeshAsset(this.fishIDList[a],"meshes/fish/LP_" + this.fishIDList[a] + ".js",c.AssetTypes.BIN,!1));
            while (a--)
        },
        canFeed: !0,
        foodMat: new THREE.MeshBasicMaterial({
            color: 16768115
        }),
        feedFish: function() {
            if (this.canFeed) {
                this.canFeed = !1;
                var a = c.arm === !0 ? b.getRandomInRange(10, 15) - 1 : b.getRandomInRange(20, 30) - 1;
                do
                    this.fishFoodList.push(new c.Food(this.sWidth,this.sDepth,this.foodMat));
                while (a--);this.timerVar = setTimeout($.proxy(this.resetFeedFish, this), 15e3)
            }
        },
        resetFeedFish: function() {
            this.canFeed = !0
        },
        sRay: new THREE.Raycaster,
        scatterFish: function(a) {
            var b = this.fishList.length - 1;
            do
                if (null  != this.fishList[b].container) {
                    var d = a.distanceTo(this.fishList[b].container.position);
                    if (30 >= d) {
                        this.fishList[b].isScattering = !0;
                        var e = this.fishList[b].container.position.clone().sub(a).normalize();
                        this.sRay.set(this.fishList[b].container.position, e);
                        var f = this.sRay.intersectObject(c.Main.fishScene.tankInner);
                        if (f.length > 0) {
                            var g = f[0].point.distanceTo(this.fishList[b].container.position)
                              , h = this.sRay.ray.at(g - 1)
                              , i = new THREE.Vector3;
                            i.copy(h),
                            this.fishList[b].scatterTarget = i,
                            null  != this.fishList[b].food && (this.fishFoodList.push(this.fishList[b].food),
                            this.fishList[b].food = null ),
                            this.fishList[b].Target = i
                        } else
                            console.warn("FAILED TO INTERSECT WITH INNER TANK TO CREATE TEMPORARY WAYPOINT"),
                            this.getNextWayPoint(this.fishList[b])
                    }
                }
            while (b--)
        },
        updateFish: function(a) {
            var b = this.fishList.length - 1;
            if (!(0 >= b))
                do
                    this.fishList[b].update(a);
                while (b--)
        },
        prepFishAfterLoad: function() {
            var a, b, d, e = this.fishIDList.length - 1;
            do
                a = c.assetManager.getObjectByName(this.fishIDList[e]),
                b = c.assetManager.getObjectByName(this.fishIDList[e] + "_COLOR"),
                d = new c.FishDataObject,
                d.id = this.fishIDList[e],
                d.mesh = a.mesh,
                c.arm ? d.material = new THREE.MeshBasicMaterial({
                    map: b.texture
                }) : d.material = new THREE.MeshLambertMaterial({
                    map: b.texture
                }),
                d.mesh.geometry.computeTangents(),
                d.colorMap = b.texture,
                this.fishModels[this.fishIDList[e]] = d;
            while (e--);this.dispatchEvent({
                type: this.FISH_PREP_COMPLETE
            })
        },
        set TotalFish(a) {
            if (c.Main.isSceneLoaded) {
                var d = Math.floor(a) - this.fishList.length;
                if (0 !== d) {
                    if (d > 0) {
                        var e = d - 1
                          , f = null 
                          , g = 0
                          , h = 0;
                        do
                            f = new c.Fish(this.fishIDList[h],c.FishTypes.GOLDFISH,g * b.getRandomInRange(10, 30)),
                            this.fishList.push(f),
                            g++,
                            h++,
                            h >= this.fishIDList.length && (h = 0);
                        while (e--);this.fishList = b.shuffle(this.fishList)
                    } else {
                        d = Math.abs(d);
                        var i = 0
                          , j = []
                          , k = this.fishList.length - 1;
                        do
                            if (j.push(this.fishList[k]),
                            i++,
                            i === d)
                                break;
                        while (k--);var l = j.length - 1;
                        do
                            clearTimeout(j[l].timerVar),
                            this.removeFish(j[l]);
                        while (l--)
                    }
                    c.setFishScale(this.fishList.length);
                    var m = this.fishList.length - 1;
                    do
                        this.fishList[m].updateScale();
                    while (m--)
                }
            }
        },
        get TotalFish() {
            return this.fishList.length
        },
        createWayPoints: function(a) {
            var b;
            switch (a) {
            case c.FishTypes.GOLDFISH:
                b = this.goldFishBox.geometry.vertices;
                break;
            case c.FishTypes.SHARK:
                b = this.sharkBox.geometry.vertices;
                break;
            case c.FishTypes.WHALE:
                b = this.sharkBox.geometry.vertices
            }
            var d = b.length - 1;
            do {
                var e = new THREE.Vector3;
                switch (e.copy(b[d]),
                a) {
                case c.FishTypes.GOLDFISH:
                    e = e.add(this.goldFishBox.position.clone()),
                    this.goldFishWPList.push(e);
                    break;
                case c.FishTypes.SHARK:
                    e = e.add(this.sharkBox.position.clone()),
                    this.sharkWPList.push(e);
                    break;
                case c.FishTypes.WHALE:
                    e = e.add(this.sharkBox.position.clone()),
                    this.whaleWPList.push(e)
                }
            } while (d--)
        },
        lastR: -1,
        getRandomWayPoint: function(a) {
            var d = []
              , e = 0;
            switch (a.fishType) {
            case c.FishTypes.GOLDFISH:
                d = this.goldFishWPList;
                break;
            case c.FishTypes.SHARK:
                d = this.sharkWPList;
                break;
            case c.FishTypes.WHALE:
                d = this.whaleWPList
            }
            for (e = Math.floor(b.getRandomInRange(0, d.length - 1)); e === this.lastR && d[e].x < -20 && d[e].y < -20; )
                e = Math.floor(b.getRandomInRange(0, d.length - 1));
            return this.lastR = e,
            d[e]
        },
        getNextWayPoint: function(a) {
            var d = [];
            if (this.fishFoodList.length > 0 && null  == a.fishFood && !a.justAte) {
                var e = this.fishFoodList.shift();
                a.Food = e
            } else {
                switch (a.fishType) {
                case c.FishTypes.GOLDFISH:
                    d = this.goldFishWPList;
                    break;
                case c.FishTypes.SHARK:
                    d = this.sharkWPList;
                    break;
                case c.FishTypes.WHALE:
                    d = this.whaleWPList
                }
                for (var f = Math.floor(b.getRandomInRange(0, d.length - 1)); d[f].x < -20 && d[f].y < 0; )
                    f = Math.floor(b.getRandomInRange(0, d.length - 1));
                a.Target = d[f]
            }
        },
        switchShadowsOnFish: function(a) {
            var b = this.fishList.length - 1;
            if (!(0 >= b))
                do
                    null  != this.fishList[b].model && (this.fishList[b].model.castShadow = a);
                while (b--)
        },
        switchScenes: function(a) {
            var b = this.fishList.length - 1;
            do
                null  != this.fishList[b].model && a.add(this.fishList[b].container);
            while (b--)
        },
        hideShowAllFish: function(a) {
            var b = this.fishList.length - 1;
            do
                null  != this.fishList[b].model && (this.fishList[b].model.visible = a);
            while (b--)
        },
        removeFishByType: function(a, b) {
            var c = 0
              , d = this.fishList.length - 1;
            do
                if (this.fishList[d].fishType === b && (this.removeFish(this.fishList[d]),
                c++,
                c === a))
                    return c;
            while (d--);return c
        },
        removeFish: function(a) {
            var b = this.fishList.length - 1;
            do
                if (this.fishList[b] === a) {
                    this.scene.remove(a.container),
                    this.fishList.splice(b, 1);
                    break
                }
            while (b--)
        },
        createFishMesh: function(a, d) {
            console.debug("createFishMesh - called"),
            d = d || !0;
            var e = this.fishModels[a.fishID];
            if (void 0 === e)
                return void console.log("MODEL DOESN'T EXIST FOR " + a.fishID);
            var f = new THREE.Object3D
              , g = new THREE.Object3D;
            f.add(g);
            var h = this.prepFishMesh(e);
            h.castShadow = !0,
            h.receiveShadow = !1,
            g.add(h),
            "Fish_D" !== a.fishID && h.translateOnAxis(b.axisY, 1.2),
            f.updateMatrixWorld(!0),
            this.scene.add(f),
            a.container = f,
            a.model = h,
            a.rotContainer = g,
            d || (f.position.copy(c.Main.origin),
            f.rotation.copy(b.Vector3Zero),
            a.canSwim = d),
            a.init(1),
            a.container.position.copy(this.getRandomWayPoint(a)),
            this.getNextWayPoint(a)
        },
        createFish: function(a, d, e, f) {
            var g = this.fishModels[d];
            if (void 0 === g)
                return void console.log("MODEL DOESN'T EXIST FOR " + d);
            for (var h = 0; a > h; h++) {
                var i = new THREE.Object3D
                  , j = new THREE.Object3D;
                i.add(j);
                var k = this.prepFishMesh(g);
                k.castShadow = !0,
                k.receiveShadow = !1,
                j.add(k),
                k.translateOnAxis(b.axisY, .0175),
                i.updateMatrixWorld(!0),
                this.scene.add(i);
                var l = new c.Fish(i,j,k,e);
                f || (i.position.copy(c.Main.origin),
                i.rotation.copy(b.Vector3Zero),
                l.canSwim = f),
                i.position.copy(this.getRandomWayPoint(l)),
                this.getNextWayPoint(l),
                this.fishList.push(l)
            }
        },
        prepFishMesh: function(a) {
            var c, d, e, f, g = null ;
            switch (a.id) {
            case this.FISH_0:
                g = a.mesh.clone(),
                d = THREE.ShaderLib.normalmap,
                e = THREE.UniformsUtils.clone(d.uniforms),
                e.enableAO.value = !1,
                e.enableDiffuse.value = !0,
                e.enableSpecular.value = !1,
                e.tDiffuse.value = a.colorMap,
                e.tNormal.value = a.normalMap,
                e.uNormalScale.value.set(.8, .8),
                e.diffuse.value.setHex(16777215),
                e.specular.value.setHex(16777215),
                e.ambient.value.setHex(2236962),
                e.shininess.value = 10,
                f = {
                    fragmentShader: d.fragmentShader,
                    vertexShader: d.vertexShader,
                    uniforms: e,
                    lights: !0,
                    fog: !1
                },
                c = new THREE.ShaderMaterial(f),
                g.geometry.computeTangents(),
                g.material = c,
                g.scale = new THREE.Vector3(1,1,1).multiplyScalar(.05);
                break;
            case this.GOLDFISH:
            case this.fish_a:
            case this.fish_b:
            case this.fish_c:
            case this.fish_d:
            case this.fish_e:
                g = a.mesh.clone(),
                g.material = a.material,
                g.geometry.computeTangents(),
                b.triangulateQuads(g.geometry)
            }
            return g
        },
        bind: function(a, b) {
            return function() {
                b.apply(a, arguments)
            }
        }
    },
    c.SoundManager = function(a) {
        this.camera = a,
        this.soundIDs = ["BoatSound", "OceanSounds", "OutsideTankNoise", "UnderWaterDeep"],
        this.sounds = {},
        this.soundPos = {},
        this.isMuted = !1
    }
    ,
    c.SoundManager.prototype = {
        constructor: c.SoundManager,
        init: function() {
            for (var a in this.soundIDs) {
                this.sounds[this.soundIDs[a]] = c.sounds.playAmbientSound(this.soundIDs[a], 1);
                var b = new THREE.Object3D;
                switch (this.soundPos[this.soundIDs[a]] = b,
                this.soundIDs[a]) {
                case "BoatSound":
                    b.position.set(0, c.Main.origin.y, 195);
                    break;
                case "OceanSounds":
                    b.position.set(0, c.Main.origin.y, -172);
                    break;
                case "OutsideTankNoise":
                    b.position.set(0, c.Main.origin.y, 0);
                    break;
                case "UnderWaterDeep":
                    b.position.set(0, c.Main.origin.y, 0);
                    break;
                case "Ship_Music":
                    b.position.set(172, c.Main.origin.y, -50)
                }
            }
        },
        isInTank: !1,
        set IsInTank(a) {
            if (this.isInTank = a,
            a)
                for (var b in this.soundIDs)
                    switch (this.soundIDs[b]) {
                    case "BoatSound":
                        this.sounds[this.soundIDs[b]].setVolume(0);
                        break;
                    case "OceanSounds":
                        this.sounds[this.soundIDs[b]].setVolume(0);
                        break;
                    case "OutsideTankNoise":
                        this.sounds[this.soundIDs[b]].setVolume(0);
                        break;
                    case "UnderWaterDeep":
                        this.sounds[this.soundIDs[b]].setVolume(20)
                    }
            else
                this.sounds.UnderWaterDeep.setVolume(0)
        },
        get IsInTank() {
            return this.isInTank
        },
        pos: new THREE.Vector3,
        ps2: new THREE.Vector2,
        distance: 0,
        o: null ,
        update: function() {
            if (!this.isInTank) {
                this.pos.setFromMatrixPosition(this.camera.matrixWorld),
                this.ps2.x = this.pos.x,
                this.ps2.y = this.pos.z,
                this.distance = 0;
                for (var a in this.soundPos)
                    switch (this.o = this.soundPos[a],
                    a) {
                    case "BoatSound":
                        this.pos.z >= 0 ? (this.distance = 100 - Math.abs(this.o.position.z - this.pos.z),
                        this.distance = b.clamp(this.distance, 5, 17),
                        this.distance = b.lerp(this.sounds[a].volume, this.distance, .035),
                        this.sounds[a].setVolume(this.distance)) : this.sounds[a].setVolume(7);
                        break;
                    case "OceanSounds":
                        this.pos.z < 0 ? (this.distance = 100 - Math.abs(this.pos.z - this.o.position.z),
                        this.distance = b.clamp(this.distance, 2, c.Main.hasPlayedWoosh ? 10 : 80),
                        this.distance = b.lerp(this.sounds[a].volume, this.distance, .035),
                        this.sounds[a].setVolume(this.distance)) : this.sounds[a].setVolume(7);
                        break;
                    case "OutsideTankNoise":
                        this.distance = 100 - Math.abs(this.o.position.z - this.pos.z),
                        this.distance = Math.max(this.distance, 3),
                        this.sounds[a].setVolume(this.distance)
                    }
            }
        }
    },
    function() {
        c.sounds = {
            soundIds: ["toggle", "pop_0", "pop_1", "pop_2", "BoatSound", "BubblesNemo", "FishyWakeup", "OceanSounds", "OutsideTankNoise", "Ship_Music", "UnderWaterDeep", "WindowTap", "CrystalWoosh", "ChowTime"],
            ambientSounds: {},
            sm2Sounds: {},
            init: function() {
                soundManager.url = "sm2/",
                soundManager.flashVersion = 9,
                soundManager.useHighPerformance = !0,
                soundManager.flashLoadTimeout = 500,
                soundManager.audioFormats.mp3.required = !1,
                soundManager.ontimeout(function(a) {
                    soundManager.useHTML5Audio = !0,
                    soundManager.preferFlash = !1,
                    soundManager.reboot()
                }),
                soundManager.onready(function() {
                    c.settings.getSoundEnabled() || soundManager.mute(),
                    $(document).on("visibilitychange", function() {
                        document.hidden ? soundManager.mute() : c.settings.getSoundEnabled() && soundManager.unmute()
                    }),
                    c.sounds.loadSounds()
                })
            },
            loadSounds: function() {
                var a, b, c, d, e = new PxLoader;
                for (a = 0,
                b = this.soundIds.length; b > a; a++)
                    d = this.soundIds[a],
                    c = "sounds/" + d + ".m4a",
                    (soundManager.canPlayURL(c) || (c = "sounds/" + d + ".ogg",
                    soundManager.canPlayURL(c))) && (this.sm2Sounds[d] = e.addSound(d, c));
                e.start()
            },
            mute: function() {
                soundManager.mute(),
                c.settings.setSoundEnabled(!1)
            },
            unmute: function() {
                soundManager.unmute(),
                c.settings.setSoundEnabled(!0)
            },
            play: function(a, b) {
                b = b || 100;
                var c = this.sm2Sounds[a];
                return c ? (c.multiShot = !0,
                c.setVolume(b),
                c.play(),
                c) : void 0
            },
            addAmbientSound: function(a) {
                if (null  == this.ambientSounds[a]) {
                    var b = this.sm2Sounds[a];
                    b ? this.ambientSounds[a] = b : console.warn("SOUND FOR SOUNDID DOES NOT EXIST: " + a)
                }
            },
            playAmbientSound: function(a, b) {
                this.addAmbientSound(a),
                b = b || 100;
                var c = this.sm2Sounds[a];
                return c ? (c.setVolume(b),
                this.loopSound(c),
                c) : void 0
            },
            playAllAmbient: function() {
                for (var a in this.ambientSounds)
                    this.ambientSounds[a].play()
            },
            stopAllAmbient: function() {
                for (var a in this.ambientSounds)
                    this.ambientSounds[a].stop()
            },
            loopSound: function(a) {
                a.play({
                    onfinish: $.proxy(this.loopSound, this, a)
                })
            },
            playToggle: function() {
                this.play("toggle", 60)
            }
        }
    }(),
    c.Asset = function(a, b, c) {
        this.id = a,
        this.url = b,
        this.type = c,
        this.asset = null 
    }
    ,
    c.Asset.prototype = {
        constructor: c.Asset
    },
    c.ImageAsset = function(a, b, d) {
        this.base = new c.Asset(a,b,d),
        this.texture = new THREE.Texture,
        $.extend(this, this.base)
    }
    ,
    c.ImageAsset.prototype = {
        constructor: c.ImageAsset
    },
    c.MeshAsset = function(a, b, d, e) {
        this.base = new c.Asset(a,b,d),
        this.mesh = null ,
        this.convertUpAxis = e || !1,
        $.extend(this, this.base)
    }
    ,
    c.MeshAsset.prototype = {
        constructor: c.MeshAsset
    },
    c.Bubble = function(a, d, e) {
        this.origin = a,
        this.maxY = d,
        this.scale = b.getRandomInRange(c.bubbleMinScale, c.bubbleMaxScale),
        this.xAxis = 1 === b.getRandomInRange(0, 1) ? !0 : !1,
        this.rate = c.bubbleMaxRate * (this.scale / c.bubbleMaxScale),
        this.rate = b.clamp(this.rate, c.bubbleMinRate, c.bubbleMaxRate),
        this.mat = e,
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.scale,Math.floor(c.bubbleComplexity),Math.floor(c.bubbleComplexity)),e),
        this.mesh.renderDepth = 50,
        this.mesh.rotateY(b.getRandomInRange(1, 360) * b.toRADIANS),
        this.mesh.position.copy(this.origin),
        this.mesh.castShadow = !0,
        this.mesh.receiveShadow = !1,
        window.requestAnimationFrame(this.animate.bind(this))
    }
    ,
    c.Bubble.prototype = {
        constructor: c.Bubble,
        animate: function() {
            this.mesh.position.y >= this.maxY ? c.Main.scene.remove(this.mesh) : (window.requestAnimationFrame(this.animate.bind(this)),
            this.update())
        },
        counter: 0,
        counterStep: .75,
        update: function() {
            var a = Math.cos(this.counter);
            this.counter += this.counterStep,
            c.currentComplexity === c.ComplexityLevel.HIGH && (this.xAxis ? this.mesh.position.x += this.scale * (.1 * a) : this.mesh.position.z += this.scale * (.1 * a),
            this.mesh.scale.z += .1 * a,
            this.mesh.scale.y += .1 * a),
            this.mesh.translateY(this.rate)
        }
    },
    c.BubbleEmitter = function(a, d, e, f, g, h) {
        this.origin = new THREE.Object3D,
        this.isMobile = h || !1,
        this.origin.position.copy(a),
        this.top = this.origin.position.y + 50,
        this.size = d || 1,
        this.pNum = e || 15,
        this.range = 45,
        this.flexScale = f || .1,
        this.waggleScale = g || .015,
        this.timerVar = null ,
        this.minTime = 60,
        this.maxTime = 100,
        this.envMap = null ,
        this.mat = null ,
        this.baseMat = null ,
        this.isRunning = !1,
        this.clock = new THREE.Clock,
        this.startTime = this.clock.getElapsedTime(),
        this.geo = new THREE.Geometry,
        this.particles = null ,
        this.rate = c.bubbleMaxRate * (this.size / c.bubbleMaxScale),
        this.rate = b.clamp(this.rate, c.bubbleMinRate, c.bubbleMaxRate),
        this.isMobile ? c.assetManager.addToAssetList(new c.ImageAsset("bubble7","../images/bubble8.png",c.AssetTypes.IMAGE)) : c.assetManager.addToAssetList(new c.ImageAsset("bubble7","images/bubble8.png",c.AssetTypes.IMAGE))
    }
    ,
    c.BubbleEmitter.prototype = {
        constructor: c.BubbleEmitter,
        set Size(a) {
            this.size = a,
            this.particles.material.size = a,
            this.rate = c.bubbleMaxRate * (this.size / c.bubbleMaxScale),
            this.rate = b.clamp(this.rate, c.bubbleMinRate, c.bubbleMaxRate)
        },
        get Size() {
            return this.size
        },
        init: function() {
            c.arm ? this.initArm() : this.initNonArm()
        },
        initArm: function() {
            this.mat = new THREE.MeshBasicMaterial({
                map: c.assetManager.getObjectByName("bubble7").texture,
                transparent: !0,
                blending: THREE.AdditiveBlending
            }),
            window.requestAnimationFrame(this.checkTimer.bind(this))
        },
        initNonArm: function() {
            this.mat = new THREE.ParticleSystemMaterial({
                size: this.size,
                sizeAttenuation: !0,
                map: c.assetManager.getObjectByName("bubble7").texture,
                transparent: !0,
                opacity: 1,
                blending: THREE.AdditiveBlending
            }),
            this.mat.depthWrite = !1;
            for (var a = this.range / this.pNum, d = 0; d < this.pNum; d++) {
                var e = this.origin.position.clone();
                e.x = b.getRandomInRange(e.x - .7, e.x + .7),
                e.z = b.getRandomInRange(e.z - .7, e.z + .7),
                e.y += d * a - b.getRandomInRange(-.8, .8),
                this.geo.vertices.push(e)
            }
            this.particles = new THREE.ParticleSystem(this.geo,this.mat),
            this.particles.position.set(0, 0, 0),
            this.particles.renderDepth = 50,
            this.particles.sortParticles = !1,
            c.Main.scene.add(this.particles)
        },
        update: function() {
            this.isRunning && this.animate()
        },
        counter: 0,
        counterStep: .75,
        flexScale: .01,
        waggleScale: .01,
        verts: null ,
        calc: 0,
        elasticity: 0,
        animate: function() {
            this.calc = Math.cos(this.counter),
            this.elasticity = this.calc * this.flexScale,
            this.mat.size += this.elasticity,
            this.counter += this.counterStep,
            this.verts = this.particles.geometry.vertices;
            var a = this.verts.length - 1
              , b = null ;
            do
                b = this.verts[a],
                b.y += this.rate,
                b.y >= this.top && (b.y = this.origin.position.y);
            while (a--);this.particles.geometry.verticesNeedUpdate = !0
        },
        checkTimer: function() {
            this.isRunning && this.clock.getElapsedTime() >= this.timeOut && (this.resetTime(),
            this.createBubble()),
            window.requestAnimationFrame(this.checkTimer.bind(this))
        },
        timeOut: 0,
        startEmitter: function() {
            this.isRunning || (this.resetTime(),
            this.isRunning = !0,
            c.arm || (this.particles.visible = !0))
        },
        stopEmitter: function() {
            this.isRunning = !1,
            c.arm || (this.particles.visible = !1)
        },
        resetTime: function() {
            this.startTime = this.clock.getElapsedTime(),
            this.timeOut = this.startTime + .001 * b.getRandomInRange(c.bubbleMinInterval, c.bubbleMaxInterval)
        },
        createBubble: function() {
            var a = this.origin.position.clone();
            a.x = b.getRandomInRange(a.x, a.x + .7),
            a.z = b.getRandomInRange(a.z, a.z + .7);
            var d = new c.Bubble(a,a.y + 50,this.mat);
            c.Main.scene.add(d.mesh),
            this.resetTime()
        }
    },
    function(a) {
        c.Fish = function(a, d, e) {
            this.container = null ,
            this.rotContainer = null ,
            this.model = null ,
            this.canSwim = !0,
            this.fishType = d,
            this.fishID = a,
            this.isScattering = !1,
            this.scatterTarget = null ,
            this.food = null ,
            this.dummy = new THREE.Object3D,
            this.minRate = .06,
            this.maxRate = .24,
            this.target = null ,
            this.targetPosition = b.Vector3Zero.clone(),
            this.direction = new THREE.Vector3,
            this.ray = new THREE.Raycaster(new THREE.Vector3,new THREE.Vector3),
            this.maxAngleToTarget = 8,
            this.minDistanceToNewTarget = 8,
            this.turnScale = c.turnScale,
            this.rate = b.getRandomInRange(this.minRate, this.maxRate),
            this.nominalRate = c.nominalRate,
            this.scale = this.rate / this.nominalRate,
            this.counter = 0,
            this.counterStep = c.counterStep,
            this.calcScale = c.calcScale,
            this.lerpScale = c.lerpScale,
            this.lookRot = null ,
            this.targetQ = null ,
            this.rayArrow = null ,
            this.lookObj = new THREE.Object3D,
            c.Main.scene.add(this.lookObj),
            this.distanceToGetNewTarget = 3,
            this.distanceToTarget = 0,
            this.newTargetCount = 0,
            this.createFishMesh()
        }
        ,
        c.Fish.prototype = {
            constructor: c.Fish,
            createFishMesh: function() {
                c.fishManager.createFishMesh(this)
            },
            init: function(a) {
                switch (this.container.add(this.dummy),
                this.dummy.translateOnAxis(b.axisZ, c.dummyMove),
                this.fishType) {
                case c.FishTypes.GOLDFISH:
                    this.minRate = .06,
                    this.maxRate = .3,
                    this.maxAngleToTarget = 6,
                    this.minDistanceToNewTarget = 8,
                    this.turnScale = c.turnScale,
                    this.model.scale = new THREE.Vector3(1,1,1).multiplyScalar(c.fishScale);
                    break;
                case c.FishTypes.SHARK:
                    this.minRate = .04,
                    this.maxRate = .12,
                    this.maxAngleToTarget = 6,
                    this.minDistanceToNewTarget = 10,
                    this.turnScale = c.turnScale,
                    this.model.scale = new THREE.Vector3(1,1,1).multiplyScalar(c.fishScale);
                    break;
                case c.FishTypes.WHALE:
                    this.minRate = 3e-4,
                    this.maxRate = .001,
                    this.maxAngleToTarget = .15,
                    this.minDistanceToNewTarget = .6,
                    this.turnScale = .01,
                    this.model.scale = new THREE.Vector3(1,1,1).multiplyScalar(c.fishScale);
                    break;
                default:
                    this.minRate = 5e-4,
                    this.maxRate = .005,
                    this.maxAngleToTarget = .7,
                    this.minDistanceToNewTarget = .2,
                    this.model.scale = new THREE.Vector3(1,1,1).multiplyScalar(c.fishScale),
                    this.turnScale = .15
                }
                this.animateScale(a)
            },
            playSound: function() {
                var a = b.getRandomInRange(0, 2);
                switch (a) {
                case 0:
                    c.sounds.play("pop_0", 25);
                    break;
                case 1:
                    c.sounds.play("pop_1", 25);
                    break;
                case 2:
                    c.sounds.play("pop_2", 25)
                }
            },
            justAte: !1,
            set Food(a) {
                this.justAte = !0,
                this.food = a,
                this.Target = a.mesh.position
            },
            get Food() {
                return this.food
            },
            finalScale: 0,
            updateScale: function() {
                this.model && (this.model.scale = new THREE.Vector3(this.finalScale,this.finalScale,this.finalScale).multiplyScalar(c.fishScale))
            },
            tween: null ,
            animateScale: function(a) {
                switch (this.finalScale = a,
                this.fishType) {
                case c.FishTypes.GOLDFISH:
                    this.model.scale = new THREE.Vector3(a,a,a).multiplyScalar(c.fishScale);
                    break;
                case c.FishTypes.SHARK:
                    this.model.scale = new THREE.Vector3(a,a,a).multiplyScalar(.2412);
                    break;
                case c.FishTypes.WHALE:
                    this.model.scale = new THREE.Vector3(a,a,a).multiplyScalar(.3216)
                }
            },
            set Target(a) {
                if (this.canSwim) {
                    if (this.newTargetCount > 50)
                        return console.log("removing fish"),
                        this.canSwim = !1,
                        c.fishManager.removeFish(this),
                        void c.Main.scene.remove(this.container);
                    this.distanceToTarget = this.container.position.distanceTo(a);
                    var d = Math.abs(this.container.position.y - a.y);
                    if (d > this.maxAngleToTarget || this.distanceToTarget < this.minDistanceToNewTarget)
                        return this.newTargetCount++,
                        this.maxAngleToTarget += 1,
                        this.minDistanceToNewTarget -= 1,
                        c.fishManager.getNextWayPoint(this),
                        void (null  != this.fishFood && (c.fishManager.fishFoodList.push(this.fishFood),
                        this.fishFood = null ));
                    if (this.target = a,
                    this.targetPosition = a,
                    c.doCollisionDetection && (this.direction = this.targetPosition.clone().sub(this.container.position).normalize(),
                    this.ray.set(this.container.position, this.direction),
                    this.intersects = this.ray.intersectObjects(c.obstacles, !0),
                    this.intersects.length > 0))
                        return c.fishManager.getNextWayPoint(this),
                        void (null  != this.fishFood && (c.fishManager.fishFoodList.push(this.fishFood),
                        this.fishFood = null ));
                    this.updateLookRotation(),
                    this.isScattering ? this.rate = b.getRandomInRange(.75 * this.maxRate, this.maxRate) : this.rate = b.getRandomInRange(this.minRate, this.maxRate),
                    this.isScattering = !1,
                    this.justAte = !1,
                    this.scale = this.rate / this.nominalRate
                }
            },
            updateLookRotation: function() {
                var a = new THREE.Matrix4;
                a.lookAt(this.target, this.container.position, this.container.up),
                this.lookRot = (new THREE.Quaternion).setFromRotationMatrix(a)
            },
            get Target() {
                return this.target
            },
            updateRate: function(a) {
                this.rate = b.lerp(this.rate, this.minRate, a * c.rateLerpScale),
                this.scale = this.rate / this.nominalRate
            },
            update: function(a) {
                this.canSwim && null  !== this.model && (null  == this.fishFood && this.updateRate(a),
                this.counter += this.counterStep * this.scale,
                this.dummy.position.x += this.calcScale * this.scale * Math.cos(this.counter),
                this.rotContainer.position.x = b.lerp(this.rotContainer.position.x, this.dummy.position.x, this.lerpScale * this.scale),
                this.rotContainer.lookAt(this.dummy.position),
                this.targetQ = new THREE.Quaternion,
                THREE.Quaternion.slerp(this.container.quaternion, this.lookRot, this.targetQ, a * this.turnScale),
                this.container.quaternion = this.targetQ,
                this.container.quaternion.normalize(),
                (this.targetQ.equals(this.container.quaternion) || null  != this.food) && this.updateLookRotation(),
                this.Target && (this.distanceToTarget = this.container.position.distanceTo(this.targetPosition),
                this.distanceToTarget < this.distanceToGetNewTarget ? (this.newTargetCount = 0,
                null  != this.scatterTarget && (this.scatterTarget = null ),
                null  != this.food && (this.food.destroy(),
                this.food = null ),
                c.fishManager.getNextWayPoint(this)) : this.container.translateOnAxis(b.axisZ, this.rate)))
            }
        }
    }(window),
    c.FishDataObject = function(a, b, c, d, e, f) {
        this.id = a,
        this.mesh = b,
        this.material = c,
        this.colorMap = d,
        this.specularMap = e,
        this.normalMap = f
    }
    ,
    c.FishDataObject.prototype = {
        constructor: c.FishDataObject
    },
    function(a) {
        c.FishScene = function(a, b) {
            this.mesh = null ,
            this.collada = null ,
            this.scene = new THREE.Scene,
            this.callback = b,
            this.container = null ,
            this.tankReflectionBox = c.SkyBox.fromImagePath("images/skybox/room/room", ".jpg"),
            this.tank = null ,
            this.tankGlass = null ,
            this.gravel = null ,
            this.gravelLight = new THREE.Vector3(0,227,-122),
            this.chestLid = null ,
            this.chestBase = null ,
            this.diver = null ,
            this.loader = new THREE.ColladaLoader,
            this.loader.options.convertUpAxis = !0,
            this.parts = ["Big_Rock", "Bouy", "Chest_Base", "Chest_Lid", "Diver", "DNT", "Doubloons", "Fish_Food", "Gravel", "Plant", "Polyps", "Table", "Tank", "Tank_Glass_Edges", "Tank_Glass_Inner", "Tank_Glass_Outer", "Telescope"],
            this.parts = this.parts.concat(["Anchor", "Ceiling", "Floor", "Map", "Pipes", "Shelf", "Stool", "Wheel", "Wall_Back", "Wall_Exterior", "Wall_Front", "Wall_Left", "Wall_Right"]),
            this.colliders = [],
            this.vTexture = null ,
            this.lensFlare = new c.LensFlare,
            this.lensFlareScene = new THREE.Scene,
            this.sWidth = 10,
            this.sHeight = 20,
            this.sDepth = 10;
            var d = new THREE.MeshBasicMaterial
              , e = new THREE.CubeGeometry(this.sWidth,this.sHeight,this.sDepth,5,5,5);
            this.lightSwitch = new THREE.Mesh(e,d),
            this.lightSwitch.position.set(152, 89, -92),
            this.lightSwitch.visible = !1,
            c.Main.scene.add(this.lightSwitch),
            this.glassMaterials = [],
            this.glassMeshes = []
        }
        ,
        c.FishScene.prototype = {
            constructor: c.FishScene,
            get EmissiveColor() {
                return this.emissiveColor
            },
            createAssetList: function() {
                for (var a = 0; a < this.parts.length; a++)
                    -1 === this.parts[a].indexOf("Tank_Glass") && c.assetManager.addToAssetList(new c.ImageAsset(this.parts[a] + "_COLOR","meshes/room/color/LP_" + this.parts[a] + "_COLOR.jpg",c.AssetTypes.IMAGE)),
                    c.assetManager.addToAssetList(new c.MeshAsset(this.parts[a],"meshes/room/LP_" + this.parts[a] + ".js",c.AssetTypes.BIN));
                c.assetManager.addToAssetList(new c.MeshAsset("BigRockCollider","meshes/room/BigRockCollider.obj",c.AssetTypes.OBJ)),
                c.assetManager.addToAssetList(new c.MeshAsset("PolypsCollider","meshes/room/PolypsCollider.obj",c.AssetTypes.OBJ)),
                c.assetManager.addToAssetList(new c.MeshAsset("Colliders","meshes/room/ChestDiverColliders.obj",c.AssetTypes.OBJ)),
                c.assetManager.addToAssetList(new c.ImageAsset("Diver_SPEC","meshes/room/LP_Diver_SPEC.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Tank_SPEC","meshes/room/LP_Tank_SPEC.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Gravel_SPEC","meshes/room/LP_Gravel_SPEC.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Gravel_NORMAL","meshes/room/LP_Gravel_NORMAL.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Chest_Base_SPEC","meshes/room/LP_Chest_Base_SPEC.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Chest_Lid_SPEC","meshes/room/LP_Chest_Lid_SPEC.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Chest_Base_NORMAL","meshes/room/LP_Chest_Base_NORMAL.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Chest_Lid_NORMAL","meshes/room/LP_Chest_Lid_NORMAL.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Telescope_NORMAL","meshes/room/LP_Telescope_NORMAL.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("skyWater","images/Sunset_0.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.MeshAsset("bentPlane","meshes/skybox/BentPlane.obj",c.AssetTypes.OBJ,!0)),
                c.assetManager.addToAssetList(new c.ImageAsset("Noise","images/noise.jpg",c.AssetTypes.IMAGE))
            },
            set GlassOpacity(a) {
                if (!this.useTempMat)
                    for (var b in this.glassMaterials)
                        this.glassMaterials[b].uniforms && (this.glassMaterials[b].uniforms.opacity.value = a)
            },
            get GlassOpacity() {
                if (this.useTempMat)
                    return 1;
                if (this.glassMaterials.length > 0) {
                    var a = this.glassMaterials[0];
                    if (a.uniforms && void 0 !== a.uniforms.opacity)
                        return a.uniforms.opacity.value
                }
                return 1
            },
            set AlgaeOpacity(a) {
                if (!this.useTempMat) {
                    for (var b in this.glassMaterials)
                        this.glassMaterials[b].uniforms && (this.glassMaterials[b].uniforms.map2Opacity.value = a);
                    c.Main.effect.uniforms.amt.value = a,
                    c.Main.fishLight.shadowDarkness = a//,
                    //c.AdvancedPanel.updateGroup(c.Main.groups.AQUARIUMFILTER)
                }
            },
            get AlgaeOpacity() {
                if (!this.useTempMat) {
                    if (this.glassMaterials.length > 0) {
                        var a = this.glassMaterials[0];
                        if (a.uniforms && void 0 !== a.uniforms.map2Opacity)
                            return a.uniforms.map2Opacity.value
                    }
                    return 1
                }
            },
            set CleanLevel(a) {
                if (!this.useTempMat && 0 !== this.glassMaterials.length) {
                    for (var b in this.glassMaterials)
                        this.glassMaterials[b].uniforms && (this.glassMaterials[b].uniforms.map2Opacity.value = a);
                    c.Main.effect.uniforms.amt.value = a,
                    c.Main.fishLight.shadowDarkness = a;
                    var d = a / .5;
                    c.Main.particles.Scale = Math.max(.1, .8 - .8 * d) //,
                    //c.AdvancedPanel.updateGroup(c.Main.groups.AQUARIUMFILTER)
                }
            },
            get CleanLevel() {
                if (!this.useTempMat) {
                    if (this.glassMaterials.length > 0) {
                        var a = this.glassMaterials[0];
                        if (a.uniforms && void 0 !== a.uniforms.map2Opacity)
                            return a.uniforms.map2Opacity.value
                    }
                    return 1
                }
            },
            toggleVisible: function(a) {
                for (var b in this.glassMaterials)
                    this.glassMaterials[b].depthTest = a;
                for (var d in this.glassMeshes)
                    this.glassMeshes[b].visible = a,
                    a ? c.Main.scene.add(this.glassMeshes[b]) : c.Main.scene.remove(this.glassMeshes[b])
            },
            toggleShadows: function(a) {
                this.chestBase.castShadow = a,
                this.chestLid.castShadow = a,
                this.plantMesh.castShadow = a,
                this.diver.castShadow = a,
                this.Polyps2.castShadow = a,
                c.assetManager.getObjectByName("Big_Rock").mesh.castShadow = a,
                c.assetManager.getObjectByName("Polyps").mesh.castShadow = a;
                for (var b in this.glassMaterials)
                    this.glassMaterials[b].castShadow = a
            },
            collectColliders: function() {
                var a = new THREE.MeshBasicMaterial;
                this.rockCollider = c.assetManager.getObjectByName("BigRockCollider").mesh,
                this.rockCollider.material = a,
                this.rockCollider.visible = !1,
                c.Main.scene.add(this.rockCollider);
                var b = c.assetManager.getObjectByName("Colliders").mesh;
                b.material = a,
                b.position.set(0, 0, 0),
                b.visible = !1,
                c.Main.scene.add(b);
                var d = c.assetManager.getObjectByName("PolypsCollider").mesh;
                d.material = a,
                d.visible = !1;
                var e = d.clone();
                e.position.copy(this.Polyps2.position),
                e.visible = !1,
                c.Main.scene.add(d),
                c.Main.scene.add(e),
                this.colliders.push(d),
                this.colliders.push(e),
                this.colliders.push(this.rockCollider),
                this.colliders.push(b),
                c.Main.colliders = this.colliders,
                c.obstacles = this.colliders
            },
            useTempMat: !1,
            createScene: function() {
                this.tankReflectionBox.createMaterialsArray();
                var a, e = new THREE.MeshBasicMaterial({
                    color: 13421772
                }), f = new THREE.Texture;
                f.image = this.tankReflectionBox.texturesArray,
                f.mapping = c.threeVersion > 67 ? THREE.CubeReflectionMapping : new THREE.CubeReflectionMapping,
                f.flipY = !1,
                f.needsUpdate = !0;
                for (var g = null , h = null , i = {}, j = [], k = 0; k < this.parts.length; k++) {
                    var l = c.assetManager.getObjectByName(this.parts[k]).mesh;
                    if (a = null ,
                    j.push(l),
                    "Tank" === this.parts[k])
                        a = this.useTempMat ? e : c.arm ? new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : new THREE.MeshPhongMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            specular: c.assetManager.getObjectByName("Tank_SPEC").texture,
                            ambient: 0,
                            shininess: 30,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        this.tankFrame = l,
                        l.geometry.computeTangents(),
                        l.material = a,
                        c.Main.scene.add(l);
                    else if (this.parts[k].indexOf("Tank_Glass") > -1) {
                        if (c.arm && "Tank_Glass_Edges" === this.parts[k])
                            continue;c.arm ? (g = THREE.ShaderLib.TankGlassRT,
                        h = THREE.UniformsUtils.clone(g.uniforms),
                        h.map.value = c.assetManager.getObjectByName("Noise").texture,
                        h.map2.value = c.assetManager.getObjectByName("algae").texture,
                        h.envMap.value = f,
                        h.diffuse.value.setHex(16777215),
                        h.emissive.value.setHex(2555903),
                        h.ambient.value.setHex(16777215),
                        h.opacity.value = .15,
                        h.map2Opacity.value = 0,
                        h.reflectivity.value = .95,
                        c.threeVersion <= 70 && (h.combine.value = THREE.MixOperation),
                        i = {
                            fragmentShader: g.fragmentShader,
                            vertexShader: g.vertexShader,
                            uniforms: h,
                            lights: !0,
                            fog: !1,
                            side: THREE.FrontSide,
                            transparent: !0,
                            combine: THREE.MixOperation
                        },
                        a = new THREE.ShaderMaterial(i),
                        a.map = !0,
                        a.envMap = !0,
                        a.depthTest = !0,
                        l.geometry.computeTangents()) : c.arm || (g = THREE.ShaderLib.TankGlass,
                        h = THREE.UniformsUtils.clone(g.uniforms),
                        h.map.value = c.assetManager.getObjectByName("Noise").texture,
                        h.map2.value = c.assetManager.getObjectByName("algae").texture,
                        h.envMap.value = f,
                        h.diffuse.value.setHex(16777215),
                        h.emissive.value.setHex(2555903),
                        h.ambient.value.setHex(16777215),
                        h.opacity.value = .15,
                        h.map2Opacity.value = 0,
                        h.reflectivity.value = .95,
                        c.threeVersion <= 70 && (h.combine.value = THREE.MixOperation),
                        i = {
                            fragmentShader: g.fragmentShader,
                            vertexShader: g.vertexShader,
                            uniforms: h,
                            lights: !0,
                            fog: !1,
                            side: THREE.FrontSide,
                            transparent: !0,
                            combine: THREE.MixOperation
                        },
                        a = new THREE.ShaderMaterial(i),
                        a.map = !0,
                        a.envMap = !0,
                        a.lightMap = !1,
                        a.shadowMap = !0,
                        a.depthTest = !0,
                        a.depthWrite = !1,
                        l.renderDepth = 100,
                        l.geometry.computeTangents()),
                        null  != a && (this.glassMaterials.push(a),
                        this.glassMeshes.push(l),
                        l.receiveShadow = !0,
                        l.castShadow = !1,
                        "Tank_Glass_Edges" === this.parts[k] && (this.tankEdges = l),
                        "Tank_Glass_Outer" === this.parts[k] && (this.tankGlass = a,
                        this.tank = l),
                        "Tank_Glass_Inner" === this.parts[k] && (this.tankInner = l),
                        l.material = a,
                        c.Main.scene.add(l))
                    } else if ("Gravel" === this.parts[k])
                        this.useTempMat ? a = e : (a = new THREE.ShaderMaterial({
                            uniforms: {
                                lightPosition: {
                                    type: "v3",
                                    value: this.gravelLight
                                },
                                textureMap: {
                                    type: "t",
                                    value: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                                },
                                normalMap: {
                                    type: "t",
                                    value: c.assetManager.getObjectByName("Gravel_NORMAL").texture
                                },
                                uvScale: {
                                    type: "v2",
                                    value: new THREE.Vector2(1,1)
                                },
                                normalScale: {
                                    type: "v2",
                                    value: new THREE.Vector2(-.75,-.75)
                                },
                                lightIntensity: {
                                    type: "f",
                                    value: .3
                                },
                                tint: {
                                    type: "c",
                                    value: (new THREE.Color).setHex(16777215)
                                }
                            },
                            vertexShader: d.normVertex,
                            fragmentShader: d.normFragment
                        }),
                        l.geometry.computeTangents()),
                        this.gravel = l,
                        l.receiveShadow = !1,
                        l.castShadow = !0,
                        l.renderDepth = 51,
                        l.geometry.computeTangents(),
                        b.triangulateQuads(l.geometry),
                        l.material = a,
                        c.Main.scene.add(l);
                    else if (this.parts[k].indexOf("Chest") > -1)
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !0),
                        l.geometry.computeTangents(),
                        b.triangulateQuads(l.geometry),
                        l.material = a,
                        "Chest_Lid" === this.parts[k] && (this.chestLid = l),
                        "Chest_Base" === this.parts[k] && (this.chestBase = l),
                        c.Main.scene.add(l);
                    else if (this.parts[k].indexOf("Diver") > -1)
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshPhongMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            specular: c.assetManager.getObjectByName(this.parts[k] + "_SPEC").texture,
                            ambient: 0,
                            shininess: 100,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !0),
                        this.diver = l,
                        l.material = a,
                        c.Main.scene.add(l);
                    else if ("Polyps" === this.parts[k]) {
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !0);
                        var m = new THREE.Geometry;
                        l.material = a,
                        this.Polyps1 = l,
                        this.Polyps2 = l.clone(),
                        this.Polyps2.translateOnAxis(b.axisX, 10),
                        this.Polyps2.translateOnAxis(b.axisZ, 21),
                        THREE.GeometryUtils.merge(m, l),
                        THREE.GeometryUtils.merge(m, this.Polyps2),
                        l = new THREE.Mesh(m,a),
                        c.Main.scene.add(l)
                    } else if ("Big_Rock" === this.parts[k])
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !0),
                        l.material = a,
                        this.bigRock = l,
                        c.Main.scene.add(l);
                    else if ("Table" === this.parts[k])
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !1),
                        l.material = a,
                        c.Main.scene.add(l);
                    else if ("Fish_Food" === this.parts[k])
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !1,
                        l.castShadow = !1),
                        this.fishFood = l,
                        l.material = a,
                        c.Main.scene.add(l);
                    else if ("Telescope" === this.parts[k])
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !1),
                        l.geometry.computeTangents(),
                        l.material = a,
                        this.telescope = l,
                        c.Main.scene.add(l);
                    else if ("Plant" === this.parts[k]) {
                        this.useTempMat ? a = e : c.arm ? a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }) : (a = new THREE.MeshLambertMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture,
                            ambient: 0,
                            emissive: 0,
                            shading: THREE.SmoothShading
                        }),
                        l.receiveShadow = !0,
                        l.castShadow = !0),
                        l.material = a,
                        l.position.y = 80,
                        this.plant_4 = l,
                        this.plant_4.position.set(27.43, 50.52, -14.27);
                        var n = new THREE.Geometry;
                        this.plant_0 = l.clone(),
                        this.plant_0.position.set(-26.1, 64.65, 13.33),
                        this.plant_0.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_1 = l.clone(),
                        this.plant_1.position.set(32, 59, -14.5),
                        this.plant_1.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_2 = l.clone(),
                        this.plant_2.position.set(-32.6, 74.7, 12.75),
                        this.plant_2.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_3 = l.clone(),
                        this.plant_3.position.set(-30.6, 68.1, 3.24),
                        this.plant_3.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_5 = l.clone(),
                        this.plant_5.position.set(-22, 68.1, 13.89),
                        this.plant_5.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_6 = l.clone(),
                        this.plant_6.position.set(-25.8, 64.5, 7.39),
                        this.plant_6.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_7 = l.clone(),
                        this.plant_7.position.set(-18.42, 58.64, 11.45),
                        this.plant_7.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_8 = l.clone(),
                        this.plant_8.position.set(33.25, 52.52, -10.85),
                        this.plant_8.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        this.plant_9 = l.clone(),
                        this.plant_9.position.set(-14.98, 49.8, 14.11),
                        this.plant_9.rotateOnAxis(b.axisY, b.getRandomInRange(1, 360) * b.toRADIANS),
                        THREE.GeometryUtils.merge(n, this.plant_0),
                        THREE.GeometryUtils.merge(n, this.plant_1),
                        THREE.GeometryUtils.merge(n, this.plant_2),
                        THREE.GeometryUtils.merge(n, this.plant_3),
                        THREE.GeometryUtils.merge(n, this.plant_4),
                        THREE.GeometryUtils.merge(n, this.plant_5),
                        THREE.GeometryUtils.merge(n, this.plant_6),
                        THREE.GeometryUtils.merge(n, this.plant_7),
                        THREE.GeometryUtils.merge(n, this.plant_8),
                        THREE.GeometryUtils.merge(n, this.plant_9),
                        this.plantMesh = new THREE.Mesh(n,a),
                        c.arm || (this.plantMesh.receiveShadow = !0,
                        this.plantMesh.castShadow = !0),
                        c.Main.scene.add(this.plantMesh)
                    } else
                        a = new THREE.MeshBasicMaterial({
                            map: c.assetManager.getObjectByName(this.parts[k] + "_COLOR").texture
                        }),
                        l.material = a,
                        c.Main.scene.add(l),
                        "Map" === this.parts[k] && (this.map = l),
                        "Wall_Exterior" === this.parts[k] && (this.exterior = l)
                }
                var o = c.assetManager.getObjectByName("bentPlane").mesh
                  , p = c.assetManager.getObjectByName("skyWater").texture;
                o.material = new THREE.MeshBasicMaterial({
                    map: p
                }),
                o.material.depthWrite = !1,
                o.scale = new THREE.Vector3(30.276852368583953,10,15),
                o.rotateOnAxis(b.axisX, -1.9038785460616727 * b.toRADIANS),
                o.position.set(0, -8.057895144064616, -1801),
                o.geometry.computeTangents(),
                o.renderDepth = 0,
                c.Main.scene.add(o),
                c.arm ? this.lensFlare.initArm() : this.lensFlare.init(),
                this.lensFlare.container.position.set(-0, 98, -1800),
                null  != c.assetManager.getObjectByName("Wall_Back") && c.lensFlareObstacles.push(c.assetManager.getObjectByName("Wall_Back").mesh),
                c.lensFlareObstacles.push(c.assetManager.getObjectByName("Tank").mesh),
                this.collectColliders(),
                this.callback()
            }
        }
    }(window),
    c.Food = function(a, d, e) {
        this.fish = null ,
        this.mat = e,
        this.size = .2,
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(this.size,3,3),this.mat),
        this.mesh.position.y = 125,
        this.mesh.position.x = b.getRandomInRange(.5 * -a, .5 * a),
        this.mesh.position.z = b.getRandomInRange(.5 * -d, .5 * d),
        c.Main.scene.add(this.mesh),
        this.rate = b.getRandomInRange(.01, .03),
        this.isEaten = !1,
        window.requestAnimationFrame(this.update.bind(this))
    }
    ,
    c.Food.prototype = {
        constructor: c.Food,
        destroy: function() {
            this.fish && (this.fish.food = null ),
            this.isEaten = !0,
            c.Main.scene.remove(this.mesh),
            this.mesh = null 
        },
        update: function() {
            this.isEaten || (this.mesh.position.y -= this.rate,
            this.mesh.position.y < 80 ? this.destroy() : window.requestAnimationFrame(this.update.bind(this)))
        }
    },
    c.LensFlare = function() {
        c.assetManager.addToAssetList(new c.ImageAsset("flare0","images/lensflare/lensflare0.png",c.AssetTypes.IMAGE)),
        c.arm || (c.assetManager.addToAssetList(new c.ImageAsset("flare2","images/lensflare/lensflare2.png",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare3","images/lensflare/lensflare3.png",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare4","images/lensflare/gfxcave_flare_1.jpg",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare9","images/lensflare/LF_colorRing.png",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare10","images/lensflare/gfxcave_flare10.jpg",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare11","images/lensflare/gfxcave_flare11.jpg",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare12","images/lensflare/gfxcave_flare12.jpg",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flare13","images/lensflare/gfxcave_flare13.jpg",c.AssetTypes.IMAGE)),
        c.assetManager.addToAssetList(new c.ImageAsset("flareBig","images/lensflare/lensflareBigOrange.png",c.AssetTypes.IMAGE))),
        this.flares = [],
        this.textureFlare0 = null ,
        this.textureFlare2 = null ,
        this.textureFlare3 = null ,
        this.textureFlare4 = null ,
        this.textureFlare9 = null ,
        this.textureFlare10 = null ,
        this.textureFlare11 = null ,
        this.textureFlare12 = null ,
        this.textureFlare13 = null ,
        this.textureFlareBig = null ,
        this.container = new THREE.Object3D,
        this.ray = new THREE.Raycaster(new THREE.Vector3,new THREE.Vector3)
    }
    ,
    c.LensFlare.prototype = {
        constructor: c.LensFlare,
        init: function() {
            this.textureFlare0 = c.assetManager.getObjectByName("flare0").texture,
            this.textureFlare2 = c.assetManager.getObjectByName("flare2").texture,
            this.textureFlare3 = c.assetManager.getObjectByName("flare3").texture,
            this.textureFlare4 = c.assetManager.getObjectByName("flare4").texture,
            this.textureFlare9 = c.assetManager.getObjectByName("flare9").texture,
            this.textureFlare10 = c.assetManager.getObjectByName("flare10").texture,
            this.textureFlare11 = c.assetManager.getObjectByName("flare11").texture,
            this.textureFlare12 = c.assetManager.getObjectByName("flare12").texture,
            this.textureFlare13 = c.assetManager.getObjectByName("flare13").texture,
            this.textureFlareBig = c.assetManager.getObjectByName("flareBig").texture;
            var a = new THREE.Color(16777215);
            this.scale = 1.3,
            this.container = new THREE.LensFlare(this.textureFlare0,440,0,THREE.AdditiveBlending,a),
            this.container.add(this.textureFlareBig, 915, 0, THREE.AdditiveBlending, a, .5),
            this.container.add(this.textureFlare3, 50, .38, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 70, .4, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 90, .42, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 150, .45, THREE.AdditiveBlending),
            this.container.add(this.textureFlare9, 190, .65, THREE.AdditiveBlending, a, .15),
            this.container.add(this.textureFlare3, 20, .48, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 20, .52, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 10, .56, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 190, .6, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 95, .65, THREE.AdditiveBlending),
            this.container.add(this.textureFlare3, 253, .63, THREE.AdditiveBlending),
            this.container.add(this.textureFlare13, 90, .6, THREE.AdditiveBlending, a, .45),
            this.container.add(this.textureFlare3, 70, .68, THREE.AdditiveBlending),
            this.container.customUpdateCallback = this.lensFlareUpdateCallback.bind(this),
            c.Main.scene.add(this.container)
        },
        lensFlareUpdateCallback: function(a) {
            var b, c = a.lensFlares.length - 1, d = 2 * -a.positionScreen.x, e = 2 * -a.positionScreen.y;
            do
                b = a.lensFlares[c],
                b.x = a.positionScreen.x + d * (b.distance * this.scale),
                b.y = a.positionScreen.y + e * (b.distance * this.scale),
                b.rotation = 0;
            while (c--);a.lensFlares[0].rotation = .5 * a.positionScreen.x + THREE.Math.degToRad(45)
        },
        initArm: function() {
            this.textureFlare0 = c.assetManager.getObjectByName("flare0").texture,
            this.flares.push(this.addFlare(this.textureFlare0, 750, 0, THREE.AdditiveBlending));
            for (var a in this.flares)
                this.container.add(this.flares[a]);
            c.Main.scene.add(this.container)
        },
        addFlare: function(a, c, d, e) {
            var f = new THREE.PlaneGeometry(c,c)
              , g = new THREE.Color(16777215);
            g.setHSL(.55, .9, 1);
            var h = new THREE.MeshBasicMaterial({
                map: a,
                emissive: g,
                transparent: !0,
                blending: e
            })
              , i = new THREE.Mesh(f,h);
            return i.translateOnAxis(b.axisZ, d),
            i
        }
    },
    c.Particles = function(a, e, f) {
        this.particleList = [],
        this.geometry = new THREE.Geometry,
        this.width = a || 1,
        this.height = e || 1,
        this.depth = f || 1;
        for (var g = 0; 1e3 > g; g++) {
            var h = new THREE.Vector3;
            h.x = Math.random() * this.width - .5 * this.width,
            h.y = Math.random() * this.height - .5 * this.height,
            h.z = Math.random() * this.depth - .5 * this.depth,
            this.geometry.vertices.push(h)
        }
        for (this.parameters = [[[1, 1, .5], 1], [[.95, 1, .5], 1], [[.9, 1, .5], 1], [[.85, 1, .5], 1], [[.8, 1, .5], 1]],
        this.mat = new THREE.ShaderMaterial({
            uniforms: {
                pointSize: {
                    type: "f",
                    value: 1
                },
                pointColor: {
                    type: "c",
                    value: new THREE.Color(12582879)
                },
                antialiased: {
                    type: "i",
                    value: 1
                },
                maxX: {
                    type: "f",
                    value: 37
                },
                maxY: {
                    type: "f",
                    value: 29
                },
                maxZ: {
                    type: "f",
                    value: 17
                },
                origin: {
                    type: "v3",
                    value: c.Main.origin
                },
                alpha: {
                    type: "f",
                    value: .5
                }
            },
            vertexShader: d.pointVertex,
            fragmentShader: d.pointFragment
        }),
        this.mat.transparent = !0,
        this.mat.blending = THREE.AdditiveBlending,
        g = 0; g < this.parameters.length; g++) {
            var i = (this.parameters[g][0],
            this.parameters[g][1],
            this.mat.clone());
            i.uniforms.pointSize.value = b.getRandomInRange(2, 4),
            i.uniforms.alpha.value = b.getRandomInRange(.3, .5),
            this.particles = new THREE.ParticleSystem(this.geometry,i),
            this.particles.position.copy(c.Main.origin),
            this.particles.rotation.x = 6 * Math.random(),
            this.particles.rotation.y = 6 * Math.random(),
            this.particles.rotation.z = 6 * Math.random(),
            this.particleList.push(this.particles),
            c.Main.scene.add(this.particles)
        }
    }
    ,
    c.Particles.prototype = {
        constructor: c.Particles,
        speedX: .015,
        speedY: .005,
        set Speed(a) {
            this.speedX = a,
            this.speedY = .33 * a
        },
        get Speed() {
            return this.speedX
        },
        update: function() {
            var a = this.particleList.length - 1;
            do
                this.particleList[a].rotateY(this.speedX * b.toRADIANS),
                this.particleList[a].rotateX(this.speedY * b.toRADIANS);
            while (a--)
        },
        antialias: !0,
        set AntiAlias(a) {
            this.antialias = a;
            for (var b = 0; b < this.particleList.length; b++)
                this.particleList[b].material.uniforms.antialiased.value = a
        },
        get AntiAlias() {
            return this.antialias
        },
        renderDepth: 1,
        set RenderDepth(a) {
            for (var b = 0; b < this.particleList.length; b++)
                this.particleList[b].renderDepth = a;
            this.renderDepth = a
        },
        get RenderDepth() {
            return this.renderDepth
        },
        scale: 1,
        set Scale(a) {
            for (var b = 0; b < this.particleList.length; b++)
                this.particleList[b].scale.x = a,
                this.particleList[b].scale.y = a,
                this.particleList[b].scale.z = a;
            this.scale = a
        },
        get Scale() {
            return this.scale
        },
        invScale: .1,
        set InvScale(a) {
            a = Math.abs(.9 - a);
            for (var b = 0; b < this.particleList.length; b++)
                this.particleList[b].scale.x = a,
                this.particleList[b].scale.y = a,
                this.particleList[b].scale.z = a;
            this.invScale = a
        },
        get InvScale() {
            return this.invScale
        }
    },
    c.Ripple = function(a) {
        this.mat = new THREE.MeshBasicMaterial({
            map: c.assetManager.getObjectByName("Ripple").texture,
            transparent: !0,
            opacity: 1,
            shading: THREE.SmoothShading,
            blending: THREE.AdditiveBlending
        }),
        this.mat.depthTest = !1,
        this.size = .5;
        var d = new THREE.PlaneGeometry(this.size,this.size);
        this.mesh = new THREE.Mesh(d,this.mat),
        this.mesh.lookAt(a.face.normal),
        this.mesh.position.copy(a.point),
        this.mesh.scale.z = .5,
        this.mesh.translateOnAxis(b.axisZ, -.25),
        this.mesh.renderDepth = 0,
        c.Main.scene.add(this.mesh),
        this.tween = new TWEEN.Tween(0).to(1, c.arm ? 3e3 : 1e3).easing(TWEEN.Easing.Quadratic.Out).onUpdate(this.update.bind(this)).onComplete(this.onComplete.bind(this)).start()
    }
    ,
    c.Ripple.prototype = {
        constructor: c.Ripple,
        update: function(a) {
            this.mesh.scale.x += a,
            this.mesh.scale.y += a,
            this.mat.opacity = 1 - a
        },
        onComplete: function() {
            c.Main.scene.remove(this.mesh),
            this.mesh = null ,
            this.mat = null ,
            this.shader = null ,
            this.uniforms = null 
        }
    },
    c.SkyBox = function(a, b, d) {
        this.flipY = d || !0,
        this.size = b || 1e3,
        this.skyGeometry = new THREE.CubeGeometry(this.size,this.size,this.size),
        this.materialArray = [],
        this.texturesArray = [],
        this.imgUrls = [a.front, a.back, a.up, a.down, a.right, a.left];
        for (var e = 0; e < this.imgUrls.length; e++)
            c.assetManager.addToAssetList(new c.ImageAsset(this.imgUrls[e],this.imgUrls[e],c.AssetTypes.IMAGE))
    }
    ,
    c.SkyBox.fromImagePath = function(a, b, d) {
        var e = {
            front: a + "_front" + b,
            back: a + "_back" + b,
            up: a + "_up" + b,
            down: a + "_down" + b,
            right: a + "_right" + b,
            left: a + "_left" + b
        };
        return new c.SkyBox(e,d)
    }
    ,
    c.SkyBox.prototype = {
        constructor: c.SkyBox,
        createMaterialsArray: function() {
            for (var a = 0; 6 > a; a++) {
                var b = c.assetManager.getObjectByName(this.imgUrls[a]).texture;
                b.flipY = this.flipY,
                b.needsUpdate = !0,
                this.materialArray.push(new THREE.MeshBasicMaterial({
                    map: b,
                    side: THREE.BackSide
                })),
                this.texturesArray.push(c.assetManager.getObjectByName(this.imgUrls[a]).asset)
            }
        },
        createSkyBox: function() {
            this.createMaterialsArray(),
            this.skyMaterial = new THREE.MeshFaceMaterial(this.materialArray),
            this.skyBox = new THREE.Mesh(this.skyGeometry,this.skyMaterial)
        },
        get SkyBox() {
            return this.skyBox
        },
        set SkyBox(a) {
            return this.skyBox
        }
    },
    c.WaterPlane = function(a, b, c, e, f) {
        c = c || 1,
        e = e || 1,
        this.scene = f,
        this.noiseTexture = a,
        this.noiseTexture.wrapS = this.noiseTexture.wrapT = THREE.RepeatWrapping,
        this.waterTexture = b,
        this.waterTexture.wrapS = this.waterTexture.wrapT = THREE.RepeatWrapping,
        this.uniforms = {
            baseTexture: {
                type: "t",
                value: this.waterTexture
            },
            baseSpeed: {
                type: "f",
                value: .6
            },
            noiseTexture: {
                type: "t",
                value: this.noiseTexture
            },
            noiseScale: {
                type: "f",
                value: .1
            },
            alpha: {
                type: "f",
                value: .8
            },
            time: {
                type: "f",
                value: 1
            },
            offsetX: {
                type: "f",
                value: .9
            },
            offsetY: {
                type: "f",
                value: .85
            },
            tint: {
                type: "c",
                value: (new THREE.Color).setHex(16777215)
            }
        },
        this.time = this.uniforms.time,
        this.waterMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: d.waterVertex,
            fragmentShader: d.waterFragment
        }),
        this.waterMaterial.depthTest = !0;
        var g = new THREE.PlaneGeometry(c,e);
        this.mesh = new THREE.Mesh(g,this.waterMaterial),
        this.scene.add(this.mesh)
    }
    ,
    c.WaterPlane.prototype = {
        constructor: c.WaterPlane,
        update: function(a) {
            this.time.value += a
        }
    },
    b.MouseHandler = function(a) {
        this.moveForward = !1,
        this.moveBackward = !1,
        this.moveLeft = !1,
        this.moveRight = !1,
        this.isDragging = !1,
        this.domElement = a || document,
        $(this.domElement).on({
            pxdragstart: $.proxy(this.onDragStart, this),
            pxdragmove: $.proxy(this.onDragMove, this),
            pxdragend: $.proxy(this.onDragEnd, this),
            pxtap: $.proxy(this.onTap, this),
            pxpinchstart: $.proxy(this.onPinch, this),
            pxpinchmove: $.proxy(this.onPinch, this),
            mousewheel: $.proxy(this.onMouseWheel, this),
            keydown: $.proxy(this.onKeyDown, this),
            keyup: $.proxy(this.onKeyUp, this),
            contextmenu: function(a) {
                a.preventDefault()
            }
        })
    }
    ,
    b.MouseHandler.prototype = Object.create(THREE.EventDispatcher.prototype),
    b.MouseHandler.prototype.onDragStart = function(a) {
        a.preventDefault();
        var b = a.paths[0].startPointer;
        this.lastPointerX = b.x,
        this.lastPointerY = b.y,
        this.onDragMove(a)
    }
    ,
    b.MouseHandler.prototype.onDragMove = function(a) {
        this.isDragging = !0;
        var b = a.paths[0].movePointer
          , c = b.x
          , d = b.y
          , e = c - this.lastPointerX
          , f = d - this.lastPointerY;
        this.lastPointerX = c,
        this.lastPointerY = d,
        this.dispatchEvent({
            type: "move",
            deltaX: e,
            deltaY: f,
            mouseX: c,
            mouseY: d
        })
    }
    ,
    b.MouseHandler.prototype.onDragEnd = function(a) {
        this.isDragging = !1
    }
    ,
    b.MouseHandler.prototype.onTap = function(a) {
        a.preventDefault(),
        this.dispatchEvent({
            type: "tap",
            x: a.x,
            y: a.y,
            wasDragging: this.isDragging
        })
    }
    ,
    b.MouseHandler.prototype.onMouseWheel = function(a) {
        var b = a.deltaY > 0 ? 1.2 : .8;
        this.dispatchEvent({
            type: "zoom",
            zoom: b
        })
    }
    ,
    b.MouseHandler.prototype.onPinch = function(a) {
        var c = b.clamp(a.scale, .5, 4);
        1 !== c && this.dispatchEvent({
            type: "zoom",
            zoom: c
        })
    }
    ,
    b.MouseHandler.prototype.onKeyDown = function(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !0;
            break;
        case 37:
        case 65:
            this.moveLeft = !0;
            break;
        case 40:
        case 83:
            this.moveBackward = !0;
            break;
        case 39:
        case 68:
            this.moveRight = !0;
            break;
        case 82:
            this.moveUp = !0;
            break;
        case 70:
            this.moveDown = !0;
            break;
        case 81:
            this.freeze = !this.freeze
        }
    }
    ,
    b.MouseHandler.prototype.onKeyUp = function(a) {
        switch (a.keyCode) {
        case 38:
        case 87:
            this.moveForward = !1;
            break;
        case 37:
        case 65:
            this.moveLeft = !1;
            break;
        case 40:
        case 83:
            this.moveBackward = !1;
            break;
        case 39:
        case 68:
            this.moveRight = !1;
            break;
        case 82:
            this.moveUp = !1;
            break;
        case 70:
            this.moveDown = !1
        }
    }
    ,
    b.RotationCamera = function(a, c, d, e, f) {
        this.target = a.clone(),
        this.camera = d,
        this.canUpdate = !1,
        this.rotXContainer = new THREE.Object3D,
        this.rotYContainer = new THREE.Object3D,
        this.worldContainer = new THREE.Object3D,
        this.rotYContainer.add(this.camera),
        this.rotXContainer.add(this.rotYContainer),
        this.worldContainer.add(this.rotXContainer),
        this.worldContainer.position.copy(a),
        this.rotXContainer.rotateOnAxis(b.axisY, 180 * b.toRADIANS),
        this.camera.rotateOnAxis(b.axisY, 180 * b.toRADIANS),
        this.camera.position.copy(b.Vector3Zero),
        c.add(this.worldContainer),
        void 0 !== e && this.rotYContainer.rotateOnAxis(b.axisX, e * b.toRADIANS),
        void 0 !== f && this.rotXContainer.rotateOnAxis(b.axisY, f * b.toRADIANS),
        this.distance = 10,
        this.maxDistance = 10,
        this.minDistance = .9,
        this.xSpeed = .125,
        this.ySpeed = .1,
        this.yMinLimit = -90 * b.toRADIANS,
        this.yMaxLimit = 90 * b.toRADIANS,
        this.x = 0,
        this.y = 0,
        this.posDelta = new THREE.Vector2(0,0),
        this.zoomDelta = 0,
        this.xSmooth = 0,
        this.ySmooth = 0,
        this.zSmooth = 0
    }
    ,
    b.RotationCamera.prototype = {
        constructor: b.RotationCamera,
        localToWorld: function(a, b) {
            return a.clone().applyMatrix4(b.matrixWorld)
        },
        updateCameraDistance: function(a) {
            this.distance = a
        },
        update: function(a) {
            this.target && this.canUpdate ? (this.x = -this.posDelta.x * this.xSpeed,
            this.y = this.posDelta.y * this.ySpeed,
            a ? (this.xSmooth = this.x,
            this.ySmooth = this.y) : (this.xSmooth = b.lerp(this.xSmooth, this.x, .05),
            this.ySmooth = b.lerp(this.ySmooth, this.y, .05)),
            this.rotXContainer.rotateOnAxis(b.axisY, .02 * this.xSmooth),
            this.rotYContainer.rotateOnAxis(b.axisX, .02 * this.ySmooth),
            this.rotYContainer.rotation.x = b.clamp(this.rotYContainer.rotation.x, this.yMinLimit, this.yMaxLimit),
            this.distance -= this.zoomDelta,
            this.distance = b.clamp(this.distance, this.minDistance, this.maxDistance),
            this.camera.position.z = -this.distance,
            this.posDelta.x = b.lerp(this.posDelta.x, 0, .15),
            this.posDelta.x = this.posDelta.x < .01 && this.posDelta.x > -.01 ? 0 : this.posDelta.x,
            this.posDelta.y = b.lerp(this.posDelta.y, 0, .15),
            this.posDelta.y = this.posDelta.y < .01 && this.posDelta.y > -.01 ? 0 : this.posDelta.y,
            this.zoomDelta = b.lerp(this.zoomDelta, 0, .05),
            this.zoomDelta = this.zoomDelta < .01 && this.zoomDelta > -.01 ? 0 : this.zoomDelta) : this.camera.position.z = -this.distance
        }
    },
    /* Xiaosong
    c.AdvancedPanel = {
        init: function() {
            this.groups = {},
            this.updateables = {},
            this.controls = {},
            this.$container = $("#controls-advanced"),
            this.$panel = $("#controls-advanced-panel"),
            this.$scroller = $("#controls-advanced-panelscroller"),
            this.$scrollthumb = $("#controls-advanced-scrollthumb"),
            this.$scroller.scroll($.proxy(function() {
                this.updateScrollIndicator()
            }, this)),
            this.updateScrollIndicator()
        },
        addUpdatable: function(a, b) {
            a && (this.updateables[a] = b)
        },
        addControl: function(a) {
            a.updateId && (this.controls[a.updateId] = a)
        },
        updateValue: function(a, b) {
            var c = this.updateables[a];
            c && c.setValue && c.setValue(b)
        },
        updateColor: function(a, b) {
            this.updateValue(a, tinycolor(b).toHexString())
        },
        updateNumber: function(a, b) {
            this.updateValue(a, b)
        },
        updateBool: function(a, b) {
            this.updateValue(a, b)
        },
        updateGroup: function(a) {
            for (var b in this.controls) {
                var c = this.controls[b];
                c.group === a && this.updateables[c.updateId].setValue(c.valueSource[c.valueName])
            }
        },
        addGroup: function(a) {
            var b = $('<div class="advanced-group"></div>').appendTo(this.$panel);
            return b.expander({
                label: a,
                expandedChanged: $.proxy(function() {
                    setTimeout($.proxy(function() {
                        this.updateScrollIndicator()
                    }, this), 500)
                }, this)
            }),
            this.groups[a] = b,
            b
        },
        getOrAddGroup: function(a) {
            return this.groups[a] ? this.groups[a] : this.addGroup(a)
        },
        addControlRow: function(a, b) {
            var c = b ? '<div class="advanced-row"><h4 class="advanced-label">' + b + "</h4></div>" : '<div class="advanced-row advanced-no-label"></div>'
              , d = this.getOrAddGroup(a)
              , e = $(c).appendTo(this.$panel);
            return d.append(e),
            e
        },
        boolDefaultArgs: {
            group: "Default",
            label: "Property",
            valueSource: {},
            valueName: null ,
            startValue: null ,
            updateId: null ,
            valueChanged: null 
        },
        addBool: function(a) {
            var b = $.extend({}, this.boolDefaultArgs, a)
              , c = this.addControlRow(b.group, b.label)
              , d = $('<div class="advanced-bool"></div>').appendTo(c);
            b.updateId || (b.updateId = b.group + "_" + b.label + "_" + b.valueName),
            d.toggleSlider({
                label: null ,
                values: [!1, !0],
                startValue: b.startValue ? b.startValue : b.valueSource[b.valueName],
                valueChanged: function(a) {
                    b.valueSource && b.valueSource[b.valueName] !== a && (b.valueSource[b.valueName] = a),
                    b.valueChanged && b.valueChanged.call(b.valueSource, a)
                }
            }),
            this.addUpdatable(b.updateId, d.getToggleSlider()),
            this.addControl(b)
        },
        numberDefaultArgs: {
            group: "Default",
            label: "Property",
            valueSource: {},
            valueName: null ,
            startValue: null ,
            updateId: null ,
            valueChanged: null ,
            min: 0,
            max: 100,
            step: 1,
            decimals: 0
        },
        addNumber: function(a) {
            var b = $.extend({}, this.numberDefaultArgs, a)
              , c = this.addControlRow(b.group, b.label)
              , d = $('<div class="advanced-slider"></div>').appendTo(c);
            d.valueSlider({
                label: null ,
                width: 65,
                min: b.min,
                max: b.max,
                step: b.step,
                showValueWidth: 35,
                showValueDecimals: b.decimals,
                startValue: b.startValue ? b.startValue : b.valueSource[b.valueName],
                valueChanged: function(a) {
                    b.valueSource && b.valueSource[b.valueName] !== a && (b.valueSource[b.valueName] = a),
                    b.valueChanged && b.valueChanged.call(b.valueSource, a)
                }
            }),
            null  == b.updateId && (b.updateId = b.group + "_" + b.label + "_" + b.valueName),
            this.addUpdatable(b.updateId, d.getValueSlider()),
            this.addControl(b)
        },
        colorDefaultArgs: {
            group: "Default",
            label: "Property",
            valueSource: {},
            valueName: null ,
            startValue: null ,
            updateId: null ,
            valueChanged: null ,
            colorFormat: "HEX",
            colors: ["#D5EAF2", "#EEBAA2", "#EFF5D0", "#84C7FF", "#B9E0D0"]
        },
        addColor: function(a) {
            var b = $.extend({}, this.colorDefaultArgs, a)
              , c = this.addControlRow(b.group, b.label)
              , d = $('<div class="advanced-color"></div>').appendTo(c);
            $.each(b.colors, function(a, b) {
                var c = tinycolor(b);
                d.append('<div class="toggle-option advanced-color-option" data-toggle-value="' + c.toHexString() + '" style="background-color: ' + c.toHexString() + ';"></div>')
            }),
            d.toggleChooser({
                label: "",
                startValue: b.startValue ? tinycolor(b.startValue).toHexString() : tinycolor(b.valueSource[b.valueName]).toHexString(),
                valueChanged: function(a) {
                    if (b.updateFormat) {
                        var c = tinycolor(a);
                        switch (b.updateFormat) {
                        case "RGB":
                            a = c.toRgb();
                            break;
                        case "HEX":
                            a = c.toHex();
                            break;
                        case "HEXSTRING":
                            a = c.toHexString();
                            break;
                        case "TINYCOLOR":
                            a = c;
                            break;
                        case "THREEHEX":
                            var d = new THREE.Color(c.toHexString());
                            a = d.getHex()
                        }
                    }
                    b.valueSource && b.valueSource[b.valueName] !== a && (b.valueSource[b.valueName] = a),
                    b.valueChanged && b.valueChanged.call(tinycolor(b.valueSource).toHexString(), a)
                }
            }),
            this.addUpdatable(b.updateId, d.getToggleChooser())
        },
        addNote: function(a, b) {
            var c = this.addControlRow(a);
            $('<span class="advanced-note">' + b + "</div>").appendTo(c)
        },
        addSectionName: function(a, b) {
            var c = this.addControlRow(a);
            $('<h4 class="advanced-section-name">' + b + "</h4>").appendTo(c)
        },
        updateScrollIndicator: function() {
            var a = this.$container.height() / this.$panel.height();
            if (1 > a) {
                var b = Math.round(this.$container.height() * a)
                  , c = this.$scroller.scrollTop() / (this.$scroller[0].scrollHeight - this.$container.height())
                  , d = 7 + c * (this.$container.height() - (20 + b));
                this.$scrollthumb.css({
                    height: b,
                    top: d,
                    opacity: 1
                })
            } else
                this.$scrollthumb.css("opacity", 0)
        }
    },
        Xiaosong */
    function() {
        function a(a) {}
        var b = window.ga || $.noop;
        c.analytics = {
            videoPlay: function(c) {
                b("send", "event", "video", "play", c),
                a("analytics - video play: " + c)
            },
            buttonClick: function(c) {
                b("send", "event", "button", "click", c),
                a("analytics - button click: " + c)
            },
            atlasAction: function(a, b) {
                b ? setTimeout(function() {
                    d(a)
                }, 1) : d(a)
            }
        };
        var d = function(a) {
            var b = new Image;
            b.src = "http://view.atdmt.com/action/" + a
        }
    }(),
    c.Controls = {
        isOpen: !1,
        init: function() {
            this.$knobInput = $("#controls-knob"),
            this.$fishText = $("#controls-stats-fish"),
            this.$fishHint = $("#controls-knob-hint"),
            this.panelPaging(),
            this.$knobInput.knob({
                min: 0,
                max: 360,
                step: 1,
                thickness: .125,
                width: 140,
                height: 140,
                displayInput: !1,
                lineCap: "round",
                bgColor: "rgba(60,96,113,0.3)",
                fgColor: "#1B9E60",
                change: $.proxy(this.fishKnobChange, this),
                release: $.proxy(this.fishKnobRelease, this),
                draw: $.proxy(this.updateKnob, this)
            }),
            this.fishCount = c.INITIAL_FISH,
            this.setFishCount(this.fishCount),
            $("#controls-complexity").toggleSlider({
                label: "Complexity",
                width: 80,
                values: [c.ComplexityLevel.LOW, c.ComplexityLevel.MEDIUM, c.ComplexityLevel.HIGH],
                labels: ["Low", "Medium", "High"],
                appendLabel: !0,
                startValue: 1,
                valueChanged: function(a) {
                    c.world.setComplexity(a)
                }
            }),
            $("#controls-lights").toggleSlider({
                label: "Lights",
                startValue: 1,
                valueChanged: $.proxy(function(a) {
                    c.Main.LightIsOn = a
                }, this)
            }),
            $("#controls-bubbles").toggleSlider({
                label: "Sounds",
                startValue: c.settings.getSoundEnabled() ? 1 : 0,
                valueChanged: $.proxy(function(a) {
                    a ? c.sounds.unmute() : c.sounds.mute()
                }, this)
            }),
            $("#controls-view").toggleChooser({
                label: "View",
                startValue: "outsidein",
                valueChanged: $.proxy(function(a) {
                    if (c.Main.controller.canUpdate) {
                        var b = "insideout" === a;
                        c.world.toggleView(b)
                    }
                }, this)
            }),
            $("#controls-cleaning").valueSlider({
                label: "Last Cleaning",
                width: 100,
                min: 0,
                max: .5,
                step: .01,
                startValue: 0,
                appendLabel: !1,
                showValue: !1,
                valueChanged: $.proxy(function(a) {
                    c.Main.fishScene.CleanLevel = a
                }, this)
            }),
            $("#controls-close, #controls-menu").click(this.toggleOpenClose),
            ($(window).height() < 640 || $(window).width() < 640) && this.toggleOpenClose()
        },
        toggleOpenClose: function() {
            $("#controls-menu").toggleClass("open"),
            c.Controls.isOpen = $("#controls").toggleClass("open").hasClass("open"),
            c.Controls.isOpen && c.perfStats.render()
        },
        setFishCount: function(a) {
            var b = this.fishKnobCountToValue(a);
            this.$knobInput.val(b).trigger("change"),
            this.updateKnob(),
            this.fishKnobRelease()
        },
        fishKnobValueToCount: function(a) {
            function b(a, b, c, d, e, f) {
                var g = d + (e - d) * (a - b) / (c - b);
                return g = Math.round(g / f) * f
            }
            var c = a / 360
              , d = 0;
            return d = .25 > c ? Math.round(100 * c) : .5 > c ? b(c, .25, .5, 25, 100, 5) : .75 > c ? b(c, .5, .75, 100, 200, 10) : b(c, .75, 1, 200, 400, 25)
        },
        fishKnobCountToValue: function(a) {
            function b(a, b, c, d, e) {
                return b + (a - d) / (e - d) * (c - b)
            }
            var c = 0;
            return c = a > 200 ? b(a, .75, 1, 200, 400) : a > 100 ? b(a, .5, .75, 100, 200) : a > 50 ? b(a, .25, .5, 25, 100) : b(a, 0, .25, 0, 25),
            360 * c
        },
        updateKnob: function() {
            var a = parseInt(this.$knobInput.val(), 10)
              , b = a - 90
              , c = 66.5
              , d = c + c * Math.cos(b * Math.PI / 180) + 4
              , e = c + c * Math.sin(b * Math.PI / 180) + 4;
            $("#controls-knob-grabber").css({
                left: d + "px",
                top: e + "px"
            }),
            this.fishCount = this.fishKnobValueToCount(a),
            this.$fishHint.text(this.fishCount + " fish"),
            "none" === this.$fishHint.css("display") && this.$fishHint.stop().fadeIn(200),
            clearTimeout(this.fishHintTimeout),
            this.fishHintTimeout = setTimeout($.proxy(function() {
                this.$fishHint.stop().fadeOut()
            }, this), 1e3)
        },
        fishKnobChange: function(a) {},
        fishKnobRelease: function(a) {
            this.$fishText.text(this.fishCount + " fish"),
            c.fishManager.TotalFish = this.fishCount
        },
        panelPaging: function() {
            var a = $("#controls-pagedots");
            $(".controls-page").each(function(b, c) {
                a.append('<div class="controls-pagedot"></div>'),
                $(c).css("left", b * a.width())
            }),
            $(".controls-pagedot").click(function(b) {
                $(".controls-pagedot").removeClass("on"),
                $("#controls-pages").css("left", $(this).index() * a.width() * -1),
                $(this).addClass("on")
            }),
            $(".controls-pagedot").first().addClass("on")
        }
    },
    function() {
        var a = {
            label: "Group",
            expandedChanged: null 
        };
        $.fn.expander = function(a) {
            return this.each(function() {
                var b = new c.Controls.expander;
                b.options = a,
                b.$ = $(this),
                b.$.data("__expander", b),
                b.start()
            }).parent()
        }
        ,
        $.fn.getToggleChooser = function() {
            return $(this).data("__expander")
        }
        ,
        c.Controls.expander = function() {}
        ,
        c.Controls.expander.prototype.start = function() {
            this.options = $.extend({}, a, this.options),
            this.options,
            this.$.addClass("expander-content"),
            this.$.wrap('<div class="expander"></div>'),
            this.$ = this.$.parent(),
            this.$.prepend('<h3 class="expander-header">' + this.options.label + "</h3>"),
            this.$header = this.$.find(".expander-header"),
            this.$content = this.$.find(".expander-content"),
            this.$header.click($.proxy(function(a) {
                var b = !this.isExpanded();
                this.$.parent().find(".expander").addClass("closed"),
                this.$.toggleClass("closed", !b),
                this.options.expandedChanged && this.options.expandedChanged(this.isExpanded())
            }, this)),
            this.$.addClass("hidden"),
            setTimeout($.proxy(function() {
                this.$content.css("max-height", this.$content.outerHeight()),
                this.$.addClass("closed"),
                this.$.removeClass("hidden")
            }, this), 20)
        }
        ,
        c.Controls.expander.prototype.isExpanded = function() {
            return !this.$.hasClass("closed")
        }
    }(),
    /*Xiaosong
    c.LoadingUI = function(a) {
        this.bubbles(),
        this.waveMaker = new window.waveMaker("loading-waves",252,24),
        this.waveMaker.start(),
        this.isLoadingUIVisible = !1,
        a.addEventListener(c.AssetManager.PROGRESS, $.proxy(this.onLoadProgress, this)),
        a.addEventListener(c.AssetManager.LOAD_COMPLETE, $.proxy(this.onLoadComplete, this))
    }
    ,
    c.LoadingUI.prototype.onLoadProgress = function(a) {
        this.isLoadingUIVisible || ($("#loading-center").delay(500).fadeIn(500),
        this.isLoadingUIVisible = !0);
        var b = 140
          , c = 30 + Math.round(a.percentLoaded / 100 * b);
        $("#loading-water").css("height", c + 2),
        $("#loading-waves").css("bottom", c),
        $("#loading-percent").text(Math.min(100, Math.round(a.percentLoaded)) + "%")
    }
    ,
    c.LoadingUI.prototype.onLoadComplete = function(a) {
        $("#loading").delay(1e3).fadeOut(1e3, $.proxy(function() {
            clearInterval(this.bubbleInterval),
            $(".loading-bubble").remove(),
            this.waveMaker.stop(),
            window.ieFlyout.init()
        }, this))
    }
    ,
    c.LoadingUI.prototype.bubbles = function() {
        this.bubbleCount = 0,
        this.bubbleInterval = setInterval($.proxy(function() {
            Math.random() > .7 && (this.addBubble(),
            this.bubbleCount++),
            this.bubbleCount > 50 && ($(".loading-bubble").each(function() {
                parseInt($(this).css("bottom"), 10) > 250 && $(this).remove()
            }),
            this.bubbleCount = $(".loading-bubble").length)
        }, this), 60)
    }
    ,
    c.LoadingUI.prototype.addBubble = function() {
        var a = Math.round(80 + 100 * Math.random())
          , b = 0
          , c = 3 + 6 * Math.random()
          , d = $('<div class="loading-bubble"></div>').appendTo("#loading-bubbles");
        d.css({
            left: a,
            bottom: b,
            width: c,
            height: c
        }),
        setTimeout(function() {
            d.css({
                bottom: 250 + 500 * Math.random(),
                left: a + (-50 + 100 * Math.random())
            })
        }, 50)
    }
    ,
    c.perfStats = {
        periodStart: 0,
        periodFrames: 0,
        fpsMaxHistory: 38,
        fpsHistory: new Array(36),
        fpsCtx: null ,
        fpsLineColor: "#1D86B9",
        fpsLineWidth: 2,
        fpsLineMargin: 1,
        fpsGraphWidth: 120,
        fpsGraphHeight: 40,
        update: function() {
            this.periodFrames++;
            var a = Date.now();
            if (a > this.periodStart + 1e3) {
                var b = Math.round(this.periodFrames / (a - this.periodStart) * 1e3);
                b > 0 && ($("#controls-stats-fps").text(b),
                $("#controls-menu-fps").text(b),
                this.addFpsCount(b)),
                this.periodStart = a,
                this.periodFrames = 0
            }
        },
        addFpsCount: function(a) {
            this.fpsHistory.length >= this.fpsMaxHistory && this.fpsHistory.shift(),
            this.fpsHistory.push(a),
            this.render()
        },
        render: function() {
            if (c.Controls && c.Controls.isOpen) {
                if (!this.fpsCtx) {
                    var a = document.getElementById("controls-stats-canvas");
                    a.width = this.fpsGraphWidth,
                    a.height = this.fpsGraphHeight,
                    this.fpsCtx = a.getContext("2d"),
                    this.fpsCtx.setTransform(1, 0, 0, 1, 0, 0),
                    this.fpsCtx.lineWidth = this.fpsLineWidth,
                    this.fpsCtx.strokeStyle = this.fpsLineColor,
                    this.fpsCtx.beginPath(),
                    this.fpsCtx.arc(60, -18, 55, 0, 2 * Math.PI, !0),
                    this.fpsCtx.clip()
                }
                this.fpsCtx.clearRect(0, 0, this.fpsGraphWidth, this.fpsGraphHeight),
                this.fpsCtx.beginPath();
                var b, d, e, f;
                for (b = 0,
                d = this.fpsHistory.length; d > b; b++)
                    e = b * (this.fpsLineWidth + this.fpsLineMargin),
                    f = Math.round(this.fpsGraphHeight * (1 - (this.fpsHistory[b] || 0) / 60)),
                    this.fpsCtx.moveTo(e, this.fpsGraphHeight),
                    this.fpsCtx.lineTo(e, f);
                this.fpsCtx.stroke(),
                this.fpsCtx.beginPath(),
                this.fpsCtx.arc(60, -18, 56, 0, 2 * Math.PI, !0),
                this.fpsCtx.clip()
            }
        }
    },
Xiaosong*/
    function() {
        var a = !1;
        try {
            a = !!window.localStorage
        } catch (b) {}
        c.settings = {
            get: function(b) {
                return a ? localStorage.getItem(b) : null 
            },
            set: function(b, c) {
                a && (null  == c ? localStorage.removeItem(b) : localStorage.setItem(b, c.toString()))
            },
            remove: function(b) {
                a && localStorage.removeItem(b)
            },
            getBoolOrDefault: function(a, b) {
                var c = this.get(a);
                return null  == c ? b : "true" === c
            },
            getIntOrDefault: function(a, b) {
                var c = this.get(a);
                return null  == c ? b : parseInt(c, 10)
            },
            getSoundEnabled: function() {
                return this.getBoolOrDefault("soundEnabled", !0)
            },
            setSoundEnabled: function(a) {
                return this.set("soundEnabled", a === !0)
            }
        }
    }(),
    function() {
        c.social = {
            shareUrl: "http://www.fishgl.com/",
            tweet: function(a) {
                a = a || "FishGL: A graphics performance experience with 3D fish at your fingertips. How many fish can your device run?";
                var b = 550
                  , c = 300
                  , d = screen.width / 2 - b / 2
                  , e = screen.height / 3 - c / 2;
                window.open("http://twitter.com/share?url=" + encodeURIComponent(this.shareUrl) + "&text=" + encodeURIComponent(a) + "&count=none/", "tweet", "height=" + c + ",width=" + b + ",left=" + d + ",top=" + e + ",resizable=1")
            },
            share: function(a) {
                a = a || "A graphics performance experience with 3D fish at your fingertips. How many fish can your device run?";
                var b = 550
                  , c = 300
                  , d = screen.width / 2 - b / 2
                  , e = screen.height / 3 - c / 2
                  , f = "http://www.facebook.com/sharer.php?s=100&p[title]=" + encodeURIComponent("FishGL!") + "&p[summary]=" + encodeURIComponent(a) + "&p[url]=" + encodeURIComponent(this.shareUrl);
                window.open(f, "facebook", "height=" + c + ",width=" + b + ",left=" + d + ",top=" + e + ",resizable=1")
            }
        },
        $(document).ready(function() {
            $("#controls-twitter").on("click", function() {
                c.social.tweet(),
                c.analytics.buttonClick("twitter")
            }),
            $("#controls-facebook").on("click", function() {
                c.social.share(),
                c.analytics.buttonClick("facebook")
            })
        })
    }(),
    function() {
        var a = {
            label: "",
            startValue: 0,
            appendLabel: !0,
            optionSelector: ".toggle-option",
            valueChanged: null 
        };
        $.fn.toggleChooser = function(a) {
            return this.each(function() {
                var b = new c.Controls.toggleChooser;
                b.options = a,
                b.$ = $(this),
                b.$.data("__toggleChooser", b),
                b.start()
            }).parent()
        }
        ,
        $.fn.getToggleChooser = function() {
            return $(this).data("__toggleChooser")
        }
        ,
        c.Controls.toggleChooser = function() {}
        ,
        c.Controls.toggleChooser.prototype.start = function() {
            this.$.toggleClass("toggle-chooser"),
            this.options = $.extend({}, a, this.options),
            this.options,
            this.options.label && this.$.prepend('<h3 class="toggle-label">' + this.options.label + "</h3>"),
            this.$options = this.$.find(this.options.optionSelector),
            this.$label = this.$.find(".toggle-label"),
            this.$options.click($.proxy(function(a) {
                var b = $(a.currentTarget).data("toggle-value");
                this.setValue(b),
                c.sounds.playToggle()
            }, this)),
            this.options.startValue && this.setValue(this.options.startValue)
        }
        ,
        c.Controls.toggleChooser.prototype.setValue = function(a) {
            var b = this.$.find("[data-toggle-value='" + a + "']").first();
            if (b && (this.$options.removeClass("on"),
            b.addClass("on"),
            this.currentValue && this.currentValue !== a || !this.currentValue)) {
                var c = b.data("toggle-label");
                c && this.options.appendLabel && this.$label.text(this.options.label + ": " + c),
                this.options.valueChanged && this.options.valueChanged(a),
                this.currentValue = a
            }
        }
    }(),
    function() {
        var a = {
            label: "default",
            width: 46,
            values: [0, 1],
            labels: ["Off", "On"],
            startValue: 0,
            appendLabel: !1,
            valueChanged: null 
        };
        $.fn.toggleSlider = function(a) {
            return this.each(function() {
                var b = new c.Controls.toggleSlider;
                b.options = a,
                b.$ = $(this),
                b.$.data("__toggleSlider", b),
                b.start()
            }).parent()
        }
        ,
        $.fn.getToggleSlider = function() {
            return $(this).data("__toggleSlider")
        }
        ,
        c.Controls.toggleSlider = function() {}
        ,
        c.Controls.toggleSlider.prototype.start = function() {
            this.$.toggleClass("toggle-slider"),
            this.options = $.extend({}, a, this.options);
            var b = this.options;
            this.isToggle = 2 === this.options.values.length,
            this.$.toggleClass("toggle-haslabels", this.isToggle);
            var d = "" + (this.options.label ? '<h3 class="toggle-label">' + b.label + "</h3>" : "") + '<div class="toggle-container"><div class="toggle-bg"></div><div class="toggle-fg"></div>' + (this.isToggle ? '<div class="toggle-label-off">' + this.getLabel(0) + "</div>" : "") + (this.isToggle ? '<div class="toggle-label-on">' + this.getLabel(1) + "</div>" : "") + '<div class="toggler-grabber-outer"><div class="toggle-grabber"></div></div></div>';
            this.$.html(d),
            this.$container = this.$.find(".toggle-container"),
            this.$grabber = this.$.find(".toggle-grabber"),
            this.$label = this.$.find(".toggle-label"),
            this.$fg = this.$.find(".toggle-fg"),
            this.$container.css({
                width: b.width + "px"
            }),
            this.setValue(this.options.startValue),
            this.$container.click($.proxy(function() {
                if (void 0 !== this.valueIndex) {
                    var a = (this.valueIndex + 1) % this.options.values.length
                      , b = this.options.values[a];
                    this.setValue(b),
                    c.sounds.playToggle()
                }
            }, this))
        }
        ,
        c.Controls.toggleSlider.prototype.getLabel = function(a) {
            var b = this.options.labels && a < this.options.labels.length ? this.options.labels[a] : "";
            return b
        }
        ,
        c.Controls.toggleSlider.prototype.setValue = function(a) {
            var b = this.options.values.indexOf(a);
            if (0 > b) {
                if (!(this.options.values.length > 0))
                    return;
                b = 0
            }
            this.valueIndex = b;
            var c = this.getLabel(b)
              , d = b / (this.options.values.length - 1);
            this.$fg.css("width", 100 * d + "%"),
            this.$grabber.css("left", 100 * d + "%"),
            this.$.toggleClass("toggle-on", this.isToggle && d >= .5),
            this.$.toggleClass("toggle-off", this.isToggle && .5 > d),
            this.options.appendLabel && this.$label.text(this.options.label + ": " + c),
            this.options.valueChanged && this.options.valueChanged(a)
        }
    }(),
    function() {
        var a = {
            label: "default",
            width: 80,
            min: 0,
            max: 100,
            step: 1,
            startValue: 0,
            showValue: !0,
            showValueDecimals: 0,
            showValueWidth: 30,
            valueChanged: null 
        };
        $.fn.valueSlider = function(a) {
            return this.each(function() {
                var b = new c.Controls.valueSlider;
                b.options = a,
                b.$ = $(this),
                b.$.data("__valueSlider", b),
                b.start()
            }).parent()
        }
        ,
        $.fn.getValueSlider = function() {
            return $(this).data("__valueSlider")
        }
        ,
        c.Controls.valueSlider = function() {}
        ,
        c.Controls.valueSlider.prototype.start = function() {
            this.$.addClass("value-slider"),
            this.$.toggleClass("show-value", this.options.showValue),
            this.options = $.extend({}, a, this.options);
            var b = this.options
              , c = "" + (this.options.label ? '<h3 class="value-slider-label">' + b.label + "</h3>" : "") + '<div class="value-slider-outer"><div class="value-slider-container"><div class="value-slider-bg"></div><div class="value-slider-fg"></div><div class="value-slider-grabber-outer"><div class="value-slider-grabber"></div></div></div>' + (this.options.showValue ? '<h4 class="value-slider-value-label">' + b.startValue + "</h4>" : "") + "</div>";
            this.$.html(c),
            this.$container = this.$.find(".value-slider-container"),
            this.$outer = this.$.find(".value-slider-outer"),
            this.$grabber = this.$.find(".value-slider-grabber"),
            this.$label = this.$.find(".value-slider-label"),
            this.$valueLabel = this.$.find(".value-slider-value-label"),
            this.$fg = this.$.find(".value-slider-fg"),
            this.$container.css({
                width: b.width + "px"
            }),
            this.options.showValue && (this.$outer.css("width", this.options.width + this.options.showValueWidth),
            this.$valueLabel.css("width", this.options.showValueWidth)),
            this.setValue(this.options.startValue),
            this.$container.on("pxpointerstart", $.proxy(this.pointerStart, this))
        }
        ,
        c.Controls.valueSlider.prototype.pointerStart = function(a) {
            var b = $(a.currentTarget)
              , d = b.offset()
              , e = a.pointer.x - d.left
              , f = this.options.min + e / this.options.width * (this.options.max - this.options.min)
              , g = f;
            this.setValue(f, !0);
            var h = {
                pxpointermove: $.proxy(function(a) {
                    var b = a.pointer.x - d.left
                      , c = this.options.min + b / this.options.width * (this.options.max - this.options.min);
                    g = this.validateValue(c),
                    this.setValue(g, !0),
                    a.stopPropagation()
                }, this),
                pxpointerend: $.proxy(function() {
                    $(document).off(h),
                    c.sounds.playToggle(),
                    this.setValue(g)
                }, this)
            };
            $(document).on(h)
        }
        ,
        c.Controls.valueSlider.prototype.getLabel = function(a) {
            var b = this.options.labels && a < this.options.labels.length ? this.options.labels[a] : "";
            return b
        }
        ,
        c.Controls.valueSlider.prototype.validateValue = function(a) {
            return a = Math.min(this.options.max, Math.max(this.options.min, a)),
            a = Math.round(a / this.options.step) * this.options.step
        }
        ,
        c.Controls.valueSlider.prototype.setValue = function(a, b) {
            if (a = this.validateValue(a),
            this.value !== a) {
                this.value = a,
                b ? this.$.addClass("suspend-animation") : this.$.removeClass("suspend-animation");
                var c = (this.value - this.options.min) / (this.options.max - this.options.min);
                if (this.$fg.css("width", 100 * c + "%"),
                this.$grabber.css("left", 100 * c + "%"),
                this.options.showValue) {
                    var d = Math.pow(10, this.options.showValueDecimals)
                      , e = parseFloat(Math.round(this.value * d) / d).toFixed(this.options.showValueDecimals);
                    this.$valueLabel.text(e)
                }
                this.options.valueChanged && this.options.valueChanged(this.value)
            }
        }
    }(),
    THREE.ShaderLib.TankGlass = {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,1,1)
            },
            map2: {
                type: "t",
                value: null 
            },
            map2Opacity: {
                type: "f",
                value: 1
            }
        }]),
        vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform sampler2D map2;", "uniform float map2Opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, "vec4 m2 = texture2D(map2, vUv);", "gl_FragColor = mix(gl_FragColor, m2, map2Opacity * m2.a);", "gl_FragColor.a = max(opacity, map2Opacity * m2.a);", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, "}"].join("\n")
    },
    THREE.ShaderLib.TankGlassRT = {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,1,1)
            },
            map2: {
                type: "t",
                value: null 
            },
            map2Opacity: {
                type: "f",
                value: 1
            }
        }]),
        vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform sampler2D map2;", "uniform float map2Opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, "vec4 m2 = texture2D(map2, vUv);", "gl_FragColor = mix(gl_FragColor, m2, map2Opacity * m2.a);", "gl_FragColor.a = max(opacity, map2Opacity * m2.a);", THREE.ShaderChunk.linear_to_gamma_fragment, "}"].join("\n")
    },
    THREE.ShaderLib.BubbleRT = {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,1,1)
            }
        }]),
        vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, "}"].join("\n")
    },
    THREE.TintShader = {
        uniforms: {
            tDiffuse: {
                type: "t",
                value: null 
            },
            bumpMap: {
                type: "t",
                value: null 
            },
            bumpAmt: {
                type: "f",
                value: 10
            },
            colorStart: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            colorEnd: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            amt: {
                type: "f",
                value: 0
            },
            doDistortion: {
                type: "i",
                value: 1
            },
            time: {
                type: "f",
                value: 0
            },
            noiseScale: {
                type: "f",
                value: .01
            },
            baseSpeed: {
                type: "f",
                value: .04
            }
        },
        vertexShader: d.tintVertex,
        fragmentShader: d.tintFragment
    },
    function(a) {
        c.FishbowlWorld = function() {
            this.container = null ,
            this.scene = null ,
            this.camera = null ,
            this.sphere = null ,
            this.renderer = null ,
            this.controller = null ,
            this.handles = null ,
            this.mouseHandler = null ,
            this.skyBox = null ,
            this.sun = null ,
            this.hemi = null ,
            this.ambient = null ,
            this.pointLight = null ,
            this.fishLight = null ,
            this.fishScene = null ,
            this.fishManager = null ,
            this.assetManager = null ,
            this.origin = new THREE.Vector3(0,101,0),
            this.marker = null ,
            this.bubbles_0 = null ,
            this.particles = null ,
            this.sunLight = null ,
            this.isPaused = !1,
            this.minTranslation = new THREE.Vector3,
            this.maxTranslation = new THREE.Vector3,
            this.waterMaterial = null ,
            this.isSceneLoaded = !1,
            this.origin3D = null ,
            this.soundManager = null ,
            this.matrixWorld = new THREE.Matrix4,
            this.groups = {
                TEST: "Test",
                GLASS: "Glass",
                LIGHTS: "Lights",
                GRAVEL: "Gravel",
                FLARES: "Flares",
                WATER: "Water",
                AQUARIUMFILTER: "Aquarium Filter",
                BUBBLES: "Bubbles",
                INTANK: "In Tank View"
            }
        }
        ,
        c.FishbowlWorld.prototype = {
            constructor: c.FishbowlWorld,
            get Scene() {
                return this.scene
            },
            set Scene(a) {
                this.scene = a
            },
            Init: function() {
                c.Main = this,
                this.assetManager = new c.AssetManager,
                c.assetManager.addToAssetList(new c.ImageAsset("clouds","images/noise.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("water","images/water_on.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("waterOff","images/water_off.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("ocean","images/ocean.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("algae","images/algae.jpg",c.AssetTypes.IMAGE)),
                c.assetManager.addToAssetList(new c.ImageAsset("Ripple","images/Ripple.png",c.AssetTypes.IMAGE)),
                b.JackIntoThree(),
                this.container = document.getElementById("renderDiv"),
                this.infoContainer = document.getElementById("renderInfo"),
                this.scene = new THREE.Scene,
                this.camera = new THREE.PerspectiveCamera(60,a.innerWidth / a.innerHeight,c.arm === !0 ? .25 : .01,1e4),
                this.camera.position.z = 20,
                c.camera = this.camera,
                this.soundManager = new c.SoundManager(this.camera),
                this.origin3D = new THREE.Object3D,
                this.origin3D.position.copy(this.origin),
                this.hemi = new THREE.HemisphereLight(16777215,4473924,.45),
                this.scene.add(this.hemi),
                this.sun = new THREE.DirectionalLight(16777215,.2),
                this.sun.position.copy(this.origin),
                this.sun.translateOnAxis(b.axisY, 1),
                this.sun.translateOnAxis(b.axisZ, -500),
                this.scene.add(this.sun),
                this.fishScene = new c.FishScene(this.scene,$.proxy(this.handleFishSceneLoaded, this)),
                this.fishScene.createAssetList(),
                this.fishManager = new c.FishManager(this.scene),
                this.fishManager.createAssetList(),
                this.fishLight = new THREE.DirectionalLight(16777215,.635),
                this.fishLight.onlyShadow = !1,
                this.fishLight.position.copy(this.origin),
                this.fishLight.translateOnAxis(b.axisY, 7),
                this.fishLight.translateOnAxis(b.axisZ, -200),
                this.scene.add(this.fishLight),
                this.fishLight.castShadow = !0,
                this.fishLight.shadowCameraFar = 220,
                this.fishLight.shadowCameraNear = .3,
                this.fishLight.shadowCameraFov = 75,
                this.fishLight.shadowBias = 1e-4,
                this.fishLight.shadowDarkness = 0,
                this.fishLight.shadowMapWidth = 2048,
                this.fishLight.shadowMapHeight = 2048;
                var d = 100;
                this.fishLight.shadowCameraLeft = -d,
                this.fishLight.shadowCameraRight = d,
                this.fishLight.shadowCameraTop = d + 80,
                this.fishLight.shadowCameraBottom = -d,
                this.pointLight = new THREE.PointLight(17663,.01,75),
                this.pointLight.position.set(0, 126, 5),
                this.scene.add(this.pointLight);
                var e = new THREE.Vector3;
                e.x = -24,
                e.y = 80,
                e.z = -5.73,
                c.arm ? (c.bubbleMinInterval = 100,
                c.bubbleMaxInterval = 250,
                c.bubbleMinScale = .3,
                c.bubbleMaxScale = .75,
                c.bubbleMinRate = .75,
                c.bubbleMaxRate = 1.5,
                c.bubbleComplexity = 7) : (this.bubbles_0 = new c.BubbleEmitter(e,2.7,7,.19),
                this.bubbles_1 = new c.BubbleEmitter(e,1.3,15,.12),
                this.bubbles_2 = new c.BubbleEmitter(e,.8,18),
                this.bubbles_3 = new c.BubbleEmitter(e,2,10,.19)),
                this.minTranslation.x = this.origin.x - .5 * this.fishManager.tWidth,
                this.minTranslation.y = this.origin.y - .5 * this.fishManager.tHeight,
                this.minTranslation.z = this.origin.z - .5 * this.fishManager.tDepth,
                this.maxTranslation.x = this.origin.x + .5 * this.fishManager.tWidth,
                this.maxTranslation.y = this.origin.y + .5 * this.fishManager.tHeight,
                this.maxTranslation.z = this.origin.z + .5 * this.fishManager.tDepth,
                //Xiaosong this.loadingUI = new c.LoadingUI(this.assetManager),
                this.assetManager.addEventListener(c.AssetManager.LOAD_COMPLETE, $.proxy(this.handleAssetManagerLoadComplete, this)),
                this.renderer = new THREE.WebGLRenderer({
                    antialias: !1,
                    alpha: !0
                }),
                this.renderer.setSize(a.innerWidth, a.innerHeight),
                this.renderer.autoClear = !1,
                this.renderer.context.getProgramInfoLog = function() {
                    return ""
                }
                ,
                c.arm || (this.renderer.shadowMapEnabled = !0),
                c.arm || (this.renderer.shadowMapType = THREE.PCFSoftShadowMap),
                this.container.appendChild(this.renderer.domElement);
                var f = {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    format: THREE.RGBAFormat,
                    stencilBufer: !1
                }
                  , g = new THREE.WebGLRenderTarget(a.innerWidth,a.innerHeight,f);
                this.composer = new THREE.EffectComposer(this.renderer,g);
                var h = new THREE.RenderPass(this.scene,this.camera);
                h.clear = !0,
                this.composer.addPass(h),
                this.controller = new b.RotationCamera(this.origin,this.scene,this.camera,1,180),
                this.controller.canUpdate = !1,
                this.controller.updateCameraDistance(250),
                this.controller.minDistance = 50,
                this.controller.maxDistance = 120,
                this.controller.yMinLimit = -15 * b.toRADIANS,
                this.controller.yMaxLimit = 35 * b.toRADIANS,
                this.mouseHandler = new b.MouseHandler(this.renderer.domElement),
                this.mouseHandler.addEventListener("zoom", $.proxy(this.handleZoomEvent, this)),
                this.mouseHandler.addEventListener("move", $.proxy(this.handleMoveEvent, this)),
                this.mouseHandler.addEventListener("tap", $.proxy(this.handleTapEvent, this)),
                $(a).on("resize", $.debounce(500, $.proxy(this.handleWindowResize, this))),
                a.document.addEventListener("keyup", this.bind(this, this.handleKeyUp), !1),
                a.document.addEventListener("keydown", this.bind(this, this.handleKeyDown), !1),
                this.assetManager.loadAssetList()
            },
            handleZoomEvent: function(a) {
                var b = (a.zoom >= 1 ? a.zoom : 1 / a.zoom) - 1;
                b *= 2.25,
                this.controller.zoomDelta = a.zoom >= 1 ? b : -b
            },
            handleMoveEvent: function(a) {
                this.mouseHandler.isDragging && (this.controller.posDelta.x = a.deltaX,
                this.controller.posDelta.y = a.deltaY)
            },
            tankTaps: 0,
            handleTapEvent: function(d) {
                var e = b.getRayFromMouse(d, this)
                  , f = [];
                this.isInTank || (f = e.intersectObjects([this.fishScene.tank, this.fishScene.fishFood]),
                f.length > 0 && (f[0].object === this.fishScene.tank ? (this.tankTaps++,
                20 === this.tankTaps && (c.sounds.play("FishyWakeup", 15),
                this.tankTaps = 0),
                c.sounds.play("WindowTap", 75),
                this.fishManager.scatterFish(f[0].point),
                this.createRipple(f[0]),
                a.setTimeout($.proxy(this.createRipple, this), 250, f[0])) : c.fishManager.feedFish())),
                f = e.intersectObject(this.fishScene.lightSwitch),
                f.length > 0 && (this.LightIsOn = !this.LightIsOn /*,
                Xiaosong c.AdvancedPanel.updateGroup(this.groups.LIGHTS)*/),
                this.isInTank && (f = e.intersectObject(this.fishScene.chestBase),
                f.length > 0 && (c.sounds.play("BubblesNemo", 10),
                this.chestTaps = 0))
            },
            createRipple: function(a) {
                new c.Ripple(a)
            },
            handleAssetManagerLoadComplete: function() {
                this.controller.target = this.origin,
                this.assetManager.removeEventListener(c.AssetManager.LOAD_COMPLETE, $.proxy(this.handleAssetManagerLoadComplete, this)),
                this.fishScene.createScene()
            },
            handleFishSceneLoaded: function() {
                console.info("FISH SCENE LOADED - NOW PREPPING FISH"),
                this.controller.target = this.origin,
                this.fishManager.addEventListener(this.fishManager.FISH_PREP_COMPLETE, $.proxy(this.handleFishPrepComplete, this)),
                a.setTimeout($.proxy(this.fishManager.prepFishAfterLoad, this.fishManager), 500)
            },
            tankWater: null ,
            oceanWater: null ,
            aUniforms: null ,
            effectTime: null ,
            handleFishPrepComplete: function() {
                this.fishManager.removeEventListener(this.fishManager.FISH_PREP_COMPLETE, $.proxy(this.handleFishPrepComplete, this)),
                this.matrixWorld = this.fishScene.gravel.matrixWorld,
                this.worldContainer = this.controller.worldContainer,
                this.effect = new THREE.ShaderPass(THREE.TintShader);
                var d = this.assetManager.getObjectByName("clouds").texture;
                d.wrapS = d.wrapT = THREE.RepeatWrapping,
                this.effect.uniforms.colorStart.value = new THREE.Color(16777215),
                this.effect.uniforms.colorEnd.value = new THREE.Color(16777215),
                this.effect.uniforms.bumpMap.value = d,
                this.effect.uniforms.bumpAmt.value = .005,
                this.effect.uniforms.amt.value = 0,
                this.effect.uniforms.time.value = 0,
                this.effect.uniforms.doDistortion.value = 0,
                this.effect.uniforms.noiseScale.value = .01,
                this.effect.uniforms.baseSpeed.value = .02,
                this.effectTime = this.effect.uniforms.time,
                c.arm && (this.effect.renderToScreen = !0),
                this.composer && this.composer.addPass(this.effect);
                var e = !0;
                !c.arm && this.composer && e && (this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader),
                this.effectFXAA.uniforms.resolution.value.set(1 / a.innerWidth, 1 / a.innerHeight),
                this.effectFXAA.renderToScreen = !0,
                this.composer.addPass(this.effectFXAA)),
                c.arm || (this.bubbles_0.init(),
                this.bubbles_1.init(),
                this.bubbles_2.init(),
                this.bubbles_3.init()),
                this.particles = new c.Particles(700,700,700),
                this.tankWater = new c.WaterPlane(this.assetManager.getObjectByName("clouds").texture,this.assetManager.getObjectByName("waterOff").texture,49.245 * 1.5,36.18,this.scene),
                this.tankWater.mesh.position.copy(this.origin),
                this.tankWater.mesh.rotateOnAxis(b.axisX, 90 * b.toRADIANS),
                this.tankWater.mesh.position.set(0, 125, 0),
                c.arm || (this.oceanWater = new c.WaterPlane(this.assetManager.getObjectByName("clouds").texture,this.assetManager.getObjectByName("ocean").texture,50,25,this.scene),
                this.oceanWater.uniforms.baseSpeed.value = .03,
                this.oceanWater.uniforms.noiseScale.value = .1,
                this.oceanWater.uniforms.offsetX.value = .97,
                this.oceanWater.uniforms.offsetY.value = .97,
                this.oceanWater.mesh.position.y = -11,
                this.oceanWater.mesh.position.z = -500,
                this.oceanWater.mesh.scale.x = 79,
                this.oceanWater.mesh.scale.y = 160,
                this.oceanWater.mesh.rotateOnAxis(b.axisX, -90 * b.toRADIANS));
                //var f = c.AdvancedPanel;
                this.soundManager.init(),
                /*
                f.addSectionName(this.groups.LIGHTS, "Tank Light"),
                f.addBool({
                    group: this.groups.LIGHTS,
                    label: "On/Off",
                    valueSource: this,
                    valueName: "LightIsOn",
                    startValue: !0
                }),
                f.addSectionName(this.groups.LIGHTS, "Light Color"),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Hue",
                    valueSource: this,
                    valueName: "CH",
                    min: .01,
                    max: 1,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Saturation",
                    valueSource: this,
                    valueName: "CS",
                    min: .01,
                    max: 1,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Lightness",
                    valueSource: this,
                    valueName: "CL",
                    min: .01,
                    max: 1,
                    step: .01,
                    decimals: 2
                }),
                f.addSectionName(this.groups.LIGHTS, "Settings"),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Intensity",
                    valueSource: this.pointLight,
                    valueName: "intensity",
                    min: .01,
                    max: 10,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Distance",
                    valueSource: this.pointLight,
                    valueName: "distance",
                    min: 1,
                    max: 100,
                    step: 1,
                    decimals: 0
                }),
                f.addSectionName(this.groups.LIGHTS, "Sun Light"),
                f.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Intensity",
                    valueSource: this,
                    valueName: "SunIntensity",
                    min: 0,
                    max: 2,
                    step: .01,
                    decimals: 2
                }),
                f.addSectionName(this.groups.LIGHTS, "Lens Flare"),
                c.AdvancedPanel.addNumber({
                    group: this.groups.LIGHTS,
                    label: "Length",
                    valueSource: this.fishScene.lensFlare,
                    valueName: "scale",
                    min: 0,
                    max: 5,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.GLASS,
                    label: "Opacity",
                    valueSource: this.fishScene,
                    valueName: "GlassOpacity",
                    min: 0,
                    max: 1,
                    step: .05,
                    decimals: 2
                }),
                this.fishScene.tankGlass.uniforms && f.addNumber({
                    group: this.groups.GLASS,
                    label: "Reflection",
                    valueSource: this.fishScene.tankGlass.uniforms.reflectivity,
                    valueName: "value",
                    min: 0,
                    max: 1,
                    step: .05,
                    decimals: 2
                }),
                c.arm || (f.addSectionName(this.groups.GLASS, "Shadows"),
                f.addBool({
                    group: this.groups.GLASS,
                    label: "On/Off",
                    valueSource: this,
                    valueName: "ShadowsOn"
                }),
                f.addNumber({
                    group: this.groups.GLASS,
                    label: "Darkness",
                    valueSource: c.Main.fishLight,
                    valueName: "shadowDarkness",
                    min: 0,
                    max: .75,
                    step: .01,
                    decimals: 2
                })),
                f.addSectionName(this.groups.WATER, "Aquarium"),
                f.addNumber({
                    group: this.groups.WATER,
                    label: "Speed",
                    valueSource: this.tankWater.uniforms.baseSpeed,
                    valueName: "value",
                    min: .01,
                    max: 3,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.WATER,
                    label: "Turbulance",
                    valueSource: this.tankWater.uniforms.noiseScale,
                    valueName: "value",
                    min: .01,
                    max: 2,
                    step: .01,
                    decimals: 2
                }),
                c.arm || (f.addSectionName(this.groups.WATER, "Ocean"),
                f.addNumber({
                    group: this.groups.WATER,
                    label: "Speed",
                    valueSource: this.oceanWater.uniforms.baseSpeed,
                    valueName: "value",
                    min: .01,
                    max: .5,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.WATER,
                    label: "Turbulance",
                    valueSource: this.oceanWater.uniforms.noiseScale,
                    valueName: "value",
                    min: .01,
                    max: 2,
                    step: .01,
                    decimals: 2
                })),
                f.addColor({
                    group: this.groups.AQUARIUMFILTER,
                    label: "Clean Tint",
                    valueSource: this,
                    valueName: "StartColor",
                    updateFormat: "HEXSTRING",
                    colors: ["#BFEFFF", "#99e5FF", "#73DCFF", "#4DD2FF", "#FFFFBF"],
                    startValue: "#99e5FF"
                }),
                f.addColor({
                    group: this.groups.AQUARIUMFILTER,
                    label: "Algae Tint",
                    valueSource: this,
                    valueName: "EndColor",
                    updateFormat: "HEXSTRING",
                    colors: ["#8C8C00", "#F3C100", "#DCFF73", "#C9FF26", "#85B200"],
                    startValue: "#DCFF73"
                }),
                f.addNumber({
                    group: this.groups.AQUARIUMFILTER,
                    label: "Algae",
                    valueSource: this.fishScene,
                    valueName: "AlgaeOpacity",
                    min: 0,
                    max: .5,
                    step: .05,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.AQUARIUMFILTER,
                    label: "Particulate",
                    valueSource: this.particles,
                    valueName: "InvScale",
                    min: .1,
                    max: .8,
                    step: .01,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.AQUARIUMFILTER,
                    label: "Particle Speed",
                    valueSource: this.particles,
                    valueName: "Speed",
                    min: .001,
                    max: .1,
                    step: .001,
                    decimals: 3
                }),
                this.fishScene.useTempMat || c.arm || (f.addNumber({
                    group: this.groups.GRAVEL,
                    label: "Light Effect",
                    valueSource: this.fishScene.gravel.material.uniforms.lightIntensity,
                    valueName: "value",
                    min: 0,
                    max: 1,
                    step: .05,
                    decimals: 2
                }),
                f.addNumber({
                    group: this.groups.GRAVEL,
                    label: "Bumpiness",
                    min: -1,
                    max: 0,
                    step: .05,
                    decimals: 2,
                    valueChanged: $.proxy(this.adjustNormalScale, this)
                })),
                c.arm || (this.BubblesOn = !0),
                f.addNumber({
                    group: this.groups.INTANK,
                    label: "Fish Eye",
                    valueSource: this,
                    valueName: "FOV",
                    min: 20,
                    max: 150,
                    step: 1,
                    decimals: 0
                }),
                f.addBool({
                    group: this.groups.INTANK,
                    label: "In-Tank Dist.",
                    valueSource: this,
                    valueName: "DoDistortion",
                    updateId: "doDistortionBool"
                }),
                */
                this.fishScene.useTempMat || (this.fishScene.gravel.material.uniforms.normalScale.value = new THREE.Vector2(-.65,-.65)),
                this.particles.RenderDepth = 1,
                this.particles.AntiAlias = !0,
                this.isSceneLoaded = !0,
                this.fishLight.shadowDarkness = this.fishScene.AlgaeOpacity,
                this.renderer.render(this.scene, this.camera),
                this.renderer.updateShadowMap(this.scene, this.camera),
                this.setComplexity(c.ComplexityLevel.MEDIUM),
                this.fishManager.TotalFish = c.INITIAL_FISH,
                this.LightIsOn = !0,
                //c.AdvancedPanel.updateGroup(this.groups.LIGHTS),
                c.arm && (this.scene.add(this.fishScene.tank),
                this.scene.remove(this.fishScene.tankInner)),
                this.animate(),
                this.camPos = {
                    z: 250
                },
                this.endPos = {
                    z: 70
                },
                this.effect.uniforms.bumpAmt.value = .75,
                this.effect.uniforms.baseSpeed.value = .2,
                this.hasPlayedWoosh = !1,
                this.tween = new TWEEN.Tween(this.camPos).to(this.endPos, 1e4).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function(a) {
                    this.controller.updateCameraDistance(this.camPos.z),
                    this.camPos.z < 195 && !this.hasPlayedWoosh && (this.hasPlayedWoosh = !0,
                    c.sounds.play("CrystalWoosh", 10)),
                    this.camPos.z < 170 && this.camPos.z > 160 ? this.effect.uniforms.doDistortion.value = !0 : this.effect.uniforms.doDistortion.value = !1
                }
                .bind(this)).onComplete(function() {
                    this.controller.canUpdate = !0,
                    this.effect.uniforms.bumpAmt.value = .005,
                    this.effect.uniforms.baseSpeed.value = .02,
                    c.arm && (this.scene.remove(this.fishScene.exterior),
                    this.fishScene.exterior = null )
                }
                .bind(this)).start(),
                this.handleWindowResize()
            },
            bubbleSpeed: 1.5,
            set BubbleSpeed(a) {
                this.bubbleSpeed = a,
                c.bubbleMinRate = .5 * a,
                c.bubbleMaxRate = a
            },
            get BubbleSpeed() {
                return this.bubbleSpeed
            },
            bubblesOn: !1,
            set BubblesOn(a) {
                this.bubblesOn = a,
                this.bubblesOn ? c.arm || (this.bubbles_0.startEmitter(),
                this.bubbles_1.startEmitter(),
                this.bubbles_2.startEmitter(),
                this.bubbles_3.startEmitter()) : c.arm || (this.bubbles_0.stopEmitter(),
                this.bubbles_1.stopEmitter(),
                this.bubbles_2.stopEmitter(),
                this.bubbles_3.stopEmitter()) //,
                //c.AdvancedPanel.updateGroup(c.Main.groups.BUBBLES)
            },
            get BubblesOn() {
                return this.bubblesOn
            },
            set FOV(a) {
                this.isInTank || (a = 60),
                this.camera.fov = a,
                this.camera.updateProjectionMatrix() //,
                //c.AdvancedPanel.updateGroup(c.Main.groups.INTANK)
            },
            get FOV() {
                return this.camera.fov
            },
            set DoDistortion(a) {
                this.doDistortion = a,
                this.isInTank && (this.effect.uniforms.doDistortion.value = this.doDistortion)
            },
            get DoDistortion() {
                return this.doDistortion
            },
            adjustNormalScale: function(a) {
                this.fishScene.gravel.material.uniforms.normalScale.value = new THREE.Vector2(a,a)
            },
            toggleTankWater: function() {
                this.tankWater.mesh.visible = !this.tankWater.mesh.visible
            },
            toggleOceanWater: function() {
                this.oceanWater.mesh.visible = !this.oceanWater.mesh.visible
            },
            toggleMute: function() {
                soundManager.muted ? c.sounds.unmute() : c.sounds.mute()
            },
            isSunOn: !0,
            toggleShadow: function() {
                this.isSunOn = !this.isSunOn,
                this.setShadows(this.isSunOn)
            },
            shadowsOn: !1,
            set ShadowsOn(a) {
                this.shadowsOn = a,
                this.setShadows(a),
                a ? this.fishLight.shadowDarkness = .75 : this.fishLight.shadowDarkness = 0 //,
                //c.AdvancedPanel.updateGroup(this.groups.GLASS)
            },
            get ShadowsOn() {
                return this.shadowsOn
            },
            setShadows: function(a) {
                c.arm || (this.fishManager.switchShadowsOnFish(a),
                this.fishScene.toggleShadows(a),
                a ? (this.fishLight.shadowDarkness = this.fishScene.AlgaeOpacity,
                this.renderer.shadowMapAutoUpdate = !0) : (this.fishLight.shadowDarkness,
                this.fishLight.shadowDarkness = 0,
                this.renderer.shadowMapAutoUpdate = !1,
                this.renderer.updateShadowMap(this.scene, this.camera),
                this.renderer.render(this.scene, this.camera)))
            },
            sunIntensity: .2,
            set SunIntensity(a) {
                this.sun.intensity = a
            },
            get SunIntensity() {
                return this.sun.intensity
            },
            lightIsOn: !1,
            set LightIsOn(a) {
                this.lightIsOn = a,
                this.toggleLight()
            },
            get LightIsOn() {
                return this.lightIsOn
            },
            toggleLight: function() {
                if (this.fishScene.tankGlass) {
                    var a = null ;
                    this.lightIsOn ? (this.fishScene.tankGlass.opacity = .15,
                    this.fishScene.tankGlass.reflectivity = .85,
                    this.fishScene.tankGlass.blending = THREE.AdditiveBlending,
                    a = this.assetManager.getObjectByName("water").texture,
                    a.wrapS = a.wrapT = THREE.RepeatWrapping,
                    this.tankWater.uniforms.baseTexture.value = a,
                    this.pointLight.intensity = 1.4) : (this.fishScene.tankGlass.opacity = .15,
                    this.fishScene.tankGlass.reflectivity = .85,
                    this.fishScene.tankGlass.blending = THREE.NormalBlending,
                    a = this.assetManager.getObjectByName("waterOff").texture,
                    a.wrapS = a.wrapT = THREE.RepeatWrapping,
                    this.tankWater.uniforms.baseTexture.value = a,
                    this.pointLight.intensity = .01) //,
                    //c.AdvancedPanel.updateGroup(this.groups.LIGHTS)
                }
            },
            isInTank: !1,
            altDown: !1,
            handleKeyDown: function(a) {
                18 === a.keyCode && (this.altDown = !0)
            },
            handleKeyUp: function(a) {
                80 === a.keyCode ? this.isPaused = !this.isPaused : 18 === a.keyCode && (this.altDown = !1)
            },
            doDistortion: !0,
            startColor: "#99e5FF",
            set StartColor(a) {
                this.startColor = a,
                this.isInTank && (this.effect.uniforms.colorStart.value = new THREE.Color(this.startColor))
            },
            get StartColor() {
                return this.startColor
            },
            endColor: "#DCFF73",
            set EndColor(a) {
                this.endColor = a,
                this.isInTank && (this.effect.uniforms.colorEnd.value = new THREE.Color(this.endColor))
            },
            get EndColor() {
                return this.endColor
            },
            ch: .5,
            cs: 1,
            cl: .8,
            set CH(a) {
                this.ch = a,
                this.PointLightColor = "#ffffff"
            },
            set CS(a) {
                this.cs = a,
                this.PointLightColor = "#ffffff"
            },
            set CL(a) {
                this.cl = a,
                this.PointLightColor = "#ffffff"
            },
            get CH() {
                return this.ch
            },
            get CS() {
                return this.cs
            },
            get CL() {
                return this.cl
            },
            pointLightColor: "",
            set PointLightColor(a) {
                this.pointLightColor = a,
                this.pointLight.color = new THREE.Color("#FFFFFF"),
                this.pointLight.color.setHSL(this.ch, this.cs, this.cl),
                this.tankWater.waterMaterial.uniforms.tint.value = this.pointLight.color,
                this.fishScene.gravel.material.uniforms.tint.value = this.pointLight.color
            },
            get PointLightColor() {
                return this.pointLightColor
            },
            toggleView: function(a) {
                this.fishScene.tank && this.controller.canUpdate && ("undefined" === a && (a = !this.isInTank),
                this.isInTank = a,
                this.soundManager.IsInTank = a,
                this.isInTank ? (this.controller.minDistance = 0,
                this.controller.maxDistance = 0,
                this.controller.distance = 0,
                this.controller.yMinLimit = -90 * b.toRADIANS,
                this.controller.yMaxLimit = 90 * b.toRADIANS,
                this.effect.uniforms.doDistortion.value = this.doDistortion,
                this.effect.uniforms.colorStart.value = new THREE.Color(this.startColor),
                this.effect.uniforms.colorEnd.value = new THREE.Color(this.endColor),
                c.arm && (this.scene.remove(this.fishScene.tank),
                this.scene.add(this.fishScene.tankInner)),
                this.FOV = 102) : (this.controller.worldContainer.position.copy(this.origin),
                this.controller.worldContainer.rotation.copy(new THREE.Quaternion),
                this.controller.target = this.origin.clone(),
                this.controller.minDistance = 50,
                this.controller.maxDistance = 120,
                this.controller.distance = 115,
                this.controller.yMinLimit = -15 * b.toRADIANS,
                this.controller.yMaxLimit = 35 * b.toRADIANS,
                this.effect.uniforms.colorStart.value.setHex(16777215),
                this.effect.uniforms.colorEnd.value.setHex(16777215),
                this.effect.uniforms.doDistortion.value = 0,
                c.arm && (this.scene.add(this.fishScene.tank),
                this.scene.remove(this.fishScene.tankInner)),
                this.FOV = 60))
            },
            handleWindowResize: function() {
                this.camera.aspect = a.innerWidth / a.innerHeight,
                this.camera.updateProjectionMatrix();
                var b = a.innerWidth * this.renderer.devicePixelRatio
                  , d = a.innerHeight * this.renderer.devicePixelRatio;
                if (!c.arm && this.effectFXAA) {
                    var e = this.effectFXAA.uniforms.resolution.value;
                    c.threeVersion <= 68 ? e.set(1 / b, 1 / d) : e.set(1 / a.innerWidth, 1 / a.innerHeight)
                }
                this.renderer.setSize(a.innerWidth, a.innerHeight),
                this.composer && c.threeVersion <= 68 && this.composer.setSize(b, d)
            },
            animate: function() {
                a.requestAnimationFrame(this.animate.bind(this)),
                this.controller.update(this.mouseHandler.isDragging),
                this.render()
                //c.perfStats.update()
            },
            cM4: new THREE.Matrix4,
            dir: new THREE.Vector3(0,0,-1),
            ray: new THREE.Raycaster(new THREE.Vector3,new THREE.Vector3),
            buffer: 1,
            normalM4: new THREE.Matrix3,
            worldNormal: new THREE.Vector3,
            plane: new THREE.Plane,
            point: new THREE.Vector3,
            face: new THREE.Face3,
            pastPoint: new THREE.Vector3,
            newPoint: new THREE.Vector3,
            clock: new THREE.Clock,
            colliders: [],
            clockDelta: 0,
            render: function() {
                if (this.clockDelta = Math.min(this.clock.getDelta(), .04),
                this.isInTank && null  != this.worldContainer) {
                    if (this.cM4 = this.cM4.extractRotation(this.camera.matrixWorld),
                    this.dir = this.dir.set(0, 0, -1).applyMatrix4(this.cM4),
                    this.worldContainer.translateOnAxis(this.dir, .025),
                    c.doCollisionDetection) {
                        this.ray.set(this.worldContainer.position, this.dir);
                        var a = this.ray.intersectObjects(this.colliders, !1);
                        if (a.length > 0 && a[0].distance < this.buffer) {
                            this.point = a[0].point,
                            this.face = a[0].face,
                            this.normalM4 = this.normalM4.getNormalMatrix(this.matrixWorld),
                            this.worldNormal = this.face.normal.clone().applyMatrix3(this.normalM4).normalize(),
                            this.ray.set(this.point, this.dir),
                            this.pastPoint = this.ray.ray.at(.025),
                            this.plane.setFromNormalAndCoplanarPoint(this.worldNormal, this.point);
                            var b = this.plane.distanceToPoint(this.pastPoint);
                            this.ray.set(this.pastPoint, this.worldNormal.multiplyScalar(-1)),
                            this.newPoint = this.ray.ray.at(b),
                            this.ray.set(this.newPoint, this.worldContainer.position.clone().sub(this.point).normalize()),
                            this.worldContainer.position.copy(this.ray.ray.at(this.buffer))
                        }
                    }
                    c.arm || this.isPaused || (this.effectTime.value += this.clockDelta),
                    this.worldContainer.position.clamp(this.minTranslation, this.maxTranslation)
                } else
                    this.soundManager.update();
                this.isPaused || (this.fishManager.updateFish(this.clockDelta),
                this.particles && this.particles.update(),
                TWEEN.update(),
                this.tankWater.update(this.clockDelta),
                this.oceanWater && this.oceanWater.update(this.clockDelta),
                c.arm || (this.bubbles_0.update(),
                this.bubbles_1.update(),
                this.bubbles_2.update(),
                this.bubbles_3.update())),
                this.handles && this.handles.update(),
                this.composer && this.composer.render()
            },
            setComplexity: function(a) {
                if (this.isSceneLoaded)
                    switch (c.currentComplexity = a,
                    a) {
                    case c.ComplexityLevel.LOW:
                        this.BubblesOn = !1,
                        this.setShadows(!1),
                        c.doCollisionDetection = !1;
                        break;
                    case c.ComplexityLevel.MEDIUM:
                        null  == this.bubbles_0 || this.bubbles_0.isRunning || (this.BubblesOn = !0),
                        c.doCollisionDetection = !0,
                        this.setShadows(!1);
                        break;
                    case c.ComplexityLevel.HIGH:
                        null  == this.bubbles_0 || this.bubbles_0.isRunning || (this.BubblesOn = !0),
                        c.doCollisionDetection = !0,
                        this.setShadows(!0)
                    }
            },
            bind: function(a, b) {
                return function() {
                    b.apply(a, arguments)
                }
            }
        }
    }(window),
    "function" != typeof Object.create && (Object.create = function(a) {
        function b() {}
        return b.prototype = a,
        new b
    }
    ),
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    Modernizr.Detectizr.detect({
        addAllFeaturesAsClass: !0,
        detectDevice: !0,
        detectOS: !0,
        detectBrowser: !0,
        detectScreen: !1,
        detectPlugins: !1
    }),
    $(document).bind("touchmove", function(a) {
        a.preventDefault()
    }),
    c.supports3d = Modernizr.webgl && a(),
    c.supports3d) {
        var e = $.url()
          , f = void 0 !== e.param("full")
          , g = Modernizr.Detectizr.device || {};
        if (!f && ("mobile" === g.type || "tv" === g.type))
            return void (document.location.href = "mobile/");
        c.sounds.init(),
        $(document).ready(function() {
            var a = window.THREEx;
            a && a.RendererStats && (c.rendererStats = new a.RendererStats,
            c.rendererStats.domElement.style.position = "absolute",
            c.rendererStats.domElement.style.left = "0px",
            c.rendererStats.domElement.style.bottom = "0px",
            document.body.appendChild(c.rendererStats.domElement)),
            c.INITIAL_FISH = c.arm === !0 ? 5 : 20,
            c.world = new c.FishbowlWorld,
            c.world.Init();
            //var b = c.AdvancedPanel;
            //b.init();
            var d = c.Controls;
            d.init()
        })
    } else
        Modernizr.webgl ? $("#upgradeWebGLDisabled").show() : $("#upgradeWebGLUnsupported").show(),
        $("#upgradeContent").show()
}();
