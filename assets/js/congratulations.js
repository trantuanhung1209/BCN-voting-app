//congratulations

function randomInt(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var t = 0;

function clearCanvas(){
	ctx.fillStyle = "rgba(0,0,0,.1)";
	ctx.fillRect(0, 0, width, height);
}

clearCanvas();

function circle(x,y,radius){
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.closePath();
}

/* ----------------- */

var seedsAmount = 1;
var seeds = [];
var particles = [];
var auto = true;

for(var i = 0; i < seedsAmount; i++){
	var seed = new Seed(width/2, height - 40, 180, [randomInt(0,359), '100%', '50%']);
	seeds.push(seed);
}

/* ---------------- */

function loop(){

	clearCanvas();

	ctx.globalCompositeOperation = 'lighter';

	for(var i = 0; i < seeds.length; i++){
		if(!seeds[i].dead){
			seeds[i].move();
			seeds[i].draw();
		}else{
			seeds.splice(i, 1);
		}
	}

	for(var i = 0; i < particles.length; i++){
		if(!particles[i].dead){
			particles[i].move();
			particles[i].draw();
		}else{
			particles.splice(i, 1);
		}
	}

	if(auto && t%5==0){
		var seed = new Seed(randomInt(20, width-20), height-20, randomInt(175, 185), [randomInt(0,359), '100%', '50%']);
		seeds.push(seed);
	}

	ctx.globalCompositeOperation = 'source-over';
	
	requestAnimationFrame(loop);
	t++;
}

function Seed(x,y,angle,color){
	this.x = x;
	this.y = y;
	this.acceleration = 0.05;
	this.radius = 3;
	this.angle = angle;
	this.h = color[0]; this.s = color[1]; this.l = color[2];
	this.color = 'hsla('+this.h+','+this.s+','+this.l+', 1)';
	this.speed = 2;
	this.dead = false;

	this.move = function(){
		if(this.y > randomInt(100, 200)){
			this.speed += this.acceleration;

			this.x += this.speed * Math.sin(Math.PI / 180 * this.angle);
			this.y += this.speed * Math.cos(Math.PI / 180 * this.angle);
		}else{
			if(!this.dead){
				this.explode();
				this.dead = true;
				notClear = true;
			}
		}
	}

	this.draw = function(){
		ctx.fillStyle = this.color;
		circle(this.x, this.y, this.radius);
		ctx.fill();
	}

	this.explode = function(){
		for(var i = 0; i < 359; i+=4){
			var particle = new Firework(this.x, this.y, i+randomInt(-200,200)/100, [this.h, this.s, this.l]);
			particles.push(particle);
		}
	}


}

function Firework(x,y,angle,color){
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.angleOffset = randomInt(-20,20)/100;
	this.color = color;
	this.opacity = 1;
	this.finalColor = 'hsla('+this.color[0]+','+this.color[1]+','+this.color[2]+','+this.opacity+')';
	this.gravity = 0.01;
	this.verticalSpeed = 0;
	this.speed = randomInt(195,205)/100;
	this.radius = 1;
	this.acceleration = -0.01;

	this.move = function(){
		if(this.opacity>0){
			if(this.speed>0){
				this.speed += this.acceleration;
			}

			this.angle+=this.angleOffset;

			this.opacity-=0.005;
			this.finalColor = 'hsla('+this.color[0]+','+this.color[1]+','+this.color[2]+','+this.opacity+')';

			this.verticalSpeed += this.gravity;

			this.x += this.speed * Math.sin(Math.PI / 180 * this.angle);
			this.y += this.speed * Math.cos(Math.PI / 180 * this.angle) + this.verticalSpeed;
		}else{
			if(!this.dead){
				this.dead = true;
			}
		}
	}

	this.draw = function(){
		ctx.fillStyle = this.finalColor;
		circle(this.x, this.y, this.radius);
		ctx.fill();
	}
}

loop();


window.addEventListener('click', function(e){
	var seed = new Seed(e.pageX, e.pageY, randomInt(175, 185), [randomInt(0,359), '100%', '50%']);
	seeds.push(seed);
});

window.addEventListener('resize', function(){
	width = window.innerWidth;
	height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	clearCanvas();
});