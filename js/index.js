$(function(){
	var canvas = $("#canvas")[0];
	var count = 1;
	canvas.width = 920;
	canvas.height = 550;
	var context = canvas.getContext("2d");
	
	function draw() {
		var radian = 0;
		var radian_add = Math.PI / 180;
		context.beginPath();
		context.translate(250, 250);
		context.moveTo(getX(radian), getY(radian)); //移动绘图游标至原点
	
		while(radian <= (Math.PI * 2)) {
			radian += radian_add;
			var X = getX(radian);
			var Y = getY(radian);
			context.lineTo(X, Y);
		}
		context.strokeStyle = "red";
		context.stroke()
	}
	//画心
	function drawHeart() {
		var heartPic = new Image();
		heartPic.src = "img/heart.png";
	
		var pi = Math.PI;
		var lineId;
		var radian = 0;
		var radian_add = pi / 40;
	
		var lineX = 0;
		var lineX_add = 20;
		context.translate(260, 260);
		//画 那根线
		function line() {
			var lineY = getLineY(lineX);
			context.drawImage(heartPic, lineX, lineY, 30, 30);
			lineX += lineX_add;
			//console.log(lineX);
			if(lineX > 800) {
				count = 1;
				clearInterval(lineId);
				canvas.height = 520;
				drawHeart()
			}
		}
		function heart() {
			var X1 = getX1(radian);
			var Y1 = getY1(radian);
			context.drawImage(heartPic, X1, Y1, 30, 30); //在给定坐标绘制给定大小的图片
			radian += radian_add;
		
			if(radian > (2 * Math.PI)) {
				count = count + 1;
				context.translate(260, 0)
				if(count == 3) {
					context.translate(-780, 260);
					clearInterval(intervalId); //绘制完整的心型线后取消间歇调用 
					lineId = setInterval(line, 100);
				}
				if(count < 3) {
					radian = 0;
				}
				//context.clearRect(-260,-260,canvas.width,canvas.height);
				//context.translate(520,0);
			}
		}
		intervalId = setInterval(heart, 100); //设置间歇调用，间隔为100ms
		
	}
	//鼠标特效
	function showClick() {
		var a_idx = 0;
		$("html").on("click", function(e) {
			var a = new Array("Lp", "爱你", "cute", "love lp", "hahaha", "爱生活", "爱吹比", "爱媳妇", "不想单身");
			a_idx = Math.ceil(Math.random() * a.length) - 1;
			var $i = $("<span />").text(a[a_idx]);
			//alert(a[a_idx]);
			var x = e.pageX,
				y = e.pageY;
			if(a[a_idx] == "爱你") {
				$i.css({
					"z-index": 9,
					"top": y - 20,
					"left": x,
					"font-size": 60,
					"position": "absolute",
					"font-weight": "bold",
					"color": "#ff0000"
				});
			} else {
				$i.css({
					"z-index": 9,
					"top": y - 20,
					"left": x,
					"font-size": 20,
					"position": "absolute",
					"font-weight": "bold",
					"color": "#ff6651"
				});
			};
			$("html").append($i);
			$i.animate({
					"top": y - 180,
					"opacity": 0
				},
				2000,
				function() {
					$i.remove();
				});
		});
	}
	
	function getX(t) { //获取玫瑰线的X坐标
		return 200 * Math.sin(4 * t) * Math.cos(t);
	}
	
	function getY(t) { //获取玫瑰线的Y坐标
		return 200 * Math.sin(4 * t) * Math.sin(t);
	}
	
	function getX1(t) { //获取心型线的X坐标
		return 15 * (16 * Math.pow(Math.sin(t), 3));
	}
	
	function getY1(t) { //获取心型线的Y坐标
		return -15 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	}
	
	function getLineY(x) {//获取直线的Y坐标
		return Math.sin(10) * x;
	}
	function showText(){
		var all = document.getElementById("all");
		$(all).show();
		moveAll();
	}
	function moveAll() {
			$("#all").animate({
				height: "50px",
				width: "1600px"
			}, 3000, function() {
				$("#all").animate({
					height: "300px",
					width: "1600px"
				}, 3000, function() {
					//moveAll();
				});
			});
		}
	showClick();
	drawHeart();
	$("#svgs").on('mouseover',function(){
		showText();
		layer.msg('心里都是你', {
		  time:1000,
		  anim:6
		});
	})
	
})
