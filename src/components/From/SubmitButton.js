import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import './index.less';

const FormItem = Form.Item;

export default ({ className, ...rest }) => {
  const clsString = classNames('submit', className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};
