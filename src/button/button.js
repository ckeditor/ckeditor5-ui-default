/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import CoreButton from '../../core/ui/button/button.js';

/**
 * The editor button controller class.
 *
 * @memberOf ui-default.button
 * @extends core.ui.button.Button
 */

export default class Button extends CoreButton {
	/**
	 * Creates a new button instance.
	 *
	 * @param {core.Editor} editor
	 * @param {core.ui.Model} model
	 * @param {core.ui.View} view
	 */
	constructor( editor, model, view ) {
		super( model, view );
	}
}
