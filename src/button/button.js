/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import CoreButton from '../../core/ui/button/button.js';

/**
 * The editor button controller class.
 *
 * @class ui-default.button.Button
 * @extends core.ui.button.Button
 */

export default class Button extends CoreButton {
	/**
	 * Creates a new button instance.
	 *
	 * @method constructor
	 */
	constructor( editor, model, view ) {
		super( model, view );
	}
}
