function Handler(player) {
	this.index = 0;
	this.player = player;
	this.count = player.count;
	this.autoPlayT = 0;
	this.autoPlayTime = player.effectTime*3;//自动播放等待时间
	this.randomEffect = false;
	this.waitingIndex = -1;
	this.init();
}

Handler.prototype.init = function() {
	//this.autoPlay();

	var that = this;
	//setTimeout(function() {that.player.setIndex(that.index+1)}, 10);

	//创建图片按钮
	this.$btnWrap = $('<div class="pic-btn-wrap"></div>').appendTo(this.player.$wrap);


	for (var i = 0; i < this.count; i++) {
		$('<span class="pic-btn"></span>').appendTo(this.$btnWrap);
	}

	this.$btnWrap.find('.pic-btn').each(function(i) {
		this.onclick = function() {that.setIndex(i);};
	});

	//create btn for left/right change
	var $leftBtn = $("<div class='left-btn'></div>").appendTo(this.player.$wrap),
		$rightBtn = $("<div class='right-btn'></div>").appendTo(this.player.$wrap);

	$leftBtn.on("click",function() {
		that.setIndex(that.index-1);
	});

	$rightBtn.on("click",function() {
		that.setIndex(that.index+1);
	});

	this.player.addObserver(function() {
		clearTimeout(that.autoPlayT);
		if (that.waitingIndex != -1) {
			that.setIndex(that.waitingIndex);
		} else {
			that.autoPlayT = setTimeout(function() {
				that.setIndex(that.index+1);
			}, that.autoPlayTime);			
		}
	});
	this.setIndex(this.index);
}


Handler.prototype.handsetIndex = function(index) { //console.log('try' + index)
	clearInterval(this.autoPlayT);
	this.setIndex(index);
}

Handler.prototype.setIndex = function(index) { //console.log('try' + index)

	index = (index+this.count) % this.count;
	if (this.player.setIndex(index)) {
		this.$btnWrap.find('.pic-btn').removeClass('pic-btn-current');
		this.$btnWrap.find('.pic-btn').eq(index).addClass('pic-btn-current');
		this.index = index;
		this.waitingIndex = -1;
	} else if (this.index != index){
		this.waitingIndex = index;
	}
}


