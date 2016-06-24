/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The ListItemView class.
 *
 * See {@link ui.list.ListItem}.
 *
 * @memberOf ui.list
 * @extends ui.View
 */
export default class ListItemView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bind;

		this.template = new Template( {
			tag: 'li',

			attributes: {
				class: [
					'ck-reset',
					'ck-list__item'
				],
				style: bind.to( 'style' )
			},

			children: [
				{
					text: bind.to( 'label' )
				}
			],

			on: {
				click: bind.to( 'click' )
			}
		} );

		/**
		 * Model of this ListItemView.
		 *
		 * @member {ui.list.ListItemViewModel} ui.list.ListItemView#model
		 */
	}
}

/**
 * The ListItemView {@link ui.Model} interface.
 *
 * @memberOf ui.list
 * @interface ui.list.ListItemViewModel
 */

/**
 * The label of the item.
 *
 * @member {String} ui.list.ListItemViewModel#label
 */

/**
 * (Optional) The DOM style attribute of the item.
 *
 * @member {String} ui.list.ListItemViewModel#style
 */
