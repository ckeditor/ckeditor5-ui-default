/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, button */

import utilsTestUtils from '/tests/utils/_utils/utils.js';
import createButton from '/ckeditor5/ui/button/createbutton.js';
import Model from '/ckeditor5/ui/model.js';
import ButtonView from '/ckeditor5/ui/button/buttonview.js';

const assertBinding = utilsTestUtils.assertBinding;

describe( 'createButton', () => {
	it( 'accepts model', () => {
		const modelDef = {
			label: 'foo',
			isOn: false,
			isEnabled: true,
			withText: false,
			type: 'button',
			icon: 'foo'
		};

		const model = new Model( modelDef );
		const view = createButton( model, {}, ButtonView );

		assertBinding( view,
			modelDef,
			[
				[ model, { label: 'bar', isOn: true, isEnabled: false, withText: true, type: 'submit', icon: 'bar' } ]
			],
			{ label: 'bar', isOn: true, isEnabled: false, withText: true, type: 'submit', icon: 'bar' }
		);
	} );

	it( 'sets view#title', () => {
		const locale = {};
		const model = new Model( { label: 'foo' } );
		const view = createButton( model, locale, ButtonView );

		expect( view.title ).to.equal( 'foo' );

		model.set( 'keystroke', 'X' );

		expect( view.title ).to.equal( 'foo (X)' );
	} );

	it( 'accepts locale', () => {
		const locale = {};
		const view = createButton( new Model(), locale, ButtonView );

		expect( view.locale ).to.equal( locale );
	} );

	it( 'returns view', () => {
		const view = createButton( new Model(), {}, ButtonView );

		expect( view ).to.be.instanceOf( ButtonView );
	} );

	it( 'delegates view#execute to model#execute', ( done ) => {
		const model = new Model();
		const view = createButton( model, {}, ButtonView );

		model.on( 'execute', () => {
			done();
		} );

		view.fire( 'execute' );
	} );
} );

