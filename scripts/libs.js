function PxLoaderImage(a, b, c) {
    var d = this
      , e = null ;
    this.img = new Image,
    this.tags = b,
    this.priority = c;
    var f = function() {
        "complete" === d.img.readyState && (i(),
        e.onLoad(d))
    }
      , g = function() {
        i(),
        e.onLoad(d)
    }
      , h = function() {
        i(),
        e.onError(d)
    }
      , i = function() {
        d.unbind("load", g),
        d.unbind("readystatechange", f),
        d.unbind("error", h)
    }
    ;
    this.start = function(b) {
        e = b,
        d.bind("load", g),
        d.bind("readystatechange", f),
        d.bind("error", h),
        d.img.src = a
    }
    ,
    this.checkStatus = function() {
        d.img.complete && (i(),
        e.onLoad(d))
    }
    ,
    this.onTimeout = function() {
        i(),
        d.img.complete ? e.onLoad(d) : e.onTimeout(d)
    }
    ,
    this.getName = function() {
        return a
    }
    ,
    this.bind = function(a, b) {
        d.img.addEventListener ? d.img.addEventListener(a, b, !1) : d.img.attachEvent && d.img.attachEvent("on" + a, b)
    }
    ,
    this.unbind = function(a, b) {
        d.img.removeEventListener ? d.img.removeEventListener(a, b, !1) : d.img.detachEvent && d.img.detachEvent("on" + a, b)
    }
}
function PxLoaderSound(a, b, c, d) {
    var e = this
      , f = null 
      , g = navigator.userAgent.match(/(ipad|iphone|ipod)/i)
      , h = navigator.userAgent.match(/android/i);
    this.useGlobalHTML5Audio = g || h,
    this.tags = c,
    this.priority = d,
    this.sound = soundManager.createSound({
        id: a,
        url: b,
        autoLoad: !1,
        onload: function() {
            f.onLoad(e)
        },
        onsuspend: function() {
            f.onTimeout(e)
        },
        whileloading: function() {
            var a = this.bytesLoaded
              , b = this.bytesTotal;
            a > 0 && a === b && f.onLoad(e)
        }
    }),
    this.start = function(a) {
        f = a,
        this.useGlobalHTML5Audio ? f.onTimeout(e) : this.sound.load()
    }
    ,
    this.checkStatus = function() {
        switch (e.sound.readyState) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            f.onError(e);
            break;
        case 3:
            f.onLoad(e)
        }
    }
    ,
    this.onTimeout = function() {
        f.onTimeout(e)
    }
    ,
    this.getName = function() {
        return b
    }
}
function PxLoaderVideo(a, b, c) {
    var d = this
      , e = null ;
    this.readyEventName = "canplaythrough";
    try {
        this.vid = new Video
    } catch (f) {
        this.vid = document.createElement("video")
    }
    this.tags = b,
    this.priority = c;
    var g = function() {
        4 === d.vid.readyState && (j(),
        e.onLoad(d))
    }
      , h = function() {
        j(),
        e.onLoad(d)
    }
      , i = function() {
        j(),
        e.onError(d)
    }
      , j = function() {
        d.unbind("load", h),
        d.unbind(d.readyEventName, g),
        d.unbind("error", i)
    }
    ;
    this.start = function(b) {
        e = b,
        d.bind("load", h),
        d.bind(d.readyEventName, g),
        d.bind("error", i),
        d.bind("suspend", h),
        d.vid.src = a,
        d.vid.load()
    }
    ,
    this.checkStatus = function() {
        4 === d.vid.readyState && (j(),
        e.onLoad(d))
    }
    ,
    this.onTimeout = function() {
        j(),
        4 !== d.vid.readyState ? e.onLoad(d) : e.onTimeout(d)
    }
    ,
    this.getName = function() {
        return a
    }
    ,
    this.bind = function(a, b) {
        d.vid.addEventListener ? d.vid.addEventListener(a, b, !1) : d.vid.attachEvent && d.vid.attachEvent("on" + a, b)
    }
    ,
    this.unbind = function(a, b) {
        d.vid.removeEventListener ? d.vid.removeEventListener(a, b, !1) : d.vid.detachEvent && d.vid.detachEvent("on" + a, b)
    }
}
window.Modernizr = function(a, b, c) {
    function d(a) {
        s.cssText = a
    }
    function e(a, b) {
        return typeof a === b
    }
    function f(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function g(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!f(e, "-") && s[e] !== c)
                return "pfx" == b ? e : !0
        }
        return !1
    }
    function h(a, b, d) {
        for (var f in a) {
            var g = b[a[f]];
            if (g !== c)
                return d === !1 ? a[f] : e(g, "function") ? g.bind(d || b) : g
        }
        return !1
    }
    function i(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1)
          , f = (a + " " + v.join(d + " ") + d).split(" ");
        return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + w.join(d + " ") + d).split(" "),
        h(f, b, c))
    }
    var j, k, l, m = "2.7.1", n = {}, o = !0, p = b.documentElement, q = "modernizr", r = b.createElement(q), s = r.style, t = ({}.toString,
    " -webkit- -moz- -o- -ms- ".split(" ")), u = "Webkit Moz O ms", v = u.split(" "), w = u.toLowerCase().split(" "), x = {}, y = [], z = y.slice, A = function(a, c, d, e) {
        var f, g, h, i, j = b.createElement("div"), k = b.body, l = k || b.createElement("body");
        if (parseInt(d, 10))
            for (; d--; )
                h = b.createElement("div"),
                h.id = e ? e[d] : q + (d + 1),
                j.appendChild(h);
        return f = ["&#173;", '<style id="s', q, '">', a, "</style>"].join(""),
        j.id = q,
        (k ? j : l).innerHTML += f,
        l.appendChild(j),
        k || (l.style.background = "",
        l.style.overflow = "hidden",
        i = p.style.overflow,
        p.style.overflow = "hidden",
        p.appendChild(l)),
        g = c(j, a),
        k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l),
        p.style.overflow = i),
        !!g
    }
    , B = {}.hasOwnProperty;
    l = e(B, "undefined") || e(B.call, "undefined") ? function(a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined")
    }
     : function(a, b) {
        return B.call(a, b)
    }
    ,
    Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b)
            throw new TypeError;
        var c = z.call(arguments, 1)
          , d = function() {
            if (this instanceof d) {
                var e = function() {}
                ;
                e.prototype = b.prototype;
                var f = new e
                  , g = b.apply(f, c.concat(z.call(arguments)));
                return Object(g) === g ? g : f
            }
            return b.apply(a, c.concat(z.call(arguments)))
        }
        ;
        return d
    }
    ),
    x.canvas = function() {
        var a = b.createElement("canvas");
        return !!a.getContext && !!a.getContext("2d")
    }
    ,
    x.webgl = function() {
        return !!a.WebGLRenderingContext
    }
    ,
    x.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : A(["@media (", t.join("touch-enabled),("), q, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = 9 === a.offsetTop
        }),
        c
    }
    ,
    x.cssanimations = function() {
        return i("animationName")
    }
    ,
    x.csstransforms = function() {
        return !!i("transform")
    }
    ,
    x.csstransforms3d = function() {
        var a = !!i("perspective");
        return a && "webkitPerspective" in p.style && A("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight
        }),
        a
    }
    ,
    x.video = function() {
        var a = b.createElement("video")
          , c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c),
            c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""),
            c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""),
            c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (d) {}
        return c
    }
    ,
    x.audio = function() {
        var a = b.createElement("audio")
          , c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c),
            c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""),
            c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (d) {}
        return c
    }
    ,
    x.localstorage = function() {
        try {
            return localStorage.setItem(q, q),
            localStorage.removeItem(q),
            !0
        } catch (a) {
            return !1
        }
    }
    ;
    for (var C in x)
        l(x, C) && (k = C.toLowerCase(),
        n[k] = x[C](),
        y.push((n[k] ? "" : "no-") + k));
    return n.addTest = function(a, b) {
        if ("object" == typeof a)
            for (var d in a)
                l(a, d) && n.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(),
            n[a] !== c)
                return n;
            b = "function" == typeof b ? b() : b,
            "undefined" != typeof o && o && (p.className += " " + (b ? "" : "no-") + a),
            n[a] = b
        }
        return n
    }
    ,
    d(""),
    r = j = null ,
    function(a, b) {
        function c(a, b) {
            var c = a.createElement("p")
              , d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>",
            d.insertBefore(c.lastChild, d.firstChild)
        }
        function d() {
            var a = s.elements;
            return "string" == typeof a ? a.split(" ") : a
        }
        function e(a) {
            var b = r[a[p]];
            return b || (b = {},
            q++,
            a[p] = q,
            r[q] = b),
            b
        }
        function f(a, c, d) {
            if (c || (c = b),
            k)
                return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a),
            !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f)
        }
        function g(a, c) {
            if (a || (a = b),
            k)
                return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)
                f.createElement(h[g]);
            return f
        }
        function h(a, b) {
            b.cache || (b.cache = {},
            b.createElem = a.createElement,
            b.createFrag = a.createDocumentFragment,
            b.frag = b.createFrag()),
            a.createElement = function(c) {
                return s.shivMethods ? f(c, a, b) : b.createElem(c)
            }
            ,
            a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-]+/g, function(a) {
                return b.createElem(a),
                b.frag.createElement(a),
                'c("' + a + '")'
            }) + ");return n}")(s, b.frag)
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return s.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
            k || h(a, d),
            a
        }
        var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>",
                j = "hidden" in a,
                k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j = !0,
                k = !0
            }
        }();
        var s = {
            elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: l,
            shivCSS: m.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: m.shivMethods !== !1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = s,
        i(b)
    }(this, b),
    n._version = m,
    n._prefixes = t,
    n._domPrefixes = w,
    n._cssomPrefixes = v,
    n.testProp = function(a) {
        return g([a])
    }
    ,
    n.testAllProps = i,
    n.testStyles = A,
    p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (o ? " js " + y.join(" ") : ""),
    n
}(this, this.document),
function(a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a)
    }
    function e(a) {
        return "string" == typeof a
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a
    }
    function h() {
        var a = r.shift();
        s = 1,
        a ? a.t ? o(function() {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(),
        h()) : s = 0
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1,
            !s && h(),
            l.onload = l.onreadystatechange = null ,
            b)) {
                "img" != a && o(function() {
                    v.removeChild(l)
                }, 50);
                for (var d in A[c])
                    A[c].hasOwnProperty(d) && A[c][d].onload()
            }
        }
        var j = j || m.errorTimeout
          , l = b.createElement(a)
          , n = 0
          , q = 0
          , t = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === A[c] && (q = 1,
        A[c] = []),
        "object" == a ? l.data = c : (l.src = c,
        l.type = a),
        l.width = l.height = "0",
        l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, q)
        }
        ,
        r.splice(e, 0, t),
        "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null  : p),
        o(k, j)) : A[c].push(l))
    }
    function j(a, b, c, d, f) {
        return s = 0,
        b = b || "j",
        e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a),
        1 == r.length && h()),
        this
    }
    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        },
        a
    }
    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance" in n.style, u = t && !!b.createRange().compareNode, v = u ? n : p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n = !!b.attachEvent && !n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function(a) {
        return "[object Array]" == q.call(a)
    }
    , z = [], A = {}, B = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]),
            a
        }
    };
    m = function(a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {
                url: f,
                origUrl: f,
                prefixes: a
            };
            for (c = 0; g > c; c++)
                d = a[c].split("="),
                (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++)
                f = z[c](f);
            return f
        }
        function g(a, e, f, g, h) {
            var i = b(a)
              , j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(),
            i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]),
            i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1,
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout),
            (d(e) || d(j)) && f.load(function() {
                k(),
                e && e(i.origUrl, h, g),
                j && j(i.origUrl, h, g),
                A[i.url] = 2
            })))
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))
                        c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a),
                            n()
                        }
                        ),
                        g(a, l, b, 0, j);
                    else if (Object(a) === a)
                        for (i in h = function() {
                            var b, c = 0;
                            for (b in a)
                                a.hasOwnProperty(b) && c++;
                            return c
                        }(),
                        a)
                            a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                                var a = [].slice.call(arguments);
                                m.apply(this, a),
                                n()
                            }
                             : l[i] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b),
                                    n()
                                }
                            }(m[i])),
                            g(a[i], l, b, i, j))
                } else
                    !c && n()
            }
            var h, i, j = !!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k),
            k && c(k)
        }
        var i, j, l = this.yepnope.loader;
        if (e(a))
            g(a, 0, l, 0);
        else if (y(a))
            for (i = 0; i < a.length; i++)
                j = a[i],
                e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
        else
            Object(a) === a && h(a, l)
    }
    ,
    m.addPrefix = function(a, b) {
        B[a] = b
    }
    ,
    m.addFilter = function(a) {
        z.push(a)
    }
    ,
    m.errorTimeout = 1e4,
    null  == b.readyState && b.addEventListener && (b.readyState = "loading",
    b.addEventListener("DOMContentLoaded", l = function() {
        b.removeEventListener("DOMContentLoaded", l, 0),
        b.readyState = "complete"
    }
    , 0)),
    a.yepnope = k(),
    a.yepnope.executeStack = h,
    a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d)
            n.setAttribute(l, d[l]);
        c = j ? h : c || f,
        n.onreadystatechange = n.onload = function() {
            !k && g(n.readyState) && (k = 1,
            c(),
            n.onload = n.onreadystatechange = null )
        }
        ,
        o(function() {
            k || (k = 1,
            c(1))
        }, e),
        i ? n.onload() : p.parentNode.insertBefore(n, p)
    }
    ,
    a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a,
        e.rel = "stylesheet",
        e.type = "text/css";
        for (j in d)
            e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p),
        o(c, 0))
    }
}(this, document),
Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}
,
function(a, b) {
    function c(c) {
        var d, g, h, i, j, k, l, m, n = function(a, b) {
            var c, d, e;
            if (arguments.length > 2)
                for (c = 1,
                d = arguments.length; d > c; c += 1)
                    n(a, arguments[c]);
            else
                for (e in b)
                    b.hasOwnProperty(e) && (a[e] = b[e]);
            return a
        }
        , o = this, p = e.Detectizr.device, q = document.documentElement, r = ["tv", "tablet", "mobile", "desktop"], s = /[\t\r\n]/g, t = {
            acrobat: {
                substrs: ["Adobe", "Acrobat"],
                progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
            },
            flash: {
                substrs: ["Shockwave", "Flash"],
                progIds: ["ShockwaveFlash.ShockwaveFlash.1"]
            },
            mediaplayer: {
                substrs: ["Windows Media"],
                progIds: ["wmplayer.ocx"]
            },
            silverlight: {
                substrs: ["Silverlight"],
                progIds: ["AgControl.AgControl"]
            }
        };
        if (f = n({}, f, c || {}),
        o.is = function(a) {
            return p.userAgent.indexOf(a) > -1
        }
        ,
        o.test = function(a) {
            return a.test(p.userAgent)
        }
        ,
        o.exec = function(a) {
            return a.exec(p.userAgent)
        }
        ,
        o.trim = function(a) {
            return a.replace(/^\s+|\s+$/g, "")
        }
        ,
        o.toCamel = function(a) {
            return null  === a || void 0 === a ? "" : String(a).replace(/((\s|\-|\.)+[a-z0-9])/g, function(a) {
                return a.toUpperCase().replace(/(\s|\-|\.)/g, "")
            })
        }
        ,
        o.removeClass = function(a, b) {
            var c = b || ""
              , d = 1 === a.nodeType && (a.className ? (" " + a.className + " ").replace(s, " ") : "");
            if (d) {
                for (; d.indexOf(" " + c + " ") >= 0; )
                    d = d.replace(" " + c + " ", " ");
                a.className = b ? o.trim(d) : ""
            }
        }
        ,
        o.addVersionTest = function(a, b, c) {
            null  !== b && void 0 !== b && "" !== b && (b = o.toCamel(b),
            "" !== b && (void 0 !== c && c > 0 && (b = b.substr(0, c)),
            o.addConditionalTest(a + b, !0)))
        }
        ,
        o.checkOrientation = function() {
            a.clearTimeout(l),
            l = a.setTimeout(function() {
                m = p.orientation,
                a.innerHeight > a.innerWidth ? p.orientation = "portrait" : p.orientation = "landscape",
                o.addConditionalTest(p.orientation, !0),
                m !== p.orientation && o.addConditionalTest(m, !1)
            }, 10)
        }
        ,
        o.addConditionalTest = function(a, b) {
            null  !== a && void 0 !== a && "" !== a && (f.addAllFeaturesAsClass ? e.addTest(a, b) : (b = "function" == typeof b ? b() : b,
            b ? e.addTest(a, !0) : (delete e[a],
            o.removeClass(q, a))))
        }
        ,
        f.detectDevice) {
            for (o.test(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i) ? (p.type = r[0],
            p.model = "smartTv") : o.test(/Xbox|PLAYSTATION.3|Wii/i) ? (p.type = r[0],
            p.model = "gameConsole") : o.test(/iP(a|ro)d/i) ? (p.type = r[1],
            p.model = "ipad") : o.test(/tablet/i) && !o.test(/RX-34/i) || o.test(/FOLIO/i) ? (p.type = r[1],
            p.model = String(o.exec(/playbook/) || "")) : o.test(/Linux/i) && o.test(/Android/i) && !o.test(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i) ? (p.type = r[1],
            p.model = "android") : o.test(/Kindle/i) || o.test(/Mac.OS/i) && o.test(/Silk/i) ? (p.type = r[1],
            p.model = "kindle") : o.test(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || o.test(/MB511/i) && o.test(/RUTEM/i) ? (p.type = r[1],
            p.model = "android") : o.test(/BB10/i) ? (p.type = r[1],
            p.model = "blackberry") : (p.model = o.exec(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/i),
            null  !== p.model ? (p.type = r[2],
            p.model = String(p.model)) : (p.model = "",
            o.test(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i) ? p.type = r[2] : o.test(/Opera/i) && o.test(/Windows.NT.5/i) && o.test(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i) ? p.type = r[2] : o.test(/Windows.(NT|XP|ME|9)/i) && !o.test(/Phone/i) || o.test(/Win(9|.9|NT)/i) || o.test(/\(Windows 8\)/i) ? p.type = r[3] : o.test(/Macintosh|PowerPC/i) && !o.test(/Silk/i) ? p.type = r[3] : o.test(/Linux/i) && o.test(/X11/i) ? p.type = r[3] : o.test(/Solaris|SunOS|BSD/i) ? p.type = r[3] : o.test(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !o.test(/Mobile/i) ? (p.type = r[3],
            p.model = "crawler") : p.type = r[2])),
            d = 0,
            g = r.length; g > d; d += 1)
                o.addConditionalTest(r[d], p.type === r[d]);
            f.detectDeviceModel && o.addConditionalTest(o.toCamel(p.model), !0),
            (p.type === r[1] || p.type === r[2]) && (a.onresize = function(a) {
                o.checkOrientation(a)
            }
            ,
            o.checkOrientation())
        }
        if (f.detectScreen && e.mq && (o.addConditionalTest("smallScreen", e.mq("only screen and (max-width: 480px)")),
        o.addConditionalTest("verySmallScreen", e.mq("only screen and (max-width: 320px)")),
        o.addConditionalTest("veryVerySmallScreen", e.mq("only screen and (max-width: 240px)"))),
        f.detectOS && ("" !== p.model && ("ipad" === p.model || "iphone" === p.model || "ipod" === p.model ? (p.osVersion = o.test(/os\s(\d+)_/) ? RegExp.$1 : "",
        p.os = "ios",
        p.osVersionFull = o.test(/os ([^\s]+)/) ? RegExp.$1.replace(/_/g, ".") : "") : "android" === p.model ? (p.osVersion = (o.test(/os\s(\d+)_/) ? RegExp.$1 : "").substr(0, 2),
        p.osVersion || (p.osVersion = o.test(/android\s(\d+)\./) ? RegExp.$1 : "",
        p.osVersionFull = o.test(/android ([^\s]+)/) ? RegExp.$1.replace(/_/g, ".") : ""),
        p.os = "android") : "blackberry" === p.model ? (p.osVersion = o.test(/version\/([^\s]+)/) ? RegExp.$1 : "",
        p.os = "blackberry") : "playbook" === p.model && (p.osVersion = o.test(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : "",
        p.os = "blackberry")),
        "" === p.os && (o.is("win") || o.is("16bit") ? (p.os = "windows",
        o.is("windows nt 6.3") ? (p.osVersion = "8",
        p.osVersionFull = "8.1") : o.is("windows nt 6.2") || o.test(/\(windows 8\)/) ? p.osVersion = "8" : o.is("windows nt 6.1") ? p.osVersion = "7" : o.is("windows nt 6.0") ? p.osVersion = "vista" : o.is("windows nt 5.2") || o.is("windows nt 5.1") || o.is("windows xp") ? p.osVersion = "xp" : o.is("windows nt 5.0") || o.is("windows 2000") ? p.osVersion = "2k" : o.is("winnt") || o.is("windows nt") ? p.osVersion = "nt" : o.is("win98") || o.is("windows 98") ? p.osVersion = "98" : (o.is("win95") || o.is("windows 95")) && (p.osVersion = "95")) : o.is("mac") || o.is("darwin") ? (p.os = "mac",
        o.is("68k") || o.is("68000") ? p.osVersion = "68k" : o.is("ppc") || o.is("powerpc") ? p.osVersion = "ppc" : o.is("os x") && (p.osVersion = "os x")) : o.is("webtv") ? p.os = "webtv" : o.is("x11") || o.is("inux") ? p.os = "linux" : o.is("sunos") ? p.os = "sun" : o.is("irix") ? p.os = "irix" : o.is("freebsd") ? p.os = "freebsd" : o.is("bsd") && (p.os = "bsd")),
        "" !== p.os && (!p.osVersionFull && p.osVersion && (p.osVersionFull = p.osVersion),
        o.addConditionalTest(p.os, !0),
        o.addVersionTest(p.os, p.osVersionFull.replace(/\./g, "_")),
        o.addVersionTest(p.os, p.osVersion))),
        f.detectBrowser && (o.test(/opera|webtv/i) || !o.test(/msie\s([0-9]{1,})/) && !o.is("trident") ? o.is("firefox") ? (p.browserEngine = "gecko",
        p.browser = "firefox",
        p.browserVersion = (o.test(/firefox\/(\d+(\.?\d+)*)/) ? RegExp.$1 : "").substr(0, 2)) : o.is("gecko/") ? p.browserEngine = "gecko" : o.is("opera") ? (p.browser = "opera",
        p.browserEngine = "presto",
        p.browserVersion = o.test(/version\/(\d+)/) ? RegExp.$1 : o.test(/opera(\s|\/)(\d+)/) ? RegExp.$2 : "") : o.is("konqueror") ? p.browser = "konqueror" : o.is("chrome") ? (p.browserEngine = "webkit",
        p.browser = "chrome",
        p.browserVersion = o.test(/chrome\/(\d+)/) ? RegExp.$1 : "") : o.is("iron") ? (p.browserEngine = "webkit",
        p.browser = "iron") : o.is("crios") ? (p.browser = "chrome",
        p.browserEngine = "webkit",
        p.browserVersion = o.test(/crios\/(\d+)/) ? RegExp.$1 : "") : o.is("applewebkit/") ? (p.browser = "safari",
        p.browserEngine = "webkit",
        p.browserVersion = o.test(/version\/(\d+)/) ? RegExp.$1 : "") : o.is("mozilla/") && (p.browserEngine = "gecko") : (p.browserEngine = "trident",
        p.browser = "ie",
        !a.addEventListener && document.documentMode && 7 === document.documentMode ? p.browserVersion = "8compat" : o.test(/trident.*rv[ :](\d+)\./) ? p.browserVersion = RegExp.$1 : p.browserVersion = o.test(/trident\/4\.0/) ? "8" : RegExp.$1),
        "" !== p.browser && (o.addConditionalTest(p.browser, !0),
        "" !== p.browserVersion && o.addVersionTest(p.browser, p.browserVersion)),
        o.addConditionalTest(p.browserEngine, !0)),
        f.detectPlugins) {
            if (o.detectPlugin = function(a) {
                for (d = 0,
                g = b.plugins.length; g > d; d++) {
                    var c = b.plugins[d]
                      , e = c.name + c.description
                      , f = 0;
                    for (h = 0,
                    i = a.length; i > h; h += 1)
                        -1 !== e.indexOf(a[h]) && (f += 1);
                    if (f === a.length)
                        return !0
                }
                return !1
            }
            ,
            o.detectObject = function(a, b) {
                for (d = 0,
                g = a.length; g > d; d++)
                    try {
                        var c = new ActiveXObject(a[d]);
                        if (c)
                            return b && b[d] ? b[d].call(c) : !0
                    } catch (e) {}
                return !1
            }
            ,
            a.ActiveXObject)
                for (j in t)
                    t.hasOwnProperty(j) && (k = t[j],
                    o.detectObject(k.progIds, k.fns) && (p.browserPlugins.push(j),
                    o.addConditionalTest(j, !0)));
            else if (b.plugins)
                for (j in t)
                    t.hasOwnProperty(j) && (k = t[j],
                    o.detectPlugin(k.substrs) && (p.browserPlugins.push(j),
                    o.addConditionalTest(j, !0)));
            b.javaEnabled() && (p.browserPlugins.push("java"),
            o.addConditionalTest("java", !0))
        }
    }
    function d() {
        void 0 !== e && (e.Detectizr = e.Detectizr || {},
        e.Detectizr.device = {
            type: "",
            model: "",
            orientation: "",
            browser: "",
            browserEngine: "",
            browserPlugins: [],
            browserVersion: "",
            os: "",
            osVersion: "",
            osVersionFull: "",
            userAgent: (b.userAgent || b.vendor || a.opera).toLowerCase()
        },
        e.Detectizr.detect = function(a) {
            return new c(a)
        }
        )
    }
    var e = a.Modernizr
      , f = {
        addAllFeaturesAsClass: !1,
        detectDevice: !0,
        detectDeviceModel: !0,
        detectScreen: !0,
        detectOS: !0,
        detectBrowser: !0,
        detectPlugins: !0
    };
    d()
}(this, navigator),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event
          , h = i.call(arguments, 1)
          , j = 0
          , k = 0
          , l = 0
          , m = 0;
        if (b = a.event.fix(g),
        b.type = "mousewheel",
        "detail" in g && (l = -1 * g.detail),
        "wheelDelta" in g && (l = g.wheelDelta),
        "wheelDeltaY" in g && (l = g.wheelDeltaY),
        "wheelDeltaX" in g && (k = -1 * g.wheelDeltaX),
        "axis" in g && g.axis === g.HORIZONTAL_AXIS && (k = -1 * l,
        l = 0),
        j = 0 === l ? k : l,
        "deltaY" in g && (l = -1 * g.deltaY,
        j = l),
        "deltaX" in g && (k = g.deltaX,
        0 === l && (j = -1 * k)),
        0 !== l || 0 !== k) {
            if (1 === g.deltaMode) {
                var n = a.data(this, "mousewheel-line-height");
                j *= n,
                l *= n,
                k *= n
            } else if (2 === g.deltaMode) {
                var o = a.data(this, "mousewheel-page-height");
                j *= o,
                l *= o,
                k *= o
            }
            return m = Math.max(Math.abs(l), Math.abs(k)),
            (!f || f > m) && (f = m,
            d(g, m) && (f /= 40)),
            d(g, m) && (j /= 40,
            k /= 40,
            l /= 40),
            j = Math[j >= 1 ? "floor" : "ceil"](j / f),
            k = Math[k >= 1 ? "floor" : "ceil"](k / f),
            l = Math[l >= 1 ? "floor" : "ceil"](l / f),
            b.deltaX = k,
            b.deltaY = l,
            b.deltaFactor = f,
            b.deltaMode = 0,
            h.unshift(b, j, k, l),
            e && clearTimeout(e),
            e = setTimeout(c, 200),
            (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }
    function c() {
        f = null 
    }
    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j; )
            a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.9",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c; )
                    this.addEventListener(h[--c], b, !1);
            else
                this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
            a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = h.length; a; )
                    this.removeEventListener(h[--a], b, !1);
            else
                this.onmousewheel = null 
        },
        getLineHeight: function(b) {
            return parseInt(a(b)["offsetParent" in a.fn ? "offsetParent" : "parent"]().css("fontSize"), 10)
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
}),
"undefined" == typeof PxTouch && (PxTouch = {}),
function(a) {
    PxTouch.registerSpecialEvents = function(b, c, d) {
        a.each(c, function(c, e) {
            a.event.special[e] = {
                setup: function() {
                    var c = a(this)
                      , e = c.data(b);
                    e || (e = new d(c),
                    e.activeEventTypes = 0,
                    c.data(b, e)),
                    e.activeEventTypes++,
                    1 === e.activeEventTypes && e.start()
                },
                teardown: function() {
                    var c = a(this).data(b);
                    c && (c.activeEventTypes--,
                    0 === c.activeEventTypes && c.stop())
                }
            }
        })
    }
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(a) {
        this.$el = a,
        this.activePointers = [],
        this.mouseEventsEnabled = !1;
        var b = function(a, b) {
            return function(c) {
                var d, e, f = h(c);
                for (d = 0,
                e = f.length; e > d; d++)
                    a.call(b, f[d], c)
            }
        }
        ;
        this.listeners = {
            msPointer: {
                MSPointerDown: b(d, this),
                MSPointerMove: b(e, this),
                MSPointerUp: b(g, this),
                MSPointerCancel: b(f, this)
            },
            pointer: {
                pointerdown: b(d, this),
                pointermove: b(e, this),
                pointerup: b(g, this),
                pointercancel: b(f, this)
            },
            touch: {
                touchstart: b(c, this),
                touchmove: b(e, this),
                touchend: b(g, this),
                touchcancel: b(f, this)
            },
            mouse: {
                mousedown: b(d, this),
                mousemove: b(e, this),
                mouseup: b(g, this)
            }
        },
        this.docListeners = {
            msPointer: {
                MSPointerUp: b(g, this)
            },
            pointer: {
                pointerup: b(g, this)
            },
            mouse: {
                mouseup: b(g, this)
            }
        },
        this.useTopDocument = !1;
        try {
            this.useTopDocument = document !== top.document
        } catch (i) {}
    }
    function c(b, c) {
        return this.mouseEventsEnabled && (this.$el.off(this.listeners.mouse),
        a(document).off(this.docListeners.mouse),
        this.mouseEventsEnabled = !1),
        d.call(this, b, c)
    }
    function d(a, b) {
        this.activePointers.push(a),
        this.triggerEvent("pxpointerstart", a, b)
    }
    function e(a, b) {
        var c = a.indexIn(this.activePointers);
        c >= 0 && (this.activePointers.splice(c, 1, a),
        this.triggerEvent("pxpointermove", a, b))
    }
    function f(a, b) {
        return g.call(this, a, b, !0)
    }
    function g(a, b, c) {
        var d = a.indexIn(this.activePointers);
        d >= 0 && (this.activePointers.splice(d, 1),
        this.triggerEvent("pxpointerend", a, b, c))
    }
    function h(a) {
        a.preventManipulation && a.preventManipulation();
        var b, c, d, e, f, g, h = [], k = i(a), l = a.originalEvent, m = l.changedTouches || l.targetTouches || l.touches || [l];
        for (b = 0,
        c = m.length; c > b; b++) {
            if (d = m[b],
            e = f = 0,
            d.pageX || d.pageY)
                e = d.pageX,
                f = d.pageY;
            else if (d.clientX || d.clientY) {
                var n = document.documentElement;
                e = d.clientX + document.body.scrollLeft + n.scrollLeft,
                f = d.clientY + document.body.scrollTop + n.scrollTop
            }
            g = d.pointerId || d.identifier || b,
            h.push(new j(e,f,g,k))
        }
        return h
    }
    function i(a) {
        if (0 === a.type.indexOf("touch"))
            return k.TOUCH;
        if (0 === a.type.indexOf("mouse"))
            return k.MOUSE;
        var b = a.originalEvent;
        switch (b.pointerType) {
        case b.MSPOINTER_TYPE_MOUSE:
        case "mouse":
            return k.MOUSE;
        case b.MSPOINTER_TYPE_TOUCH:
        case "touch":
            return k.TOUCH;
        case b.MSPOINTER_TYPE_PEN:
        case "pen":
            return k.PEN
        }
        return k.MOUSE
    }
    function j(a, b, c, d) {
        this.x = a,
        this.y = b,
        this.id = c,
        this.type = d
    }
    b.prototype.start = function() {
        var b;
        window.navigator.pointerEnabled ? (this.$el.on(this.listeners.pointer),
        b = this.docListeners.pointer) : window.navigator.msPointerEnabled ? (this.$el.on(this.listeners.msPointer),
        b = this.docListeners.msPointer) : ("ontouchstart" in window && this.$el.on(this.listeners.touch),
        this.$el.on(this.listeners.mouse),
        this.mouseEventsEnabled = !0,
        b = this.docListeners.mouse),
        a(document).on(b),
        this.useTopDocument && a(top.document).on(b)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners.msPointer).off(this.listeners.pointer).off(this.listeners.touch).off(this.listeners.mouse),
        a(document).off(this.docListeners.msPointer).off(this.docListeners.pointer).off(this.docListeners.mouse),
        this.useTopDocument && a(top.document).off(this.docListeners.msPointer).off(this.docListeners.pointer).off(this.docListeners.mouse),
        this.mouseEventsEnabled = !1,
        this.activePointers = []
    }
    ,
    b.prototype.triggerEvent = function(b, c, d, e) {
        this.$el.trigger(new a.Event(b,{
            pointer: c,
            cancelled: e === !0,
            activePointers: this.activePointers,
            originalEvent: d
        }))
    }
    ;
    var k = {
        MOUSE: "mouse",
        TOUCH: "touch",
        PEN: "pen"
    };
    j.prototype.getDistance = function(a) {
        var b = this.x - a.x
          , c = this.y - a.y;
        return Math.sqrt(b * b + c * c)
    }
    ,
    j.prototype.indexIn = function(a) {
        for (var b = 0, c = a.length; c > b; b++)
            if (a[b].id === this.id)
                return b;
        return -1
    }
    ,
    PxTouch.registerSpecialEvents("pxpointers", ["pxpointerstart", "pxpointermove", "pxpointerend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.paths = [];
        var d = a.proxy(c, this);
        this.listeners = {
            pxpointerstart: d,
            pxpointermove: d,
            pxpointerend: d
        }
    }
    function c(b) {
        var c, e, f, g, h, i = b.pointer, j = this.paths.length, k = 0;
        for (g = 0; j > g; g++)
            c = this.paths[g],
            c.isActive && k++,
            c.id === i.id && (h = g,
            e = c);
        b.cancelled ? e && (this.paths.splice(h, 1),
        k -= e.isActive ? 1 : 0) : (e ? (e.movePointer = i,
        e.moveTime = (new Date).getTime()) : (e = new d(i),
        this.paths.push(e),
        k++),
        "pxpointerend" === b.type && e.isActive && (k--,
        e.isActive = !1)),
        f = 0 >= k ? "pxgestureend" : 0 === j ? "pxgesturestart" : "pxgesturemove",
        this.$el.trigger(new a.Event(f,{
            paths: this.paths,
            cancelled: 0 === this.paths.length,
            originalEvent: b.originalEvent
        })),
        0 >= k && (this.paths = [])
    }
    function d(a) {
        this.id = a.id,
        this.startPointer = a,
        this.startTime = (new Date).getTime(),
        this.movePointer = a,
        this.moveTime = this.startTime,
        this.isActive = !0
    }
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.paths = []
    }
    ,
    d.prototype.getLength = function() {
        return Math.abs(this.movePointer.getDistance(this.startPointer))
    }
    ,
    d.prototype.getElapsed = function() {
        return this.moveTime - this.startTime
    }
    ,
    d.prototype.getAngle = function() {
        var a = Math.atan2(this.movePointer.y - this.startPointer.y, this.startPointer.x - this.movePointer.x);
        return 180 * (a / Math.PI) + 180
    }
    ,
    d.prototype.getDirection = function() {
        var a = this.getAngle();
        return a >= 45 && 135 > a ? "up" : a >= 135 && 225 > a ? "left" : a >= 225 && 315 > a ? "down" : "right"
    }
    ,
    d.prototype.angleBetween = function(a) {
        var b = Math.abs(this.getAngle() - a.getAngle());
        return b = Math.min(b, 360 - b)
    }
    ,
    PxTouch.registerSpecialEvents("pxgestures", ["pxgesturestart", "pxgesturemove", "pxgestureend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.activeEventTypes = 0,
        this.state = g.NONE,
        this.holdTimer = null ;
        var d = a.proxy(c, this);
        this.listeners = {
            pxgesturestart: d,
            pxgesturemove: d,
            pxgestureend: d
        }
    }
    function c(a) {
        var b, c, h = a.paths, i = this.state, j = "pxgestureend" === a.type, k = !1;
        a.originalEvent.which ? k = 3 === a.originalEvent.which : a.originalEvent.button && (k = 2 === a.originalEvent.button),
        i === g.INVALID || 1 !== h.length || k || a.cancelled ? b = g.INVALID : (c = h[0].getLength(),
        b = c > e ? g.INVALID : i === g.HOLD ? g.HOLD : g.TAP),
        this.holdTimer || b !== g.TAP ? this.holdTimer && (b === g.INVALID || j) && (clearTimeout(this.holdTimer),
        this.holdTimer = null ) : this.holdTimer = setTimeout(d(a, this), f),
        b === g.HOLD && j || i === g.HOLD && b !== i ? this.triggerEvent("pxholdend", a, b === g.INVALID) : j && b === g.TAP && this.triggerEvent("pxtap", a),
        this.state = j ? g.NONE : b
    }
    function d(b, c) {
        return a.proxy(function() {
            this.state = g.HOLD,
            this.triggerEvent("pxholdstart", b),
            this.holdTimer = null 
        }, c)
    }
    var e = 10
      , f = 500
      , g = {
        NONE: 0,
        INVALID: 1,
        TAP: 2,
        HOLD: 3
    };
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.state = g.NONE
    }
    ,
    b.prototype.triggerEvent = function(b, c, d) {
        var e = c.paths.length > 0 ? c.paths[0].movePointer : null ;
        this.$el.trigger(new a.Event(b,{
            x: e ? e.x : 0,
            y: e ? e.y : 0,
            pointerType: e ? e.type : null ,
            cancelled: d === !0,
            originalEvent: c.originalEvent
        }))
    }
    ,
    PxTouch.registerSpecialEvents("pxtaps", ["pxtap", "pxholdstart", "pxholdend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.activeEventTypes = 0,
        this.state = f.NONE,
        this.firstX = 0,
        this.firstY = 0,
        this.firstTime = 0,
        this.listeners = {
            pxtap: a.proxy(c, this)
        }
    }
    function c(b) {
        var c, g, h, i, j = this.state;
        if (j === f.NONE)
            c = f.SINGLE_TAP;
        else {
            var k = Date.now() - this.firstTime;
            k > e ? c = f.SINGLE_TAP : (h = b.x - this.firstX,
            i = b.y - this.firstY,
            g = Math.abs(Math.sqrt(h * h + i * i)),
            g > d ? c = f.SINGLE_TAP : (this.$el.trigger(new a.Event("pxdoubletap",{
                x: b.x,
                y: b.y,
                pointerType: b.pointerType,
                originalEvent: b.originalEvent
            })),
            c = f.NONE))
        }
        c === f.SINGLE_TAP && (this.firstX = b.x,
        this.firstY = b.y,
        this.firstTime = Date.now()),
        this.state = c
    }
    var d = 20
      , e = 1e3
      , f = {
        NONE: 0,
        SINGLE_TAP: 1
    };
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.state = f.NONE
    }
    ,
    PxTouch.registerSpecialEvents("pxdoubletap", ["pxdoubletap"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.state = g.NONE;
        var d = a.proxy(c, this);
        this.listeners = {
            pxgesturestart: d,
            pxgesturemove: d,
            pxgestureend: d
        }
    }
    function c(b) {
        var c, h, i, j, k, l, m = b.paths, n = this.state, o = "pxgestureend" === b.type;
        if (n !== g.INVALID) {
            if (m.length > 2 || b.cancelled)
                this.state = g.INVALID;
            else if (2 === m.length && (c = m[0],
            h = m[1],
            i = c.getLength(),
            j = h.getLength(),
            (i > d || j > d) && (this.state = i > e && j > e ? c.angleBetween(h) >= f ? g.PINCH : g.INVALID : g.PINCH),
            this.state === g.PINCH)) {
                k = c.movePointer.getDistance(h.movePointer),
                l = c.startPointer.getDistance(h.startPointer);
                var p = {
                    originX: (c.movePointer.x + h.movePointer.x) / 2,
                    originY: (c.movePointer.y + h.movePointer.y) / 2,
                    scale: k / l,
                    paths: m,
                    cancelled: !1,
                    originalEvent: b.originalEvent
                };
                n === g.NONE ? this.$el.trigger(a.Event("pxpinchstart", p)) : o || this.$el.trigger(a.Event("pxpinchmove", p)),
                o && this.$el.trigger(a.Event("pxpinchend", p))
            }
            this.state === g.INVALID && n === g.PINCH && this.$el.trigger(a.Event("pxpinchend", {
                originX: 0,
                originY: 0,
                scale: 0,
                paths: [],
                cancelled: !0,
                originalEvent: b.originalEvent
            }))
        }
        o && (this.state = g.NONE)
    }
    var d = 10
      , e = 15
      , f = 30
      , g = {
        NONE: 0,
        PINCH: 1,
        INVALID: 2
    };
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.state = g.NONE
    }
    ,
    PxTouch.registerSpecialEvents("pxpinch", ["pxpinchstart", "pxpinchmove", "pxpinchend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.state = g.NONE;
        var c = a.proxy(d, this);
        this.listeners = {
            pxgesturestart: c,
            pxgesturemove: c,
            pxgestureend: c
        }
    }
    function c(a) {
        var b, c, d, e, g, h = a.length;
        if (h > 1)
            for (b = 0; h > b; b++)
                if (d = a[b],
                d.isActive) {
                    for (e = !1,
                    c = 0; h > c; c++)
                        if (b !== c && (g = d.movePointer.getDistance(a[c].movePointer),
                        f >= g)) {
                            e = !0;
                            break
                        }
                    if (!e)
                        return !1
                }
        return !0
    }
    function d(b) {
        var d, f = b.paths, h = this.state, i = "pxgestureend" === b.type;
        if (h !== g.INVALID) {
            d = f.length > 0 ? f[0].getLength() : 0;
            var j = {
                paths: f,
                length: d,
                cancelled: b.cancelled,
                originalEvent: b.originalEvent
            };
            b.cancelled || !c(b.paths) ? (this.state = g.INVALID,
            j.cancelled = !0) : this.state === g.NONE ? d > e && (this.state = g.DRAG,
            this.$el.trigger(a.Event("pxdragstart", j))) : i || this.$el.trigger(a.Event("pxdragmove", j)),
            (h === g.DRAG && this.state === g.INVALID || this.state === g.DRAG && i) && this.$el.trigger(a.Event("pxdragend", j))
        }
        i && (this.state = g.NONE)
    }
    var e = 10
      , f = 200
      , g = {
        NONE: 0,
        DRAG: 1,
        INVALID: 2
    };
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.state = g.NONE
    }
    ,
    PxTouch.registerSpecialEvents("pxdrag", ["pxdragstart", "pxdragmove", "pxdragend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    function b(b) {
        this.$el = b,
        this.state = f.NONE,
        this.maxLength = 0,
        this.angle = 0;
        var d = a.proxy(c, this);
        this.listeners = {
            pxdragstart: d,
            pxdragmove: d,
            pxdragend: d
        }
    }
    function c(b) {
        var c, g, h = b.paths, i = this.state, j = "pxdragend" === b.type, k = b.length;
        if (this.state !== f.INVALID) {
            c = h.length > 0 ? h[0].getAngle() : 0;
            var l = {
                length: k,
                angle: c,
                paths: h,
                cancelled: b.cancelled,
                originalEvent: b.originalEvent
            };
            b.cancelled ? this.state = f.INVALID : this.state === f.NONE ? (this.state = f.SWIPE,
            this.maxLength = k,
            this.angle = c,
            this.$el.trigger(a.Event("pxswipestart", l))) : (k >= this.maxLength ? this.maxLength = k : this.maxLength - k > d && (this.state = f.INVALID),
            g = Math.abs(this.angle - c),
            Math.min(g, 360 - g) > e && (this.state = f.INVALID),
            this.state === f.INVALID || j || this.$el.trigger(a.Event("pxswipemove", l))),
            (i === f.SWIPE && this.state === f.INVALID || this.state === f.SWIPE && j) && (l.cancelled = this.state === f.INVALID,
            this.$el.trigger(a.Event("pxswipeend", l)))
        }
        j && (this.state = f.NONE,
        this.maxLength = 0,
        this.angle = 0)
    }
    var d = 20
      , e = 20
      , f = {
        NONE: 0,
        SWIPE: 1,
        INVALID: 2
    };
    b.prototype.start = function() {
        this.$el.on(this.listeners)
    }
    ,
    b.prototype.stop = function() {
        this.$el.off(this.listeners),
        this.state = f.NONE,
        this.maxLength = 0,
        this.angle = 0
    }
    ,
    PxTouch.registerSpecialEvents("pxswipe", ["pxswipestart", "pxswipemove", "pxswipeend"], b)
}(PxTouch.jQuery || jQuery),
function(a) {
    "use strict";
    var b = {}
      , c = Math.max
      , d = Math.min;
    b.c = {},
    b.c.d = a(document),
    b.c.t = function(a) {
        return a.originalEvent.touches.length - 1
    }
    ,
    b.o = function() {
        var c = this;
        this.o = null ,
        this.$ = null ,
        this.i = null ,
        this.g = null ,
        this.v = null ,
        this.cv = null ,
        this.x = 0,
        this.y = 0,
        this.w = 0,
        this.h = 0,
        this.$c = null ,
        this.c = null ,
        this.t = 0,
        this.isInit = !1,
        this.fgColor = null ,
        this.pColor = null ,
        this.dH = null ,
        this.cH = null ,
        this.eH = null ,
        this.rH = null ,
        this.scale = 1,
        this.relative = !1,
        this.relativeWidth = !1,
        this.relativeHeight = !1,
        this.$div = null ,
        this.run = function() {
            var b = function(a, b) {
                var d;
                for (d in b)
                    c.o[d] = b[d];
                c._carve().init(),
                c._configure()._draw()
            }
            ;
            if (!this.$.data("kontroled")) {
                if (this.$.data("kontroled", !0),
                this.extend(),
                this.o = a.extend({
                    min: void 0 !== this.$.data("min") ? this.$.data("min") : 0,
                    max: void 0 !== this.$.data("max") ? this.$.data("max") : 100,
                    stopper: !0,
                    readOnly: this.$.data("readonly") || "readonly" === this.$.attr("readonly"),
                    cursor: this.$.data("cursor") === !0 && 30 || this.$.data("cursor") || 0,
                    thickness: this.$.data("thickness") && Math.max(Math.min(this.$.data("thickness"), 1), .01) || .35,
                    lineCap: this.$.data("linecap") || "butt",
                    width: this.$.data("width") || 200,
                    height: this.$.data("height") || 200,
                    displayInput: null  == this.$.data("displayinput") || this.$.data("displayinput"),
                    displayPrevious: this.$.data("displayprevious"),
                    fgColor: this.$.data("fgcolor") || "#87CEEB",
                    inputColor: this.$.data("inputcolor"),
                    font: this.$.data("font") || "Arial",
                    fontWeight: this.$.data("font-weight") || "bold",
                    inline: !1,
                    step: this.$.data("step") || 1,
                    draw: null ,
                    change: null ,
                    cancel: null ,
                    release: null 
                }, this.o),
                this.o.inputColor || (this.o.inputColor = this.o.fgColor),
                this.$.is("fieldset") ? (this.v = {},
                this.i = this.$.find("input"),
                this.i.each(function(b) {
                    var d = a(this);
                    c.i[b] = d,
                    c.v[b] = d.val(),
                    d.bind("change blur", function() {
                        var a = {};
                        a[b] = d.val(),
                        c.val(a)
                    })
                }),
                this.$.find("legend").remove()) : (this.i = this.$,
                this.v = this.$.val(),
                "" === this.v && (this.v = this.o.min),
                this.$.bind("change blur", function() {
                    c.val(c._validate(c.$.val()))
                })),
                !this.o.displayInput && this.$.hide(),
                this.$c = a(document.createElement("canvas")).attr({
                    width: this.o.width,
                    height: this.o.height
                }),
                this.$div = a('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + 'px;"></div>'),
                this.$.wrap(this.$div).before(this.$c),
                this.$div = this.$.parent(),
                "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.$c[0]),
                this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null ,
                !this.c)
                    throw {
                        name: "CanvasNotSupportedException",
                        message: "Canvas not supported. Please use excanvas on IE8.0.",
                        toString: function() {
                            return this.name + ": " + this.message
                        }
                    };
                return this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1),
                this.relativeWidth = this.o.width % 1 !== 0 && this.o.width.indexOf("%"),
                this.relativeHeight = this.o.height % 1 !== 0 && this.o.height.indexOf("%"),
                this.relative = this.relativeWidth || this.relativeHeight,
                this._carve(),
                this.v instanceof Object ? (this.cv = {},
                this.copy(this.v, this.cv)) : this.cv = this.v,
                this.$.bind("configure", b).parent().bind("configure", b),
                this._listen()._configure()._xy().init(),
                this.isInit = !0,
                this._draw(),
                this
            }
        }
        ,
        this._carve = function() {
            if (this.relative) {
                var a = this.relativeWidth ? this.$div.parent().width() * parseInt(this.o.width) / 100 : this.$div.parent().width()
                  , b = this.relativeHeight ? this.$div.parent().height() * parseInt(this.o.height) / 100 : this.$div.parent().height();
                this.w = this.h = Math.min(a, b)
            } else
                this.w = this.o.width,
                this.h = this.o.height;
            return this.$div.css({
                width: this.w + "px",
                height: this.h + "px"
            }),
            this.$c.attr({
                width: this.w,
                height: this.h
            }),
            1 !== this.scale && (this.$c[0].width = this.$c[0].width * this.scale,
            this.$c[0].height = this.$c[0].height * this.scale,
            this.$c.width(this.w),
            this.$c.height(this.h)),
            this
        }
        ,
        this._draw = function() {
            var a = !0;
            c.g = c.c,
            c.clear(),
            c.dH && (a = c.dH()),
            a !== !1 && c.draw()
        }
        ,
        this._touch = function(a) {
            var d = function(a) {
                var b = c.xy2val(a.originalEvent.touches[c.t].pageX, a.originalEvent.touches[c.t].pageY);
                b != c.cv && (c.cH && c.cH(b) === !1 || (c.change(c._validate(b)),
                c._draw()))
            }
            ;
            return this.t = b.c.t(a),
            d(a),
            b.c.d.bind("touchmove.k", d).bind("touchend.k", function() {
                b.c.d.unbind("touchmove.k touchend.k"),
                c.val(c.cv)
            }),
            this
        }
        ,
        this._mouse = function(a) {
            var d = function(a) {
                var b = c.xy2val(a.pageX, a.pageY);
                b != c.cv && (c.cH && c.cH(b) === !1 || (c.change(c._validate(b)),
                c._draw()))
            }
            ;
            return d(a),
            b.c.d.bind("mousemove.k", d).bind("keyup.k", function(a) {
                if (27 === a.keyCode) {
                    if (b.c.d.unbind("mouseup.k mousemove.k keyup.k"),
                    c.eH && c.eH() === !1)
                        return;
                    c.cancel()
                }
            }).bind("mouseup.k", function(a) {
                b.c.d.unbind("mousemove.k mouseup.k keyup.k"),
                c.val(c.cv)
            }),
            this
        }
        ,
        this._xy = function() {
            var a = this.$c.offset();
            return this.x = a.left,
            this.y = a.top,
            this
        }
        ,
        this._listen = function() {
            return this.o.readOnly ? this.$.attr("readonly", "readonly") : (this.$c.bind("mousedown", function(a) {
                a.preventDefault(),
                c._xy()._mouse(a)
            }).bind("touchstart", function(a) {
                a.preventDefault(),
                c._xy()._touch(a)
            }),
            this.listen()),
            this.relative && a(window).resize(function() {
                c._carve().init(),
                c._draw()
            }),
            this
        }
        ,
        this._configure = function() {
            return this.o.draw && (this.dH = this.o.draw),
            this.o.change && (this.cH = this.o.change),
            this.o.cancel && (this.eH = this.o.cancel),
            this.o.release && (this.rH = this.o.release),
            this.o.displayPrevious ? (this.pColor = this.h2rgba(this.o.fgColor, "0.4"),
            this.fgColor = this.h2rgba(this.o.fgColor, "0.6")) : this.fgColor = this.o.fgColor,
            this
        }
        ,
        this._clear = function() {
            this.$c[0].width = this.$c[0].width
        }
        ,
        this._validate = function(a) {
            return ~~((0 > a ? -.5 : .5) + a / this.o.step) * this.o.step
        }
        ,
        this.listen = function() {}
        ,
        this.extend = function() {}
        ,
        this.init = function() {}
        ,
        this.change = function(a) {}
        ,
        this.val = function(a) {}
        ,
        this.xy2val = function(a, b) {}
        ,
        this.draw = function() {}
        ,
        this.clear = function() {
            this._clear()
        }
        ,
        this.h2rgba = function(a, b) {
            var c;
            return a = a.substring(1, 7),
            c = [parseInt(a.substring(0, 2), 16), parseInt(a.substring(2, 4), 16), parseInt(a.substring(4, 6), 16)],
            "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + b + ")"
        }
        ,
        this.copy = function(a, b) {
            for (var c in a)
                b[c] = a[c]
        }
    }
    ,
    b.Dial = function() {
        b.o.call(this),
        this.startAngle = null ,
        this.xy = null ,
        this.radius = null ,
        this.lineWidth = null ,
        this.cursorExt = null ,
        this.w2 = null ,
        this.PI2 = 2 * Math.PI,
        this.extend = function() {
            this.o = a.extend({
                bgColor: this.$.data("bgcolor") || "#EEEEEE",
                angleOffset: this.$.data("angleoffset") || 0,
                angleArc: this.$.data("anglearc") || 360,
                inline: !0
            }, this.o)
        }
        ,
        this.val = function(a, b) {
            return null  == a ? this.v : void (b !== !1 && a != this.v && this.rH && this.rH(a) === !1 || (this.cv = this.o.stopper ? c(d(a, this.o.max), this.o.min) : a,
            this.v = this.cv,
            this.$.val(this.v),
            this._draw()))
        }
        ,
        this.xy2val = function(a, b) {
            var e, f;
            return e = Math.atan2(a - (this.x + this.w2), -(b - this.y - this.w2)) - this.angleOffset,
            this.angleArc != this.PI2 && 0 > e && e > -.5 ? e = 0 : 0 > e && (e += this.PI2),
            f = ~~(.5 + e * (this.o.max - this.o.min) / this.angleArc) + this.o.min,
            this.o.stopper && (f = c(d(f, this.o.max), this.o.min)),
            f
        }
        ,
        this.listen = function() {
            var b, e, f, g, h = this, i = function(a) {
                a.preventDefault();
                var f = a.originalEvent
                  , g = f.detail || f.wheelDeltaX
                  , i = f.detail || f.wheelDeltaY
                  , j = h._validate(h.$.val()) + (g > 0 || i > 0 ? h.o.step : 0 > g || 0 > i ? -h.o.step : 0);
                j = c(d(j, h.o.max), h.o.min),
                h.val(j, !1),
                h.rH && (clearTimeout(b),
                b = setTimeout(function() {
                    h.rH(j),
                    b = null 
                }, 100),
                e || (e = setTimeout(function() {
                    b && h.rH(j),
                    e = null 
                }, 200)))
            }
            , j = 1, k = {
                37: -h.o.step,
                38: h.o.step,
                39: h.o.step,
                40: -h.o.step
            };
            this.$.bind("keydown", function(b) {
                var e = b.keyCode;
                if (e >= 96 && 105 >= e && (e = b.keyCode = e - 48),
                f = parseInt(String.fromCharCode(e)),
                isNaN(f) && (13 !== e && 8 !== e && 9 !== e && 189 !== e && (190 !== e || h.$.val().match(/\./)) && b.preventDefault(),
                a.inArray(e, [37, 38, 39, 40]) > -1)) {
                    b.preventDefault();
                    var i = parseFloat(h.$.val()) + k[e] * j;
                    h.o.stopper && (i = c(d(i, h.o.max), h.o.min)),
                    h.change(i),
                    h._draw(),
                    g = window.setTimeout(function() {
                        j *= 2
                    }, 30)
                }
            }).bind("keyup", function(a) {
                isNaN(f) ? g && (window.clearTimeout(g),
                g = null ,
                j = 1,
                h.val(h.$.val())) : h.$.val() > h.o.max && h.$.val(h.o.max) || h.$.val() < h.o.min && h.$.val(h.o.min)
            }),
            this.$c.bind("mousewheel DOMMouseScroll", i),
            this.$.bind("mousewheel DOMMouseScroll", i)
        }
        ,
        this.init = function() {
            (this.v < this.o.min || this.v > this.o.max) && (this.v = this.o.min),
            this.$.val(this.v),
            this.w2 = this.w / 2,
            this.cursorExt = this.o.cursor / 100,
            this.xy = this.w2 * this.scale,
            this.lineWidth = this.xy * this.o.thickness,
            this.lineCap = this.o.lineCap,
            this.radius = this.xy - this.lineWidth / 2,
            this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset),
            this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc),
            this.angleOffset = this.o.angleOffset * Math.PI / 180,
            this.angleArc = this.o.angleArc * Math.PI / 180,
            this.startAngle = 1.5 * Math.PI + this.angleOffset,
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
            var a = c(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
            this.o.displayInput && this.i.css({
                width: (this.w / 2 + 4 >> 0) + "px",
                height: (this.w / 3 >> 0) + "px",
                position: "absolute",
                "vertical-align": "middle",
                "margin-top": (this.w / 3 >> 0) + "px",
                "margin-left": "-" + (3 * this.w / 4 + 2 >> 0) + "px",
                border: 0,
                background: "none",
                font: this.o.fontWeight + " " + (this.w / a >> 0) + "px " + this.o.font,
                "text-align": "center",
                color: this.o.inputColor || this.o.fgColor,
                padding: "0px",
                "-webkit-appearance": "none"
            }) || this.i.css({
                width: "0px",
                visibility: "hidden"
            })
        }
        ,
        this.change = function(a) {
            this.cv = a,
            this.$.val(a)
        }
        ,
        this.angle = function(a) {
            return (a - this.o.min) * this.angleArc / (this.o.max - this.o.min)
        }
        ,
        this.draw = function() {
            var a, b, c = this.g, d = this.angle(this.cv), e = this.startAngle, f = e + d, g = 1;
            c.lineWidth = this.lineWidth,
            c.lineCap = this.lineCap,
            this.o.cursor && (e = f - this.cursorExt) && (f += this.cursorExt),
            c.beginPath(),
            c.strokeStyle = this.o.bgColor,
            c.arc(this.xy, this.xy, this.radius, this.endAngle - 1e-5, this.startAngle + 1e-5, !0),
            c.stroke(),
            this.o.displayPrevious && (b = this.startAngle + this.angle(this.v),
            a = this.startAngle,
            this.o.cursor && (a = b - this.cursorExt) && (b += this.cursorExt),
            c.beginPath(),
            c.strokeStyle = this.pColor,
            c.arc(this.xy, this.xy, this.radius, a - 1e-5, b + 1e-5, !1),
            c.stroke(),
            g = this.cv == this.v),
            c.beginPath(),
            c.strokeStyle = g ? this.o.fgColor : this.fgColor,
            c.arc(this.xy, this.xy, this.radius, e - 1e-5, f + 1e-5, !1),
            c.stroke()
        }
        ,
        this.cancel = function() {
            this.val(this.v)
        }
    }
    ,
    a.fn.dial = a.fn.knob = function(c) {
        return this.each(function() {
            var d = new b.Dial;
            d.o = c,
            d.$ = a(this),
            d.run()
        }).parent()
    }
}(jQuery),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    var b, c, d, e, f, g, h, i;
    for (i = window.document,
    h = Object.defineProperty || a.noop,
    f = !1,
    c = ["ms", "moz", "webkit", ""]; c.length; )
        if (b = c.pop(),
        g = b ? b + "Hidden" : "hidden",
        g in i) {
            f = !0;
            break
        }
    f ? b && (a.event.special.visibilitychange = {
        bindType: b + "visibilitychange"
    },
    h(i, "hidden", {
        get: function() {
            return i[g]
        }
    }),
    h(i, "visibilityState", {
        get: function() {
            return i[b + "VisibilityState"]
        }
    })) : (d = i.hidden = !1,
    e = i.visibilityState = "visible",
    h(i, "hidden", {
        get: function() {
            return d
        }
    }),
    h(i, "visibilityState", {
        get: function() {
            return e
        }
    }),
    a(window).bind("focus blur", function(b) {
        var c = "blur" === b.type;
        d !== c && (i.hidden = d = c,
        i.visibilityState = e = c ? "hidden" : "visible",
        a(i).trigger("visibilitychange"))
    }))
}),
function(a, b) {
    "$:nomunge";
    var c, d = a.jQuery || a.Cowboy || (a.Cowboy = {});
    d.throttle = c = function(a, c, e, f) {
        function g() {
            function d() {
                i = +new Date,
                e.apply(j, l)
            }
            function g() {
                h = b
            }
            var j = this
              , k = +new Date - i
              , l = arguments;
            f && !h && d(),
            h && clearTimeout(h),
            f === b && k > a ? d() : c !== !0 && (h = setTimeout(f ? g : d, f === b ? a - k : a))
        }
        var h, i = 0;
        return "boolean" != typeof c && (f = e,
        e = c,
        c = b),
        d.guid && (g.guid = e.guid = e.guid || d.guid++),
        g
    }
    ,
    d.debounce = function(a, d, e) {
        return e === b ? c(a, d, !1) : c(a, e, d !== !1)
    }
}(this),
function() {
    function a(a) {
        var c = {
            r: 0,
            g: 0,
            b: 0
        }
          , e = 1
          , g = !1
          , h = !1;
        return "string" == typeof a && (a = t(a)),
        "object" == typeof a && (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b") ? (c = b(a.r, a.g, a.b),
        g = !0,
        h = "%" === String(a.r).substr(-1) ? "prgb" : "rgb") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v") ? (a.s = q(a.s),
        a.v = q(a.v),
        c = f(a.h, a.s, a.v),
        g = !0,
        h = "hsv") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = q(a.s),
        a.l = q(a.l),
        c = d(a.h, a.s, a.l),
        g = !0,
        h = "hsl"),
        a.hasOwnProperty("a") && (e = a.a)),
        e = j(e),
        {
            ok: g,
            format: a.format || h,
            r: z(255, A(c.r, 0)),
            g: z(255, A(c.g, 0)),
            b: z(255, A(c.b, 0)),
            a: e
        }
    }
    function b(a, b, c) {
        return {
            r: 255 * k(a, 255),
            g: 255 * k(b, 255),
            b: 255 * k(c, 255)
        }
    }
    function c(a, b, c) {
        a = k(a, 255),
        b = k(b, 255),
        c = k(c, 255);
        var d, e, f = A(a, b, c), g = z(a, b, c), h = (f + g) / 2;
        if (f == g)
            d = e = 0;
        else {
            var i = f - g;
            switch (e = h > .5 ? i / (2 - f - g) : i / (f + g),
            f) {
            case a:
                d = (b - c) / i + (c > b ? 6 : 0);
                break;
            case b:
                d = (c - a) / i + 2;
                break;
            case c:
                d = (a - b) / i + 4
            }
            d /= 6
        }
        return {
            h: d,
            s: e,
            l: h
        }
    }
    function d(a, b, c) {
        function d(a, b, c) {
            return 0 > c && (c += 1),
            c > 1 && (c -= 1),
            1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a
        }
        var e, f, g;
        if (a = k(a, 360),
        b = k(b, 100),
        c = k(c, 100),
        0 === b)
            e = f = g = c;
        else {
            var h = .5 > c ? c * (1 + b) : c + b - c * b
              , i = 2 * c - h;
            e = d(i, h, a + 1 / 3),
            f = d(i, h, a),
            g = d(i, h, a - 1 / 3)
        }
        return {
            r: 255 * e,
            g: 255 * f,
            b: 255 * g
        }
    }
    function e(a, b, c) {
        a = k(a, 255),
        b = k(b, 255),
        c = k(c, 255);
        var d, e, f = A(a, b, c), g = z(a, b, c), h = f, i = f - g;
        if (e = 0 === f ? 0 : i / f,
        f == g)
            d = 0;
        else {
            switch (f) {
            case a:
                d = (b - c) / i + (c > b ? 6 : 0);
                break;
            case b:
                d = (c - a) / i + 2;
                break;
            case c:
                d = (a - b) / i + 4
            }
            d /= 6
        }
        return {
            h: d,
            s: e,
            v: h
        }
    }
    function f(a, b, c) {
        a = 6 * k(a, 360),
        b = k(b, 100),
        c = k(c, 100);
        var d = x.floor(a)
          , e = a - d
          , f = c * (1 - b)
          , g = c * (1 - e * b)
          , h = c * (1 - (1 - e) * b)
          , i = d % 6
          , j = [c, g, f, f, h, c][i]
          , l = [h, c, c, g, f, f][i]
          , m = [f, f, h, c, c, g][i];
        return {
            r: 255 * j,
            g: 255 * l,
            b: 255 * m
        }
    }
    function g(a, b, c, d) {
        var e = [p(y(a).toString(16)), p(y(b).toString(16)), p(y(c).toString(16))];
        return d && e[0].charAt(0) == e[0].charAt(1) && e[1].charAt(0) == e[1].charAt(1) && e[2].charAt(0) == e[2].charAt(1) ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0) : e.join("")
    }
    function h(a, b, c, d) {
        var e = [p(r(d)), p(y(a).toString(16)), p(y(b).toString(16)), p(y(c).toString(16))];
        return e.join("")
    }
    function i(a) {
        var b = {};
        for (var c in a)
            a.hasOwnProperty(c) && (b[a[c]] = c);
        return b
    }
    function j(a) {
        return a = parseFloat(a),
        (isNaN(a) || 0 > a || a > 1) && (a = 1),
        a
    }
    function k(a, b) {
        n(a) && (a = "100%");
        var c = o(a);
        return a = z(b, A(0, parseFloat(a))),
        c && (a = parseInt(a * b, 10) / 100),
        x.abs(a - b) < 1e-6 ? 1 : a % b / parseFloat(b)
    }
    function l(a) {
        return z(1, A(0, a))
    }
    function m(a) {
        return parseInt(a, 16)
    }
    function n(a) {
        return "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a)
    }
    function o(a) {
        return "string" == typeof a && -1 != a.indexOf("%")
    }
    function p(a) {
        return 1 == a.length ? "0" + a : "" + a
    }
    function q(a) {
        return 1 >= a && (a = 100 * a + "%"),
        a
    }
    function r(a) {
        return Math.round(255 * parseFloat(a)).toString(16)
    }
    function s(a) {
        return m(a) / 255
    }
    function t(a) {
        a = a.replace(u, "").replace(v, "").toLowerCase();
        var b = !1;
        if (D[a])
            a = D[a],
            b = !0;
        else if ("transparent" == a)
            return {
                r: 0,
                g: 0,
                b: 0,
                a: 0,
                format: "name"
            };
        var c;
        return (c = F.rgb.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3]
        } : (c = F.rgba.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3],
            a: c[4]
        } : (c = F.hsl.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3]
        } : (c = F.hsla.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3],
            a: c[4]
        } : (c = F.hsv.exec(a)) ? {
            h: c[1],
            s: c[2],
            v: c[3]
        } : (c = F.hex8.exec(a)) ? {
            a: s(c[1]),
            r: m(c[2]),
            g: m(c[3]),
            b: m(c[4]),
            format: b ? "name" : "hex8"
        } : (c = F.hex6.exec(a)) ? {
            r: m(c[1]),
            g: m(c[2]),
            b: m(c[3]),
            format: b ? "name" : "hex"
        } : (c = F.hex3.exec(a)) ? {
            r: m(c[1] + "" + c[1]),
            g: m(c[2] + "" + c[2]),
            b: m(c[3] + "" + c[3]),
            format: b ? "name" : "hex"
        } : !1
    }
    var u = /^[\s,#]+/
      , v = /\s+$/
      , w = 0
      , x = Math
      , y = x.round
      , z = x.min
      , A = x.max
      , B = x.random
      , C = function G(b, c) {
        if (b = b ? b : "",
        c = c || {},
        b instanceof G)
            return b;
        if (!(this instanceof G))
            return new G(b,c);
        var d = a(b);
        this._r = d.r,
        this._g = d.g,
        this._b = d.b,
        this._a = d.a,
        this._roundA = y(100 * this._a) / 100,
        this._format = c.format || d.format,
        this._gradientType = c.gradientType,
        this._r < 1 && (this._r = y(this._r)),
        this._g < 1 && (this._g = y(this._g)),
        this._b < 1 && (this._b = y(this._b)),
        this._ok = d.ok,
        this._tc_id = w++
    }
    ;
    C.prototype = {
        getAlpha: function() {
            return this._a
        },
        setAlpha: function(a) {
            this._a = j(a),
            this._roundA = y(100 * this._a) / 100
        },
        toHsv: function() {
            var a = e(this._r, this._g, this._b);
            return {
                h: 360 * a.h,
                s: a.s,
                v: a.v,
                a: this._a
            }
        },
        toHsvString: function() {
            var a = e(this._r, this._g, this._b)
              , b = y(360 * a.h)
              , c = y(100 * a.s)
              , d = y(100 * a.v);
            return 1 == this._a ? "hsv(" + b + ", " + c + "%, " + d + "%)" : "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")"
        },
        toHsl: function() {
            var a = c(this._r, this._g, this._b);
            return {
                h: 360 * a.h,
                s: a.s,
                l: a.l,
                a: this._a
            }
        },
        toHslString: function() {
            var a = c(this._r, this._g, this._b)
              , b = y(360 * a.h)
              , d = y(100 * a.s)
              , e = y(100 * a.l);
            return 1 == this._a ? "hsl(" + b + ", " + d + "%, " + e + "%)" : "hsla(" + b + ", " + d + "%, " + e + "%, " + this._roundA + ")"
        },
        toHex: function(a) {
            return g(this._r, this._g, this._b, a)
        },
        toHexString: function(a) {
            return "#" + this.toHex(a)
        },
        toHex8: function() {
            return h(this._r, this._g, this._b, this._a)
        },
        toHex8String: function() {
            return "#" + this.toHex8()
        },
        toRgb: function() {
            return {
                r: y(this._r),
                g: y(this._g),
                b: y(this._b),
                a: this._a
            }
        },
        toRgbString: function() {
            return 1 == this._a ? "rgb(" + y(this._r) + ", " + y(this._g) + ", " + y(this._b) + ")" : "rgba(" + y(this._r) + ", " + y(this._g) + ", " + y(this._b) + ", " + this._roundA + ")"
        },
        toPercentageRgb: function() {
            return {
                r: y(100 * k(this._r, 255)) + "%",
                g: y(100 * k(this._g, 255)) + "%",
                b: y(100 * k(this._b, 255)) + "%",
                a: this._a
            }
        },
        toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + y(100 * k(this._r, 255)) + "%, " + y(100 * k(this._g, 255)) + "%, " + y(100 * k(this._b, 255)) + "%)" : "rgba(" + y(100 * k(this._r, 255)) + "%, " + y(100 * k(this._g, 255)) + "%, " + y(100 * k(this._b, 255)) + "%, " + this._roundA + ")"
        },
        toName: function() {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : E[g(this._r, this._g, this._b, !0)] || !1
        },
        toFilter: function(a) {
            var b = "#" + h(this._r, this._g, this._b, this._a)
              , c = b
              , d = this._gradientType ? "GradientType = 1, " : "";
            if (a) {
                var e = C(a);
                c = e.toHex8String()
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + b + ",endColorstr=" + c + ")"
        },
        toString: function(a) {
            var b = !!a;
            a = a || this._format;
            var c = !1
              , d = !b && this._a < 1 && this._a > 0
              , e = d && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
            return e ? this.toRgbString() : ("rgb" === a && (c = this.toRgbString()),
            "prgb" === a && (c = this.toPercentageRgbString()),
            ("hex" === a || "hex6" === a) && (c = this.toHexString()),
            "hex3" === a && (c = this.toHexString(!0)),
            "hex8" === a && (c = this.toHex8String()),
            "name" === a && (c = this.toName()),
            "hsl" === a && (c = this.toHslString()),
            "hsv" === a && (c = this.toHsvString()),
            c || this.toHexString())
        }
    },
    C.fromRatio = function(a, b) {
        if ("object" == typeof a) {
            var c = {};
            for (var d in a)
                a.hasOwnProperty(d) && ("a" === d ? c[d] = a[d] : c[d] = q(a[d]));
            a = c
        }
        return C(a, b)
    }
    ,
    C.equals = function(a, b) {
        return a && b ? C(a).toRgbString() == C(b).toRgbString() : !1
    }
    ,
    C.random = function() {
        return C.fromRatio({
            r: B(),
            g: B(),
            b: B()
        })
    }
    ,
    C.desaturate = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.s -= b / 100,
        c.s = l(c.s),
        C(c)
    }
    ,
    C.saturate = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.s += b / 100,
        c.s = l(c.s),
        C(c)
    }
    ,
    C.greyscale = function(a) {
        return C.desaturate(a, 100)
    }
    ,
    C.lighten = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.l += b / 100,
        c.l = l(c.l),
        C(c)
    }
    ,
    C.darken = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.l -= b / 100,
        c.l = l(c.l),
        C(c)
    }
    ,
    C.complement = function(a) {
        var b = C(a).toHsl();
        return b.h = (b.h + 180) % 360,
        C(b)
    }
    ,
    C.triad = function(a) {
        var b = C(a).toHsl()
          , c = b.h;
        return [C(a), C({
            h: (c + 120) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 240) % 360,
            s: b.s,
            l: b.l
        })]
    }
    ,
    C.tetrad = function(a) {
        var b = C(a).toHsl()
          , c = b.h;
        return [C(a), C({
            h: (c + 90) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 180) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 270) % 360,
            s: b.s,
            l: b.l
        })]
    }
    ,
    C.splitcomplement = function(a) {
        var b = C(a).toHsl()
          , c = b.h;
        return [C(a), C({
            h: (c + 72) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 216) % 360,
            s: b.s,
            l: b.l
        })]
    }
    ,
    C.analogous = function(a, b, c) {
        b = b || 6,
        c = c || 30;
        var d = C(a).toHsl()
          , e = 360 / c
          , f = [C(a)];
        for (d.h = (d.h - (e * b >> 1) + 720) % 360; --b; )
            d.h = (d.h + e) % 360,
            f.push(C(d));
        return f
    }
    ,
    C.monochromatic = function(a, b) {
        b = b || 6;
        for (var c = C(a).toHsv(), d = c.h, e = c.s, f = c.v, g = [], h = 1 / b; b--; )
            g.push(C({
                h: d,
                s: e,
                v: f
            })),
            f = (f + h) % 1;
        return g
    }
    ,
    C.readability = function(a, b) {
        var c = C(a).toRgb()
          , d = C(b).toRgb()
          , e = (299 * c.r + 587 * c.g + 114 * c.b) / 1e3
          , f = (299 * d.r + 587 * d.g + 114 * d.b) / 1e3
          , g = Math.max(c.r, d.r) - Math.min(c.r, d.r) + Math.max(c.g, d.g) - Math.min(c.g, d.g) + Math.max(c.b, d.b) - Math.min(c.b, d.b);
        return {
            brightness: Math.abs(e - f),
            color: g
        }
    }
    ,
    C.readable = function(a, b) {
        var c = C.readability(a, b);
        return c.brightness > 125 && c.color > 500
    }
    ,
    C.mostReadable = function(a, b) {
        for (var c = null , d = 0, e = !1, f = 0; f < b.length; f++) {
            var g = C.readability(a, b[f])
              , h = g.brightness > 125 && g.color > 500
              , i = 3 * (g.brightness / 125) + g.color / 500;
            (h && !e || h && e && i > d || !h && !e && i > d) && (e = h,
            d = i,
            c = C(b[f]))
        }
        return c
    }
    ;
    var D = C.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    }
      , E = C.hexNames = i(D)
      , F = function() {
        var a = "[-\\+]?\\d+%?"
          , b = "[-\\+]?\\d*\\.\\d+%?"
          , c = "(?:" + b + ")|(?:" + a + ")"
          , d = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?"
          , e = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?";
        return {
            rgb: new RegExp("rgb" + d),
            rgba: new RegExp("rgba" + e),
            hsl: new RegExp("hsl" + d),
            hsla: new RegExp("hsla" + e),
            hsv: new RegExp("hsv" + d),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        }
    }();
    "undefined" != typeof module && module.exports ? module.exports = C : "function" == typeof define && define.amd ? define(function() {
        return C
    }) : window.tinycolor = C
}(),
/*Xiaosong    
function() {
    var a = function(a, b, c) {
        var d = !1
          , e = document.getElementById(a)
          , f = e.getContext("2d")
          , g = e.width = b
          , h = e.height = c
          , i = []
          , j = 0
          , k = {
            count: 4,
            range: {
                x: 0,
                y: 12
            },
            duration: {
                min: 20,
                max: 30
            },
            thickness: 0,
            strokeColor: "#444",
            level: .5,
            curved: !0
        }
          , l = function(a, b) {
            return Math.floor(Math.random() * (b - a + 1) + a)
        }
          , m = function(a, b, c, d) {
            return (a /= d / 2) < 1 ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b
        }
        ;
        f.lineJoin = "round",
        f.fillStyle = "#2884CB";
        var n = function(a) {
            this.anchorX = a.x,
            this.anchorY = a.y,
            this.x = a.x,
            this.y = a.y,
            this.setTarget()
        }
        ;
        n.prototype.setTarget = function() {
            this.initialX = this.x,
            this.initialY = this.y,
            this.targetX = this.anchorX + l(0, 2 * k.range.x) - k.range.x,
            this.targetY = this.anchorY + l(0, 2 * k.range.y) - k.range.y,
            this.tick = 0,
            this.duration = l(k.duration.min, k.duration.max)
        }
        ,
        n.prototype.update = function() {
            var a = this.targetX - this.x
              , b = this.targetY - this.y
              , c = Math.sqrt(a * a + b * b);
            if (Math.abs(c) <= 0)
                this.setTarget();
            else {
                var d = this.tick
                  , e = this.initialY
                  , f = this.targetY - this.initialY
                  , g = this.duration;
                this.y = m(d, e, f, g),
                e = this.initialX,
                f = this.targetX - this.initialX,
                g = this.duration,
                this.x = m(d, e, f, g),
                this.tick++
            }
        }
        ,
        n.prototype.render = function() {
            f.beginPath(),
            f.arc(this.x, this.y, 3, 0, 2 * Math.PI, !1),
            f.fillStyle = "#000",
            f.fill()
        }
        ;
        for (var o = function() {
            for (var a = i.length; a--; )
                i[a].update()
        }
        , p = function() {
            f.beginPath();
            var a = i.length;
            f.moveTo(i[0].x, i[0].y);
            var b;
            for (b = 0; a - 1 > b; b++) {
                var c = (i[b].x + i[b + 1].x) / 2
                  , d = (i[b].y + i[b + 1].y) / 2;
                f.quadraticCurveTo(i[b].x, i[b].y, c, d)
            }
            f.lineTo(-k.range.x - k.thickness, h + k.thickness),
            f.lineTo(g + k.range.x + k.thickness, h + k.thickness),
            f.closePath(),
            f.fill()
        }
        , q = function() {
            f.clearRect(0, 0, g, h)
        }
        , r = function() {
            d && (u(r, e),
            j++,
            q(),
            o(),
            p())
        }
        , s = k.count + 2, t = (g + 2 * k.range.x) / (k.count - 1); s--; )
            i.push(new n({
                x: t * (s - 1) - k.range.x,
                y: h - h * k.level
            }));
        var u = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                window.setTimeout(a, 1e3 / 60)
            }
        }();
        this.start = function() {
            d = !0,
            r()
        }
        ,
        this.stop = function() {
            d = !1
        }
    }
    ;
    window.waveMaker = a
}(),
Xiaosong*/    
void 0 === Date.now && (Date.now = function() {
    return (new Date).valueOf()
}
);
var TWEEN = TWEEN || function() {
    var a = [];
    return {
        REVISION: "12",
        getAll: function() {
            return a
        },
        removeAll: function() {
            a = []
        },
        add: function(b) {
            a.push(b)
        },
        remove: function(b) {
            b = a.indexOf(b),
            -1 !== b && a.splice(b, 1)
        },
        update: function(b) {
            if (0 === a.length)
                return !1;
            for (var c = 0, b = void 0 !== b ? b : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); c < a.length; )
                a[c].update(b) ? c++ : a.splice(c, 1);
            return !0
        }
    }
}();
TWEEN.Tween = function(a) {
    var b, c = {}, d = {}, e = {}, f = 1e3, g = 0, h = !1, i = !1, j = 0, k = null , l = TWEEN.Easing.Linear.None, m = TWEEN.Interpolation.Linear, n = [], o = null , p = !1, q = null , r = null ;
    for (b in a)
        c[b] = parseFloat(a[b], 10);
    this.to = function(a, b) {
        return void 0 !== b && (f = b),
        d = a,
        this
    }
    ,
    this.start = function(b) {
        TWEEN.add(this),
        i = !0,
        p = !1,
        k = void 0 !== b ? b : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(),
        k += j;
        for (var f in d) {
            if (d[f] instanceof Array) {
                if (0 === d[f].length)
                    continue;d[f] = [a[f]].concat(d[f])
            }
            c[f] = a[f],
            0 == c[f] instanceof Array && (c[f] *= 1),
            e[f] = c[f] || 0
        }
        return this
    }
    ,
    this.stop = function() {
        return i ? (TWEEN.remove(this),
        i = !1,
        this.stopChainedTweens(),
        this) : this
    }
    ,
    this.stopChainedTweens = function() {
        for (var a = 0, b = n.length; b > a; a++)
            n[a].stop()
    }
    ,
    this.delay = function(a) {
        return j = a,
        this
    }
    ,
    this.repeat = function(a) {
        return g = a,
        this
    }
    ,
    this.yoyo = function(a) {
        return h = a,
        this
    }
    ,
    this.easing = function(a) {
        return l = a,
        this
    }
    ,
    this.interpolation = function(a) {
        return m = a,
        this
    }
    ,
    this.chain = function() {
        return n = arguments,
        this
    }
    ,
    this.onStart = function(a) {
        return o = a,
        this
    }
    ,
    this.onUpdate = function(a) {
        return q = a,
        this
    }
    ,
    this.onComplete = function(a) {
        return r = a,
        this
    }
    ,
    this.update = function(b) {
        var i;
        if (k > b)
            return !0;
        !1 === p && (null  !== o && o.call(a),
        p = !0);
        var s = (b - k) / f
          , s = s > 1 ? 1 : s
          , t = l(s);
        for (i in d) {
            var u = c[i] || 0
              , v = d[i];
            v instanceof Array ? a[i] = m(v, t) : ("string" == typeof v && (v = u + parseFloat(v, 10)),
            "number" == typeof v && (a[i] = u + (v - u) * t))
        }
        if (null  !== q && q.call(a, t),
        1 == s) {
            if (!(g > 0)) {
                for (null  !== r && r.call(a),
                i = 0,
                s = n.length; s > i; i++)
                    n[i].start(b);
                return !1
            }
            isFinite(g) && g--;
            for (i in e)
                "string" == typeof d[i] && (e[i] += parseFloat(d[i], 10)),
                h && (s = e[i],
                e[i] = d[i],
                d[i] = s),
                c[i] = e[i];
            k = b + j
        }
        return !0
    }
}
,
TWEEN.Easing = {
    Linear: {
        None: function(a) {
            return a
        }
    },
    Quadratic: {
        In: function(a) {
            return a * a
        },
        Out: function(a) {
            return a * (2 - a)
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
        }
    },
    Cubic: {
        In: function(a) {
            return a * a * a
        },
        Out: function(a) {
            return --a * a * a + 1
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
        }
    },
    Quartic: {
        In: function(a) {
            return a * a * a * a
        },
        Out: function(a) {
            return 1 - --a * a * a * a
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
        }
    },
    Quintic: {
        In: function(a) {
            return a * a * a * a * a
        },
        Out: function(a) {
            return --a * a * a * a * a + 1
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
        }
    },
    Sinusoidal: {
        In: function(a) {
            return 1 - Math.cos(a * Math.PI / 2)
        },
        Out: function(a) {
            return Math.sin(a * Math.PI / 2)
        },
        InOut: function(a) {
            return .5 * (1 - Math.cos(Math.PI * a))
        }
    },
    Exponential: {
        In: function(a) {
            return 0 === a ? 0 : Math.pow(1024, a - 1)
        },
        Out: function(a) {
            return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
        },
        InOut: function(a) {
            return 0 === a ? 0 : 1 === a ? 1 : 1 > (a *= 2) ? .5 * Math.pow(1024, a - 1) : .5 * (-Math.pow(2, -10 * (a - 1)) + 2)
        }
    },
    Circular: {
        In: function(a) {
            return 1 - Math.sqrt(1 - a * a)
        },
        Out: function(a) {
            return Math.sqrt(1 - --a * a)
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        }
    },
    Elastic: {
        In: function(a) {
            var b, c = .1;
            return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1,
            b = .1) : b = .4 * Math.asin(1 / c) / (2 * Math.PI),
            -(c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / .4)))
        },
        Out: function(a) {
            var b, c = .1;
            return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1,
            b = .1) : b = .4 * Math.asin(1 / c) / (2 * Math.PI),
            c * Math.pow(2, -10 * a) * Math.sin(2 * (a - b) * Math.PI / .4) + 1)
        },
        InOut: function(a) {
            var b, c = .1;
            return 0 === a ? 0 : 1 === a ? 1 : (!c || 1 > c ? (c = 1,
            b = .1) : b = .4 * Math.asin(1 / c) / (2 * Math.PI),
            1 > (a *= 2) ? -.5 * c * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / .4) : .5 * c * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a - b) * Math.PI / .4) + 1);
        }
    },
    Back: {
        In: function(a) {
            return a * a * (2.70158 * a - 1.70158)
        },
        Out: function(a) {
            return --a * a * (2.70158 * a + 1.70158) + 1
        },
        InOut: function(a) {
            return 1 > (a *= 2) ? .5 * a * a * (3.5949095 * a - 2.5949095) : .5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
        }
    },
    Bounce: {
        In: function(a) {
            return 1 - TWEEN.Easing.Bounce.Out(1 - a)
        },
        Out: function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        },
        InOut: function(a) {
            return .5 > a ? .5 * TWEEN.Easing.Bounce.In(2 * a) : .5 * TWEEN.Easing.Bounce.Out(2 * a - 1) + .5
        }
    }
},
TWEEN.Interpolation = {
    Linear: function(a, b) {
        var c = a.length - 1
          , d = c * b
          , e = Math.floor(d)
          , f = TWEEN.Interpolation.Utils.Linear;
        return 0 > b ? f(a[0], a[1], d) : b > 1 ? f(a[c], a[c - 1], c - d) : f(a[e], a[e + 1 > c ? c : e + 1], d - e)
    },
    Bezier: function(a, b) {
        var c, d = 0, e = a.length - 1, f = Math.pow, g = TWEEN.Interpolation.Utils.Bernstein;
        for (c = 0; e >= c; c++)
            d += f(1 - b, e - c) * f(b, c) * a[c] * g(e, c);
        return d
    },
    CatmullRom: function(a, b) {
        var c = a.length - 1
          , d = c * b
          , e = Math.floor(d)
          , f = TWEEN.Interpolation.Utils.CatmullRom;
        return a[0] === a[c] ? (0 > b && (e = Math.floor(d = c * (1 + b))),
        f(a[(e - 1 + c) % c], a[e], a[(e + 1) % c], a[(e + 2) % c], d - e)) : 0 > b ? a[0] - (f(a[0], a[0], a[1], a[1], -d) - a[0]) : b > 1 ? a[c] - (f(a[c], a[c], a[c - 1], a[c - 1], d - c) - a[c]) : f(a[e ? e - 1 : 0], a[e], a[e + 1 > c ? c : e + 1], a[e + 2 > c ? c : e + 2], d - e)
    },
    Utils: {
        Linear: function(a, b, c) {
            return (b - a) * c + a
        },
        Bernstein: function(a, b) {
            var c = TWEEN.Interpolation.Utils.Factorial;
            return c(a) / c(b) / c(a - b)
        },
        Factorial: function() {
            var a = [1];
            return function(b) {
                var c, d = 1;
                if (a[b])
                    return a[b];
                for (c = b; c > 1; c--)
                    d *= c;
                return a[b] = d
            }
        }(),
        CatmullRom: function(a, b, c, d, e) {
            var a = .5 * (c - a)
              , d = .5 * (d - b)
              , f = e * e;
            return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
        }
    }
},
function(a, b) {
    function c(c, d) {
        function e(a) {
            return ja.preferFlash && ea && !ja.ignoreFlash && ja.flash[a] !== b && ja.flash[a]
        }
        function f(a) {
            return function(b) {
                var c = this._s;
                return c && c._a ? a.call(this, b) : null 
            }
        }
        this.setupOptions = {
            url: c || null ,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null ,
            html5PollingInterval: null ,
            flashLoadTimeout: 1e3,
            wmode: null ,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !1,
            noSWFCache: !1,
            idPrefix: "sound"
        },
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null ,
            loops: 1,
            onid3: null ,
            onload: null ,
            whileloading: null ,
            onplay: null ,
            onpause: null ,
            onresume: null ,
            whileplaying: null ,
            onposition: null ,
            onstop: null ,
            onfailure: null ,
            onfinish: null ,
            multiShot: !0,
            multiShotEvents: !1,
            position: null ,
            pan: 0,
            stream: !0,
            to: null ,
            type: null ,
            usePolicyFile: !1,
            volume: 100
        },
        this.flash9Options = {
            isMovieStar: null ,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null ,
            ondataerror: null 
        },
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null ,
            onconnect: null ,
            duration: null 
        },
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: !1
            },
            opus: {
                type: ["audio/ogg; codecs=opus", "audio/opus"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            }
        },
        this.movieID = "sm2-container",
        this.id = d || "sm2movie",
        this.debugID = "soundmanager-debug",
        this.debugURLParam = /([#?&])debug=1/i,
        this.versionNumber = "V2.97a.20131201",
        this.altURL = this.movieURL = this.version = null ,
        this.enabled = this.swfLoaded = !1,
        this.oMC = null ,
        this.sounds = {},
        this.soundIDs = [],
        this.didFlashBlock = this.muted = !1,
        this.filePattern = null ,
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        },
        this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        },
        this.sandbox = {},
        this.html5 = {
            usingFlash: null 
        },
        this.flash = {},
        this.ignoreFlash = this.html5Only = !1;
        var g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja = this, ka = null , la = null , ma = navigator.userAgent, na = a.location.href.toString(), oa = document, pa = [], qa = !1, ra = !1, sa = !1, ta = !1, ua = !1, va = null , wa = null , xa = !1, ya = !1, za = 0, Aa = null , Ba = [], Ca = null , Da = Array.prototype.slice, Ea = !1, Fa = 0, Ga = ma.match(/(ipad|iphone|ipod)/i), Ha = ma.match(/android/i), Ia = ma.match(/msie/i), Ja = ma.match(/webkit/i), Ka = ma.match(/safari/i) && !ma.match(/chrome/i), La = ma.match(/opera/i), Ma = ma.match(/(mobile|pre\/|xoom)/i) || Ga || Ha, Na = !na.match(/usehtml5audio/i) && !na.match(/sm2\-ignorebadua/i) && Ka && !ma.match(/silk/i) && ma.match(/OS X 10_6_([3-7])/i), Oa = oa.hasFocus !== b ? oa.hasFocus() : null , Pa = Ka && (oa.hasFocus === b || !oa.hasFocus()), Qa = !Pa, Ra = /(mp3|mp4|mpa|m4a|m4b)/i, Sa = oa.location ? oa.location.protocol.match(/http/i) : null , Ta = Sa ? "" : "http://", Ua = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i, Va = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "), Wa = RegExp("\\.(" + Va.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,
        this.useAltURL = !Sa;
        var Xa;
        try {
            Xa = Audio !== b && (La && opera !== b && 10 > opera.version() ? new Audio(null ) : new Audio).canPlayType !== b
        } catch (Ya) {
            Xa = !1
        }
        this.hasHTML5 = Xa,
        this.setup = function(a) {
            var c = !ja.url;
            return a !== b && sa && Ca && ja.ok(),
            o(a),
            a && (c && D && a.url !== b && ja.beginDelayedInit(),
            !D && a.url !== b && "complete" === oa.readyState && setTimeout(B, 1)),
            ja
        }
        ,
        this.supported = this.ok = function() {
            return Ca ? sa && !ta : ja.useHTML5Audio && ja.hasHTML5
        }
        ,
        this.getMovie = function(b) {
            return h(b) || oa[b] || a[b]
        }
        ,
        this.createSound = function(a, c) {
            function d() {
                return e = P(e),
                ja.sounds[e.id] = new g(e),
                ja.soundIDs.push(e.id),
                ja.sounds[e.id]
            }
            var e, f = null ;
            if (!sa || !ja.ok())
                return !1;
            if (c !== b && (a = {
                id: a,
                url: c
            }),
            e = n(a),
            e.url = V(e.url),
            void 0 === e.id && (e.id = ja.setupOptions.idPrefix + Fa++),
            R(e.id, !0))
                return ja.sounds[e.id];
            if (Y(e))
                f = d(),
                f._setup_html5(e);
            else {
                if (ja.html5Only || ja.html5.usingFlash && e.url && e.url.match(/data\:/i))
                    return d();
                l > 8 && null  === e.isMovieStar && (e.isMovieStar = !(!e.serverURL && !(e.type && e.type.match(Ua) || e.url && e.url.match(Wa)))),
                e = Q(e, void 0),
                f = d(),
                8 === l ? la._createSound(e.id, e.loops || 1, e.usePolicyFile) : (la._createSound(e.id, e.url, e.usePeakData, e.useWaveformData, e.useEQData, e.isMovieStar, e.isMovieStar ? e.bufferTime : !1, e.loops || 1, e.serverURL, e.duration || null , e.autoPlay, !0, e.autoLoad, e.usePolicyFile),
                e.serverURL || (f.connected = !0,
                e.onconnect && e.onconnect.apply(f))),
                !e.serverURL && (e.autoLoad || e.autoPlay) && f.load(e)
            }
            return !e.serverURL && e.autoPlay && f.play(),
            f
        }
        ,
        this.destroySound = function(a, b) {
            if (!R(a))
                return !1;
            var c, d = ja.sounds[a];
            for (d._iO = {},
            d.stop(),
            d.unload(),
            c = 0; c < ja.soundIDs.length; c++)
                if (ja.soundIDs[c] === a) {
                    ja.soundIDs.splice(c, 1);
                    break
                }
            return b || d.destruct(!0),
            delete ja.sounds[a],
            !0
        }
        ,
        this.load = function(a, b) {
            return R(a) ? ja.sounds[a].load(b) : !1
        }
        ,
        this.unload = function(a) {
            return R(a) ? ja.sounds[a].unload() : !1
        }
        ,
        this.onposition = this.onPosition = function(a, b, c, d) {
            return R(a) ? ja.sounds[a].onposition(b, c, d) : !1
        }
        ,
        this.clearOnPosition = function(a, b, c) {
            return R(a) ? ja.sounds[a].clearOnPosition(b, c) : !1
        }
        ,
        this.start = this.play = function(a, b) {
            var c = null 
              , d = b && !(b instanceof Object);
            if (!sa || !ja.ok())
                return !1;
            if (R(a, d))
                d && (b = {
                    url: b
                });
            else {
                if (!d)
                    return !1;
                d && (b = {
                    url: b
                }),
                b && b.url && (b.id = a,
                c = ja.createSound(b).play())
            }
            return null  === c && (c = ja.sounds[a].play(b)),
            c
        }
        ,
        this.setPosition = function(a, b) {
            return R(a) ? ja.sounds[a].setPosition(b) : !1
        }
        ,
        this.stop = function(a) {
            return R(a) ? ja.sounds[a].stop() : !1
        }
        ,
        this.stopAll = function() {
            for (var a in ja.sounds)
                ja.sounds.hasOwnProperty(a) && ja.sounds[a].stop()
        }
        ,
        this.pause = function(a) {
            return R(a) ? ja.sounds[a].pause() : !1
        }
        ,
        this.pauseAll = function() {
            var a;
            for (a = ja.soundIDs.length - 1; a >= 0; a--)
                ja.sounds[ja.soundIDs[a]].pause()
        }
        ,
        this.resume = function(a) {
            return R(a) ? ja.sounds[a].resume() : !1
        }
        ,
        this.resumeAll = function() {
            var a;
            for (a = ja.soundIDs.length - 1; a >= 0; a--)
                ja.sounds[ja.soundIDs[a]].resume()
        }
        ,
        this.togglePause = function(a) {
            return R(a) ? ja.sounds[a].togglePause() : !1
        }
        ,
        this.setPan = function(a, b) {
            return R(a) ? ja.sounds[a].setPan(b) : !1
        }
        ,
        this.setVolume = function(a, b) {
            return R(a) ? ja.sounds[a].setVolume(b) : !1
        }
        ,
        this.mute = function(a) {
            var b = 0;
            if (a instanceof String && (a = null ),
            a)
                return R(a) ? ja.sounds[a].mute() : !1;
            for (b = ja.soundIDs.length - 1; b >= 0; b--)
                ja.sounds[ja.soundIDs[b]].mute();
            return ja.muted = !0
        }
        ,
        this.muteAll = function() {
            ja.mute()
        }
        ,
        this.unmute = function(a) {
            if (a instanceof String && (a = null ),
            a)
                return R(a) ? ja.sounds[a].unmute() : !1;
            for (a = ja.soundIDs.length - 1; a >= 0; a--)
                ja.sounds[ja.soundIDs[a]].unmute();
            return ja.muted = !1,
            !0
        }
        ,
        this.unmuteAll = function() {
            ja.unmute()
        }
        ,
        this.toggleMute = function(a) {
            return R(a) ? ja.sounds[a].toggleMute() : !1
        }
        ,
        this.getMemoryUse = function() {
            var a = 0;
            return la && 8 !== l && (a = parseInt(la._getMemoryUse(), 10)),
            a
        }
        ,
        this.disable = function(c) {
            var d;
            if (c === b && (c = !1),
            ta)
                return !1;
            for (ta = !0,
            d = ja.soundIDs.length - 1; d >= 0; d--)
                J(ja.sounds[ja.soundIDs[d]]);
            return m(c),
            ca.remove(a, "load", s),
            !0
        }
        ,
        this.canPlayMIME = function(a) {
            var b;
            return ja.hasHTML5 && (b = Z({
                type: a
            })),
            !b && Ca && (b = a && ja.ok() ? !!(l > 8 && a.match(Ua) || a.match(ja.mimePattern)) : null ),
            b
        }
        ,
        this.canPlayURL = function(a) {
            var b;
            return ja.hasHTML5 && (b = Z({
                url: a
            })),
            !b && Ca && (b = a && ja.ok() ? !!a.match(ja.filePattern) : null ),
            b
        }
        ,
        this.canPlayLink = function(a) {
            return a.type !== b && a.type && ja.canPlayMIME(a.type) ? !0 : ja.canPlayURL(a.href)
        }
        ,
        this.getSoundById = function(a, b) {
            return a ? ja.sounds[a] : null 
        }
        ,
        this.onready = function(b, c) {
            if ("function" != typeof b)
                throw M("needFunction", "onready");
            return c || (c = a),
            q("onready", b, c),
            r(),
            !0
        }
        ,
        this.ontimeout = function(b, c) {
            if ("function" != typeof b)
                throw M("needFunction", "ontimeout");
            return c || (c = a),
            q("ontimeout", b, c),
            r({
                type: "ontimeout"
            }),
            !0
        }
        ,
        this._wD = this._writeDebug = function(a, b) {
            return !0
        }
        ,
        this._debug = function() {}
        ,
        this.reboot = function(b, c) {
            var d, e, f;
            for (d = ja.soundIDs.length - 1; d >= 0; d--)
                ja.sounds[ja.soundIDs[d]].destruct();
            if (la)
                try {
                    Ia && (wa = la.innerHTML),
                    va = la.parentNode.removeChild(la)
                } catch (g) {}
            if (wa = va = Ca = la = null ,
            ja.enabled = D = sa = xa = ya = qa = ra = ta = Ea = ja.swfLoaded = !1,
            ja.soundIDs = [],
            ja.sounds = {},
            Fa = 0,
            b)
                pa = [];
            else
                for (d in pa)
                    if (pa.hasOwnProperty(d))
                        for (e = 0,
                        f = pa[d].length; f > e; e++)
                            pa[d][e].fired = !1;
            return ja.html5 = {
                usingFlash: null 
            },
            ja.flash = {},
            ja.html5Only = !1,
            ja.ignoreFlash = !1,
            a.setTimeout(function() {
                A(),
                c || ja.beginDelayedInit()
            }, 20),
            ja
        }
        ,
        this.reset = function() {
            return ja.reboot(!0, !0)
        }
        ,
        this.getMoviePercent = function() {
            return la && "PercentLoaded" in la ? la.PercentLoaded() : null 
        }
        ,
        this.beginDelayedInit = function() {
            ua = !0,
            B(),
            setTimeout(function() {
                return ya ? !1 : (F(),
                z(),
                ya = !0)
            }, 20),
            t()
        }
        ,
        this.destruct = function() {
            ja.disable(!0)
        }
        ,
        g = function(a) {
            var c, d, e, f, g, h, i, j, k, m, o, p = this, q = !1, r = [], s = 0, t = null ;
            d = c = null ,
            this.sID = this.id = a.id,
            this.url = a.url,
            this._iO = this.instanceOptions = this.options = n(a),
            this.pan = this.options.pan,
            this.volume = this.options.volume,
            this.isHTML5 = !1,
            this._a = null ,
            o = this.url ? !1 : !0,
            this.id3 = {},
            this._debug = function() {}
            ,
            this.load = function(a) {
                var c, d = null ;
                if (a !== b ? p._iO = n(a, p.options) : (a = p.options,
                p._iO = a,
                t && t !== p.url && (p._iO.url = p.url,
                p.url = null )),
                p._iO.url || (p._iO.url = p.url),
                p._iO.url = V(p._iO.url),
                c = p.instanceOptions = p._iO,
                !c.url && !p.url)
                    return p;
                if (c.url === p.url && 0 !== p.readyState && 2 !== p.readyState)
                    return 3 === p.readyState && c.onload && ia(p, function() {
                        c.onload.apply(p, [!!p.duration])
                    }),
                    p;
                if (p.loaded = !1,
                p.readyState = 1,
                p.playState = 0,
                p.id3 = {},
                Y(c))
                    d = p._setup_html5(c),
                    d._called_load || (p._html5_canplay = !1,
                    p.url !== c.url && (p._a.src = c.url,
                    p.setPosition(0)),
                    p._a.autobuffer = "auto",
                    p._a.preload = "auto",
                    p._a._called_load = !0);
                else {
                    if (ja.html5Only || p._iO.url && p._iO.url.match(/data\:/i))
                        return p;
                    try {
                        p.isHTML5 = !1,
                        p._iO = Q(P(c)),
                        c = p._iO,
                        8 === l ? la._load(p.id, c.url, c.stream, c.autoPlay, c.usePolicyFile) : la._load(p.id, c.url, !!c.stream, !!c.autoPlay, c.loops || 1, !!c.autoLoad, c.usePolicyFile)
                    } catch (e) {
                        G({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        })
                    }
                }
                return p.url = c.url,
                p
            }
            ,
            this.unload = function() {
                return 0 !== p.readyState && (p.isHTML5 ? (h(),
                p._a && (p._a.pause(),
                t = _(p._a))) : 8 === l ? la._unload(p.id, "about:blank") : la._unload(p.id),
                e()),
                p
            }
            ,
            this.destruct = function(a) {
                p.isHTML5 ? (h(),
                p._a && (p._a.pause(),
                _(p._a),
                Ea || g(),
                p._a._s = null ,
                p._a = null )) : (p._iO.onfailure = null ,
                la._destroySound(p.id)),
                a || ja.destroySound(p.id, !0)
            }
            ,
            this.start = this.play = function(a, c) {
                var d, e, f, g, h;
                if (e = !0,
                e = null ,
                c = c === b ? !0 : c,
                a || (a = {}),
                p.url && (p._iO.url = p.url),
                p._iO = n(p._iO, p.options),
                p._iO = n(a, p._iO),
                p._iO.url = V(p._iO.url),
                p.instanceOptions = p._iO,
                !p.isHTML5 && p._iO.serverURL && !p.connected)
                    return p.getAutoPlay() || p.setAutoPlay(!0),
                    p;
                if (Y(p._iO) && (p._setup_html5(p._iO),
                i()),
                1 === p.playState && !p.paused && (d = p._iO.multiShot,
                d || (p.isHTML5 && p.setPosition(p._iO.position),
                e = p)),
                null  !== e)
                    return e;
                if (a.url && a.url !== p.url && (p.readyState || p.isHTML5 || 8 !== l || !o ? p.load(p._iO) : o = !1),
                p.loaded || (0 === p.readyState ? (p.isHTML5 || ja.html5Only ? p.isHTML5 ? p.load(p._iO) : e = p : (p._iO.autoPlay = !0,
                p.load(p._iO)),
                p.instanceOptions = p._iO) : 2 === p.readyState && (e = p)),
                null  !== e)
                    return e;
                if (!p.isHTML5 && 9 === l && 0 < p.position && p.position === p.duration && (a.position = 0),
                p.paused && 0 <= p.position && (!p._iO.serverURL || 0 < p.position))
                    p.resume();
                else {
                    if (p._iO = n(a, p._iO),
                    null  !== p._iO.from && null  !== p._iO.to && 0 === p.instanceCount && 0 === p.playState && !p._iO.serverURL) {
                        if (d = function() {
                            p._iO = n(a, p._iO),
                            p.play(p._iO)
                        }
                        ,
                        p.isHTML5 && !p._html5_canplay ? (p.load({
                            _oncanplay: d
                        }),
                        e = !1) : p.isHTML5 || p.loaded || p.readyState && 2 === p.readyState || (p.load({
                            onload: d
                        }),
                        e = !1),
                        null  !== e)
                            return e;
                        p._iO = m()
                    }
                    (!p.instanceCount || p._iO.multiShotEvents || p.isHTML5 && p._iO.multiShot && !Ea || !p.isHTML5 && l > 8 && !p.getAutoPlay()) && p.instanceCount++,
                    p._iO.onposition && 0 === p.playState && j(p),
                    p.playState = 1,
                    p.paused = !1,
                    p.position = p._iO.position === b || isNaN(p._iO.position) ? 0 : p._iO.position,
                    p.isHTML5 || (p._iO = Q(P(p._iO))),
                    p._iO.onplay && c && (p._iO.onplay.apply(p),
                    q = !0),
                    p.setVolume(p._iO.volume, !0),
                    p.setPan(p._iO.pan, !0),
                    p.isHTML5 ? 2 > p.instanceCount ? (i(),
                    e = p._setup_html5(),
                    p.setPosition(p._iO.position),
                    e.play()) : (f = new Audio(p._iO.url),
                    g = function() {
                        ca.remove(f, "ended", g),
                        p._onfinish(p),
                        _(f),
                        f = null 
                    }
                    ,
                    h = function() {
                        ca.remove(f, "canplay", h);
                        try {
                            f.currentTime = p._iO.position / 1e3
                        } catch (a) {}
                        f.play()
                    }
                    ,
                    ca.add(f, "ended", g),
                    void 0 !== p._iO.volume && (f.volume = Math.max(0, Math.min(1, p._iO.volume / 100))),
                    p.muted && (f.muted = !0),
                    p._iO.position ? ca.add(f, "canplay", h) : f.play()) : (e = la._start(p.id, p._iO.loops || 1, 9 === l ? p.position : p.position / 1e3, p._iO.multiShot || !1),
                    9 === l && !e && p._iO.onplayerror && p._iO.onplayerror.apply(p))
                }
                return p
            }
            ,
            this.stop = function(a) {
                var b = p._iO;
                return 1 === p.playState && (p._onbufferchange(0),
                p._resetOnPosition(0),
                p.paused = !1,
                p.isHTML5 || (p.playState = 0),
                k(),
                b.to && p.clearOnPosition(b.to),
                p.isHTML5 ? p._a && (a = p.position,
                p.setPosition(0),
                p.position = a,
                p._a.pause(),
                p.playState = 0,
                p._onTimer(),
                h()) : (la._stop(p.id, a),
                b.serverURL && p.unload()),
                p.instanceCount = 0,
                p._iO = {},
                b.onstop && b.onstop.apply(p)),
                p
            }
            ,
            this.setAutoPlay = function(a) {
                p._iO.autoPlay = a,
                p.isHTML5 || (la._setAutoPlay(p.id, a),
                a && !p.instanceCount && 1 === p.readyState && p.instanceCount++)
            }
            ,
            this.getAutoPlay = function() {
                return p._iO.autoPlay
            }
            ,
            this.setPosition = function(a) {
                a === b && (a = 0);
                var c = p.isHTML5 ? Math.max(a, 0) : Math.min(p.duration || p._iO.duration, Math.max(a, 0));
                if (p.position = c,
                a = p.position / 1e3,
                p._resetOnPosition(p.position),
                p._iO.position = c,
                p.isHTML5) {
                    if (p._a) {
                        if (p._html5_canplay) {
                            if (p._a.currentTime !== a)
                                try {
                                    p._a.currentTime = a,
                                    (0 === p.playState || p.paused) && p._a.pause()
                                } catch (d) {}
                        } else if (a)
                            return p;
                        p.paused && p._onTimer(!0)
                    }
                } else
                    a = 9 === l ? p.position : a,
                    p.readyState && 2 !== p.readyState && la._setPosition(p.id, a, p.paused || !p.playState, p._iO.multiShot);
                return p
            }
            ,
            this.pause = function(a) {
                return p.paused || 0 === p.playState && 1 !== p.readyState ? p : (p.paused = !0,
                p.isHTML5 ? (p._setup_html5().pause(),
                h()) : (a || a === b) && la._pause(p.id, p._iO.multiShot),
                p._iO.onpause && p._iO.onpause.apply(p),
                p)
            }
            ,
            this.resume = function() {
                var a = p._iO;
                return p.paused ? (p.paused = !1,
                p.playState = 1,
                p.isHTML5 ? (p._setup_html5().play(),
                i()) : (a.isMovieStar && !a.serverURL && p.setPosition(p.position),
                la._pause(p.id, a.multiShot)),
                !q && a.onplay ? (a.onplay.apply(p),
                q = !0) : a.onresume && a.onresume.apply(p),
                p) : p
            }
            ,
            this.togglePause = function() {
                return 0 === p.playState ? (p.play({
                    position: 9 !== l || p.isHTML5 ? p.position / 1e3 : p.position
                }),
                p) : (p.paused ? p.resume() : p.pause(),
                p)
            }
            ,
            this.setPan = function(a, c) {
                return a === b && (a = 0),
                c === b && (c = !1),
                p.isHTML5 || la._setPan(p.id, a),
                p._iO.pan = a,
                c || (p.pan = a,
                p.options.pan = a),
                p
            }
            ,
            this.setVolume = function(a, c) {
                return a === b && (a = 100),
                c === b && (c = !1),
                p.isHTML5 ? p._a && (ja.muted && !p.muted && (p.muted = !0,
                p._a.muted = !0),
                p._a.volume = Math.max(0, Math.min(1, a / 100))) : la._setVolume(p.id, ja.muted && !p.muted || p.muted ? 0 : a),
                p._iO.volume = a,
                c || (p.volume = a,
                p.options.volume = a),
                p
            }
            ,
            this.mute = function() {
                return p.muted = !0,
                p.isHTML5 ? p._a && (p._a.muted = !0) : la._setVolume(p.id, 0),
                p
            }
            ,
            this.unmute = function() {
                p.muted = !1;
                var a = p._iO.volume !== b;
                return p.isHTML5 ? p._a && (p._a.muted = !1) : la._setVolume(p.id, a ? p._iO.volume : p.options.volume),
                p
            }
            ,
            this.toggleMute = function() {
                return p.muted ? p.unmute() : p.mute()
            }
            ,
            this.onposition = this.onPosition = function(a, c, d) {
                return r.push({
                    position: parseInt(a, 10),
                    method: c,
                    scope: d !== b ? d : p,
                    fired: !1
                }),
                p
            }
            ,
            this.clearOnPosition = function(a, b) {
                var c;
                if (a = parseInt(a, 10),
                isNaN(a))
                    return !1;
                for (c = 0; c < r.length; c++)
                    a !== r[c].position || b && b !== r[c].method || (r[c].fired && s--,
                    r.splice(c, 1))
            }
            ,
            this._processOnPosition = function() {
                var a, b;
                if (a = r.length,
                !a || !p.playState || s >= a)
                    return !1;
                for (a -= 1; a >= 0; a--)
                    b = r[a],
                    !b.fired && p.position >= b.position && (b.fired = !0,
                    s++,
                    b.method.apply(b.scope, [b.position]));
                return !0
            }
            ,
            this._resetOnPosition = function(a) {
                var b, c;
                if (b = r.length,
                !b)
                    return !1;
                for (b -= 1; b >= 0; b--)
                    c = r[b],
                    c.fired && a <= c.position && (c.fired = !1,
                    s--);
                return !0
            }
            ,
            m = function() {
                var a, b, c = p._iO, d = c.from, e = c.to;
                return b = function() {
                    p.clearOnPosition(e, b),
                    p.stop()
                }
                ,
                a = function() {
                    null  === e || isNaN(e) || p.onPosition(e, b)
                }
                ,
                null  !== d && !isNaN(d) && (c.position = d,
                c.multiShot = !1,
                a()),
                c
            }
            ,
            j = function() {
                var a, b = p._iO.onposition;
                if (b)
                    for (a in b)
                        b.hasOwnProperty(a) && p.onPosition(parseInt(a, 10), b[a])
            }
            ,
            k = function() {
                var a, b = p._iO.onposition;
                if (b)
                    for (a in b)
                        b.hasOwnProperty(a) && p.clearOnPosition(parseInt(a, 10))
            }
            ,
            i = function() {
                p.isHTML5 && S(p)
            }
            ,
            h = function() {
                p.isHTML5 && T(p)
            }
            ,
            e = function(a) {
                a || (r = [],
                s = 0),
                q = !1,
                p._hasTimer = null ,
                p._a = null ,
                p._html5_canplay = !1,
                p.bytesLoaded = null ,
                p.bytesTotal = null ,
                p.duration = p._iO && p._iO.duration ? p._iO.duration : null ,
                p.durationEstimate = null ,
                p.buffered = [],
                p.eqData = [],
                p.eqData.left = [],
                p.eqData.right = [],
                p.failures = 0,
                p.isBuffering = !1,
                p.instanceOptions = {},
                p.instanceCount = 0,
                p.loaded = !1,
                p.metadata = {},
                p.readyState = 0,
                p.muted = !1,
                p.paused = !1,
                p.peakData = {
                    left: 0,
                    right: 0
                },
                p.waveformData = {
                    left: [],
                    right: []
                },
                p.playState = 0,
                p.position = null ,
                p.id3 = {}
            }
            ,
            e(),
            this._onTimer = function(a) {
                var b, e = !1, f = {};
                return p._hasTimer || a ? (p._a && (a || (0 < p.playState || 1 === p.readyState) && !p.paused) && (b = p._get_html5_duration(),
                b !== c && (c = b,
                p.duration = b,
                e = !0),
                p.durationEstimate = p.duration,
                b = 1e3 * p._a.currentTime || 0,
                b !== d && (d = b,
                e = !0),
                (e || a) && p._whileplaying(b, f, f, f, f)),
                e) : void 0
            }
            ,
            this._get_html5_duration = function() {
                var a = p._iO;
                return (a = p._a && p._a.duration ? 1e3 * p._a.duration : a && a.duration ? a.duration : null ) && !isNaN(a) && 1 / 0 !== a ? a : null 
            }
            ,
            this._apply_loop = function(a, b) {
                a.loop = b > 1 ? "loop" : ""
            }
            ,
            this._setup_html5 = function(a) {
                a = n(p._iO, a);
                var b, c = Ea ? ka : p._a, d = decodeURI(a.url);
                if (Ea ? d === decodeURI(da) && (b = !0) : d === decodeURI(t) && (b = !0),
                c) {
                    if (c._s)
                        if (Ea)
                            c._s && c._s.playState && !b && c._s.stop();
                        else if (!Ea && d === decodeURI(t))
                            return p._apply_loop(c, a.loops),
                            c;
                    b || (t && e(!1),
                    c.src = a.url,
                    da = t = p.url = a.url,
                    c._called_load = !1)
                } else
                    a.autoLoad || a.autoPlay ? (p._a = new Audio(a.url),
                    p._a.load()) : p._a = La && 10 > opera.version() ? new Audio(null ) : new Audio,
                    c = p._a,
                    c._called_load = !1,
                    Ea && (ka = c);
                return p.isHTML5 = !0,
                p._a = c,
                c._s = p,
                f(),
                p._apply_loop(c, a.loops),
                a.autoLoad || a.autoPlay ? p.load() : (c.autobuffer = !1,
                c.preload = "auto"),
                c
            }
            ,
            f = function() {
                if (p._a._added_events)
                    return !1;
                var a;
                p._a._added_events = !0;
                for (a in ha)
                    ha.hasOwnProperty(a) && p._a && p._a.addEventListener(a, ha[a], !1);
                return !0
            }
            ,
            g = function() {
                var a;
                p._a._added_events = !1;
                for (a in ha)
                    ha.hasOwnProperty(a) && p._a && p._a.removeEventListener(a, ha[a], !1)
            }
            ,
            this._onload = function(a) {
                var b = !!a || !p.isHTML5 && 8 === l && p.duration;
                return p.loaded = b,
                p.readyState = b ? 3 : 2,
                p._onbufferchange(0),
                p._iO.onload && ia(p, function() {
                    p._iO.onload.apply(p, [b])
                }),
                !0
            }
            ,
            this._onbufferchange = function(a) {
                return 0 === p.playState || a && p.isBuffering || !a && !p.isBuffering ? !1 : (p.isBuffering = 1 === a,
                p._iO.onbufferchange && p._iO.onbufferchange.apply(p),
                !0)
            }
            ,
            this._onsuspend = function() {
                return p._iO.onsuspend && p._iO.onsuspend.apply(p),
                !0
            }
            ,
            this._onfailure = function(a, b, c) {
                p.failures++,
                p._iO.onfailure && 1 === p.failures && p._iO.onfailure(p, a, b, c)
            }
            ,
            this._onfinish = function() {
                var a = p._iO.onfinish;
                p._onbufferchange(0),
                p._resetOnPosition(0),
                p.instanceCount && (p.instanceCount--,
                p.instanceCount || (k(),
                p.playState = 0,
                p.paused = !1,
                p.instanceCount = 0,
                p.instanceOptions = {},
                p._iO = {},
                h(),
                p.isHTML5 && (p.position = 0)),
                (!p.instanceCount || p._iO.multiShotEvents) && a && ia(p, function() {
                    a.apply(p)
                }))
            }
            ,
            this._whileloading = function(a, b, c, d) {
                var e = p._iO;
                p.bytesLoaded = a,
                p.bytesTotal = b,
                p.duration = Math.floor(c),
                p.bufferLength = d,
                p.durationEstimate = p.isHTML5 || e.isMovieStar ? p.duration : e.duration ? p.duration > e.duration ? p.duration : e.duration : parseInt(p.bytesTotal / p.bytesLoaded * p.duration, 10),
                p.isHTML5 || (p.buffered = [{
                    start: 0,
                    end: p.duration
                }]),
                (3 !== p.readyState || p.isHTML5) && e.whileloading && e.whileloading.apply(p)
            }
            ,
            this._whileplaying = function(a, c, d, e, f) {
                var g = p._iO;
                return isNaN(a) || null  === a ? !1 : (p.position = Math.max(0, a),
                p._processOnPosition(),
                !p.isHTML5 && l > 8 && (g.usePeakData && c !== b && c && (p.peakData = {
                    left: c.leftPeak,
                    right: c.rightPeak
                }),
                g.useWaveformData && d !== b && d && (p.waveformData = {
                    left: d.split(","),
                    right: e.split(",")
                }),
                g.useEQData && f !== b && f && f.leftEQ && (a = f.leftEQ.split(","),
                p.eqData = a,
                p.eqData.left = a,
                f.rightEQ !== b && f.rightEQ && (p.eqData.right = f.rightEQ.split(",")))),
                1 === p.playState && (!p.isHTML5 && 8 === l && !p.position && p.isBuffering && p._onbufferchange(0),
                g.whileplaying && g.whileplaying.apply(p)),
                !0)
            }
            ,
            this._oncaptiondata = function(a) {
                p.captiondata = a,
                p._iO.oncaptiondata && p._iO.oncaptiondata.apply(p, [a])
            }
            ,
            this._onmetadata = function(a, b) {
                var c, d, e = {};
                for (c = 0,
                d = a.length; d > c; c++)
                    e[a[c]] = b[c];
                p.metadata = e,
                p._iO.onmetadata && p._iO.onmetadata.apply(p)
            }
            ,
            this._onid3 = function(a, b) {
                var c, d, e = [];
                for (c = 0,
                d = a.length; d > c; c++)
                    e[a[c]] = b[c];
                p.id3 = n(p.id3, e),
                p._iO.onid3 && p._iO.onid3.apply(p)
            }
            ,
            this._onconnect = function(a) {
                a = 1 === a,
                (p.connected = a) && (p.failures = 0,
                R(p.id) && (p.getAutoPlay() ? p.play(b, p.getAutoPlay()) : p._iO.autoLoad && p.load()),
                p._iO.onconnect && p._iO.onconnect.apply(p, [a]))
            }
            ,
            this._ondataerror = function(a) {
                0 < p.playState && p._iO.ondataerror && p._iO.ondataerror.apply(p)
            }
        }
        ,
        E = function() {
            return oa.body || oa.getElementsByTagName("div")[0]
        }
        ,
        h = function(a) {
            return oa.getElementById(a)
        }
        ,
        n = function(a, c) {
            var d, e, f = a || {};
            d = c === b ? ja.defaultOptions : c;
            for (e in d)
                d.hasOwnProperty(e) && f[e] === b && (f[e] = "object" != typeof d[e] || null  === d[e] ? d[e] : n(f[e], d[e]));
            return f
        }
        ,
        ia = function(b, c) {
            b.isHTML5 || 8 !== l ? c() : a.setTimeout(c, 0)
        }
        ,
        p = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        },
        o = function(a, c) {
            var d, e = !0, f = c !== b, g = ja.setupOptions;
            for (d in a)
                if (a.hasOwnProperty(d))
                    if ("object" != typeof a[d] || null  === a[d] || a[d] instanceof Array || a[d] instanceof RegExp)
                        f && p[c] !== b ? ja[c][d] = a[d] : g[d] !== b ? (ja.setupOptions[d] = a[d],
                        ja[d] = a[d]) : p[d] === b ? e = !1 : ja[d] instanceof Function ? ja[d].apply(ja, a[d] instanceof Array ? a[d] : [a[d]]) : ja[d] = a[d];
                    else {
                        if (p[d] !== b)
                            return o(a[d], d);
                        e = !1
                    }
            return e
        }
        ,
        ca = function() {
            function b(a) {
                a = Da.call(a);
                var b = a.length;
                return d ? (a[1] = "on" + a[1],
                b > 3 && a.pop()) : 3 === b && a.push(!1),
                a
            }
            function c(a, b) {
                var c = a.shift()
                  , f = [e[b]];
                d ? c[f](a[0], a[1]) : c[f].apply(c, a)
            }
            var d = a.attachEvent
              , e = {
                add: d ? "attachEvent" : "addEventListener",
                remove: d ? "detachEvent" : "removeEventListener"
            };
            return {
                add: function() {
                    c(b(arguments), "add")
                },
                remove: function() {
                    c(b(arguments), "remove")
                }
            }
        }(),
        ha = {
            abort: f(function() {}),
            canplay: f(function() {
                var a, c = this._s;
                if (c._html5_canplay)
                    return !0;
                if (c._html5_canplay = !0,
                c._onbufferchange(0),
                a = c._iO.position === b || isNaN(c._iO.position) ? null  : c._iO.position / 1e3,
                c.position && this.currentTime !== a)
                    try {
                        this.currentTime = a
                    } catch (d) {}
                c._iO._oncanplay && c._iO._oncanplay()
            }),
            canplaythrough: f(function() {
                var a = this._s;
                a.loaded || (a._onbufferchange(0),
                a._whileloading(a.bytesLoaded, a.bytesTotal, a._get_html5_duration()),
                a._onload(!0))
            }),
            ended: f(function() {
                this._s._onfinish()
            }),
            error: f(function() {
                this._s._onload(!1)
            }),
            loadeddata: f(function() {
                var a = this._s;
                !a._loaded && !Ka && (a.duration = a._get_html5_duration())
            }),
            loadedmetadata: f(function() {}),
            loadstart: f(function() {
                this._s._onbufferchange(1)
            }),
            play: f(function() {
                this._s._onbufferchange(0)
            }),
            playing: f(function() {
                this._s._onbufferchange(0)
            }),
            progress: f(function(a) {
                var b, c, d = this._s, e = 0, e = a.target.buffered;
                b = a.loaded || 0;
                var f = a.total || 1;
                if (d.buffered = [],
                e && e.length) {
                    for (b = 0,
                    c = e.length; c > b; b++)
                        d.buffered.push({
                            start: 1e3 * e.start(b),
                            end: 1e3 * e.end(b)
                        });
                    e = 1e3 * (e.end(0) - e.start(0)),
                    b = Math.min(1, e / (1e3 * a.target.duration))
                }
                isNaN(b) || (d._onbufferchange(0),
                d._whileloading(b, f, d._get_html5_duration()),
                b && f && b === f && ha.canplaythrough.call(this, a))
            }),
            ratechange: f(function() {}),
            suspend: f(function(a) {
                var b = this._s;
                ha.progress.call(this, a),
                b._onsuspend()
            }),
            stalled: f(function() {}),
            timeupdate: f(function() {
                this._s._onTimer()
            }),
            waiting: f(function() {
                this._s._onbufferchange(1)
            })
        },
        Y = function(a) {
            return a && (a.type || a.url || a.serverURL) ? a.serverURL || a.type && e(a.type) ? !1 : a.type ? Z({
                type: a.type
            }) : Z({
                url: a.url
            }) || ja.html5Only || a.url.match(/data\:/i) : !1
        }
        ,
        _ = function(a) {
            var b;
            return a && (b = Ka ? "about:blank" : ja.html5.canPlayType("audio/wav") ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==" : "about:blank",
            a.src = b,
            void 0 !== a._called_unload && (a._called_load = !1)),
            Ea && (da = null ),
            b
        }
        ,
        Z = function(a) {
            if (!ja.useHTML5Audio || !ja.hasHTML5)
                return !1;
            var c = a.url || null ;
            a = a.type || null ;
            var d, f = ja.audioFormats;
            if (a && ja.html5[a] !== b)
                return ja.html5[a] && !e(a);
            if (!$) {
                $ = [];
                for (d in f)
                    f.hasOwnProperty(d) && ($.push(d),
                    f[d].related && ($ = $.concat(f[d].related)));
                $ = RegExp("\\.(" + $.join("|") + ")(\\?.*)?$", "i")
            }
            return d = c ? c.toLowerCase().match($) : null ,
            d && d.length ? d = d[1] : a && (c = a.indexOf(";"),
            d = (-1 !== c ? a.substr(0, c) : a).substr(6)),
            d && ja.html5[d] !== b ? c = ja.html5[d] && !e(d) : (a = "audio/" + d,
            c = ja.html5.canPlayType({
                type: a
            }),
            c = (ja.html5[d] = c) && ja.html5[a] && !e(a)),
            c
        }
        ,
        ba = function() {
            function a(a) {
                var b, c = b = !1;
                if (!g || "function" != typeof g.canPlayType)
                    return b;
                if (a instanceof Array) {
                    for (f = 0,
                    b = a.length; b > f; f++)
                        (ja.html5[a[f]] || g.canPlayType(a[f]).match(ja.html5Test)) && (c = !0,
                        ja.html5[a[f]] = !0,
                        ja.flash[a[f]] = !!a[f].match(Ra));
                    b = c
                } else
                    a = g && "function" == typeof g.canPlayType ? g.canPlayType(a) : !1,
                    b = !(!a || !a.match(ja.html5Test));
                return b
            }
            if (!ja.useHTML5Audio || !ja.hasHTML5)
                return Ca = ja.html5.usingFlash = !0,
                !1;
            var c, d, e, f, g = Audio !== b ? La && 10 > opera.version() ? new Audio(null ) : new Audio : null , h = {};
            e = ja.audioFormats;
            for (c in e)
                if (e.hasOwnProperty(c) && (d = "audio/" + c,
                h[c] = a(e[c].type),
                h[d] = h[c],
                c.match(Ra) ? (ja.flash[c] = !0,
                ja.flash[d] = !0) : (ja.flash[c] = !1,
                ja.flash[d] = !1),
                e[c] && e[c].related))
                    for (f = e[c].related.length - 1; f >= 0; f--)
                        h["audio/" + e[c].related[f]] = h[c],
                        ja.html5[e[c].related[f]] = h[c],
                        ja.flash[e[c].related[f]] = h[c];
            return h.canPlayType = g ? a : null ,
            ja.html5 = n(ja.html5, h),
            ja.html5.usingFlash = X(),
            Ca = ja.html5.usingFlash,
            !0
        }
        ,
        y = {},
        M = function() {}
        ,
        P = function(a) {
            return 8 === l && 1 < a.loops && a.stream && (a.stream = !1),
            a
        }
        ,
        Q = function(a, b) {
            return a && !a.usePolicyFile && (a.onid3 || a.usePeakData || a.useWaveformData || a.useEQData) && (a.usePolicyFile = !0),
            a
        }
        ,
        i = function() {
            return !1
        }
        ,
        J = function(a) {
            for (var b in a)
                a.hasOwnProperty(b) && "function" == typeof a[b] && (a[b] = i)
        }
        ,
        K = function(a) {
            a === b && (a = !1),
            (ta || a) && ja.disable(a)
        }
        ,
        L = function(a) {
            var b = null ;
            if (a)
                if (a.match(/\.swf(\?.*)?$/i)) {
                    if (b = a.substr(a.toLowerCase().lastIndexOf(".swf?") + 4))
                        return a
                } else
                    a.lastIndexOf("/") !== a.length - 1 && (a += "/");
            return a = (a && -1 !== a.lastIndexOf("/") ? a.substr(0, a.lastIndexOf("/") + 1) : "./") + ja.movieURL,
            ja.noSWFCache && (a += "?ts=" + (new Date).getTime()),
            a
        }
        ,
        w = function() {
            l = parseInt(ja.flashVersion, 10),
            8 !== l && 9 !== l && (ja.flashVersion = l = 8);
            var a = ja.debugMode || ja.debugFlash ? "_debug.swf" : ".swf";
            ja.useHTML5Audio && !ja.html5Only && ja.audioFormats.mp4.required && 9 > l && (ja.flashVersion = l = 9),
            ja.version = ja.versionNumber + (ja.html5Only ? " (HTML5-only mode)" : 9 === l ? " (AS3/Flash 9)" : " (AS2/Flash 8)"),
            l > 8 ? (ja.defaultOptions = n(ja.defaultOptions, ja.flash9Options),
            ja.features.buffering = !0,
            ja.defaultOptions = n(ja.defaultOptions, ja.movieStarOptions),
            ja.filePatterns.flash9 = RegExp("\\.(mp3|" + Va.join("|") + ")(\\?.*)?$", "i"),
            ja.features.movieStar = !0) : ja.features.movieStar = !1,
            ja.filePattern = ja.filePatterns[8 !== l ? "flash9" : "flash8"],
            ja.movieURL = (8 === l ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", a),
            ja.features.peakData = ja.features.waveformData = ja.features.eqData = l > 8
        }
        ,
        H = function(a, b) {
            return la ? void la._setPolling(a, b) : !1
        }
        ,
        I = function() {}
        ,
        R = this.getSoundById,
        O = function() {
            var a = [];
            return ja.debugMode && a.push("sm2_debug"),
            ja.debugFlash && a.push("flash_debug"),
            ja.useHighPerformance && a.push("high_performance"),
            a.join(" ")
        }
        ,
        N = function() {
            M("fbHandler");
            var a = ja.getMoviePercent()
              , b = {
                type: "FLASHBLOCK"
            };
            return ja.html5Only ? !1 : void (ja.ok() ? ja.oMC && (ja.oMC.className = [O(), "movieContainer", "swf_loaded" + (ja.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (Ca && (ja.oMC.className = O() + " movieContainer " + (null  === a ? "swf_timedout" : "swf_error")),
            ja.didFlashBlock = !0,
            r({
                type: "ontimeout",
                ignoreInit: !0,
                error: b
            }),
            G(b)))
        }
        ,
        q = function(a, c, d) {
            pa[a] === b && (pa[a] = []),
            pa[a].push({
                method: c,
                scope: d || null ,
                fired: !1
            })
        }
        ,
        r = function(a) {
            if (a || (a = {
                type: ja.ok() ? "onready" : "ontimeout"
            }),
            !sa && a && !a.ignoreInit || "ontimeout" === a.type && (ja.ok() || ta && !a.ignoreInit))
                return !1;
            var b, c = {
                success: a && a.ignoreInit ? ja.ok() : !ta
            }, d = a && a.type ? pa[a.type] || [] : [], e = [], c = [c], f = Ca && !ja.ok();
            for (a.error && (c[0].error = a.error),
            a = 0,
            b = d.length; b > a; a++)
                !0 !== d[a].fired && e.push(d[a]);
            if (e.length)
                for (a = 0,
                b = e.length; b > a; a++)
                    e[a].scope ? e[a].method.apply(e[a].scope, c) : e[a].method.apply(this, c),
                    f || (e[a].fired = !0);
            return !0
        }
        ,
        s = function() {
            a.setTimeout(function() {
                ja.useFlashBlock && N(),
                r(),
                "function" == typeof ja.onload && ja.onload.apply(a),
                ja.waitForWindowLoad && ca.add(a, "load", s)
            }, 1)
        }
        ,
        fa = function() {
            if (ea !== b)
                return ea;
            var c, d = !1, e = navigator, f = e.plugins, g = a.ActiveXObject;
            if (f && f.length)
                (e = e.mimeTypes) && e["application/x-shockwave-flash"] && e["application/x-shockwave-flash"].enabledPlugin && e["application/x-shockwave-flash"].enabledPlugin.description && (d = !0);
            else if (g !== b && !ma.match(/MSAppHost/i)) {
                try {
                    c = new g("ShockwaveFlash.ShockwaveFlash")
                } catch (h) {
                    c = null 
                }
                d = !!c
            }
            return ea = d
        }
        ,
        X = function() {
            var a, b, c = ja.audioFormats;
            if (Ga && ma.match(/os (1|2|3_0|3_1)/i) ? (ja.hasHTML5 = !1,
            ja.html5Only = !0,
            ja.oMC && (ja.oMC.style.display = "none")) : !ja.useHTML5Audio || ja.html5 && ja.html5.canPlayType || (ja.hasHTML5 = !1),
            ja.useHTML5Audio && ja.hasHTML5)
                for (b in W = !0,
                c)
                    c.hasOwnProperty(b) && c[b].required && (ja.html5.canPlayType(c[b].type) ? ja.preferFlash && (ja.flash[b] || ja.flash[c[b].type]) && (a = !0) : (W = !1,
                    a = !0));
            return ja.ignoreFlash && (a = !1,
            W = !0),
            ja.html5Only = ja.hasHTML5 && ja.useHTML5Audio && !a,
            !ja.html5Only
        }
        ,
        V = function(a) {
            var b, c, d = 0;
            if (a instanceof Array) {
                for (b = 0,
                c = a.length; c > b; b++)
                    if (a[b] instanceof Object) {
                        if (ja.canPlayMIME(a[b].type)) {
                            d = b;
                            break
                        }
                    } else if (ja.canPlayURL(a[b])) {
                        d = b;
                        break
                    }
                a[d].url && (a[d] = a[d].url),
                a = a[d]
            }
            return a
        }
        ,
        S = function(a) {
            a._hasTimer || (a._hasTimer = !0,
            !Ma && ja.html5PollingInterval && (null  === Aa && 0 === za && (Aa = setInterval(U, ja.html5PollingInterval)),
            za++))
        }
        ,
        T = function(a) {
            a._hasTimer && (a._hasTimer = !1,
            !Ma && ja.html5PollingInterval && za--)
        }
        ,
        U = function() {
            var a;
            if (null  !== Aa && !za)
                return clearInterval(Aa),
                Aa = null ,
                !1;
            for (a = ja.soundIDs.length - 1; a >= 0; a--)
                ja.sounds[ja.soundIDs[a]].isHTML5 && ja.sounds[ja.soundIDs[a]]._hasTimer && ja.sounds[ja.soundIDs[a]]._onTimer()
        }
        ,
        G = function(c) {
            c = c !== b ? c : {},
            "function" == typeof ja.onerror && ja.onerror.apply(a, [{
                type: c.type !== b ? c.type : null 
            }]),
            c.fatal !== b && c.fatal && ja.disable()
        }
        ,
        ga = function() {
            if (!Na || !fa())
                return !1;
            var a, b, c = ja.audioFormats;
            for (b in c)
                if (c.hasOwnProperty(b) && ("mp3" === b || "mp4" === b) && (ja.html5[b] = !1,
                c[b] && c[b].related))
                    for (a = c[b].related.length - 1; a >= 0; a--)
                        ja.html5[c[b].related[a]] = !1
        }
        ,
        this._setSandboxType = function(a) {}
        ,
        this._externalInterfaceOK = function(a) {
            return ja.swfLoaded ? !1 : (ja.swfLoaded = !0,
            Pa = !1,
            Na && ga(),
            void setTimeout(k, Ia ? 100 : 1))
        }
        ,
        F = function(a, c) {
            function d(a, b) {
                return '<param name="' + a + '" value="' + b + '" />'
            }
            if (qa && ra)
                return !1;
            if (ja.html5Only)
                return w(),
                ja.oMC = h(ja.movieID),
                k(),
                ra = qa = !0,
                !1;
            var e, f, g, i = c || ja.url, j = ja.altURL || i, l = E(), m = O(), n = null , n = oa.getElementsByTagName("html")[0], n = n && n.dir && n.dir.match(/rtl/i);
            if (a = a === b ? ja.id : a,
            w(),
            ja.url = L(Sa ? i : j),
            c = ja.url,
            ja.wmode = !ja.wmode && ja.useHighPerformance ? "transparent" : ja.wmode,
            null  !== ja.wmode && (ma.match(/msie 8/i) || !Ia && !ja.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (Ba.push(y.spcWmode),
            ja.wmode = null ),
            l = {
                name: a,
                id: a,
                src: c,
                quality: "high",
                allowScriptAccess: ja.allowScriptAccess,
                bgcolor: ja.bgColor,
                pluginspage: Ta + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: ja.wmode,
                hasPriority: "true"
            },
            ja.debugFlash && (l.FlashVars = "debug=1"),
            ja.wmode || delete l.wmode,
            Ia)
                i = oa.createElement("div"),
                f = ['<object id="' + a + '" data="' + c + '" type="' + l.type + '" title="' + l.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + Ta + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', d("movie", c), d("AllowScriptAccess", ja.allowScriptAccess), d("quality", l.quality), ja.wmode ? d("wmode", ja.wmode) : "", d("bgcolor", ja.bgColor), d("hasPriority", "true"), ja.debugFlash ? d("FlashVars", l.FlashVars) : "", "</object>"].join("");
            else
                for (e in i = oa.createElement("embed"),
                l)
                    l.hasOwnProperty(e) && i.setAttribute(e, l[e]);
            if (I(),
            m = O(),
            l = E())
                if (ja.oMC = h(ja.movieID) || oa.createElement("div"),
                ja.oMC.id)
                    g = ja.oMC.className,
                    ja.oMC.className = (g ? g + " " : "movieContainer") + (m ? " " + m : ""),
                    ja.oMC.appendChild(i),
                    Ia && (e = ja.oMC.appendChild(oa.createElement("div")),
                    e.className = "sm2-object-box",
                    e.innerHTML = f),
                    ra = !0;
                else {
                    if (ja.oMC.id = ja.movieID,
                    ja.oMC.className = "movieContainer " + m,
                    e = m = null ,
                    ja.useFlashBlock || (ja.useHighPerformance ? m = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : (m = {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    },
                    n && (m.left = Math.abs(parseInt(m.left, 10)) + "px"))),
                    Ja && (ja.oMC.style.zIndex = 1e4),
                    !ja.debugFlash)
                        for (g in m)
                            m.hasOwnProperty(g) && (ja.oMC.style[g] = m[g]);
                    try {
                        Ia || ja.oMC.appendChild(i),
                        l.appendChild(ja.oMC),
                        Ia && (e = ja.oMC.appendChild(oa.createElement("div")),
                        e.className = "sm2-object-box",
                        e.innerHTML = f),
                        ra = !0
                    } catch (o) {
                        throw Error(M("domError") + " \n" + o.toString())
                    }
                }
            return qa = !0
        }
        ,
        z = function() {
            return ja.html5Only ? (F(),
            !1) : la || !ja.url ? !1 : (la = ja.getMovie(ja.id),
            la || (va ? (Ia ? ja.oMC.innerHTML = wa : ja.oMC.appendChild(va),
            va = null ,
            qa = !0) : F(ja.id, ja.url),
            la = ja.getMovie(ja.id)),
            "function" == typeof ja.oninitmovie && setTimeout(ja.oninitmovie, 1),
            !0)
        }
        ,
        t = function() {
            setTimeout(u, 1e3)
        }
        ,
        v = function() {
            a.setTimeout(function() {
                ja.setup({
                    preferFlash: !1
                }).reboot(),
                ja.didFlashBlock = !0,
                ja.beginDelayedInit()
            }, 1)
        }
        ,
        u = function() {
            var b, c = !1;
            return !ja.url || xa ? !1 : (xa = !0,
            ca.remove(a, "load", t),
            ea && Pa && !Oa ? !1 : (sa || (b = ja.getMoviePercent(),
            b > 0 && 100 > b && (c = !0)),
            void setTimeout(function() {
                return b = ja.getMoviePercent(),
                c ? (xa = !1,
                a.setTimeout(t, 1),
                !1) : void (!sa && Qa && (null  === b ? ja.useFlashBlock || 0 === ja.flashLoadTimeout ? ja.useFlashBlock && N() : !ja.useFlashBlock && W ? v() : r({
                    type: "ontimeout",
                    ignoreInit: !0,
                    error: {
                        type: "INIT_FLASHBLOCK"
                    }
                }) : 0 !== ja.flashLoadTimeout && (!ja.useFlashBlock && W ? v() : K(!0))))
            }, ja.flashLoadTimeout)))
        }
        ,
        x = function() {
            return Oa || !Pa ? (ca.remove(a, "focus", x),
            !0) : (Oa = Qa = !0,
            xa = !1,
            t(),
            ca.remove(a, "focus", x),
            !0)
        }
        ,
        m = function(b) {
            if (sa)
                return !1;
            if (ja.html5Only)
                return sa = !0,
                s(),
                !0;
            var c, d = !0;
            return ja.useFlashBlock && ja.flashLoadTimeout && !ja.getMoviePercent() || (sa = !0),
            c = {
                type: !ea && Ca ? "NO_FLASH" : "INIT_TIMEOUT"
            },
            (ta || b) && (ja.useFlashBlock && ja.oMC && (ja.oMC.className = O() + " " + (null  === ja.getMoviePercent() ? "swf_timedout" : "swf_error")),
            r({
                type: "ontimeout",
                error: c,
                ignoreInit: !0
            }),
            G(c),
            d = !1),
            ta || (ja.waitForWindowLoad && !ua ? ca.add(a, "load", s) : s()),
            d
        }
        ,
        j = function() {
            var a, c = ja.setupOptions;
            for (a in c)
                c.hasOwnProperty(a) && (ja[a] === b ? ja[a] = c[a] : ja[a] !== c[a] && (ja.setupOptions[a] = ja[a]))
        }
        ,
        k = function() {
            if (sa)
                return !1;
            if (ja.html5Only)
                return sa || (ca.remove(a, "load", ja.beginDelayedInit),
                ja.enabled = !0,
                m()),
                !0;
            z();
            try {
                la._externalInterfaceTest(!1),
                H(!0, ja.flashPollingInterval || (ja.useHighPerformance ? 10 : 50)),
                ja.debugMode || la._disableDebug(),
                ja.enabled = !0,
                ja.html5Only || ca.add(a, "unload", i)
            } catch (b) {
                return G({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }),
                K(!0),
                m(),
                !1
            }
            return m(),
            ca.remove(a, "load", ja.beginDelayedInit),
            !0
        }
        ,
        B = function() {
            return D ? !1 : (D = !0,
            j(),
            I(),
            !ea && ja.hasHTML5 && ja.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            }),
            ba(),
            !ea && Ca && (Ba.push(y.needFlash),
            ja.setup({
                flashLoadTimeout: 1
            })),
            oa.removeEventListener && oa.removeEventListener("DOMContentLoaded", B, !1),
            z(),
            !0)
        }
        ,
        aa = function() {
            return "complete" === oa.readyState && (B(),
            oa.detachEvent("onreadystatechange", aa)),
            !0
        }
        ,
        C = function() {
            ua = !0,
            ca.remove(a, "load", C)
        }
        ,
        A = function() {
            Ma && (ja.setupOptions.useHTML5Audio = !0,
            ja.setupOptions.preferFlash = !1,
            Ga || Ha && !ma.match(/android\s2\.3/i)) && (Ga && (ja.ignoreFlash = !0),
            Ea = !0)
        }
        ,
        A(),
        fa(),
        ca.add(a, "focus", x),
        ca.add(a, "load", t),
        ca.add(a, "load", C),
        oa.addEventListener ? oa.addEventListener("DOMContentLoaded", B, !1) : oa.attachEvent ? oa.attachEvent("onreadystatechange", aa) : G({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        })
    }
    var d = null ;
    void 0 !== a.SM2_DEFER && SM2_DEFER || (d = new c),
    a.SoundManager = c,
    a.soundManager = d
}(window),
function(a) {
    function b(a) {
        a = a || {},
        this.settings = a,
        null  == a.statusInterval && (a.statusInterval = 5e3),
        null  == a.loggingDelay && (a.loggingDelay = 2e4),
        null  == a.noProgressTimeout && (a.noProgressTimeout = 1 / 0);
        var b, d = [], e = [], f = Date.now(), g = {
            QUEUED: 0,
            WAITING: 1,
            LOADED: 2,
            ERROR: 3,
            TIMEOUT: 4
        }, h = function(a) {
            return null  == a ? [] : Array.isArray(a) ? a : [a]
        }
        ;
        this.add = function(a) {
            a.tags = new c(a.tags),
            null  == a.priority && (a.priority = 1 / 0),
            d.push({
                resource: a,
                status: g.QUEUED
            })
        }
        ,
        this.addProgressListener = function(a, b) {
            e.push({
                callback: a,
                tags: new c(b)
            })
        }
        ,
        this.addCompletionListener = function(a, b) {
            e.push({
                tags: new c(b),
                callback: function(b) {
                    b.completedCount === b.totalCount && a(b)
                }
            })
        }
        ;
        var i = function(a) {
            a = h(a);
            var b = function(b) {
                for (var c = b.resource, d = 1 / 0, e = 0; e < c.tags.length; e++)
                    for (var f = 0; f < Math.min(a.length, d) && !(c.tags.all[e] === a[f] && d > f && (d = f,
                    0 === d)) && 0 !== d; f++)
                        ;
                return d
            }
            ;
            return function(a, c) {
                var d = b(a)
                  , e = b(c);
                return e > d ? -1 : d > e ? 1 : a.priority < c.priority ? -1 : a.priority > c.priority ? 1 : 0
            }
        }
        ;
        this.start = function(a) {
            b = Date.now();
            var c = i(a);
            d.sort(c);
            for (var e = 0, f = d.length; f > e; e++) {
                var h = d[e];
                h.status = g.WAITING,
                h.resource.start(this)
            }
            setTimeout(j, 100)
        }
        ;
        var j = function() {
            for (var b = !1, c = Date.now() - f, e = c >= a.noProgressTimeout, h = c >= a.loggingDelay, i = 0, k = d.length; k > i; i++) {
                var l = d[i];
                l.status === g.WAITING && (l.resource.checkStatus && l.resource.checkStatus(),
                l.status === g.WAITING && (e ? l.resource.onTimeout() : b = !0))
            }
            h && b && m(),
            b && setTimeout(j, a.statusInterval)
        }
        ;
        this.isBusy = function() {
            for (var a = 0, b = d.length; b > a; a++)
                if (d[a].status === g.QUEUED || d[a].status === g.WAITING)
                    return !0;
            return !1
        }
        ;
        var k = function(a, b) {
            var c, h, i, j, k, m = null ;
            for (c = 0,
            h = d.length; h > c; c++)
                if (d[c].resource === a) {
                    m = d[c];
                    break
                }
            if (null  != m && m.status === g.WAITING)
                for (m.status = b,
                f = Date.now(),
                i = a.tags.length,
                c = 0,
                h = e.length; h > c; c++)
                    j = e[c],
                    k = 0 === j.tags.length ? !0 : a.tags.intersects(j.tags),
                    k && l(m, j)
        }
        ;
        this.onLoad = function(a) {
            k(a, g.LOADED)
        }
        ,
        this.onError = function(a) {
            k(a, g.ERROR)
        }
        ,
        this.onTimeout = function(a) {
            k(a, g.TIMEOUT)
        }
        ;
        var l = function(a, b) {
            var c, e, f, h, i = 0, j = 0;
            for (c = 0,
            e = d.length; e > c; c++)
                f = d[c],
                h = !1,
                h = 0 === b.tags.length ? !0 : f.resource.tags.intersects(b.tags),
                h && (j++,
                (f.status === g.LOADED || f.status === g.ERROR || f.status === g.TIMEOUT) && i++);
            b.callback({
                resource: a.resource,
                loaded: a.status === g.LOADED,
                error: a.status === g.ERROR,
                timeout: a.status === g.TIMEOUT,
                completedCount: i,
                totalCount: j
            })
        }
          , m = this.log = function(a) {
            if (window.console) {
                var c = Math.round((Date.now() - b) / 1e3);
                window.console.log("PxLoader elapsed: " + c + " sec");
                for (var e = 0, f = d.length; f > e; e++) {
                    var h = d[e];
                    if (a || h.status === g.WAITING) {
                        var i = "PxLoader: #" + e + " " + h.resource.getName();
                        switch (h.status) {
                        case g.QUEUED:
                            i += " (Not Started)";
                            break;
                        case g.WAITING:
                            i += " (Waiting)";
                            break;
                        case g.LOADED:
                            i += " (Loaded)";
                            break;
                        case g.ERROR:
                            i += " (Error)";
                            break;
                        case g.TIMEOUT:
                            i += " (Timeout)"
                        }
                        h.resource.tags.length > 0 && (i += " Tags: [" + h.resource.tags.all.join(",") + "]"),
                        window.console.log(i)
                    }
                }
            }
        }
    }
    function c(a) {
        if (this.all = [],
        this.first = null ,
        this.length = 0,
        this.lookup = {},
        a) {
            if (Array.isArray(a))
                this.all = a.slice(0);
            else if ("object" == typeof a)
                for (var b in a)
                    a.hasOwnProperty(b) && this.all.push(b);
            else
                this.all.push(a);
            this.length = this.all.length,
            this.length > 0 && (this.first = this.all[0]);
            for (var c = 0; c < this.length; c++)
                this.lookup[this.all[c]] = !0
        }
    }
    c.prototype.intersects = function(a) {
        if (0 === this.length || 0 === a.length)
            return !1;
        if (1 === this.length && 1 === a.length)
            return this.first === a.first;
        if (a.length < this.length)
            return a.intersects(this);
        for (var b in this.lookup)
            if (a.lookup[b])
                return !0;
        return !1
    }
    ,
    "function" == typeof define && define.amd && define("PxLoader", [], function() {
        return b
    }),
    a.PxLoader = b
}(this),
Date.now || (Date.now = function() {
    return (new Date).getTime()
}
),
Array.isArray || (Array.isArray = function(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
}
),
PxLoader.prototype.addImage = function(a, b, c) {
    var d = new PxLoaderImage(a,b,c);
    return this.add(d),
    d.img
}
,
"function" == typeof define && define.amd && define("PxLoaderImage", [], function() {
    return PxLoaderImage
}),
PxLoader.prototype.addSound = function(a, b, c, d) {
    var e = new PxLoaderSound(a,b,c,d);
    return this.add(e),
    e.sound
}
,
"function" == typeof define && define.amd && define("PxLoaderSound", [], function() {
    return PxLoaderSound
}),
PxLoader.prototype.addVideo = function(a, b, c) {
    var d = new PxLoaderVideo(a,b,c);
    return this.add(d),
    d.vid
}
,
"function" == typeof define && define.amd && define("PxLoaderVideo", [], function() {
    return PxLoaderVideo
}),
function(a) {
    "function" == typeof define && define.amd ? define(a) : window.purl = a()
}(function() {
    function a(a, b) {
        for (var c = decodeURI(a), d = p[b ? "strict" : "loose"].exec(c), e = {
            attr: {},
            param: {},
            seg: {}
        }, g = 14; g--; )
            e.attr[n[g]] = d[g] || "";
        return e.param.query = f(e.attr.query),
        e.param.fragment = f(e.attr.fragment),
        e.seg.path = e.attr.path.replace(/^\/+|\/+$/g, "").split("/"),
        e.seg.fragment = e.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"),
        e.attr.base = e.attr.host ? (e.attr.protocol ? e.attr.protocol + "://" + e.attr.host : e.attr.host) + (e.attr.port ? ":" + e.attr.port : "") : "",
        e
    }
    function b(a) {
        var b = a.tagName;
        return "undefined" != typeof b ? m[b.toLowerCase()] : b
    }
    function c(a, b) {
        if (0 === a[b].length)
            return a[b] = {};
        var c = {};
        for (var d in a[b])
            c[d] = a[b][d];
        return a[b] = c,
        c
    }
    function d(a, b, e, f) {
        var g = a.shift();
        if (g) {
            var h = b[e] = b[e] || [];
            "]" == g ? j(h) ? "" !== f && h.push(f) : "object" == typeof h ? h[k(h).length] = f : h = b[e] = [b[e], f] : ~g.indexOf("]") ? (g = g.substr(0, g.length - 1),
            !q.test(g) && j(h) && (h = c(b, e)),
            d(a, h, g, f)) : (!q.test(g) && j(h) && (h = c(b, e)),
            d(a, h, g, f))
        } else
            j(b[e]) ? b[e].push(f) : "object" == typeof b[e] ? b[e] = f : "undefined" == typeof b[e] ? b[e] = f : b[e] = [b[e], f]
    }
    function e(a, b, c) {
        if (~b.indexOf("]")) {
            var e = b.split("[");
            d(e, a, "base", c)
        } else {
            if (!q.test(b) && j(a.base)) {
                var f = {};
                for (var h in a.base)
                    f[h] = a.base[h];
                a.base = f
            }
            "" !== b && g(a.base, b, c)
        }
        return a
    }
    function f(a) {
        return i(String(a).split(/&|;/), function(a, b) {
            try {
                b = decodeURIComponent(b.replace(/\+/g, " "))
            } catch (c) {}
            var d = b.indexOf("=")
              , f = h(b)
              , g = b.substr(0, f || d)
              , i = b.substr(f || d, b.length);
            return i = i.substr(i.indexOf("=") + 1, i.length),
            "" === g && (g = b,
            i = ""),
            e(a, g, i)
        }, {
            base: {}
        }).base
    }
    function g(a, b, c) {
        var d = a[b];
        "undefined" == typeof d ? a[b] = c : j(d) ? d.push(c) : a[b] = [d, c]
    }
    function h(a) {
        for (var b, c, d = a.length, e = 0; d > e; ++e)
            if (c = a[e],
            "]" == c && (b = !1),
            "[" == c && (b = !0),
            "=" == c && !b)
                return e
    }
    function i(a, b) {
        for (var c = 0, d = a.length >> 0, e = arguments[2]; d > c; )
            c in a && (e = b.call(void 0, e, a[c], c, a)),
            ++c;
        return e
    }
    function j(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
    function k(a) {
        var b = [];
        for (var c in a)
            a.hasOwnProperty(c) && b.push(c);
        return b
    }
    function l(b, c) {
        return 1 === arguments.length && b === !0 && (c = !0,
        b = void 0),
        c = c || !1,
        b = b || window.location.toString(),
        {
            data: a(b, c),
            attr: function(a) {
                return a = o[a] || a,
                "undefined" != typeof a ? this.data.attr[a] : this.data.attr
            },
            param: function(a) {
                return "undefined" != typeof a ? this.data.param.query[a] : this.data.param.query
            },
            fparam: function(a) {
                return "undefined" != typeof a ? this.data.param.fragment[a] : this.data.param.fragment
            },
            segment: function(a) {
                return "undefined" == typeof a ? this.data.seg.path : (a = 0 > a ? this.data.seg.path.length + a : a - 1,
                this.data.seg.path[a])
            },
            fsegment: function(a) {
                return "undefined" == typeof a ? this.data.seg.fragment : (a = 0 > a ? this.data.seg.fragment.length + a : a - 1,
                this.data.seg.fragment[a])
            }
        }
    }
    var m = {
        a: "href",
        img: "src",
        form: "action",
        base: "href",
        script: "src",
        iframe: "src",
        link: "href",
        embed: "src",
        object: "data"
    }
      , n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"]
      , o = {
        anchor: "fragment"
    }
      , p = {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
      , q = /^[0-9]+$/;
    return l.jQuery = function(a) {
        null  != a && (a.fn.url = function(c) {
            var d = "";
            return this.length && (d = a(this).attr(b(this[0])) || ""),
            l(d, c)
        }
        ,
        a.url = l)
    }
    ,
    l.jQuery(window.jQuery),
    l
}),
THREE.ColladaLoader = function() {
    function a(a, c, d) {
        var e = 0;
        if (document.implementation && document.implementation.createDocument) {
            var f = new XMLHttpRequest;
            f.onreadystatechange = function() {
                if (4 == f.readyState) {
                    if (0 == f.status || 200 == f.status)
                        if (f.responseXML)
                            Fa = c,
                            b(f.responseXML, void 0, a);
                        else if (f.responseText) {
                            Fa = c;
                            var g = new DOMParser
                              , h = g.parseFromString(f.responseText, "application/xml");
                            b(h, void 0, a)
                        } else
                            console.error("ColladaLoader: Empty or non-existing file (" + a + ")")
                } else
                    3 == f.readyState && d && (0 == e && (e = f.getResponseHeader("Content-Length")),
                    d({
                        total: e,
                        loaded: f.responseText.length
                    }))
            }
            ,
            f.open("GET", a, !0),
            f.send(null )
        } else
            alert("Don't know how to parse XML!")
    }
    function b(a, b, c) {
        if (Da = a,
        b = b || Fa,
        void 0 !== c) {
            var h = c.split("/");
            h.pop(),
            Aa = (h.length < 1 ? "." : h.join("/")) + "/"
        }
        d(),
        ra(),
        Ha = e("library_images image", D, "image"),
        La = e("library_materials material", W, "material"),
        Ma = e("library_effects effect", _, "effect"),
        Ka = e("library_geometries geometry", N, "geometry"),
        Na = e("library_cameras camera", fa, "camera"),
        Oa = e("library_lights light", ha, "light"),
        Ja = e("library_controllers controller", E, "controller"),
        Ia = e("library_animations animation", ba, "animation"),
        za = e("library_visual_scenes visual_scene", H, "visual_scene"),
        Ba = [],
        Ca = [],
        xa = f(),
        Ea = new THREE.Object3D;
        for (var i = 0; i < xa.nodes.length; i++)
            Ea.add(r(xa.nodes[i]));
        Ea.scale.multiplyScalar(Ra),
        g();
        var j = {
            scene: Ea,
            morphs: Ba,
            skins: Ca,
            animations: ya,
            dae: {
                images: Ha,
                materials: La,
                cameras: Na,
                lights: Oa,
                effects: Ma,
                geometries: Ka,
                controllers: Ja,
                animations: Ia,
                visualScenes: za,
                scene: xa
            }
        };
        return b && b(j),
        j
    }
    function c(a) {
        Pa = a
    }
    function d() {
        var a = Da.querySelectorAll("asset")
          , b = a[0];
        if (b && b.childNodes)
            for (var c = 0; c < b.childNodes.length; c++) {
                var d = b.childNodes[c];
                switch (d.nodeName) {
                case "unit":
                    var e = d.getAttribute("meter");
                    e && (Ra = parseFloat(e));
                    break;
                case "up_axis":
                    Sa = d.textContent.charAt(0)
                }
            }
    }
    function e(a, b, c) {
        for (var d = Da.querySelectorAll(a), e = {}, f = 0, g = d.length, h = 0; g > h; h++) {
            var i = d[h]
              , j = (new b).parse(i);
            j.id && 0 != j.id.length || (j.id = c + f++),
            e[j.id] = j
        }
        return e
    }
    function f() {
        var a = Da.querySelectorAll("scene instance_visual_scene")[0];
        if (a) {
            var b = a.getAttribute("url").replace(/^#/, "");
            return za[b.length > 0 ? b : "visual_scene0"]
        }
        return null 
    }
    function g() {
        ya = [],
        h(Ea)
    }
    function h(a) {
        var b = xa.getChildById(a.name, !0)
          , c = null ;
        if (b && b.keys) {
            c = {
                fps: 60,
                hierarchy: [{
                    node: b,
                    keys: b.keys,
                    sids: b.sids
                }],
                node: a,
                name: "animation_" + a.name,
                length: 0
            },
            ya.push(c);
            for (var d = 0, e = b.keys.length; e > d; d++)
                c.length = Math.max(c.length, b.keys[d].time)
        } else
            c = {
                hierarchy: [{
                    keys: [],
                    sids: []
                }]
            };
        for (var d = 0, e = a.children.length; e > d; d++)
            for (var f = h(a.children[d]), g = 0, i = f.hierarchy.length; i > g; g++)
                c.hierarchy.push({
                    keys: [],
                    sids: []
                });
        return c
    }
    function i() {
        var a, b = 1e6, c = -b, d = 0;
        for (var e in Ia) {
            var f = Ia[e];
            a = a || f.id;
            for (var g = 0; g < f.sampler.length; g++) {
                var h = f.sampler[g];
                h.create(),
                b = Math.min(b, h.startTime),
                c = Math.max(c, h.endTime),
                d = Math.max(d, h.input.length)
            }
        }
        return {
            start: b,
            end: c,
            frames: d,
            ID: a
        }
    }
    function k(a, b) {
        var c = b instanceof K ? Ja[b.url] : b;
        if (!c || !c.morph)
            return void console.log("could not find morph controller!");
        for (var d = c.morph, e = 0; e < d.targets.length; e++) {
            var f = d.targets[e]
              , g = Ka[f];
            if (g.mesh && g.mesh.primitives && g.mesh.primitives.length) {
                var h = g.mesh.primitives[0].geometry;
                h.vertices.length === a.vertices.length && a.morphTargets.push({
                    name: "target_1",
                    vertices: h.vertices
                })
            }
        }
        a.morphTargets.push({
            name: "target_Z",
            vertices: a.vertices
        })
    }
    function l(a, b, c, d) {
        if (a.world = a.world || new THREE.Matrix4,
        a.localworld = a.localworld || new THREE.Matrix4,
        a.world.copy(a.matrix),
        a.localworld.copy(a.matrix),
        a.channels && a.channels.length) {
            var e = a.channels[0]
              , f = e.sampler.output[c];
            f instanceof THREE.Matrix4 && (a.world.copy(f),
            a.localworld.copy(f),
            0 == c && a.matrix.copy(f))
        }
        d && a.world.multiplyMatrices(d, a.world),
        b.push(a);
        for (var g = 0; g < a.nodes.length; g++)
            l(a.nodes[g], b, c, a.world)
    }
    function m(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = a[c]
              , e = -1;
            if ("JOINT" == d.type) {
                for (var f = 0; f < b.joints.length; f++)
                    if (d.sid == b.joints[f]) {
                        e = f;
                        break
                    }
                if (e >= 0) {
                    var g = b.invBindMatrices[e];
                    d.invBindMatrix = g,
                    d.skinningMatrix = new THREE.Matrix4,
                    d.skinningMatrix.multiplyMatrices(d.world, g),
                    d.animatrix = new THREE.Matrix4,
                    d.animatrix.copy(d.localworld),
                    d.weights = [];
                    for (var f = 0; f < b.weights.length; f++)
                        for (var h = 0; h < b.weights[f].length; h++) {
                            var i = b.weights[f][h];
                            i.joint == e && d.weights.push(i)
                        }
                } else
                    console.warn("ColladaLoader: Could not find joint '" + d.sid + "'."),
                    d.skinningMatrix = new THREE.Matrix4,
                    d.weights = []
            }
        }
    }
    function n(a) {
        var b = []
          , c = function(a, b, d) {
            var e = {};
            e.name = b.sid,
            e.parent = a,
            e.matrix = b.matrix;
            var f = [new THREE.Vector3, new THREE.Quaternion, new THREE.Vector3];
            e.matrix.decompose(f[0], f[1], f[2]),
            e.pos = [f[0].x, f[0].y, f[0].z],
            e.scl = [f[2].x, f[2].y, f[2].z],
            e.rotq = [f[1].x, f[1].y, f[1].z, f[1].w],
            d.push(e);
            for (var g in b.nodes)
                c(b.sid, b.nodes[g], d)
        }
        ;
        return c(-1, a, b),
        b
    }
    function p(a, b, c) {
        var d = [];
        l(b, d, -1),
        m(d, c.skin),
        v = new THREE.Vector3;
        for (var e = [], f = 0; f < a.vertices.length; f++)
            e.push(new THREE.Vector3);
        for (f = 0; f < d.length; f++)
            if ("JOINT" == d[f].type)
                for (j = 0; j < d[f].weights.length; j++)
                    w = d[f].weights[j],
                    vidx = w.index,
                    weight = w.weight,
                    o = a.vertices[vidx],
                    s = e[vidx],
                    v.x = o.x,
                    v.y = o.y,
                    v.z = o.z,
                    v.applyMatrix4(d[f].skinningMatrix),
                    s.x += v.x * weight,
                    s.y += v.y * weight,
                    s.z += v.z * weight;
        for (var f = 0; f < a.vertices.length; f++)
            a.vertices[f] = e[f]
    }
    function q(a, b, c) {
        var d = 30
          , e = Ja[b.url];
        if (c = void 0 !== c ? c : 40,
        !e || !e.skin)
            return void console.log("ColladaLoader: Could not find skin controller.");
        if (!b.skeleton || !b.skeleton.length)
            return void console.log("ColladaLoader: Could not find the skeleton for the skin. ");
        for (var f = i(), g = xa.getChildById(b.skeleton[0], !0) || xa.getChildBySid(b.skeleton[0], !0), h = n(g), j = e.skin.joints, k = [], o = 0; o < j.length; o++)
            for (var q = 0; q < h.length; q++)
                h[q].name == j[o] && (k[o] = h[q]);
        for (var o = 0; o < k.length; o++)
            for (var q = 0; q < k.length; q++)
                k[o].parent == k[q].name && (k[o].parent = q);
        var o, q, r, s, t, u, v, w = new THREE.Vector3;
        for (o = 0; o < a.vertices.length; o++)
            a.vertices[o].applyMatrix4(e.skin.bindShapeMatrix);
        for (var x = [], y = [], z = e.skin.weights, o = 0; o < z.length; o++) {
            var A = new THREE.Vector4(z[o][0] ? z[o][0].joint : 0,z[o][1] ? z[o][1].joint : 0,z[o][2] ? z[o][2].joint : 0,z[o][3] ? z[o][3].joint : 0)
              , t = new THREE.Vector4(z[o][0] ? z[o][0].weight : 0,z[o][1] ? z[o][1].weight : 0,z[o][2] ? z[o][2].weight : 0,z[o][3] ? z[o][3].weight : 0);
            x.push(A),
            y.push(t)
        }
        a.skinIndices = x,
        a.skinWeights = y,
        a.bones = k;
        for (var B = {
            name: f.ID,
            fps: 30,
            length: f.frames / 30,
            hierarchy: []
        }, q = 0; q < k.length; q++)
            B.hierarchy.push({
                parent: k[q].parent,
                name: k[q].name,
                keys: []
            });
        for (k.length < d && p(a, g, e),
        c = 0; c < f.frames; c++) {
            var C = []
              , D = [];
            if (l(g, C, c),
            m(C, e.skin),
            k.length < d) {
                for (var o = 0; o < C.length; o++)
                    for (var q = 0; q < B.hierarchy.length; q++)
                        if (B.hierarchy[q].name == C[o].sid) {
                            var E = {};
                            E.time = c / 30,
                            E.matrix = C[o].animatrix,
                            0 == c && (C[o].matrix = E.matrix);
                            var F = [new THREE.Vector3, new THREE.Quaternion, new THREE.Vector3];
                            E.matrix.decompose(F[0], F[1], F[2]),
                            E.pos = [F[0].x, F[0].y, F[0].z],
                            E.scl = [F[2].x, F[2].y, F[2].z],
                            E.rot = F[1],
                            B.hierarchy[q].keys.push(E)
                        }
                a.animation = B
            } else {
                for (o = 0; o < a.vertices.length; o++)
                    D.push(new THREE.Vector3);
                for (o = 0; o < C.length; o++)
                    if ("JOINT" == C[o].type)
                        for (q = 0; q < C[o].weights.length; q++)
                            r = C[o].weights[q],
                            s = r.index,
                            t = r.weight,
                            u = a.vertices[s],
                            v = D[s],
                            w.x = u.x,
                            w.y = u.y,
                            w.z = u.z,
                            w.applyMatrix4(C[o].skinningMatrix),
                            v.x += w.x * t,
                            v.y += w.y * t,
                            v.z += w.z * t;
                a.morphTargets.push({
                    name: "target_" + c,
                    vertices: D
                })
            }
        }
    }
    function r(a, b) {
        var c, d, e, f, g = new THREE.Object3D, h = !1;
        for (e = 0; e < a.controllers.length; e++) {
            var i = Ja[a.controllers[e].url];
            switch (i.type) {
            case "skin":
                if (Ka[i.skin.source]) {
                    var j = new M;
                    j.url = i.skin.source,
                    j.instance_material = a.controllers[e].instance_material,
                    a.geometries.push(j),
                    h = !0,
                    c = a.controllers[e]
                } else if (Ja[i.skin.source]) {
                    var l = Ja[i.skin.source];
                    if (d = l,
                    l.morph && Ka[l.morph.source]) {
                        var j = new M;
                        j.url = l.morph.source,
                        j.instance_material = a.controllers[e].instance_material,
                        a.geometries.push(j)
                    }
                }
                break;
            case "morph":
                if (Ka[i.morph.source]) {
                    var j = new M;
                    j.url = i.morph.source,
                    j.instance_material = a.controllers[e].instance_material,
                    a.geometries.push(j),
                    d = a.controllers[e]
                }
                console.log("ColladaLoader: Morph-controller partially supported.")
            }
        }
        var m = {};
        for (e = 0; e < a.geometries.length; e++) {
            var n, o = a.geometries[e], p = o.instance_material, s = Ka[o.url], t = {}, u = [], v = 0;
            if (s) {
                if (!s.mesh || !s.mesh.primitives)
                    continue;if (0 == g.name.length && (g.name = s.id),
                p)
                    for (f = 0; f < p.length; f++) {
                        var w = p[f]
                          , x = La[w.target]
                          , y = x.instance_effect.url
                          , z = Ma[y].shader
                          , A = z.material;
                        if (s.doubleSided) {
                            if (!(w.symbol in m)) {
                                var B = A.clone();
                                B.side = THREE.DoubleSide,
                                m[w.symbol] = B
                            }
                            A = m[w.symbol]
                        }
                        A.opacity = A.opacity ? A.opacity : 1,
                        t[w.symbol] = v,
                        u.push(A),
                        n = A,
                        n.name = null  == x.name || "" === x.name ? x.id : x.name,
                        v++
                    }
                var C, D = n || new THREE.MeshLambertMaterial({
                    color: 14540253,
                    shading: THREE.FlatShading,
                    side: s.doubleSided ? THREE.DoubleSide : THREE.FrontSide
                }), E = s.mesh.geometry3js;
                if (v > 1)
                    for (D = new THREE.MeshFaceMaterial(u),
                    f = 0; f < E.faces.length; f++) {
                        var F = E.faces[f];
                        F.materialIndex = t[F.daeMaterial]
                    }
                void 0 !== c ? (q(E, c),
                E.morphTargets.length > 0 ? (D.morphTargets = !0,
                D.skinning = !1) : (D.morphTargets = !1,
                D.skinning = !0),
                C = new THREE.SkinnedMesh(E,D,!1),
                C.name = "skin_" + Ca.length,
                Ca.push(C)) : void 0 !== d ? (k(E, d),
                D.morphTargets = !0,
                C = new THREE.Mesh(E,D),
                C.name = "morph_" + Ba.length,
                Ba.push(C)) : C = new THREE.Mesh(E,D),
                a.geometries.length > 1 ? g.add(C) : g = C
            }
        }
        for (e = 0; e < a.cameras.length; e++) {
            var G = a.cameras[e]
              , H = Na[G.url];
            g = new THREE.PerspectiveCamera(H.fov,parseFloat(H.aspect_ratio),parseFloat(H.znear),parseFloat(H.zfar))
        }
        for (e = 0; e < a.lights.length; e++) {
            var I = a.lights[e]
              , J = Oa[I.url];
            if (J && J.technique) {
                var K, L = J.color.getHex(), N = J.intensity, O = 0, P = J.falloff_angle;
                switch (J.technique) {
                case "directional":
                    g = new THREE.DirectionalLight(L,N,O);
                    break;
                case "point":
                    g = new THREE.PointLight(L,N,O);
                    break;
                case "spot":
                    g = new THREE.SpotLight(L,N,O,P,K);
                    break;
                case "ambient":
                    g = new THREE.AmbientLight(L)
                }
            }
        }
        if (g.name = a.name || a.id || "",
        g.layer = a.layer || "",
        g.matrix = a.matrix,
        g.matrix.decompose(g.position, g.quaternion, g.scale),
        Qa.centerGeometry && g.geometry) {
            var Q = THREE.GeometryUtils.center(g.geometry);
            Q.multiply(g.scale),
            Q.applyQuaternion(g.quaternion),
            g.position.sub(Q)
        }
        for (e = 0; e < a.nodes.length; e++)
            g.add(r(a.nodes[e], a));
        return g
    }
    function t(a) {
        for (var b = Da.querySelectorAll("library_nodes node"), c = 0; c < b.length; c++) {
            var d = b[c].attributes.getNamedItem("id");
            if (d && d.value === a)
                return b[c]
        }
        return void 0
    }
    function u(a) {
        var b = []
          , c = 1e6
          , d = -1e6;
        for (var e in Ia)
            for (var f = Ia[e], g = 0; g < f.channel.length; g++) {
                var h = f.channel[g]
                  , i = f.sampler[g]
                  , e = h.target.split("/")[0];
                e == a.id && (i.create(),
                h.sampler = i,
                c = Math.min(c, i.startTime),
                d = Math.max(d, i.endTime),
                b.push(h))
            }
        return b.length && (a.startTime = c,
        a.endTime = d),
        b
    }
    function x(a) {
        if (a.channels && a.channels.length) {
            for (var b = [], c = [], d = 0, e = a.channels.length; e > d; d++) {
                var f, g = a.channels[d], h = g.fullSid, i = g.sampler, j = i.input, k = a.getTransformBySid(g.sid);
                if (g.arrIndices) {
                    f = [];
                    for (var l = 0, m = g.arrIndices.length; m > l; l++)
                        f[l] = va(g.arrIndices[l])
                } else
                    f = wa(g.member);
                if (k) {
                    -1 === c.indexOf(h) && c.push(h);
                    for (var l = 0, m = j.length; m > l; l++) {
                        var n = j[l]
                          , o = i.getData(k.type, l)
                          , p = y(b, n);
                        if (!p) {
                            p = new ea(n);
                            var q = z(b, n);
                            b.splice(-1 == q ? b.length : q, 0, p)
                        }
                        p.addTarget(h, k, f, o)
                    }
                } else
                    console.log('Could not find transform "' + g.sid + '" in node ' + a.id)
            }
            for (var d = 0; d < c.length; d++)
                for (var r = c[d], l = 0; l < b.length; l++) {
                    var p = b[l];
                    p.hasTarget(r) || A(b, p, l, r)
                }
            a.keys = b,
            a.sids = c
        }
    }
    function y(a, b) {
        for (var c = null , d = 0, e = a.length; e > d && null  == c; d++) {
            var f = a[d];
            if (f.time === b)
                c = f;
            else if (f.time > b)
                break
        }
        return c
    }
    function z(a, b) {
        for (var c = -1, d = 0, e = a.length; e > d && -1 == c; d++) {
            var f = a[d];
            f.time >= b && (c = d)
        }
        return c
    }
    function A(a, b, c, d) {
        var e = C(a, d, c ? c - 1 : 0)
          , f = B(a, d, c + 1);
        if (e && f) {
            var g, h = (b.time - e.time) / (f.time - e.time), i = e.getTarget(d), j = f.getTarget(d).data, k = i.data;
            if ("matrix" === i.type)
                g = k;
            else if (k.length) {
                g = [];
                for (var l = 0; l < k.length; ++l)
                    g[l] = k[l] + (j[l] - k[l]) * h
            } else
                g = k + (j - k) * h;
            b.addTarget(d, i.transform, i.member, g)
        }
    }
    function B(a, b, c) {
        for (; c < a.length; c++) {
            var d = a[c];
            if (d.hasTarget(b))
                return d
        }
        return null 
    }
    function C(a, b, c) {
        for (c = c >= 0 ? c : c + a.length; c >= 0; c--) {
            var d = a[c];
            if (d.hasTarget(b))
                return d
        }
        return null 
    }
    function D() {
        this.id = "",
        this.init_from = ""
    }
    function E() {
        this.id = "",
        this.name = "",
        this.type = "",
        this.skin = null ,
        this.morph = null 
    }
    function F() {
        this.method = null ,
        this.source = null ,
        this.targets = null ,
        this.weights = null 
    }
    function G() {
        this.source = "",
        this.bindShapeMatrix = null ,
        this.invBindMatrices = [],
        this.joints = [],
        this.weights = []
    }
    function H() {
        this.id = "",
        this.name = "",
        this.nodes = [],
        this.scene = new THREE.Object3D
    }
    function I() {
        this.id = "",
        this.name = "",
        this.sid = "",
        this.nodes = [],
        this.controllers = [],
        this.transforms = [],
        this.geometries = [],
        this.channels = [],
        this.matrix = new THREE.Matrix4
    }
    function J() {
        this.sid = "",
        this.type = "",
        this.data = [],
        this.obj = null 
    }
    function K() {
        this.url = "",
        this.skeleton = [],
        this.instance_material = []
    }
    function L() {
        this.symbol = "",
        this.target = ""
    }
    function M() {
        this.url = "",
        this.instance_material = []
    }
    function N() {
        this.id = "",
        this.mesh = null 
    }
    function O(a) {
        this.geometry = a.id,
        this.primitives = [],
        this.vertices = null ,
        this.geometry3js = null 
    }
    function P() {
        this.material = "",
        this.count = 0,
        this.inputs = [],
        this.vcount = null ,
        this.p = [],
        this.geometry = new THREE.Geometry
    }
    function Q() {
        P.call(this),
        this.vcount = []
    }
    function R() {
        P.call(this),
        this.vcount = 3
    }
    function S() {
        this.source = "",
        this.count = 0,
        this.stride = 0,
        this.params = []
    }
    function T() {
        this.input = {}
    }
    function U() {
        this.semantic = "",
        this.offset = 0,
        this.source = "",
        this.set = 0
    }
    function V(a) {
        this.id = a,
        this.type = null 
    }
    function W() {
        this.id = "",
        this.name = "",
        this.instance_effect = null 
    }
    function X() {
        this.color = new THREE.Color,
        this.color.setRGB(Math.random(), Math.random(), Math.random()),
        this.color.a = 1,
        this.texture = null ,
        this.texcoord = null ,
        this.texOpts = null 
    }
    function Y(a, b) {
        this.type = a,
        this.effect = b,
        this.material = null 
    }
    function Z(a) {
        this.effect = a,
        this.init_from = null ,
        this.format = null 
    }
    function $(a) {
        this.effect = a,
        this.source = null ,
        this.wrap_s = null ,
        this.wrap_t = null ,
        this.minfilter = null ,
        this.magfilter = null ,
        this.mipfilter = null 
    }
    function _() {
        this.id = "",
        this.name = "",
        this.shader = null ,
        this.surface = {},
        this.sampler = {}
    }
    function aa() {
        this.url = ""
    }
    function ba() {
        this.id = "",
        this.name = "",
        this.source = {},
        this.sampler = [],
        this.channel = []
    }
    function ca(a) {
        this.animation = a,
        this.source = "",
        this.target = "",
        this.fullSid = null ,
        this.sid = null ,
        this.dotSyntax = null ,
        this.arrSyntax = null ,
        this.arrIndices = null ,
        this.member = null 
    }
    function da(a) {
        this.id = "",
        this.animation = a,
        this.inputs = [],
        this.input = null ,
        this.output = null ,
        this.strideOut = null ,
        this.interpolation = null ,
        this.startTime = null ,
        this.endTime = null ,
        this.duration = 0
    }
    function ea(a) {
        this.targets = [],
        this.time = a
    }
    function fa() {
        this.id = "",
        this.name = "",
        this.technique = ""
    }
    function ga() {
        this.url = ""
    }
    function ha() {
        this.id = "",
        this.name = "",
        this.technique = ""
    }
    function ia() {
        this.url = ""
    }
    function ja(a) {
        var b = a.getAttribute("id");
        return void 0 != Ga[b] ? Ga[b] : (Ga[b] = new V(b).parse(a),
        Ga[b])
    }
    function ka(a) {
        for (var b = na(a), c = [], d = 0, e = b.length; e > d; d++)
            c.push("true" == b[d] || "1" == b[d] ? !0 : !1);
        return c
    }
    function la(a) {
        for (var b = na(a), c = [], d = 0, e = b.length; e > d; d++)
            c.push(parseFloat(b[d]));
        return c
    }
    function ma(a) {
        for (var b = na(a), c = [], d = 0, e = b.length; e > d; d++)
            c.push(parseInt(b[d], 10));
        return c
    }
    function na(a) {
        return a.length > 0 ? oa(a).split(/\s+/) : []
    }
    function oa(a) {
        return a.replace(/^\s+/, "").replace(/\s+$/, "")
    }
    function pa(a, b, c) {
        return a.hasAttribute(b) ? parseInt(a.getAttribute(b), 10) : c
    }
    function qa(a, b) {
        a.doubleSided = !1;
        var c = b.querySelectorAll("extra double_sided")[0];
        c && c && 1 === parseInt(c.textContent, 10) && (a.doubleSided = !0)
    }
    function ra() {
        if (Qa.convertUpAxis && Sa !== Qa.upAxis)
            switch (Sa) {
            case "X":
                Ta = "Y" === Qa.upAxis ? "XtoY" : "XtoZ";
                break;
            case "Y":
                Ta = "X" === Qa.upAxis ? "YtoX" : "YtoZ";
                break;
            case "Z":
                Ta = "X" === Qa.upAxis ? "ZtoX" : "ZtoY"
            }
        else
            Ta = null 
    }
    function sa(a, b) {
        if (Qa.convertUpAxis && Sa !== Qa.upAxis)
            switch (Ta) {
            case "XtoY":
                var c = a[0];
                a[0] = b * a[1],
                a[1] = c;
                break;
            case "XtoZ":
                var c = a[2];
                a[2] = a[1],
                a[1] = a[0],
                a[0] = c;
                break;
            case "YtoX":
                var c = a[0];
                a[0] = a[1],
                a[1] = b * c;
                break;
            case "YtoZ":
                var c = a[1];
                a[1] = b * a[2],
                a[2] = c;
                break;
            case "ZtoX":
                var c = a[0];
                a[0] = a[1],
                a[1] = a[2],
                a[2] = c;
                break;
            case "ZtoY":
                var c = a[1];
                a[1] = a[2],
                a[2] = b * c
            }
    }
    function ta(a, b) {
        var c = [a[b], a[b + 1], a[b + 2]];
        return sa(c, -1),
        new THREE.Vector3(c[0],c[1],c[2])
    }
    function ua(a) {
        if (Qa.convertUpAxis) {
            var b = [a[0], a[4], a[8]];
            sa(b, -1),
            a[0] = b[0],
            a[4] = b[1],
            a[8] = b[2],
            b = [a[1], a[5], a[9]],
            sa(b, -1),
            a[1] = b[0],
            a[5] = b[1],
            a[9] = b[2],
            b = [a[2], a[6], a[10]],
            sa(b, -1),
            a[2] = b[0],
            a[6] = b[1],
            a[10] = b[2],
            b = [a[0], a[1], a[2]],
            sa(b, -1),
            a[0] = b[0],
            a[1] = b[1],
            a[2] = b[2],
            b = [a[4], a[5], a[6]],
            sa(b, -1),
            a[4] = b[0],
            a[5] = b[1],
            a[6] = b[2],
            b = [a[8], a[9], a[10]],
            sa(b, -1),
            a[8] = b[0],
            a[9] = b[1],
            a[10] = b[2],
            b = [a[3], a[7], a[11]],
            sa(b, -1),
            a[3] = b[0],
            a[7] = b[1],
            a[11] = b[2]
        }
        return new THREE.Matrix4(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15])
    }
    function va(a) {
        if (a > -1 && 3 > a) {
            var b = ["X", "Y", "Z"]
              , c = {
                X: 0,
                Y: 1,
                Z: 2
            };
            a = wa(b[a]),
            a = c[a]
        }
        return a
    }
    function wa(a) {
        if (Qa.convertUpAxis)
            switch (a) {
            case "X":
                switch (Ta) {
                case "XtoY":
                case "XtoZ":
                case "YtoX":
                    a = "Y";
                    break;
                case "ZtoX":
                    a = "Z"
                }
                break;
            case "Y":
                switch (Ta) {
                case "XtoY":
                case "YtoX":
                case "ZtoX":
                    a = "X";
                    break;
                case "XtoZ":
                case "YtoZ":
                case "ZtoY":
                    a = "Z"
                }
                break;
            case "Z":
                switch (Ta) {
                case "XtoZ":
                    a = "X";
                    break;
                case "YtoZ":
                case "ZtoX":
                case "ZtoY":
                    a = "Y"
                }
            }
        return a
    }
    var xa, ya, za, Aa, Ba, Ca, Da = null , Ea = null , Fa = null , Ga = {}, Ha = {}, Ia = {}, Ja = {}, Ka = {}, La = {}, Ma = {}, Na = {}, Oa = {}, Pa = THREE.SmoothShading, Qa = {
        centerGeometry: !1,
        convertUpAxis: !1,
        subdivideFaces: !0,
        upAxis: "Y",
        defaultEnvMap: null 
    }, Ra = 1, Sa = "Y", Ta = null ;
    return D.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            "init_from" == c.nodeName && (this.init_from = c.textContent)
        }
        return this
    }
    ,
    E.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name"),
        this.type = "none";
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "skin":
                this.skin = (new G).parse(c),
                this.type = c.nodeName;
                break;
            case "morph":
                this.morph = (new F).parse(c),
                this.type = c.nodeName
            }
        }
        return this
    }
    ,
    F.prototype.parse = function(a) {
        var b, c = {}, d = [];
        for (this.method = a.getAttribute("method"),
        this.source = a.getAttribute("source").replace(/^#/, ""),
        b = 0; b < a.childNodes.length; b++) {
            var e = a.childNodes[b];
            if (1 == e.nodeType)
                switch (e.nodeName) {
                case "source":
                    var f = (new V).parse(e);
                    c[f.id] = f;
                    break;
                case "targets":
                    d = this.parseInputs(e);
                    break;
                default:
                    console.log(e.nodeName)
                }
        }
        for (b = 0; b < d.length; b++) {
            var g = d[b]
              , f = c[g.source];
            switch (g.semantic) {
            case "MORPH_TARGET":
                this.targets = f.read();
                break;
            case "MORPH_WEIGHT":
                this.weights = f.read()
            }
        }
        return this
    }
    ,
    F.prototype.parseInputs = function(a) {
        for (var b = [], c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType)
                switch (d.nodeName) {
                case "input":
                    b.push((new U).parse(d))
                }
        }
        return b
    }
    ,
    G.prototype.parse = function(a) {
        var b, c, d = {};
        this.source = a.getAttribute("source").replace(/^#/, ""),
        this.invBindMatrices = [],
        this.joints = [],
        this.weights = [];
        for (var e = 0; e < a.childNodes.length; e++) {
            var f = a.childNodes[e];
            if (1 == f.nodeType)
                switch (f.nodeName) {
                case "bind_shape_matrix":
                    var g = la(f.textContent);
                    this.bindShapeMatrix = ua(g);
                    break;
                case "source":
                    var h = (new V).parse(f);
                    d[h.id] = h;
                    break;
                case "joints":
                    b = f;
                    break;
                case "vertex_weights":
                    c = f;
                    break;
                default:
                    console.log(f.nodeName)
                }
        }
        return this.parseJoints(b, d),
        this.parseWeights(c, d),
        this
    }
    ,
    G.prototype.parseJoints = function(a, b) {
        for (var c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType)
                switch (d.nodeName) {
                case "input":
                    var e = (new U).parse(d)
                      , f = b[e.source];
                    "JOINT" == e.semantic ? this.joints = f.read() : "INV_BIND_MATRIX" == e.semantic && (this.invBindMatrices = f.read())
                }
        }
    }
    ,
    G.prototype.parseWeights = function(a, b) {
        for (var c, d, e = [], f = 0; f < a.childNodes.length; f++) {
            var g = a.childNodes[f];
            if (1 == g.nodeType)
                switch (g.nodeName) {
                case "input":
                    e.push((new U).parse(g));
                    break;
                case "v":
                    c = ma(g.textContent);
                    break;
                case "vcount":
                    d = ma(g.textContent)
                }
        }
        for (var h = 0, f = 0; f < d.length; f++) {
            for (var i = d[f], j = [], k = 0; i > k; k++) {
                for (var l = {}, m = 0; m < e.length; m++) {
                    var n = e[m]
                      , o = c[h + n.offset];
                    switch (n.semantic) {
                    case "JOINT":
                        l.joint = o;
                        break;
                    case "WEIGHT":
                        l.weight = b[n.source].data[o]
                    }
                }
                j.push(l),
                h += e.length
            }
            for (var k = 0; k < j.length; k++)
                j[k].index = f;
            this.weights.push(j)
        }
    }
    ,
    H.prototype.getChildById = function(a, b) {
        for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildById(a, b);
            if (d)
                return d
        }
        return null 
    }
    ,
    H.prototype.getChildBySid = function(a, b) {
        for (var c = 0; c < this.nodes.length; c++) {
            var d = this.nodes[c].getChildBySid(a, b);
            if (d)
                return d
        }
        return null 
    }
    ,
    H.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name"),
        this.nodes = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "node":
                    this.nodes.push((new I).parse(c))
                }
        }
        return this
    }
    ,
    I.prototype.getChannelForTransform = function(a) {
        for (var b = 0; b < this.channels.length; b++) {
            var c, d, e = this.channels[b], f = e.target.split("/"), g = (f.shift(),
            f.shift()), h = g.indexOf(".") >= 0, i = g.indexOf("(") >= 0;
            if (h)
                f = g.split("."),
                g = f.shift(),
                d = f.shift();
            else if (i) {
                c = g.split("("),
                g = c.shift();
                for (var j = 0; j < c.length; j++)
                    c[j] = parseInt(c[j].replace(/\)/, ""))
            }
            if (g == a)
                return e.info = {
                    sid: g,
                    dotSyntax: h,
                    arrSyntax: i,
                    arrIndices: c
                },
                e
        }
        return null 
    }
    ,
    I.prototype.getChildById = function(a, b) {
        if (this.id == a)
            return this;
        if (b)
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildById(a, b);
                if (d)
                    return d
            }
        return null 
    }
    ,
    I.prototype.getChildBySid = function(a, b) {
        if (this.sid == a)
            return this;
        if (b)
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildBySid(a, b);
                if (d)
                    return d
            }
        return null 
    }
    ,
    I.prototype.getTransformBySid = function(a) {
        for (var b = 0; b < this.transforms.length; b++)
            if (this.transforms[b].sid == a)
                return this.transforms[b];
        return null 
    }
    ,
    I.prototype.parse = function(a) {
        var b;
        this.id = a.getAttribute("id"),
        this.sid = a.getAttribute("sid"),
        this.name = a.getAttribute("name"),
        this.type = a.getAttribute("type"),
        this.layer = a.getAttribute("layer"),
        this.type = "JOINT" == this.type ? this.type : "NODE",
        this.nodes = [],
        this.transforms = [],
        this.geometries = [],
        this.cameras = [],
        this.lights = [],
        this.controllers = [],
        this.matrix = new THREE.Matrix4;
        for (var c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType)
                switch (d.nodeName) {
                case "node":
                    this.nodes.push((new I).parse(d));
                    break;
                case "instance_camera":
                    this.cameras.push((new ga).parse(d));
                    break;
                case "instance_controller":
                    this.controllers.push((new K).parse(d));
                    break;
                case "instance_geometry":
                    this.geometries.push((new M).parse(d));
                    break;
                case "instance_light":
                    this.lights.push((new ia).parse(d));
                    break;
                case "instance_node":
                    b = d.getAttribute("url").replace(/^#/, "");
                    var e = t(b);
                    e && this.nodes.push((new I).parse(e));
                    break;
                case "rotate":
                case "translate":
                case "scale":
                case "matrix":
                case "lookat":
                case "skew":
                    this.transforms.push((new J).parse(d));
                    break;
                case "extra":
                    break;
                default:
                    console.log(d.nodeName)
                }
        }
        return this.channels = u(this),
        x(this),
        this.updateMatrix(),
        this
    }
    ,
    I.prototype.updateMatrix = function() {
        this.matrix.identity();
        for (var a = 0; a < this.transforms.length; a++)
            this.transforms[a].apply(this.matrix)
    }
    ,
    J.prototype.parse = function(a) {
        return this.sid = a.getAttribute("sid"),
        this.type = a.nodeName,
        this.data = la(a.textContent),
        this.convert(),
        this
    }
    ,
    J.prototype.convert = function() {
        switch (this.type) {
        case "matrix":
            this.obj = ua(this.data);
            break;
        case "rotate":
            this.angle = THREE.Math.degToRad(this.data[3]);
        case "translate":
            sa(this.data, -1),
            this.obj = new THREE.Vector3(this.data[0],this.data[1],this.data[2]);
            break;
        case "scale":
            sa(this.data, 1),
            this.obj = new THREE.Vector3(this.data[0],this.data[1],this.data[2]);
            break;
        default:
            console.log("Can not convert Transform of type " + this.type)
        }
    }
    ,
    J.prototype.apply = function() {
        var a = new THREE.Matrix4;
        return function(b) {
            switch (this.type) {
            case "matrix":
                b.multiply(this.obj);
                break;
            case "translate":
                b.multiply(a.makeTranslation(this.obj.x, this.obj.y, this.obj.z));
                break;
            case "rotate":
                b.multiply(a.makeRotationAxis(this.obj, this.angle));
                break;
            case "scale":
                b.scale(this.obj)
            }
        }
    }(),
    J.prototype.update = function(a, b) {
        var c = ["X", "Y", "Z", "ANGLE"];
        switch (this.type) {
        case "matrix":
            if (b)
                if (1 === b.length)
                    switch (b[0]) {
                    case 0:
                        this.obj.n11 = a[0],
                        this.obj.n21 = a[1],
                        this.obj.n31 = a[2],
                        this.obj.n41 = a[3];
                        break;
                    case 1:
                        this.obj.n12 = a[0],
                        this.obj.n22 = a[1],
                        this.obj.n32 = a[2],
                        this.obj.n42 = a[3];
                        break;
                    case 2:
                        this.obj.n13 = a[0],
                        this.obj.n23 = a[1],
                        this.obj.n33 = a[2],
                        this.obj.n43 = a[3];
                        break;
                    case 3:
                        this.obj.n14 = a[0],
                        this.obj.n24 = a[1],
                        this.obj.n34 = a[2],
                        this.obj.n44 = a[3]
                    }
                else if (2 === b.length) {
                    var d = "n" + (b[0] + 1) + (b[1] + 1);
                    this.obj[d] = a
                } else
                    console.log("Incorrect addressing of matrix in transform.");
            else
                this.obj.copy(a);
            break;
        case "translate":
        case "scale":
            switch ("[object Array]" === Object.prototype.toString.call(b) && (b = c[b[0]]),
            b) {
            case "X":
                this.obj.x = a;
                break;
            case "Y":
                this.obj.y = a;
                break;
            case "Z":
                this.obj.z = a;
                break;
            default:
                this.obj.x = a[0],
                this.obj.y = a[1],
                this.obj.z = a[2]
            }
            break;
        case "rotate":
            switch ("[object Array]" === Object.prototype.toString.call(b) && (b = c[b[0]]),
            b) {
            case "X":
                this.obj.x = a;
                break;
            case "Y":
                this.obj.y = a;
                break;
            case "Z":
                this.obj.z = a;
                break;
            case "ANGLE":
                this.angle = THREE.Math.degToRad(a);
                break;
            default:
                this.obj.x = a[0],
                this.obj.y = a[1],
                this.obj.z = a[2],
                this.angle = THREE.Math.degToRad(a[3])
            }
        }
    }
    ,
    K.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, ""),
        this.skeleton = [],
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 === c.nodeType)
                switch (c.nodeName) {
                case "skeleton":
                    this.skeleton.push(c.textContent.replace(/^#/, ""));
                    break;
                case "bind_material":
                    for (var d = c.querySelectorAll("instance_material"), e = 0; e < d.length; e++) {
                        var f = d[e];
                        this.instance_material.push((new L).parse(f))
                    }
                    break;
                case "extra":
                }
        }
        return this
    }
    ,
    L.prototype.parse = function(a) {
        return this.symbol = a.getAttribute("symbol"),
        this.target = a.getAttribute("target").replace(/^#/, ""),
        this
    }
    ,
    M.prototype.parse = function(a) {
        this.url = a.getAttribute("url").replace(/^#/, ""),
        this.instance_material = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType && "bind_material" == c.nodeName) {
                for (var d = c.querySelectorAll("instance_material"), e = 0; e < d.length; e++) {
                    var f = d[e];
                    this.instance_material.push((new L).parse(f))
                }
                break
            }
        }
        return this
    }
    ,
    N.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        qa(this, a);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "mesh":
                this.mesh = new O(this).parse(c);
                break;
            case "extra":
            }
        }
        return this
    }
    ,
    O.prototype.parse = function(a) {
        this.primitives = [];
        var b;
        for (b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "source":
                ja(c);
                break;
            case "vertices":
                this.vertices = (new T).parse(c);
                break;
            case "triangles":
                this.primitives.push((new R).parse(c));
                break;
            case "polygons":
                this.primitives.push((new P).parse(c));
                break;
            case "polylist":
                this.primitives.push((new Q).parse(c))
            }
        }
        this.geometry3js = new THREE.Geometry;
        var d = Ga[this.vertices.input.POSITION.source].data;
        for (b = 0; b < d.length; b += 3)
            this.geometry3js.vertices.push(ta(d, b).clone());
        for (b = 0; b < this.primitives.length; b++) {
            var e = this.primitives[b];
            e.setVertices(this.vertices),
            this.handlePrimitive(e, this.geometry3js)
        }
        return this.geometry3js.computeCentroids(),
        this.geometry3js.computeFaceNormals(),
        this.geometry3js.calcNormals && (this.geometry3js.computeVertexNormals(),
        delete this.geometry3js.calcNormals),
        this
    }
    ,
    O.prototype.handlePrimitive = function(a, b) {
        var c, d, e, f, g, h, i, j = a.p, k = a.inputs, l = 0, m = 3, n = 0, o = [];
        for (c = 0; c < k.length; c++) {
            e = k[c];
            var p = e.offset + 1;
            switch (n = p > n ? p : n,
            e.semantic) {
            case "TEXCOORD":
                o.push(e.set)
            }
        }
        for (var q = 0; q < j.length; ++q)
            for (var r = j[q], s = 0; s < r.length; ) {
                var t = []
                  , u = []
                  , v = null 
                  , w = [];
                for (m = a.vcount ? a.vcount.length ? a.vcount[l++] : a.vcount : r.length / n,
                c = 0; m > c; c++)
                    for (d = 0; d < k.length; d++)
                        switch (e = k[d],
                        h = Ga[e.source],
                        f = r[s + c * n + e.offset],
                        i = h.accessor.params.length,
                        g = f * i,
                        e.semantic) {
                        case "VERTEX":
                            t.push(f);
                            break;
                        case "NORMAL":
                            u.push(ta(h.data, g));
                            break;
                        case "TEXCOORD":
                            v = v || {},
                            void 0 === v[e.set] && (v[e.set] = []),
                            v[e.set].push(new THREE.Vector2(h.data[g],h.data[g + 1]));
                            break;
                        case "COLOR":
                            w.push((new THREE.Color).setRGB(h.data[g], h.data[g + 1], h.data[g + 2]))
                        }
                if (0 == u.length)
                    if (e = this.vertices.input.NORMAL) {
                        h = Ga[e.source],
                        i = h.accessor.params.length;
                        for (var x = 0, y = t.length; y > x; x++)
                            u.push(ta(h.data, t[x] * i))
                    } else
                        b.calcNormals = !0;
                if (!v && (v = {},
                e = this.vertices.input.TEXCOORD)) {
                    o.push(e.set),
                    h = Ga[e.source],
                    i = h.accessor.params.length;
                    for (var x = 0, y = t.length; y > x; x++)
                        g = t[x] * i,
                        void 0 === v[e.set] && (v[e.set] = []),
                        v[e.set].push(new THREE.Vector2(h.data[g],1 - h.data[g + 1]))
                }
                if (0 == w.length && (e = this.vertices.input.COLOR)) {
                    h = Ga[e.source],
                    i = h.accessor.params.length;
                    for (var x = 0, y = t.length; y > x; x++)
                        g = t[x] * i,
                        w.push((new THREE.Color).setRGB(h.data[g], h.data[g + 1], h.data[g + 2]))
                }
                var z, A, B = null , C = [];
                if (3 === m)
                    C.push(new THREE.Face3(t[0],t[1],t[2],u,w.length ? w : new THREE.Color));
                else if (4 === m)
                    C.push(new THREE.Face3(t[0],t[1],t[3],[u[0], u[1], u[3]],w.length ? [w[0], w[1], w[3]] : new THREE.Color)),
                    C.push(new THREE.Face3(t[1],t[2],t[3],[u[1], u[2], u[3]],w.length ? [w[1], w[2], w[3]] : new THREE.Color));
                else if (m > 4 && Qa.subdivideFaces) {
                    var D = w.length ? w : new THREE.Color;
                    for (d = 1; m - 1 > d; )
                        C.push(new THREE.Face3(t[0],t[d],t[d + 1],[u[0], u[d++], u[d]],D))
                }
                if (C.length)
                    for (var x = 0, y = C.length; y > x; x++)
                        for (B = C[x],
                        B.daeMaterial = a.material,
                        b.faces.push(B),
                        d = 0; d < o.length; d++)
                            z = v[o[d]],
                            A = m > 4 ? [z[0], z[x + 1], z[x + 2]] : 4 === m ? 0 === x ? [z[0], z[1], z[3]] : [z[1].clone(), z[2], z[3].clone()] : [z[0], z[1], z[2]],
                            void 0 === b.faceVertexUvs[d] && (b.faceVertexUvs[d] = []),
                            b.faceVertexUvs[d].push(A);
                else
                    console.log("dropped face with vcount " + m + " for geometry with id: " + b.id);
                s += n * m
            }
    }
    ,
    P.prototype.setVertices = function(a) {
        for (var b = 0; b < this.inputs.length; b++)
            this.inputs[b].source == a.id && (this.inputs[b].source = a.input.POSITION.source)
    }
    ,
    P.prototype.parse = function(a) {
        this.material = a.getAttribute("material"),
        this.count = pa(a, "count", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "input":
                this.inputs.push((new U).parse(a.childNodes[b]));
                break;
            case "vcount":
                this.vcount = ma(c.textContent);
                break;
            case "p":
                this.p.push(ma(c.textContent));
                break;
            case "ph":
                console.warn("polygon holes not yet supported!")
            }
        }
        return this
    }
    ,
    Q.prototype = Object.create(P.prototype),
    R.prototype = Object.create(P.prototype),
    S.prototype.parse = function(a) {
        this.params = [],
        this.source = a.getAttribute("source"),
        this.count = pa(a, "count", 0),
        this.stride = pa(a, "stride", 0);
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if ("param" == c.nodeName) {
                var d = {};
                d.name = c.getAttribute("name"),
                d.type = c.getAttribute("type"),
                this.params.push(d)
            }
        }
        return this
    }
    ,
    T.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++)
            if ("input" == a.childNodes[b].nodeName) {
                var c = (new U).parse(a.childNodes[b]);
                this.input[c.semantic] = c
            }
        return this
    }
    ,
    U.prototype.parse = function(a) {
        return this.semantic = a.getAttribute("semantic"),
        this.source = a.getAttribute("source").replace(/^#/, ""),
        this.set = pa(a, "set", -1),
        this.offset = pa(a, "offset", 0),
        "TEXCOORD" == this.semantic && this.set < 0 && (this.set = 0),
        this
    }
    ,
    V.prototype.parse = function(a) {
        this.id = a.getAttribute("id");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "bool_array":
                this.data = ka(c.textContent),
                this.type = c.nodeName;
                break;
            case "float_array":
                this.data = la(c.textContent),
                this.type = c.nodeName;
                break;
            case "int_array":
                this.data = ma(c.textContent),
                this.type = c.nodeName;
                break;
            case "IDREF_array":
            case "Name_array":
                this.data = na(c.textContent),
                this.type = c.nodeName;
                break;
            case "technique_common":
                for (var d = 0; d < c.childNodes.length; d++)
                    if ("accessor" == c.childNodes[d].nodeName) {
                        this.accessor = (new S).parse(c.childNodes[d]);
                        break
                    }
            }
        }
        return this
    }
    ,
    V.prototype.read = function() {
        var a = []
          , b = this.accessor.params[0];
        switch (b.type) {
        case "IDREF":
        case "Name":
        case "name":
        case "float":
            return this.data;
        case "float4x4":
            for (var c = 0; c < this.data.length; c += 16) {
                var d = this.data.slice(c, c + 16)
                  , e = ua(d);
                a.push(e)
            }
            break;
        default:
            console.log("ColladaLoader: Source: Read dont know how to read " + b.type + ".")
        }
        return a
    }
    ,
    W.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++)
            if ("instance_effect" == a.childNodes[b].nodeName) {
                this.instance_effect = (new aa).parse(a.childNodes[b]);
                break
            }
        return this
    }
    ,
    X.prototype.isColor = function() {
        return null  == this.texture
    }
    ,
    X.prototype.isTexture = function() {
        return null  != this.texture
    }
    ,
    X.prototype.parse = function(a) {
        "transparent" == a.nodeName && (this.opaque = a.getAttribute("opaque"));
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "color":
                    var d = la(c.textContent);
                    this.color = new THREE.Color,
                    this.color.setRGB(d[0], d[1], d[2]),
                    this.color.a = d[3];
                    break;
                case "texture":
                    this.texture = c.getAttribute("texture"),
                    this.texcoord = c.getAttribute("texcoord"),
                    this.texOpts = {
                        offsetU: 0,
                        offsetV: 0,
                        repeatU: 1,
                        repeatV: 1,
                        wrapU: 1,
                        wrapV: 1
                    },
                    this.parseTexture(c)
                }
        }
        return this
    }
    ,
    X.prototype.parseTexture = function(a) {
        if (!a.childNodes)
            return this;
        a.childNodes[1] && "extra" === a.childNodes[1].nodeName && (a = a.childNodes[1],
        a.childNodes[1] && "technique" === a.childNodes[1].nodeName && (a = a.childNodes[1]));
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "offsetU":
            case "offsetV":
            case "repeatU":
            case "repeatV":
                this.texOpts[c.nodeName] = parseFloat(c.textContent);
                break;
            case "wrapU":
            case "wrapV":
                "TRUE" === c.textContent.toUpperCase() ? this.texOpts[c.nodeName] = 1 : this.texOpts[c.nodeName] = parseInt(c.textContent);
                break;
            default:
                this.texOpts[c.nodeName] = c.textContent
            }
        }
        return this
    }
    ,
    Y.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "ambient":
                case "emission":
                case "diffuse":
                case "specular":
                case "transparent":
                case "bump":
                    this[c.nodeName] = (new X).parse(c);
                    break;
                case "shininess":
                case "reflectivity":
                case "index_of_refraction":
                case "transparency":
                    var d = c.querySelectorAll("float");
                    d.length > 0 && (this[c.nodeName] = parseFloat(d[0].textContent))
                }
        }
        return this.create(),
        this
    }
    ,
    Y.prototype.create = function() {
        var a = {}
          , b = !1;
        if (void 0 !== this.transparency && void 0 !== this.transparent) {
            var c = (this.transparent,
            (this.transparent.color.r + this.transparent.color.g + this.transparent.color.b) / 3 * this.transparency);
            c > 0 && (b = !0,
            a.transparent = !0,
            a.opacity = 1 - c)
        }
        var d = {
            diffuse: "map",
            ambient: "lightMap",
            specular: "specularMap",
            emission: "emissionMap",
            bump: "normalMap"
        };
        for (var e in this)
            switch (e) {
            case "ambient":
            case "emission":
            case "diffuse":
            case "specular":
            case "bump":
                var f = this[e];
                if (f instanceof X)
                    if (f.isTexture()) {
                        var g = f.texture
                          , h = this.effect.sampler[g];
                        if (void 0 !== h && void 0 !== h.source) {
                            var i = this.effect.surface[h.source]
                              , j = Ha[i.init_from];
                            if (j) {
                                var k = THREE.ImageUtils.loadTexture(Aa + j.init_from);
                                k.wrapS = f.texOpts.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping,
                                k.wrapT = f.texOpts.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping,
                                k.offset.x = f.texOpts.offsetU,
                                k.offset.y = f.texOpts.offsetV,
                                k.repeat.x = f.texOpts.repeatU,
                                k.repeat.y = f.texOpts.repeatV,
                                a[d[e]] = k,
                                "emission" === e && (a.emissive = 16777215)
                            }
                        }
                    } else
                        "diffuse" !== e && b || ("emission" === e ? a.emissive = f.color.getHex() : a[e] = f.color.getHex());
                break;
            case "shininess":
                a[e] = this[e];
                break;
            case "reflectivity":
                a[e] = this[e],
                a[e] > 0 && (a.envMap = Qa.defaultEnvMap),
                a.combine = THREE.MixOperation;
                break;
            case "index_of_refraction":
                a.refractionRatio = this[e],
                1 !== this[e] && (a.envMap = Qa.defaultEnvMap);
                break;
            case "transparency":
            }
        switch (a.shading = Pa,
        a.side = this.effect.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
        this.type) {
        case "constant":
            void 0 != a.emissive && (a.color = a.emissive),
            this.material = new THREE.MeshBasicMaterial(a);
            break;
        case "phong":
        case "blinn":
            void 0 != a.diffuse && (a.color = a.diffuse),
            this.material = new THREE.MeshPhongMaterial(a);
            break;
        case "lambert":
        default:
            void 0 != a.diffuse && (a.color = a.diffuse),
            this.material = new THREE.MeshLambertMaterial(a)
        }
        return this.material
    }
    ,
    Z.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "init_from":
                    this.init_from = c.textContent;
                    break;
                case "format":
                    this.format = c.textContent;
                    break;
                default:
                    console.log("unhandled Surface prop: " + c.nodeName)
                }
        }
        return this
    }
    ,
    $.prototype.parse = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "source":
                    this.source = c.textContent;
                    break;
                case "minfilter":
                    this.minfilter = c.textContent;
                    break;
                case "magfilter":
                    this.magfilter = c.textContent;
                    break;
                case "mipfilter":
                    this.mipfilter = c.textContent;
                    break;
                case "wrap_s":
                    this.wrap_s = c.textContent;
                    break;
                case "wrap_t":
                    this.wrap_t = c.textContent;
                    break;
                default:
                    console.log("unhandled Sampler2D prop: " + c.nodeName)
                }
        }
        return this
    }
    ,
    _.prototype.create = function() {
        return null  == this.shader ? null  : void 0
    }
    ,
    _.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name"),
        qa(this, a),
        this.shader = null ;
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "profile_COMMON":
                    this.parseTechnique(this.parseProfileCOMMON(c))
                }
        }
        return this
    }
    ,
    _.prototype.parseNewparam = function(a) {
        for (var b = a.getAttribute("sid"), c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType)
                switch (d.nodeName) {
                case "surface":
                    this.surface[b] = new Z(this).parse(d);
                    break;
                case "sampler2D":
                    this.sampler[b] = new $(this).parse(d);
                    break;
                case "extra":
                    break;
                default:
                    console.log(d.nodeName)
                }
        }
    }
    ,
    _.prototype.parseProfileCOMMON = function(a) {
        for (var b, c = 0; c < a.childNodes.length; c++) {
            var d = a.childNodes[c];
            if (1 == d.nodeType)
                switch (d.nodeName) {
                case "profile_COMMON":
                    this.parseProfileCOMMON(d);
                    break;
                case "technique":
                    b = d;
                    break;
                case "newparam":
                    this.parseNewparam(d);
                    break;
                case "image":
                    var e = (new D).parse(d);
                    Ha[e.id] = e;
                    break;
                case "extra":
                    break;
                default:
                    console.log(d.nodeName)
                }
        }
        return b
    }
    ,
    _.prototype.parseTechnique = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "constant":
                case "lambert":
                case "blinn":
                case "phong":
                    this.shader = new Y(c.nodeName,this).parse(c);
                    break;
                case "extra":
                    this.parseExtra(c)
                }
        }
    }
    ,
    _.prototype.parseExtra = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "technique":
                    this.parseExtraTechnique(c)
                }
        }
    }
    ,
    _.prototype.parseExtraTechnique = function(a) {
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "bump":
                    this.shader.parse(a)
                }
        }
    }
    ,
    aa.prototype.parse = function(a) {
        return this.url = a.getAttribute("url").replace(/^#/, ""),
        this
    }
    ,
    ba.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name"),
        this.source = {};
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "animation":
                    var d = (new ba).parse(c);
                    for (var e in d.source)
                        this.source[e] = d.source[e];
                    for (var f = 0; f < d.channel.length; f++)
                        this.channel.push(d.channel[f]),
                        this.sampler.push(d.sampler[f]);
                    break;
                case "source":
                    var e = (new V).parse(c);
                    this.source[e.id] = e;
                    break;
                case "sampler":
                    this.sampler.push(new da(this).parse(c));
                    break;
                case "channel":
                    this.channel.push(new ca(this).parse(c))
                }
        }
        return this
    }
    ,
    ca.prototype.parse = function(a) {
        this.source = a.getAttribute("source").replace(/^#/, ""),
        this.target = a.getAttribute("target");
        var b = this.target.split("/")
          , c = (b.shift(),
        b.shift())
          , d = c.indexOf(".") >= 0
          , e = c.indexOf("(") >= 0;
        if (d)
            b = c.split("."),
            this.sid = b.shift(),
            this.member = b.shift();
        else if (e) {
            var f = c.split("(");
            this.sid = f.shift();
            for (var g = 0; g < f.length; g++)
                f[g] = parseInt(f[g].replace(/\)/, ""));
            this.arrIndices = f
        } else
            this.sid = c;
        return this.fullSid = c,
        this.dotSyntax = d,
        this.arrSyntax = e,
        this
    }
    ,
    da.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.inputs = [];
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "input":
                    this.inputs.push((new U).parse(c))
                }
        }
        return this
    }
    ,
    da.prototype.create = function() {
        for (var a = 0; a < this.inputs.length; a++) {
            var b = this.inputs[a]
              , c = this.animation.source[b.source];
            switch (b.semantic) {
            case "INPUT":
                this.input = c.read();
                break;
            case "OUTPUT":
                this.output = c.read(),
                this.strideOut = c.accessor.stride;
                break;
            case "INTERPOLATION":
                this.interpolation = c.read();
                break;
            case "IN_TANGENT":
                break;
            case "OUT_TANGENT":
                break;
            default:
                console.log(b.semantic)
            }
        }
        if (this.startTime = 0,
        this.endTime = 0,
        this.duration = 0,
        this.input.length) {
            this.startTime = 1e8,
            this.endTime = -1e8;
            for (var a = 0; a < this.input.length; a++)
                this.startTime = Math.min(this.startTime, this.input[a]),
                this.endTime = Math.max(this.endTime, this.input[a]);
            this.duration = this.endTime - this.startTime
        }
    }
    ,
    da.prototype.getData = function(a, b) {
        var c;
        if ("matrix" === a && 16 === this.strideOut)
            c = this.output[b];
        else if (this.strideOut > 1) {
            c = [],
            b *= this.strideOut;
            for (var d = 0; d < this.strideOut; ++d)
                c[d] = this.output[b + d];
            if (3 === this.strideOut)
                switch (a) {
                case "rotate":
                case "translate":
                    sa(c, -1);
                    break;
                case "scale":
                    sa(c, 1)
                }
            else
                4 === this.strideOut && "matrix" === a && sa(c, -1)
        } else
            c = this.output[b];
        return c
    }
    ,
    ea.prototype.addTarget = function(a, b, c, d) {
        this.targets.push({
            sid: a,
            member: c,
            transform: b,
            data: d
        })
    }
    ,
    ea.prototype.apply = function(a) {
        for (var b = 0; b < this.targets.length; ++b) {
            var c = this.targets[b];
            a && c.sid !== a || c.transform.update(c.data, c.member)
        }
    }
    ,
    ea.prototype.getTarget = function(a) {
        for (var b = 0; b < this.targets.length; ++b)
            if (this.targets[b].sid === a)
                return this.targets[b];
        return null 
    }
    ,
    ea.prototype.hasTarget = function(a) {
        for (var b = 0; b < this.targets.length; ++b)
            if (this.targets[b].sid === a)
                return !0;
        return !1
    }
    ,
    ea.prototype.interpolate = function(a, b) {
        for (var c = 0, d = this.targets.length; d > c; c++) {
            var e, f = this.targets[c], g = a.getTarget(f.sid);
            if ("matrix" !== f.transform.type && g) {
                var h = (b - this.time) / (a.time - this.time)
                  , i = g.data
                  , j = f.data;
                if (0 > h && (h = 0),
                h > 1 && (h = 1),
                j.length) {
                    e = [];
                    for (var k = 0; k < j.length; ++k)
                        e[k] = j[k] + (i[k] - j[k]) * h
                } else
                    e = j + (i - j) * h
            } else
                e = f.data;
            f.transform.update(e, f.member)
        }
    }
    ,
    fa.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "optics":
                    this.parseOptics(c)
                }
        }
        return this
    }
    ,
    fa.prototype.parseOptics = function(a) {
        for (var b = 0; b < a.childNodes.length; b++)
            if ("technique_common" == a.childNodes[b].nodeName)
                for (var c = a.childNodes[b], d = 0; d < c.childNodes.length; d++)
                    if (this.technique = c.childNodes[d].nodeName,
                    "perspective" == this.technique)
                        for (var e = c.childNodes[d], f = 0; f < e.childNodes.length; f++) {
                            var g = e.childNodes[f];
                            switch (g.nodeName) {
                            case "yfov":
                                this.yfov = g.textContent;
                                break;
                            case "xfov":
                                this.xfov = g.textContent;
                                break;
                            case "znear":
                                this.znear = g.textContent;
                                break;
                            case "zfar":
                                this.zfar = g.textContent;
                                break;
                            case "aspect_ratio":
                                this.aspect_ratio = g.textContent
                            }
                        }
                    else if ("orthographic" == this.technique)
                        for (var h = c.childNodes[d], f = 0; f < h.childNodes.length; f++) {
                            var g = h.childNodes[f];
                            switch (g.nodeName) {
                            case "xmag":
                                this.xmag = g.textContent;
                                break;
                            case "ymag":
                                this.ymag = g.textContent;
                                break;
                            case "znear":
                                this.znear = g.textContent;
                                break;
                            case "zfar":
                                this.zfar = g.textContent;
                                break;
                            case "aspect_ratio":
                                this.aspect_ratio = g.textContent
                            }
                        }
        return this
    }
    ,
    ga.prototype.parse = function(a) {
        return this.url = a.getAttribute("url").replace(/^#/, ""),
        this
    }
    ,
    ha.prototype.parse = function(a) {
        this.id = a.getAttribute("id"),
        this.name = a.getAttribute("name");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            if (1 == c.nodeType)
                switch (c.nodeName) {
                case "technique_common":
                    this.parseCommon(c);
                    break;
                case "technique":
                    this.parseTechnique(c)
                }
        }
        return this
    }
    ,
    ha.prototype.parseCommon = function(a) {
        for (var b = 0; b < a.childNodes.length; b++)
            switch (a.childNodes[b].nodeName) {
            case "directional":
            case "point":
            case "spot":
            case "ambient":
                this.technique = a.childNodes[b].nodeName;
                for (var c = a.childNodes[b], d = 0; d < c.childNodes.length; d++) {
                    var e = c.childNodes[d];
                    switch (e.nodeName) {
                    case "color":
                        var f = la(e.textContent);
                        this.color = new THREE.Color(0),
                        this.color.setRGB(f[0], f[1], f[2]),
                        this.color.a = f[3];
                        break;
                    case "falloff_angle":
                        this.falloff_angle = parseFloat(e.textContent)
                    }
                }
            }
        return this
    }
    ,
    ha.prototype.parseTechnique = function(a) {
        this.profile = a.getAttribute("profile");
        for (var b = 0; b < a.childNodes.length; b++) {
            var c = a.childNodes[b];
            switch (c.nodeName) {
            case "intensity":
                this.intensity = parseFloat(c.textContent)
            }
        }
        return this
    }
    ,
    ia.prototype.parse = function(a) {
        return this.url = a.getAttribute("url").replace(/^#/, ""),
        this
    }
    ,
    {
        load: a,
        parse: b,
        setPreferredShading: c,
        applySkin: q,
        geometries: Ka,
        options: Qa
    }
}
,
THREE.OBJLoader = function(a) {
    this.manager = void 0 !== a ? a : THREE.DefaultLoadingManager
}
,
THREE.OBJLoader.prototype = {
    constructor: THREE.OBJLoader,
    load: function(a, b, c, d) {
        var e = this
          , f = new THREE.XHRLoader(e.manager);
        f.setCrossOrigin(this.crossOrigin),
        f.load(a, function(a) {
            b(e.parse(a))
        })
    },
    parse: function(a) {
        function b(a, b, c) {
            return new THREE.Vector3(parseFloat(a),parseFloat(b),parseFloat(c))
        }
        function c(a, b) {
            return new THREE.Vector2(parseFloat(a),parseFloat(b))
        }
        function d(a, b, c, d) {
            return new THREE.Face3(a,b,c,d)
        }
        function e(a) {
            return a = parseInt(a),
            a >= 0 ? a - 1 : a + o.length
        }
        function f(a) {
            return a = parseInt(a),
            a >= 0 ? a - 1 : a + p.length
        }
        function g(a) {
            return a = parseInt(a),
            a >= 0 ? a - 1 : a + q.length
        }
        function h(a, b, c, g) {
            void 0 === g ? k.faces.push(d(o[e(a)] - 1, o[e(b)] - 1, o[e(c)] - 1)) : k.faces.push(d(o[e(a)] - 1, o[e(b)] - 1, o[e(c)] - 1, [p[f(g[0])].clone(), p[f(g[1])].clone(), p[f(g[2])].clone()]))
        }
        function i(a, b, c) {
            k.faceVertexUvs[0].push([q[g(a)].clone(), q[g(b)].clone(), q[g(c)].clone()])
        }
        function j(a, b, c) {
            void 0 === a[3] ? (h(a[0], a[1], a[2], c),
            void 0 !== b && b.length > 0 && i(b[0], b[1], b[2])) : (void 0 !== c && c.length > 0 ? (h(a[0], a[1], a[3], [c[0], c[1], c[3]]),
            h(a[1], a[2], a[3], [c[1], c[2], c[3]])) : (h(a[0], a[1], a[3]),
            h(a[1], a[2], a[3])),
            void 0 !== b && b.length > 0 && (i(b[0], b[1], b[3]),
            i(b[1], b[2], b[3])))
        }
        var k, l, m, n = new THREE.Object3D;
        /^o /gm.test(a) === !1 && (k = new THREE.Geometry,
        l = new THREE.MeshLambertMaterial,
        m = new THREE.Mesh(k,l),
        n.add(m));
        for (var o = [], p = [], q = [], r = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, s = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, t = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, u = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/, v = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/, w = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/, x = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/, y = a.split("\n"), z = 0; z < y.length; z++) {
            var A = y[z];
            A = A.trim();
            var B;
            0 !== A.length && "#" !== A.charAt(0) && (null  !== (B = r.exec(A)) ? o.push(k.vertices.push(b(B[1], B[2], B[3]))) : null  !== (B = s.exec(A)) ? p.push(b(B[1], B[2], B[3])) : null  !== (B = t.exec(A)) ? q.push(c(B[1], B[2])) : null  !== (B = u.exec(A)) ? j([B[1], B[2], B[3], B[4]]) : null  !== (B = v.exec(A)) ? j([B[2], B[5], B[8], B[11]], [B[3], B[6], B[9], B[12]]) : null  !== (B = w.exec(A)) ? j([B[2], B[6], B[10], B[14]], [B[3], B[7], B[11], B[15]], [B[4], B[8], B[12], B[16]]) : null  !== (B = x.exec(A)) ? j([B[2], B[5], B[8], B[11]], [], [B[3], B[6], B[9], B[12]]) : /^o /.test(A) ? (k = new THREE.Geometry,
            l = new THREE.MeshLambertMaterial,
            m = new THREE.Mesh(k,l),
            m.name = A.substring(2).trim(),
            n.add(m)) : /^g /.test(A) || (/^usemtl /.test(A) ? l.name = A.substring(7).trim() : /^mtllib /.test(A) || /^s /.test(A)))
        }
        for (var C = n.children, z = 0, D = C.length; D > z; z++) {
            var k = C[z].geometry;
            k.computeCentroids(),
            k.computeFaceNormals(),
            k.computeBoundingSphere()
        }
        return n
    }
},
THREE.BinaryLoader = function(a) {
    THREE.Loader.call(this, a)
}
,
THREE.BinaryLoader.prototype = Object.create(THREE.Loader.prototype),
THREE.BinaryLoader.prototype.load = function(a, b, c, d) {
    c = c || this.extractUrlBase(a),
    d = d || this.extractUrlBase(a);
    var e = this.showProgress ? THREE.Loader.prototype.updateProgress : void 0;
    this.onLoadStart(),
    this.loadAjaxJSON(this, a, b, c, d, e)
}
,
THREE.BinaryLoader.prototype.loadAjaxJSON = function(a, b, c, d, e, f) {
    var g = new XMLHttpRequest;
    d = d && "string" == typeof d ? d : this.extractUrlBase(b),
    e = e && "string" == typeof e ? e : this.extractUrlBase(b),
    g.onreadystatechange = function() {
        if (4 == g.readyState)
            if (200 == g.status || 0 == g.status) {
                var h = JSON.parse(g.responseText);
                a.loadAjaxBuffers(h, c, e, d, f)
            } else
                console.error("THREE.BinaryLoader: Couldn't load [" + b + "] [" + g.status + "]")
    }
    ,
    g.open("GET", b, !0),
    g.send(null )
}
,
THREE.BinaryLoader.prototype.loadAjaxBuffers = function(a, b, c, d, e) {
    var f = new XMLHttpRequest
      , g = c + a.buffers;
    f.addEventListener("load", function(c) {
        var e = f.response;
        if (void 0 === e && (e = new Uint8Array(f.responseBody).buffer),
        0 == e.byteLength)
            for (var e = new ArrayBuffer(f.responseText.length), g = new Uint8Array(e), h = 0, i = f.responseText.length; i > h; h++)
                g[h] = 255 & f.responseText.charCodeAt(h);
        THREE.BinaryLoader.prototype.createBinModel(e, b, d, a.materials)
    }, !1),
    void 0 !== e && f.addEventListener("progress", function(a) {
        a.lengthComputable && e(a)
    }, !1),
    f.addEventListener("error", function(a) {
        console.error("THREE.BinaryLoader: Couldn't load [" + g + "] [" + f.status + "]")
    }, !1),
    f.open("GET", g, !0),
    f.responseType = "arraybuffer",
    f.overrideMimeType && f.overrideMimeType("text/plain; charset=x-user-defined"),
    f.send(null )
}
,
THREE.BinaryLoader.prototype.createBinModel = function(a, b, c, d) {
    function e(a, b, c, d) {
        a.vertices.push(new THREE.Vector3(b,c,d))
    }
    function f(a, b, c, d, e) {
        a.faces.push(new THREE.Face3(b,c,d,null ,null ,e))
    }
    function g(a, b, c, d, e, f) {
        a.faces.push(new THREE.Face3(b,c,e,null ,null ,f)),
        a.faces.push(new THREE.Face3(c,d,e,null ,null ,f))
    }
    function h(a, b, c, d, e, f, g, h, i) {
        var j = b[3 * g]
          , k = b[3 * g + 1]
          , l = b[3 * g + 2]
          , m = b[3 * h]
          , n = b[3 * h + 1]
          , o = b[3 * h + 2]
          , p = b[3 * i]
          , q = b[3 * i + 1]
          , r = b[3 * i + 2];
        a.faces.push(new THREE.Face3(c,d,e,[new THREE.Vector3(j,k,l), new THREE.Vector3(m,n,o), new THREE.Vector3(p,q,r)],null ,f))
    }
    function i(a, b, c, d, e, f, g, h, i, j, k) {
        var l = b[3 * h]
          , m = b[3 * h + 1]
          , n = b[3 * h + 2]
          , o = b[3 * i]
          , p = b[3 * i + 1]
          , q = b[3 * i + 2]
          , r = b[3 * j]
          , s = b[3 * j + 1]
          , t = b[3 * j + 2]
          , u = b[3 * k]
          , v = b[3 * k + 1]
          , w = b[3 * k + 2];
        a.faces.push(new THREE.Face3(c,d,f,[new THREE.Vector3(l,m,n), new THREE.Vector3(o,p,q), new THREE.Vector3(u,v,w)],null ,g)),
        a.faces.push(new THREE.Face3(d,e,f,[new THREE.Vector3(o,p,q), new THREE.Vector3(r,s,t), new THREE.Vector3(u,v,w)],null ,g))
    }
    function j(a, b, c, d, e, f, g) {
        a.push([new THREE.Vector2(b,c), new THREE.Vector2(d,e), new THREE.Vector2(f,g)])
    }
    function k(a, b, c, d, e, f, g, h, i) {
        a.push([new THREE.Vector2(b,c), new THREE.Vector2(d,e), new THREE.Vector2(h,i)]),
        a.push([new THREE.Vector2(d,e), new THREE.Vector2(f,g), new THREE.Vector2(h,i)])
    }
    var l = function(b) {
        function c(a) {
            return a % 4 ? 4 - a % 4 : 0
        }
        function d(a, b) {
            var c = {
                signature: l(a, b, 12),
                header_bytes: m(a, b + 12),
                vertex_coordinate_bytes: m(a, b + 13),
                normal_coordinate_bytes: m(a, b + 14),
                uv_coordinate_bytes: m(a, b + 15),
                vertex_index_bytes: m(a, b + 16),
                normal_index_bytes: m(a, b + 17),
                uv_index_bytes: m(a, b + 18),
                material_index_bytes: m(a, b + 19),
                nvertices: n(a, b + 20),
                nnormals: n(a, b + 20 + 4),
                nuvs: n(a, b + 20 + 8),
                ntri_flat: n(a, b + 20 + 12),
                ntri_smooth: n(a, b + 20 + 16),
                ntri_flat_uv: n(a, b + 20 + 20),
                ntri_smooth_uv: n(a, b + 20 + 24),
                nquad_flat: n(a, b + 20 + 28),
                nquad_smooth: n(a, b + 20 + 32),
                nquad_flat_uv: n(a, b + 20 + 36),
                nquad_smooth_uv: n(a, b + 20 + 40)
            };
            return c
        }
        function l(a, b, c) {
            for (var d = new Uint8Array(a,b,c), e = "", f = 0; c > f; f++)
                e += String.fromCharCode(d[b + f]);
            return e
        }
        function m(a, b) {
            var c = new Uint8Array(a,b,1);
            return c[0]
        }
        function n(a, b) {
            var c = new Uint32Array(a,b,1);
            return c[0]
        }
        function o(b) {
            var c, d, f, g, h = F.nvertices, i = new Float32Array(a,b,3 * h);
            for (c = 0; h > c; c++)
                d = i[3 * c],
                f = i[3 * c + 1],
                g = i[3 * c + 2],
                e(Y, d, f, g);
            return 3 * h * Float32Array.BYTES_PER_ELEMENT
        }
        function p(b) {
            var c = F.nnormals;
            if (c) {
                var d, e, f, g, h = new Int8Array(a,b,3 * c);
                for (d = 0; c > d; d++)
                    e = h[3 * d],
                    f = h[3 * d + 1],
                    g = h[3 * d + 2],
                    $.push(e / 127, f / 127, g / 127)
            }
            return 3 * c * Int8Array.BYTES_PER_ELEMENT
        }
        function q(b) {
            var c = F.nuvs;
            if (c) {
                var d, e, f, g = new Float32Array(a,b,2 * c);
                for (d = 0; c > d; d++)
                    e = g[2 * d],
                    f = g[2 * d + 1],
                    _.push(e, f)
            }
            return 2 * c * Float32Array.BYTES_PER_ELEMENT
        }
        function r(b, c) {
            var d, e, f, g, h, i, k, l, m, n, o = new Uint32Array(a,c,3 * b);
            for (d = 0; b > d; d++)
                e = o[3 * d],
                f = o[3 * d + 1],
                g = o[3 * d + 2],
                h = _[2 * e],
                l = _[2 * e + 1],
                i = _[2 * f],
                m = _[2 * f + 1],
                k = _[2 * g],
                n = _[2 * g + 1],
                j(Y.faceVertexUvs[0], h, l, i, m, k, n)
        }
        function s(b, c) {
            var d, e, f, g, h, i, j, l, m, n, o, p, q, r = new Uint32Array(a,c,4 * b);
            for (d = 0; b > d; d++)
                e = r[4 * d],
                f = r[4 * d + 1],
                g = r[4 * d + 2],
                h = r[4 * d + 3],
                i = _[2 * e],
                n = _[2 * e + 1],
                j = _[2 * f],
                o = _[2 * f + 1],
                l = _[2 * g],
                p = _[2 * g + 1],
                m = _[2 * h],
                q = _[2 * h + 1],
                k(Y.faceVertexUvs[0], i, n, j, o, l, p, m, q)
        }
        function t(b, c, d) {
            var e, g, h, i, j, k = new Uint32Array(a,c,3 * b), l = new Uint16Array(a,d,b);
            for (e = 0; b > e; e++)
                g = k[3 * e],
                h = k[3 * e + 1],
                i = k[3 * e + 2],
                j = l[e],
                f(Y, g, h, i, j)
        }
        function u(b, c, d) {
            var e, f, h, i, j, k, l = new Uint32Array(a,c,4 * b), m = new Uint16Array(a,d,b);
            for (e = 0; b > e; e++)
                f = l[4 * e],
                h = l[4 * e + 1],
                i = l[4 * e + 2],
                j = l[4 * e + 3],
                k = m[e],
                g(Y, f, h, i, j, k)
        }
        function v(b, c, d, e) {
            var f, g, i, j, k, l, m, n, o = new Uint32Array(a,c,3 * b), p = new Uint32Array(a,d,3 * b), q = new Uint16Array(a,e,b);
            for (f = 0; b > f; f++)
                g = o[3 * f],
                i = o[3 * f + 1],
                j = o[3 * f + 2],
                l = p[3 * f],
                m = p[3 * f + 1],
                n = p[3 * f + 2],
                k = q[f],
                h(Y, $, g, i, j, k, l, m, n)
        }
        function w(b, c, d, e) {
            var f, g, h, j, k, l, m, n, o, p, q = new Uint32Array(a,c,4 * b), r = new Uint32Array(a,d,4 * b), s = new Uint16Array(a,e,b);
            for (f = 0; b > f; f++)
                g = q[4 * f],
                h = q[4 * f + 1],
                j = q[4 * f + 2],
                k = q[4 * f + 3],
                m = r[4 * f],
                n = r[4 * f + 1],
                o = r[4 * f + 2],
                p = r[4 * f + 3],
                l = s[f],
                i(Y, $, g, h, j, k, l, m, n, o, p)
        }
        function x(a) {
            var b = F.ntri_flat;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                t(b, a, c)
            }
        }
        function y(a) {
            var b = F.ntri_flat_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                t(b, a, d),
                r(b, c)
            }
        }
        function z(a) {
            var b = F.ntri_smooth;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                v(b, a, c, d)
            }
        }
        function A(a) {
            var b = F.ntri_smooth_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 3
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 3
                  , e = d + b * Uint32Array.BYTES_PER_ELEMENT * 3;
                v(b, a, c, e),
                r(b, d)
            }
        }
        function B(a) {
            var b = F.nquad_flat;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                u(b, a, c)
            }
        }
        function C(a) {
            var b = F.nquad_flat_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                u(b, a, d),
                s(b, c)
            }
        }
        function D(a) {
            var b = F.nquad_smooth;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                w(b, a, c, d)
            }
        }
        function E(a) {
            var b = F.nquad_smooth_uv;
            if (b) {
                var c = a + b * Uint32Array.BYTES_PER_ELEMENT * 4
                  , d = c + b * Uint32Array.BYTES_PER_ELEMENT * 4
                  , e = d + b * Uint32Array.BYTES_PER_ELEMENT * 4;
                w(b, a, c, e),
                s(b, d)
            }
        }
        var F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y = this, Z = 0, $ = [], _ = [];
        THREE.Geometry.call(this),
        F = d(a, Z),
        Z += F.header_bytes,
        O = 3 * F.vertex_index_bytes + F.material_index_bytes,
        P = 4 * F.vertex_index_bytes + F.material_index_bytes,
        Q = F.ntri_flat * O,
        R = F.ntri_smooth * (O + 3 * F.normal_index_bytes),
        S = F.ntri_flat_uv * (O + 3 * F.uv_index_bytes),
        T = F.ntri_smooth_uv * (O + 3 * F.normal_index_bytes + 3 * F.uv_index_bytes),
        U = F.nquad_flat * P,
        V = F.nquad_smooth * (P + 4 * F.normal_index_bytes),
        W = F.nquad_flat_uv * (P + 4 * F.uv_index_bytes),
        X = F.nquad_smooth_uv * (P + 4 * F.normal_index_bytes + 4 * F.uv_index_bytes),
        Z += o(Z),
        Z += p(Z),
        Z += c(3 * F.nnormals),
        Z += q(Z),
        G = Z,
        H = G + Q + c(2 * F.ntri_flat),
        I = H + R + c(2 * F.ntri_smooth),
        J = I + S + c(2 * F.ntri_flat_uv),
        K = J + T + c(2 * F.ntri_smooth_uv),
        L = K + U + c(2 * F.nquad_flat),
        M = L + V + c(2 * F.nquad_smooth),
        N = M + W + c(2 * F.nquad_flat_uv),
        y(I),
        A(J),
        C(M),
        E(N),
        x(G),
        z(H),
        B(K),
        D(L),
        this.computeCentroids(),
        this.computeFaceNormals()
    }
    ;
    l.prototype = Object.create(THREE.Geometry.prototype);
    var m = new l(c)
      , n = this.initMaterials(d, c);
    this.needsTangents(n) && m.computeTangents(),
    b(m, n)
}
,
THREE.CopyShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null 
        },
        opacity: {
            type: "f",
            value: 1
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
},
THREE.FXAAShader = {
    uniforms: {
        tDiffuse: {
            type: "t",
            value: null 
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2(1 / 1024,1 / 512)
        }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec2 resolution;", "varying vec2 vUv;", "#define FXAA_REDUCE_MIN   (1.0/128.0)", "#define FXAA_REDUCE_MUL   (1.0/8.0)", "#define FXAA_SPAN_MAX     8.0", "void main() {", "vec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;", "vec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;", "vec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;", "vec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );", "vec3 rgbM  = rgbaM.xyz;", "float opacity  = rgbaM.w;", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float lumaNW = dot( rgbNW, luma );", "float lumaNE = dot( rgbNE, luma );", "float lumaSW = dot( rgbSW, luma );", "float lumaSE = dot( rgbSE, luma );", "float lumaM  = dot( rgbM,  luma );", "float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );", "float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );", "vec2 dir;", "dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));", "dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));", "float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );", "float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );", "dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),", "max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),", "dir * rcpDirMin)) * resolution;", "vec3 rgbA = texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz;", "rgbA += texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz;", "rgbA *= 0.5;", "vec3 rgbB = texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * -0.5 ).xyz;", "rgbB += texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * 0.5 ).xyz;", "rgbB *= 0.25;", "rgbB += rgbA * 0.5;", "float lumaB = dot( rgbB, luma );", "if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {", "gl_FragColor = vec4( rgbA, opacity );", "} else {", "gl_FragColor = vec4( rgbB, opacity );", "}", "}"].join("\n")
},
THREE.EffectComposer = function(a, b) {
    if (this.renderer = a,
    void 0 === b) {
        var c = window.innerWidth || 1
          , d = window.innerHeight || 1
          , e = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: !1
        };
        b = new THREE.WebGLRenderTarget(c,d,e)
    }
    this.renderTarget1 = b,
    this.renderTarget2 = b.clone(),
    this.writeBuffer = this.renderTarget1,
    this.readBuffer = this.renderTarget2,
    this.passes = [],
    void 0 === THREE.CopyShader && console.error("THREE.EffectComposer relies on THREE.CopyShader"),
    this.copyPass = new THREE.ShaderPass(THREE.CopyShader)
}
,
THREE.EffectComposer.prototype = {
    swapBuffers: function() {
        var a = this.readBuffer;
        this.readBuffer = this.writeBuffer,
        this.writeBuffer = a
    },
    addPass: function(a) {
        this.passes.push(a)
    },
    insertPass: function(a, b) {
        this.passes.splice(b, 0, a)
    },
    render: function(a) {
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2;
        var b, c, d = !1, e = this.passes.length;
        for (c = 0; e > c; c++)
            if (b = this.passes[c],
            b.enabled) {
                if (b.render(this.renderer, this.writeBuffer, this.readBuffer, a, d),
                b.needsSwap) {
                    if (d) {
                        var f = this.renderer.context;
                        f.stencilFunc(f.NOTEQUAL, 1, 4294967295),
                        this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, a),
                        f.stencilFunc(f.EQUAL, 1, 4294967295)
                    }
                    this.swapBuffers()
                }
                b instanceof THREE.MaskPass ? d = !0 : b instanceof THREE.ClearMaskPass && (d = !1)
            }
    },
    reset: function(a) {
        void 0 === a && (a = this.renderTarget1.clone(),
        a.width = window.innerWidth,
        a.height = window.innerHeight),
        this.renderTarget1 = a,
        this.renderTarget2 = a.clone(),
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2
    },
    setSize: function(a, b) {
        var c = this.renderTarget1.clone();
        c.width = a,
        c.height = b,
        this.reset(c)
    }
},
THREE.MaskPass = function(a, b) {
    this.scene = a,
    this.camera = b,
    this.enabled = !0,
    this.clear = !0,
    this.needsSwap = !1,
    this.inverse = !1
}
,
THREE.MaskPass.prototype = {
    render: function(a, b, c, d) {
        var e = a.context;
        e.colorMask(!1, !1, !1, !1),
        e.depthMask(!1);
        var f, g;
        this.inverse ? (f = 0,
        g = 1) : (f = 1,
        g = 0),
        e.enable(e.STENCIL_TEST),
        e.stencilOp(e.REPLACE, e.REPLACE, e.REPLACE),
        e.stencilFunc(e.ALWAYS, f, 4294967295),
        e.clearStencil(g),
        a.render(this.scene, this.camera, c, this.clear),
        a.render(this.scene, this.camera, b, this.clear),
        e.colorMask(!0, !0, !0, !0),
        e.depthMask(!0),
        e.stencilFunc(e.EQUAL, 1, 4294967295),
        e.stencilOp(e.KEEP, e.KEEP, e.KEEP)
    }
},
THREE.ClearMaskPass = function() {
    this.enabled = !0
}
,
THREE.ClearMaskPass.prototype = {
    render: function(a, b, c, d) {
        var e = a.context;
        e.disable(e.STENCIL_TEST)
    }
},
THREE.RenderPass = function(a, b, c, d, e) {
    this.scene = a,
    this.camera = b,
    this.overrideMaterial = c,
    this.clearColor = d,
    this.clearAlpha = void 0 !== e ? e : 1,
    this.oldClearColor = new THREE.Color,
    this.oldClearAlpha = 1,
    this.enabled = !0,
    this.clear = !0,
    this.needsSwap = !1
}
,
THREE.RenderPass.prototype = {
    render: function(a, b, c, d) {
        this.scene.overrideMaterial = this.overrideMaterial,
        this.clearColor && (this.oldClearColor.copy(a.getClearColor()),
        this.oldClearAlpha = a.getClearAlpha(),
        a.setClearColor(this.clearColor, this.clearAlpha)),
        a.render(this.scene, this.camera, c, this.clear),
        this.clearColor && a.setClearColor(this.oldClearColor, this.oldClearAlpha),
        this.scene.overrideMaterial = null 
    }
},
THREE.ShaderPass = function(a, b) {
    this.textureID = void 0 !== b ? b : "tDiffuse",
    this.uniforms = THREE.UniformsUtils.clone(a.uniforms),
    this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: a.vertexShader,
        fragmentShader: a.fragmentShader
    }),
    this.renderToScreen = !1,
    this.enabled = !0,
    this.needsSwap = !0,
    this.clear = !1,
    this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1),
    this.scene = new THREE.Scene,
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2),null ),
    this.scene.add(this.quad)
}
,
THREE.ShaderPass.prototype = {
    render: function(a, b, c, d) {
        this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = c),
        this.quad.material = this.material,
        this.renderToScreen ? a.render(this.scene, this.camera) : a.render(this.scene, this.camera, b, this.clear)
    }
};
