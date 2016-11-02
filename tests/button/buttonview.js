/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals Event */
/* bender-tags: ui, button */

import testUtils from '/tests/core/_utils/utils.js';
import ButtonView from '/ckeditor5/ui/button/buttonview.js';
import IconView from '/ckeditor5/ui/icon/iconview.js';

testUtils.createSinonSandbox();

describe( 'ButtonView', () => {
	let locale, view;

	beforeEach( () => {
		locale = { t() {} };

		return ( view = new ButtonView( locale ) ).init();
	} );

	describe( '<button> bindings', () => {
		describe( 'class', () => {
			it( 'is set initially', () => {
				expect( view.element.classList ).to.have.length( 3 );
				expect( view.element.classList.contains( 'ck-button' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-disabled' ) ).to.be.true;
				expect( view.element.classList.contains( 'ck-off' ) ).to.be.true;
			} );

			it( 'reacts on view#isEnabled', () => {
				view.set( 'isEnabled', true );
				expect( view.element.classList.contains( 'ck-disabled' ) ).to.be.false;

				view.set( 'isEnabled', false );
				expect( view.element.classList.contains( 'ck-disabled' ) ).to.be.true;
			} );

			it( 'reacts on view#isOn', () => {
				view.set( 'isOn', true );
				expect( view.element.classList.contains( 'ck-on' ) ).to.be.true;

				view.set( 'isOn', false );
				expect( view.element.classList.contains( 'ck-on' ) ).to.be.false;
			} );

			it( 'reacts on view#withText', () => {
				view.set( 'withText', true );
				expect( view.element.classList.contains( 'ck-button_with-text' ) ).to.be.true;

				view.set( 'withText', false );
				expect( view.element.classList.contains( 'ck-button_with-text' ) ).to.be.false;
			} );

			it( 'reacts on view#type', () => {
				// Default value.
				expect( view.element.getAttribute( 'type' ) ).to.equal( 'button' );

				view.set( 'type', 'submit' );
				expect( view.element.getAttribute( 'type' ) ).to.equal( 'submit' );

				// Default value.
				view.type = null;
				expect( view.element.getAttribute( 'type' ) ).to.equal( 'button' );
			} );
		} );

		describe( 'title', () => {
			it( 'is not initially set ', () => {
				expect( view.element.attributes.title ).to.be.undefined;
			} );

			it( 'reacts on view#title', () => {
				view.set( 'title', 'bar' );

				expect( view.element.attributes.title.value ).to.equal( 'bar' );
			} );
		} );

		describe( 'text', () => {
			it( 'is not initially set ', () => {
				expect( view.element.textContent ).to.equal( '' );
			} );

			it( 'reacts on view#label', () => {
				view.set( 'label', 'bar' );

				expect( view.element.textContent ).to.equal( 'bar' );
			} );
		} );

		describe( 'mousedown event', () => {
			it( 'should be prevented', () => {
				const ret = view.element.dispatchEvent( new Event( 'mousedown', { cancelable: true } ) );

				expect( ret ).to.be.false;
			} );
		} );

		describe( 'execute event', () => {
			it( 'triggers view#execute event if button is not disabled', () => {
				const spy = sinon.spy();

				view.on( 'execute', spy );
				view.set( 'isEnabled', true );

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.callCount ).to.equal( 1 );

				view.set( 'isEnabled', false );

				view.element.dispatchEvent( new Event( 'click' ) );
				expect( spy.callCount ).to.equal( 1 );
			} );
		} );
	} );

	describe( 'icon', () => {
		it( 'is not initially set', () => {
			expect( view.element.childNodes ).to.have.length( 1 );
			expect( view.iconView ).to.be.undefined;
		} );

		it( 'is set when view#icon is defined', () => {
			view.set( 'icon', 'foo' );

			expect( view.element.childNodes ).to.have.length( 2 );
			expect( view.iconView ).to.be.instanceOf( IconView );
			expect( view.iconView.name ).to.equal( 'foo' );

			view.icon = 'bar';
			expect( view.iconView.name ).to.equal( 'bar' );
		} );
	} );
} );
