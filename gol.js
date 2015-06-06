// world class
function World(col,row,width,height,color){
	this.col = col;
	this.row = row;
	this.width = width;
	this.height = height;
	this.color = color;
	this.worldArr = [];
	this.callBack;
	var rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttributeNS(null, 'height', width);
        rect.setAttributeNS(null, 'width', height);
        rect.setAttributeNS(null,'stroke',color);
        rect.setAttributeNS(null,'fill',"#ffffff");
    this.place = $(rect);	
}

World.prototype.createWorld = function(placeId) {
	var tempX = 0;
	var tempY = 0;
	var tempCol = [];
	for(var i = 0; i < this.col; i++){
		for(var j = 0; j < this.row; j++){
			var aPlace = this.place.clone();
			aPlace.attr("x",tempX);
			aPlace.attr("y",tempY);
			var aLife = new Life(this.width,this.height,tempX,tempY,false,aPlace);

			tempCol.push(aLife);
			$("#"+placeId).append(aPlace);
			tempY += this.height;
		}
		tempX += this.width;
		tempY = 0;
		this.worldArr.push(tempCol);
		tempCol = [];
	}

};

// World.prototype.play = function() {
// 	for(var i = 0; i < this.col; i++){
// 		for(var j = 0; j < this.row; j++){
// 			var aLife = this.worldArr[i][j];
// 			var count = 0; 
// 			if((i - 1) < 0 ){
// 				this.worldArr[i,j-1].
// 			}
// 			if((j - 1) < 0){

// 			}
// 		}
// 	}
// };

// life class
function Life(width,height,x,y,state,element){
	this.state = state;
	this.position = {"x": x,"y":y};
	this.width = width;
	this.height= height;
	this.element = element;
	this.element.on("click",this.selectHandle.bind(this));
}

Life.prototype.changeState = function() {

	if(this.state){
		this.element.attr("fill","#ffffff");
		this.state = false;
	}else{
		this.element.attr("fill","green");
		this.state= true;
	}
};

Life.prototype.live = function() {
		this.element.attr("fill","green");
		this.state= true;
};

Life.prototype.die = function() {
		this.element.attr("fill","#ffffff");
		this.state = false;
};

Life.prototype.selectHandle = function(fn) {

	if(this.state){
		this.element.attr("fill","#ffffff");
		this.state = false;
	}else{
		this.element.attr("fill","green");
		this.state= true;		
	}
};

function play(world){
	var dieArr = [];
	var liveArr = [];
	for(var i = 0; i < world.col - 1; i++){
		for(var j = 0; j < world.row - 1; j++){
			var aLife = world.worldArr[i][j];
			var count = 0; 

			if(i - 1 < 0){
				if(j - 1 < 0){
					(world.worldArr[i + 1][j].state) && count++;
					(world.worldArr[i + 1][j + 1].state) && count++;
					(world.worldArr[i][j + 1].state) && count++;
				}else{
					//console.log(world.worldArr[i][j-1]);
					(world.worldArr[i][j-1].state) && count++;
					(world.worldArr[i][j + 1].state) && count++;
					(world.worldArr[i+1][j - 1].state) && count++;
					(world.worldArr[i+1][j].state) && count++;
					(world.worldArr[i+1][j + 1].state) && count++;
				}
			}else{
				if(j - 1 < 0){
					(world.worldArr[i][j + 1].state) && count++;

					(world.worldArr[i-1][j].state) && count++;
					(world.worldArr[i-1][j + 1].state) && count++;
					(world.worldArr[i+1][j].state) && count++;
					(world.worldArr[i+1][j + 1].state) && count++;
				}else{
					(world.worldArr[i-1][j-1].state) && count++;
					(world.worldArr[i-1][j].state) && count++;
					(world.worldArr[i-1][j+1].state) && count++;
					(world.worldArr[i][j-1].state) && count++;
					(world.worldArr[i][j+1].state) && count++;
					(world.worldArr[i+1][j-1].state) && count++;
					(world.worldArr[i+1][j].state) && count++;
					(world.worldArr[i+1][j+1].state) && count++;

				}				
			}
			if(count == 0 || count == 1 || count == 4){
				dieArr.push(world.worldArr[i][j]);
			}
			if(count == 3){
				liveArr.push(world.worldArr[i][j]);
			}
			
		}
	}
	
	// change the world
	changeTheWorld(dieArr,false);
	changeTheWorld(liveArr,true);

}

function changeTheWorld(arr,state){
	arr.forEach(function(obj){
		if(state){
			obj.live();
		}else{
			obj.die();
		}
	});
}

var world = new World(25,25,25,25,"red");
world.createWorld("theWorld");
var time;
function startGame(){
	time = setTimeout(function(){
		startGame();
	},300)
	play(world);
}

$("#btnPlay").on("click",function(){
	startGame();
})

$("#btnStop").on("click",function(){
	clearTimeout(time);
});

$("#btnClear").on("click",function(){
	clearTimeout(time);
	for(var i = 0; i < world.col - 1; i++){
		for(var j = 0; j < world.row - 1; j++){
			world.worldArr[i][j].die();
		}
	}
})