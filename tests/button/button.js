/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, button */

import Button from 'ckeditor5/ui/button/button.js';
import ButtonView from 'ckeditor5/ui/button/buttonview.js';
import Model from 'ckeditor5/ui/model.js';

import testUtils from 'tests/core/_utils/utils.js';
import Controller from 'ckeditor5/ui/controller.js';

testUtils.createSinonSandbox();

describe( 'Button', () => {
	let model, button, view;

	beforeEach( () => {
		model = new Model( {
			label: 'foo',
			isOn: false,
			isEnabled: false,
			keystroke: 'ALT+F'
		} );

		view = new ButtonView();
		button = new Button( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view attributes to the Button#model', () => {
			expect( view.label ).to.equal( model.label );
			expect( view.isOn ).to.equal( model.isOn );
			expect( view.isEnabled ).to.equal( model.isEnabled );
			expect( view.title ).to.equal( `${ model.label } (${ model.keystroke })` );

			expect( view.type ).to.be.undefined;
			expect( view.withText ).to.be.undefined;
			expect( view.icon ).to.be.undefined;
		} );

		it( 'binds view#title to Button.model#label and Button.model#keystroke', () => {
			model.label = 'ABC';
			model.keystroke = '';
			expect( view.title ).to.equal( 'ABC' );

			model.keystroke = 'FOO';
			expect( view.title ).to.equal( `ABC (FOO)` );

			model.label = 'XYZ';
			expect( view.title ).to.equal( `XYZ (FOO)` );
		} );

		it( 'binds view icon–related attributes to the Button#model', () => {
			model.set( {
				icon: 'abc'
			} );

			view = new ButtonView();
			button = new Button( model, view );

			expect( view.icon ).to.equal( model.icon );
		} );

		it( 'creates view#click -> model#execute binding', () => {
			const spy = sinon.spy();

			model.on( 'execute', spy );

			view.fire( 'click' );

			expect( spy.calledOnce ).to.be.true;
		} );
	} );

	describe( 'init', () => {
		it( 'does not append child Icon instance by default', () => {
			return button.init().then( () => {
				expect( view.element.childNodes ).to.have.length( 1 );
			} );
		} );

		it( 'appends child Icon instance when Button.model#icon is present', () => {
			model.set( {
				icon: 'foo'
			} );

			view = new ButtonView();

			return new Button( model, view ).init().then( () => {
				expect( view.element.childNodes ).to.have.length( 2 );
				expect( view.element.firstChild.classList.contains( 'ck-icon' ) ).to.be.true;
			} );
		} );

		it( 'calls Controller#init()', () => {
			const spy = testUtils.sinon.spy( Controller.prototype, 'init' );

			return button.init().then( () => {
				expect( spy.calledOnce ).to.be.true;
			} );
		} );
	} );
} );
