/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import { keyCodes } from '../../utils/keyboard.js';

/**
 * Handles <kbd>Esc</kbd> keydown and fires action.
 *
 * @param {Object} [options] Configuration options.
 * @param {ui.Controller} [options.controller] The controller to which this behavior should be added.
 * @param {utils.Observable} [options.model] Used together with `options.activeIf` to know when to listen for keydown.
 * @param {String} [options.activeIf] Used together with `options.model` to know when to listen for keydown.
 * @param {Function} [options.callback] Function fired after <kbd>Esc</kbd> is pressed.
 * @returns {Function} Click handler
 */
export default function escPressHandler( options ) {
	const controller = options.controller;
	const keypressHandler = ( evt, domEvt ) => handleEscPress( domEvt.keyCode, options.callback );

	controller.listenTo( options.model, `change:${ options.activeIf }`, ( evt, name, value ) => {
		if ( value ) {
			controller.listenTo( document, 'keydown', keypressHandler );
		} else {
			controller.stopListening( document, 'keydown', keypressHandler );
		}
	} );

	// When `activeIf` property is `true` on init.
	if ( options.model[ options.activeIf ] ) {
		controller.listenTo( document, 'keydown', keypressHandler );
	}
}

// Fires callback when ESC key was pressed.
//
// @private
// @param {HTMLElement} keyCode Code of pressed key.
// @param {Function} callback Action fired after ESC press.
function handleEscPress( keyCode, callback ) {
	if ( keyCode == keyCodes.esc ) {
		callback();
	}
}
