/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, box */

import Box from '/ckeditor5/ui/box/box.js';
import BoxView from '/ckeditor5/ui/box/boxview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'BoxView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			alignRight: true
		} );

		view = new BoxView();

		return new Box( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
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
			it( 'reacts on model#alignRight', () => {
				expect( view.element.classList.contains( 'ck-box_align_right' ) ).to.be.true;

				model.alignRight = false;

				expect( view.element.classList.contains( 'ck-box_align_right' ) ).to.be.false;
			} );
		} );
	} );
} );
