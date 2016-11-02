/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, label */

import createLabel from '/ckeditor5/ui/label/createlabel.js';
import LabelView from '/ckeditor5/ui/label/labelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'createLabel', () => {
	let locale, model, view;

	beforeEach( () => {
		locale = {};
		model = new Model( {
			text: 'foo',
			for: 'bar'
		} );

		view = createLabel( model, locale );
	} );

	it( 'should create labelView instance', () => {
		expect( view ).to.instanceOf( LabelView );
		expect( view.locale ).to.deep.equal( locale );
	} );

	describe( 'view to model binding', () => {
		it( 'should react on model#text', () => {
			expect( view.text ).to.equal( model.text ).to.equal( 'foo' );

			model.text = 'bar';

			expect( view.text ).to.equal( model.text ).to.equal( 'bar' );
		} );

		it( 'should react on model#for', () => {
			expect( view.for ).to.equal( model.for ).to.equal( 'bar' );

			model.for = 'foo';

			expect( view.for ).to.equal( model.for ).to.equal( 'foo' );
		} );
	} );
} );
