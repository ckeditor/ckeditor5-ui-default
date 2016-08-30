/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import InputLabel from '/ckeditor5/ui/inputlabel/inputlabel.js';
import InputLabelView from '/ckeditor5/ui/inputlabel/inputlabelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'InputLabel', () => {
	let model, inputLabel, view;

	beforeEach( () => {
		model = new Model( {
			text: 'foo',
			for: 'bar'
		} );

		view = new InputLabelView();
		inputLabel = new InputLabel( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the InputLabel#model', () => {
			expect( view.model.text ).to.equal( model.text ).to.equal( 'foo' );
			expect( view.model.for ).to.equal( model.for ).to.equal( 'bar' );
		} );
	} );
} );
