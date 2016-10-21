/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document, Event */

import submitHandler from '/ckeditor5/ui/bindings/submithandler.js';

import View from '/ckeditor5/ui/view.js';
import testUtils from '/tests/core/_utils/utils.js';

testUtils.createSinonSandbox();

describe( 'submitHandler', () => {
	let view;

	beforeEach( () => {
		view = new View();
		view.element = document.createElement( 'div' );
		view.element.child = document.createElement( 'input' );

		view.element.appendChild( view.element.child );

		submitHandler( { view } );
	} );

	it( 'should fire #submit event on the view and prevent the native DOM #submit', ( done ) => {
		const evt = new Event( 'submit' );
		const spy = sinon.spy( evt, 'preventDefault' );

		view.on( 'submit', () => {
			sinon.assert.calledOnce( spy );
			done();
		} );

		view.element.child.dispatchEvent( evt );
	} );
} );
