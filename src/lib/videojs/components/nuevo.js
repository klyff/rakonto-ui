import videojs from "video.js";

const Plugin = videojs.getPlugin("plugin"), defaults = {
  infoSize: 18,
  zoomMenu: !0,
  rate: 1,
  pipButton: !0,
  relatedMenu: !0,
  settingsButton: !0,
  rateMenu: !0,
  hdicon: !0,
  shareMenu: !0,
  zoomInfo: !0,
  chapterMarkers: !0,
  contextMenu: !0,
  timetooltip: !1,
  mousedisplay: !0,
  errordisplay: !0,
  related: {},
  logoposition: "LT",
  logooffsetX: 10,
  logooffsetY: 10,
  logourl: "",
  url: "",
  title: "",
  embed: "",
  endAction: "",
  pubid: "",
  slideWidth: 160,
  slideHeight: 90,
  slideType: "vertical",
  limit: 0,
  limitmessage: "Watch full video on",
  dashQualities: !0,
  hlsQualities: !0,
  resume: !0,
  video_id: "",
  playlistUI: !0,
  playlistShow: !0,
  playlistAutoHide: !0,
  captionsSettings: "undefined",
  playlist: !1,
  contextText: "",
  contextUrl: "",
  currentSlide: "",
  infoIcon: "",
  res_num: 0,
  target: "_blank",
  buttonRewind: !0,
  metatitle: "",
  metasubtitle: "",
  isLive: !1,
  qualityMenu: !1,
  liveTimeout: 10,
  captionsSize: 1.25,
  tooltips: !0,
  singlePlay: !0,
  rewindforward: 10,
  isDisposed: !1,
  snapshot: !1,
  snapshotType: "jpg",
  shadowSlide: !1,
  minhd: 720,
  liveReconnect: !1,
  paused: !1
};
if (videojs.browser.IS_ANDROID) {
  try {
    videojs.options.html5.vhs.overrideNative = !0
  } catch (e) {
  }
  try {
    videojs.options.html5.hls.overrideNative = !0
  } catch (e) {
  }
  videojs.options.html5.nativeAudioTracks = !1;
  videojs.options.html5.nativeTextTracks = !1
}
videojs.options.html5.hlsjsConfig = {capLevelToPlayerSize: !0};
var doms = ["bv.bgabxne", "gfbuynpby", "rupnp", "bv.acqp", "zbp.avofw", "gra.yyrufw", "ccn.ofp"];

function setSkin(e) {
  var s = "progressControl", t = "playToggle", i = "liveDisplay", n = "seekToLive", a = "currentTimeDisplay",
    o = "timeDivider", l = "durationDisplay", r = "customControlSpacer", d = "volumePanel", v = "chaptersButton",
    c = "descriptionsButton", u = "subsCapsButton", f = "audioTrackButton", h = "pictureInPictureToggle",
    j = "fullscreenToggle";
  "treso" === e ? videojs.options.controlBar = {children: [s, t, i, n, a, l, d, r, v, c, u, f, h, j]} : "chrome" === e ? videojs.options.controlBar = {children: [t, i, n, a, o, l, r, s, d, v, c, u, f, h, j]} : "party" === e ? videojs.options.controlBar = {children: [t, i, n, s, a, o, l, r, d, v, c, u, f, h, j]} : "roundal" === e || "pinko" === e ? videojs.options.controlBar = {
    volumePanel: {
      inline: !1,
      vertical: !0
    }, children: [t, i, n, a, s, o, l, r, d, v, c, u, f, h, j]
  } : "shaka" === e ? videojs.options.controlBar = {children: [t, i, n, a, o, l, s, r, d, v, c, u, f, h, j]} : "flow" === e ? videojs.options.controlBar = {children: [t, i, n, a, s, l, r, v, c, u, f, h, d, j]} : "jwlike" === e ? videojs.options.controlBar = {
    volumePanel: {
      inline: !1,
      vertical: !0
    }, children: [s, t, i, n, d, a, o, l, r, v, c, u, f, h, j]
  } : "mockup" === e ? videojs.options.controlBar = {children: [s, t, i, n, d, a, o, l, r, v, c, u, f, h, j]} : "nuevo" === e && (videojs.options.controlBar = {
    volumePanel: {
      inline: !1,
      vertical: !0
    }, children: [t, i, n, a, o, s, l, r, d, v, c, u, f, h, j]
  })
}

function isMobile() {
  return videojs.browser.TOUCH_ENABLED
}

