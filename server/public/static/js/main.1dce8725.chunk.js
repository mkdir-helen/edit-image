(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{232:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(85),i=a.n(r),o=(a(95),a(2)),c=a(3),s=a(5),u=a(4),m=a(6),h=(a(97),a(98),a(234)),d=a(233),p=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).getPhotos=function(){a.props.active&&fetch("/gallery").then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({gallery:e})}).catch(function(e){console.log(e)})},a.handleGetPhoto=function(e){},a.state={gallery:[],loading:!0},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getPhotos(),setInterval(this.getPhotos,1e3),setTimeout(function(){return e.setState({loading:!1})},1500)}},{key:"render",value:function(){var e=this,t=0===this.state.gallery.length,a=this.state.loading;return l.a.createElement("div",null,l.a.createElement("h1",null,"Your gallery"),l.a.createElement("div",{className:"gallery"},t&&!a&&l.a.createElement("h5",null,"You have no images saved yet."),a&&t&&l.a.createElement("h5",null,"Loading..."),this.state.gallery.map(function(t){return l.a.createElement("div",{className:"image",key:t.id,onClick:e.handleGetPhoto},l.a.createElement(d.a,{to:"/photo/".concat(t.id)},l.a.createElement("img",{src:t.url})))})))}}]),t}(n.Component),g=(a(24),a(86)),f=a.n(g),v=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).onSubmit=function(e){e.preventDefault();var t=a.state.title+f.a.v4();console.log(t);var n=new FormData;n.append("image",a.state.image),n.append("title",t),fetch("/upload",{method:"POST",body:n}).then(function(e){return e.json()}).then(function(e){a.setState({allfiles:[e],recentfile:[e[e.length-1]],recenturl:e[e.length-1].url,recentname:e[e.length-1].name,public_id:a.getPublicId(e[e.length-1].url),loading:!0,loaded:!1})})},a.getImage=function(e){a.setState({image:e.target.files[0]})},a.getTitle=function(e){a.setState({title:e.target.value})},a.handleEdit=function(e){e.preventDefault(),a.props.history.push("/edit")},a.handleEditButton=function(e){a.setState({willEdit:!0,loading:!1,loaded:!0})},a.getPublicId=function(e){var t=e.split("/"),a=t[t.length-2]+"/"+t[t.length-1];return a.substring(0,a.length-4)},a.imagePreviewCanvasRef=l.a.createRef(),a.cloudinaryImageRef=l.a.createRef(),a.state={title:"",image:null,allfiles:[],recentfile:[],recenturl:"",recentname:"",public_id:"",CloudBase64:"",crop:{width:30,height:10},imgSrc:"",willEdit:!1,loaded:!1,loading:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t=this,a=this.state.loaded,n=this.state.loading;return!a&&n?e=l.a.createElement("div",null,l.a.createElement("br",null),"Loading image..."):a&&!n&&(e=l.a.createElement("div",null)),l.a.createElement("div",null,l.a.createElement("h1",null,"Home sweet home"),l.a.createElement("h3",null,"Upload an image to start editing!"),l.a.createElement("form",{action:"/upload",method:"post",encType:"multipart/form-data",onSubmit:function(e){return t.onSubmit(e)},className:"uploadForm"},l.a.createElement("div",{className:"filetitle"},l.a.createElement("label",{htmlFor:"title"},"Enter name of image: "),l.a.createElement("br",null),l.a.createElement("input",{type:"text",name:"title",id:"title",onChange:function(e){return t.getTitle(e)}})),l.a.createElement("div",{className:"uploader"},l.a.createElement("input",{type:"file",name:"image",id:"image",onChange:function(e){return t.getImage(e)}})),l.a.createElement("button",{type:"submit"},"Upload Image")),e,l.a.createElement("div",{className:"homeimageWrap"},this.state.willEdit&&l.a.createElement("button",{onClick:this.handleEdit,className:"editbutton"},"Edit Image"),l.a.createElement("img",{src:this.state.recenturl,className:"homeimage",onLoad:this.handleEditButton})))}}]),t}(n.Component),E=a(87),b=a.n(E),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){window.addEventListener("resize",a.handleWindowSizeChange)},a.componentWillUnmount=function(){window.removeEventListener("resize",a.handleWindowSizeChange)},a.handleWindowSizeChange=function(){a.setState({width:window.innerWidth})},a.handleErrors=function(e){if(!e.ok)throw Error(e.statusText);return e},a.state={active:!1,dots:!1,width:window.innerWidth,username:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.active,t=this.state.width<500,a=this.state.width>=500&&this.state.width<650?l.a.createElement("br",null):"";return l.a.createElement("div",{className:"NavDiv"},l.a.createElement("ul",{className:"NavUl"},l.a.createElement("div",{className:"acornlogo"},l.a.createElement("img",{src:b.a,alt:""})),l.a.createElement("div",{className:"dots",onClick:this.props.showMenu}),(this.props.dots||!t)&&l.a.createElement(l.a.Fragment,null,e&&t&&l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",{className:"hr"}),l.a.createElement("li",null,"Welcome, ",this.props.username)),l.a.createElement("hr",{className:"hr"}),l.a.createElement("li",null,l.a.createElement(d.a,{to:"/",onClick:this.props.handleActiveUser},"Home"),l.a.createElement("hr",{className:"hr"})),e?l.a.createElement(l.a.Fragment,null,l.a.createElement("li",null,l.a.createElement(d.a,{to:"/gallery",onClick:this.props.handleActiveUser},"Gallery"),l.a.createElement("hr",{className:"hr"})),l.a.createElement("li",null,l.a.createElement(d.a,{to:"/",onClick:this.props.handleLogOut},"Logout"))):l.a.createElement(l.a.Fragment,null,l.a.createElement("li",null,l.a.createElement(d.a,{to:"/login",onClick:this.props.handleActiveUser},"Login"),l.a.createElement("hr",{className:"hr"})),l.a.createElement("li",null,l.a.createElement(d.a,{to:"/register",onClick:this.props.handleActiveUser},"Register"))))),e&&!t&&l.a.createElement("div",{className:"bigusername"},"Welcome, ",a," ",this.props.username))}}]),t}(n.Component),S=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),fetch("/login",{method:"POST",body:JSON.stringify({username:a.state.username,password:a.state.password}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){console.log(e),e.message?a.props.history.push("/gallery"):a.setState({errorMessage:"Username and password does not match."})}).catch(function(e){console.log(e)})},a.handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.state={username:"",password:"",errorMessage:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=""!==this.state.errorMessage;return l.a.createElement("form",{action:"/login",method:"POST",className:"login-container",onSubmit:this.handleSubmit},l.a.createElement("h1",null,"Log In"),e&&l.a.createElement("h4",null,this.state.errorMessage),l.a.createElement("label",null,"Username: "),l.a.createElement("input",{type:"text",name:"username",onChange:this.handleUsername,value:this.state.username}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("label",null,"Password: "),l.a.createElement("input",{type:"password",name:"password",onChange:this.handlePassword,value:this.state.password}),l.a.createElement("p",null,l.a.createElement("button",{type:"submit"},"Login")),l.a.createElement("p",null,"Not a member? ",l.a.createElement("a",{href:"/register"},"Sign up now")))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),fetch("/register",{method:"POST",body:JSON.stringify({name:a.state.name,email:a.state.email,username:a.state.username,password:a.state.password}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){"okay"===e.message?(console.log(e),a.props.history.push("/gallery")):"email"===e.message?a.setState({errorMessage:"An account in that email already exists."}):"username"===e.message&&a.setState({errorMessage:"An account in that username already exists."})}).catch(function(e){console.log(e)})},a.handleName=function(e){a.setState({name:e.target.value})},a.handleEmail=function(e){a.setState({email:e.target.value})},a.handleUsername=function(e){a.setState({username:e.target.value})},a.handlePassword=function(e){a.setState({password:e.target.value})},a.state={name:"",email:"",username:"",password:"",errorMessage:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=""!==this.state.errorMessage;return l.a.createElement("form",{action:"/register",method:"POST",className:"registerForm",onSubmit:this.handleSubmit},l.a.createElement("h1",null,"Sign Up"),e&&l.a.createElement("h4",null,this.state.errorMessage),l.a.createElement("label",null,"Name: "),l.a.createElement("input",{type:"text",name:"name",onChange:this.handleName,value:this.state.name}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("label",null,"Email: "),l.a.createElement("input",{type:"email",name:"email",onChange:this.handleEmail,value:this.state.email}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("label",null,"Username: "),l.a.createElement("input",{type:"text",name:"username",onChange:this.handleUsername,value:this.state.username}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("label",null,"Password: "),l.a.createElement("input",{type:"password",name:"password",onChange:this.handlePassword,value:this.state.password}),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{type:"submit"},"Register"))}}]),t}(n.Component),y=a(37),O=a.n(y);function A(e,t){for(var a=e.split(","),n=a[0].match(/:(.*?);/)[1],l=atob(a[1]),r=l.length,i=new Uint8Array(r);r--;)i[r]=l.charCodeAt(r);return new File([i],t,{type:n})}function N(e,t){var a=document.createElement("a");a.setAttribute("href",e),a.setAttribute("download",t),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)}function P(e){return e.substring("data:image/".length,e.indexOf(";base64"))}function j(e,t,a){var n=e;n.width=a.width,n.height=a.height;var l=n.getContext("2d"),r=new Image;r.src=t,r.onload=function(){l.drawImage(r,a.x,a.y,a.width,a.height,0,0,a.width,a.height)}}var F=a(55),k=a.n(F),D=a(88);function I(e){return U.apply(this,arguments)}function U(){return(U=Object(D.a)(k.a.mark(function e(t){var a,n,l=this;return k.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.next=5,a.blob();case 5:return n=e.sent,e.abrupt("return",new Promise(function(e,t){var a=new FileReader;a.addEventListener("load",function(){e(a.result)},!1),a.onerror=function(){return t(l)},a.readAsDataURL(n)}));case 7:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var R=a(23),x=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){fetch("/active").then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({active:e})})},a.handleDownloadClickCloud=function(e){e.preventDefault();var t=a.cloudinaryImageRef.current,n=P(a.props.imgSrc);I(t.state.url+"."+n).then(function(e){a.setState({CloudBase64:e},function(){a.downloadImage(n),console.log("image downloaded"),a.deleteImage(),console.log("image deleted")})})},a.downloadImage=function(e){var t=a.props.recentname+"(crop)"+e;N(a.state.CloudBase64,t)},a.handleSave=function(e){var t=a.cloudinaryImageRef.current,n=P(a.props.imgSrc);I(t.state.url+"."+n).then(function(e){a.setState({CloudBase64:e},function(){var e=a.props.recentname+"(crop)"+n,t=A(a.state.CloudBase64,e),l=a.props.recenturl.split("/"),r=l[l.length-2],i=new FormData;i.append("title",e),i.append("url",a.props.recenturl),i.append("public_id",a.props.public_id),i.append("folder",r),i.append("image",t),fetch("/upload",{method:"POST",body:i}).then(function(e){return e.json()}).then(function(e){console.log(e),fetch("/delete",{method:"POST",body:JSON.stringify({publicID:a.getPublicId(e[e.length-2].url),url:e[e.length-2].url}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){console.log(e)})}).then(a.props.history.push("/gallery"))})}).catch(function(e){return console.error(e)})},a.getPublicId=function(e){var t=e.split("/"),a=t[t.length-2]+"/"+t[t.length-1];return a.substring(0,a.length-4)},a.handleEffectChange=function(e){a.setState({effect:e.target.value})},a.handleAngleChange=function(e){a.setState({angle:e.target.value})},a.handleRadiusChange=function(e){a.setState({radius:e.target.value})},a.handleOpacityChange=function(e){a.setState({opacity:e.target.value})},a.handleXChange=function(e){a.setState({x:e.target.value})},a.handleYChange=function(e){a.setState({y:e.target.value})},a.handleFontFamilyChange=function(e){a.setState({fontFamily:e.target.value})},a.handleFontSizeChange=function(e){a.setState({fontSize:e.target.value})},a.handleTextChange=function(e){a.setState({text:e.target.value})},a.handleTextColorChange=function(e){a.setState({coRGB:e.target.value})},a.imagePreviewCanvasRef=e.imagePreviewCanvasRef,a.cloudinaryImageRef=l.a.createRef(),a.state={title:"",image:null,allfiles:[],recentfile:[],recenturl:"",recentname:"",public_id:"",CloudBase64:"",crop:{width:30,height:10},imgSrc:"",radius:"0",angle:"0",opacity:"100",effect:"",x:"0",y:"0",fontFamily:"arial",fontSize:"80",text:"hello world",coRGB:"black",active:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"deleteImage",value:function(){var e=this;!1===this.state.active&&fetch("/delete",{method:"POST",body:JSON.stringify({publicID:this.props.public_id,url:this.props.recenturl}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(t){console.log(t),e.props.history.push("/login")})}},{key:"render",value:function(){var e;e=""!==this.state.effect?this.state.effect:null;var t=this.state.active,a=""!==this.state.text;return l.a.createElement("div",null,l.a.createElement("h1",null,"Edit Photo"),l.a.createElement("div",{className:"cloudeditor"},l.a.createElement("div",{className:"cloudPreview"},l.a.createElement(R.Image,{cloudName:Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_CLOUD_NAME,publicId:this.props.public_id,ref:this.cloudinaryImageRef,className:"cloudPreviewImg"},l.a.createElement(R.Transformation,{crop:"fit",effect:e,radius:this.state.radius,opacity:this.state.opacity}),a&&l.a.createElement(R.Transformation,{overlay:"text:".concat(this.state.fontFamily,"_").concat(this.state.fontSize,":").concat(this.state.text),x:this.state.x,y:this.state.y,color:this.state.coRGB}),l.a.createElement(R.Transformation,{angle:this.state.angle}))),l.a.createElement("div",{className:"editWrapper"},l.a.createElement("div",{className:"editSection"},l.a.createElement("div",{className:"editImage"},l.a.createElement("h3",null,"Photo Edits"),l.a.createElement("div",{className:"opacity"},l.a.createElement("label",{htmlFor:"opacity"},"Opacity: "),l.a.createElement("input",{type:"number",name:"opacity",id:"",min:"0",max:"100",value:this.state.opacity,onChange:this.handleOpacityChange})),l.a.createElement("div",{className:"angle"},l.a.createElement("label",{htmlFor:"angle"},"Rotation: "),l.a.createElement("input",{type:"number",name:"angle",id:"",min:"-360",max:"360",value:this.state.angle,onChange:this.handleAngleChange})),l.a.createElement("div",{className:"radius"},l.a.createElement("label",{htmlFor:"radius"},"Corner Radius: "),l.a.createElement("input",{type:"number",name:"radius",id:"",min:"0",max:"100",value:this.state.radius,onChange:this.handleRadiusChange})),l.a.createElement("div",{className:"pictureEffect"},l.a.createElement("label",{htmlFor:"picture_effect"},"Photo Effect: "),l.a.createElement("select",{name:"picture_effect",onChange:this.handleEffectChange},l.a.createElement("option",{value:""},"None"),l.a.createElement("option",{value:"sepia"},"Sepia"),l.a.createElement("option",{value:"negate"},"Invert"),l.a.createElement("option",{value:"grayscale"},"Grayscale"),l.a.createElement("option",{value:"blackwhite"},"Blackwhite"),l.a.createElement("option",{value:"cartoonify"},"Cartoonify")))),l.a.createElement("div",{className:"editText"},l.a.createElement("h3",null,"Overlay Text Edits"),l.a.createElement("div",{className:"textCoordinates"},l.a.createElement("div",{className:"xylabel"},l.a.createElement("label",null,"Text Position"),l.a.createElement("br",null)),l.a.createElement("div",{className:"X"},l.a.createElement("label",{htmlFor:"x"},"X: "),l.a.createElement("input",{type:"number",name:"x",value:this.state.x,onChange:this.handleXChange})),l.a.createElement("div",{className:"Y"},l.a.createElement("label",{htmlFor:"y"},"Y: "),l.a.createElement("input",{type:"number",name:"y",value:this.state.y,onChange:this.handleYChange}))),l.a.createElement("div",{className:"fontFamily"},l.a.createElement("label",{htmlFor:"fontFamily"},"Font-Family: "),l.a.createElement("select",{name:"fontFamily",onChange:this.handleFontFamilyChange,value:this.state.fontFamily},l.a.createElement("option",{value:"allan"},"Allan"),l.a.createElement("option",{value:"arial"},"Arial"),l.a.createElement("option",{value:"bookman"},"Bookman"),l.a.createElement("option",{value:"courier"},"Courier"),l.a.createElement("option",{value:"dekko"},"Dekko"),l.a.createElement("option",{value:"gruppo"},"Gruppo"),l.a.createElement("option",{value:"helvetica"},"Helvetica"),l.a.createElement("option",{value:"impact"},"Impact"),l.a.createElement("option",{value:"kalam"},"Kalam"),l.a.createElement("option",{value:"merienda"},"Merienda"),l.a.createElement("option",{value:"neucha"},"Neucha"),l.a.createElement("option",{value:"palatino"},"Palatino"),l.a.createElement("option",{value:"roboto"},"Roboto"),l.a.createElement("option",{value:"times"},"Times"),l.a.createElement("option",{value:"verdana"},"Verdana"))),l.a.createElement("div",{className:"Text"},l.a.createElement("label",{htmlFor:"Text"},"Text: "),l.a.createElement("input",{type:"text",name:"Text",value:this.state.text,onChange:this.handleTextChange})),l.a.createElement("div",{className:"fontSize"},l.a.createElement("label",{htmlFor:"fontSize"},"Font-Size: "),l.a.createElement("input",{type:"number",min:"4",name:"fontSize",value:this.state.fontSize,onChange:this.handleFontSizeChange})),l.a.createElement("div",{className:"coRGB"},l.a.createElement("label",{htmlFor:"coRGB"},"Text Color: "),l.a.createElement("select",{name:"coRGB",onChange:this.handleTextColorChange,value:this.state.coRGB},l.a.createElement("option",{value:"black"},"Black"),l.a.createElement("option",{value:"red"},"Red"),l.a.createElement("option",{value:"blue"},"Blue"),l.a.createElement("option",{value:"green"},"Green"),l.a.createElement("option",{value:"pink"},"Pink"),l.a.createElement("option",{value:"purple"},"Purple"),l.a.createElement("option",{value:"brown"},"Brown"),l.a.createElement("option",{value:"yellow"},"Yellow"),l.a.createElement("option",{value:"orange"},"Orange"),l.a.createElement("option",{value:"white"},"White"),l.a.createElement("option",{value:"grey"},"Grey"),l.a.createElement("option",{value:"silver"},"Silver"),l.a.createElement("option",{value:"gold"},"Gold"),l.a.createElement("option",{value:"cyan"},"Cyan"),l.a.createElement("option",{value:"lime"},"Lime"),l.a.createElement("option",{value:"magenta"},"Magenta"),l.a.createElement("option",{value:"olive"},"Olive")))),l.a.createElement("button",{onClick:this.handleDownloadClickCloud},"Download"),t&&l.a.createElement("button",{onClick:this.handleSave},"Save")))))}}]),t}(n.Component),L=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleImageLoaded=function(e){console.log(e)},a.handleOnCropChange=function(e){a.setState({crop:e})},a.handleOnCropComplete=function(e,t){j(a.imagePreviewCanvasRef.current,a.state.imgSrc,t)},a.handleOnCropClick=function(e){e.preventDefault();var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc),l=t.toDataURL("image/"+n);a.setState({imgSrc:l})},a.handleFurtherEditClick=function(e){e.preventDefault(),a.setState({goneEditMode:!0});var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc),l=t.toDataURL("image/"+n),r=a.state.recentname+"(cropped)"+n,i=A(l,r),o=a.state.recenturl.split("/"),c=o[o.length-2],s=new FormData;s.append("title",r),s.append("url",a.state.recenturl),s.append("public_id",a.state.public_id),s.append("folder",c),s.append("image",i),fetch("/upload",{method:"POST",body:s}).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({allfiles:[e],recentfile:[e[e.length-1]],recenturl:e[e.length-1].url,recentname:e[e.length-1].name,public_id:a.getPublicId(e[e.length-1].url),dFile:[e[e.length-2]],dUrl:e[e.length-2].url,dName:e[e.length-2].name,dPublicID:a.getPublicId(e[e.length-2].url)}),fetch("/delete",{method:"POST",body:JSON.stringify({publicID:a.getPublicId(e[e.length-2].url),url:e[e.length-2].url}),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){console.log(e)})})},a.handleDownloadClick=function(e){e.preventDefault();var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc);console.log(n);var l=t.toDataURL("image/"+n);console.log(l);var r=a.state.recentname+"(crop)"+n,i=A(l,r);console.log(i),N(l,r)},a.getPublicId=function(e){var t=e.split("/"),a=t[t.length-2]+"/"+t[t.length-1];return a.substring(0,a.length-4)},a.imagePreviewCanvasRef=l.a.createRef(),a.cloudinaryImageRef=l.a.createRef(),a.state={title:"",image:null,allfiles:[],recentfile:[],recenturl:"",recentname:"",public_id:"",dFile:[],dUrl:"",dName:"",dPublicID:"",CloudBase64:"",crop:{width:0,height:0},imgSrc:"",goneEditMode:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/edit").then(function(e){return e.json()}).then(function(t){console.log(t),e.setState({allfiles:[t],recentfile:[t[t.length-1]],recenturl:t[t.length-1].url,recentname:t[t.length-1].name,public_id:e.getPublicId(t[t.length-1].url)}),I(t[t.length-1].url).then(function(t){e.setState({imgSrc:t})}).catch(function(e){return console.error(e)})})}},{key:"render",value:function(){var e=this.state.goneEditMode;return l.a.createElement("div",{className:"editor"},e?l.a.createElement("div",{className:"editmode"},l.a.createElement(x,{imagePreviewCanvasRef:this.imagePreviewCanvasRef,recentname:this.state.recentname,imgSrc:this.state.imgSrc,public_id:this.state.public_id,recenturl:this.state.recenturl,history:this.props.history})):l.a.createElement("div",{className:"cropmode"},l.a.createElement("h1",null,"Crop it"),l.a.createElement("p",null,"Click on the image to start cropping."),l.a.createElement("div",{className:"cropimages"},l.a.createElement("div",{className:"cropmain"},l.a.createElement(O.a,{src:this.state.imgSrc,crop:this.state.crop,onImageLoaded:this.handleImageLoaded,onComplete:this.handleOnCropComplete,onChange:this.handleOnCropChange}),l.a.createElement("button",{onClick:this.handleOnCropClick},"Crop")),l.a.createElement("div",{className:"preview"},l.a.createElement("p",null,"Preview Canvas Crop"),l.a.createElement("canvas",{ref:this.imagePreviewCanvasRef}),l.a.createElement("button",{onClick:this.handleDownloadClick},"Download"),l.a.createElement("button",{onClick:this.handleFurtherEditClick},"Edit Further")))))}}]),t}(n.Component),M=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleEdit=function(e){},a.handleDownload=function(e){e.preventDefault();var t=a.state.imgSrc;console.log(t);var n=P(t);console.log(n);var l=a.state.fileName+n;console.log(l),N(t,l)},a.handleDelete=function(e){fetch("/photo/".concat(a.props.match.params.photoID),{method:"DELETE"}).then(function(e){return e.json()}).then(function(e){console.log(e),a.props.history.push("/gallery")}).catch(function(e){console.log(e)})},a.state={file:"",fileName:"",fileURL:"",fileID:"",imgSrc:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/photo/".concat(this.props.match.params.photoID)).then(function(e){return e.json()}).then(function(t){console.log(t),e.setState({file:t,fileURL:t.url,fileName:t.name,fileID:t.id}),I(t.url).then(function(t){e.setState({imgSrc:t})}).catch(function(e){return console.error(e)})})}},{key:"render",value:function(){return l.a.createElement("div",{className:"photoWrapper"},l.a.createElement("div",{className:"buttons"},l.a.createElement("div",null,l.a.createElement(d.a,{to:"/editspecial/".concat(this.state.fileID)},l.a.createElement("button",{onClick:this.handleEdit},"Edit"))),l.a.createElement("div",null,l.a.createElement("button",{onClick:this.handleDownload},"Download")),l.a.createElement("div",null,l.a.createElement("button",{onClick:this.handleDelete},"Delete"))),l.a.createElement("div",{className:"photoimage"},l.a.createElement("img",{src:this.state.fileURL})))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleImageLoaded=function(e,t){console.log(e)},a.handleOnCropChange=function(e){a.setState({crop:e})},a.handleOnCropComplete=function(e,t){j(a.imagePreviewCanvasRef.current,a.state.imgSrc,t)},a.handleOnCropClick=function(e){e.preventDefault();var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc),l=t.toDataURL("image/"+n);a.setState({imgSrc:l})},a.handleFurtherEditClick=function(e){e.preventDefault(),a.setState({goneEditMode:!0});var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc),l=t.toDataURL("image/"+n),r=a.state.recentname+"(cropped)"+n,i=A(l,r),o=a.state.recenturl.split("/"),c=o[o.length-2],s=new FormData;s.append("title",r),s.append("url",a.state.recenturl),s.append("public_id",a.state.public_id),s.append("folder",c),s.append("image",i),fetch("/upload",{method:"POST",body:s}).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({allfiles:[e],recentfile:[e[e.length-1]],recenturl:e[e.length-1].url,recentname:e[e.length-1].name,public_id:a.getPublicId(e[e.length-1].url)})})},a.handleDownloadClick=function(e){e.preventDefault();var t=a.imagePreviewCanvasRef.current,n=P(a.state.imgSrc);console.log(n);var l=t.toDataURL("image/"+n);console.log(l);var r=a.state.recentname+"(crop)"+n,i=A(l,r);console.log(i),N(l,r)},a.getPublicId=function(e){var t=e.split("/"),a=t[t.length-2]+"/"+t[t.length-1];return a.substring(0,a.length-4)},a.imagePreviewCanvasRef=l.a.createRef(),a.cloudinaryImageRef=l.a.createRef(),a.state={title:"",image:null,allfiles:[],recentfile:[],recenturl:"",recentname:"",public_id:"",CloudBase64:"",crop:{width:0,height:0},imgSrc:"",goneEditMode:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/editspecial/".concat(this.props.match.params.photoID)).then(function(e){return e.json()}).then(function(t){console.log(t),e.setState({recentfile:t,recenturl:t.url,recentname:t.name,public_id:e.getPublicId(t.url)}),I(t.url).then(function(t){e.setState({imgSrc:t})}).catch(function(e){return console.error(e)})})}},{key:"render",value:function(){var e=this.state.goneEditMode;return l.a.createElement("div",{className:"editor"},e?l.a.createElement("div",{className:"editmode"},l.a.createElement(x,{imagePreviewCanvasRef:this.imagePreviewCanvasRef,recentname:this.state.recentname,imgSrc:this.state.imgSrc,public_id:this.state.public_id,recenturl:this.state.recenturl,history:this.props.history})):l.a.createElement("div",{className:"cropmode"},l.a.createElement("h1",null,"Crop it"),l.a.createElement("p",null,"Click on the image to start cropping."),l.a.createElement("div",{className:"cropimages"},l.a.createElement("div",{className:"cropmain"},l.a.createElement(O.a,{src:this.state.imgSrc,crop:this.state.crop,onImageLoaded:this.handleImageLoaded,onComplete:this.handleOnCropComplete,onChange:this.handleOnCropChange}),l.a.createElement("button",{onClick:this.handleOnCropClick},"Crop")),l.a.createElement("div",{className:"preview"},l.a.createElement("p",null,"Preview Canvas Crop"),l.a.createElement("canvas",{ref:this.imagePreviewCanvasRef}),l.a.createElement("button",{onClick:this.handleDownloadClick},"Download"),l.a.createElement("button",{onClick:this.handleFurtherEditClick},"Edit Further")))))}}]),t}(n.Component);a(228).config();var J=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).componentDidMount=function(){a.handleActiveUser(),setInterval(a.handleActiveUser,1e3)},a.handleGetUsername=function(){fetch("/username").then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({username:e.username})})},a.handleActiveUser=function(){fetch("/active").then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({active:e},a.handleGetUsername)})},a.handleLogOut=function(){fetch("/logout",{method:"POST"}).then(function(e){return e.json()}).then(function(e){console.log(e),a.setState({active:!1,dots:!1},function(){a.props.history.push("/")})})},a.showMenu=function(e){e.preventDefault(),a.state.dots?a.setState({dots:!1}):a.setState({dots:!0})},a.state={active:!1,dots:!1,username:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"App"},l.a.createElement(h.a,{path:"/",render:function(t){return l.a.createElement(C,Object.assign({active:e.state.active,username:e.state.username,dots:e.state.dots,handleGetUsername:e.handleGetUsername,handleActiveUser:e.handleActiveUser,handleLogOut:e.handleLogOut,showMenu:e.showMenu},t))}}),l.a.createElement(h.a,{path:"/",exact:!0,component:v}),l.a.createElement(h.a,{path:"/gallery",render:function(t){return l.a.createElement(p,Object.assign({active:e.state.active,username:e.state.username,handleGetUsername:e.handleGetUsername,handleActiveUser:e.handleActiveUser},t))}}),l.a.createElement(h.a,{path:"/login",component:S}),l.a.createElement(h.a,{path:"/register",component:w}),l.a.createElement(h.a,{path:"/edit",component:L}),l.a.createElement(h.a,{path:"/photo/:photoID",component:M}),l.a.createElement(h.a,{path:"/editspecial/:photoID",component:T}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(235);i.a.render(l.a.createElement(W.a,null,l.a.createElement(h.a,{path:"/",component:J})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},87:function(e,t){e.exports="data:image/png;base64,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"},90:function(e,t,a){e.exports=a(232)},95:function(e,t,a){},97:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},98:function(e,t,a){}},[[90,2,1]]]);
//# sourceMappingURL=main.1dce8725.chunk.js.map