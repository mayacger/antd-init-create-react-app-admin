import React from 'react';
import { Input, Icon } from 'antd';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="user" className="prefixIcon" />,
      placeholder: 'admin',
    },
    rules: [{
      required: true, message: '请填写用户名!',
    }],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="lock" className="prefixIcon" />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [{
      required: true, message: '请填写密码!',
    }],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className="prefixIcon" />,
      placeholder: 'mobile number',
    },
    rules: [{
      required: true, message: '请填写手机号码!',
    }, {
      pattern: /^1\d{10}$/, message: 'Wrong mobile number format!',
    }],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <Icon type="mail" className="prefixIcon" />,
      placeholder: '验证码',
    },
    rules: [{
      required: true, message: '请填写验证码!',
    }],
  },
};

export default map;
