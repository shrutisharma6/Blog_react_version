import React, { useState, useEffect } from 'react';
import axios from 'axios';

function createCategories(){
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/v1/categories', {
            category: {
                name,
            },
        });
        if (response.status ===201) {
            setName('');
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
              <Col sm={10}>
                <Form.Control type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              </Col>
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