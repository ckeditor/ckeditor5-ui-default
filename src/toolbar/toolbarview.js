/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic toolbar view class.
 *
 * @memberOf ui.toolbar
 * @extends ui.View
 */
export default class ToolbarView extends View {
	constructor( model ) {
		super( model );

		this.template = {
			tag: 'div',
			attributes: {
				class: [ 'ck-reset ck-toolbar' ]
			}
		};

		this.register( 'buttons', el => el );
	}
}
