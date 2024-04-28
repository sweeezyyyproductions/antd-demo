import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import csvGenerator from './csvGenerator';  // Import the csvGenerator

const { Option } = Select;

const PodcastTool = () => {
  const [form] = Form.useForm();
  const [fileNames, setFileNames] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [segmentNumbers, setSegmentNumbers] = useState({ interview: 1, discussion: 1, review: 1 });

  const onFinish = (values) => {
    const { episodeNumber, showName, contentType, aspectRatio, topicName } = values;
    const abbreviatedShowName = initialValues.showName
      ? initialValues.showName
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('')
      : showName
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('');
    const abbreviatedContentType = contentType.charAt(0).toUpperCase();
    const segmentNumber = segmentNumbers[contentType]; // Get segment number for the content type
    const fileName = `ep${initialValues.episodeNumber || episodeNumber}_${abbreviatedContentType}${segmentNumber}_${topicName}_${abbreviatedShowName}_${aspectRatio}`;
    setFileNames([...fileNames, fileName]);
    form.resetFields();
    setSubmitted(true);
    if (!initialValues.showName) {
      setInitialValues({ showName, episodeNumber });
    }

    setSegmentNumbers({
      ...segmentNumbers,
      [contentType]: segmentNumber + 1,
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleSave = (index, newName) => {
    const updatedFileNames = [...fileNames];
    updatedFileNames[index] = newName;
    setFileNames(updatedFileNames);
    setEditingIndex(-1);
  };

  const handleCopy = () => {
    const namesToCopy = fileNames.join(', ');
    navigator.clipboard.writeText(namesToCopy);
    message.success('File names copied to clipboard');
  };

  const handleCancelEdit = () => {
    setEditingIndex(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingRight: '10px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: '150px' }} >
        {!submitted && (
          <>
            <Form.Item
              name="episodeNumber"
              label="Episode Number"
              initialValue={initialValues.episodeNumber}
              rules={[
                { required: true, message: 'Please enter episode number' },
                { pattern: /^\d+$/, message: 'Please enter a valid number' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="showName"
              label="Show Name"
              initialValue={initialValues.showName}
              rules={[{ required: true, message: 'Please enter show name' }]}
            >
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="topicName"
          label="Topic Name"
          rules={[{ required: true, message: 'Please enter topic name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contentType"
          label="Content Type"
          rules={[{ required: true, message: 'Please select content type' }]}
        >
          <Select>
            <Option value="interview">Interview Question</Option>
            <Option value="discussion">Discussion Topic</Option>
            <Option value="review">Movie Review</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="aspectRatio"
          label="Aspect Ratio"
          rules={[{ required: true, message: 'Please select aspect ratio' }]}
        >
          <Select>
            <Option value="16x9">16x9</Option>
            <Option value="9x16">9x16</Option>
            <Option value="4x5">4x5</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Name
          </Button>
          <Button onClick={handleCopy}>Copy</Button>
          <Button onClick={() => csvGenerator(fileNames)}>CSV</Button> {/* Update this line */}
        </Form.Item>
      </Form>

      {submitted && (
        <Card style={{ marginTop: '20px', width: '400px' }}>
          {fileNames.map((fileName, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              {editingIndex === index ? (
                <Input
                  value={fileName}
                  onChange={(e) => handleSave(index, e.target.value)}
                  autoFocus
                />
              ) : (
                <div>
                  <span>{fileName}</span>
                  <Button onClick={() => handleEdit(index)}>Edit Name</Button>
                </div>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default PodcastTool;
