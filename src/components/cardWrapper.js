import React from 'react';
import { Card, Form, Input, Button } from 'antd';

const CardWrapper = () => {
  // Define onFinish function to handle form submission
  const onFinish = (values) => {
    console.log('Form submitted:', values);
    // Add your form submission logic here
  };

  return (
    <Card
      title="Card title"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Input 1"
          name="input1"
          rules={[
            { required: true, message: 'Please input Input 1!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Input 2"
          name="input2"
          rules={[
            { required: true, message: 'Please input Input 2!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Input 3"
          name="input3"
          rules={[
            { required: true, message: 'Please input Input 3!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CardWrapper;