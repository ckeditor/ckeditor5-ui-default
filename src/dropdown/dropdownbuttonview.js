/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import ButtonView from '/ckeditor5/ui/button/buttonview.js';

/**
 * The basic dropdown buttonview class.
 *
 * @memberOf ui.dropdown
 * @extends ui.button.ButtonView
 */

export default class DropdownButtonView extends ButtonView {
	constructor( model ) {
		super( model );

		this.template.attributes.class.push( 'ck-dropdown__button' );
	}
}
