/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import InputLabel from '/ckeditor5/ui/inputlabel/inputlabel.js';
import InputLabelView from '/ckeditor5/ui/inputlabel/inputlabelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'InputLabelView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			text: 'foo',
			for: 'bar'
		} );

		view = new InputLabelView();

		return new InputLabel( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'LABEL' );
			expect( view.element.classList.contains( 'ck-input__label' ) ).to.be.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'text content', () => {
			it( 'reacts on model#text', () => {
				expect( view.element.innerHTML ).to.equal( 'foo' );

				model.text = 'baz';

				expect( view.element.innerHTML ).to.equal( 'baz' );
			} );
		} );

		describe( 'for attribute', () => {
			it( 'reacts on model#for', () => {
				expect( view.element.getAttribute( 'for' ) ).to.equal( 'bar' );

				model.for = 'baz';

				expect( view.element.getAttribute( 'for' ) ).to.equal( 'baz' );
			} );
		} );
	} );
} );
