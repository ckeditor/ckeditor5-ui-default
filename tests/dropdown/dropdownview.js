/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import testUtils from '/tests/ckeditor5/_utils/utils.js';
import DropdownView from '/ckeditor5/ui/dropdown/dropdownview.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'DropdownView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			isOn: false,
			isEnabled: true
		} );

		view = new DropdownView( model );
	} );

	describe( 'constructor', () => {
		it( 'registers "dropdown" region', () => {
			expect( view.regions.get( 0 ).name ).to.be.equal( 'dropdown' );
		} );

		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-dropdown' ) ).to.be.true;
		} );
	} );
} );
