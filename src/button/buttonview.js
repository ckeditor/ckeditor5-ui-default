/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import CoreButtonView from '../../core/ui/button/buttonview.js';

/**
 * The basic button view class.
 *
 * @class ui-default.button.ButtonView
 * @extends core.ui.button.ButtonView
 */

export default class ButtonView extends CoreButtonView {
	/**
	 * Creates a new button view instance.
	 *
	 * @method constructor
	 * @param {Model} model
	 */
	constructor( model ) {
		super( model );
	}
}
