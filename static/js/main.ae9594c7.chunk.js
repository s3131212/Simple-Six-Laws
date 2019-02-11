(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},16:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(8),s=a.n(c),r=(a(14),a(3)),i=a(1),o=a(2),u=a(5),h=a(4),m=a(6),d=(a(16),function(){function e(){Object(i.a)(this,e),this.lawData=[];var t=this;fetch("laws/map.json",{method:"get"}).then(function(e){return e.json()}).then(function(e){for(var a in e.Map)fetch("laws/"+e.Map[a],{method:"get"}).then(function(e){return e.json()}).then(function(e){t.lawData.push(e)}).catch(function(e){});t.updateTime=e.updateTime}).catch(function(e){})}return Object(o.a)(e,[{key:"getLaw",value:function(e,t){return{name:this.lawData[e].name,clauseNo:this.lawData[e].content[t].clauseNo,content:this.lawData[e].content[t].clauseContent,nextStatus:this.lawData[e].content.length==t+1?0:1,prevStatus:0==t?0:1}}},{key:"searchLaw",value:function(e){var t=e.replace(/[0-9-]/g,"").replace(/\s/g,""),a=-1,n=-1;for(var l in this.lawData)if(this.lawData[l].name===t||-1!==this.lawData[l].alias.indexOf(t)){a=l;break}if(-1==a){var c=0,s=-1,r=0;for(var l in this.lawData)(this.LCS(this.lawData[l].name,t).length/t.length).toFixed(2)>r?(r=(this.LCS(this.lawData[l].name,t).length/t.length).toFixed(2),s=l,c=1):(this.LCS(this.lawData[l].name,t).length/t.length).toFixed(2)==r&&c++;1==c&&(a=s)}return-1!=a&&(n=this.searchClause(e,a)),{lawIndex:a,clauseIndex:n,lawName:-1!=a?this.lawData[a].name:-1}}},{key:"searchClause",value:function(e,t){var a=-1;a=-1;if(null==e.match(/(\d+(?:(?: |-)\d+)*)/g,""))return-2;var n=e.match(/(\d+(?:(?: |-)\d+)*)/g,"")[0].replace(" ","-");for(var l in this.lawData[t].content)if(this.lawData[t].content[l].clauseNo==n){a=l;break}return a}},{key:"getLastUpdate",value:function(){return this.updateTime}},{key:"LCS",value:function(e,t){var a,n,l=e.length,c=t.length,s=[];for(a=0;a<=l;a++)s.push([0]);for(n=0;n<c;n++)s[0].push(0);for(a=0;a<l;a++)for(n=0;n<c;n++)s[a+1][n+1]=e[a]===t[n]?s[a][n]+1:Math.max(s[a+1][n],s[a][n+1]);return function a(n,l){return n*l===0?"":e[n-1]===t[l-1]?a(n-1,l-1)+e[n-1]:s[n][l-1]>s[n-1][l]?a(n,l-1):a(n-1,l)}(l,c)}}]),e}()),p=-1,f=-2,v=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"ts heading centered slate attached"},l.a.createElement("span",{className:"header lawName"},this.props.name),l.a.createElement("span",{className:"description lawContent"},this.props.content))}}]),t}(n.Component),w=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.props.show?l.a.createElement("div",{className:"ts modals dimmer active"},l.a.createElement("dialog",{id:"closableModal",className:"ts large modal",open:"open"},l.a.createElement("div",{className:"content"},l.a.createElement("h1",null,"\u7c21\u6613\u5c0f\u516d\u6cd5"),l.a.createElement("p",null,"\u9019\u662f\u4e00\u500b\u5f88\u7c21\u55ae\u7684\u6cd5\u689d\u67e5\u8a62\u5de5\u5177\uff0c\u4e0d\u540c\u65bc\u5e02\u9762\u4e0a\u5176\u4ed6\u5c0f\u516d\u6cd5\u7684 App\uff0c\u90fd\u662f\u4e00\u8def\u9ede\u4e0b\u53bb\uff0c\u6b64\u5c08\u6848\u5e0c\u671b\u80fd\u5920\u7528\u7c21\u55ae\u6253\u5e7e\u500b\u5b57\u5c31\u80fd\u5920\u5feb\u901f\u627e\u5230\u76ee\u6a19\u6cd5\u689d\uff0c\u8a66\u5716\u7c21\u5316\u6574\u500b\u641c\u5c0b\u7a0b\u5e8f\uff0c\u53d6\u4ee3\u539a\u91cd\u7684\u7d19\u672c\u5c0f\u516d\u6cd5\u548c\u96e3\u7528\u7684 App\u3002"),l.a.createElement("h3",null,"\u4f7f\u7528\u65b9\u5f0f"),l.a.createElement("p",null,"\u8209\u4f8b\u4f86\u8aaa\uff0c",l.a.createElement("code",null,"\u6c11\u6cd5\u7b2c 979-1 \u689d"),"\u53ef\u4ee5\u7528\u4ee5\u4e0b\u65b9\u5f0f\u67e5\u8a62\uff08\u4e2d\u6587\u8207\u6578\u5b57\u4e4b\u9593\u7684\u7a7a\u683c\u53ef\u7701\u7565\uff09\uff1a"),l.a.createElement("ul",null,l.a.createElement("li",null,"\u6c11\u6cd5 979-1"),l.a.createElement("li",null,"\u6c11 979-1"),l.a.createElement("li",null,"\u6c11 979 1"),l.a.createElement("li",null,"\u3107\u3108 979 1"),l.a.createElement("li",null,"\u3107 979 1")),l.a.createElement("p",null,"\u5176\u4e2d ",l.a.createElement("code",null,"\u3107\u3108")," \u662f\u6c11\uff08\u3107\x1f\u3127\u3123\u02ca\uff09\u6cd5\uff08\u3108\u311a\u02c7\uff09\u7684\u6ce8\u97f3\u9996\u5b57\uff0c\u82e5\u540c\u500b\u6ce8\u97f3\u6703\u5c0d\u61c9\u591a\u500b\u6cd5\u5178\uff08\u5982\u5211\u6cd5\u8207\u61b2\u6cd5\u90fd\u662f \x1f\u3112\u3108\uff09\uff0c\u5247\u6703\u5339\u914d\u5230\u7b2c\u4e00\u689d\u3002"),l.a.createElement("p",null,"\u652f\u63f4\u5e38\u898b\u6cd5\u5178\u7c21\u7a31\uff08\u5982 ",l.a.createElement("code",null,"\u4e2d\u83ef\u6c11\u570b\u5211\u6cd5 = \u5211\u6cd5"),"\u3001",l.a.createElement("code",null,"\u5211\u4e8b\u8a34\u8a1f\u6cd5 = \u5211\u8a34"),"\u3001",l.a.createElement("code",null,"\u793e\u6703\u79e9\u5e8f\u7dad\u8b77\u6cd5 = \u793e\u7dad\u6cd5"),"\uff09\u3002"),l.a.createElement("p",null,"\u82e5\u5168\u540d\u3001\u6ce8\u97f3\u3001\u7c21\u7a31\u7686\u6c92\u6709\u627e\u5230\u5339\u914d\u7684\u6cd5\u5178\uff0c\u5247\u6703\u53bb\u5c0b\u627e\u540d\u7a31\u6700\u63a5\u8fd1\u7684\u6cd5\u689d\uff0c\u4f8b\u5982 ",l.a.createElement("code",null,"\u6027\u5e73\u6559")," \u6703\u627e\u5230\u6700\u63a5\u8fd1\u7684 ",l.a.createElement("code",null,"\u6027\u5225\u5e73\u7b49\u6559\u80b2\u6cd5"),"\u3002"),l.a.createElement("p",null,"\u6cd5\u689d\u66f4\u65b0\u6642\u9593\uff1a",l.a.createElement("code",null,this.props.updateTime)),l.a.createElement("h3",null,"\u96e2\u7dda\u4f7f\u7528"),l.a.createElement("p",null,'\u82e5\u60a8\u5e0c\u671b\u80fd\u96e2\u7dda\u4f7f\u7528\u6b64\u7a0b\u5f0f\uff0c\u53ef\u4ee5\u5c07\u6b64\u7db2\u9801\u52a0\u5165\u4e3b\u756b\u9762\uff0c\u5373\u53ef\u96e2\u7dda\u4f7f\u7528\u3002\u8a73\u60c5\u53ef\u4ee5\u641c\u5c0b "Add website to home screen" \u6216\u662f\u300c\u52a0\u5165\u4e3b\u756b\u9762 iPhone / Android\u300d\u3002'),l.a.createElement("h3",null,"\u95dc\u65bc\u6b64\u7a0b\u5f0f"),l.a.createElement("p",null,"\u6b64\u7a0b\u5f0f\u7531 ",l.a.createElement("a",{href:"https://allenchou.cc"},"Allen Chou")," \u88fd\u4f5c\uff0c\u4ee5 MIT License \u91cb\u51fa\u3002",l.a.createElement("br",null),"\u7db2\u5740\uff1a",l.a.createElement("a",{href:"https://laws.allenchou.cc"},"https://laws.allenchou.cc"),l.a.createElement("br",null),"GitHub: ",l.a.createElement("a",{href:"https://github.com/s3131212/Simple-Six-Laws"},"s3131212/Simple-Six-Laws"),l.a.createElement("br",null),l.a.createElement("i",null,"Pull Requests Welcome!")),l.a.createElement("h3",null,"\u8cc7\u6599\u4f86\u6e90"),l.a.createElement("p",null,"\u672c\u7a0b\u5f0f\u6240\u4f7f\u7528\u7684\u8cc7\u6e90\u4f86\u81ea\u65bc\u4e0b\u8ff0\u7db2\u7ad9\uff1a"),l.a.createElement("ul",null,l.a.createElement("li",null,"\u6cd5\u689d JSON \u6a94\uff1a",l.a.createElement("a",{href:"https://github.com/kong0107/mojLawSplitJSON"},"kong0107/mojLawSplitJSON")),l.a.createElement("li",null,"\u6f22\u5b57\u6ce8\u97f3\u5c0d\u7167\u8868\uff1a",l.a.createElement("a",{href:"https://github.com/openvanilla/McBopomofo/blob/master/Source/Data/BPMFBase.txt"},"\u5c0f\u9ea5\u6ce8\u97f3\u8f38\u5165\u6cd5")),l.a.createElement("li",null,"Icon\uff1a",l.a.createElement("a",{href:"https://fontawesome.com/"},"Font Awesome")),l.a.createElement("li",null,"Tocus UI\uff1a",l.a.createElement("a",{href:"https://tocas-ui.com/"},"https://tocas-ui.com/")),l.a.createElement("li",null,"React\uff1a",l.a.createElement("a",{href:"https://reactjs.org/"},"https://reactjs.org/")))),l.a.createElement("div",{className:"actions"},l.a.createElement("button",{className:"ts positive button",onClick:function(){return e.props.onClose()}},"\u95dc\u9589")))):l.a.createElement("div",null)}}]),t}(n.Component),E=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.props.available?l.a.createElement("div",{className:"ts inverted button",onClick:function(){return e.props.setClause(e.props.lawIndex,parseInt(e.props.clauseIndex)-1)}},"\u4e0a\u4e00\u689d"):l.a.createElement("div",{className:"ts inverted button disabled"},"\u4e0a\u4e00\u689d")}}]),t}(n.Component),b=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.props.available?l.a.createElement("div",{className:"ts negative button",onClick:function(){return e.props.setClause(e.props.lawIndex,parseInt(e.props.clauseIndex)+1)}},"\u4e0b\u4e00\u689d"):l.a.createElement("div",{className:"ts negative button disabled"},"\u4e0b\u4e00\u689d")}}]),t}(n.Component),g=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={value:"",name:"",content:"",clauseNo:"",clauseIndex:f,lawIndex:p,prevStatus:0,nextStatus:0,helpActive:!1},a.law=new d,a.handleChange=a.handleChange.bind(Object(r.a)(Object(r.a)(a))),a.setClause=a.setClause.bind(Object(r.a)(Object(r.a)(a))),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){this.setState({value:e.target.value});var t=this.law.searchLaw(e.target.value);this.setClause(t.lawIndex,t.clauseIndex,t.lawName)}},{key:"setClause",value:function(e,t,a){if(e!=p)if(-1!=t)if(t!=f){var n=this.law.getLaw(e,t);this.setState({lawIndex:e,clauseIndex:t,name:n.name+" \u7b2c "+n.clauseNo+" \u689d",nextStatus:n.nextStatus,prevStatus:n.prevStatus,content:n.content.split("\\n").map(function(e,t){return l.a.createElement("div",{key:t},e)})})}else this.setState({name:"",content:"\u6b63\u5728\u641c\u5c0b"+a,prevStatus:0,nextStatus:0});else this.setState({name:"",content:a+"\u6c92\u6709\u6b64\u689d",prevStatus:0,nextStatus:0});else this.setState({name:"",content:"",prevStatus:0,nextStatus:0})}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"ts container"},l.a.createElement(w,{show:this.state.helpActive,onClose:function(){return e.setState({helpActive:!1})},updateTime:this.law.getLastUpdate()}),l.a.createElement("div",{className:"ts centered secondary"},l.a.createElement("form",{className:"ts form",onSubmit:function(e){e.preventDefault()}},l.a.createElement("div",{className:"field"},l.a.createElement("input",{type:"text",placeholder:"\u6cd5\u5f8b\u540d\u7a31",onChange:this.handleChange,value:this.state.value})))),l.a.createElement("div",{className:"ts hidden divider"}),l.a.createElement(v,{name:this.state.name,content:this.state.content}),l.a.createElement("div",{className:"ts fluid bottom attached buttons",id:"navButton"},l.a.createElement(E,{setClause:this.setClause,lawIndex:this.state.lawIndex,clauseIndex:this.state.clauseIndex,available:this.state.prevStatus}),l.a.createElement("div",{className:"ts button",onClick:function(){return e.setState({helpActive:!0})}},"\u5e6b\u52a9"),l.a.createElement(b,{setClause:this.setClause,lawIndex:this.state.lawIndex,clauseIndex:this.state.clauseIndex,available:this.state.nextStatus})))}}]),t}(n.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function j(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(l.a.createElement(g,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");S?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):j(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):j(t,e)})}}()},9:function(e,t,a){e.exports=a(18)}},[[9,2,1]]]);
//# sourceMappingURL=main.ae9594c7.chunk.js.map