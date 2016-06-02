/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../../ui/view.js';
import Template from '/ckeditor5/ui/template.js';

/**
 * The basic icon view class.
 *
 * @memberOf ui.icon
 * @extends ui.View
 */
export default class IconView extends View {
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = new Template( {
			tag: 'svg',
			ns: 'http://www.w3.org/2000/svg',
			attributes: {
				class: [
					'ck-icon',
					bind.to( 'align', a => a ? `ck-icon-${ a.toLowerCase() }` : '' )
				]
			},
			children: [
				{
					tag: 'use',
					ns: 'http://www.w3.org/2000/svg',
					attributes: {
						href: {
							ns: 'http://www.w3.org/1999/xlink',
							value: bind.to( 'icon', i => `#ck-icon-${ i }` )
						}
					}
				}
			]
		} );
	}
}
