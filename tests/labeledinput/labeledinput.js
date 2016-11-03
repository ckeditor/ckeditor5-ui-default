/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import LabeledInput from 'ckeditor5/ui/labeledinput/labeledinput.js';
import LabeledInputView from 'ckeditor5/ui/labeledinput/labeledinputview.js';
import Model from 'ckeditor5/ui/model.js';

import Label from 'ckeditor5/ui/label/label.js';
import InputText from 'ckeditor5/ui/inputtext/inputtext.js';
import InputTextView from 'ckeditor5/ui/inputtext/inputtextview.js';

import utilsTestUtils from 'tests/utils/_utils/utils.js';

const assertBinding = utilsTestUtils.assertBinding;

describe( 'LabeledInput', () => {
	let model, labeledInput, view;

	beforeEach( () => {
		model = new Model( {
			label: 'some label',
			value: 'some value'
		} );

		view = new LabeledInputView( InputTextView );
		labeledInput = new LabeledInput( model, view, InputText, new Model() );
	} );

	describe( 'constructor', () => {
		describe( 'child components', () => {
			describe( 'label', () => {
				it( 'should be created', () => {
					expect( labeledInput.label ).to.instanceof( Label );
				} );

				it( 'should have Label.model#label bound to the #model"', () => {
					assertBinding( labeledInput.label.model,
						{ text: 'some label' },
						[
							[ model, { label: 'new label' } ]
						],
						{ text: 'new label' }
					);
				} );

				it( 'should have na unique for attribute', () => {
					expect( labeledInput.label.model.for ).to.match( /^ck-input-[0-9]+$/ );
				} );
			} );

			describe( 'input', () => {
				it( 'should be attached', () => {
					expect( labeledInput.input ).to.instanceof( InputText );
				} );

				it( 'should have InputText.model#value bound to the #model', () => {
					assertBinding( labeledInput.input.model,
						{ value: 'some value' },
						[
							[ model, { value: 'new value' } ]
						],
						{ value: 'new value' }
					);
				} );

				it( 'should have an unique id attribute', () => {
					expect( labeledInput.input.model.id ).to.match( /^ck-input-[0-9]+$/ );
				} );

				describe( 'view', () => {
					it( 'should inherit the locale', () => {
						expect( labeledInput.input.view.locale ).to.equal( labeledInput.view.locale );
					} );
				} );
			} );
		} );
	} );

	describe( 'value', () => {
		it( 'should return LabeledInput value', () => {
			labeledInput.model.value = 'baz';

			expect( labeledInput.value ).to.equal( 'baz' );
		} );
	} );
} );
