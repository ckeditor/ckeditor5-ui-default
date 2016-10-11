/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, label */

import LabelView from '/ckeditor5/ui/label/labelview.js';

describe( 'LabelView', () => {
	let view;

	beforeEach( () => {
		view = new LabelView();

		view.set( {
			text: 'foo',
			for: 'bar'
		} );

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'LABEL' );
			expect( view.element.classList.contains( 'ck-label' ) ).to.be.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'text content', () => {
			it( 'should react on view#text', () => {
				expect( view.element.textContent ).to.equal( 'foo' );

				view.text = 'baz';

				expect( view.element.textContent ).to.equal( 'baz' );
			} );
		} );

		describe( 'for attribute', () => {
			it( 'should react on view#for', () => {
				expect( view.element.getAttribute( 'for' ) ).to.equal( 'bar' );

				view.for = 'baz';

				expect( view.element.getAttribute( 'for' ) ).to.equal( 'baz' );
			} );
		} );
	} );
} );
