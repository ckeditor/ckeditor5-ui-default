/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, toolbar */

import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'ToolbarView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model();
		view = new ToolbarView( model );

		return view.init();
	} );

	describe( 'the main element bindings', () => {
		it( 'is fine', () => {
			expect( view.element.classList.contains( 'ck-toolbar' ) );
		} );
	} );

	describe( 'items region', () => {
		it( 'is bound to the main element', () => {
			expect( view.regions.get( 'items' ).element ).to.equal( view.element );
		} );
	} );
} );
