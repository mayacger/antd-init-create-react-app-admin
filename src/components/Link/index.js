import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LinkTo extends Component {

	render () {
		const { to , target, onClick} = this.props;
		if (typeof to === 'string' && /^https?:\/\//.test(to)) {
      return (
        <a href={to} target={target}>
          {this.props.children}
        </a>
      );
    }
		return (
			<Link {...this.props} to={to} onClick={() => onClick}>
				{this.props.children}
			</Link>
		)
	}
}
