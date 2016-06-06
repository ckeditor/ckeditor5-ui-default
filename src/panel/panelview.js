/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';

/**
 * The basic panel view class.
 *
 * @memberOf ui.panel
 * @extends ui.View
 */
export default class PanelView extends View {
	/**
	 * Creates a PanelView instance.
	 *
	 * @param {utils.Observable} model
	 */
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = {
			tag: 'div',

			attributes: {
				class: [
					'ck-reset',
					'ck-panel',
					bind.if( 'isOn', 'ck-panel-active' )
				]
			}
		};

		this.register( 'content', el => el );
	}
}
