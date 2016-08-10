/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, list */

import ListItem from '/ckeditor5/ui/list/listitem.js';
import ListItemView from '/ckeditor5/ui/list/listitemview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'ListItemView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			style: 'foo',
			label: 'bar'
		} );

		view = new ListItemView( model );

		return new ListItem( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'creates element from template', () => {
			expect( view.element.classList.contains( 'ck-list__item' ) ).to.be.true;
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( '"style" attribute', () => {
			it( 'reacts on model#style', () => {
				expect( view.element.attributes.getNamedItem( 'style' ).value ).to.equal( 'foo' );

				model.style = 'color: red';

				expect( view.element.attributes.getNamedItem( 'style' ).value ).to.equal( 'color: red' );
			} );
		} );

		describe( 'text content', () => {
			it( 'reacts on model#label', () => {
				expect( view.element.innerHTML ).to.equal( 'bar' );

				model.label = 'baz';

				expect( view.element.innerHTML ).to.equal( 'baz' );
			} );
		} );

		describe( 'click event', () => {
			it( 'triggers click event when "click" is fired in DOM', () => {
				const spy = sinon.spy();

				view.model.on( 'click', spy );

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.calledOnce ).to.be.true;
			} );
		} );
	} );
} );
