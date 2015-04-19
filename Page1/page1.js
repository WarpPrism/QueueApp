var curtain1;
var curtain2;
var span1;
var span2;
var head;
var start;
var garden;
var canvas;
var context;
var n;
var Fi;
var index;

window.onload = function() {
	init();
	openCurtain();
	setTimeout(disableCurtain, 5100);
	setTimeout(startLissajousAnimation, 6000);
}

function init() {
	n = 1;
	Fi = 0;
	index = 0;
	wrap = document.getElementById("wrap");
	curtain1 = document.getElementById("curtain1");
	curtain2 = document.getElementById("curtain2");
	span1 = curtain1.getElementsByTagName("span");
	span2 = curtain2.getElementsByTagName("span");
	garden = document.getElementById("garden");
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.globalCompositeOperation = "lighter";
	garden = new Garden(context, canvas);
	setInterval(function() {
		garden.render();
	}, Garden.options.growSpeed);
}

function openCurtain() {
	span1[0].style.opacity = "1";
	span1[0].style.top = "300px";
	span1[0].style.transform = "rotate(360deg)";

	span2[0].style.opacity = "1";
	span2[0].style.top = "300px";
	span2[0].style.transform = "rotate(360deg)";

	curtain1.style.width = "0px";
	curtain1.style.opacity = "0";
	curtain1.style.background = "lightblue";

	curtain2.style.width = "0px";
	curtain2.style.opacity = "0";
	curtain2.style.background = "lightblue";
}

function disableCurtain() {
	wrap.removeChild(curtain1);
	wrap.removeChild(curtain2);
}

//Heart curve
function getHeartCurveCoordinate(s) {
	var t = s / Math.PI;
	var x = 15 * (16 * Math.pow(Math.sin(t), 3));
	var y = -16 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(300 + x, 280 + y);
}

//利萨茹(Lissajous)曲线
function getLissajousCurveCoordinate(s, n, Fi) {
	var t = s;
	var x = 200 * Math.sin(t);
	var y = 200 * Math.sin(n * t + Fi);
	return new Array(300 + x, 280 + y);
}

// y = x^3
/*function getCurveCoordinate(s) {
	var x = s;
	var y = -0.0001 * Math.pow(x, 3);
	return new Array(300 + x, 300 + y);
}*/

function startLissajousAnimation() {
	index++;
	var s = -100;
	var b = new Array();
	var a = setInterval(function() {
		var h = getLissajousCurveCoordinate(s, n, Fi);
		var e = true;
		for (var f = 0; f < b.length; f++) {
			var g = b[f];
			var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
			if (j < Garden.options.bloomRadius.max * 1.3) {
				e = false;
				break;
			}
		}
		if (e) {
			b.push(h);
			garden.createRandomBloom(h[0], h[1])
		}
		if (s >= 50) {
			clearInterval(a);
			clearCanvas();
			switch (index) {
				case 1:
					Fi = Math.PI / 2;
					startLissajousAnimation();
					break;
				case 2:
					Fi = Math.PI / 3;
					startLissajousAnimation();
					break;
				case 3:
					n = 2;
					Fi = Math.PI / 2;
					startLissajousAnimation();
					break;
				case 4:
					Fi = 0;
					startLissajousAnimation();
					break;
				case 5:
					Fi = Math.PI / 3;
					startLissajousAnimation();
					break;
				case 6:
					startHeartAnimation();
				default:
					break;
			}
		} else {
			s += 0.2
		}
	}, 10)
}

function startHeartAnimation() {
	var s = -80;
	var b = new Array();
	var a = setInterval(function() {
		var h = getHeartCurveCoordinate(s);
		var e = true;
		for (var f = 0; f < b.length; f++) {
			var g = b[f];
			var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
			if (j < Garden.options.bloomRadius.max * 1.3) {
				e = false;
				break;
			}
		}
		if (e) {
			b.push(h);
			garden.createRandomBloom(h[0], h[1])
		}
		if (s >= 100) {
			clearInterval(a);
			return;
		} else {
			s += 0.2
		}
	}, 50)
}

function clearCanvas() {
	context.clearRect(0, 0, 600, 600);
	canvas.width = canvas.width;
}