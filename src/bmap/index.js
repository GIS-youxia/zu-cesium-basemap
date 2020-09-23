class BmapImageryProvider {
	constructor(options = {}) {
		const IMG_URL = 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46';
		const VEC_URL = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020';
		const CUSTOM_URL = 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid={style}';
		this._url = options.style === 'img' ? IMG_URL : options.style === 'vec' ? VEC_URL : CUSTOM_URL;
		this._tileWidth = 256;
		this._tileHeight = 256;
		this._maximumLevel = 18;
		this._tilingScheme = new Cesium.WebMercatorTilingScheme({
			rectangleSouthwestInMeters: new Cesium.Cartesian2(-33554054, -33746824),
			rectangleNortheastInMeters: new Cesium.Cartesian2(33554054, 33746824),
		});
		this._rectangle = this._tilingScheme.rectangle;
		this._credit = undefined;
		this._style = options.style || 'normal';
	}
	get url() {
		return this._url;
  }
	get token() {
		return this._token;
	}
	get tileWidth() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('tileWidth must not be called before the imagery provider is ready.');
		}
		return this._tileWidth;
	}

	get tileHeight() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('tileHeight must not be called before the imagery provider is ready.');
		}
		return this._tileHeight;
	}

	get maximumLevel() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
		}
		return this._maximumLevel;
	}

	get minimumLevel() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
		}
		return 0;
	}

	get tilingScheme() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
		}
		return this._tilingScheme;
	}

	get rectangle() {
		if (!this.ready) {
			throw new Cesium.DeveloperError('rectangle must not be called before the imagery provider is ready.');
		}
		return this._rectangle;
	}

	get ready() {
		return !!this._url;
	}

	get credit() {
		return this._credit;
	}

	get hasAlphaChannel() {
		return true;
	}
	getTileCredits(x, y, level) {}

	requestImage(x, y, level) {
		if (!this.ready) {
			throw new Cesium.DeveloperError('requestImage must not be called before the imagery provider is ready.');
		}
		let xTiles = this._tilingScheme.getNumberOfXTilesAtLevel(level);
		let yTiles = this._tilingScheme.getNumberOfYTilesAtLevel(level);
		let url = this._url
			.replace('{x}', x - xTiles / 2)
			.replace('{y}', yTiles / 2 - y - 1)
			.replace('{z}', level)
			.replace('{s}', 1)
			.replace('{style}', this._style);
		return Cesium.ImageryProvider.loadImage(this, url);
	}
}

export default BmapImageryProvider;
