import videojs from "video.js";

var defaults = {
  video: !1,
  color1: "#ffcc00",
  color2: "#ff0000",
  capsColor: "#fff",
  caps: !1,
  bottom: 0,
  width: 50,
  height: 50,
  f_play: !1
};
const registerPlugin = videojs.registerPlugin || videojs.plugin, onPlayerReady = (e, t) => {
  var i = videojs.browser.IS_IOS, o = videojs.browser.IS_SAFARI,
    n = "ontouchstart" in window || navigator.msMaxTouchPoints || navigator.maxTouchPoints, r = t;
  if (function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    return !!window.AudioContext
  }() && !0 !== i && !0 !== o && !1 !== n) {
    var a, l, s, c, d, f, u, h, w = !0, v = new WeakMap, m = 50, g = 0;
    t.height > 0 && t.height <= 100 && (m = t.height);
    t.bottom > 0 && (g = t.bottom + "%");
    var p = ".vjs-visualizer{position:absolute;left:0;padding:0 10px;bottom:" + g + ";width:100%;height:" + m + "%;pointer-events:none;}",
      y = document.head || document.getElementsByTagName("head")[0], A = document.createElement("style");
    A.type = "text/css";
    A.appendChild(document.createTextNode(p));
    y.appendChild(A);
    (s = document.createElement("canvas")).className = "vjs-visualizer";
    s.id = "visualizer";
    e.el().insertBefore(s, e.controlBar.el_);
    e.on("loadeddata", function () {
      a = !1;
      var t = e.currentType();
      a = t.indexOf("audio") > -1;
      r.f_play = !1;
      r.video && (a = !0)
    });

    function R() {
      var t = e.$(".vjs-tech");
      try {
        null == l && (l = new AudioContext);
        if (v.has(t)) u = v.get(t); else {
          u = l.createMediaElementSource(t);
          v.set(t, u)
        }
        h = l.createAnalyser();
        s.width = s.offsetWidth;
        s.height = e.el().offsetHeight;
        f = s.getContext("2d");
        u.connect(h);
        h.connect(l.destination)
      } catch (e) {
        console.log(e)
      }
    }

    e.on("playing", function () {
      if (!r.f_play) {
        void 0 !== e.currentSource().av && (w = !1);
        var t = e.el().querySelector(".vjs-background-bar");
        r.f_play = !0;
        if (a && w && t) {
          R();

          function i(e, t) {
            e = e.replace("#", "");
            var i = parseInt(3 == e.length ? e.slice(0, 1).repeat(2) : e.slice(0, 2), 16),
              o = parseInt(3 == e.length ? e.slice(1, 2).repeat(2) : e.slice(2, 4), 16),
              n = parseInt(3 == e.length ? e.slice(2, 3).repeat(2) : e.slice(4, 6), 16);
            return t ? "rgba(" + i + ", " + o + ", " + n + ", " + t + ")" : "rgb(" + i + ", " + o + ", " + n + ")"
          }

          r.color1.indexOf("#") < 0 && (r.color1 = "#" + r.color1);
          r.color2.indexOf("#") < 0 && (r.color2 = "#" + r.color2);
          var o = "#ffcc00", n = "#ff0000", l = "#fff", u = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
          u.test(r.capsColor) && (l = r.capsColor);
          u.test(r.color1) && (o = r.color1);
          u.test(r.color2) && (n = r.color2);
          var v = i(o), m = i(n), g = i(o, .2), p = new Array;

          function y() {
            if (a) {
              if ("VIDEO" == e.$(".vjs-tech").nodeName) {
                var t = e.el().querySelector(".vjs-background-bar");
                t && (t.style.height = "10%")
              }
              h.fftSize = 256;
              c = h.frequencyBinCount;
              s.width = e.el().offsetWidth - 20;
              var i = s.width / c * 1.2;
              i < 6 && (i = 6);
              var o, n = 1;
              s.width < 500 && (n = 2);
              window.RequestAnimationFrame = window.requestAnimationFrame(y) || window.msRequestAnimationFrame(y) || window.mozRequestAnimationFrame(y) || window.webkitRequestAnimationFrame(y);
              var u = 0;
              d = new Uint8Array(c);
              h.getByteFrequencyData(d);
              f.clearRect(0, 0, s.width, s.height);
              for (var w = 0; w < c; w += n) {
                w = parseInt(w);
                o = d[w];
                if (u + i < s.width) {
                  var A = f.createLinearGradient(0, 0, 0, .5 * s.height);
                  A.addColorStop(1, v);
                  A.addColorStop(.5, m);
                  A.addColorStop(0, m);
                  var R = s.height / 1.5 - o, b = s.height / 1.5;
                  f.fillStyle = A;
                  f.fillRect(u, R, i, o);
                  if (r.caps) if (p[u]) {
                    f.fillStyle = l;
                    if (R < p[u]) {
                      p[u] = R;
                      R != b && f.fillRect(u, R - 6, i, 3)
                    } else {
                      p[u] = p[u] + 1;
                      p[u] < b && f.fillRect(u, p[u] - 6, i, 3)
                    }
                  } else p[u] = R;
                  f.fillStyle = g;
                  f.fillRect(u, s.height / 1.5, i, o / 2);
                  u += i + 4
                }
              }
            } else try {
              f.clearRect(0, 0, s.width, s.height)
            } catch (e) {
            }
          }

          window.RequestAnimationFrame = window.requestAnimationFrame(y) || window.msRequestAnimationFrame(y) || window.mozRequestAnimationFrame(y) || window.webkitRequestAnimationFrame(y)
        }
      }
    })
  }
}, visualizer = function (e) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, e))
  })
};
registerPlugin("visualizer", visualizer);
visualizer.VERSION = "1.0";
export default visualizer;
