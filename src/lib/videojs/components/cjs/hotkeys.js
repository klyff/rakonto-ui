"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var videojs=_interopDefault(require("video.js")),onPlayerReady=(e,t)=>{var o={volumeStep:.1,seekStep:5,enableMute:!0,enableVolumeScroll:!0,enableFullscreen:!0,enableNumbers:!0,enableJogStyle:!1,alwaysCaptureHotkeys:!0,enableModifiersForNumbers:!0,playPauseKey:S,rewindKey:D,forwardKey:T,volumeUpKey:q,volumeDownKey:F,muteKey:M,fullscreenKey:x,customKeys:{}},n=e.el(),r=document;videojs.options.blockKeys=!1;var l=1,a=2,i=3,u=4,c=5,s=6,v=7,p=videojs.mergeOptions||videojs.util.mergeOptions,y=(t=p(o,t||{})).volumeStep,f=t.seekStep,m=(t.enableMute,t.enableVolumeScroll),b=t.enableFullscreen,d=t.enableNumbers,w=t.enableJogStyle,h=t.alwaysCaptureHotkeys,k=t.enableModifiersForNumbers;n.hasAttribute("tabIndex")||n.setAttribute("tabIndex","-1");n.style.outline="none";!h&&e.autoplay()||e.one("play",function(){n.focus()});e.on("userinactive",function(){var t=function(){clearTimeout(o)},o=setTimeout(function(){e.off("useractive",t);r.activeElement.parentElement==n.querySelector(".vjs-control-bar")&&n.focus()},10);e.one("useractive",t)});e.on("play",function(){var e=n.querySelector(".iframeblocker");if(e&&""===e.style.display){e.style.display="block";e.style.bottom="39px"}});var g=function(o){var p,m=o.which;o.preventDefault;if(e.controls()){var g=r.activeElement;if(h||g==n||g==n.querySelector(".vjs-tech")||g==n.querySelector(".vjs-control-bar")||g==n.querySelector(".iframeblocker")){j(o,e);switch(j(o,e)){case l:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);e.paused()?e.play():e.pause();break;case a:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);if(videojs.options.blockKeys)break;p=e.currentTime()-f;e.currentTime()<=f&&(p=0);e.currentTime(p);break;case i:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);if(videojs.options.blockKeys)break;console.log(e.currentTime()+"::"+f);e.currentTime(e.currentTime()+f);break;case c:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);if(videojs.options.blockKeys)break;if(w){p=e.currentTime()-1;e.currentTime()<=1&&(p=0);e.currentTime(p)}else e.volume(e.volume()-y);break;case u:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);if(videojs.options.blockKeys)break;w?e.currentTime(e.currentTime()+1):e.volume(e.volume()+y);break;case s:o.preventDefault();o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);o.stopPropagation?o.stopPropagation():window.event&&(window.event.cancelBubble=!0);e.muted(!e.muted());break;case v:b&&(e.isFullscreen()?e.exitFullscreen():e.requestFullscreen());break;default:if((m>47&&m<59||m>95&&m<106)&&(k||!(o.metaKey||o.ctrlKey||o.altKey))&&d){var K=48;m>95&&(K=96);var P=m-K;o.preventDefault();e.currentTime(e.duration()*P*.1)}for(var S in t.customKeys){var D=t.customKeys[S];if(D&&D.key&&D.handler&&D.key(o)){o.preventDefault();D.handler(e,t)}}}}}},K=function(t){if(e.controls()){var o=t.relatedTarget||t.toElement||r.activeElement;o!=n&&o!=n.querySelector(".vjs-tech")&&o!=n.querySelector(".iframeblocker")||b&&(e.isFullscreen()?e.exitFullscreen():e.requestFullscreen())}},P=function(t){if(e.controls()){var o=t.relatedTarget||t.toElement||r.activeElement;if((h||o==n||o==n.querySelector(".vjs-tech")||o==n.querySelector(".iframeblocker")||o==n.querySelector(".vjs-control-bar"))&&m){t=window.event||t;var l=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));t.preventDefault();1==l?e.volume(e.volume()+y):-1==l&&e.volume(e.volume()-y)}}},j=function(e,o){return t.playPauseKey(e,o)?l:t.rewindKey(e,o)?a:t.forwardKey(e,o)?i:t.volumeUpKey(e,o)?u:t.volumeDownKey(e,o)?c:t.muteKey(e,o)?s:t.fullscreenKey(e,o)?v:void 0};function S(e){return 32===e.which||179===e.which}function D(e){return 37===e.which||177===e.which}function T(e){return 39===e.which||176===e.which}function q(e){return 38===e.which}function F(e){return 40===e.which}function M(e){return 77===e.which}function x(e){return 70===e.which}document.onkeydown=g;e.on("keydown",g);e.on("dblclick",K);e.on("mousewheel",P);e.on("DOMMouseScroll",P);return this},registerPlugin=videojs.registerPlugin||videojs.plugin,hotkeys=function(e){this.ready(()=>{onPlayerReady(this,e)})};videojs.registerPlugin("hotkeys",hotkeys);module.exports=hotkeys;