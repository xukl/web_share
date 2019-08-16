var ctrl = document.getElementById("progress");

function upload()
{
	var reader = new FileReader();
	var xhr = new XMLHttpRequest();
	var file = document.getElementById("File").files[0];

	xhr.upload.addEventListener("progress", function(e) {
		if (e.lengthComputable)
			ctrl.value = Math.round((e.loaded * 100) / e.total);
	}, false);
	xhr.addEventListener("readystatechange", function(e) {
		if (xhr.readyState == 4)
			if (xhr.status == 200)
				ctrl.value = 100;
			else
				alert(xhr.statusText + "\n" + xhr.responseText);
	}, false);
	xhr.open("POST", "./upload.sh?filename=" + encodeURI(file.name));
	xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
	reader.onload = function(evt) {
		xhr.send(evt.target.result);
	};
	reader.readAsArrayBuffer(file);
}
