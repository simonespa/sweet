//TODO move into PM namespace

function stag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('div');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({'class': 'service'}).css({
        'display': 'inline',
        'background-color': 'lightyellow !important',
        'border':   '1px solid yellow'
    });
}

function otag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('div');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({
        'class':    'operation'
    }).css({
        'display': 'inline',
        'background-color': 'lightgreen !important',
        'border':   '1px solid green'
    });
}

function ptag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('span');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({
    	//Label instead of parameter
        'class':    'label'
    }).css({
        'display': 'inline',
        'background-color': 'lightblue !important',
        'border':   '1px solid blue'
    });
}

function atag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('span');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({
        'class':    'address'
    }).css({
        'display': 'inline',
        'background-color': 'lightgrey !important',
        'border':   '1px solid black'
    });
}

function itag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('span');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({
        'class':    'input'
    }).css({
        'display': 'inline',
        'background-color': 'lightblue !important',
        'border':   '1px solid green'
    });
}

function utag() {
    r = window.getSelection();
    r0 = r.getRangeAt(0);
    var el;
    try{
    if (typeof r0.surroundContents != 'undefined') {
        el = document.createElement('span');
        r0.surroundContents(el);
    } else {
        el = r0.surroundContents;
    }}catch(err){
        el = r0.commonAncestorContainer;
    }
    $(el).attr({
        'class':    'parameter'
    }).css({
        'display': 'inline',
        'background-color': 'lightblue !important',
        'border':   '1px solid red'
    });
}

function message(to, msg) {
    console.log(to + " :: " + msg);
    //TODO use "to"
    if (to == "host") {
        if (msg.indexOf("log:", 0) != -1) {
            console.log(msg);
        }

        if (msg.indexOf("hi:", 0) != -1) {
            himatch(msg.substring(3));
        }

        if (msg.indexOf('nid:') != -1){
            showMatch("nid" + msg.substring(4));
        }

        if (msg.indexOf('stag:') != -1){
            stag(msg.substring(4));
            return;
        }
        if (msg.indexOf('ptag:') != -1){
            ptag(msg.substring(4));
            return;
        }
        if (msg.indexOf('otag:') != -1){
            otag(msg.substring(4));
            return;
        }
        if (msg.indexOf('itag:') != -1){
            itag(msg.substring(4));
            return;
        }

        if (msg.indexOf('atag:') != -1){
            atag(msg.substring(4));
            return;
        }

        if (msg.indexOf('utag:') != -1){
            utag(msg.substring(4));
            return;
        }

        if (msg.indexOf('tag:') != -1){
            tag(msg.substring(4));
        }

        if (msg.indexOf('save:') != -1){
        	//document.location='view-source:' + document.location;
        	//document.location='view-source:data:text/html,' + document.getElementsByTagName('body')[0].innerHTML;
        	save();
        }
        if (msg.indexOf('exportRDF:') != -1){
        	//document.location='view-source:' + document.location;
        	//document.location='view-source:data:text/html,' + document.getElementsByTagName('body')[0].innerHTML;
        	exportRDF();
        }
    }

}

function poll() {
    PowerMagpie.ping("*");
    setTimeout('poll()', 1000);
}

function process() {
    var selection = (window.getSelection() + '');//.trim();
    //if (selection.indexOf(" ") != -1) {
    //    PowerMagpie.process(selection);
    //} else {
        PowerMagpie.add(selection);
    //}
}

function himatch(term) {
    var k = document.body.childNodes;
    for (i = 0; i < k.length; i++) {
        if ( k[i].innerHTML && k[i].id != "c3f22685-79cc-4ed6-b833-2ff9f61a5a33"
                && k[i].id != "hud"
            ) {
            highlightSearchTerms(k[i], term)
        };
    }
}

