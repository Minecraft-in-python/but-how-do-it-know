r = new marked.Renderer();
r.image = (href, title, text) => {
	if (text.indexOf(":left:") == 0) {
		return `<img alt="${text.slice(6)}" src="${href}">`;
	} else if (text.indexOf(":right:") == 0) {
		return `<div align="right"><img alt="${text.slice(7)}" src="${href}"></div>`;
	} else {
		return `<div align="center"><img alt="${text}" src="${href}"></div>`;
	}
}
marked.setOptions({renderer: r});

$(document).ajaxError(() => {
	alert("章节不存在");
});

function render(n, e) {
	$.get(n, (data, s) => {
		if (s == "success") {
			$(e).html(marked(data));
			document.title = $(`${e} h1`).first().text();
			$(e).find("a").each((i, j) => {
				if (($(j).attr("href").indexOf("//") == -1) && ($(j).attr("href").indexOf(".md") == $(j).attr("href").length - 3)) {
					$(j).attr("href", `javascript:render("${$(j).attr("href")}", "${e}")`);
				}
			});
			Cookies.set("page", f, {"expires": 7});
			$("body").scrollTop(0);
		}
	});
}

$(window).scroll(() => {
	if ($(window).scrollTop() < 100) {
		if ($(".back-top").css("display") != "none") {
			$(".back-top").fadeOut("normal");
		}
	} else {
		if ($(".back-top").css("display") == "none") {
			$(".back-top").fadeIn("normal");
		}
	}
});

