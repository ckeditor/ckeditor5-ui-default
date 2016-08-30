/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, box */

import Box from '/ckeditor5/ui/box/box.js';
import BoxView from '/ckeditor5/ui/box/boxview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'Box', () => {
	let model, box, view;

	beforeEach( () => {
		model = new Model( {
			alignRight: true
		} );

		view = new BoxView( model, view );
		box = new Box( model, view );
	} );

	describe( 'constructor', () => {
		it( 'should binds view#model attributes to the InputText#model', () => {
			expect( view.model.alignRight ).to.equal( model.alignRight ).to.equal( true );
		} );

		it( 'should create empty content collection', () => {
			expect( box.collections.get( 'content' ) ).to.have.length( 0 );
		} );
	} );
} );
