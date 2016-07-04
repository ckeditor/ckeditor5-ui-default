/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../controller.js';

/**
 * The iframe controller class.
 *
 *		const model = new Model();
 *
 *		// An instance of the iframe.
 *		new Iframe( model, new IframeView() );
 *
 * See {@link ui.iframe.IframeView}.
 *
 * @memberOf ui.iframe
 * @extends ui.Controller
 */
export default class Iframe extends Controller {
	/**
	 * Creates an instance of {@link ui.iframe.Iframe} class.
	 *
	 * @param {ui.Model} model A model of this iframe.
	 * @param {ui.View} view View of this iframe.
	 */
	constructor( model, view ) {
		super( model, view );
	}
}
