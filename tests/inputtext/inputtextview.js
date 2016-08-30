/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import InputText from '/ckeditor5/ui/inputtext/inputtext.js';
import InputTextView from '/ckeditor5/ui/inputtext/inputtextview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'InputTextView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			value: 'foo',
			id: 'bar'
		} );

		view = new InputTextView();

		return new InputText( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'should creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'INPUT' );
			expect( view.element.type ).to.equal( 'text' );
			expect( view.element.classList.contains( 'ck-input' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-input-text' ) ).to.be.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'value property', () => {
			it( 'should reacts on model#value', () => {
				expect( view.element.value ).to.equal( 'foo' );

				model.value = 'baz';

				expect( view.element.value ).to.equal( 'baz' );
			} );
		} );

		describe( 'id attribute', () => {
			it( 'should reacts on model#id', () => {
				expect( view.element.id ).to.equal( 'bar' );

				model.id = 'baz';

				expect( view.element.id ).to.equal( 'baz' );
			} );
		} );
	} );

	describe( 'focus', () => {
		it( 'should focus input element', () => {
			const focusSpy = sinon.spy( view.element, 'focus' );

			view.focus();

			expect( focusSpy.calledOnce ).to.true;

			focusSpy.restore();
		} );
	} );
} );
