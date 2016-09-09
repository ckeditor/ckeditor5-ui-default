/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, label */

import Label from '/ckeditor5/ui/label/label.js';
import LabelView from '/ckeditor5/ui/label/labelview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'Label', () => {
	let model, label, view;

	beforeEach( () => {
		model = new Model( {
			text: 'foo',
			for: 'bar'
		} );

		view = new LabelView();
		label = new Label( model, view );
	} );

	describe( 'constructor', () => {
		it( 'should bind view#model attributes to the Label#model', () => {
			expect( view.model.text ).to.equal( model.text ).to.equal( 'foo' );
			expect( view.model.for ).to.equal( model.for ).to.equal( 'bar' );
		} );
	} );
} );
