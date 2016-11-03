/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, list */

import ListItemView from 'ckeditor5/ui/list/listitemview.js';

describe( 'ListItemView', () => {
	let view;

	beforeEach( () => {
		view = new ListItemView();

		view.set( {
			style: 'foo',
			label: 'bar'
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-list__item' ) ).to.be.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( '"style" attribute', () => {
			it( 'reacts on view#style', () => {
				expect( view.element.attributes.getNamedItem( 'style' ).value ).to.equal( 'foo' );

				view.style = 'color: red';

				expect( view.element.attributes.getNamedItem( 'style' ).value ).to.equal( 'color: red' );
			} );
		} );

		describe( 'text content', () => {
			it( 'reacts on view#label', () => {
				expect( view.element.innerHTML ).to.equal( 'bar' );

				view.label = 'baz';

				expect( view.element.innerHTML ).to.equal( 'baz' );
			} );
		} );

		describe( 'click event', () => {
			it( 'triggers click event when "click" is fired in DOM', () => {
				const spy = sinon.spy();

				view.on( 'click', spy );

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.calledOnce ).to.be.true;
			} );
		} );
	} );
} );
