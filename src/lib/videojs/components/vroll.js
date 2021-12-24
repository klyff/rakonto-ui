import videojs from"video.js";function factory(e,r){var t,l,n,o,i,s=[],a=!1,d=!1,c=!1,f=!1,u=!1,v=!1,p=!1,m=!1,h=!1,g="undefined",y=0,j=e.$(".vjs-tech");videojs.isAd=!1;var C,k,b,T=videojs.dom,N=e.el(),_=.1;function S(e){return"[object Array]"===Object.prototype.toString.call(e)}var I=function(e,r){try{return e.querySelector(r)}catch(e){return!1}},M=function(e,r,t){var l=document.createElement(e);void 0!==r&&""!==r&&(l.className=r);return l};if(!S(r)){var O=r,A=0;if(O.src&&O.href&&"undefined"!==O.offset&&O.src.length>5){A=0;try{A=O.offset.indexOf("%")}catch(e){}A>0&&d||((r=[])[0]=O)}}if(S(r))for(var H=0,L=0;L<r.length;L++){var x=r[L];if(x.src&&"undefined"!==x.offset){x.loaded=!1;H=0;try{H=s[L].offset.indexOf("%")}catch(e){}H>0&&d||s.push(x)}}e.ready(function(){C=I(e.el_,".vjs-control-bar");k=I(e.el_,".vjs-loading-spinner");if(s.length>0){l=M("a","roll-blocker vjs-hidden");o=M("div","vjs-roll-controls vjs-hidden");var r='<div class="roll-btn roll-play-pause roll-paused"></div><div class="roll-countdown">'+e.localize("Advertisement")+'</div><div class="roll-btn roll-fscreen roll-non-fullscreen"></div>';r+='<div class="roll-btn roll-mute roll-non-muted"></div>';o.innerHTML=r;e.el_.appendChild(l);e.el_.appendChild(o);function O(e){var r=e.el().querySelector(".vjs-tech"),t={ended:e.ended(),src:e.currentSrc(),currentTime:e.currentTime(),type:e.currentType(),currentSource:e.currentSource(),playing:!e.paused(),suppressedTracks:A(e)};t.ended&&(t.currentTime=e.duration()+1);r&&(t.style=r.getAttribute("style"));return t}function A(e){var r=e.remoteTextTracks?e.remoteTextTracks():[];r&&S(r.tracks_)&&(r=r.tracks_);S(r)||(r=[]);var t=[];r.forEach(function(e){t.push({track:e,mode:e.mode});e.mode="disabled"});return t}function H(){i.suppressedTracks.forEach(function(e){e.track.mode=e.mode})}function L(){return e.duration()===1/0||"8"===videojs.browser.IOS_VERSION&&0===e.duration()}function x(e,r){var t=e.el().querySelector(".vjs-tech");"style"in i&&t.setAttribute("style",i.style||"");e.one("contentloadedmetadata",H);var l=function(){if(i.ended)videojs.isAd=!1;else if(d)e.play();else{e.currentTime(i.currentTime);e.play()}};t.poster="";e.src(i.currentSource);e.load();H();l()}e.vroll.reset=function(){p=!1;f=!1;T.removeClass(N,"vjs-ad-playing");e.one("playing",function(e){for(var r=0;r<s.length;r++)s[r].loaded=!1})};if(0===parseInt(s[0].offset)&&!0!==m)if(e.offline);else{m=!0;e.isPreroll=!0;var P=e.muted();e.muted(!0);e.$(".vjs-tech").style.opacity="0"}e.on("loadeddata",function(){if(e.isOffline)p=!1;else if(!p){p=!0;if(!(d=L()))var r=e.duration();if(s.length>0&&!0!==u){u=!0;for(var m=0;m<s.length;m++)if(!d){var S=0;try{S=s[m].offset.indexOf("%",0)}catch(e){}if(S>0){var A=parseInt(s[m].offset,10);s[m].offset=100===A?r:r*(A/100)}else s[m].offset=parseInt(s[m].offset,10)}}if(s.length>0){e.on("timeupdate",function(){videojs.dom.hasClass(N,"vjs-has-started")&&!0!==c&&!0!==e.isOffline&&!0!==d&&w(e.currentTime())});function H(){if(c){clearTimeout(b);h=!1}else{w(_+=.5);b=setTimeout(H,500)}}if(d){e.on("pause",function(e){clearTimeout(b);h=!1});e.on("playing",function(r){if(videojs.dom.hasClass(N,"vjs-has-started")&&!0!==a&&s.length>0&&!0!==e.isOffline&&!0!==h){h=!0;b=setTimeout(H,500)}})}function w(r){if(!a&&!c)for(var t=r,d=0;d<s.length;d++){var u=s[d];if(t>=u.offset&&!0!==a&&!0!==s[d].loaded){a=!0;s[d].loaded=!0;g=s[d];f=!0;var v={src:u.src,type:u.type};i=O(e);e.src(v);T.addClass(C,"vjs-abs-hidden");l.className="roll-blocker";void 0!==u.href?l.innerHTML='<a href="'+g.href+'" target="_blank"></a>':l.innerHTML="";o.className="vjs-roll-controls";c=!0;T.addClass(N,"vjs-ad-playing");e.play();if(1!=P){e.muted(!1);T.addClass(Q,"roll-non-muted");T.removeClass(Q,"roll-muted")}e.one("loadeddata",E);try{e._el.removeChild(n)}catch(e){}(y=g.skip>0?parseInt(g.skip,10):0)>0&&$()}}}var E=function(r){e.$(".vjs-tech").style.opacity="1";e.off("loadeddata",E);e.on("timeupdate",V);e.on("ended",B);e.on("error",R);e.on("playing",G)};l.onclick=function(){e.trigger("vroll",{id:g.id,action:"clicked"})};var q=function(){return e.paused()},z=function(){return e.muted()};function D(){try{t.removeChild(n)}catch(e){}try{e.el_.removeChild(n)}catch(e){}var r=g.offset;g.loaded=!0;g=void 0;var d=!1;T.addClass(N,"vjs-has-started");for(var u=0;u<s.length;u++){if(s[u].offset===r&&!0!==s[u].loaded){a=!0;c=!0;s[u].loaded=!0;videojs.isAd=!0;T.addClass(N,"vjs-ad-playing");g=s[u];f=!0;var v={src:g.src,type:g.type};e.src(v);e.load();T.addClass(C,"vjs-abs-hidden");l.className="roll-blocker";void 0!==g.href?l.innerHTML='<a href="'+g.href+'" target="_blank"></a>':l.innerHTML="";o.className="vjs-roll-controls";e.play();e.one("loadeddata",E);try{e._el.removeChild(n)}catch(e){}(y=g.skip>0?parseInt(g.skip,10):0)>0&&$();d=!0}if(d)break}if(!0!==d){e.off("timeupdate",V);e.off("ended",B);e.off("error",R);e.off("playing",G);a=!1;f=!1;c=!1;l.className="roll-blocker vjs-hidden";T.removeClass(C,"vjs-abs-hidden");T.removeClass(C,"vjs-hidden");o.className="vjs-roll-controls vjs-hidden";T.addClass(k,"vjs-abs-hidden");T.addClass(N,"vjs-has-started");j.poster="";x(e,i);e.$(".vjs-tech").style.opacity="1";e.muted(!1);videojs.isAd=!1;T.removeClass(N,"vjs-ad-playing")}}function F(r,t){var l=t-(r=r>0?r:0),i=Math.floor(l/60),s=Math.floor(l%60);s.toString().length<2&&(s="0"+s);if(!isNaN(i)&&!isNaN(s)){I(o,".roll-countdown").innerHTML=e.localize("Advertisement")+"<span>"+i+":"+s+"</span>";if(y>0){var a=Math.ceil(y-r),d="";if(a>0)if(!0!==v){v=!0;d+="<span>"+e.localize("Skip Ad in")+' <i id="time_left">'+a+"</i></span>";n.innerHTML=d}else try{document.getElementById("time_left").innerHTML=a}catch(e){}else if(v&&"roll-skip-button enabled"!==n.className){n.innerHTML="<span>"+e.localize("Skip Now!")+'</span><i class="circle"></i>';n.className="roll-skip-button enabled"}}}}function $(){try{t.removeChild(n)}catch(e){}try{N.removeChild(n)}catch(e){}n=M("div","roll-skip-button");v=!1;e.el_.appendChild(n);n.onclick=function(e){r(e)};function r(r){r.preventDefault();r.stopPropagation();if((" "+n.className+" ").indexOf(" enabled ")>=0){e.trigger("vroll",{id:g.id,action:"skipped"});D()}}}function B(){if(a){e.trigger("vroll",{id:g.id,action:"completed"});D()}}function R(){if(a){e.trigger("vroll",{id:g.id,action:"error"});D();f=!1}}function V(){if(a){if(!q()){var r=e.duration();F(e.currentTime(),r)}}}function G(){if(a&&f){e.trigger("vroll",{id:g.id,action:"start"});f=!1}}var J=I(o,".roll-play-pause");J.onclick=function(e){K(e)};J.ontouchstart=function(e){K(e)};function K(r){r.preventDefault();r.stopImmediatePropagation();if(q()){e.play();T.removeClass(J,"roll-playing");T.addClass(J,"roll-paused");e.trigger("vroll",{id:g.id,action:"resumed"})}else{e.pause();T.removeClass(J,"roll-paused");T.addClass(J,"roll-playing");e.trigger("vroll",{id:g.id,action:"paused"})}}var Q=I(o,".roll-mute");Q.onclick=function(e){U(e)};Q.ontouchstart=function(e){U(e)};e.muted()&&T.addClass(Q,"roll-muted");T.removeClass(Q,"roll-non-muted");function U(r){r.preventDefault();r.stopImmediatePropagation();if(z()){e.muted(!1);T.addClass(Q,"roll-non-muted");T.removeClass(Q,"roll-muted")}else{e.muted(!0);T.addClass(Q,"roll-muted");T.removeClass(Q,"roll-non-muted")}}var W=I(o,".roll-fscreen");W.onclick=function(e){X(e)};W.ontouchstart=function(e){X(e)};function X(r){r.preventDefault();r.stopImmediatePropagation();if(e.isFullscreen())e.exitFullscreen();else{if(videojs.browser.IS_IOS&&c)return;e.requestFullscreen()}}e.on("fullscreenchange",function(){if(e.isFullscreen()){T.addClass(W,"roll-fullscreen");T.removeClass(W,"roll-non-fullscreen")}else{T.addClass(W,"roll-non-fullscreen");T.removeClass(W,"roll-fullscreen")}})}}})}})}var registerPlugin=videojs.registerPlugin||videojs.plugin,plugin=function(e){this.ready(function(){factory(this,e)})};registerPlugin("vroll",plugin);export default plugin;