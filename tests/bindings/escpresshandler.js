/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import escPressHandler from 'ckeditor5/ui/bindings/escpresshandler.js';

import Model from 'ckeditor5/ui/model.js';
import DOMEmitterMixin from 'ckeditor5/ui/domemittermixin.js';
import { keyCodes } from 'ckeditor5/utils/keyboard.js';

import testUtils from 'tests/core/_utils/utils.js';

testUtils.createSinonSandbox();

describe( 'escPressHandler', () => {
	let model, controller, actionSpy;

	beforeEach( () => {
		model = new Model( {
			observableProperty: false
		} );

		actionSpy = testUtils.sinon.spy();

		controller = Object.create( DOMEmitterMixin );

		escPressHandler( {
			controller: controller,
			model: model,
			activeIf: 'observableProperty',
			callback: actionSpy
		} );
	} );

	afterEach( () => {
		controller.stopListening();
	} );

	it( 'should fired callback after pressing `Esc` when listener is active', () => {
		model.observableProperty = true;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		expect( actionSpy.calledOnce ).to.true;
	} );

	it( 'should not fired callback after pressing Esc when listener is not active', () => {
		model.observableProperty = false;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.enter );

		expect( actionSpy.notCalled ).to.true;
	} );

	it( 'should not fired callback after pressing other than Esc key when listener is active', () => {
		model.observableProperty = false;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		expect( actionSpy.notCalled ).to.true;
	} );

	it( 'should listen when model initial `ifActive` value was `true`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = true;

		controller = Object.create( DOMEmitterMixin );

		escPressHandler( {
			controller: controller,
			model: model,
			activeIf: 'observableProperty',
			callback: spy
		} );

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		expect( spy.calledOnce ).to.true;
	} );

	it( 'should not listen when model initial `ifActive` value was `false`', () => {
		const spy = testUtils.sinon.spy();

		model.observableProperty = false;

		controller = Object.create( DOMEmitterMixin );

		escPressHandler( {
			controller: controller,
			model: model,
			activeIf: 'observableProperty',
			callback: spy
		} );

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		expect( spy.notCalled ).to.true;
	} );

	it( 'should react on model `ifActive` property change', () => {
		model.observableProperty = true;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		expect( actionSpy.calledOnce ).to.true;

		model.observableProperty = false;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		// Still called once, was not called second time.
		expect( actionSpy.calledOnce ).to.true;

		model.observableProperty = true;

		dispatchKeyboardEvent( document, 'keydown', keyCodes.esc );

		// Called one more time.
		expect( actionSpy.calledTwice ).to.true;
	} );
} );

// Creates and dispatches keyboard event with specified keyCode.
//
// @private
// @param {EventTarget} eventTarget
// @param {String} eventName
// @param {Number} keyCode
function dispatchKeyboardEvent( eventTarget, eventName, keyCode ) {
	const event = document.createEvent( 'Events' );

	event.initEvent( eventName, true, true );
	event.which = keyCode;
	event.keyCode = keyCode;

	eventTarget.dispatchEvent( event );
}
