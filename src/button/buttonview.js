/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import Template from '../template.js';

/**
 * The ButtonView class.
 *
 * See {@link ui.button.Button}.
 *
 * @memberOf ui.button
 * @extends ui.View
 */
export default class ButtonView extends View {
	/**
	 * @inheritDoc
	 */
	constructor() {
		super();

		const bind = this.bind;

		this.template = new Template( {
			tag: 'button',

			attributes: {
				class: [
					'ck-button',
					bind.to( 'isEnabled', value => value ? 'ck-enabled' : 'ck-disabled' ),
					bind.to( 'isOn', value => value ? 'ck-on' : 'ck-off' )
				]
			},

			children: [
				{
					text: bind.to( 'label' )
				}
			],

			on: {
				mousedown: bind.to( evt => {
					evt.preventDefault();
				} ),

				click: bind.to( () => {
					// We can't make the button disabled using the disabled attribute, because it won't be focusable.
					// Though, shouldn't this condition be moved to the button controller?
					if ( this.model.isEnabled ) {
						this.model.fire( 'click' );
					}
				} )
			}
		} );

		this.register( 'children', el => el );

		/**
		 * Model of this ButtonView.
		 *
		 * @member {ui.button.ButtonViewModel} ui.button.ButtonView#model
		 */
	}
}

/**
 * The ButtonView {@link ui.Model} interface.
 *
 * @memberOf ui.button
 * @interface ui.button.ButtonViewModel
 */

/**
 * The label of the ButtonView visible to the user.
 *
 * @member {String} ui.button.ButtonViewModel#label
 */

/**
 * Controls whether the ButtonView is "on", e.g. some feature which it represents
 * is currently enabled.
 *
 * @member {Boolean} ui.button.ButtonViewModel#isOn
 */

/**
 * Controls whether the ButtonView is enabled (can be clicked).
 *
 * @member {Boolean} ui.button.ButtonViewModel#isEnabled
 */

/**
 * Fired when the button is being clicked. It won't be fired when the button is disabled.
 *
 * @event ui.button.ButtonView#click
 */
