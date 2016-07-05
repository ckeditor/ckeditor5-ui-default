/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, button */

'use strict';

import Button from '/ckeditor5/ui/button/button.js';
import ButtonView from '/ckeditor5/ui/button/buttonview.js';
import Model from '/ckeditor5/ui/model.js';

import testUtils from '/tests/ckeditor5/_utils/utils.js';
import Controller from '/ckeditor5/ui/controller.js';

testUtils.createSinonSandbox();

describe( 'Button', () => {
	let model, button, view;

	beforeEach( () => {
		model = new Model( {
			label: 'foo',
			isOn: false,
			isEnabled: false
		} );

		view = new ButtonView();
		button = new Button( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the Button#model', () => {
			expect( view.model.label ).to.equal( model.label );
			expect( view.model.isOn ).to.equal( model.isOn );
			expect( view.model.isEnabled ).to.equal( model.isEnabled );

			expect( view.model.noText ).to.be.undefined;
			expect( view.model.icon ).to.be.undefined;
			expect( view.model.iconAlign ).to.be.undefined;
		} );

		it( 'binds view#model icon–related attributes to the Button#model', () => {
			model.set( {
				icon: 'abc',
				iconAlign: 'LEFT'
			} );

			view = new ButtonView();
			button = new Button( model, view );

			expect( view.model.icon ).to.equal( model.icon );
			expect( view.model.iconAlign ).to.equal( model.iconAlign );
		} );

		it( 'creates view#click -> model#execute binding', () => {
			const spy = sinon.spy();

			model.on( 'execute', spy );

			view.model.fire( 'click' );

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
				icon: 'foo',
				iconAlign: 'LEFT'
			} );

			view = new ButtonView();

			return new Button( model, view ).init().then( () => {
				expect( view.element.childNodes ).to.have.length( 2 );
				expect( view.element.firstChild.classList.contains( 'ck-icon' ) ).to.be.true;
				expect( view.element.firstChild.classList.contains( 'ck-icon-left' ) ).to.be.true;
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
