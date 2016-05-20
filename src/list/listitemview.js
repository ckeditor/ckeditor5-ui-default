/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic list item view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */

export default class ListItemView extends View {
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = {
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
				click: 'click'
			}
		};
	}
}
