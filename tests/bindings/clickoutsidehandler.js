/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, Event */

import clickOutsideHandler from 'ckeditor5/ui/bindings/clickoutsidehandler.js';

import Model from 'ckeditor5/ui/model.js';
import DomEmitterMixin from 'ckeditor5/utils/dom/emittermixin.js';

import testUtils from 'tests/core/_utils/utils.js';

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
			emitter: Object.create( DomEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			callback: actionSpy
		} );
	} );

	afterEach( () => {
		document.body.removeChild( contextElement );
	} );

	it( 'should fired callback after clicking out of context element when listener is active', () => {
		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.calledOnce( actionSpy );
	} );

	it( 'should not fired callback after clicking out of context element when listener is not active', () => {
		model.observableProperty = false;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.notCalled( actionSpy );
	} );

	it( 'should not fired callback after clicking on context element when listener is active', () => {
		model.observableProperty = true;

		contextElement.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.notCalled( actionSpy );
	} );

	it( 'should not fired callback after clicking on context element when listener is not active', () => {
		model.observableProperty = false;

		contextElement.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.notCalled( actionSpy );
	} );

	it( 'should listen when model initial `ifActive` value was `true`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = true;

		clickOutsideHandler( {
			emitter: Object.create( DomEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			callback: spy
		} );

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.calledOnce( spy );
	} );

	it( 'should not listen when model initial `ifActive` value was `false`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = false;

		clickOutsideHandler( {
			emitter: Object.create( DomEmitterMixin ),
			model: model,
			activeIf: 'observableProperty',
			contextElement: contextElement,
			callback: spy
		} );

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.notCalled( spy );
	} );

	it( 'should react on model `ifActive` property change', () => {
		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		sinon.assert.calledOnce( actionSpy );

		model.observableProperty = false;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		// Still called once, was not called second time.
		sinon.assert.calledOnce( actionSpy );

		model.observableProperty = true;

		document.body.dispatchEvent( new Event( 'mouseup', { bubbles: true } ) );

		// Called one more time.
		sinon.assert.calledTwice( actionSpy );
	} );
} );
