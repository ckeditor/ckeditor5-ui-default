/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import DropdownButtonView from '/ckeditor5/ui/dropdown/dropdownbuttonview.js';

describe( 'DropdownButtonView', () => {
	let view;

	beforeEach( () => {
		view = new DropdownButtonView( null );
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-dropdown__button' ) ).to.be.true;
		} );
	} );
} );
