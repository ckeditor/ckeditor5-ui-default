/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '/ckeditor5/ui/template.js';

/**
 * The basic dropdown panel view class.
 *
 * @memberOf ui.dropdown
 * @extends ui.View
 */
export default class DropdownPanelView extends View {
	/**
	 * Creates a DropdownPanelView instance.
	 *
	 * @param {utils.Observable} model
	 */
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = new Template( {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-dropdown__panel',
					bind.if( 'isOn', 'ck-dropdown__panel-active' )
				]
			}
		} );

		this.register( 'content', el => el );
	}
}
