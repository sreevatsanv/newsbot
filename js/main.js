function test(){
	//console.log(STORIES["finance"]);
	//console.log(STORIES["technology"]);
	//console.log(STORIES["entertainment"]);
	//console.log(STORIES["politics"]);
	//console.log(STORIES["sports"]);
	if(localStorage.getItem("count") === null) localStorage.setItem("count",0);
	if(localStorage.getItem("saveAndComment") === null) localStorage.setItem("saveAndComment",JSON.stringify({}));
	if(localStorage.getItem("nyt") === null) localStorage.setItem("nyt","True");
	if(localStorage.getItem("reddit") === null) localStorage.setItem("reddit","True");
	if(localStorage.getItem("guardian") === null) localStorage.setItem("guardian","True");
	if(localStorage.getItem("twitter") === null) localStorage.setItem("twitter","True");
}
function setTech(){
	bdy = document.getElementsByClassName('modal-body');
	for(i=0; i <bdy[0].childNodes.length;i++){
		bdy[0].removeChild(bdy[0].childNodes[i]);
	}
	for(var el in STORIES["technology"]){
		//console.log(el);
		////console.log(STORIES["technology"][el])
			link = document.createElement("a");
			str = "story.html?written=false?category=technology?title="+el;
			//console.log(str);
			link.setAttribute('href',str);
			link.className ="list-group-item";
			link.appendChild(document.createTextNode(el));
			link.onclick = function(){
				setStoryPage()
			}
			bdy[0].appendChild(link);
	}
}
function setEntertain(){
	bdy = document.getElementsByClassName('modal-body');
	for(i=0; i <bdy[0].childNodes.length;i++){
		bdy[0].removeChild(bdy[0].childNodes[i]);
	}
	for(var el in STORIES["entertainment"]){
		//console.log(STORIES["entertainment"][el])
			link = document.createElement("a");
			str = "story.html?written=false?category=entertainment?title="+el;
			//console.log(str);
			link.setAttribute('href',str);
			link.className ="list-group-item";
			link.appendChild(document.createTextNode(el));
			link.onclick = function(){
				setStoryPage()
			};
			bdy[0].appendChild(link);
	}
}
function setFin(){
	bdy = document.getElementsByClassName('modal-body');
	for(i=0; i <bdy[0].childNodes.length;i++){
		bdy[0].removeChild(bdy[0].childNodes[i]);
	}
	for(var el in STORIES["finance"]){
		//console.log(STORIES["finance"][el])
			link = document.createElement("a");
			str = "story.html?written=false?category=finance?title="+el;
			//console.log(str);
			link.setAttribute('href',str);
			link.className ="list-group-item";
			link.appendChild(document.createTextNode(el));
			link.onclick = function(){
				setStoryPage()
			};
			bdy[0].appendChild(link);
	}
}
function setPol(){
	bdy = document.getElementsByClassName('modal-body');
	for(i=0; i <bdy[0].childNodes.length;i++){
		bdy[0].removeChild(bdy[0].childNodes[i]);
	}
	for(var el in STORIES["politics"]){
		//console.log(STORIES["politics"][el])
			link = document.createElement("a");
			str = "story.html?written=false?category=politics?title="+el;
			//console.log(str);
			link.setAttribute('href',str);
			link.className ="list-group-item";
			link.appendChild(document.createTextNode(el));
			link.onclick = function(){
				setStoryPage()
			};
			bdy[0].appendChild(link);
	}
}
function setSport(){
	bdy = document.getElementsByClassName('modal-body');
	for(var el in STORIES["sports"]){
		//console.log(STORIES["sports"][el])
		for(i=0; i <bdy[0].childNodes.length;i++){
			bdy[0].removeChild(bdy[0].childNodes[i]);
		}
			link = document.createElement("a");
			str = "story.html?written=false?category=sports?title="+el;
			//console.log(str);
			link.setAttribute('href',str);
			link.className ="list-group-item";
			link.appendChild(document.createTextNode(el));
			link.onclick = function(){
				setStoryPage()
			};
			bdy[0].appendChild(link);
	}
}
function setStoryPage(){
	toLoad = decodeURIComponent(location.search.split('?')[1]);
	toLoad = toLoad.split("written=")[1];
	if(toLoad != "false"){
		return;
	}
	category = decodeURIComponent(location.search.split('?')[2]);
	category = category.split("category=")[1];
	title = document.getElementById('title');
	ttl =decodeURIComponent(location.search.split('title=')[1])
	////console.log(ttl)
	title.appendChild(document.createTextNode(ttl))
	if(SUMMARIES[ttl]){
		summaryHold = document.getElementById('accordian');
		sum = document.createElement('div');
		sum.className = "summary list-group";
		sumhead = document.createElement('h4');
		sumhead.appendChild(document.createTextNode("Summary"));
		sum.appendChild(sumhead);
		sum.appendChild(document.createTextNode(SUMMARIES[ttl]));
		summaryHold.appendChild(sum);
		//console.log(summary[ttl]);
	}
	storyboard = document.getElementById('accordian');
	////console.log(storyboard);
	////console.log(category);
	////console.log(ttl);
	for(i=0; i <storyboard.childNodes.length;i++){
		storyboard.removeChild(storyboard.childNodes[i]);
	}
	count = 0;
	for(var each in STORIES[category]){
		//console.log(each);
		////console.log(STORIES[category][each]);
		//for (var key in STORIES[category][each]){
			////console.log(key);
		//console.log(count);
		if(each == ttl){
			for (var eachSt in STORIES[category][each]){
				//console.log("Checking filter");
				//console.log(STORIES[category][each][eachSt]["source"]);
				//console.log(localStorage.getItem(STORIES[category][each][eachSt]["source"]));
			if(localStorage.getItem(STORIES[category][each][eachSt]["source"])=="True"){
			count = count + 1;
			////console.log(STORIES[category][each][key][eachSt])
			//console.log(eachSt);
			story = document.createElement('div');
			story.className = "panel panel-default modern embossed-link";
			story.id = count;
			storyHeading = document.createElement('div');
			storyHeading.className = "panel-heading";
			storyTitle = document.createElement('h4');
			storyTitle.className = "panel-title";
			icon = document.createElement("img");
			icon.className = "thumb";
			if (STORIES[category][each][eachSt]["source"] == "nyt"){
				icon.setAttribute("src","css/bootstrap/img/nyt-thumb.jpg");
				icon.setAttribute("alt","The New York Times");
			}
			if (STORIES[category][each][eachSt]["source"] == "guardian"){
				icon.setAttribute("src","css/bootstrap/img/guardian-thumb.jpg");
				icon.setAttribute("alt","The Guardian");
			}
			if (STORIES[category][each][eachSt]["source"] == "reddit"){
				icon.setAttribute("src","css/bootstrap/img/reddit-thumb.png");
				icon.setAttribute("alt","Reddit");
			}
			if (STORIES[category][each][eachSt]["source"] == "twitter"){
				icon.setAttribute("src","css/bootstrap/img/twitter-thumb.png");
				icon.setAttribute("alt","twitter");
				metadata = document.createElement("p");
				metadata.className = "list-group-item";
				metadata.appendChild(document.createTextNode(STORIES[category][each][eachSt]["metadata"]));
			}
			storyTitle.appendChild(icon);
			//storyTitle.appendChild(document.createElement("br"));
			link = document.createElement("a");
			link.className = "title arttitle";
			////console.log(STORIES[category][each][key][eachSt]["url"]);
			str = STORIES[category][each][eachSt]["url"];
			////console.log(str)
			////console.log(STORIES[category][each][key][eachSt]["title"]);
			link.setAttribute('data-toggle','collapse');
			link.setAttribute('data-parent','#selector');
			////console.log(eachSt);
			ref = '#collapse'+eachSt;
			////console.log(ref);
			link.setAttribute('href',ref);
			////console.log(STORIES[category][each][key][eachSt]["title"])
			link.appendChild(document.createTextNode(STORIES[category][each][eachSt]["title"]));
			storyTitle.appendChild(link);
			storyHeading.appendChild(storyTitle);
			story.appendChild(storyHeading);
			storyContent =document.createElement('div');
			storyContent.className = "panel-collapse collapse";
			ref = 'collapse'+eachSt;
			storyContent.setAttribute('id',ref);
			storyBody = document.createElement('div');
			storyBody.className = "panel-body list-group";
			pin = document.createElement("i");
			pin.id = count;
			val = STORIES[category][each][eachSt];
			pin.onclick = (function(story){
				return function(){
				saveAndComment(this,story)}
			})(val);
			pin.setAttribute("href","#myModal");
			pin.setAttribute("data-toggle","modal");
			pinimg = document.createElement("i");
			pinimg.className = "flaticon-pin28 list-group-item-heading";
			pin.appendChild(pinimg);
			button = document.createElement('i');
			button.className = "flaticon-delete13 list-group-item-heading";
			button.onclick = function(){remove(this)};
			storyBody.appendChild(pin);
			storyBody.appendChild(button);
			url = document.createElement("a");
			url.setAttribute("href",str);
			url.setAttribute("target","_blank");
			url.appendChild(document.createTextNode("Link to article"));
			url.className = "list-group-item";
			storyBody.appendChild(url);
			abs = document.createElement("p");
			abs.className ="list-group-item";
			abs.appendChild(document.createTextNode(STORIES[category][each][eachSt]["content"]));
			storyBody.appendChild(abs);
			if(STORIES[category][each][eachSt]["source"] == "twitter"){
				storyBody.appendChild(metadata);
			}/*
			img = document.createElement("img");
			img.className = "story-pic list-group-item";
			img.setAttribute("src",STORIES[category][each][eachSt]["img"]);
			img.setAttribute("height","20px");
			storyBody.appendChild(img);*/
			storyContent.appendChild(storyBody);
			story.appendChild(storyContent);
			storyboard.appendChild(story);}}
		//}
		}
	}
	////console.log(storyboard);
}

