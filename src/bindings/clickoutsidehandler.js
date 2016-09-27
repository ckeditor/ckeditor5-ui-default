/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

/**
 * Handles click outside of specified element and fires action.
 *
 * Note that it is not handled by a `click` event, this is to avoid situation when click on some trigger
 * opens and closes element at the same time.
 *
 * @param {Object} [options] Configuration options.
 * @param {Object} [options.controller] Object with DOMEmitter interface for listening `click` event. This behaviour will be destroyed
 * together with the controller.
 * @param {ui.Model} [options.model] Used together with `options.activeIf` to know when to listen for clicks.
 * @param {String} [options.activeIf] Used together with `options.model` to know when to listen for clicks.
 * @param {HTMLElement} [options.contextElement] Target element, click on it will not fire callback.
 * @param {Function} [options.action] Function fired after clicking outside of specified element.
 * @returns {Function} Click handler
 */
export default function clickOutsideHandler( options ) {
	const controller = options.controller;
	const clickHandler = ( evt, domEvt ) => handleClickOutside( domEvt.target, options.contextElement, options.action );

	controller.listenTo( options.model, `change:${ options.activeIf }`, ( evt, name, value ) => {
		if ( !!value ) {
			controller.listenTo( document, 'mouseup', clickHandler );
		} else {
			controller.stopListening( document, 'mouseup', clickHandler );
		}
	} );

	// When `activeIf` property is `true` on init.
	if ( !!options.model[ options.activeIf ] ) {
		controller.listenTo( document, 'mouseup', clickHandler );
	}
}

// Fires callback when clicked element is outside of context element.
//
// @private
// @param {HTMLElement} clickedElement Clicked element.
// @param {HTMLElement} contextElement Click on this element will not fire callback.
// @param {Function} callback Action fired after clicking outside of context element.
function handleClickOutside( clickedElement, contextElement, callback ) {
	if ( !contextElement.contains( clickedElement ) ) {
		callback();
	}
}
