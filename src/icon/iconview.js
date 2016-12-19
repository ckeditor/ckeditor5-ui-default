/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module ui/icon/iconview
 */

import View from '../../ui/view.js';
import Template from '../template.js';

/**
 * The icon view class.
 *
 * @extends module:ui/view~View
 */
export default class IconView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		/**
		 * The inline SVG or in legacy mode the name of the icon
		 * which corresponds with the name of the file in the
		 * {@link module:theme/iconmanagermodel~IconManagerModel}.
		 *
		 * @observable
		 * @member {String} #content
		 */
		this.set( 'content' );

		this.template = new Template( {
			tag: 'svg',
			ns: 'http://www.w3.org/2000/svg',
			attributes: {
				class: 'ck-icon',
				viewBox: '0 0 20 20'
			}
		} );
	}

	init() {
		/**
		 * This is a hack for lack of innerHTML binding.
		 * See: https://github.com/ckeditor/ckeditor5-ui/issues/99.
		 */
		return super.init().then( () => {
			this.on( 'change:content', ( evt, name, value ) => {
				this.element.innerHTML = getIconContent( value );
			} );

			this.element.innerHTML = getIconContent( this.content );
		} );
	}
}

// Analyzes which type of content is provided and returns it in proper format.
//
// Temporarily 2 types of icon content are supported:
// * Inline SVG - content of svg file as plan text.
// * Icon name (legacy) - name of icon corresponds with name of the file in the {@link module:theme/iconmanagermodel~IconManagerModel}.
//
// @param {String} content
// @returns {String}
function getIconContent( content ) {
	return /</.test( content ) ? extractSvgContent( content ) : `<use xlink:href="#ck-icon-${ content }"></use>`;
}

// Extracts content which is inside <svg></svg> tag.
// It removes new line characters and then extracts content of svg.
//
// @param {String} svgContent svg xml.
// @returns {String}
function extractSvgContent( svgContent ) {
	return /<[svg][^>]*>(.*)<\/svg>/.exec( svgContent.replace( /\r?\n|\r/g, '' ) )[ 1 ];
}
