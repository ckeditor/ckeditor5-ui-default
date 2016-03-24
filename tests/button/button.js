/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, button */

'use strict';

import testUtils from '/tests/ckeditor5/_utils/utils.js';
import Button from '/ckeditor5/ui/button/button.js';
import View from '/ckeditor5/ui/view.js';
import Controller from '/ckeditor5/ui/controller.js';
import Model from '/ckeditor5/ui/model.js';

testUtils.createSinonSandbox();

describe( 'Button', () => {
	let model, button, view;

	beforeEach( () => {
		model = new Model();
		view = new View();
		button = new Button( model, view );
	} );

	describe( 'constructor', () => {
		it( 'creates view#click -> model#execute binding', () => {
			const spy = sinon.spy();

			model.on( 'execute', spy );

			view.fire( 'click' );

			expect( spy.calledOnce ).to.be.true;
		} );

		it( 'calls _setupIcon when "icon" in model', () => {
			const spy = testUtils.sinon.spy( Button.prototype, '_setupIcon' );

			model.set( 'icon', 'foo' );
			new Button( model, view );

			expect( spy.calledOnce ).to.be.true;
		} );
	} );

	describe( '_setupIcon', () => {
		beforeEach( () => {
			model.set( 'icon', 'foo' );
			button = new Button( model, view );
		} );

		it( 'appends children collection to the Button', () => {
			expect( button.collections.get( 0 ).name ).to.be.equal( 'children' );
		} );

		it( 'appends child icon controller when "icon" in model', () => {
			expect( button.collections.get( 'children' ).get( 0 ) ).to.be.instanceOf( Controller );
		} );
	} );
} );
