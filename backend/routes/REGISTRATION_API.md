# Registration API Documentation

## Overview
This API provides endpoints for managing conference registrations for the NACNDC & JASH Conference 2025.

## Base URL
```
/api/registrations
```

## Endpoints

### 1. Create Registration
**POST** `/api/registrations`

Creates a new conference registration.

#### Request Body
```json
{
  "title": "Dr",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+256700123456",
  "country": "Uganda",
  "city": "Kampala",
  "organization": "Makerere University",
  "jobTitle": "Professor",
  "professionalCategory": "Medical Doctor",
  "yearsOfExperience": "16+",
  "registrationType": "local",
  "dietaryRequirements": "vegetarian",
  "accommodationNeeded": "yes",
  "specialNeeds": "Wheelchair access required",
  "newsletterSubscription": true,
  "termsAccepted": true,
  "photographyConsent": true
}
```

#### Response
```json
{
  "message": "Registration submitted successfully",
  "registration": {
    "id": 1,
    "email": "john.doe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "registrationType": "local",
    "registrationFee": 150000,
    "currency": "UGX",
    "paymentReference": "REG-ABC123-XYZ",
    "paymentStatus": "pending",
    "registrationStatus": "pending"
  }
}
```

### 2. Get All Registrations
**GET** `/api/registrations`

Retrieves all registrations with optional filtering and pagination.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `registrationType` (optional): Filter by type (international, regional, local, student)
- `paymentStatus` (optional): Filter by payment status (pending, paid, failed, refunded)
- `registrationStatus` (optional): Filter by registration status (pending, confirmed, cancelled)
- `search` (optional): Search by name, email, or organization

#### Example
```
GET /api/registrations?page=1&limit=20&registrationType=local&paymentStatus=paid
```

### 3. Get Registration by ID
**GET** `/api/registrations/:id`

Retrieves a specific registration by ID.

### 4. Get Registration by Email
**GET** `/api/registrations/email/:email`

Retrieves a registration by email address.

### 5. Update Registration
**PUT** `/api/registrations/:id`

Updates registration details (admin use).

#### Request Body
```json
{
  "paymentStatus": "paid",
  "registrationStatus": "confirmed",
  "paymentDate": "2025-01-15T10:30:00Z",
  "confirmationDate": "2025-01-15T10:30:00Z"
}
```

### 6. Update Payment Status
**PATCH** `/api/registrations/:id/payment`

Updates payment status and automatically updates registration status.

#### Request Body
```json
{
  "paymentStatus": "paid",
  "paymentDate": "2025-01-15T10:30:00Z"
}
```

### 7. Cancel Registration
**DELETE** `/api/registrations/:id`

Cancels a registration (soft delete - marks as cancelled).

### 8. Get Registration Statistics
**GET** `/api/registrations/stats/overview`

Returns registration statistics and counts.

#### Response
```json
{
  "totalRegistrations": 150,
  "byType": [
    { "registrationType": "local", "count": 100 },
    { "registrationType": "regional", "count": 30 },
    { "registrationType": "international", "count": 15 },
    { "registrationType": "student", "count": 5 }
  ],
  "byStatus": [
    { "registrationStatus": "confirmed", "count": 120 },
    { "registrationStatus": "pending", "count": 25 },
    { "registrationStatus": "cancelled", "count": 5 }
  ],
  "byPayment": [
    { "paymentStatus": "paid", "count": 120 },
    { "paymentStatus": "pending", "count": 25 },
    { "paymentStatus": "failed", "count": 5 }
  ]
}
```

## Registration Types and Fees

| Type | Fee | Currency | Description |
|------|-----|----------|-------------|
| international | $400 | USD | Non-African countries |
| regional | $200 | USD | African countries (excluding Uganda) |
| local | UGX 150,000 | UGX | Uganda residents |
| student | UGX 75,000 | UGX | Valid student ID required |

## Professional Categories

- Medical Doctor
- Nurse/Midwife
- Public Health Professional
- Researcher/Academic
- Student
- Policy Maker
- NGO/Development Partner
- Other

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 409 Conflict
```json
{
  "error": "Email already registered",
  "message": "A registration with this email already exists"
}
```

### 404 Not Found
```json
{
  "error": "Registration not found",
  "message": "No registration found with the provided ID"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Failed to process registration"
}
```

## Notes

1. All timestamps are in ISO 8601 format
2. Email addresses must be unique across all registrations
3. Payment reference is automatically generated for each registration
4. Registration status is automatically updated when payment status changes to "paid"
5. Soft delete is used for cancellations - registrations are marked as cancelled rather than deleted
6. The API includes comprehensive validation and error handling
7. All endpoints return consistent JSON responses with appropriate HTTP status codes
