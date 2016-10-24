/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import LabeledInputView from '/ckeditor5/ui/labeledinput/labeledinputview.js';
import InputTextView from '/ckeditor5/ui/inputtext/inputtextview.js';
import LabelView from '/ckeditor5/ui/label/labelview.js';

describe( 'InputTextView', () => {
	let view;

	beforeEach( () => {
		view = new LabeledInputView( InputTextView );

		view.init();
	} );

	describe( 'constructor', () => {
		it( 'should create element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
		} );

		it( 'should create #labelView', () => {
			expect( view.labelView ).to.be.instanceOf( LabelView );
		} );

		it( 'should create #inputView', () => {
			expect( view.inputView ).to.be.instanceOf( InputTextView );
		} );
	} );

	describe( 'template', () => {
		it( 'has label view', () => {
			expect( view.template.children.get( 0 ) ).to.equal( view.labelView );
		} );

		it( 'has input view', () => {
			expect( view.template.children.get( 1 ) ).to.equal( view.inputView );
		} );
	} );

	describe( 'select', () => {
		it( 'should select input value', () => {
			const spy = sinon.spy( view.inputView, 'select' );

			view.select();

			sinon.assert.calledOnce( spy );
		} );
	} );
} );
