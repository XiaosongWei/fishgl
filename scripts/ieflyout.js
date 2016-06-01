/*! Rethink IE Flyout | http://www.rethinkie.com | 2015-11-14 */
var ieFlyout = window.ieFlyout = window.ieFlyout || {};
ieFlyout.languages = {},
ieFlyout.site = {
    triggers: [{
        triggerType: "corner-edge",
        leftSide: !0,
        bottom: !1
    }],
    languages: {
        en: {}
    },
    folder: "fishgl",
    partnerName: ""
},
function(a) {
    function b(a) {
        return e.indexOf(a) >= 0
    }
    function c() {
        var a = parseInt((/msie (\d+)/.exec(e) || [])[1], 10);
        return isNaN(a) && (a = parseInt((/trident\/.*; rv:(\d+)/.exec(e) || [])[1], 10)),
        isNaN(a) ? -1 : a
    }
    var d = 11
      , e = navigator.userAgent.toLowerCase();
    window.navigator.appMinorVersion,
    parseFloat(window.navigator.appMinorVersion);
    a.detect = {
        isWin: b("windows nt"),
        isVista: b("windows nt 6.0"),
        isWin7: b("windows nt 6.1"),
        isXP: b("windows nt 5.1"),
        isIE: b("msie") || b("trident"),
        isIE7: b("msie 7"),
        isIE8: b("msie 8"),
        isIE9: b("trident/5.0"),
        isIE10: b("trident/6.0"),
        isIE11: b("trident/7.0"),
        ieVersion: c()
    },
    a.detect.canUpgradeIE = a.detect.isWin && (!a.detect.isIE || a.detect.ieVersion < d)
}(ieFlyout),
function() {
    var a = {
        intro: "intro",
        peekShow: "peekShow",
        peekHide: "peekHide",
        show: "show",
        hide: "hide",
        reminder: "reminder"
    }
      , b = 300
      , c = 1500
      , d = 400;
    ieFlyout.domReady = !1,
    ieFlyout.wasOpened = !1,
    ieFlyout.reminderDuration = b + c + d,
    ieFlyout.animationStates = a,
    ieFlyout.onDomReady = function() {
        $.support.transition || ($.fn.transition = $.fn.animate),
        this.domReady = !0,
        this.po && (this.init(this.po),
        delete this.po)
    }
    ,
    ieFlyout.init = function(a) {
        if (!this.domReady)
            return void (this.po = a || {});
        $.extend(this.options, this.site, a || {});
        var b = Math.min(this.options.triggerIndex, this.options.triggers.length - 1);
        switch ($.extend(this.options, this.options.triggers[b]),
        $.each(this.options.languages || {}, function(a, b) {
            $.extend(ieFlyout.languages[a], b)
        }),
        this.render(),
        this.$trigger.click($.proxy(this.show, this)).mouseenter($.proxy(this.peekShow || $.noop, this)).mouseleave($.proxy(this.peekHide || $.noop, this)),
        this.$close.click($.proxy(this.hide, this)),
        this.options.showTeaserOnInit && setTimeout($.proxy(function() {
            this.showTeaser()
        }, this), this.options.teaserDelay),
        this.options.triggerType) {
        case "corner":
            this.trigger = this.triggers.corner;
            break;
        case "corner-ie":
            this.trigger = this.triggers.cornerIE;
            break;
        case "corner-ie-single-color":
            this.trigger = this.triggers.cornerIESingleColor;
            break;
        case "corner-e":
            this.trigger = this.triggers.cornerE;
            break;
        case "slideout":
            this.trigger = this.triggers.slideout;
            break;
        case "custom":
            this.trigger = this.triggers.custom;
            break;
        case "rethink-small":
            this.trigger = this.triggers.rethinkSmall;
            break;
        case "corner-edge":
            this.trigger = this.triggers.cornerEdge
        }
        this.trigger.load(),
        this.dispatch("init"),
        this.init = $.noop
    }
    ,
    ieFlyout.render = function() {
        var a = $("#ief");
        a.get(0) || (a = $('<div id="ief"/>').appendTo("body"));
        var b = $(this.templatize.flyout(this.options))
          , c = b.find("#ief-top-header");
        this.options.topHeaderImage ? c.attr("src", this.options.topHeaderImage) : c.remove(),
        a.html(b),
        this.$trigger = $("#" + this.options.triggerId),
        this.$flyout = $("#ief-flyout"),
        this.$content = $("#ief-content"),
        this.$peek = $("#ief-peek"),
        this.$peekBg = $("#ief-peek-bg"),
        this.$close = $("#ief-video-close"),
        $("body").addClass(this.options.leftSide ? "ief-left" : "ief-right").addClass(this.options.bottom ? "ief-bottom" : "ief-top");
        var d = this.options.peekLightColor || this.options.endBackgroundColor;
        this.$flyout.css("background-color", d),
        this.$peek.css("background-color", d);
        var e = this.options.peekHoverColor || this.options.beginBackgroundColor;
        this.$peekBg.css("background-color", e),
        this.localizeContent(),
        $("#ief").fadeIn()
    }
    ,
    ieFlyout.sideNumber = function(a) {
        return this.options.leftSide ? a : -a
    }
    ,
    ieFlyout.gotoState = function(c, e) {
        if (this.trigger.introDuration || c !== a.intro || (c = a.reminder),
        c !== a.show || this.currentState !== a.intro && this.currentState !== a.reminder || (this.currentState = null ,
        this.nextState = null ),
        !c || this.currentState)
            return void (this.nextState = c);
        this.currentState = c;
        var f = 0;
        switch (c) {
        case a.intro:
            f = this.trigger.introDuration,
            this.trigger.introAnimation();
            break;
        case a.peekShow:
            f = b,
            this.peekShowAnimation(f);
            break;
        case a.peekHide:
            f = d,
            this.peekHideAnimation(f);
            break;
        case a.show:
            f = 1e3,
            this.options.animateTrigger && this.$trigger.stop(!1, !1).transition({
                opacity: 0,
                x: this.sideNumber(160)
            }, 900, "easeOutQuart"),
            this.trigger.peekHide && this.trigger.peekHide(),
            this.$flyout.delay(0).transition({
                x: this.sideNumber(320)
            }, 900, "easeOutQuart"),
            this.$content.stop(!1, !1).css({
                x: this.sideNumber(-320)
            }).transition({
                x: 0
            }, 700, "easeOutQuart"),
            this.fadePeek(!1, 300);
            break;
        case a.hide:
            f = 1e3,
            this.options.animateTrigger && this.$trigger.stop().transition({
                opacity: 1,
                x: 0
            }, 900, "easeInOutQuart"),
            this.$flyout.transition({
                x: 0
            }, 900, "easeInOutQuart"),
            this.peekTo(0, 900, 0, 900),
            this.$content.transition({
                x: this.sideNumber(-60)
            }, 900, "easeInOutQuart");
            break;
        case a.reminder:
            f = this.trigger.reminderDuration,
            this.reminderAnimation()
        }
        setTimeout($.proxy(function() {
            e && e(c),
            this.currentState = null ,
            this.nextState && (this.gotoState(this.nextState),
            this.nextState = null )
        }, this), f)
    }
    ,
    ieFlyout.showTeaser = function() {
        setTimeout($.proxy(function() {
            this.gotoState(a.intro, function() {
                ieFlyout.dispatch("introComplete"),
                ieFlyout.options.showReminder && ieFlyout.startReminder(ieFlyout.options.reminderDelay)
            })
        }, this), 400)
    }
    ,
    ieFlyout.peekShow = function() {
        this.isShowing || (this.dispatch("peek"),
        this.gotoState(a.peekShow))
    }
    ,
    ieFlyout.peekHide = function() {
        this.isShowing || this.gotoState(a.peekHide)
    }
    ,
    ieFlyout.peekShowAnimation = function(a) {
        this.peekTo(15, a, 14, a),
        this.fadePeek(!0, a),
        this.trigger.peekShow && this.trigger.peekShow(a)
    }
    ,
    ieFlyout.peekHideAnimation = function(a) {
        this.peekTo(0, a, 0, a),
        this.fadePeek(!1, a),
        this.trigger.peekHide && this.trigger.peekHide(a)
    }
    ,
    ieFlyout.reminderAnimation = function() {
        this.peekShowAnimation(b),
        setTimeout($.proxy(function() {
            this.nextState !== a.peekShow && this.peekHideAnimation(d)
        }, this), b + c)
    }
    ,
    ieFlyout.peekTo = function(a, b, c, d) {
        this.$peek.stop().transition({
            x: this.sideNumber(a)
        }, b, "easeInOutCirc"),
        this.options.animateTrigger && this.$trigger.stop().transition({
            x: this.sideNumber(c)
        }, d, "easeInOutCirc")
    }
    ,
    ieFlyout.fadePeek = function(a, b) {
        this.$peekBg.transition({
            opacity: a ? 1 : 0
        }, b, "easeOutCubic"),
        this.trigger.peekFadeColor && this.trigger.peekFadeColor(a, b)
    }
    ,
    ieFlyout.peekFadeBackground = function(a, b) {
        this.fadePeek(!0, 0),
        setTimeout($.proxy(function() {
            this.fadePeek(!1, b)
        }, this), a)
    }
    ,
    ieFlyout.show = function() {
        this.isShowing = !0,
        this.wasOpened = !0,
        this.settings.setEnableReminders(!1),
        this.dispatch("flyoutOpened"),
        this.gotoState(a.show)
    }
    ,
    ieFlyout.hide = function() {
        this.dispatch("flyoutClosed"),
        this.gotoState(a.hide, $.proxy(function() {
            this.isShowing = !1
        }, this))
    }
    ,
    ieFlyout.startReminder = function(b) {
        this.settings.getEnableReminders() && setTimeout($.proxy(function() {
            this.wasOpened || this.gotoState(a.reminder, function() {
                ieFlyout.startReminder(ieFlyout.options.reminderInterval)
            })
        }, this), b || 0)
    }
    ,
    ieFlyout.showReminder = function() {
        this.gotoState(a.reminder)
    }
}(),
function() {
    ieFlyout.options = {
        videoId: "iH1D31YHsgY",
        atlasActions: {},
        showTeaserOnInit: !0,
        teaserDelay: 1e3,
        showReminder: !0,
        reminderDelay: 6e3,
        reminderInterval: 2e4,
        beginBackgroundColor: "#2E74BE",
        endBackgroundColor: "#2E74BE",
        contentBackgroundColor: "#2E74BE",
        contentTextColor: "#fff",
        footerBackgroundColor: "#000",
        footerHoverBackgroundColor: "#444",
        buttonBackgroundColor: "#2969AB",
        buttonTextColor: "white",
        buttonHoverBackgroundColor: "#245c95",
        buttonHoverTextColor: "white",
        spriteColors: {
            "sprite-content-play.svg": {
                light: "rgba(1, 1, 1, 0.7)",
                color: "#FFF"
            },
            "sprite-content-play-over.svg": {
                color: "rgba(1, 1, 1, 0.6)"
            }
        },
        triggers: [{
            triggerType: "slideout",
            leftSide: !0,
            bottom: !1
        }],
        triggerId: "ief-trigger",
        triggerIndex: 0,
        animateTrigger: !0,
        videoPosition: {
            top: 0
        },
        contentPosition: {
            top: "38%",
            height: "62%"
        },
        textPosition: {
            top: "22%"
        },
        buttonPosition: {
            top: "50%"
        }
    }
}(),
function() {
    var a = !1;
    try {
        a = !!window.localStorage
    } catch (b) {}
    ieFlyout.settings = {
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
        getEnableReminders: function() {
            return this.getBoolOrDefault("ief-reminders", !0)
        },
        setEnableReminders: function(a) {
            return this.set("ief-reminders", a === !0)
        }
    }
}(),
function() {
    function a(a, b) {
        ieFlyout.options[a] && ieFlyout.options[a](b)
    }
    var b = {
        init: [],
        introComplete: [],
        flyoutOpened: [],
        flyoutClosed: [],
        videoOpened: [],
        videoClosed: [],
        peek: [],
        contentLogoClick: [],
        moreSitesClick: [],
        behindScenesClick: [],
        footerLogoClick: [],
        devLinkClick: []
    };
    if (ieFlyout.on = function(a, c) {
        b[a] || (console && console.warn && console.warn("unknown ie flyout event: " + a),
        b[a] = []),
        b[a].push(c)
    }
    ,
    ieFlyout.pe) {
        for (var c = 0; c < ieFlyout.pe.length; c++) {
            var d = ieFlyout.pe[c];
            ieFlyout.on(d.e, d.h)
        }
        delete ieFlyout.pe
    }
    ieFlyout.dispatch = function(a, c) {
        var d, e, f = b[a];
        if (f)
            for (d = 0,
            e = f.length; e > d; d++)
                f[d](c)
    }
    ,
    ieFlyout.on("flyoutOpened", function(b) {
        a("onFlyoutOpened", b)
    }),
    ieFlyout.on("flyoutClosed", function(b) {
        a("onFlyoutClosed", b)
    }),
    ieFlyout.on("videoOpened", function(b) {
        a("onVideoOpened", b)
    }),
    ieFlyout.on("videoClosed", function(b) {
        a("onVideoClosed", b)
    }),
    ieFlyout.on("peek", function(b) {
        a("onPeek", b)
    })
}(),
function() {
    function a() {
        b(600),
        c(600)
    }
    function b(a) {
        e.stop().transition({
            opacity: 1
        }, a, "easeInOutCirc"),
        f.stop().transition($.extend({
            opacity: 1
        }, ieFlyout.options.videoPosition), a, "easeInOutCirc")
    }
    function c(a) {
        g.stop().transition($.extend({
            opacity: 1
        }, ieFlyout.options.textPosition), a, "easeInOutCirc"),
        h.stop().transition($.extend({
            opacity: 1
        }, ieFlyout.options.buttonPosition), a, "easeInOutCirc")
    }
    var d, e, f, g, h, i = 1e3, j = !1;
    ieFlyout.on("init", function() {
        var a = ieFlyout.options.rethinkLink;
        a || (a = "http://www.rethinkie.com/" + (ieFlyout.options.rethinkLinkQuerystring || "")),
        f = $("#ief-video-wrap"),
        g = $("#ief-rethink-text"),
        h = $("#ief-text-buttons"),
        $(".ief-logo-rethink").attr("href", a).on("click", function() {
            ieFlyout.dispatch("contentLogoClick")
        }),
        d = $("#ief-logo-rethink-tagline").addClass("ief-sprite-content-rethink-tagline");
        $("#ief-more-sites").on("click", function() {
            ieFlyout.dispatch("moreSitesClick")
        });
        $("#ief-behind-scenes").on("click", function() {
            ieFlyout.dispatch("behindScenesClick")
        });
        var b = ieFlyout.options.footerLink || a;
        $("#ief-logo-ie-link").attr("href", b).addClass("ief-sprite-content-logo-ie").on("click", function() {
            ieFlyout.dispatch("footerLogoClick")
        }),
        e = $("#ief-footer-wrap").css("background-color", ieFlyout.options.footerBackgroundColor).hover(function() {
            e.css("background-color", ieFlyout.options.footerHoverBackgroundColor)
        }, function() {
            e.css("background-color", ieFlyout.options.footerBackgroundColor)
        }),
        $(".ief-buttonlink").css({
            "background-color": ieFlyout.options.buttonBackgroundColor,
            color: ieFlyout.options.buttonTextColor
        }).hover(function() {
            $(this).css({
                "background-color": ieFlyout.options.buttonHoverBackgroundColor,
                color: ieFlyout.options.buttonHoverTextColor
            })
        }, function() {
            $(this).css({
                "background-color": ieFlyout.options.buttonBackgroundColor,
                color: ieFlyout.options.buttonTextColor
            })
        }),
        $("#ief-content").css({
            "background-color": ieFlyout.options.contentBackgroundColor,
            color: ieFlyout.options.contentTextColor
        }),
        $("#ief-dev-link").on("click", function() {
            ieFlyout.dispatch("devLinkClick")
        })
    }),
    ieFlyout.on("flyoutOpened", function() {
        j || (j = !0,
        setTimeout(function() {
            a()
        }, i))
    })
}(),
function() {
    function a() {
        $(this).toggleClass("ief-sprite-content-play").toggleClass("ief-sprite-content-play-over")
    }
    function b() {
        f && (d.addClass("ief-prepare"),
        setTimeout(function() {
            d.addClass("ief-hide"),
            e.append(f),
            ieFlyout.dispatch("videoOpened")
        }, 50))
    }
    function c() {
        d.removeClass("ief-prepare"),
        setTimeout(function() {
            d.removeClass("ief-prepare"),
            e.empty(),
            ieFlyout.dispatch("videoClosed")
        }, 1e3)
    }
    var d, e, f;
    ieFlyout.on("init", function() {
        $("#ief-modal-trigger").hover(a, a).click(b),
        $("#ief-modal-close").addClass("ief-sprite-modal-close").click(c),
        $("#ief-modal-bg").click($.proxy(this.closeModal, this)),
        d = $("#ief-modal"),
        e = $("#ief-modal-video-wrap"),
        f = $('<iframe src="//www.youtube.com/embed/' + ieFlyout.options.videoId + '?autoplay=1&controls=1&color=white&modestbranding=1&showinfo=0&html5=1&enablejsapi=1" id="ief-modal-video"  width="960" height="720"  frameborder="0"  allowfullscreen=""></iframe>')
    })
}(),
function() {
    function a(a, b) {
        return a && b ? 0 !== a.indexOf(b) ? !1 : ieFlyout.languages[b] ? !0 : !1 : !1
    }
    function b(a) {
        a = (a || "").toLowerCase();
        var b = ieFlyout.languages[e]
          , c = b[a];
        return c || (c = ieFlyout.languages.en[a]),
        c || (c = a || ""),
        c
    }
    function c(a, c) {
        var d = b(c);
        $(a).text(d)
    }
    function d(b) {
        return b && ieFlyout.languages[b] ? b : (b = navigator.language || navigator.userLanguage,
        a(b, "en") ? "en" : a(b, "jp") ? "jp" : "en")
    }
    var e = d();
    ieFlyout.localizeContent = function() {
        c("ief-trigger-rethink", "rethink"),
        c("ief-trigger-tagline", "tagline"),
        c("ief-trigger-ie", "with-ie");
        var a = b("cta-html").replace("{{partnerName}}", ieFlyout.options.partnerName);
        $(".ief-rethink-text-p").html(a);
        var d = b("cta-link").replace("{{ctaLinkQuerystring}}", ieFlyout.options.ctaLinkQuerystring || "")
          , e = b("cta-button-key")
          , f = b(e);
        ieFlyout.options.useDownloadButton && (ieFlyout.detect.canUpgradeIE ? (d = b("download-link"),
        f = b("download-ie")) : (d = b("explore-link"),
        f = b("explore-ie"))),
        $("#ief-more-sites").attr("href", d).find("span").text(f)
    }
    ;
    var f = !1;
    ieFlyout.on("init", function() {
        f = !0
    }),
    ieFlyout.setLanguage = function(a) {
        var b = d(a);
        b !== e && (e = b,
        f && ieFlyout.localizeContent())
    }
}(),
function() {
    var a = ieFlyout.triggers = ieFlyout.triggers || {}
      , b = a.cornerEdge = {};
    b.load = function() {
        this.$corner = $("#ief-trigger-corner-edge").css("background-color", ieFlyout.options.endBackgroundColor).show()
    }
    ,
    b.peekShow = function(a) {}
    ,
    b.peekHide = function(a) {}
}(),
function() {
    function a(a) {
        if (a) {
            var b = new Image;
            b.src = "//view.atdmt.com/action/" + a
        }
    }
    ieFlyout.on("flyoutOpened", function() {
        a(ieFlyout.options.atlasActions.open)
    }),
    ieFlyout.on("videoOpened", function() {
        a(ieFlyout.options.atlasActions.videoPlay)
    }),
    ieFlyout.on("contentLogoClick", function() {
        a(ieFlyout.options.atlasActions.logoClick)
    }),
    ieFlyout.on("footerLogoClick", function() {
        a(ieFlyout.options.atlasActions.logoClick)
    }),
    ieFlyout.on("moreSitesClick", function() {
        a(ieFlyout.options.atlasActions.buttonClick)
    }),
    ieFlyout.on("behindScenesClick", function() {
        a(ieFlyout.options.atlasActions.buttonClick)
    })
}(),
function() {
    function a(a, b, c, d) {
        "undefined" != typeof _gaq && _gaq.push && _gaq.push(["_trackEvent", a, b, c, d]),
        "function" == typeof ga && ga("send", "event", a, b, c, d)
    }
    function b() {
        a("ie-flyout", "engage", "content")
    }
    ieFlyout.on("flyoutOpened", function() {
        a("ie-flyout", "open")
    }),
    ieFlyout.on("videoOpened", function() {
        a("ie-flyout", "play-video"),
        b()
    }),
    ieFlyout.on("contentLogoClick", function() {
        a("ie-flyout", "click-link", "rethink-logo"),
        b()
    }),
    ieFlyout.on("moreSitesClick", function() {
        a("ie-flyout", "click-link", "more-sites"),
        b()
    }),
    ieFlyout.on("behindScenesClick", function() {
        a("ie-flyout", "click-link", "behind-scenes"),
        b()
    }),
    ieFlyout.on("footerLogoClick", function() {
        a("ie-flyout", "click-link", "footer-logo"),
        b()
    }),
    ieFlyout.on("devLinkClick", function() {
        a("ie-flyout", "click-link", "dev-link"),
        b()
    })
}(),
ieFlyout.languages.en = {
    rethink: "Rethink",
    tagline: "What the web can be.",
    "with-ie": "with Internet Explorer",
    "behind-the-scenes": "Behind the Scenes",
    "developer-teardown": "Developer Teardown",
    "learn-more": "Learn more",
    "cta-html": ["Learn more about the new browser for Windows 10. It's fast,", "personal, and all about getting things done."].join(" "),
    "cta-link": "https://www.microsoft.com/en-us/windows/microsoft-edge",
    "cta-button-key": "learn-more",
    "download-ie": "Download Internet Explorer",
    "download-link": "http://windows.microsoft.com/en-us/internet-explorer/download-ie",
    "explore-ie": "Explore IE",
    "explore-link": "http://windows.microsoft.com/en-us/internet-explorer/browser-ie#touchweb=touchvidtab1"
},
ieFlyout.languages.jp = {
    "are-you-ready": "詳しくはこちら",
    "behind-the-scenes": "開発の舞台裏",
    "cta-html": "最新の Web 技術で何ができるか? <strong>Internet Explorer</strong> と{{partnerName}}が挑戦してみました。",
    sports: "スポーツ",
    shopping: "ショッピング",
    entertainment: "エンタメ",
    music: "音楽",
    travel: "旅行",
    gaming: "ゲーム"
},
!function(a) {
    a.templatize = a.templatize || {};
    a.templatize;
    a.templatize.flyout = function(a) {
        return '<div id="trigger-container"><div id="ief-trigger"><div id="ief-trigger-corner-edge"><div id="ief-trigger-corner-edge-center"><div id="ief-trigger-corner-edge-logo" class="ief-edge-logo"></div><div id="ief-trigger-corner-edge-learnmore">Learn More</div><div id="ief-trigger-corner-edge-arrow"></div></div></div></div></div><div id="ief-wrap"><div id="ief-peek"><div id="ief-peek-bg"></div></div><div id="ief-flyout"><div id="ief-content"><img id="ief-top-header" src=""><div id="ief-text-wrap"><div id="ief-text-header"><a id="ief-logo-rethink-link" class="ief-logo-rethink" href="" target="_blank"><div id="ief-logo-rethink-img" class="ief-edge-logo" alt="Rethink Logo"></div></a> <a id="ief-logo-rethink-tagline" class="ief-logo-rethink" href="" target="_blank"></a></div><div id="ief-rethink-text"><p class="ief-rethink-text-p"></p></div><div id="ief-text-buttons"><a id="ief-more-sites" class="ief-buttonlink" target="_blank" href=""><span></span></a></div></div><div id="ief-video-wrap"><div id="ief-modal-trigger" class="ief-sprite-content-play"></div></div><div id="ief-footer-wrap"><a id="ief-dev-link" href="http://dev.modern.ie/tools" target="_blank">Developer? Free testing tools</a></div><button id="ief-video-close" class="ief-close ief-sprite-content-close"></button></div></div></div><div id="ief-modal"><div id="ief-modal-dialog"><button id="ief-modal-close" aria-hidden="true"></button><div id="ief-modal-video-wrap"></div></div><div id="ief-modal-bg"></div></div>'
    }
}(ieFlyout),
ieFlyout.jQueryTransitInit = function() {
    !function(a, b) {
        "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(a.jQuery)
    }(this, function(a) {
        function b(a) {
            if (a in l.style)
                return a;
            for (var b = ["Moz", "Webkit", "O", "ms"], c = a.charAt(0).toUpperCase() + a.substr(1), d = 0; d < b.length; ++d) {
                var e = b[d] + c;
                if (e in l.style)
                    return e
            }
        }
        function c() {
            return l.style[m.transform] = "",
            l.style[m.transform] = "rotateY(90deg)",
            "" !== l.style[m.transform]
        }
        function d(a) {
            return "string" == typeof a && this.parse(a),
            this
        }
        function e(a, b, c) {
            b === !0 ? a.queue(c) : b ? a.queue(b, c) : a.each(function() {
                c.call(this)
            })
        }
        function f(b) {
            var c = [];
            return a.each(b, function(b) {
                b = a.camelCase(b),
                b = a.transit.propertyMap[b] || a.cssProps[b] || b,
                b = i(b),
                m[b] && (b = i(m[b])),
                -1 === a.inArray(b, c) && c.push(b)
            }),
            c
        }
        function g(b, c, d, e) {
            var g = f(b);
            a.cssEase[d] && (d = a.cssEase[d]);
            var h = "" + k(c) + " " + d;
            parseInt(e, 10) > 0 && (h += " " + k(e));
            var i = [];
            return a.each(g, function(a, b) {
                i.push(b + " " + h)
            }),
            i.join(", ")
        }
        function h(b, c) {
            c || (a.cssNumber[b] = !0),
            a.transit.propertyMap[b] = m.transform,
            a.cssHooks[b] = {
                get: function(c) {
                    var d = a(c).css("transit:transform");
                    return d.get(b)
                },
                set: function(c, d) {
                    var e = a(c).css("transit:transform");
                    e.setFromString(b, d),
                    a(c).css({
                        "transit:transform": e
                    })
                }
            }
        }
        function i(a) {
            return a.replace(/([A-Z])/g, function(a) {
                return "-" + a.toLowerCase()
            })
        }
        function j(a, b) {
            return "string" != typeof a || a.match(/^[\-0-9\.]+$/) ? "" + a + b : a
        }
        function k(b) {
            var c = b;
            return "string" != typeof c || c.match(/^[\-0-9\.]+/) || (c = a.fx.speeds[c] || a.fx.speeds._default),
            j(c, "ms")
        }
        a.transit = {
            version: "0.9.12",
            propertyMap: {
                marginLeft: "margin",
                marginRight: "margin",
                marginBottom: "margin",
                marginTop: "margin",
                paddingLeft: "padding",
                paddingRight: "padding",
                paddingBottom: "padding",
                paddingTop: "padding"
            },
            enabled: !0,
            useTransitionEnd: !1
        };
        var l = document.createElement("div")
          , m = {}
          , n = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        m.transition = b("transition"),
        m.transitionDelay = b("transitionDelay"),
        m.transform = b("transform"),
        m.transformOrigin = b("transformOrigin"),
        m.filter = b("Filter"),
        m.transform3d = c();
        var o = {
            transition: "transitionend",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            WebkitTransition: "webkitTransitionEnd",
            msTransition: "MSTransitionEnd"
        }
          , p = m.transitionEnd = o[m.transition] || null ;
        for (var q in m)
            m.hasOwnProperty(q) && "undefined" == typeof a.support[q] && (a.support[q] = m[q]);
        return l = null ,
        a.cssEase = {
            _default: "ease",
            "in": "ease-in",
            out: "ease-out",
            "in-out": "ease-in-out",
            snap: "cubic-bezier(0,1,.5,1)",
            easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        },
        a.cssHooks["transit:transform"] = {
            get: function(b) {
                return a(b).data("transform") || new d
            },
            set: function(b, c) {
                var e = c;
                e instanceof d || (e = new d(e)),
                b.style[m.transform] = "WebkitTransform" !== m.transform || n ? e.toString() : e.toString(!0),
                a(b).data("transform", e)
            }
        },
        a.cssHooks.transform = {
            set: a.cssHooks["transit:transform"].set
        },
        a.cssHooks.filter = {
            get: function(a) {
                return a.style[m.filter]
            },
            set: function(a, b) {
                a.style[m.filter] = b
            }
        },
        a.fn.jquery < "1.8" && (a.cssHooks.transformOrigin = {
            get: function(a) {
                return a.style[m.transformOrigin]
            },
            set: function(a, b) {
                a.style[m.transformOrigin] = b
            }
        },
        a.cssHooks.transition = {
            get: function(a) {
                return a.style[m.transition]
            },
            set: function(a, b) {
                a.style[m.transition] = b
            }
        }),
        h("scale"),
        h("scaleX"),
        h("scaleY"),
        h("translate"),
        h("rotate"),
        h("rotateX"),
        h("rotateY"),
        h("rotate3d"),
        h("perspective"),
        h("skewX"),
        h("skewY"),
        h("x", !0),
        h("y", !0),
        d.prototype = {
            setFromString: function(a, b) {
                var c = "string" == typeof b ? b.split(",") : b.constructor === Array ? b : [b];
                c.unshift(a),
                d.prototype.set.apply(this, c)
            },
            set: function(a) {
                var b = Array.prototype.slice.apply(arguments, [1]);
                this.setter[a] ? this.setter[a].apply(this, b) : this[a] = b.join(",")
            },
            get: function(a) {
                return this.getter[a] ? this.getter[a].apply(this) : this[a] || 0
            },
            setter: {
                rotate: function(a) {
                    this.rotate = j(a, "deg")
                },
                rotateX: function(a) {
                    this.rotateX = j(a, "deg")
                },
                rotateY: function(a) {
                    this.rotateY = j(a, "deg")
                },
                scale: function(a, b) {
                    void 0 === b && (b = a),
                    this.scale = a + "," + b
                },
                skewX: function(a) {
                    this.skewX = j(a, "deg")
                },
                skewY: function(a) {
                    this.skewY = j(a, "deg")
                },
                perspective: function(a) {
                    this.perspective = j(a, "px")
                },
                x: function(a) {
                    this.set("translate", a, null )
                },
                y: function(a) {
                    this.set("translate", null , a)
                },
                translate: function(a, b) {
                    void 0 === this._translateX && (this._translateX = 0),
                    void 0 === this._translateY && (this._translateY = 0),
                    null  !== a && void 0 !== a && (this._translateX = j(a, "px")),
                    null  !== b && void 0 !== b && (this._translateY = j(b, "px")),
                    this.translate = this._translateX + "," + this._translateY
                }
            },
            getter: {
                x: function() {
                    return this._translateX || 0
                },
                y: function() {
                    return this._translateY || 0
                },
                scale: function() {
                    var a = (this.scale || "1,1").split(",");
                    return a[0] && (a[0] = parseFloat(a[0])),
                    a[1] && (a[1] = parseFloat(a[1])),
                    a[0] === a[1] ? a[0] : a
                },
                rotate3d: function() {
                    for (var a = (this.rotate3d || "0,0,0,0deg").split(","), b = 0; 3 >= b; ++b)
                        a[b] && (a[b] = parseFloat(a[b]));
                    return a[3] && (a[3] = j(a[3], "deg")),
                    a
                }
            },
            parse: function(a) {
                var b = this;
                a.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(a, c, d) {
                    b.setFromString(c, d)
                })
            },
            toString: function(a) {
                var b = [];
                for (var c in this)
                    if (this.hasOwnProperty(c)) {
                        if (!m.transform3d && ("rotateX" === c || "rotateY" === c || "perspective" === c || "transformOrigin" === c))
                            continue;"_" !== c[0] && b.push(a && "scale" === c ? c + "3d(" + this[c] + ",1)" : a && "translate" === c ? c + "3d(" + this[c] + ",0)" : c + "(" + this[c] + ")")
                    }
                return b.join(" ")
            }
        },
        a.fn.transition = a.fn.transit = function(b, c, d, f) {
            var h = this
              , i = 0
              , j = !0
              , l = a.extend(!0, {}, b);
            "function" == typeof c && (f = c,
            c = void 0),
            "object" == typeof c && (d = c.easing,
            i = c.delay || 0,
            j = "undefined" == typeof c.queue ? !0 : c.queue,
            f = c.complete,
            c = c.duration),
            "function" == typeof d && (f = d,
            d = void 0),
            "undefined" != typeof l.easing && (d = l.easing,
            delete l.easing),
            "undefined" != typeof l.duration && (c = l.duration,
            delete l.duration),
            "undefined" != typeof l.complete && (f = l.complete,
            delete l.complete),
            "undefined" != typeof l.queue && (j = l.queue,
            delete l.queue),
            "undefined" != typeof l.delay && (i = l.delay,
            delete l.delay),
            "undefined" == typeof c && (c = a.fx.speeds._default),
            "undefined" == typeof d && (d = a.cssEase._default),
            c = k(c);
            var n = g(l, c, d, i)
              , o = a.transit.enabled && m.transition
              , q = o ? parseInt(c, 10) + parseInt(i, 10) : 0;
            if (0 === q) {
                var r = function(a) {
                    h.css(l),
                    f && f.apply(h),
                    a && a()
                }
                ;
                return e(h, j, r),
                h
            }
            var s = {}
              , t = function(b) {
                var c = !1
                  , d = function() {
                    c && h.unbind(p, d),
                    q > 0 && h.each(function() {
                        this.style[m.transition] = s[this] || null 
                    }),
                    "function" == typeof f && f.apply(h),
                    "function" == typeof b && b()
                }
                ;
                q > 0 && p && a.transit.useTransitionEnd ? (c = !0,
                h.bind(p, d)) : window.setTimeout(d, q),
                h.each(function() {
                    q > 0 && (this.style[m.transition] = n),
                    a(this).css(l)
                })
            }
              , u = function(a) {
                this.offsetWidth,
                t(a)
            }
            ;
            return e(h, j, u),
            this
        }
        ,
        a.transit.getTransitionValue = g,
        a
    })
}
,
ieFlyout.jQueryEasingInit = function() {
    jQuery.easing.jswing = jQuery.easing.swing,
    jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        linear: function(a, b, c, d, e) {
            return d * b / e + c
        },
        swing: function(a, b, c, d, e) {
            var f = jQuery.easing[jQuery.easing.def];
            return f ? f(a, b, c, d, e) : .5 - Math.cos(a * Math.PI) / 2
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158
              , g = 0
              , h = d;
            if (0 == b)
                return c;
            if (1 == (b /= e))
                return c + d;
            if (g || (g = .3 * e),
            h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else
                var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158
              , g = 0
              , h = d;
            if (0 == b)
                return c;
            if (1 == (b /= e))
                return c + d;
            if (g || (g = .3 * e),
            h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else
                var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * (2 * Math.PI) / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158
              , g = 0
              , h = d;
            if (0 == b)
                return c;
            if (2 == (b /= e / 2))
                return c + d;
            if (g || (g = e * (.3 * 1.5)),
            h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else
                var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g)) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * (2 * Math.PI) / g) * .5 + d + c
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158),
            d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158),
            d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158),
            (b /= e / 2) < 1 ? d / 2 * (b * b * (((f *= 1.525) + 1) * b - f)) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * (7.5625 * b * b) + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
        }
    })
}
,
function() {
    function a() {
        if ("undefined" != typeof jQuery)
            b && clearInterval(b),
            ieFlyout.jQueryEasingInit(),
            ieFlyout.jQueryTransitInit.call(window),
            $(document).ready(function() {
                ieFlyout.onDomReady()
            });
        else if (!b) {
            var c = document.createElement("script");
            c.src = "//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js",
            c.async = !0,
            c.onload = a;
            var d = document.getElementsByTagName("head")[0];
            d.appendChild(c),
            b = setInterval(a, 25)
        }
    }
    var b = null ;
    a()
}();