function saveAndComment(pin, story){
	//console.log(story);
	//console.log(pin);
	title = document.getElementById('title');
	ttl =decodeURIComponent(location.search.split('title=')[1])
	category = decodeURIComponent(location.search.split('?')[2]);
	category = category.split("category=")[1];
	//console.log(category);
	bdy = document.getElementById("saveButton");
	bdy.onclick = function(){
		if (document.getElementById("commentText").value !== null &&
				document.getElementById("commentText").value !== ""){
			story["comment"] = document.getElementById("commentText").value
		}
		dict = JSON.parse(localStorage.getItem("saveAndComment"));
		//console.log(count);
		storyid = ttl+pin.getAttribute('id');
		if (dict[category] === undefined){
			dict[category] = {};
			category[storyid] = story;
			dict[category][storyid] = story;
			//console.log(dict[category][storyid]);
		}
		else if(dict[category][storyid] === undefined){
			dict[category][storyid] = story;
			//console.log("Category defined, but no entry for story");
			//console.log(dict[category][storyid]);
		}
		else if(story["comment"] !== undefined ||
				story["comment"] !== ""){
			dict[category][storyid]["comment"] = dict[category][storyid]["comment"] +"\n"+story["comment"];
			//console.log("Category defined and story defined, but the comment is being added")
			//console.log(dict[category][storyid]);
		}
		//console.log(pin);
		//console.log(pin.getAttribute('id'));
		//console.log(storyid);
		//console.log(dict[category]);
		//console.log(dict);
		localStorage.setItem("saveAndComment",JSON.stringify(dict));
	};
}
function saveFilter(){
	
	if(document.getElementById("reddit").checked){
		//console.log("reddit");
		localStorage.setItem("reddit","True");
	}
	else{
		localStorage.setItem("reddit","False");
	}
	if(document.getElementById("guardian").checked){
		localStorage.setItem("guardian","True");
	}
	else{
		localStorage.setItem("guardian","False");
	}
	if(document.getElementById("nyt").checked){
		//console.log("nyt");
		localStorage.setItem("nyt","True");
	}
	else{
		localStorage.setItem("nyt","False");
	}
	if(document.getElementById("twitter").checked){
		localStorage.setItem("twitter","True");
	}
	else{
		localStorage.setItem("twitter","False");
	}
}
function remove(button){
	body = button.parentNode;
	content = body.parentNode;
	elid = content.parentNode.getAttribute('id');
	var el = document.getElementById(elid);
	el.remove();
	//store();
	return;
}
function getArchive(){
	archive = JSON.parse(localStorage.getItem("saveAndComment"));
	bdy = document.getElementById("archiveModalBody");
	grp = document.createElement("div");
	grp.className = "list-group";
	for(i=0; i <bdy.childNodes.length;i++){
		bdy.removeChild(bdy.childNodes[i]);
	}
	for(var category in archive){
		cat = document.createElement("ul");
		heading = document.createElement("h3");
		heading.appendChild(document.createTextNode(category));
		heading.className = "category"
		cat.appendChild(heading);
		cat.className = "list-group-item";
		//console.log(category);
		count = 0;
		for (var title in archive[category]){
			//console.log(title);
			story = document.createElement('div');
			story.className = "panel panel-default modern embossed-link ";
			story.id = title;
			storyHeading = document.createElement('div');
			storyHeading.className = "panel-heading";
			storyTitle = document.createElement('h4');
			storyTitle.className = "panel-title";
			link = document.createElement("a");
			str = archive[category][title]["url"];
			link.setAttribute('data-toggle','collapse');
			link.setAttribute('data-parent','#selector');
			refValue = archive[category][title]["title"];
			refValue = refValue.replace(/[^\w\s]/gi, '');
			titleVal = title.replace(/[^\w\s]/gi, '');
			app = refValue.split(" ");
			titleVal = titleVal.split(" ");
			//console.log(app);
			ref = '#collapse'+category;
			for(var s in titleVal){
				ref = ref + app[s];
				//console.log(s);
			}
			for(var s in app){
				ref = ref + app[s];
				//console.log(s);
			}
			ref = ref + count;
			link.setAttribute('href',ref);
			link.appendChild(document.createTextNode(archive[category][title]["title"]));
			storyTitle.appendChild(link);
			storyHeading.appendChild(storyTitle);
			story.appendChild(storyHeading);
			storyContent =document.createElement('div');
			storyContent.className = "panel-collapse collapse";
			ref = 'collapse'+category;
			for(var s in titleVal){
				ref = ref + app[s];
				//console.log(s);
			}
			for(var s in app){
				ref = ref + app[s];
			}
			ref = ref+count;
			storyContent.setAttribute('id',ref);
			storyBody = document.createElement('div');
			storyBody.className = "panel-body list-group";
			url = document.createElement("a");
			url.setAttribute("href",str);
			url.setAttribute("target","_blank");
			url.appendChild(document.createTextNode("Link to article"));
			url.className = "list-group-item";
			storyBody.appendChild(url);
			abs = document.createElement("p");
			abs.className ="list-group-item";
			abs.appendChild(document.createTextNode(archive[category][title]["content"]));
			if (archive[category][title]["comment"] != "undefined" &&
					archive[category][title]["comment"] != undefined){
			comment = document.createElement("p");
			comment.className ="list-group-item comments";
			comment.appendChild(document.createTextNode(archive[category][title]["comment"]));
			storyBody.appendChild(comment);
			}
			storyBody.appendChild(abs);/*
			img = document.createElement("img");
			img.className = "story-pic list-group-item";
			img.setAttribute("src",archive[category][title]["img"]);
			img.setAttribute("height","20px");
			storyBody.appendChild(img);*/
			storyContent.appendChild(storyBody);
			story.appendChild(storyContent);
			cat.appendChild(story);
			count = count + 1;
		}
		grp.appendChild(cat);
	}
	bdy.appendChild(grp);
}
function getCheckVal(){
	redTag = document.getElementById("reddit");
	//console.log(localStorage.getItem("reddit"));
	if(localStorage.getItem("reddit")=="True"){
		redTag.setAttribute("checked","checked");
	}
	guarTag = document.getElementById("guardian");
	if(localStorage.getItem("guardian")=="True"){
		guarTag.setAttribute("checked","checked");
	}
	twitTag = document.getElementById("twitter");
	if(localStorage.getItem("twitter")=="True"){
		twitTag.setAttribute("checked","checked");
	}
	nytTag = document.getElementById("nyt");
	if(localStorage.getItem("nyt")=="True"){
		nytTag.setAttribute("checked","checked");
	}
	//console.log(source);
}