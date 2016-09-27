/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import EmitterMixin from '../../utils/emittermixin.js';

/**
 * Creates outside of specified element click handler.
 * Created handler can be activated or deactivated.
 *
 * 		const clickHandler = createOutsideClickHandler( element, ( evt, domEvt ) => {
 * 			// Do something.
 * 		}, emitter );
 *
 * 		clickHandler( true );  // Start listening.
 * 		clickHandler( false ); // Stop listening.
 *
 * @param {HTMLElement} element Target element, click on it will not fire callback.
 * @param {Function} callback Function which will be fired after clicking outside of specified element.
 * @param {EmitterMixin} [emitter] Instance of event emitter which will be used for listening `click` event.
 * Custom emitter could be helpful in destroying process.
 * @returns {Function} Click handler
 */
export default function createOutsideClickHandler( element, callback, emitter ) {
	const eventCallback = handleClick.bind( null, element, callback );
	const emitterObject = emitter || Object.create( EmitterMixin );

	// Note that it is not handled by a `click` event, this is to avoid situation when click on some trigger
	// opens and closes element at the same time.
	return function toggleClickHandler( isActive ) {
		if ( isActive ) {
			emitterObject.listenTo( document, 'mousedown', eventCallback );
		} else {
			emitterObject.stopListening( document, 'mousedown', eventCallback );
		}
	};
}

// Handles click event and fires callback when click was outside of specified element.
//
// @param {HTMLElement} element Target element, click on it will not fire callback.
// @param callback
// @param {utils.EventInfo} evt EmitterMixin event.
// @param {MouseEvent} domEvt DOM click event.
function handleClick( element, callback, evt, domEvt ) {
	if ( !element.contains( domEvt.target ) ) {
		callback( evt, domEvt );
	}
}