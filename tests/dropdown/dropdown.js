/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

import Model from '/ckeditor5/ui/model.js';

import Dropdown from '/ckeditor5/ui/dropdown/dropdown.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

import Button from '/ckeditor5/ui/button/button.js';
import DropdownButtonView from '/ckeditor5/ui/dropdown/dropdownbuttonview.js';

import DropdownPanel from '/ckeditor5/ui/dropdown/dropdownpanel.js';
import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';

import utilsTestUtils from '/tests/utils/_utils/utils.js';

const assertBinding = utilsTestUtils.assertBinding;

describe( 'Dropdown', () => {
	let model, dropdown;

	beforeEach( () => {
		model = new Model( {
			isEnabled: true,
			label: 'foo',
			isOn: false,
			withText: true
		} );
		dropdown = new Dropdown( model, new DropdownView() );
	} );

	describe( 'constructor', () => {
		it( 'appends button and panel to dropdown collection', () => {
			expect( dropdown.collections.get( 'main' ) ).to.have.length( 2 );
			expect( dropdown.collections.get( 'main' ).get( 0 ) ).to.equal( dropdown.button );
			expect( dropdown.collections.get( 'main' ).get( 1 ) ).to.equal( dropdown.panel );
		} );
	} );

	describe( '_createButton', () => {
		it( 'creates Button component', () => {
			expect( dropdown.button ).to.be.instanceof( Button );
			expect( dropdown.button.view ).to.be.instanceof( DropdownButtonView );
		} );

		it( 'binds Button#model to the #model', () => {
			assertBinding( dropdown.button.model,
				{ isEnabled: true, label: 'foo', isOn: false, withText: true },
				[
					[ model, { isEnabled: false, label: 'bar', isOn: true, withText: false } ]
				],
				{ isEnabled: false, label: 'bar', isOn: true, withText: false }
			);
		} );

		it( 'creates a listener which updates view.model#isOpen when button fires #execute', () => {
			const buttonModel = dropdown.button.model;
			const viewModel = dropdown.view.model;

			buttonModel.fire( 'execute' );
			expect( viewModel.isOpen ).to.be.true;

			buttonModel.fire( 'execute' );
			expect( viewModel.isOpen ).to.be.false;
		} );
	} );

	describe( '_createPanel', () => {
		it( 'creates DropdownPanel component', () => {
			expect( dropdown.panel ).to.be.instanceof( DropdownPanel );
			expect( dropdown.panel.view ).to.be.instanceof( DropdownPanelView );
		} );

		it( 'binds DropdownPanel#model to the view#model', () => {
			assertBinding( dropdown.panel.model,
				{ isVisible: false },
				[
					[ dropdown.view.model, { isOpen: true } ]
				],
				{ isVisible: true }
			);
		} );
	} );
} );
