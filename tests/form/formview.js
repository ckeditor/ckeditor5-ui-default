/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, form */

import Form from '/ckeditor5/ui/form/form.js';
import FormView from '/ckeditor5/ui/form/formview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'FormView', () => {
	let model, view, form;

	beforeEach( () => {
		model = new Model();

		view = new FormView();
		form = new Form( model, view );

		return form.init();
	} );

	describe( 'constructor', () => {
		it( 'should creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'FORM' );
		} );

		it( 'should registers "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'DOM bindings', () => {
		describe( 'submit event', () => {
			it( 'should triggers submit event', () => {
				const spy = sinon.spy();

				view.model.on( 'submit', spy );
				form.view.element.dispatchEvent( new Event( 'submit' ) );

				expect( spy.calledOnce ).to.true;
			} );
		} );
	} );
} );
