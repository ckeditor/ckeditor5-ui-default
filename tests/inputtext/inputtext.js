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
			value: 'foo',
			id: 'bar'
		} );

		view = new InputTextView();
		inputText = new InputText( model, view );
	} );

	describe( 'constructor', () => {
		it( 'should bind view attributes to the InputText#model', () => {
			expect( view.value ).to.equal( model.value ).to.equal( 'foo' );
			expect( view.id ).to.equal( model.id ).to.equal( 'bar' );
		} );
	} );

	describe( 'value', () => {
		it( 'should return InputText value', () => {
			inputText.model.value = 'baz';

			expect( inputText.value ).to.equal( 'baz' );
		} );
	} );
} );