var counter = 0;

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) {
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<span style='color:blue; background-color:yellow;'>";
    highlightEndTag = "</span>";
  }

  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();

  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          counter++;
          highlightStartTag = "<span onclick='showNTT(\"nid"+counter+"\",\""+searchTerm+"\");return false;' id='nid" + counter + "' style='background-color:lightgray;'>";
          //highlightStartTag = "<span xmlns:pm='http://powermagpie.open.ac.uk/' about='"+document.location+"#nid"+counter+"' instanceof='pm:Match' property='pm:text' onclick='showNTT(\""+searchTerm+"\");return false;' id='nid" + counter + "' style='background-color:lightgray;'>";
          //highlightStartTag = "<span xmlns:owl='http://www.w3.org/2002/07/owl#' onclick='showNTT(\""+searchTerm+"\");return false;' id='nid" + counter + "' style='background-color:lightgray;'>";
          match = bodyText.substr(i, searchTerm.length);
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
          //sendMatch(searchTerm, match, counter);
          setTimeout("sendMatch('"+searchTerm+"', '"+match+"',"+ counter+")", 2000);
        }
      }
    }
  }

  return newText;
}


function highlightSearchTerms(element, searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag) {
  //if (treatAsPhrase) {
    searchArray = [searchText];
  //} else {
    //searchArray = searchText.split(" ");
  //}

  //var bodyText = document.body.innerHTML;
  var bodyText = element.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
  }

  //document.body.innerHTML = bodyText;
  element.innerHTML = bodyText;
  return true;
}

function replace(string, text, by) {
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;

    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;

    var newstr = string.substring(0,i) + by;

    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);

    return newstr;
}

function sendMatch(searchTerm, match, count){
    //check for parent ...
    node = $('#nid' + count);
    parent = $('#nid' + count).parent();
    if(node.text() == parent.text()){
        if (parent.attr('id').indexOf('nid') == 0) {
            console.log('duplicate highlight');
            console.log('replacing nid' + count + ' with ' + parent.attr('id'));
            count = parent.attr('id').substring(3);
            node.replaceWith(node.html());
            return;
        } else {
            node.replaceWith(node.html());
            parent.attr({
                'id':   'nid' + count,
                'background-color': 'lightgrey',
                'onclick':  "showNTT(\"nid" + count +"\",\"" + parent.text() + "\");return false;"
            });
        }
    }
    PowerMagpie.match('ui', searchTerm, match, count);
}

var lastNid = "nil";

function showMatch(nid) {
    var m = document.getElementById(lastNid);
    if(m != null) {
        m.style.backgroundColor = "lightgrey";
        m.style.color = "black";
    }
    lastNid = nid;
    m = document.getElementById(nid);
    if(m == null) console.log(nid);
    m.style.backgroundColor = "red";
    m.style.color = "white";
    document.location = "#" + nid;
}

function showNTT(nid, searchTerm) {
    showMatch(nid);
    if ($('#' + nid).attr('node') != null
            && $('#' + nid).attr('node').indexOf(':ntt:') != -1
        ) {
        PowerMagpie.selectNode('*', $('#' + nid).attr('node'));

    } else {
        PowerMagpie.select('*', searchTerm);
    }
}

function remove() {
    $("#" + lastNid).removeAttr('about')
        .removeAttr('rel')
        .removeAttr('resource')
        .removeAttr('property')
        .removeAttr('node')
        .removeAttr('title')
        .removeClass('mref');
    var m = document.getElementById(lastNid);
    if(m != null) {
        m.style.backgroundColor = "lightgrey";
        m.style.color = "black";
    }
}

function save() {
	 //document.getElementById('pmtxt').value = document.getElementsByTagName('body')[0].innerHTML;
	 var serializer = new XMLSerializer();
	 document.getElementById('pmtxt1').value = serializer.serializeToString( document.getElementsByTagName('html')[0] );
	 document.getElementById('pmform1').submit();
}

function exportRDF() {
	var serializer = new XMLSerializer();
	document.getElementById('pmtxt2').value = serializer.serializeToString( document.getElementsByTagName('html')[0] );
	document.getElementById('pmform2').submit();
}

