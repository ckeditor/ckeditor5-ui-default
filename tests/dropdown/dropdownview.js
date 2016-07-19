/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';

describe( 'DropdownView', () => {
	let view;

	beforeEach( () => {
		view = new DropdownView();
	} );

	describe( 'constructor', () => {
		it( 'sets model#isOpen false', () => {
			expect( view.model.isOpen ).to.be.false;
		} );

		it( 'registers "dropdown" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'main' );

			view.init();

			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );

		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-dropdown' ) ).to.be.true;
		} );
	} );
} );
