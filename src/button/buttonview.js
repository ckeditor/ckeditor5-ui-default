/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../view.js';
import IconView from '../iconview.js';
import Model from '../model.js';

/**
 * The basic button view class.
 *
 * @memberOf ui.button
 * @extends ui.View
 */

export default class ButtonView extends View {
	constructor( model ) {
		super( model );

		const bind = this.attributeBinder;

		this.template = {
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
				mousedown: ( evt ) => {
					evt.preventDefault();
				},

				click: () => {
					// We can't make the button disabled using the disabled attribute, because it won't be focusable.
					// Though, shouldn't this condition be moved to the button controller?
					if ( model.isEnabled ) {
						this.fire( 'click' );
					}
				}
			}
		};

		this.register( 'children', el => el );
	}

	init() {
		if ( this.model.icon ) {
			this._setupIcon();
		}

		return super.init();
	}

	_setupIcon() {
		const iconViewModel = new Model();
		const iconView = new IconView( iconViewModel );

		iconViewModel.bind( 'icon' ).to( this.model );

		this.element.insertBefore( iconView.element, this.element.firstChild );
	}
}

/**
 * Fired when the button is being clicked. It won't be fired when the button is disabled.
 *
 * @event ui.button.ButtonView#click
 */
