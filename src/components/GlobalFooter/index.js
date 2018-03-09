import React from 'react';
import classNames from 'classnames';
import Link from '../Link';
import './index.less';

export default ({ className, links, copyright }) => {
  const clsString = classNames('globalFooter', className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className='links'>
            {links.map(link => (
              <Link
                key={link.key}
                target={link.blankTarget ? '_blank' : '_self'}
                to={link.href}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )
      }
      {copyright && <div className='copyright'>{copyright}</div>}
    </div>
  );
};