var sortByKey = function (e, s) {
  return e.sort(function (e, t) {
    var i = e[s], n = t[s];
    return i < n ? -1 : i > n ? 1 : 0
  })
}, vjs_find = function (e, s) {
  try {
    return e.querySelector(s)
  } catch (e) {
    return !1
  }
}, vjs_mfind = function (e, s) {
  try {
    return e.querySelectorAll(s)
  } catch (e) {
    return !1
  }
}, vjs_El = function (e, s, t) {
  var i = document.createElement(e);
  void 0 !== s && "" !== s && (i.className = s);
  void 0 !== t && "" !== t && (i.innerHTML = t);
  return i
};
try {
  var vjs_skin = vjs_El("div"), doc = document.body;
  doc.appendChild(vjs_skin);
  var vjs_skins = ["nuevo", "chrome", "party", "treso", "roundal", "pinko", "jwlike", "shaka", "flow", "mockup"];
  for (var k in vjs_skins) {
    vjs_skin.className = "vjs-" + vjs_skins[k];
    if (13 === vjs_skin.offsetWidth) {
      videojs.options.skin = vjs_skins[k];
      setSkin(vjs_skins[k])
    }
  }
  doc.removeChild(vjs_skin)
} catch (e) {
  videojs.options.skin = "nuevo";
  setSkin("nuevo")
}
String.prototype.dg13 = function () {
  return this.replace(/[a-zA-Z]/g, function (e) {
    return String.fromCharCode((e <= "Z" ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26)
  })
};

class Nuevo extends Plugin {
  constructor(e, s) {
    super(e);
    var t = videojs.dom;

    function i(e, s) {
      e.prototype = Object.create(s.prototype);
      e.prototype.constructor = e;
      e.__proto__ = s
    }

    function n(e) {
      if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
    }

    var a = function e(s) {
      var t = this;
      if (videojs.browser.IS_IE8) {
        t = document.createElement("custom");
        for (var i in e.prototype) "constructor" !== i && (t[i] = e.prototype[i])
      }
      t.id = s.id;
      t.label = t.id;
      t.width = s.width;
      t.height = s.height;
      t.bitrate = s.bandwidth;
      t.enabled_ = s.enabled;
      Object.defineProperty(t, "enabled", {
        get: function () {
          return t.enabled_()
        }, set: function (e) {
          t.enabled_(e)
        }
      });
      return t
    }, o = function (e) {
      i(s, e);

      function s() {
        var t, i = n(n(t = e.call(this) || this));
        if (videojs.browser.IS_IE8) {
          i = document.createElement("custom");
          for (var a in s.prototype) "constructor" !== a && (i[a] = s.prototype[a])
        }
        i.levels_ = [];
        i.selectedIndex_ = -1;
        Object.defineProperty(i, "selectedIndex", {
          get: function () {
            return i.selectedIndex_
          }
        });
        Object.defineProperty(i, "length", {
          get: function () {
            return i.levels_.length
          }
        });
        return i || n(t)
      }

      var t = s.prototype;
      t.addQualityLevel = function (e) {
        var s = this.getQualityLevelById(e.id);
        if (s) return s;
        var t = this.levels_.length;
        s = new a(e);
        "" + t in this || Object.defineProperty(this, t, {
          get: function () {
            return this.levels_[t]
          }
        });
        this.levels_.push(s);
        this.trigger({qualityLevel: s, type: "addqualitylevel"});
        return s
      };
      t.removeQualityLevel = function (e) {
        for (var s = null, t = 0, i = this.length; t < i; t++) if (this[t] === e) {
          s = this.levels_.splice(t, 1)[0];
          this.selectedIndex_ === t ? this.selectedIndex_ = -1 : this.selectedIndex_ > t && this.selectedIndex_--;
          break
        }
        s && this.trigger({qualityLevel: e, type: "removequalitylevel"});
        return s
      };
      t.getQualityLevelById = function (e) {
        for (var s = 0, t = this.length; s < t; s++) {
          var i = this[s];
          if (i.id === e) return i
        }
        return null
      };
      t.dispose = function () {
        this.selectedIndex_ = -1;
        this.levels_.length = 0
      };
      return s
    }(videojs.EventTarget);
    o.prototype.allowedEvents_ = {
      change: "change",
      addqualitylevel: "addqualitylevel",
      removequalitylevel: "removequalitylevel"
    };
    for (var l in o.prototype.allowedEvents_) o.prototype["on" + l] = null;
    var r = new o, d = function s() {
      r.dispose();
      e.off("dispose", s)
    };
    e.on("dispose", d);
    e.qualityLevels = function () {
      return r
    };
    if (videojs.browser.IS_ANDROID) {
      try {
        videojs.options.vhs.overrideNative = !0
      } catch (e) {
      }
      try {
        videojs.options.hls.overrideNative = !0
      } catch (e) {
      }
      videojs.options.html5.nativeAudioTracks = !1;
      videojs.options.html5.nativeTextTracks = !1
    }
    const v = videojs.mergeOptions(defaults, s);
    v.skin = videojs.options.skin;
    var c, u, f, h, p = e.el(), m = 0, g = 0, y = 0, b = 1;
    e.shadowSlide = v.shadowSlide;
    isMobile() && (v.zoomMenu = !1);
    var _, C, x, k, w, T, I, E = !1, M = e.$(".vjs-tech"), L = ">vid/<deretsiger ton tcudorP>'ncl-sjv'=ssalc vid<",
      S = [], H = vjs_find(p, ".vjs-big-play-button"), B = vjs_find(e.el_, ".vjs-loading-spinner"),
      z = vjs_find(p, ".vjs-control-bar");
    if (!0 === videojs.dispose) {
      e.forward = function () {
        var s = e.duration(), t = e.currentTime();
        if (s > 0) {
          var i = t + v.rewindforward;
          i > s ? e.currentTime(s) : e.currentTime(i)
        }
      };
      e.rewind = function () {
        if (e.duration() > 0) {
          var s = e.currentTime() - v.rewindforward;
          s < 0 && (s = 0);
          e.currentTime(s)
        }
      };
      e.related = function () {
        if (v.settingsButton && v.related.length > 1 && v.relatedMenu && !0 !== e.seeking()) {
          C && t.addClass(C, "vjs-hidden");
          t.removeClass(vjs_find(p, ".vjs-menu-settings"), "vjs-lock-showing");
          t.addClass(H, "vjs-hidden");
          t.removeClass(x, "vjs-hidden");
          Te();
          try {
            t.addClass(p, "vjs-def")
          } catch (e) {
          }
          e.pause()
        }
      };
      e.snapshot = function () {
        var e = p.querySelector("video"), s = e.videoWidth, t = e.videoHeight, i = t / s;
        if (document.getElementById("snap")) {
          var n = document.getElementById("snap");
          n.parentNode.removeChild(n)
        }
        var a = document.createElement("canvas");
        a.id = "snap";
        a.style.position = "absolute";
        a.style.left = "-10000px";
        a.style.top = "0";
        document.body.appendChild(a);
        var o, l = a.getContext("2d");
        if ((videojs.browser.IS_ANDROID || videojs.browser.IS_IPAD || videojs.browser.IS_IPHONE || videojs.browser.IS_IPD) && s > 640) {
          t = parseInt(640 * i, 10);
          s = 640
        }
        a.width = s;
        a.height = t;
        l.fillRect(0, 0, s, t);
        l.drawImage(e, 0, 0, s, t);
        var r = "snapshot.jpg";
        if ("png" === v.snapshotType) {
          r = "snapshot.png";
          o = a.toDataURL("image/png")
        } else o = a.toDataURL("image/jpeg", .9);
        var d = document.createElement("a");
        d.href = o;
        d.download = r;
        document.body.appendChild(d);
        window.setTimeout(function () {
          d.click()
        }, 200)
      };
      e.share = function () {
        if (v.settingsButton && v.shareMenu && !0 !== e.seeking()) {
          x && t.addClass(x, "vjs-hidden");
          t.removeClass(vjs_find(p, ".vjs-menu-settings"), "vjs-lock-showing");
          var s = v.url || document.location.href, i = v.embed || "N/A";
          vjs_find(p, ".embed-code").value = i;
          vjs_find(p, ".perma").value = s;
          C && t.removeClass(C, "vjs-hidden");
          t.addClass(H, "vjs-hidden");
          try {
            t.addClass(p, "vjs-def")
          } catch (e) {
          }
          e.pause()
        }
      };
      !0 !== videojs.browser.TOUCH_ENABLED ? document.body.classList.add("no-touch") : v.contextMenu = !1;
      !0 !== v.contextMenu && p.addEventListener("contextmenu", function (e) {
        e.preventDefault()
      }, !1);
      try {
        vjs_find(p, ".vjs-custom-control-spacer").innerHTML = ""
      } catch (e) {
      }
      var P = "pictureInPictureToggle", N = !0, q = vjs_find(p, ".vjs-picture-in-picture-control");
      if ("undefined" === q || null === q) {
        N = !1;
        P = "fullscreenToggle"
      }
      if (!document.pictureInPictureEnabled && N) {
        t.addClass(q, "vjs-hidden");
        P = "fullscreenToggle"
      }
      if (!0 !== v.pipButton && q) {
        t.addClass(q, "vjs-hidden");
        P = "flow" === v.skin ? "volumePanel" : "fullscreenToggle"
      }
      !0 !== v.pipButton && (M.disablePictureInPicture = !0);
      var A = e.controlBar.addChild("button", {
          el: t.createEl("div", {className: "vjs-quality-button vjs-menu-button vjs-control vjs-button vjs-hidden"}, {
            role: "button",
            "aria-haspopup": "true",
            "aria-expanded": "false"
          })
        }),
        D = e.controlBar.addChild("button", {el: t.createEl("div", {className: "vjs-control vjs-button vjs-cog-menu-button vjs-hidden"})});
      z.insertBefore(A.el_, e.controlBar.getChild(P).el_);
      P = "flow" === v.skin ? A.el_ : e.controlBar.getChild(P).el_;
      z.insertBefore(D.el_, P);
      T = D.el_;
      if (v.snapshot) {
        var W = e.controlBar.addChild("button", {el: t.createEl("button", {className: "vjs-snap-control vjs-control vjs-button"}, {type: "button"})});
        W.el_.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Snapshot") + "</span>";
        e.controlBar.el_.insertBefore(W.el_, D.el_);
        W.el_.onclick = function () {
          e.snapshot()
        };
        W.el_.ontouchstar = function (s) {
          s.stopImmediatePropagation();
          e.snapshot()
        }
      }
      var O = t.createEl("div", {className: "vjs-background-bar"});
      e.el_.insertBefore(O, z);
      k = A.el_;
      var R = '<span class="quality-span vjs-no-pointer"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Quality") + '</span><div class="vjs-menu"><ul class="vjs-menu-content vjs-qlist" role="menu"></ul></div>';
      k.innerHTML = R;
      if (v.buttonForward) {
        v.buttonRewind && be(!0);
        var U = "vjs-forward-control";
        10 !== v.rewindforward && (U = "vjs-forward-control vjs-eforward");
        var F = e.controlBar.addChild("button", {
          el: t.createEl("button", {className: U + " vjs-control vjs-button"}, {
            title: e.localize("Forward"),
            type: "button",
            "aria-disabled": "false"
          })
        });
        F.el_.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Forward") + "</span>";
        "party" === v.skin && v.buttonRewind ? e.controlBar.el_.insertBefore(F.el_, vjs_find(p, ".vjs-rewind-control").nextSibling) : e.controlBar.el_.insertBefore(F.el_, e.controlBar.getChild("playToggle").el_.nextSibling);
        F.el_.onclick = function () {
          e.forward()
        };
        F.el_.ontouchstart = function () {
          e.forward()
        }
      } else v.buttonRewind && be();
      var Y = t.createEl("div", {className: "vjs-vast-label"});
      Y.innerHTML = e.localize("Advertisement");
      var K = "playToggle";
      "party" === v.skin && (K = "currentTimeDisplay");
      "treso" === v.skin && (K = "volumePanel");
      z.insertBefore(Y, e.controlBar.getChild(K).el_.nextSibling);
      if (v.theaterButton) {
        var X = e.controlBar.addChild("button", {
          el: t.createEl("div", {className: "vjs-control vjs-button vjs-control-button vjs-mode-control"}, {
            "aria-live": "polite",
            "aria-disabled": "false"
          })
        });
        X.el_.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Theater mode") + "</span>";
        z.insertBefore(X.el_, e.controlBar.getChild("fullscreenToggle").el_);
        X.el_.onclick = function (s) {
          s.preventDefault();
          var i = X.el_;
          if (t.hasClass(i, "vjs-mode")) {
            t.removeClass(i, "vjs-mode");
            e.trigger("mode", "normal")
          } else {
            t.addClass(i, "vjs-mode");
            e.trigger("mode", "large")
          }
        }
      }
      var Q = vjs_El("div", "vjs-menu-settings"), $ = vjs_El("div", "vjs-menu-div vjs-settings-div");
      Q.appendChild($);
      var Z = vjs_El("div", "vjs-submenu vjs-settings-home");
      $.appendChild(Z);
      var V = vjs_El("ul", "vjs-menu-content vjs-settings-list");
      Z.appendChild(V);
      (w = t.createEl("button", {className: "vjs-cog-button vjs-menu-button vjs-button"}, {
        "aria-live": "polite",
        "aria-disabled": "false",
        "aria-expanded": "false"
      })).innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-hd vjs-hidden">HD</span><span class="vjs-control-text" aria-live="polite">' + e.localize("Settings") + "</span>";
      T.appendChild(w);
      T.appendChild(Q);
      if (v.downloadButton) {
        var G = e.controlBar.addChild("button", {
          el: videojs.dom.createEl("button", {
            className: "vjs-download-control vjs-control vjs-button",
            title: e.localize("Download")
          }, {type: "button", "aria-disabled": "false"})
        });
        z.insertBefore(G.el_, e.controlBar.getChild("fullscreenToggle").el_);
        G.el_.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Download") + "</span>";
        G.el_.onclick = function () {
          var s = v.video_id || null;
          e.trigger("downloadVideo", {source: e.currentSrc(), id: s})
        }
      }
      Ce();
      for (var J = vjs_mfind(p, ".vjs-control"), ee = 0; ee < J.length; ee++) J[ee].removeAttribute("title");
      var se = z.querySelectorAll(".vjs-button");
      for (ee = 0; ee < se.length; ee++) se[ee].removeAttribute("title");
      window.onresize = function (e) {
        Ce();
        Te();
        Ie();
        _e("")
      };
      "" === v.title && (v.title = v.metatitle = document.title);
      "" === v.infoText && (v.infoText = v.metatitle);
      if (!v.timetooltip) {
        var te = vjs_find(p, ".vjs-play-progress"), ie = vjs_find(te, ".vjs-time-tooltip");
        te && ie && t.addClass(ie, "vjs-abs-hidden")
      }
      try {
        v.mousedisplay || t.addClass(vjs_find(p, ".vjs-mouse-display"), "vjs-abs-hidden")
      } catch (e) {
      }
      if (v.logocontrolbar) {
        var ne = vjs_El("img"), ae = !1;
        ne.src = v.logocontrolbar;
        ne.onload = function () {
          this.width + this.height === 0 && (ae = !0);
          if (!0 !== ae) {
            var s = vjs_El("div", "vjs-logo-bar");
            if ("" !== v.logourl) {
              var t = vjs_El("a");
              t.href = v.logourl;
              t.target = v.target;
              v.logotitle && (t.title = v.logotitle);
              t.appendChild(ne);
              s.appendChild(t);
              s.style.cursor = "pointer"
            } else s.appendChild(ne);
            z.insertBefore(s, e.controlBar.getChild("fullscreenToggle").el_)
          }
        }
      }
      if (v.contextMenu) {
        var oe = vjs_El("div", "vjs-context-menu vjs-hidden"), le = "";
        if ("" === v.contextText) {
          v.contextText = "Powered by Nuevodevel.com";
          v.contextUrl = "https://www.nuevodevel.com/nuevo";
          le += "<span>" + v.contextText + "</span>";
          le = '<a class="ctxt" target="' + v.target + '" href="' + v.contextUrl + '"><span style="color:#58f;font-size:18px">ND</span>' + le + "</a>";
          de()
        } else if (v.contextIcon) {
          var re = vjs_El("img");
          re.src = v.contextIcon;
          re.onload = function () {
            if (this.width + this.height > 0) {
              le = '<img src="' + v.contextIcon + '" />';
              le += "<span>" + v.contextText + "</span>";
              "" !== v.contextUrl && (le = '<a class="ctxt" target="' + v.target + '" href="' + v.contextUrl + '">' + le + "</a>");
              de()
            }
          };
          re.onerror = function () {
            le = "<span>" + v.contextText + "</span>";
            "" !== v.contextUrl && (le = '<a class="ctxt" target="' + v.target + '" href="' + v.contextUrl + '">' + le + "</a>");
            de()
          }
        }

        function de() {
          oe.innerHTML = le;
          e.el().appendChild(oe);
          var s;
          p.addEventListener("contextmenu", function (e) {
            clearTimeout(s);
            e.preventDefault();
            t.removeClass(oe, "vjs-hidden");
            var i = oe.offsetWidth, n = oe.offsetHeight, a = null, o = null;
            e.clientY && (a = e.clientY);
            e.clientX && (o = e.clientX);
            if (null !== a && null !== o) {
              var l = p.getBoundingClientRect(), r = a - l.top, d = o - l.left;
              r + n > p.offsetHeight && (r = p.offsetTop + p.offsetHeight - n);
              d + i > p.offsetWidth && (d = p.offsetWidth - i);
              oe.style.top = r + "px";
              oe.style.left = d + "px";
              s = setTimeout(function () {
                t.addClass(oe, "vjs-hidden")
              }, 3e3);
              window.onscroll = function (e) {
                t.addClass(oe, "vjs-hidden")
              };
              window.onclick = function (e) {
                t.addClass(oe, "vjs-hidden")
              }
            }
          })
        }
      }
      if (v.logo) {
        var ve = vjs_El("img");
        ve.src = v.logo;
        var ce = vjs_El("div", "vjs-logo");
        v.logomin && (ce.className = "vjs-logo vjs-logo-min");
        p.appendChild(ce);
        ve.onload = function () {
          if (this.width + this.height !== 0) {
            var e = v.logooffsetX, s = v.logooffsetY;
            if ("RT" === v.logoposition) {
              ce.style.right = e + "px";
              ce.style.top = s + "px"
            } else if ("LB" === v.logoposition) {
              ce.style.left = e + "px";
              ce.className += " vjs-logo-bottom"
            } else {
              ce.style.left = e + "px";
              ce.style.top = s + "px"
            }
            if ("" !== v.logourl) {
              var t = vjs_El("a");
              t.href = v.logourl;
              t.target = v.target;
              v.logotitle && (t.title = v.logotitle);
              t.appendChild(ve);
              ce.appendChild(t)
            } else ce.appendChild(ve)
          } else p.removeChild(ce)
        };
        ve.onerror = function () {
          p.removeChild(ce)
        }
      }
      if ("treso" === v.skin) {
        var ue = vjs_find(p, ".vjs-current-time"), fe = vjs_find(p, ".vjs-duration");
        z.removeChild(ue);
        var he = vjs_find(p, ".vjs-progress-control");
        he.insertBefore(ue, he.childNodes[0]);
        z.removeChild(fe);
        he.appendChild(fe)
      }
      e.resetNuevo = function (s) {
        var i, n, a = [], o = [];
        e.options_.sources.length > 0 && (o = a = e.options_.sources);
        xe();
        Ie();
        try {
          vjs_find(p, ".vjs-quality-button .vjs-menu .vjs-menu-content").innerHTML = "";
          t.addClass(k, "vjs-hidden")
        } catch (e) {
        }
        var l = M;
        if (!0 !== videojs.browser.IS_IOS) for (; l.firstChild;) l.removeChild(l.firstChild);
        1 === a.length && e.src(a);
        if (a.length > 1) {
          var r = 0, d = 0;
          for (r = 0; r < a.length; r++) (a[r].res || a[r].label) && d++;
          if (d > 1) {
            v.dash = !1;
            v.hls = !1;
            var c = [], u = [], f = [], h = "", j = 0, m = 0, g = 0, y = 0, b = 0, _ = !1, C = "MediaSource" in window,
              x = videojs.browser.IS_IOS;
            x && (C = !1);
            x && 1 === o.length && (C = !0);
            for (j = 0; j < o.length; j++) {
              var T = "";
              try {
                ie = o[j].type
              } catch (e) {
              }
              if (void 0 !== ie) {
                if (-1 !== ie.indexOf("x-mpegURL") || -1 !== ie.indexOf("apple")) {
                  v.hls = !0;
                  x && (C = !0);
                  c[m] = o[j];
                  m++
                }
                if (-1 !== ie.indexOf("dash")) {
                  v.dash = !0;
                  u[g] = o[j];
                  g++;
                  x && (C = !1)
                }
              }
              if (o[j].res && o[j].label) {
                if (!0 !== _) {
                  _ = !0;
                  n = {res: o[j].res, type: o[j].type, src: o[j].src, label: o[j].label}
                }
                void 0 === (T = o[j].type) && (T = "");
                if (-1 !== T.indexOf("mpeg") || -1 !== T.indexOf("apple") || -1 !== T.indexOf("dash")) ; else {
                  f[y] = o[j];
                  y++
                }
              }
            }
            var I = [];
            I = (I = c.length > 0 && C ? c : u.length > 0 && C ? u : f).sort(Me);
            var E = "", L = " vjs-checked";
            E = ' class="item-quality"';
            L = ' class="item-quality vjs-checked"';
            for (j = 0; j < I.length; j++) {
              var S = I[j].res, H = parseInt(S, 10), B = "";
              if (v.hdicon && H > v.minhd - 1) {
                var z = "HD";
                H > 1079 && v.minhd < 1080 && (z = "FulHD");
                H > 2159 && (z = "4K");
                B = '<i class="vjs-hd-icon">' + z + "</i>"
              }
              if (I[j].default) {
                i = I[j];
                h += "<li" + L + ' data-height="' + j + '">' + I[j].label + B + "</li>"
              } else h += "<li" + E + ' data-height="' + j + '">' + I[j].label + B + "</li>";
              b++
            }
            if (b > 1) {
              v.res_num = b;
              if (v.qualityMenu) {
                Re();
                var P = vjs_find(p, ".vjs-menu-quality .vjs-menu-content");
                P.innerHTML = P.innerHTML + h;
                t.removeClass(vjs_find(p, ".vjs-extend-quality"), "vjs-hidden");
                t.removeClass(w, "vjs-hidden")
              } else {
                vjs_find(p, ".vjs-quality-button .vjs-menu .vjs-menu-content").innerHTML = h;
                t.removeClass(k, "vjs-hidden")
              }
              var N = vjs_mfind(p, ".item-quality");
              Ie();
              v.menutouch = !1;
              for (j = 0; j < N.length; j++) {
                var q = N[j], A = function (s) {
                  s.stopPropagation();
                  for (var i, n = 0; n < N.length; n++) {
                    t.removeClass(N[n], "vjs-checked");
                    N[n] === s.target && (i = n)
                  }
                  t.addClass(N[i], "vjs-checked");
                  var a = s.target.getAttribute("data-height");
                  Ee(I[a].res, I[a].label);
                  var o = v.video_id || null;
                  e.trigger("resolutionchange", {id: o, res: I[a].res});
                  var l = I[a];
                  He();
                  W(l)
                }, D = !1;
                q.onclick = function (e) {
                  A(e)
                };
                q.ontouchend = function (e) {
                  !0 !== D && A(e)
                };
                q.ontouchstart = function (e) {
                  D = !1
                };
                q.ontouchmove = function (e) {
                  D = !0
                }
              }
              we();
              if (void 0 !== i || void 0 !== n) if (void 0 !== i && i !== n) {
                Ee(i.res, i.label);
                e.src(i);
                e.load()
              } else if (void 0 !== n) {
                Ee(n.res, n.label);
                e.src(n);
                e.load()
              }

              function W(s) {
                var t = e.currentTime(), i = e.paused();
                e.src(s);
                e.load();
                e.play();
                e.setRate(1);
                e.on("loadeddata", function () {
                  t > 0 && e.currentTime(t);
                  i && e.pause();
                  1 !== v.rate && e.setRate(v.rate)
                });
                e.handleTechSeeked_();
                if (i) {
                  var n = !0;
                  e.on("playing", function () {
                    if (n) {
                      e.pause();
                      e.handleTechSeeked_();
                      n = !1
                    }
                  })
                }
              }
            }
          }
        }
      };
      e.on("loadeddata", function () {
        Pe();
        if (_) _ = !1; else {
          "AUDIO" === M.nodeName && videojs.browser.IS_IOS && t.addClass(vjs_find(p, ".vjs-subs-caps-button"), "vjs-hidden");
          v.is_audio = !1;
          t.removeClass(p, "vjs-audio");
          if (e.currentType().indexOf("audio") > -1) {
            t.addClass(p, "vjs-audio");
            v.is_audio = !0
          }
          Oe();
          e.trigger("medialoaded");
          v.isLive = t.hasClass(p, "vjs-live");
          for (var s = [vjs_find(p, ".vjs-play-control"), vjs_find(p, ".vjs-fullscreen-control"), vjs_find(p, ".vjs-mute-control")], i = 0; i < s.length; i++) s[i].onmouseover = function (e) {
            e.target.removeAttribute("title")
          };
          if (!0 !== v.tooltips) {
            var n = vjs_mfind(p, ".vjs-control-text");
            for (i = 0; i < n.length; i++) t.addClass(n[i], "vjs-hidden")
          }
          var a = vjs_mfind(p, ".vjs-menu-button-popup");
          for (i = 0; i < a.length; i++) {
            a[i].onclick = function (e) {
              o(e)
            };
            a[i].ontouchstart = function (e) {
              o(e)
            };
            a[i].onmousemove = function (e) {
              var s = vjs_find(e.target, ".vjs-menu") || vjs_find(e.target.parentNode, ".vjs-menu");
              if (s) if (t.hasClass(s, "vjs-lock-showing")) ; else {
                var i = e.target.querySelector(".vjs-control-text") || e.target.parentNode.querySelector(".vjs-control-text");
                i && i.removeAttribute("style")
              }
            };

            function o(e) {
              for (var s = p.querySelectorAll(".vjs-control-text"), t = 0; t < s.length; t++) s[t].removeAttribute("style");
              var i = vjs_find(e.target, ".vjs-control-text");
              "true" === e.target.getAttribute("aria-expanded") ? i.style.opacity = "0" : i.removeAttribute("style");
              _e(e.target);
              var n = vjs_find(e.target, ".vjs-menu-content") || vjs_find(e.target.parentNode, ".vjs-menu-content"),
                a = 0;
              "treso" === v.skin && (a = -10);
              "shaka" === v.skin && (a = -5);
              "mockup" === v.skin && (a = 5);
              var o = p.offsetHeight - z.offsetHeight - 10 - a;
              n.style.maxHeight = o + "px"
            }
          }
          Ae();
          var l = [];
          l.length = 0;
          I = "undefined";
          if (e.qualityLevels()) {
            I = e.qualityLevels();
            for (i = 0; i < I.length; i++) {
              var r = I[i];
              if (c(r)) {
                var d = {};
                d.id = r.id;
                d.index = "vjs_" + i;
                d.height = r.height;
                d.width = r.width;
                d.label = r.label;
                d.bitrate = r.bitrate;
                d.bandwidth = r.bitrate;
                l.push(d)
              }
            }
          }
          if (l.length > 0 && I) {
            Re();
            v.res_num = l.length;
            Le(l)
          }
        }

        function c(s) {
          var t;
          e.tech_.vhs ? t = e.tech_.vhs : e.tech_.hls && (t = e.tech_.hls);
          if (t && t.representations) {
            var i = t.representations();
            if (i) {
              for (var n = 0; n < i.length; n++) if (s.bitrate === i[n].bandwidth) return !0;
              return !1
            }
          }
          return !0
        }
      });
      if (v.timetooltip) {
        te = vjs_find(p, ".vjs-play-progress");
        var je = vjs_find(te, ".vjs-time-tooltip");
        je && (je.className = "vjs-time-tooltip")
      }
      if (v.mousedisplay) {
        var pe = vjs_find(p, ".vjs-mouse-display");
        pe && (pe.className = "vjs-mouse-display")
      }
      var me = vjs_find(p, ".vjs-info");
      me && p.removeChild(me);
      var ge = vjs_find(p, ".vjs-audio-info");
      ge && p.removeChild(ge);
      e.audioInfo = function () {
        return !(!v.audioInfo || !v.audioInfo.artist && !v.audioInfo.title) && v.audioInfo
      };
      Be();
      ze();
      if (e.options_.sources.length > 0) {
        e.resetNuevo(!1);
        Pe();
        Ae()
      }
      e.setRate = function (s) {
        try {
          if (parseFloat(s) > 0) {
            var i = s + "x";
            e.playbackRate(s);
            v.rate = s;
            for (var n = p.querySelectorAll(".vjs-speed"), a = 0; a < n.length; a++) {
              t.removeClass(n[a], "vjs-checked");
              i === n[a].innerHTML && t.addClass(n[a], "vjs-checked")
            }
            "1" === s && (i = "Normal");
            vjs_find(p, ".vjs-extend-speed span").innerHTML = i
          }
        } catch (e) {
        }
      };
      e.setSource = function (s) {
        e.changeSource(s)
      };
      e.changeSource = function (s) {
        if (!t.hasClass(p, "vjs-ad-playing") && !t.hasClass(p, "vjs-dai") && !e.adPlaying && s) {
          "string" == typeof s && (s = {sources: [{src: s}]});
          s.src && (s = {sources: [s]});
          if (s.sources) {
            var i = 1;
            e.paused() && (i = 2);
            e.changeSrc(s);
            2 === i ? e.pause() : e.play()
          }
        }
      };
      e.changeSrc = function (s) {
        if (!t.hasClass(p, "vjs-ad-playing") && !t.hasClass(p, "vjs-dai")) {
          v.title = "";
          v.infoTitle = null;
          v.infoDescription = null;
          v.description = "";
          v.metatitle = "";
          v.metasubtitle = "";
          for (var i = e.remoteTextTracks(), n = i.length || 0; n--;) e.removeRemoteTextTrack(i[n]);
          var a = e.videoTracks();
          for (n = a.length - 1; n >= 0; n--) e.videoTracks().removeTrack(a[n]);
          var o = e.audioTracks();
          for (n = o.length - 1; n >= 0; n--) e.videoTracks().removeTrack(o[n]);
          if (s) {
            "string" == typeof s && (s = {sources: [{src: s}]});
            s.src && (s = {sources: [s]});
            if (s.sources) {
              v.rate = 1;
              e.setRate(1);
              v.video_id = void 0;
              void 0 !== s.video_id && (v.video_id = s.video_id);
              void 0 !== s.audioInfo ? v.audioInfo = s.audioInfo : v.audioInfo = null;
              void 0 !== s.slideImage ? v.slideImage = s.slideImage : v.slideImage = "";
              void 0 !== s.slideWidth && (v.slideWidth = s.slideWidth);
              void 0 !== s.slideHeight && (v.slideHeight = s.slideHeight);
              void 0 !== s.thumbnails ? v.thumbnails = s.thumbnails : v.thumbnails = null;
              void 0 !== s.title && (v.metatitle = v.title = s.title);
              void 0 !== s.description && (v.description = v.infoDescription = s.description);
              void 0 !== s.embed && (v.embed = s.embed);
              void 0 !== s.metatitle && (v.metatitle = s.metatitle);
              void 0 !== s.infoTitle && (v.infoTitle = s.infoTitle);
              void 0 !== s.infoDescription && (v.infoDescription = s.infoDescription);
              void 0 !== s.infoUrl && (v.infoUrl = s.infoUrl);
              void 0 !== s.infoIcon && (v.infoIcon = s.infoIcon);
              void 0 !== s.subtitle && (v.metasubtitle = s.subtitle);
              void 0 !== s.metasubtitle && (v.metasubtitle = s.metasubtitle);
              void 0 !== s.url && (v.url = s.url);
              for (n = 0; n < s.sources.length; n++) {
                s.sources[n].metatitle || s.sources[n].title || (s.sources[n].metatitle = v.metatitle);
                !s.sources[n].metatitle && s.sources[n].title && (s.sources[n].metatitle = s.sources[n].title);
                s.sources[n].metasubtitle || s.sources[n].subtitle || (s.sources[n].metasubtitle = v.metasubtitle);
                !s.sources[n].metasubtitle && s.sources[n].subtitle && (s.sources[n].metasubtitle = s.sources[n].subtitle)
              }
              e.options_.sources = s.sources;
              e.captions = null;
              if (void 0 !== s.tracks) {
                i = s.tracks;
                for (n = 0; n < i.length; n++) if (void 0 !== i[n].src && "captions" === i[n].kind) {
                  i[n].default && (i[n].mode = "showing");
                  i[n].language = i[n].srclang
                }
                i.length > 0 && (e.captions = i)
              }
              M = e.$(".vjs-tech");
              !0 !== v.pipButton && (M.disablePictureInPicture = !0);
              e.src(s.sources);
              setTimeout(function () {
                var i = vjs_find(p, ".vjs-poster");
                if (void 0 !== s.poster) {
                  i.style.backgroundImage = "url(" + s.poster + ")";
                  e.poster(s.poster)
                } else void 0 !== v.firstplay && e.poster(null);
                t.removeClass(i, "vjs-hidden");
                v.firstplay = !0
              }, 200);
              e.resetNuevo(!0, s);
              ze();
              setTimeout(function () {
                if (void 0 !== s.tracks) {
                  for (var t = s.tracks, i = 0; i < t.length; i++) if (void 0 !== t[i].src) {
                    if (t[i].default && "captions" === t[i].kind) {
                      t[i].mode = "showing";
                      e.currentTrack = t[i].src
                    }
                    var n = e.addRemoteTextTrack(t[i], !0);
                    n.addEventListener("load", function () {
                      "chapters" === this.kind && Ae();
                      if ("metadata" === this.kind) {
                        var s = e.textTracks().length;
                        e.textTracks()[s - 1].src = t[i].src;
                        Ne()
                      }
                    })
                  }
                } else if (void 0 !== s.track && void 0 !== s.track.src) {
                  "captions" === s.track.kind && (s.track.mode = "showing");
                  (n = e.addRemoteTextTrack(s.track, !0)).addEventListener("load", function () {
                    "chapters" === this.kind && Ae();
                    if ("metadata" === this.kind) {
                      var s = e.textTracks().length;
                      e.textTracks()[s - 1].src = t[i].src;
                      Ne()
                    }
                  })
                }
              }, 200)
            }
          }
        }
      };
      e.loadTracks = function (s) {
        var t, i = [];
        Array.isArray(s) ? t = s : (t = [])[0] = s;
        for (var n = !1, a = !1, o = e.textTracks(), l = 0; l < t.length; l++) {
          var r = t[l];
          if ("chapters" === r.kind) for (let s = 0; s < o.length; s++) if ("chapters" === o[s].kind) {
            e.remoteTextTracks().removeTrack(o[s]);
            break
          }
          if (r.kind && r.src) {
            i[l] = e.addRemoteTextTrack(r, !0);
            i[l].addEventListener("load", function () {
              if ("chapters" === this.kind && !0 !== n) {
                n = !0;
                Ae()
              }
              if ("metadata" === this.kind && !0 !== a) {
                a = !0;
                var s = e.textTracks().length;
                e.textTracks()[s - 1].src = this.src;
                Ne()
              }
            })
          }
        }
      };
      e.removeFromPlaylist = function (e) {
        if (v.playlist && v.playlistUI) {
          var s = vjs_find(p, ".vjs-vlist"), t = s.childNodes[e];
          s.removeChild(t);
          for (var i = 0; i < s.childNodes.length; i++) s.childNodes[i].setAttribute("data-id", i)
        }
      };
      e.addToPlaylist = function (e, s, t) {
        if (v.playlist && v.playlistUI) {
          var i, n = vjs_find(p, ".vjs-vlist"), a = n.childNodes.length;
          if ("number" == typeof t && "string" == typeof s) {
            if ("after" === s) {
              i = De(e, t + 1);
              n.insertBefore(i, n.childNodes[t].nextSibling)
            } else if ("before" === s) {
              i = De(e, t);
              n.insertBefore(i, n.childNodes[t])
            }
            for (var o = 0; o < n.childNodes.length; o++) n.childNodes[o].setAttribute("data-id", o)
          } else {
            i = De(e, a - 1);
            n.insertBefore(i, n.childNodes[a - 2].nextSibling)
          }
        }
      };
      e.on("playlistready", function () {
        v.playlistRepeat && e.playlist.repeat(!0);
        We()
      });
      e.ready(function () {
        v.isDisposed = !1;
        e.on("dispose", function () {
          v.isDisposed = !0
        });

        function s(e) {
          e.stopImmediatePropagation();
          t.removeClass(H, "vjs-hidden");
          _e(e.target)
        }

        window.ontouchstart = function (e) {
        };
        window.onclick = function (e) {
          s(e)
        };
        var i = {backgroundOpacity: "0", edgeStyle: "raised", fontPercent: 1.25};
        "undefined" !== v.captionsSettings && (i = v.captionsSettings);
        var n = this.textTrackSettings;
        n.setValues(i);
        n.updateDisplay();
        vjs_find(p, ".vjs-text-track-display").style.zIndex = "1";
        var a = vjs_find(p, ".vjs-progress-holder"), o = vjs_find(a, ".vjs-play-progress");

        function l(s) {
          if (v.isLive) ; else {
            s.preventDefault();
            s.stopPropagation();
            t.addClass(H, "vjs-hidden");
            t.addClass(B, "vjs-hidden");
            var i = a.getBoundingClientRect(), n = (s.pageX - i.left) / a.offsetWidth;
            videojs.holderdown = !0;
            o.style.width = (100 * n).toFixed(2) + "%";
            document.addEventListener("mousemove", d, !1);
            document.addEventListener("mouseup", c, !1);
            e.trigger("progressdown")
          }
        }

        function r(e) {
          e = e < 0 ? 0 : e;
          let s = Math.floor(e % 60), t = Math.floor(e / 60 % 60), i = Math.floor(e / 3600);
          if (isNaN(e) || e === 1 / 0) return "";
          t < 10 && (t = "0" + t);
          s < 10 && (s = "0" + s);
          return (i = i > 0 ? i + ":" : "") + t + ":" + s
        }

        function d(s) {
          s.preventDefault();
          s.stopPropagation();
          var t = a.getBoundingClientRect(), i = s.pageX - t.left, n = i / a.offsetWidth;
          n < 0 && (n = 0);
          n > 1 && (n = 1);
          o.style.width = (100 * n).toFixed(2) + "%";
          var l = e.duration() * n;
          e.currentTime(l);
          var d = vjs_find(a, ".vjs-mouse-display");
          if (d) {
            i < 0 && (i = 0);
            i > a.offsetWidth && (i = a.offsetWidth);
            d.style.left = i + "px";
            var v = r(l);
            vjs_find(d, ".vjs-time-tooltip").innerHTML = v
          }
          var c = new Event("mousemove", {bubbles: !1, cancelable: !1});
          a.dispatchEvent(c);
          vjs_find(p, ".vjs-progress-control").dispatchEvent(c)
        }

        function c(s) {
          videojs.holderdown = !1;
          document.removeEventListener("mousemove", d);
          document.removeEventListener("mouseup", c);
          var i = a.getBoundingClientRect(), n = (s.pageX - i.left) / a.offsetWidth;
          n < 0 && (n = 0);
          n > 1 && (n = 1);
          o.style.width = (100 * n).toFixed(2) + "%";
          var l = e.duration() * n;
          e.currentTime(l);
          var r = new Event("mouseout", {bubbles: !1, cancelable: !1}),
            v = new Event("click", {bubbles: !1, cancelable: !1});
          a.dispatchEvent(r);
          vjs_find(p, ".vjs-progress-control").dispatchEvent(r);
          a.dispatchEvent(v);
          vjs_find(p, ".vjs-progress-control").dispatchEvent(v);
          e.trigger("progressup");
          t.removeClass(H, "vjs-hidden");
          t.removeClass(B, "vjs-hidden")
        }

        a.addEventListener("mousedown", l, !1);
        e.on("timeupdate", function () {
          if (t.hasClass(p, "vjs-ad-playing") || t.hasClass(p, "vjs-dai")) return !1;
          var s = e.currentSource().video_id || v.video_id || void 0;
          if (v.resume && void 0 !== s) {
            var i = e.currentTime();
            i = i.toFixed(2);
            var n = String("vjs_resume-" + s);
            i > 1 && Ke(n, i)
          }
        });
        e.on("volumechange", function () {
          e.volume() > 0 && Ke("volume", e.volume())
        });
        e.on("ended", function () {
          if (t.hasClass(p, "vjs-ad-playing") || t.hasClass(p, "vjs-dai")) return !1;
          var s = !0;
          t.addClass(H, "vjs-hidden");
          if (v.playlist) {
            s = !1;
            e.playlist.currentIndex() === e.playlist.lastIndex() && !0 !== e.playlist.repeat && (s = !0)
          }
          if (s) {
            var i = e.currentSource().video_id || v.video_id || void 0;
            if (v.resume && void 0 !== i) try {
              localStorage.removeItem(String("vjs_resume-" + i))
            } catch (e) {
            }
            if ("" !== v.endAction) v.settingsButton && "share" === v.endAction && v.shareMenu ? e.share() : v.settingsButton && "related" === v.endAction && v.relatedMenu && v.related.length > 1 && e.related(); else {
              t.removeClass(H, "vjs-abs-hidden");
              t.removeClass(H, "vjs-hidden");
              H.removeAttribute("style")
            }
          }
        });
        e.on("playing", function () {
          isMobile() && t.addClass(H, "vjs-abs-hidden");
          if (t.hasClass(p, "vjs-ad-playing") || t.hasClass(p, "vjs-dai")) return !1;
          try {
            t.removeClass(p, "vjs-def")
          } catch (e) {
          }
          x && t.addClass(x, "vjs-hidden");
          C && t.addClass(C, "vjs-hidden");
          t.removeClass(H, "vjs-hidden");
          t.removeClass(H, "vjs-abs-hidden");
          t.removeClass(B, "vjs-hidden");
          t.removeClass(B, "vjs-abs-hidden");
          (e.remoteTextTracks ? e.remoteTextTracks() : []).length < 1 && videojs.browser.IS_IOS && t.addClass(vjs_find(p, ".vjs-subs-caps-button"), "vjs-hidden")
        });
        e.on("pause", function (e) {
          v.paused = !0;
          t.removeClass(H, "vjs-no-pointer");
          var s = vjs_find(p, ".vjs-tech-chromecast");
          videojs.browser.IS_ANDROID || videojs.browser.IS_IOS ? t.addClass(H, "vjs-abs-hidden") : s ? t.addClass(H, "vjs-abs-hidden") : t.removeClass(H, "vjs-abs-hidden")
        });
        e.on("userinactive", function () {
          !0 !== e.paused() && _e("")
        });
        e.on("contentupdate", function () {
          var e = M;
          e.style.top = "0";
          e.style.left = "0";
          e.style.transform = "scale(1)";
          e.style.webkitTransform = "scale(1)";
          e.style.msTransform = "scale(1)";
          b = 1
        });

        function u() {
          if (videojs.ima || videojs.vroll || e.vastAds) return !1;
          if (e.isPreroll || e.resumed) return !1;
          var s = e.currentSource().video_id || v.video_id || void 0;
          e.resumed = !0;
          if (v.resume && void 0 !== s) {
            var t = String("vjs_resume-" + s);
            if (localStorage && localStorage.key) {
              var i = Number(localStorage.getItem(t));
              i > 0 && setTimeout(function () {
                e.currentTime(i)
              }, 500)
            }
          }
        }

        e.on("canplaythrough", function () {
          if (videojs.ima) return !1;
          videojs.browser.IS_IOS && u()
        });
        e.reconnect = function () {
          var s = e.currentSource();
          e.poster("");
          e.src(s);
          e.play()
        };
        e.trigger("nuevoReady");
        e.on("play", function () {
          var s = t.hasClass(p, "vjs-live");
          v.paused && s && v.liveReconnect && e.reconnect();
          v.paused = !1;
          if (v.singlePlay) {
            var i = vjs_mfind(document, "video");
            if (i.length > 1) for (var n = 0; n < i.length; n++) {
              var a = e.$(".vjs-tech");
              i[n] !== a && i[n].pause()
            }
          }
          t.addClass(H, "vjs-no-pointer");
          if (!E) {
            Ce();
            E = !0;
            var o = vjs_find(p, ".vjs-info");
            if (o) {
              t.removeClass(o, "vjs-info-bottom");
              t.addClass(o, "vjs-info-top")
            }
            !0 !== v.is_audio && t.addClass(vjs_find(p, ".vjs-poster"), "vjs-no-pointer");
            !0 !== videojs.browser.IS_IOS && u();
            if (v.limit > 0 && (v.limiturl || "" !== v.url)) {
              var l = !1;
              e.on("timeupdate", function () {
                if (e.currentTime() > v.limit) {
                  e.pause();
                  t.addClass(H, "vjs-abs-hidden");
                  if (!0 !== l) {
                    v.limiturl || (v.limiturl = v.url);
                    l = !0;
                    var s = vjs_El("div", "vjs-limit-overlay"), i = vjs_El("a", "vjs-limit");
                    i.href = v.limiturl;
                    i.target = v.target;
                    i.style.textDecoration = "none";
                    s.appendChild(i);
                    if (v.limitimage) {
                      var n = vjs_El("img");
                      n.src = v.limitimage;
                      n.onload = function () {
                        i.innerHTML = '<img src="' + v.limitimage + '" />'
                      }
                    } else a();

                    function a() {
                      var e = vjs_El("span");
                      e.innerHTML = v.limitmessage + "<span>" + v.limiturl + "</span>";
                      i.appendChild(e)
                    }

                    e.el().appendChild(s)
                  }
                }
              })
            }
            localStorage && localStorage.volume && !0 !== e.muted() && localStorage.volume > 0 && e.volume(localStorage.volume);
            var r = !1;
            v.settingsButton && (v.relatedMenu || v.shareMenu || v.rateMenu || v.zoomMenu) && (r = !0);
            !0 !== r && v.res_num > 1 && v.qualityMenu && t.removeClass(w, "vjs-hidden");
            if (r) {
              var d = "", c = !1, f = !1;
              v.shareMenu && (d = d + '<li class="vjs-settings-item vjs-share-button">' + e.localize("Share") + '<span class="vjs-share-icon"></span></li>');
              v.relatedMenu && v.related.length > 1 && (d = d + '<li class="vjs-settings-item vjs-related-button">' + e.localize("Related") + '<span class="vjs-related-icon"></span></li>');
              if (v.zoomMenu) {
                d = d + '<li class="vjs-settings-item vjs-extend-zoom vjs-menu-forward">' + e.localize("Zoom") + '<span class="zoom-label">100%</span></li>';
                f = vjs_El("div", "vjs-submenu vjs-zoom-menu vjs-hidden", '<div class="vjs-settings-back vjs-zoom-return"><span>' + e.localize("Zoom") + '</span></div><div class="vjs-zoom-slider"><div class="vjs-zoom-back"></div><div class="vjs-zoom-level"></div></div><div class="vjs-zoom-reset">RESET</div>')
              }
              if (v.rateMenu) {
                d = d + '<li class="vjs-settings-item vjs-extend-speed vjs-menu-forward">' + e.localize("Speed") + "<span>Normal</span></li>";
                c = vjs_El("div", "vjs-submenu vjs-menu-speed vjs-hidden", h);
                var h = '<ul class="vjs-menu-content"><li class="vjs-settings-back">' + e.localize("Speed") + "</li>",
                  j = [.25, .5, 1, 1.25, 1.5, 2];
                try {
                  e.playbackRates().length > 0 && (j = e.playbackRates())
                } catch (e) {
                }
                for (var y = 0; y < j.length; y++) {
                  var _ = "vjs-speed";
                  1 == j[y] && (_ = "vjs-speed vjs-checked");
                  h += '<li class="' + _ + '">' + j[y] + "x</li>"
                }
                c = vjs_El("div", "vjs-submenu vjs-menu-speed vjs-hidden", h += "</ul>")
              }
              var k = vjs_find(p, ".vjs-settings-list");
              if ("" !== d) {
                k.innerHTML = d + k.innerHTML;
                var I = vjs_find(p, ".vjs-settings-div");
                c && I.appendChild(c);
                f && I.appendChild(f);
                t.removeClass(T, "vjs-hidden");
                we();
                Ie();
                var L = function (s) {
                  s.stopPropagation();
                  var t = s.target.innerHTML;
                  t = t.replace("x", "");
                  e.setRate(t);
                  _e("")
                }, S = p.querySelectorAll(".vjs-speed");
                for (y = 0; y < S.length; y++) {
                  let e = !1;
                  S[y].onclick = function (e) {
                    L(e)
                  };
                  S[y].ontouchmove = function (s) {
                    e = !0
                  };
                  S[y].ontouchend = function (s) {
                    if (e) e = !1; else {
                      L(s);
                      _e("")
                    }
                  }
                }
              }
              if (v.related.length > 1 && v.relatedMenu) {
                var B = v.related.length;
                x = vjs_El("div");
                var z = isMobile(), P = '<div class="vjs-close-btn"></div>';
                !0 !== z && (P += '<div class="vjs-arrow vjs-arrow-prev vjs-disabled"><div class="vjs-prev"></div></div><div class="vjs-arrow vjs-arrow-next"><div class="vjs-next"></div></div>');
                x.innerHTML = P;
                x.className = "vjs-grid vjs-hidden";
                var N = vjs_El("p");
                N.innerHTML = e.localize("Related");
                var q = vjs_El("div", "vjs-related");
                z && (q.className = "vjs-related vjs-scroll");
                var A = p.offsetWidth, D = .8 * A;
                z && (D = .9 * A);
                x.appendChild(N);
                x.appendChild(q);
                p.appendChild(x);
                var W = vjs_find(x, ".vjs-arrow-prev"), O = vjs_find(x, ".vjs-arrow-next");
                if (!0 !== z) {
                  var R = parseInt(vjs_find(p, ".vjs-prev").offsetWidth, 10) + 5;
                  W && (W.style.left = parseInt(q.style.left, 10) - R + "px");
                  O && (O.style.left = D + parseInt(q.style.left, 10) + "px")
                }
                var U = vjs_El("div", "rel-block rel-anim");
                q.appendChild(U);
                var F = v.related;
                m = 1;
                for (y = 0; y < B; y++) {
                  var Y = vjs_El("div", "rel-parent"), K = vjs_El("div", "rel-item");
                  Y.appendChild(K);
                  U.appendChild(Y);
                  K.innerHTML = '<a class="rel-url" target="' + v.target + '" href="' + F[y].url + '" alt="' + F[y].title + '"><span class="rel-bg" style="background-image:url(' + F[y].thumb + ');"></span><label>' + F[y].title + "</label><i>" + F[y].duration + "</i></a>"
                }
                var X = vjs_mfind(p, ".rel-url");
                for (y = 0; y < X.length; y++) ;
                if (B < 7 && !0 !== z) {
                  W && t.addClass(W, "vjs-hidden");
                  O && t.addClass(O, "vjs-hidden")
                }
                var Q = function (e) {
                  e.stopPropagation();
                  if (!t.hasClass(O, "vjs-disabled")) {
                    var s = q.offsetWidth;
                    m++;
                    t.removeClass(O, "vjs-disabled");
                    var i = (m - 1) * s;
                    U.style.left = "-" + i + "px";
                    m === g && t.addClass(O, "vjs-disabled");
                    t.removeClass(W, "vjs-disabled")
                  }
                };
                !0 !== z && O && (O.onclick = function (e) {
                  Q(e)
                });
                var $, Z = function (e) {
                  e.stopPropagation();
                  if (!t.hasClass(W, "vjs-disabled")) {
                    var s = vjs_find(p, ".vjs-related").offsetWidth, i = ((m -= 1) - 1) * s;
                    vjs_find(p, ".rel-block").style.left = "-" + i + "px";
                    if (!0 !== z) {
                      1 === m && t.addClass(W, "vjs-disabled");
                      t.removeClass(O, "vjs-disabled")
                    }
                  }
                };
                !0 !== z && W && (W.onclick = function (e) {
                  Z(e)
                });
                vjs_find(p, ".vjs-related-button").onclick = function (s) {
                  $ = e.paused();
                  e.related()
                };
                x.onclick = function (s) {
                  t.addClass(x, "vjs-hidden");
                  t.removeClass(H, "vjs-hidden");
                  !0 !== $ && e.play()
                }
              }
              if (v.shareMenu) {
                C = vjs_El("div", "vjs-sharing-overlay vjs-hidden");
                var V = vjs_El("div", "vjs-sharing-container"), G = vjs_El("div", "vjs-sharing-body"),
                  J = vjs_El("div", "vjs-close-btn vjs-share-close"),
                  ee = '<div class="vjs-inputs-body"><h2>' + e.localize("Link") + '</h2><input type="text" readonly class="perma"><h2>' + e.localize("Embed") + '</h2><input class="embed-code" readonly type="text"></div>';
                ee = ee + '<div class="vjs-inputs-body"><h2>' + e.localize("Social") + "</h2></div>";
                ee += '<div class="vjs-share-block"><i title="Facebook" id="share_facebook" class="vjs-share-icon nv vjs-facebook-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee += '<i title="Twitter" id="share_twitter" class="vjs-share-icon nv vjs-twitter-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee += '<i title="Pinterest" id="share_pinterest" class="vjs-share-icon nv vjs-pinterest-square" role="button" aria-live="polite" tabindex="0"></i>';
                ee += '<i title="LinkedIn" id="share_linkedin" class="vjs-share-icon nv vjs-linkedin-square" role="button" aria-live="polite" tabindex="0"></i></div>';
                G.innerHTML = ee;
                V.appendChild(G);
                C.appendChild(J);
                C.appendChild(V);
                var se, te = v.url || document.location.href;
                e.el().appendChild(C);
                vjs_find(p, ".vjs-share-button").onclick = function (s) {
                  se = e.paused();
                  e.share()
                };
                var ie = [], ne = function (e) {
                  var s = [];
                  for (var t in e) s.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
                  return s.join("&")
                }, ae = function (s) {
                  s.stopPropagation();
                  ie = {
                    url: te,
                    title: v.title || v.metatitle || document.title,
                    description: e.localize("Check out this cool video on") + " " + v.url,
                    pubid: v.pubid || null
                  };
                  var t = "";
                  switch (s.target.id.split("_")[1]) {
                    case"facebook":
                      t = "facebook";
                      break;
                    case"twitter":
                      t = "twitter";
                      break;
                    case"pinterest":
                      t = "pinterest";
                      break;
                    case"linkedin":
                      t = "linkedin"
                  }
                  window.open("http://api.addthis.com/oexchange/0.8/forward/" + t + "/offer?" + ne(ie), "AddThis", "height=450,width=550,modal=yes,alwaysRaised=yes")
                }, oe = p.querySelectorAll(".vjs-share-icon");
                for (y = 0; y < oe.length; y++) oe[y].addEventListener("click", ae, !1);
                vjs_find(C, ".embed-code").onclick = function (e) {
                  e.stopImmediatePropagation();
                  this.select()
                };
                vjs_find(C, ".perma").onclick = function (e) {
                  e.stopImmediatePropagation();
                  this.select()
                };
                C.onclick = function (s) {
                  t.addClass(C, "vjs-hidden");
                  t.removeClass(H, "vjs-hidden");
                  !0 !== se && e.play()
                }
              }
              if (v.zoomMenu) {
                var le, re, de, ve, ce = vjs_find(p, ".vjs-poster");
                if (v.zoomInfo) {
                  var ue = vjs_El("div", "vjs-zoom-parent vjs-hidden"), fe = vjs_El("div", "vjs-reset-zoom");
                  fe.innerHTML = "100%";
                  ue.appendChild(fe);
                  var he = vjs_El("div", "vjs-reset-center"), je = vjs_El("div", "vjs-reset-cancel");
                  ue.appendChild(he);
                  ue.appendChild(je);
                  var pe = vjs_El("div", "vjs-reset-info");
                  ue.appendChild(pe);
                  var me = vjs_El("div", "vjs-zoom-help vjs-hidden");
                  v.zoomWheel ? me.innerHTML = '<div class="zoom-close">x</div><div>' + e.localize("ZOOM HELP") + "</div>" + e.localize("Use ZOOM slider or mouse wheel to ZOOM in video.") + "<div>" + e.localize("Drag zoomed area using your mouse or a finger.") + "</div>" : me.innerHTML = '<div class="zoom-close">x</div><div>' + e.localize("ZOOM HELP") + "</div>" + e.localize("Drag zoomed area using your mouse or a finger.") + "</div>";
                  ue.appendChild(pe);
                  pe.onclick = function (e) {
                    ge(e)
                  };

                  function ge(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (t.hasClass(me, "vjs-hidden")) {
                      t.removeClass(me, "vjs-hidden");
                      t.addClass(H, "vjs-hidden")
                    }
                  }

                  vjs_find(me, ".zoom-close").onclick = function () {
                    ye()
                  };

                  function ye() {
                    t.addClass(me, "vjs-hidden");
                    t.addClass(me, "vjs-hidden");
                    t.removeClass(H, "vjs-hidden")
                  }

                  p.appendChild(me);
                  je.onmouseup = function () {
                    Fe()
                  };
                  he.onmouseup = function () {
                    Ue()
                  };
                  p.appendChild(ue)
                }
                var be = vjs_find(p, ".vjs-zoom-reset");
                be && be.addEventListener("mouseup", Fe, !1);
                var xe = e.el();
                xe.hasAttribute("tabIndex") || xe.setAttribute("tabIndex", "-1");
                if (v.zoomWheel) {
                  ce.style.pointerEvents = "auto";
                  ce.addEventListener("mousewheel", Te, {passive: !1});
                  ce.addEventListener("DOMMouseScroll", Te, {passive: !1});

                  function Te(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var s = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                    (b = (100 * b + 20 * s) / 100) < 1 && (b = 1);
                    b > 5 && (b = 5);
                    if (1 === b) {
                      Fe();
                      v.zoomInfo && t.addClass(ue, "vjs-hidden");
                      t.removeClass(H, "vjs-hidden")
                    } else {
                      v.zoomInfo && t.removeClass(ue, "vjs-hidden");
                      Xe(M, b);
                      t.addClass(H, "vjs-hidden")
                    }
                    var i = vjs_find(p, ".vjs-zoom-menu");
                    if (!0 !== t.hasClass(i, "vjs-hidden")) {
                      var n = (b - 1) / 4 * 100;
                      vjs_find(p, ".vjs-zoom-level").style.height = n + "%";
                      ke(100 * b)
                    }
                    return !1
                  }
                }

                function Ee(s) {
                  if (b > 1) {
                    s.preventDefault();
                    s.stopPropagation();
                    le = !0;
                    ve = e.$(".vjs-tech");
                    try {
                      de = [M.offsetLeft - s.clientX, M.offsetTop - s.clientY]
                    } catch (s) {
                    }
                    try {
                      de = [M.offsetLeft - s.touches[0].clientX, M.offsetTop - s.touches[0].clientY]
                    } catch (s) {
                    }
                    ce.style.pointerEvents = "none";
                    document.addEventListener("mouseup", Le, !0);
                    document.addEventListener("mousemove", Me, !0)
                  }
                }

                function Me(e) {
                  e.preventDefault();
                  if (le) {
                    try {
                      re = {x: e.clientX, y: e.clientY}
                    } catch (e) {
                    }
                    var s = ve, t = re.x + de[0], i = re.y + de[1], n = p.offsetWidth / 2 * (b - 1),
                      a = p.offsetHeight / 2 * (b - 1);
                    t > n && (t = n);
                    t < -1 * n && (t = -1 * n);
                    i > a && (i = a);
                    i < -1 * a && (i = -1 * a);
                    s.style.left = t + "px";
                    s.style.top = i + "px"
                  }
                }

                function Le(e) {
                  ce.style.pointerEvents = "auto";
                  le = !1;
                  document.removeEventListener("mouseup", Le, !0);
                  document.removeEventListener("mousemove", Me, !0);
                  e.preventDefault();
                  e.stopPropagation()
                }

                ce.onmousedown = function (e) {
                  Ee(e)
                };

                function Se(e) {
                  var s = 0;
                  if (e.offsetParent) for (; ;) {
                    s += e.offsetTop;
                    if (!e.offsetParent) break;
                    e = e.offsetParent
                  } else e.y && (s += e.y);
                  return s
                }

                function He(e, s) {
                  ce.style.pointerEvents = "auto";
                  var i = !1;
                  try {
                    i = e.pageY
                  } catch (e) {
                  }
                  if (!1 !== i) {
                    var n = s.offsetHeight, a = i - Se(s);
                    a > n && (a = n);
                    a < 0 && (a = 0);
                    var o = parseInt(100 - a / n * 100, 10);
                    o < 0 && (o = 0);
                    o > 100 && (o = 100);
                    try {
                      vjs_find(p, ".vjs-zoom-level").style.height = o + "%"
                    } catch (e) {
                    }
                    try {
                      vjs_find(p, ".zoom-thumb").style.height = o + "%"
                    } catch (e) {
                    }
                    var l = 1 + 4 * o / 100;
                    b = l;
                    Xe(M, l);
                    ke(100 * l);
                    if (l > 1) {
                      videojs.options.blockKeys = !0;
                      t.removeClass(vjs_find(p, ".vjs-zoom-parent"), "vjs-hidden");
                      t.addClass(H, "vjs-hidden")
                    } else {
                      Fe();
                      videojs.options.blockKeys = !1;
                      t.addClass(vjs_find(p, ".vjs-zoom-parent"), "vjs-hidden");
                      t.removeClass(H, "vjs-hidden")
                    }
                  }
                }

                var Be = vjs_find(p, ".vjs-zoom-slider");
                Be.onclick = function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.stopImmediatePropagation()
                };
                Be.addEventListener("mousedown", ze, !1);

                function ze(e) {
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  Qe(!0);
                  var s = vjs_find(p, ".vjs-zoom-slider");
                  He(e, s);
                  document.addEventListener("mousemove", t, !1);
                  document.addEventListener("mouseup", i, !1);

                  function t(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    He(e, s)
                  }

                  function i(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    Qe(!1);
                    document.removeEventListener("mouseup", i);
                    document.removeEventListener("mousemove", t)
                  }
                }
              }
            }
          }
        })
      });
      if (v.mirrorButton) {
        e.controlBar.mirrorButton = e.controlBar.addChild("button", {
          el: t.createEl("div", {
            text: "Mirror view",
            className: "vjs-mirror-button vjs-control vjs-button"
          }, {role: "button", "aria-live": "polite", "aria-disabled": "false"})
        });
        e.controlBar.mirrorButton.el_.innerHTML = '<span class="vjs-control-text" aria-live="polite">' + e.localize("Mirror View") + "</span>";
        e.controlBar.el_.insertBefore(e.controlBar.mirrorButton.el_, D.el_);
        var ye = function (e) {
          e.preventDefault();
          var s = p.className, i = !1;
          s.indexOf("vjs-has-started") > 0 && (i = !0);
          s.indexOf("vjs-ended") > 0 && (i = !1);
          if (i) if (t.hasClass(e.target, "vjs-mirrored")) {
            t.removeClass(e.target, "vjs-mirrored");
            var n = "rotateY(0)";
            M.style.transform = n;
            M.style.webkitTransform = n;
            M.style.msTransform = n
          } else {
            t.addClass(e.target, "vjs-mirrored");
            var a = "rotateY(180deg)";
            M.style.transform = a;
            M.style.webkitTransform = a;
            M.style.msTransform = a
          }
        };
        vjs_find(p, ".vjs-mirror-button").onclick = function (e) {
          ye(e)
        }
      }
      p.style.visibility = "visible";
      !0 !== videojs.nuevo && e.el_.parentNode.removeChild(e.el_)
    } else p.innerHTML = L.split("").reverse().join("");

    function be(s) {
      var i = "vjs-rewind-control";
      s && (i = "vjs-rewind-control vjs-rewind-first");
      10 !== v.rewindforward && (i = "vjs-rewind-control vjs-erewind vjs-rewind-first");
      var n = e.controlBar.addChild("button", {
        el: t.createEl("button", {className: i + " vjs-control vjs-button"}, {
          title: e.localize("Rewind"),
          type: "button",
          "aria-disabled": "false"
        })
      });
      n.el_.innerHTML = '<span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text" aria-live="polite">' + e.localize("Rewind") + "</span>";
      s ? "party" === v.skin ? z.insertBefore(n.el_, e.controlBar.getChild("playToggle").el_.nextSibling) : z.insertBefore(n.el_, e.controlBar.getChild("playToggle").el_) : e.controlBar.el_.insertBefore(n.el_, e.controlBar.getChild("playToggle").el_.nextSibling);
      n.el_.onclick = function () {
        e.rewind()
      };
      n.el_.ontouchstart = function () {
        e.rewind()
      }
    }

    function _e(s) {
      try {
        if (e.isDisposed()) return
      } catch (e) {
      }
      if (!v.isDisposed) {
        "" === s && (s = vjs_find(p, ".vjs-play-control"));
        var i = s.className;
        if ("string" == typeof i || i instanceof String) {
          if (i.indexOf("vjs-menu-item") > -1) return;
          i.indexOf("vjs-chapters-button") < 0 && e.controlBar.getChild("chaptersButton").unpressButton();
          i.indexOf("vjs-descriptions-button") < 0 && e.controlBar.getChild("descriptionsButton").unpressButton();
          if (i.indexOf("vjs-subs-caps-button") < 0) try {
            e.controlBar.getChild("subsCapsButton").unpressButton()
          } catch (e) {
          }
          i.indexOf("vjs-audio-button") < 0 && e.controlBar.getChild("audioTrackButton").unpressButton();
          if (i.indexOf("vjs-quality-button") < 0) try {
            var n = vjs_find(k, ".vjs-menu");
            t.hasClass(n, "vjs-lock-showing") && t.removeClass(n, "vjs-lock-showing")
          } catch (e) {
          }
          if (t.hasClass(s, "vjs-cast")) return !1;
          if (i.indexOf("vjs-cog-button") < 0) try {
            var a = vjs_find(p, ".vjs-menu-settings"), o = vjs_find(p, ".vjs-zoom-menu"),
              l = vjs_find(p, ".vjs-menu-speed"), r = vjs_find(p, ".vjs-quality-menu"),
              d = vjs_find(p, ".vjs-settings-home"), c = vjs_find(p, ".vjs-cog-button");
            o && t.addClass(o, "vjs-hidden");
            r && t.addClass(r, "vjs-hidden");
            l && t.addClass(l, "vjs-hidden");
            d && t.removeClass(d, "vjs-hidden");
            t.removeClass(a, "vjs-lock-showing");
            c.setAttribute("aria-expanded", "false");
            t.removeClass(c, "vjs-cog-active")
          } catch (e) {
          }
        }
      }
    }

    function Ce() {
      for (var e = p.offsetWidth, s = ["vjs-1600", "vjs-1280", "vjs-920", "vjs-600", "vjs-640", "vjs-480", "vjs-360", "vjs-320"], i = 0; i < s.length; i++) t.removeClass(p, s[i]);
      if (e < 360) {
        t.addClass(p, "vjs-480");
        t.addClass(p, "vjs-360");
        e < 320 && t.addClass(p, "vjs-320")
      } else if (e < 480) t.addClass(p, "vjs-480"); else if (e < 640) {
        t.addClass(p, "vjs-640");
        e < 600 && t.addClass(p, "vjs-600")
      } else e < 920 ? t.addClass(p, "vjs-920") : e < 1280 ? t.addClass(p, "vjs-1280") : t.addClass(p, "vjs-1600")
    }

    function xe() {
      var e;
      try {
        var s = vjs_mfind(p, ".item-quality");
        for (e = 0; e < s.length; e++) {
          s[e].ontouchstart = null;
          s[e].onclick = null
        }
      } catch (e) {
      }
      var i = vjs_find(p, ".vjs-menu-quality"), n = vjs_mfind(i, ".item-quality");
      for (e = 0; e < n.length; e++) n[e].parentNode.removeChild(n[e]);
      var a = vjs_find("nv,vjs-extend-quality");
      a && t.addClass(a, "vjs-hidden");
      vjs_find(p, ".vjs-quality-button .vjs-menu .vjs-menu-content").innerHTML = "";
      t.addClass(k, "vjs-hidden")
    }

    function ke(e) {
      try {
        vjs_find(p, ".vjs-reset-zoom").innerHTML = parseInt(e, 10) + "%";
        vjs_find(p, ".zoom-label").innerHTML = parseInt(e, 10) + "%"
      } catch (e) {
      }
    }

    function we() {
      var e = k, s = vjs_find(e, ".vjs-menu"), i = vjs_find(s, ".vjs-menu-content");
      if (v.res_num > 1) {
        var n = function (e) {
          if (t.hasClass(e.target, "vjs-cast")) return !1;
          var s = vjs_find(e.target, ".vjs-control-text");
          if (!0 !== t.hasClass(e.target, "vjs-quality-button")) return !1;
          e.stopPropagation();
          _e(e.target);
          var n = vjs_find(e.target, ".vjs-menu");
          if (t.hasClass(n, "vjs-lock-showing")) {
            e.target.setAttribute("aria-expanded", "false");
            t.removeClass(n, "vjs-lock-showing");
            s.removeAttribute("style")
          } else {
            var a = z, o = p.offsetHeight - a.offsetHeight - 10;
            i.style.maxHeight = o + "px";
            t.addClass(n, "vjs-lock-showing");
            e.target.setAttribute("aria-expanded", "true");
            s.style.opacity = "0"
          }
        };
        e.onclick = function (e) {
          n(e)
        };
        e.onmousemove = function (e) {
          t.removeClass(s, "vjs-hidden")
        };
        e.ontouchstart = function (e) {
          n(e)
        };
        e.onmouseover = function (e) {
          var s = vjs_find(e.target, ".vjs-menu") || vjs_find(e.target.parent, ".vjs-menu");
          if (s && !0 !== t.hasClass(s, "vjs-lock-showing")) {
            var i = vjs_find(e.target, ".vjs-control-text");
            i && i.removeAttribute("style")
          }
        }
      }
      var a = vjs_find(p, ".vjs-settings-div"), o = vjs_find(p, ".vjs-menu-speed"), l = vjs_find(p, ".vjs-zoom-menu"),
        r = vjs_find(p, ".vjs-menu-quality"), d = vjs_find(p, ".vjs-settings-home"), c = function (e, s, i) {
          e.preventDefault();
          e.stopPropagation();
          t.addClass(d, "vjs-hidden");
          t.removeClass(s, "vjs-hidden");
          l && l !== s && t.addClass(l, "vjs-hidden");
          r && r !== s && t.addClass(r, "vjs-hidden");
          a.style.width = S[i].width + "px";
          a.style.height = S[i].height + "px"
        }, u = function (e) {
          e.preventDefault();
          e.stopPropagation();
          l && t.addClass(l, "vjs-hidden");
          o && t.addClass(o, "vjs-hidden");
          r && t.addClass(r, "vjs-hidden");
          t.removeClass(d, "vjs-hidden");
          a.style.width = S.cogMenu.width + "px";
          a.style.height = S.cogMenu.height + "px";
          ke(100 * b)
        };
      let f = !1;
      if (o) {
        var h = vjs_find(p, ".vjs-extend-speed");
        h.onclick = function (e) {
          c(e, o, "speedMenu")
        };
        h.ontouchmove = function () {
          f = !0
        };
        h.ontouchend = function (e) {
          f ? f = !1 : c(e, o, "speedMenu")
        };
        var j = vjs_find(o, ".vjs-settings-back");
        if (j) {
          j.onclick = function (e) {
            u(e)
          };
          j.ontoucmove = function (e) {
            f = !1
          };
          j.ontouchend = function (e) {
            f ? f = !1 : u(e)
          }
        }
      }
      if (r && v.qualityMenu && v.res_num > 1) {
        t.removeClass(vjs_find(p, ".vjs-cog-menu-button"), "vjs-hidden");
        r.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation()
        };
        var m = vjs_find(p, ".vjs-extend-quality");
        m.onclick = function (e) {
          c(e, r, "qualityMenu")
        };
        m.ontoucmove = function (e) {
          f = !1
        };
        m.ontouchstart = function (e) {
          f ? f = !1 : c(e, r, "qualityMenu")
        };
        var g = vjs_find(r, ".vjs-settings-back");
        if (g) {
          g.onclick = function (e) {
            u(e)
          };
          g.ontoucmove = function (e) {
            f = !1
          };
          g.ontouchend = function (e) {
            f ? f = !1 : u(e)
          }
        }
      }
      if (l) {
        var y = vjs_find(p, ".vjs-extend-zoom");
        y.onclick = function (e) {
          c(e, l, "zoomMenu")
        };
        y.ontouchmove = function (e) {
          f = !0
        };
        y.ontouchstart = function (e) {
          f ? f = !1 : c(e, l, "zoomMenu")
        };
        var _ = vjs_find(l, ".vjs-settings-back");
        if (_) {
          _.onclick = function (e) {
            u(e)
          };
          _.ontouchmove = function (e) {
            f = !1
          };
          _.ontouchend = function (e) {
            f ? f = !1 : u(e)
          }
        }
      }
      var C = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!vjs_find(p, ".vjs-tech-chromecast")) {
          Ie();
          var s = p.querySelector(".vjs-menu-settings");
          l && t.addClass(l, "vjs-hidden");
          o && t.addClass(o, "vjs-hidden");
          if (!0 !== t.hasClass(s, "vjs-lock-showing")) {
            e.target.setAttribute("aria-expanded", "true");
            _e(e.target);
            t.addClass(s, "vjs-lock-showing");
            vjs_find(w, ".vjs-control-text").style.opacity = 0;
            t.addClass(e.target, "vjs-cog-active");
            t.removeClass(d, "vjs-hidden");
            a.style.width = S.cogMenu.width + "px";
            a.style.height = S.cogMenu.height + "px";
            ke(100 * b)
          } else {
            e.target.setAttribute("aria-expanded", "false");
            t.removeClass(e.target, "vjs-cog-active");
            x()
          }
        }
      };

      function x() {
        l && t.addClass(l, "vjs-hidden");
        o && t.addClass(o, "vjs-hidden");
        t.removeClass(Z, "vjs-hidden");
        t.removeClass(Q, "vjs-lock-showing");
        vjs_find(w, ".vjs-control-text").removeAttribute("style")
      }

      isMobile() ? w.ontouchstart = function (e) {
        C(e)
      } : w.onclick = function (e) {
        C(e)
      };
      w.onmouseover = function (e) {
        !0 !== t.hasClass(Q, "vjs-lock-showing") && vjs_find(w, ".vjs-control-text").removeAttribute("style")
      }
    }

    function Te() {
      var e = v.related.length, s = .8, i = 800;
      if (vjs_find(p, ".rel-block")) {
        t.removeClass(vjs_find(p, ".rel-block"), "rel-anim");
        var n = p.offsetWidth, a = n * s;
        a > i && (a = i);
        var o = parseInt(vjs_find(p, ".vjs-related").style.maxWidth, 10);
        isNaN(o) && (o = 0);
        parseInt(o, 10) < 100 && (o = i);
        a > o && (a = o);
        var l = vjs_find(p, ".vjs-related");
        l.style.maxWidth = i < o ? i + "px" : "800px";
        l.style.width = 100 * s + "%";
        var r = 3, d = 2;
        e < 5 && 3 !== e && (r = 2);
        e < 4 && (d = 1);
        if (a < 480) {
          r = 2;
          d = 1
        }
        var c = a / r * .5625, u = a / r, f = Math.ceil(e / 6);
        m > f && (m = f);
        g = f;
        2 === r && 2 === d && (g = Math.ceil(e / 4));
        2 === r && 1 === d && (g = Math.ceil(e / 2));
        var h = c * d;
        l.style.height = h + "px";
        var j = n / 2 - a / 2;
        l.style.top = .55 * p.offsetHeight - h / 2 + "px";
        l.style.left = n / 2 - a / 2 + "px";
        if (!0 !== isMobile()) {
          var y = vjs_find(p, ".vjs-arrow-prev"), b = vjs_find(p, ".vjs-arrow-next"),
            _ = parseInt(vjs_find(p, ".vjs-prev").offsetWidth + 5, 10);
          y.style.left = j - _ + "px";
          b.style.left = a + j + "px";
          t.removeClass(b, "vjs-disabled");
          t.removeClass(y, "vjs-disabled");
          m === g && t.addClass(b, "vjs-disabled");
          1 === m && t.addClass(y, "vjs-disabled")
        }
        if (m > 1) {
          var C = l.offsetWidth, x = (m - 1) * C;
          vjs_find(p, ".rel-block").style.left = "-" + x + "px"
        }
        for (var k = 0, w = 0, T = p.querySelectorAll(".rel-parent"), I = 0; I < T.length; I++) {
          var E = T[I];
          E.style.left = k + "px";
          if (1 === w && d > 1) {
            E.style.top = c + "px";
            k += u
          } else E.style.top = 0;
          1 === d && (k += u);
          E.style.width = u + "px";
          E.style.height = c + "px";
          d > 1 ? 2 === ++w && (w = 0) : w = 0
        }
        t.addClass(vjs_find(p, ".rel-block"), "rel-anim")
      }
    }

    function Ie() {
      var e = vjs_find(p, ".vjs-settings-home"), s = vjs_find(p, ".vjs-menu-speed"), i = vjs_find(p, ".vjs-zoom-menu"),
        n = vjs_find(p, ".vjs-menu-quality"), a = vjs_find(p, ".vjs-settings-div");
      t.addClass(z, "vjs-block");
      a.style.width = "auto";
      a.style.height = "auto";
      var o = 10;
      "shaka" !== v.skin && "pinko" !== v.skin || (o = 5);
      "party" === v.skin && (o = 0);
      var l = p.offsetHeight - z.offsetHeight - o;
      l > 300 && (l = 300);
      a.style.maxHeight = l + "px";
      s && t.addClass(s, "vjs-hidden");
      i && t.addClass(i, "vjs-hidden");
      n && t.addClass(n, "vjs-hidden");
      var r = vjs_find(p, ".vjs-menu-settings");
      t.removeClass(r, "vjs-hidden");
      t.addClass(r, "vjs-invisible");
      S.cogMenu = {width: r.clientWidth, height: r.clientHeight};
      if (s) {
        t.addClass(e, "vjs-hidden");
        i && t.addClass(i, "vjs-hidden");
        n && t.addClass(n, "vjs-hidden");
        t.removeClass(s, "vjs-hidden");
        t.addClass(s, "vjs-invisible");
        S.speedMenu = {width: s.clientWidth, height: s.clientHeight};
        t.removeClass(s, "vjs-invisible");
        t.addClass(s, "vjs-hidden")
      }
      if (n && v.qualityMenu) {
        t.addClass(e, "vjs-hidden");
        i && t.addClass(i, "vjs-hidden");
        s && t.addClass(s, "vjs-hidden");
        t.removeClass(n, "vjs-hidden");
        t.addClass(n, "vjs-invisible");
        S.qualityMenu = {width: n.offsetWidth + 10, height: n.offsetHeight};
        t.removeClass(n, "vjs-invisible");
        t.addClass(n, "vjs-hidden");
        t.removeClass(vjs_find(p, ".vjs-cog-menu-button"), "vjs-hidden")
      }
      if (i) {
        t.addClass(e, "vjs-hidden");
        s && t.addClass(s, "vjs-hidden");
        n && t.addClass(n, "vjs-hidden");
        t.removeClass(i, "vjs-hidden");
        t.addClass(i, "vjs-invisible");
        S.zoomMenu = {width: i.clientWidth, height: i.clientHeight};
        t.removeClass(i, "vjs-invisible");
        t.addClass(i, "vjs-hidden")
      }
      t.removeClass(z, "vjs-block");
      t.addClass(vjs_mfind(p, ".vjs-submenu"), "vjs-hidden");
      t.removeClass(e, "vjs-hidden");
      t.removeClass(r, "vjs-invisible");
      t.removeClass(e, "vjs-hidden");
      (v.speedMenu || v.zoomMenu || v.relatedMenu || v.shareMenu) && v.settingsButton && t.removeClass(vjs_find(p, ".vjs-cog-menu-button"), "vjs-hidden")
    }

    function Ee(e, s) {
      var i = parseInt(e, 10), n = "", a = "";
      if (v.hdicon) {
        a = "HD";
        i > 2159 && (a = "4K");
        i > v.minhd - 1 && (n = '<i class="vjs-hd-icon vjs-hd-home">' + a + "</i>")
      }
      if (v.qualityMenu) {
        vjs_find(p, ".quality-label").innerHTML = s + n;
        i > v.minhd - 1 ? t.removeClass(vjs_find(p, ".vjs-hd"), "vjs-hidden") : t.addClass(vjs_find(p, ".vjs-hd"), "vjs-hidden")
      } else vjs_find(p, ".vjs-quality-button .quality-span").innerHTML = s + n
    }

    function Me(e, s) {
      return e.res && s.res ? +s.res - +e.res : 0
    }

    function Le(s) {
      xe();
      if (!(s.length < 2)) {
        v.is_auto = !0;
        for (var i = 0, n = 0, a = !1, o = 0, l = s.length; o < l; o++) {
          s[o].height > 0 && i++;
          s[o].bitrate > 0 && n++;
          for (var r = 0, d = 0; d < s.length; d++) s[o].height === s[d].height && r++;
          r > 1 && (a = !0)
        }
        var c = "bitrate";
        i >= n && (c = "height");
        s = (s = sortByKey(s, c)).reverse();
        e.hlsLevels = s;
        var u = "vjs-menu-item item-quality", f = "vjs-menu-item item-quality vjs-checked", h = "";
        v.res_num = s.length + 1;
        for (o = 0; o < s.length; o++) {
          var j = "", m = "", g = parseInt(s[o].height, 10);
          if (v.hdicon && g > v.minhd - 1) {
            var y = "HD";
            g > 1079 && v.minhd < 1080 && (y = "FulHD");
            g > 2159 && (y = "4K");
            m = '<i class="vjs-hd-icon">' + y + "</i>";
            Se(g)
          }
          var b = s[o].bitrate, C = s[o].height, x = parseInt(b / 1e3, 10);
          if (s[o].height > 0 || s[o].bitrate > 0) {
            var T = u;
            a ? h += i === n ? '<li data-id="' + s[o].index + '" class="' + T + '" data-bitrate="' + b + '" data-height="' + s[o].height + '"' + j + ' role="menuitem" aria-live="polite" aria-disabled="false">' + C + "p (" + x + " kbps)</li>" : i > n ? '<li data-id="' + s[o].index + '" class="' + T + '" data-bitrate="' + b + '" data-height="' + s[o].height + '"' + j + ' role="menuitem" aria-live="polite" aria-disabled="false">' + C + "p" + m + "</li>" : '<li data-id="' + s[o].index + '" class="' + T + '" data-bitrate="' + b + '" data-height="' + s[o].height + '"' + j + ' role="menuitem" aria-live="polite" aria-disabled="false">' + x + " kbps</li>" : s[o].bitrate > 0 && n > i ? h += '<li data-id="' + s[o].index + '" class="' + T + '" data-bitrate="' + b + '" data-height="' + s[o].height + '"' + j + ' role="menuitem" aria-live="polite" aria-disabled="false">' + C + "p (" + x + " kbps)</li>" : h += '<li id = "' + s[o].index + '" data-id="' + s[o].id + '" class="' + T + '" data-bitrate="' + b + '" data-height="' + s[o].height + '"' + j + ' role="menuitem" aria-live="polite" aria-disabled="false">' + C + "p" + m + "</li>"
          }
        }
        h += '<li id="auto" class="vjs-menu-item item-quality auto-res" data-height="Autores"' + f + ' role="menuitem" aria-live="polite" aria-disabled="false">Auto<i class="autores"></i></li>';
        vjs_find(p, ".quality-span").innerHTML = "Auto";
        if (v.qualityMenu) {
          Re();
          var E = vjs_find(p, ".vjs-menu-quality .vjs-menu-content");
          E.innerHTML = E.innerHTML + h;
          t.removeClass(vjs_find(p, ".vjs-extend-quality"), "vjs-hidden");
          t.removeClass(w, "vjs-hidden")
        } else {
          vjs_find(p, ".vjs-quality-button .vjs-menu .vjs-menu-content").innerHTML = h;
          t.removeClass(k, "vjs-hidden")
        }
        var M = vjs_mfind(p, ".item-quality");
        we();
        var L = e.currentSource(), S = e.options(), z = S.html5.vhs || S.html5.hls;
        void 0 !== S.html5.hlsjsConfig.startLevel ? D(S.html5.hlsjsConfig.startLevel) : void 0 !== z && void 0 !== z.startLevel ? D(z.startLevel) : void 0 !== L.startLevel ? D(L.startLevel) : A(!1);
        v.menutouch = !1;
        Ie();
        I && I.on("change", function () {
          var e = vjs_find(p, ".auto-res");
          if (e) {
            e.className.indexOf("vjs-checked") > -1 && A()
          } else ;
        });
        for (o = 0; o < M.length; o++) {
          var P = M[o], N = function (e) {
            e.stopPropagation();
            _ = !0;
            for (var s = 0; s < M.length; s++) t.removeClass(M[s], "vjs-checked");
            t.removeClass(vjs_find(p, ".auto-res"), "vjs-checked");
            t.addClass(e.target, "vjs-checked");
            var i = e.target.getAttribute("id");
            He();
            I && ("auto" === i ? A(!0) : W(e.target))
          };
          if (P.className.indexOf("vjs-hidden") < 0) {
            var q = !1;
            P.ontouchend = function (e) {
              !0 !== q && N(e)
            };
            P.ontouchstart = function (e) {
              q = !1
            };
            P.ontouchmove = function (e) {
              q = !0
            };
            P.onclick = function (e) {
              N(e)
            }
          }
        }
      }

      function A(s) {
        if (t.hasClass(p, "vjs-has-started")) {
          !0 !== e.paused() && t.addClass(H, "vjs-hidden");
          t.addClass(B, "vjs-hidden")
        }
        if (s) for (var i = 0; i < I.length; i++) I[i].enabled = !0;
        var n = vjs_find(p, ".auto-res");
        n && (n.className = "vjs-menu-item item-quality auto-res vjs-checked");
        var a = I[I.selectedIndex];
        if (a) {
          var o = "", l = 0;
          a.height && (l = parseInt(a.height));
          o = l > 0 ? a.height + "p" : parseInt(a.bitrate / 1e3) + "kbps";
          n && (n.innerHTML = 'Auto<i class="autores">' + o + "</i>");
          var r = "";
          if (v.hdicon) {
            l >= v.minhd - 1 && (r = "HD");
            l > 2159 && (r = "4K");
            Se(l)
          }
        }
        vjs_find(p, ".quality-span").innerHTML = 'Auto<i class="vjs-hd-icon vjs-hd-home">' + r + "</i>"
      }

      function D(s) {
        for (o = 0; o < M.length; o++) {
          var i = M[o].getAttribute("data-bitrate"), n = M[o].getAttribute("data-height");
          if (i === s || s === n) {
            W(M[o]);
            e.paused() && t.addClass(B, "vjs-hidden");
            break
          }
        }
      }

      function W(s) {
        if (t.hasClass(p, "vjs-has-started")) {
          !0 === e.paused() && t.addClass(H, "vjs-hidden");
          t.addClass(B, "vjs-hidden")
        }
        vjs_find(p, ".auto-res").innerHTML = 'Auto<i class="autores"></i>';
        var i = parseInt(s.getAttribute("data-height")), n = i, a = parseInt(s.getAttribute("data-bitrate")),
          o = e.qualityLevels();
        t.addClass(s, "vjs-checked");
        var l = v.video_id || null;
        0 == n && (n = a);
        e.trigger("resolutionchange", {id: l, resolution: i});
        for (var r = 0; r < o.length; r++) o[r].height === i || o[r].bitrate === a ? I[r].enabled = !0 : I[r].enabled = !1;
        var d = "", c = "", u = vjs_find(p, ".quality-span");
        if (i > 0) {
          d = "HD";
          i > 2159 && (d = "4K");
          i > v.minhd - 1 && (c = '<i class="vjs-hd-icon vjs-hd-home">' + d + "</i>");
          u.innerHTML = i + "p" + c
        } else a > 0 && (u.innerHTML = parseInt(a / 1e3) + "kB");
        Se(i)
      }
    }

    function Se(e) {
      if (v.hdicon && v.qualityMenu) {
        var s = vjs_find(p, ".vjs-hd");
        if (e > v.minhd - 1) {
          var i = "HD";
          e > 2159 && (i = "4K");
          s.innerHTML = i;
          t.removeClass(s, "vjs-hidden")
        } else t.addClass(s, "vjs-hidden")
      }
    }

    function He() {
      if (v.qualityMenu) {
        t.addClass(vjs_find(p, ".vjs-menu-quality"), "vjs-hidden");
        t.removeClass(vjs_find(p, ".vjs-settings-home"), "vjs-hidden");
        t.removeClass(vjs_find(p, ".vjs-menu-settings"), "vjs-lock-showing")
      } else {
        var e = vjs_find(p, ".vjs-quality-button");
        if (e) {
          var s = vjs_find(e, ".vjs-menu"), i = vjs_find(e, ".vjs-control-text");
          if (s) {
            s.style.display = "none";
            t.removeClass(s, "vjs-lock-showing");
            i && i.removeAttribute("style")
          }
        }
      }
    }

    function Be() {
      var e = vjs_find(p, ".vjs-audio-info");
      e && p.removeChild(e);
      if (v.audioInfo && (v.audioInfo.artist || v.audioInfo.title)) {
        var s = vjs_El("span", "vjs-audio-info"), t = "";
        v.audioInfo.url ? t = '<a href="' + v.audioInfo.url + '" rel="nofollow" target="' + v.target + '">' : s.style.pointerEvents = "none";
        v.audioInfo.cover && (t += '<span class="vjs-cover"><img src="' + v.audioInfo.cover + '"/></span>');
        t += '<span class="vjs-audio-item vjs-text">';
        v.audioInfo.artist && (t += '<span class="audio-artist">' + v.audioInfo.artist + "</span>");
        v.audioInfo.title && (t += '<span class="vjs-audio-item vjs-song">' + v.audioInfo.title + "</span>");
        if (v.audioInfo.genre || v.audioInfo.album || v.audioInfo.year) {
          t += '<span class="vjs-audio-item audio-id">';
          v.audioInfo.genre && (t += "<span>Genre: " + v.audioInfo.genre + "</span>");
          v.audioInfo.album && (t += "<span>Album: " + v.audioInfo.album + "</span>");
          v.audioInfo.year && (t += "<span>Year: " + v.audioInfo.year + "</span>");
          t += "</span>"
        }
        t += "</span>";
        v.audioInfo.url && (t += "</a>");
        s.innerHTML = t;
        p.appendChild(s);
        s.onclick = function () {
          window.open(v.audioInfo.url, v.target)
        }
      }
    }

    function ze() {
      var e = vjs_find(p, ".vjs-info");
      e && p.removeChild(e);
      if (!v.audioInfo && v.videoInfo && (v.infoText || v.infoTitle || "" !== v.title)) {
        var s = vjs_El("span", "vjs-info vjs-info-top");
        v.infoBottom && (s = vjs_El("span", "vjs-info vjs-info-bottom"));
        var t = v.infoSize, i = "", n = "";
        (parseInt(v.infoSize, 10) < 15 || parseInt(v.infoSize, 10) > 24) && (t = 18);
        18 !== t && (i = "font-size:" + t + "px;");
        v.infoBold && (i += "font-weight:bold;");
        v.infoFont && (i += "font-family:" + v.infoFont);
        "" !== i && (s.style = i);
        p.appendChild(s);
        v.infoUrl ? n = '<a href="' + v.infoUrl + '" target="' + v.target + '">' : s.style.pointerEvents = "none";
        var a = "";
        v.infoText ? a = v.infoText : v.infoTitle ? a = v.infoTitle : "" !== v.title && (a = v.title);
        var o = "";
        "" !== v.infoIcon && (o = '<span class="vjs-icon"><img src="' + v.infoIcon + '"/></span>');
        n += o;
        n += '<span class="vjs-text"><span class="vjs-ttl">' + a + "</span>";
        v.infoDescription && (n += '<span class="vjs-dsc">' + v.infoDescription + "</span>");
        v.infoUrl ? n += "</span></a></span>" : n += "</span>";
        s.innerHTML = n;
        s.onclick = function () {
          window.open(v.infoUrl, v.target)
        }
      }
    }

    function Pe() {
      var s = [];
      if (e.textTracks().length > 0) for (var t = e.textTracks(), i = 0; i < t.length; i++) {
        var n = {}, a = t[i];
        if ("captions" === a.kind) {
          n.kind = a.kind;
          n.src = a.src;
          n.language = a.language;
          n.label = a.label;
          "showing" === a.mode && (n.mode = "showing");
          s.push(n)
        }
      }
      s.length > 0 && (e.captions = s)
    }

    function Ne() {
      var s = !1, t = e.textTracks();
      if (t.length > 0) for (var i = 0; i < t.length; i++) "metadata" === t[i].kind && t[i].src && !0 !== s && e.trigger("medialoaded")
    }

    function qe(e) {
      var s = vjs_find(p, ".vjs-thumbnail-holder"), i = vjs_find(p, ".vjs-progress-slide .vjs-thumb");
      if (s) {
        if ("shaka" === v.skin) {
          var n = Number(s.style.height.replace(/px$/, "")), a = s.computedStyleMap().get("bottom").value + n + 5;
          e.style.bottom = a + "px"
        } else t.addClass(s, "vjs-vtt");
        t.addClass(e, "vjs-chapter-mix")
      } else if (i) {
        if ("shaka" === v.skin) {
          var o = Number(i.style.height.replace(/px$/, ""));
          e.style.bottom = o + 32 + "px"
        } else t.addClass(i, "vjs-sld");
        t.addClass(e, "vjs-chapter-mix")
      }
      return 0
    }

    function Ae() {
      var s = e.textTracks(), i = vjs_find(p, ".vjs-chapter");
      i && i.parentNode.removeChild(i);
      if (v.chapterMarkers) {
        var n = p.getElementsByClassName("vjs-marker");
        if (n) for (; n.length > 0;) n[0].parentNode.removeChild(n[0]);
        if (e.duration() === 1 / 0 || 0 === e.duration()) return;
        var a = !1;
        if (s.length > 0) for (var o = 0; o < s.length; o++) if ("chapters" === s[o].kind && s[o].cues && !0 !== a) {
          a = !0;
          var l = s[o]
        }
        if (l) {
          var r = l.cues;
          if (r) {
            var d = vjs_find(p, ".vjs-mouse-display");
            try {
              t.addClass(d, "vjs-abs-hidden")
            } catch (e) {
            }
            var c = [], u = vjs_find(p, ".vjs-progress-holder"), f = e.duration(), h = vjs_El("div");
            h.className = "vjs-chapter";
            u.appendChild(h);
            vjs_find(p, ".vjs-progress-control").onmousemove = function () {
              var e = Number(d.style.left.replace(/px$/, "")), s = e / u.offsetWidth * f;
              qe(h);
              h.style.left = d.style.left;
              for (var t = r.length - 1; t >= 0; t--) if (s >= r[t].startTime) {
                if (h.innerHTML !== r[t].text) {
                  h.innerHTML = r[t].text;
                  h.style.maxWidth = .98 * u.offsetWidth + "px"
                }
                var i = h.offsetWidth / 2, n = u.offsetWidth - h.offsetWidth / 2;
                i > e && (h.style.left = i + "px");
                n < e && (h.style.left = n + "px");
                h.style.opacity = "1";
                h.style.visibility = "visible";
                break
              }
            };
            vjs_find(p, ".vjs-progress-control").onmouseout = function () {
              if (!videojs.holderdown) {
                h.style.opacity = "0";
                h.style.visibility = "visible"
              }
            };
            for (o = 0; o < r.length; o++) if (r[o].startTime > 0) {
              c[o] = r[o].startTime;
              var j = vjs_El("div", "vjs-marker"), m = vjs_El("div", "vjs-marker-inn");
              j.appendChild(m);
              j.style.left = c[o] / f * 100 + "%";
              u.appendChild(j)
            }
          }
        }
      }
    }

    function De(s, t) {
      var i = vjs_El("div", "vjs-item");
      i.setAttribute("data-id", t);
      var n = vjs_El("div", "vjs-tmb");
      s.thumb ? n.style.backgroundImage = "url(" + s.thumb + ")" : s.poster && (n.style.backgroundImage = "url(" + s.poster + ")");
      i.appendChild(n);
      var a = vjs_El("p");
      if (s.title) a.innerHTML = s.title; else {
        var o = "";
        if (s.audioInfo && void 0 !== typeof s.audioInfo.title) {
          o = s.audioInfo.title;
          void 0 !== typeof s.audioInfo.artist && (o = s.audioInfo.artist + " - " + o)
        }
        if ("" !== o) a.innerHTML = o; else {
          var l = s.sources[0].src, r = l.substring(l.lastIndexOf("/") + 1);
          if (s.sources.length > 0) for (j = 0; j < s.sources.length; j++) s.sources[j].default && (r = (l = s.sources[j].src).substring(l.lastIndexOf("/") + 1));
          r = r.replace(/(\.[^/.]+)+$/, "");
          a.innerHTML = r
        }
      }
      i.appendChild(a);
      if (s.duration) {
        var d = vjs_El("span");
        d.innerHTML = s.duration;
        i.appendChild(d)
      }
      var v = !1;
      i.onclick = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        c(e)
      };
      i.ontouchstart = function (e) {
        v = !1
      };
      i.ontouchmove = function (e) {
        v = !0
      };
      i.ontouchend = function (e) {
        if (!0 !== v) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          c(e)
        }
      };

      function c(s) {
        if (!e.adPlaying) {
          var t = s.target.getAttribute("data-id");
          e.playlist.currentItem(parseInt(t, 10));
          if (e.paused()) {
            var i = e.play();
            void 0 !== i && "function" == typeof i.then && i.then(null, function (e) {
            })
          }
        }
      }

      return i
    }

    function We() {
      if (!(e.playlist.list().length < 2)) {
        e.on("error", function () {
          e.playlist.next(!0)
        });
        if (!0 !== v.playlist) {
          v.playlist = !0;
          if (v.playlistNavigation) {
            var s = vjs_El("div", "vjs-playlist-nav vjs-nav-prev", '<div class="vjs-prev vjs-disabled"></div>'),
              i = vjs_El("div", "vjs-playlist-nav vjs-nav-next", '<div class="vjs-next"></div>');
            p.appendChild(s);
            p.appendChild(i);
            i.onclick = function (s) {
              e.adPlaying || s.target.className.indexOf("disabled") < 0 && e.playlist.next()
            };
            s.onclick = function (s) {
              e.adPlaying || s.target.className.indexOf("disabled") < 0 && e.playlist.previous()
            }
          }
          if (v.playlistUI) {
            var n = t.createEl("div", {className: "vjs-playlist-button"}, {title: "Playlist"});
            p.appendChild(n);
            n.onclick = function (e) {
              t.addClass(a, "vjs-vplaylist-show");
              v.playlistFirst && t.addClass(a, "vjs-vplaylist-first")
            };
            var a = vjs_El("div", "vjs-vplaylist vjs-vplaylist-show"),
              o = vjs_El("div", "vjs-head", "<span>PLAYLIST</span>");
            a.style.visibility = "hidden";
            var l = vjs_El("div", "vjs-back", "<i></i>");
            o.appendChild(l);
            a.appendChild(o);
            p.appendChild(a);
            var r = vjs_El("div", "vjs-vlist");
            a.appendChild(r);
            l.onclick = function (e) {
              t.removeClass(a, "vjs-vplaylist-show")
            };
            var d = e.playlist.list();
            for (ee = 0; ee < d.length; ee++) {
              var c = De(d[ee], ee);
              r.appendChild(c)
            }
            var u = vjs_El("div", "vjs-last");
            r.appendChild(u);
            if (!0 !== v.playlistShow) {
              a.className = "vjs-vplaylist";
              setTimeout(function () {
                a.style.visibility = "visible"
              }, 500)
            } else a.style.visibility = "visible"
          }
        }
        e.on("playlist_newitem", function (s, i) {
          var n = e.playlist.currentIndex();
          if (v.playlistUI) for (var a = vjs_mfind(p, ".vjs-vlist .vjs-item"), o = 0; o < a.length; o++) t.removeClass(a[o], "vjs-active-item");
          e.on("play", function () {
            if (v.playlistUI) {
              for (var s = vjs_mfind(p, ".vjs-vlist .vjs-item"), i = 0; i < s.length; i++) {
                t.removeClass(s[i], "vjs-active-item");
                parseInt(s[i].getAttribute("data-id")) === n && t.addClass(s[i], "vjs-active-item")
              }
              if (v.playlistAutoHide) {
                var a = vjs_find(p, ".vjs-vplaylist");
                t.removeClass(a, "vjs-vplaylist-show")
              }
            }
            if (v.playlistNavigation) {
              var o = vjs_find(p, ".vjs-nav-prev"), l = vjs_find(p, ".vjs-nav-next"), r = vjs_find(o, ".vjs-prev"),
                d = vjs_find(l, ".vjs-next");
              0 === e.playlist.currentIndex() ? t.addClass(r, "vjs-disabled") : t.removeClass(r, "vjs-disabled");
              e.playlist.currentIndex() === e.playlist.lastIndex() ? t.addClass(d, "vjs-disabled") : t.removeClass(d, "vjs-disabled")
            }
          });
          try {
            if (e.isInPictureInPicture()) {
              e.exitPictureInPicture();
              document.exitPictureInPicture();
              e.isInPictureInPicture(!1);
              var l = !1;
              e.on("play", function () {
                if (!0 !== l) {
                  l = !0;
                  e.requestPictureInPicture()
                }
              })
            }
          } catch (e) {
          }
        })
      }
    }

    function Oe() {
      var s = vjs_find(p, ".vjs-mouse-display");
      e.sprite = !1;
      var i = vjs_find(p, ".vjs-progress-slide");
      i && i.parentNode.removeChild(i);
      var n = vjs_find(p, ".vjs-thumb-poster");
      n && p.removeChild(n);
      if (0 !== e.duration() && e.duration() !== 1 / 0 && !0 !== v.is_audio && v.slideImage && !0 !== isMobile() && s) {
        if ("" === v.slideImage) return;
        if (v.currentSlide === v.slideImage) return;
        v.currentSlide = v.slideImage;
        var a = vjs_find(p, ".vjs-mouse-display"), o = vjs_find(p, ".vjs-progress-holder");
        if (e.shadowSlide) {
          var l = vjs_El("div", "vjs-thumb-poster"), r = vjs_El("canvas");
          l.appendChild(r);
          p.insertBefore(l, vjs_find(p, ".vjs-poster"))
        }
        var d = vjs_find(p, ".vjs-play-progress"), j = vjs_find(d, ".vjs-time-tooltip");
        t.addClass(j, "vjs-abs-hidden");
        t.addClass(a, "vjs-abs-hidden");
        e.sprite = !0;
        c = vjs_El("div", "vjs-progress-slide");
        u = vjs_El("div", "vjs-thumb");
        h = vjs_El("div", "vjs-thumb-duration");
        f = vjs_El("img");
        if ("horizontal" === v.slideType) {
          f.style.width = "auto";
          f.style.height = v.slideHeight + "px"
        } else {
          f.style.height = "auto";
          f.style.width = v.slideWidth + "px"
        }
        u.appendChild(f);
        u.appendChild(h);
        c.appendChild(u);
        u.style.left = "-" + parseInt(v.slideWidth / 2, 10) + "px";
        vjs_find(p, ".vjs-progress-holder").appendChild(c);
        c.style.left = "-1000px";
        t.addClass(j, "vjs-abs-hidden");
        t.addClass(a, "vjs-abs-hidden");
        var m = 0, g = 0, b = function (s) {
          var i = vjs_find(p, ".vjs-mouse-display"), n = vjs_find(p, ".vjs-progress-holder").offsetWidth,
            a = parseFloat(i.style.left), o = Number(a) / Number(n), d = vjs_find(i, ".vjs-time-tooltip"), j = "";
          d && (j = d.innerHTML);
          var b = parseInt(o * y, 10);
          u.style.width = v.slideWidth + "px";
          u.style.height = v.slideHeight + "px";
          if ("horizontal" === v.slideType) {
            var _ = b * v.slideWidth;
            f.style.left = "-" + _ + "px";
            m = _;
            g = 0
          } else {
            var C = b * v.slideHeight;
            f.style.top = "-" + C + "px";
            m = 0;
            g = C
          }
          "" !== j && (h.innerHTML = j);
          var x = vjs_find(p, ".vjs-progress-holder");
          a = Number(i.style.left.replace(/px$/, ""));
          var k = v.slideWidth / 2, w = x.offsetWidth - v.slideWidth / 2;
          a > w && (a = w);
          a < k && (a = k);
          c.style.left = parseInt(a, 10) + "px";
          if (videojs.holderdown && e.shadowSlide) {
            var T = r.getContext("2d");
            r.width = p.offsetWidth;
            r.height = p.offsetHeight;
            l.style.width = p.offsetWidth + "px";
            l.style.height = p.offsetHeight + "px";
            T.drawImage(f, m, g, v.slideWidth, v.slideHeight, 0, 0, r.width, r.height)
          }
          t.addClass(u, "vjs-thumb-show")
        };
        o.onmousedown = function (s) {
          if (e.shadowSlide) {
            var t = r.getContext("2d");
            r.width = p.offsetWidth;
            r.height = p.offsetHeight;
            l.style.width = p.offsetWidth + "px";
            l.style.height = p.offsetHeight + "px";
            t.drawImage(f, m, g, v.slideWidth, v.slideHeight, 0, 0, r.width, r.height)
          }
        };
        o.onmousemove = function (e) {
          vjs_find(p, ".vjs-tech-chromecast") || c && "" !== f.src && b(e)
        };
        o.onmouseout = function (s) {
          if (!videojs.holderdown && !vjs_find(p, ".vjs-tech-chromecast") && c) {
            t.removeClass(u, "vjs-thumb-show");
            c.style.left = "-1000px";
            if (e.shadowSlide) {
              r.width = 0;
              r.height = 0;
              l.removeAttribute("style")
            }
          }
        };
        var _ = new Image;
        f.src = v.slideImage;
        _.src = v.slideImage;
        _.onload = function () {
          var e = this.width, s = this.height;
          y = e / v.slideWidth;
          "horizontal" !== v.slideType && (y = s / v.slideHeight);
          t.removeClass(c, "vjs-hidden")
        }
      }
    }

    function Re() {
      if (!vjs_find(p, ".vjs-extend-quality")) {
        var s = e.localize("Quality") + '<span class="quality-label"></span>',
          t = vjs_El("li", "vjs-settings-item vjs-extend-quality vjs-menu-forward vjs-hidden", s);
        vjs_find(p, ".vjs-settings-list").appendChild(t);
        var i = vjs_El("div", "vjs-submenu vjs-menu-quality vjs-hidden", '<ul class="vjs-menu-content"><li class="vjs-settings-back">' + e.localize("Quality") + "</li></ul>");
        vjs_find(p, ".vjs-settings-div").appendChild(i)
      }
    }

    function Ue(e) {
      try {
        e.preventDefault();
        e.stopPropagation()
      } catch (e) {
      }
      M.style.left = M.offsetWidth / 2 - p.offsetWidth / 2 + "px";
      M.style.top = M.offsetHeight / 2 - p.offsetHeight / 2 + "px"
    }

    function Fe() {
      Ye();
      b = 1;
      t.removeClass(H, "vjs-hidden");
      try {
        vjs_find(p, ".vjs-zoom-level").style.height = "0"
      } catch (e) {
      }
      Xe(M, 1);
      M.style.top = 0;
      M.style.left = 0;
      ke(100);
      var e = vjs_find(p, ".vjs-zoom-parent");
      !0 !== t.hasClass(e, "vjs-hidden") && t.addClass(e, "vjs-hidden");
      videojs.options.blockKeys = !1;
      return !1
    }

    function Ye() {
      var e = (b - 1) / 4 * 100, s = vjs_find(p, ".zoom-thumb");
      s && (s.style.height = e + "%")
    }

    function Ke(e, s) {
      if (localStorage) try {
        localStorage[e] = s
      } catch (e) {
      }
    }

    function Xe(e, s) {
      Ye();
      var i = "scale(" + s + ")";
      e.style.transform = i;
      e.style.webkitTransform = i;
      e.style.msTransform = i;
      t.removeClass(vjs_find(p, ".vjs-poster"), "vjs-hidden")
    }

    function Qe(e) {
      var s = "text";
      e && (s = "none");
      document.body.style.MozUserSelect = s;
      document.body.style.webkitUserSelect = s;
      if (s) {
        document.body.focus();
        document.onselectstart = function () {
          return !1
        }
      } else document.onselectstart = function () {
        return !0
      }
    }
  }
}

for (var _0x9f9c = ["length", "dg13", "", "join", "reverse", "split", "indexOf", "toLowerCase", "hostname", "location", "dispose", "nuevo"], j = 0; j < doms[_0x9f9c[0]]; j++) {
  var dom = doms[j][_0x9f9c[1]]();
  dom = dom[_0x9f9c[5]](_0x9f9c[2])[_0x9f9c[4]]()[_0x9f9c[3]](_0x9f9c[2]);
  if (window[_0x9f9c[9]][_0x9f9c[8]][_0x9f9c[7]]()[_0x9f9c[6]](dom) > -1) {
    videojs[_0x9f9c[10]] = !0;
    videojs[_0x9f9c[11]] = !0;
    break
  }
}
videojs.registerPlugin("nuevo", Nuevo);
export default Nuevo;
