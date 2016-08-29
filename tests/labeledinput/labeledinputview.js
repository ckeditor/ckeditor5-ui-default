/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import LabeledInput from '/ckeditor5/ui/labeledinput/labeledinput.js';
import LabeledInputView from '/ckeditor5/ui/labeledinput/labeledinputview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'InputTextView', () => {
	let model, view, labeledInput;

	beforeEach( () => {
		model = new Model( {
			label: 'foo'
		} );

		view = new LabeledInputView();

		labeledInput = new LabeledInput( model, view );

		return labeledInput.init();
	} );

	describe( 'constructor', () => {
		it( 'should creates element from template', () => {
			expect( view.element.tagName ).to.equal( 'DIV' );
			expect( view.element.classList.contains( 'ck-labeled-input' ) ).to.be.true;
		} );

		it( 'should registers "content" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'content' );
			expect( view.regions.get( 0 ).element ).to.equal( view.element );
		} );
	} );

	describe( 'focus', () => {
		it( 'should focus input element', () => {
			const focusSpy = sinon.spy( labeledInput.collections.get( 'content' ).get( 1 ).view, 'focus' );

			view.focus();

			expect( focusSpy.calledOnce ).to.true;

			focusSpy.restore();
		} );
	} );
} );