function tag(node) {
    console.log(node);
    if (node.lastIndexOf(":ntt:") != -1)
        uri = node.substring(node.lastIndexOf(":ntt:") + 5);

    if (node.lastIndexOf(":xo:") != -1)
        uri = node.substring(node.lastIndexOf(":xo:") + 5);

    console.log(uri);
    showMatch(lastNid);
    var base = document.location.href.substring(0, document.location.href.length - document.location.hash.length);
	var id = lastNid;
    //#xpointer(string-range(//P,&quot;FOO&quot;))
    //
	var about = base + '#xpointer(string-range('
        + window['http://purl.org/net/powermagpie'].getXPath($("#" + lastNid).parent()[0]).toLowerCase()
        + ',&quot;' + $("#" + lastNid).text() + '&quot;))' ;
	//var seeAlso = 'http://purl.org/net/powermagpie/store/' + (new UUID() + '').toLowerCase();
    console.log(lastNid);
    $("#" + lastNid).attr({
				//'about': 	about,
                //'instanceof': uri,
				'rel': 'model',
				'href':	uri
                //'title':    uri,
				//'property': 'content:item',
				//'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
				//'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
               // 'xmlns:oguid': 'http://openguid.net/rdf#',
                //'node': node
			});//.addClass('mref');
    
    /* $("#" + lastNid).attr({
				'about': 	about,
                //'instanceof': uri,
				'rel': 'oguid:identical',
				'resource':	uri,
                'title':    uri,
				'property': 'content:item',
				'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
				//'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
                'xmlns:oguid': 'http://openguid.net/rdf#',
                'node': node
			}).addClass('mref');*/

     PowerMagpie.tagged(lastNid, $("#" + lastNid).text(), uri, node);
}
(function(){

	var namespace 	  = 'http://purl.org/net/powermagpie';

	window[namespace].$.extend(
		window[namespace],
		{

			init: 	function() {
                        setTimeout('poll()', 2000);
                        with(window[namespace]){
    var pmui = document.createElement('div');
    pmui.id = "c3f22685-79cc-4ed6-b833-2ff9f61a5a33";
    pmui.innerHTML = "<div id='c3f22685-79cc-4ed6-b833-2ff9f61a5a33-logo'><div id='pmproc'><img src='"+base+"/Icons/mini_icons2/wand.gif' onclick='process();' /><img src='"+base+"/Icons/mini_icons2/cross.gif' onclick='remove();' /></div><img src='"+base+"/m.png' /></div>"
    	+ "<form target='_new' style='display: none' id='pmform1' method='post' action='"+base+"/html'>"
    	+ "<textarea name='pmtxt1' id='pmtxt1'></textarea></form>"
    	    	+ "<form target='_new' style='display: none' id='pmform2' method='post' action='"+base+"/rdf'>"
    	+ "<textarea name='pmtxt2' id='pmtxt2'></textarea></form>"
        + "<iframe id='pmframe' name='pmframe' frameborder='0' scrolling='no' src='"+base+"/UI/?"+Math.random()+"#"+session+"'></iframe>";
    
    document.body.appendChild(pmui);

    setTimeout(function(){
        $("#c3f22685-79cc-4ed6-b833-2ff9f61a5a33").draggable();
        $("#c3f22685-79cc-4ed6-b833-2ff9f61a5a33").resizable({ autohide: true, minHeight: 400, minWidth: 200 });
    }, 2000);
    PowerMagpie.send("host", "ui:ready");
                        }
					},

            toggle:		function() {
							aler('magick will be here!');
						},

			getXPath: 	function(element){
							var path = "";
					     	for (; element && element.nodeType == 1; element = element.parentNode) {
							       idx = (function(element) {
											var count = 1;
										    for (var sib = element.previousSibling; sib ; sib = sib.previousSibling) {
										        if(sib.nodeType == 1 && sib.tagName == element.tagName) count++;
										    }
										    return count;
									  }(element));
							       xname = element.tagName;
							       if (idx > 1) xname += "[" + idx + "]";
							       path = "/" + xname + path;
							    }
							    return path;
						},

			insert: 	function(data, callback){
							console.log(data);
							var node = document.createElement(data[0]);
							for (attr in data[1]) {
								node.setAttribute(attr, data[1][attr]);
							}
							if (callback !== null) { node.onload = callback; }
							document.getElementsByTagName("head")[0].appendChild(node);
						},

			session: 	'http://purl.org/net/powermagpie/store/'
						+ (new UUID()
						+ '').toLowerCase()
		});

}());


