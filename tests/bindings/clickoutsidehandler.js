/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, Event */

import clickOutsideHandler from '/ckeditor5/ui/bindings/clickoutsidehandler.js';

import Model from '/ckeditor5/ui/model.js';
import DOMEmitterMixin from '/ckeditor5/ui/domemittermixin.js';

import testUtils from '/tests/core/_utils/utils.js';

testUtils.createSinonSandbox();

describe( 'clickOutsideHandler', () => {
	let model, actionSpy, contextElement;

	beforeEach( () => {
		contextElement = document.createElement( 'div' );
		document.body.appendChild( contextElement );

		model = new Model( {
			observableProperty: false
		} );

		actionSpy = testUtils.sinon.spy();

		clickOutsideHandler( {
			controller: Object.create( DOMEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			action: actionSpy
		} );
	} );

	afterEach( () => {
		document.body.removeChild( contextElement );
	} );

	it( 'should fired callback after clicking out of context element when listener is active', () => {
		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( actionSpy.calledOnce ).to.true;
	} );

	it( 'should not fired callback after clicking out of context element when listener is not active', () => {
		model.observableProperty = false;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( actionSpy.notCalled ).to.true;
	} );

	it( 'should not fired callback after clicking on context element when listener is active', () => {
		model.observableProperty = true;

		contextElement.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( actionSpy.notCalled ).to.true;
	} );

	it( 'should not fired callback after clicking on context element when listener is not active', () => {
		model.observableProperty = false;

		contextElement.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( actionSpy.notCalled ).to.true;
	} );

	it( 'should listen when model initial `ifActive` value was `true`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = true;

		clickOutsideHandler( {
			controller: Object.create( DOMEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			action: spy
		} );

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( spy.calledOnce ).to.true;
	} );

	it( 'should not listen when model initial `ifActive` value was `false`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = false;

		clickOutsideHandler( {
			controller: Object.create( DOMEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			action: spy
		} );

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( spy.notCalled ).to.true;
	} );

	it( 'should react on model `ifActive` property change', () => {
		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		expect( actionSpy.calledOnce ).to.true;

		model.observableProperty = false;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		// Still called once, was not called second time.
		expect( actionSpy.calledOnce ).to.true;

		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		// Called one more time.
		expect( actionSpy.calledTwice ).to.true;
	} );
} );
