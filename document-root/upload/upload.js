const ctrl = document.getElementById("progress");
const status_block = document.getElementById("status");

function upload()
{
	status_block.style.backgroundColor = "#ff0";
	const reader = new FileReader();
	const xhr = new XMLHttpRequest();
	const file = document.getElementById("File").files[0];

	xhr.upload.addEventListener("progress", (e) => {
		if (e.lengthComputable)
			ctrl.value = Math.round((e.loaded * 100) / e.total);
	}, false);
	xhr.addEventListener("readystatechange", (e) => {
		if (xhr.readyState === 4)
			if (xhr.status === 200)
			{
				ctrl.value = 100;
				status_block.style.backgroundColor="#0f0";
			}
			else
				alert(xhr.statusText + "\n" + xhr.responseText);
	}, false);
	xhr.open("POST", "../upload.py?filename=" + encodeURI(file.name));
	xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
	reader.onload = (evt) => { xhr.send(evt.target.result); };
	reader.readAsArrayBuffer(file);
}

function clear_status()
{
	ctrl.value = 0;
	status_block.style.backgroundColor = "#f00";
}
