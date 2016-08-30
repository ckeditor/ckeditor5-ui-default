/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, form */

import Form from '/ckeditor5/ui/form/form.js';
import FormView from '/ckeditor5/ui/form/formview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'Form', () => {
	let model, form, view;

	beforeEach( () => {
		model = new Model();
		view = new FormView( model, view );
		form = new Form( model, view );
	} );

	describe( 'constructor', () => {
		it( 'should create empty content collection', () => {
			expect( form.collections.get( 'content' ) ).to.have.length( 0 );
		} );

		it( 'should creates view#submit -> model#execute binding', () => {
			const spy = sinon.spy();

			model.on( 'execute', spy );

			view.model.fire( 'submit' );

			expect( spy.calledOnce ).to.be.true;
		} );
	} );
} );
