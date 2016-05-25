/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import DropdownPanelView from '/ckeditor5/ui/dropdown/dropdownpanelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'DropdownPanelView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			isOn: false
		} );

		view = new DropdownPanelView( model );
	} );

	describe( 'constructor', () => {
		it( 'registers "content" region', () => {
			expect( view.regions ).to.have.length( 1 );
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );

			view.init();

			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );

		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-reset' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-dropdown__panel' ) ).to.be.true;
		} );
	} );

	describe( 'panel bindings', () => {
		describe( 'class', () => {
			it( 'reacts on model.isOn', () => {
				expect( view.element.classList.contains( 'ck-dropdown__panel-active' ) ).to.be.false;

				model.isOn = true;
				expect( view.element.classList.contains( 'ck-dropdown__panel-active' ) ).to.be.true;

				model.isOn = false;
				expect( view.element.classList.contains( 'ck-dropdown__panel-active' ) ).to.be.false;
			} );
		} );
	} );
} );
