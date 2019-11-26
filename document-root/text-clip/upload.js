var status_block = document.getElementById("status");

function upload()
{
	var xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function(e) {
		if (xhr.readyState == 4)
			if (xhr.status == 200)
				status_block.style.backgroundColor="#0f0";
			else
				alert(xhr.statusText + "\n" + xhr.responseText);
	}, false);
	var text_title = document.getElementById("title").value || "untitled";
	xhr.open("POST", "./upload.sh?title=" + encodeURI(text_title) + ".txt");
	xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
	xhr.send(document.getElementById("main-text").value);
}

function clear_status()
{
	status_block.style.backgroundColor="#f00";
}
