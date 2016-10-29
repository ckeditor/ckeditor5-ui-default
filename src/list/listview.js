/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import View from '../view.js';
import Template from '../template.js';

/**
 * The list view class.
 *
 * See {@link ui.list.List}.
 *
 * @memberOf ui.list
 * @extends ui.View
 */
export default class ListView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		this.items = this.createCollection();

		this.template = new Template( {
			tag: 'ul',

			attributes: {
				class: [
					'ck-reset',
					'ck-list'
				]
			},

			children: this.items
		} );
	}
}
