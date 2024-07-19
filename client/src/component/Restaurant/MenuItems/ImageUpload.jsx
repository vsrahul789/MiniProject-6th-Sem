import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ImageUpload = ({ setImageUrl }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData);
      console.log(response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <Box m={10}>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </Box>
  );
};

ImageUpload.propTypes = {
  setImageUrl: PropTypes.func.isRequired,
};


export default ImageUpload;
