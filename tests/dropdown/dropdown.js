/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import Model from '/ckeditor5/ui/model.js';

import Button from '/ckeditor5/ui/button/button.js';
import DropdownButtonView from '/ckeditor5/ui/dropdown/dropdownbuttonview.js';

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';

describe( 'Dropdown', () => {
	let model, dropdown;

	beforeEach( () => {
		model = new Model();
		dropdown = new Dropdown( model );
	} );

	describe( 'constructor', () => {
		it( 'creates dropdown button', () => {
			expect( dropdown.button ).to.be.instanceof( Button );
			expect( dropdown.button.view ).to.be.instanceof( DropdownButtonView );
		} );

		it( 'creates dropdown panel', () => {
			expect( dropdown.panel ).to.be.instanceof( DropdownPanel );
			expect( dropdown.panel.view ).to.be.instanceof( DropdownPanelView );
		} );

		it( 'appends button and panel to dropdown collection', () => {
			expect( dropdown.collections.get( 'dropdown' ) ).to.have.length( 2 );
			expect( dropdown.collections.get( 'dropdown' ).get( 0 ) ).to.equal( dropdown.button );
			expect( dropdown.collections.get( 'dropdown' ).get( 1 ) ).to.equal( dropdown.panel );
		} );
	} );
} );
