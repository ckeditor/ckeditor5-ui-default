/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, box */

import BoxView from '/ckeditor5/ui/box/boxview.js';

describe( 'BoxView', () => {
	let view;

	beforeEach( () => {
		view = new BoxView();

		view.model.set( {
			alignRight: true
		} );

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
			expect( view.element.classList.contains( 'ck-box' ) ).to.be.true;
		} );

		it( 'should registers "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'alignRight attribute', () => {
			it( 'should react on view.model#alignRight', () => {
				expect( view.element.classList.contains( 'ck-box_align_right' ) ).to.be.true;

				view.model.alignRight = false;

				expect( view.element.classList.contains( 'ck-box_align_right' ) ).to.be.false;
			} );
		} );
	} );
} );
