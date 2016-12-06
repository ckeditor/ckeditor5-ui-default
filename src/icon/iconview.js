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

		const bind = this.bindTemplate;

		this.template = new Template( {
			tag: 'svg',
			ns: 'http://www.w3.org/2000/svg',
			attributes: {
				class: [
					'ck-icon'
				]
			},
			children: [
				{
					tag: 'use',
					ns: 'http://www.w3.org/2000/svg',
					attributes: {
						href: {
							ns: 'http://www.w3.org/1999/xlink',
							value: bind.to( 'name', name => `#ck-icon-${ name }` )
						}
					}
				}
			]
		} );

		/**
		 * The name of the icon. It corresponds with the name of the
		 * file in the {@link module:theme/iconmanagermodel~IconManagerModel}.
		 *
		 * @observable
		 * @member {String} #name
		 */
	}
}
