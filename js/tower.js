function Tower(num, width, height, xwidth, dropHandler) {
	this.num = num;
	this.width = width;
	this.height = height;
	this.xwidth = xwidth;
	this.dropHandler = dropHandler;
	this.disks = [];
}

Tower.prototype.getNum = function() {
	return this.num;
}

Tower.prototype.getDisks = function() {
	return this.disks;
}

Tower.prototype.getElement = function() {
	return $("#tower" + this.num);
}

Tower.prototype.getImageElement = function() {
	return $("#towerimg");
}

Tower.prototype.createElement = function() {
	return $("<canvas class='tower' id='tower" + this.num + "' width='" + this.width + "' height='" + this.height + "' />");
}

Tower.prototype.createImageElement = function() {
	return $("<img id='towerimg' src='img/tower.gif' />");
}

Tower.prototype.init = function() {
	this.draw();
	this.setDroppable();
}

Tower.prototype.draw = function() {
	this.getImageElement().load(this.loadImage.bind(this));
}

Tower.prototype.loadImage = function(event) {
	var elem = this.getElement();
	var ctx = elem.get(0).getContext("2d");
	var img = $(event.target);
    ctx.drawImage(img.get(0), (this.width - this.xwidth) / 2, 0, this.xwidth, this.height - this.xwidth);
	ctx.strokeRect((this.width - this.xwidth) / 2, 0, this.xwidth - 1, this.height - this.xwidth - 1);
}

Tower.prototype.setDroppable = function() {
	this.getElement().droppable({ drop: this.dropHandler });
}

Tower.prototype.addDisk = function(disk) {
	this.disks.push(disk);
}

Tower.prototype.removeDisk = function(disk) {
	this.disks.splice(this.disks.indexOf(disk), 1);
}

Tower.prototype.canPlaceDisk = function(disk) {
	var result = true;
	if (this.disks.length > 0) {
		var topDisk = this.disks[this.disks.length - 1];
		if (topDisk.getNum() < disk.getNum()) {
			result = false;
		}
	}
	return result;
}

Tower.prototype.moveDisk = function(disk) {
	var oldTower = disk.getTower();
	oldTower.removeDisk(disk);
	this.addDisk(disk);
	disk.setTower(this);
}

Tower.prototype.updateDraggableDisks = function() {
	for (var i = 0; i < this.disks.length; i++) {
		this.disks[i].setDraggable(i == this.disks.length - 1);
	}
}

Tower.prototype.calcDiskTop = function(num, height) {
	var result = this.height - this.xwidth;
	for (var i = 0; i < this.disks.length; i++) {
		result -= height;
		if (num == this.disks[i].getNum()) {
			break;
		}
	}
	return result;
}

Tower.prototype.calcDiskLeft = function(width) {
	return this.width * this.num + (this.width - width) / 2;
}
