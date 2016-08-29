/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import InputText from '/ckeditor5/ui/inputtext/inputtext.js';
import InputTextView from '/ckeditor5/ui/inputtext/inputtextview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'InputText', () => {
	let model, inputText, view;

	beforeEach( () => {
		model = new Model( {
			foo: 'foo',
			id: 'bar'
		} );

		view = new InputTextView();
		inputText = new InputText( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the InputText#model', () => {
			expect( view.model.value ).to.equal( model.value );
			expect( view.model.id ).to.equal( model.id );
		} );
	} );
} );
