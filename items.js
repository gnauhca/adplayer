function Item(key) {
	this.isLoad = false;
	this.wrap = key;
	this.observers = [];
}

Item.prototype.load = function() {
	var $img = $(this.wrap).find("img"),
		that = this,
		loading = false;

	if (loading) return;
	loading = true;
	$img.on("load", function() {
		$img.show();
		that.isLoad = true;
		for (var i = 0; i < that.observers.length; i++) {
			if (typeof that.observers[i] == "function") {
				that.observers[i](that);
			}
		}
	});
	$img.attr("src", $img.attr("imgsrc"));		
}


Item.prototype.addObserver = function(observer) {
	for (var i = 0; i < this.observers.length; i++) {
		if (this.observers[i] == observer) {
			return;
		}
	}
	this.observers.push(observer);
}

Item.prototype.show = function() {
	if (this.isLoad) {
		return true;
	} else {
		this.load();
		return false;
	}
}