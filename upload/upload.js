var ctrl = document.getElementById("progress");

function upload()
{
	var reader = new FileReader();
	var xhr = new XMLHttpRequest();
	var file = document.getElementById("File").files[0];

	xhr.upload.addEventListener("progress", function(e) {
		if (e.lengthComputable)
		{
			var percentage = Math.round((e.loaded * 100) / e.total);
			ctrl.value = percentage;
		}
	}, false);
	xhr.upload.addEventListener("load", function(e) {
		ctrl.value = 100;
	}, false);
	xhr.open("POST", "./upload.sh?filename=" + encodeURI(file.name));
	xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
	reader.onload = function(evt) {
		xhr.send(evt.target.result);
	};
	reader.readAsArrayBuffer(file);
}
