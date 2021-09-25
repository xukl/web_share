const progress_area = document.querySelector(".progress-area");

function create_status_line(filename)
{
	const line_template = `\
		<div class="status-block"></div>
		<progress class="progress-bar" value=0></progress>
		<span class="filename"></span>`;
	const line = document.createElement("div");
	line.innerHTML = line_template;
	line.querySelector(".filename").innerText = filename;
	return line;
}

function upload()
{
	for (let file of document.getElementById("File").files)
	{
		const reader = new FileReader();
		const xhr = new XMLHttpRequest();
		const status_line = create_status_line(file.name);
		progress_area.append(status_line);

		const status_block = status_line.querySelector(".status-block");
		const progress_bar = status_line.querySelector(".progress-bar");

		status_block.style.backgroundColor = "#ff0";
		xhr.upload.addEventListener("progress", (e) => {
			if (e.lengthComputable)
				progress_bar.value = e.loaded / e.total;
		}, false);
		xhr.addEventListener("readystatechange", (e) => {
			if (xhr.readyState === 4)
				if (xhr.status === 200)
				{
					progress_bar.value = 1;
					status_block.style.backgroundColor = "#0f0";
				}
				else
					alert(xhr.statusText + "\n" + xhr.responseText);
		}, false);
		xhr.open("POST", "../upload.py?filename=" + encodeURI(file.name));
		xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
		reader.onload = (evt) => { xhr.send(evt.target.result); };
		reader.readAsArrayBuffer(file);
	}
}

function clear_status()
{
	while (progress_area.firstChild)
		progress_area.removeChild(progress_area.firstChild);
}
