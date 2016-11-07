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
 * @param {ui.DOMEmitter} [options.emitter] The emitter to which this behavior should be added.
 * @param {utils.Observable} [options.model] Used together with `options.activeIf` to know when to listen for clicks.
 * @param {String} [options.activeIf] Used together with `options.model` to know when to listen for clicks.
 * @param {HTMLElement} [options.contextElement] Target element, click on it will not fire callback.
 * @param {Function} [options.callback] Function fired after clicking outside of specified element.
 */
export default function clickOutsideHandler( { emitter, model, activeIf, callback, contextElement } ) {
	const clickHandler = ( evt, domEvt ) => handleClickOutside( domEvt.target, contextElement, callback );

	emitter.listenTo( model, `change:${ activeIf }`, ( evt, name, value ) => {
		if ( value ) {
			emitter.listenTo( document, 'mouseup', clickHandler );
		} else {
			emitter.stopListening( document, 'mouseup', clickHandler );
		}
	} );

	// When `activeIf` property is `true` on init.
	if ( model[ activeIf ] ) {
		emitter.listenTo( document, 'mouseup', clickHandler );
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
