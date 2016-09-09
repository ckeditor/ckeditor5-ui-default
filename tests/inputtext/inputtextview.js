/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import InputTextView from '/ckeditor5/ui/inputtext/inputtextview.js';

describe( 'InputTextView', () => {
	let view;

	beforeEach( () => {
		view = new InputTextView();

		view.model.set( {
			value: 'foo',
			id: 'bar'
		} );

		view.init();
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
			it( 'should react on model#value', () => {
				expect( view.element.value ).to.equal( 'foo' );

				view.model.value = 'baz';

				expect( view.element.value ).to.equal( 'baz' );
			} );

			it( 'should set to empty string when using `falsy` values', () => {
				[ undefined, false, null ].forEach( ( value ) => {
					view.model.value = value;

					expect( view.element.value ).to.equal( '' );
				} );
			} );
		} );

		describe( 'id attribute', () => {
			it( 'should react on model#id', () => {
				expect( view.element.id ).to.equal( 'bar' );

				view.model.id = 'baz';

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
