/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, form */

import FormView from '/ckeditor5/ui/form/formview.js';

describe( 'FormView', () => {
	let view;

	beforeEach( () => {
		view = new FormView();

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'FORM' );
		} );

		it( 'should register "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'submit event', () => {
			it( 'should trigger submit event', () => {
				const spy = sinon.spy();

				view.model.on( 'submit', spy );
				view.element.dispatchEvent( new Event( 'submit' ) );

				expect( spy.calledOnce ).to.true;
			} );
		} );
	} );
} );
