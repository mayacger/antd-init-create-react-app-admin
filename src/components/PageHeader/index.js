import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './index.module.less';





class Header extends Component {
	static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.array,
  };
	render() {
		const {
      title,
      logo,
      action,
      content,
      className,
			extraContent,
			children,
    } = this.props;
		const clsString = classNames(styles.pageHeader, className);
		return (
			<div className={clsString}>
				<div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && (
                <div className={styles.extraContent}>{extraContent}</div>
              )}
            </div>
          </div>
        </div>
				{children}
			</div>
		);
	}
}

const PageHeader = ({children, wrapperClassName, top, ...restProps}) => {
	return (
		<div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
			<Header {...restProps} />
			{children && <div className={styles.content}>{children}</div>}

		</div>
	)
}

export default PageHeader;
