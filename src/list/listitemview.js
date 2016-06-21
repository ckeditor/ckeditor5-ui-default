/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The basic list item view class.
 *
 * @memberOf ui.list
 * @extends ui.View
 */
export default class ListItemView extends View {
	/**
	 * Creates a ListItemView instance.
	 *
	 * @param {utils.Observable} model
	 */
	constructor( model ) {
		super( model );

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
	}
}
