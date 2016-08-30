/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, button */

import testUtils from '/tests/core/_utils/utils.js';
import Button from '/ckeditor5/ui/button/button.js';
import ButtonView from '/ckeditor5/ui/button/buttonview.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'ButtonView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model( {
			label: 'foo',
			isEnabled: true,
			isOn: false
		} );

		view = new ButtonView();

		return new Button( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'registers "children" region', () => {
			expect( view.regions.get( 0 ).name ).to.equal( 'children' );
		} );
	} );

	describe( '<button> bindings', () => {
		describe( 'class', () => {
			it( 'is set initially', () => {
				expect( view.element.classList.contains( 'ck-button' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-enabled' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-off' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-button_with-text' ) ).to.be.false;
			} );

			it( 'reacts on model.isEnabled', () => {
				model.isEnabled = false;

				expect( view.element.classList.contains( 'ck-disabled' ) ).to.be.true;
			} );

			it( 'reacts on model.isOn', () => {
				model.isOn = true;

				expect( view.element.classList.contains( 'ck-on' ) ).to.be.true;
			} );

			it( 'reacts on model.withText', () => {
				model.set( 'withText', true );

				expect( view.element.classList.contains( 'ck-button_with-text' ) ).to.be.true;
			} );
		} );

		describe( 'title', () => {
			it( 'is set initially', () => {
				expect( view.element.attributes.title.value ).to.equal( 'foo' );
			} );

			it( 'reacts on model.label and model.keystroke', () => {
				model.label = 'baz';
				expect( view.element.attributes.title.value ).to.equal( 'baz' );

				model.set( 'keystroke', 'qux' );
				expect( view.element.attributes.title.value ).to.equal( 'baz (qux)' );
			} );
		} );

		describe( 'text', () => {
			it( 'is set initially', () => {
				expect( view.element.textContent ).to.equal( 'foo' );
			} );

			it( 'reacts on model.label', () => {
				model.label = 'bar';

				expect( view.element.textContent ).to.equal( 'bar' );
			} );
		} );

		describe( 'mousedown event', () => {
			it( 'should be prevented', () => {
				const ret = view.element.dispatchEvent( new Event( 'mousedown', { cancelable: true } ) );

				expect( ret ).to.be.false;
			} );
		} );

		describe( 'click event', () => {
			it( 'triggers click event if button is not disabled', () => {
				const spy = sinon.spy();

				view.model.on( 'click', spy );

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.callCount ).to.equal( 1 );

				model.isEnabled = false;

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.callCount ).to.equal( 1 );
			} );
		} );
	} );
} );
