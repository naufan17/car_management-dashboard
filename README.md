# Car Management Dashboard
HTTP Rest API database cars

## Database schema
- Can access with this link: `https://dbdiagram.io/d/66441f509e85a46d55dfaa49`

## API Documentation
### 1. Get All Cars
- Method: `GET`
- URL Patterns: `{{base_url}}/car`
- Response:
  - Success: (200)
    ```json
    {
      "cars": [
        {  
           "id": uuid,
           "plate": string,
           "manufacture": string,
           "model": string,
           "image": string,
           "capacity": number,
           "description": text,
           "transmission": text,
           "type": text,
           "year": number,
           "rent_price": number,
           "available_at": Date,
           "available": boolean,
           "options": [ string ],
           "specs": [ string ]
        },
      ]
    }
    ```
  - Errors: (404)
    ```json
    { 
        message: 'Car not found' 
    }
    ```    

### 2. Get Cars By Id
- Method: `GET`
- URL Patterns: `{{base_url}}/car/{id}`
- Response:
  - Success: (200)
    ```json
    {
      "cars": [
        {  
           "id": uuid,
           "plate": string,
           "manufacture": string,
           "model": string,
           "image": string,
           "capacity": number,
           "description": text,
           "transmission": text,
           "type": text,
           "year": number,
           "rent_price": number,
           "available_at": Date,
           "available": boolean,
           "options": [ string ],
           "specs": [ string ]
        },
      ]
    }
    ```
  - Errors: (404)
    ```json
    { 
        message: 'Car not found' 
    }
    ```

### 3. Create Cars
- Method: `POST`
- URL Patterns: `{{base_url}}/car`
- Body:
    ```json
    {  
       "plate": string,
       "manufacture": string,
       "model": string,
       "image": string,
       "capacity": number,
       "description": text,
       "transmission": text,
       "type": text,
       "year": number,
       "rent_price": number,
       "available_at": Date,
       "available": boolean,
       "options": [ string ],
       "specs": [ string ]
    }
    ```
- Response:
  - Success: (201)
    ```json
    { 
        message: 'Car created successfully' 
    }
  - Errors: (500)
    ```json
    { 
        message: 'Failed to create car' 
    }
    ```

### 4. Update Cars
- Method: `PUT`
- URL Patterns: `{{base_url}}/car/{id}`
- Body:
    ```json
    {  
       "plate": string,
       "manufacture": string,
       "model": string,
       "image": string,
       "capacity": number,
       "description": text,
       "transmission": text,
       "type": text,
       "year": number,
       "rent_price": number,
       "available_at": Date,
       "available": boolean,
       "options": [ string ],
       "specs": [ string ]
    }
    ```
- Response:
  - Success: (201)
    ```json
    { 
        message: 'Car updated successfully' 
    }
  - Errors: (500)
    ```json
    { 
        message: 'Failed to update car' 
    }
    ```

### 5. Delete Cars
- Method: `DELETE`
- URL Patterns: `{{base_url}}/car/{id}`
- Response:
  - Success: (204)
    ```json
    { 
        message: 'Car deleted successfully' 
    }
    ```
  - Errors: (500)
    ```json
    { 
        message: 'Failed to delete car' 
    }
    ```    
