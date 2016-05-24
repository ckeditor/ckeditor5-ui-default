/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, list */

'use strict';

import ListView from '/ckeditor5/ui/list/listview.js';

describe( 'ListView', () => {
	let view;

	beforeEach( () => {
		view = new ListView();
	} );

	describe( 'constructor', () => {
		it( 'registers "list" region', () => {
			expect( view.regions ).to.have.length( 1 );
			expect( view.regions.get( 0 ).name ).to.be.equal( 'list' );

			view.init();

			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );

		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-reset' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-list' ) ).to.be.true;
		} );
	} );
} );
