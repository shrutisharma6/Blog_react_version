import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './categories.css';

import {  useNavigate} from 'react-router-dom';

function CreateCategories(){
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/v1/categories', {
            category: {
                name,
            },
        });
        if (response.status ===200) {
            setName('');
            setCategory('');
            navigate('/Categories');
        }
    }
    catch(error){
        setError('Failed to create category0');
    }
    }
    return(
        <div className="shared-background">
        <div className="glassmorphic-box">
          <h1 className="mt-4">Create Category</h1>
          <Form >
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={2} >
                Name
              </Form.Label>
             <Form.Control type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
             </Form.Group>
            <Form.Group>
              <Button type="submit" variant="primary" className="shared-button" onClick={handleSubmit}>
                Create Category
              </Button>
            </Form.Group>
          </Form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    );
};

export default CreateCategories;