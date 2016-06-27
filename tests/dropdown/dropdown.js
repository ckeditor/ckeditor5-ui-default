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

import utilsTestUtils from '/tests/utils/_utils/utils.js';

const assertBinding = utilsTestUtils.assertBinding;

describe( 'Dropdown', () => {
	let model, sharedModel, dropdown;

	beforeEach( () => {
		model = new Model( {
			isEnabled: true,
			label: 'foo'
		} );
		dropdown = new Dropdown( model );
		sharedModel = dropdown.sharedModel;
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
			expect( dropdown.collections.get( 'main' ) ).to.have.length( 2 );
			expect( dropdown.collections.get( 'main' ).get( 0 ) ).to.equal( dropdown.button );
			expect( dropdown.collections.get( 'main' ).get( 1 ) ).to.equal( dropdown.panel );
		} );

		it( 'creates sharedModel for child components', () => {
			assertBinding( sharedModel,
				{ isEnabled: true, label: 'foo', isOn: false },
				[
					[ model, { isEnabled: false, label: 'bar', isOn: true } ]
				],
				{ isEnabled: false, label: 'bar', isOn: false }
			);
		} );
	} );

	describe( 'sharedModel', () => {
		describe( '#execute event', () => {
			it( 'updates #isOn', () => {
				sharedModel.fire( 'execute' );
				expect( sharedModel.isOn ).to.be.true;

				sharedModel.fire( 'execute' );
				expect( sharedModel.isOn ).to.be.false;

				model.isEnabled = false;

				sharedModel.fire( 'execute' );
				expect( sharedModel.isOn ).to.be.false;
			} );

			it( 'is passed to the main model', ( done ) => {
				model.on( 'execute', ( evt, foo, bar ) => {
					expect( foo ).to.equal( 'foo' );
					expect( bar ).to.equal( 'bar' );

					done();
				} );

				sharedModel.fire( 'execute', 'foo', 'bar' );
			} );
		} );
	} );
} );
