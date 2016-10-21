/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * Handles native DOM `submit` event by preventing it and firing
 * the {ui.View} `submit` event, which can be then handled by the
 * parent controller.
 *
 * @param {Object} [options] Configuration options.
 * @param {ui.View} options.view The view to which this behavior should be added.
 */
export default function submitHandler( { view } ) {
	view.listenTo( view.element, 'submit', ( evt, domEvt ) => {
		domEvt.preventDefault();
		view.fire( 'submit' );
	}, { useCapture: true } );
}
