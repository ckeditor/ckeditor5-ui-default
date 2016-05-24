/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic list view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */

export default class ListView extends View {
	constructor( model ) {
		super( model );

		this.template = {
			tag: 'ul',

			attributes: {
				class: [
					'ck-reset',
					'ck-list'
				]
			}
		};

		this.register( 'list', el => el );
	}
}