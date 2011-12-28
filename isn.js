exports.isnet93_to_wgs84 = function(xx, yy) {
	this.x = xx;
	this.y = yy;

	this.a = 6378137.0;
	this.f = 1/298.257222101;

	this.lat1 = 64.25;
	this.lat2 = 65.75;
	this.latc = 65.00;
	this.lonc = 19.00;

	this.eps = 0.00000000001;



	this.fx = function(p) {
		return  this.a * Math.cos(p/this.rho)/Math.sqrt(1 - Math.pow(this.e*Math.sin(p/this.rho),2));
	}

	this.f1 = function(p) {
		return Math.log( (1 - p)/(1 + p) );
	}

	this.f2 = function(p) {
		return this.f1(p) - this.e * this.f1(this.e * p);
	}

	this.f3 = function(p) {
		return this.pol1*Math.exp( (this.f2(Math.sin(p/this.rho)) - this.f2sin1)*this.sint/2);
	}





	this.rho = 45/Math.atan2(1.0,1.0);;
	this.e = Math.sqrt(this.f * (2 - this.f));

	this.dum = this.f2(Math.sin(this.lat1/this.rho)) - this.f2(Math.sin(this.lat2/this.rho));;
	this.sint = 2 * ( Math.log(this.fx(this.lat1)) - Math.log(this.fx(this.lat2)) ) / this.dum;

	this.f2sin1 = this.f2(Math.sin(this.lat1/this.rho));
	this.pol1 = this.fx(this.lat1)/this.sint;
	this.polc = this.f3(this.latc) + 500000.0;

	this.peq = this.a * Math.cos(this.latc/this.rho)/(this.sint*Math.exp(this.sint*Math.log((45-this.latc/2)/this.rho)));

	this.pol = Math.sqrt( Math.pow(this.x-500000,2) + Math.pow(this.polc-this.y,2));

	this.lat = 90 - 2 * this.rho * Math.atan( Math.exp( Math.log( this.pol / this.peq ) / this.sint ) );
	this.lon = 0;

	this.fact = this.rho * Math.cos(this.lat / this.rho) / this.sint / this.pol;



	this.delta = 1.0;
		while( Math.abs(this.delta) > this.eps ) {
			this.delta = ( this.f3(this.lat) - this.pol ) * this.fact;
			this.lat += this.delta;
		}

	this.lon = -(this.lonc + this.rho * Math.atan( (500000 - this.x) / (this.polc - this.y) ) / this.sint);









	this.getLat = function() {
		return this.lat.toFixed(5);
	}

	this.getLon = function() {
		return this.lon.toFixed(5);
	}
}

