/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic dropdown panel view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.Viewa
 */

export default class DropdownPanelView extends View {
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-dropdown__panel',
					bind.if( 'isOn', 'ck-dropdown__panel-active' )
				]
			}
		};

		this.register( 'content', el => el );
	}
}
