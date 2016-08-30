/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Lukas Krocek @lkrocek
 */
var i = 0,
	chars = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ',
	charsLength = chars.length;


function ShortNamedModulesPlugin(options) {

	this.options = options || {};

}

module.exports = ShortNamedModulesPlugin;


ShortNamedModulesPlugin.prototype.apply = function(compiler) {

	compiler.plugin("compilation", function(compilation) {

		compilation.plugin("before-module-ids", function(modules) {

			var floor = Math.floor,
				min = Math.min;


			modules.forEach(function(module) {

				if(module.id === null) {
					var next,
						str = '',
						pos = i++;

					str += chars[pos % charsLength];

					while (next = floor(min(charsLength, pos / charsLength))) {
						str = chars[next] + str;
						pos -= next * charsLength;
					}

					module.id = str;

				}

			}, this);

		}.bind(this));

	}.bind(this));

};
