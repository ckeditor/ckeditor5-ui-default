/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../../ui/view.js';
import Template from '../template.js';

/**
 * The icon view class.
 *
 * See {@link ui.icon.Icon}.
 *
 * @memberOf ui.icon
 * @extends ui.View
 */
export default class IconView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bind;

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
							value: bind.to( 'name', i => `#ck-icon-${ i }` )
						}
					}
				}
			]
		} );

		/**
		 * Model of this icon view.
		 *
		 * @member {ui.icon.IconViewModel} ui.icon.IconView#model
		 */
	}
}

/**
 * The icon view {@link ui.Model} interface.
 *
 * @interface ui.icon.IconViewModel
 */

/**
 * The name of the icon. It corresponds with the name of the
 * file in the {@link ui.iconManager.IconManager}.
 *
 * @member {String} ui.icon.IconViewModel#name
 */

/**
 * The alignment of the icon.
 *
 * @member {'left'|'right'} ui.icon.IconViewModel#align
 */
