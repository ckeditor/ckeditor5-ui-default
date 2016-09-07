/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, input */

import LabeledInput from '/ckeditor5/ui/labeledinput/labeledinput.js';
import LabeledInputView from '/ckeditor5/ui/labeledinput/labeledinputview.js';
import Model from '/ckeditor5/ui/model.js';

import InputLabel from '/ckeditor5/ui/inputlabel/inputlabel.js';
import InputText from '/ckeditor5/ui/inputtext/inputtext.js';

import utilsTestUtils from '/tests/utils/_utils/utils.js';

const assertBinding = utilsTestUtils.assertBinding;

describe( 'LabeledInput', () => {
	let model, labeledInput, view;

	beforeEach( () => {
		model = new Model( {
			label: 'some label',
			value: 'some value'
		} );

		view = new LabeledInputView();
		labeledInput = new LabeledInput( model, view );
	} );

	describe( 'constructor', () => {
		describe( 'child components', () => {
			it( 'should append components to content collection', () => {
				expect( labeledInput.collections.get( 'content' ) ).to.have.length( 2 );
			} );

			describe( 'label', () => {
				it( 'should be created', () => {
					expect( labeledInput.label ).to.instanceof( InputLabel );
				} );

				it( 'should be added to "content" collection', () => {
					expect( labeledInput.collections.get( 'content' ).get( 0 ) ).to.deep.equal( labeledInput.label );
				} );

				it( 'should have InputLabel.model#label bound to the #model"', () => {
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
				it( 'should be created', () => {
					expect( labeledInput.input ).to.instanceof( InputText );
				} );

				it( 'should be added to "content" collection', () => {
					expect( labeledInput.collections.get( 'content' ).get( 1 ) ).to.deep.equal( labeledInput.input );
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
