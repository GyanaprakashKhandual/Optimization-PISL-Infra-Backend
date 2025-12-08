# API Documentation

**Base URL:** `https://pr.avidusinteractive.com`

---

## Projects Routes

### 1. Get All Projects

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/projects/`
- **Description:** Retrieve all projects from the database
- **Response:** Array of project objects
- **Test Data:** No request body required

### 2. Get Project by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/projects/:id`
- **Description:** Retrieve a specific project by ID
- **URL Parameter:** `id` (Project MongoDB ID)
- **Test Data:**

```json
{
  "id": "63970d336ec0b89a7afcb987"
}
```

### 3. Create Project

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/projects/`
- **Description:** Create a new project with sections/tasks
- **Request Body:**

```json
{
  "projectName": "Infrastructure Project A",
  "projectDate": "2024-12-08T00:00:00Z",
  "location": "Mumbai",
  "members": ["member1@example.com", "member2@example.com"],
  "r0Date": "2024-12-10T00:00:00Z",
  "r1Date": "2024-12-20T00:00:00Z",
  "r2Date": "2024-12-30T00:00:00Z",
  "imageUrl": "https://example.com/image.jpg",
  "sections": [
    {
      "taskName": "Foundation Work",
      "subTaskName": "Excavation"
    },
    {
      "taskName": "Foundation Work",
      "subTaskName": "Concrete Pouring"
    }
  ]
}
```

### 4. Add More Activities

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/projects/updateMoreActivities/:id`
- **Description:** Add additional sub-tasks to an existing project
- **URL Parameter:** `id` (Project MongoDB ID)
- **Request Body:**

```json
{
  "sections": [
    {
      "taskName": "Structural Work",
      "subTaskName": "Column Installation"
    }
  ]
}
```

### 5. Create Tasks for Project

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/projects/:id`
- **Description:** Create tasks and sub-tasks for a project
- **URL Parameter:** `id` (Project MongoDB ID)
- **Request Body:**

```json
[
  {
    "taskId": "task001",
    "taskName": "Foundation",
    "subTaskName": "Excavation"
  },
  {
    "taskId": "task002",
    "taskName": "Structure",
    "subTaskName": "Framing"
  }
]
```

### 6. Update Project

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/projects/update-project/:id`
- **Description:** Update project details
- **URL Parameter:** `id` (Project MongoDB ID)
- **Request Body:**

```json
{
  "projectName": "Updated Project Name",
  "projectDate": "2024-12-10T00:00:00Z",
  "location": "Bangalore",
  "members": ["member1@example.com"],
  "r0Date": "2024-12-12T00:00:00Z",
  "r1Date": "2024-12-22T00:00:00Z",
  "r2Date": "2024-01-01T00:00:00Z",
  "imageUrl": "https://example.com/new-image.jpg"
}
```

### 7. Update Project Basic Info

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/projects/:id`
- **Description:** Update basic project information
- **URL Parameter:** `id` (Project MongoDB ID)
- **Request Body:**

```json
{
  "projectName": "New Project Name",
  "location": "Pune",
  "startDate": "2024-12-01T00:00:00Z",
  "endDate": "2025-03-01T00:00:00Z"
}
```

### 8. Update Project Members

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/projects/members/:id`
- **Description:** Add or update project members
- **URL Parameter:** `id` (Project MongoDB ID)
- **Request Body:**

```json
{
  "members": [
    "member1@example.com",
    "member2@example.com",
    "newmember@example.com"
  ]
}
```

### 9. Delete Project

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/projects/:id`
- **Description:** Delete a project and all associated data
- **URL Parameter:** `id` (Project MongoDB ID)

### 10. Get Project with Tasks and SubTasks

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/projects/List/:id`
- **Description:** Get aggregated project data with tasks and subtasks
- **URL Parameter:** `id` (Project MongoDB ID)

---

## SubTasks Routes

### 1. Get All SubTasks

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/subTasks/`
- **Description:** Retrieve all sub-tasks
- **Response:** Array of sub-task objects

### 2. Get SubTasks by Project ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/subTasks/activities/:id`
- **Description:** Get all sub-tasks for a specific project
- **URL Parameter:** `id` (Project MongoDB ID)

### 3. Get SubTask by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/subTasks/:id`
- **Description:** Retrieve a specific sub-task
- **URL Parameter:** `id` (SubTask MongoDB ID)

### 4. Create SubTask

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/subTasks/`
- **Description:** Create a new sub-task (empty template)
- **Request Body:** `{}` (Empty object)

### 5. Update SubTask Progress Sheet

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subTasks/:id`
- **Description:** Update sub-task progress and baseline details
- **URL Parameter:** `id` (SubTask MongoDB ID)
- **Request Body:**

```json
{
  "addRevisesDates": [],
  "actualRevisedStartDate": "2024-12-01T00:00:00Z",
  "workingDaysRevised": "20",
  "baseLineStartDate": "2024-12-01T00:00:00Z",
  "baseLineEndDate": "2024-12-31T00:00:00Z",
  "baseLineWorkingDays": "25",
  "uom": "Units",
  "total": 100,
  "r1EndDate": "2024-12-20T00:00:00Z",
  "r2EndDate": "2024-12-28T00:00:00Z",
  "r3EndDate": "2025-01-05T00:00:00Z",
  "noofDaysBalanceasperrevisedEnddate": "5",
  "dailyAskingRateasperRevisedEndDate": "5",
  "noofDaysBalanceasperbaseLine": "3",
  "dailyAskingRateasperbaseLine": "4"
}
```

### 6. Update Daily Cumulative Total

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subTasks/dailyTotalUpdate/:id`
- **Description:** Update daily cumulative progress for a sub-task
- **URL Parameter:** `id` (SubTask MongoDB ID)
- **Request Body:**

```json
{
  "cumTotal": 10,
  "addedDate": "2024-12-08T00:00:00Z",
  "dateStr": "2024-12-08",
  "projectId": "63970d336ec0b89a7afcb987",
  "_id": "subtask_id"
}
```

### 7. Update Daily Total (Existing Entry)

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subTasks/dailyTotalUpdate/update/:id`
- **Description:** Update an existing daily cumulative total entry
- **URL Parameter:** `id` (SubTask MongoDB ID)
- **Request Body:**

```json
{
  "cumTotal": 15,
  "addedDate": "2024-12-08T00:00:00Z",
  "dateStr": "2024-12-08",
  "_id": "subtask_id"
}
```

### 8. Update SubTask Remarks

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subTasks/remarkUpdate/:id`
- **Description:** Update remarks for a sub-task
- **URL Parameter:** `id` (SubTask MongoDB ID)
- **Request Body:**

```json
{
  "remarks": "Work completed on schedule"
}
```

### 9. Update Remarks (Alternative)

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subTasks/remarks/:id`
- **Description:** Alternative endpoint to update sub-task remarks
- **URL Parameter:** `id` (SubTask MongoDB ID)
- **Request Body:**

```json
{
  "remarks": "Minor delays due to weather"
}
```

### 10. Delete SubTask

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/subTasks/:id`
- **Description:** Delete a sub-task and associated line graph data
- **URL Parameter:** `id` (SubTask MongoDB ID)

### 11. Delete SubTasks by Task Name

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/subTasks/deleteMany`
- **Description:** Delete multiple sub-tasks by task name
- **Request Body:**

```json
{
  "name": "Foundation"
}
```

---

## Users Routes

### 1. Get All Users

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/users/`
- **Description:** Retrieve all users
- **Response:** Array of user objects

### 2. Get User by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/users/:id`
- **Description:** Retrieve a specific user
- **URL Parameter:** `id` (User MongoDB ID)

### 3. Create User

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/users/`
- **Description:** Create a new user account
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "Project Manager"
}
```

### 4. Update User

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/users/:id`
- **Description:** Update user information (with optional password change)
- **URL Parameter:** `id` (User MongoDB ID)
- **Request Body:**

```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "Senior PM",
  "phone": "9876543210",
  "password": "newPassword123"
}
```

### 5. Register User

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/users/register`
- **Description:** Register a new user with hashed password
- **Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "9876543210",
  "role": "Admin",
  "password": "securePassword123"
}
```

### 6. Login User

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/users/login`
- **Description:** Authenticate user and receive JWT token
- **Request Body:**

```json
{
  "email": "jane.smith@example.com",
  "password": "securePassword123"
}
```

- **Response:**

```json
{
  "token": "jwt_token_here",
  "user": {
    /* user object */
  },
  "permissions": [
    /* role permissions */
  ]
}
```

### 7. Delete User

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/users/:id`
- **Description:** Delete a specific user
- **URL Parameter:** `id` (User MongoDB ID)

### 8. Delete Multiple Users

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/users/`
- **Description:** Delete multiple users by IDs
- **Request Body:**

```json
{
  "selUsers": ["userId1", "userId2", "userId3"]
}
```

---

## Tasks Routes

### 1. Get All Tasks

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/tasks/`
- **Description:** Retrieve all tasks
- **Response:** Array of task objects

### 2. Get Task by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/tasks/:id`
- **Description:** Retrieve a specific task
- **URL Parameter:** `id` (Task MongoDB ID)

### 3. Create Task

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/tasks/`
- **Description:** Create a new task
- **Request Body:**

```json
{
  "taskName": "Excavation",
  "startDate": "2024-12-01T00:00:00Z",
  "endDate": "2024-12-15T00:00:00Z",
  "projectId": "63970d336ec0b89a7afcb987"
}
```

### 4. Update Task

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/tasks/:id`
- **Description:** Update task name
- **URL Parameter:** `id` (Task MongoDB ID)
- **Request Body:**

```json
{
  "taskName": "Updated Task Name"
}
```

### 5. Get Tasks with SubTasks by Project

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/tasks/tasksList/:id`
- **Description:** Get all tasks and sub-tasks for a project
- **URL Parameter:** `id` (Project MongoDB ID)

### 6. Delete Task

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/tasks/:id`
- **Description:** Delete a specific task
- **URL Parameter:** `id` (Task MongoDB ID)

---

## Roles Routes

### 1. Get All Roles

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/roles/`
- **Description:** Retrieve all roles with permissions
- **Response:** Array of role objects

### 2. Get Role by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/roles/:id`
- **Description:** Retrieve a specific role
- **URL Parameter:** `id` (Role MongoDB ID)

### 3. Get Role by Name

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/roles/role/:role`
- **Description:** Retrieve a role by role name
- **URL Parameter:** `role` (Role name string)

### 4. Create Role

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/roles/`
- **Description:** Create a new role with default permissions structure
- **Request Body:**

```json
{
  "role": "Editor"
}
```

### 5. Update Role Name

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/roles/:id`
- **Description:** Update role name
- **URL Parameter:** `id` (Role MongoDB ID)
- **Request Body:**

```json
{
  "role": "Senior Editor"
}
```

### 6. Update Role Permissions

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/roles/update-perm/:role`
- **Description:** Update permissions for a role
- **URL Parameter:** `role` (Role name string)
- **Request Body:**

```json
{
  "dashboard_permissions": [
    {
      "isAllSelected": false,
      "isAllCollapsed": false,
      "ParentChildchecklist": [
        {
          "id": 1,
          "moduleName": "projects",
          "isSelected": true,
          "isClosed": false,
          "childList": [
            {
              "id": 1,
              "parent_id": 1,
              "value": "add",
              "isSelected": true
            },
            {
              "id": 5,
              "parent_id": 1,
              "value": "view",
              "isSelected": true
            }
          ]
        }
      ]
    }
  ]
}
```

### 7. Delete Role

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/roles/:id`
- **Description:** Delete a specific role
- **URL Parameter:** `id` (Role MongoDB ID)

### 8. Delete Multiple Roles

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/roles/`
- **Description:** Delete multiple roles
- **Request Body:**

```json
{
  "selUsers": ["roleId1", "roleId2"]
}
```

---

## Master Tasks Routes

### 1. Get All Master Tasks

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterTasks/`
- **Description:** Get all master tasks with sub-tasks aggregated
- **Response:** Tasks with populated sub-tasks

### 2. Get All Master Tasks (Alternative)

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterTasks/all-tasks`
- **Description:** Retrieve all master task definitions
- **Response:** Array of master task objects

### 3. Get Master Task by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterTasks/:id`
- **Description:** Retrieve a specific master task
- **URL Parameter:** `id` (Master Task MongoDB ID)

### 4. Create Master Task

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/masterTasks/`
- **Description:** Create a new master task template
- **Request Body:**

```json
{
  "taskName": "Foundation Work"
}
```

### 5. Update Master Task

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/masterTasks/:id`
- **Description:** Update master task name
- **URL Parameter:** `id` (Master Task MongoDB ID)
- **Request Body:**

```json
{
  "taskName": "Advanced Foundation Work"
}
```

### 6. Delete Master Task

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/masterTasks/:id`
- **Description:** Delete a master task
- **URL Parameter:** `id` (Master Task MongoDB ID)

### 7. Delete Multiple Master Tasks

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/masterTasks/`
- **Description:** Delete multiple master tasks
- **Request Body:**

```json
{
  "selUsers": ["taskId1", "taskId2"]
}
```

---

## Master SubTasks Routes

### 1. Get All Master SubTasks

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterSubTasks/`
- **Description:** Retrieve all master sub-task definitions
- **Response:** Array of master sub-task objects

### 2. Get All Sub-Activities

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterSubTasks/all-sub-activities`
- **Description:** Alternative endpoint to get all master sub-tasks
- **Response:** Array of master sub-task objects

### 3. Get Master SubTask by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/masterSubTasks/:id`
- **Description:** Retrieve a specific master sub-task
- **URL Parameter:** `id` (Master SubTask MongoDB ID)

### 4. Create Master SubTask

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/masterSubTasks/`
- **Description:** Create a new master sub-task template
- **Request Body:**

```json
{
  "subTaskName": "Excavation",
  "taskId": "63970d336ec0b89a7afcb987"
}
```

### 5. Update Master SubTask

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/masterSubTasks/:id`
- **Description:** Update master sub-task details
- **URL Parameter:** `id` (Master SubTask MongoDB ID)
- **Request Body:**

```json
{
  "subTaskName": "Deep Excavation",
  "taskId": "63970d336ec0b89a7afcb987"
}
```

### 6. Delete Master SubTask

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/masterSubTasks/:id`
- **Description:** Delete a master sub-task
- **URL Parameter:** `id` (Master SubTask MongoDB ID)

### 7. Delete Multiple Master SubTasks

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/masterSubTasks/`
- **Description:** Delete multiple master sub-tasks
- **Request Body:**

```json
{
  "selUsers": ["subTaskId1", "subTaskId2"]
}
```

---

## Categories Routes

### 1. Get All Categories

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/category/`
- **Description:** Retrieve all item categories
- **Response:** Array of category objects

### 2. Get Category by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/category/:id`
- **Description:** Retrieve a specific category
- **URL Parameter:** `id` (Category MongoDB ID)

### 3. Create Category

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/category/`
- **Description:** Create a new product category
- **Request Body:**

```json
{
  "CategoryName": "Cement",
  "CategoryCode": 101
}
```

### 4. Update Category

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/category/:id`
- **Description:** Update category information
- **URL Parameter:** `id` (Category MongoDB ID)
- **Request Body:**

```json
{
  "CategoryName": "Cement & Concrete",
  "CategoryCode": 102
}
```

### 5. Delete Category

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/category/:id`
- **Description:** Delete a category
- **URL Parameter:** `id` (Category MongoDB ID)

---

## Sub-Categories Routes

### 1. Get All Sub-Categories

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/subcategory/`
- **Description:** Retrieve all sub-categories
- **Response:** Array of sub-category objects

### 2. Get Sub-Category by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/subcategory/:id`
- **Description:** Retrieve a specific sub-category
- **URL Parameter:** `id` (Sub-Category MongoDB ID)

### 3. Create Sub-Category

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/subcategory/`
- **Description:** Create a new sub-category
- **Request Body:**

```json
{
  "SubCategoryName": "Portland Cement",
  "CategoryId": "63970d336ec0b89a7afcb987"
}
```

### 4. Update Sub-Category

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/subcategory/:id`
- **Description:** Update sub-category details
- **URL Parameter:** `id` (Sub-Category MongoDB ID)
- **Request Body:**

```json
{
  "SubCategoryName": "Pozzolana Cement",
  "CategoryId": "63970d336ec0b89a7afcb987"
}
```

### 5. Delete Sub-Category

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/subcategory/:id`
- **Description:** Delete a sub-category
- **URL Parameter:** `id` (Sub-Category MongoDB ID)

---

## Units of Measurement (UOM) Routes

### 1. Get All UOMs

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/uom/`
- **Description:** Retrieve all units of measurement
- **Response:** Array of UOM objects

### 2. Get UOM by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/uom/:id`
- **Description:** Retrieve a specific UOM
- **URL Parameter:** `id` (UOM MongoDB ID)

### 3. Create UOM

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/uom/`
- **Description:** Create a new unit of measurement
- **Request Body:**

```json
{
  "UomName": "Metric Ton"
}
```

### 4. Update UOM

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/uom/:id`
- **Description:** Update UOM name
- **URL Parameter:** `id` (UOM MongoDB ID)
- **Request Body:**

```json
{
  "UomName": "Kilogram"
}
```

### 5. Delete UOM

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/uom/:id`
- **Description:** Delete a UOM
- **URL Parameter:** `id` (UOM MongoDB ID)

---

## GST Routes

### 1. Get All GST Rates

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/gst/`
- **Description:** Retrieve all GST tax rates
- **Response:** Array of GST objects

### 2. Get GST by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/gst/:id`
- **Description:** Retrieve a specific GST rate
- **URL Parameter:** `id` (GST MongoDB ID)

### 3. Create GST Rate

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/gst/`
- **Description:** Create a new GST tax rate
- **Request Body:**

```json
{
  "GstName": "CGST",
  "Percentage": 9
}
```

### 4. Update GST Rate

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/gst/:id`
- **Description:** Update GST rate details
- **URL Parameter:** `id` (GST MongoDB ID)
- **Request Body:**

```json
{
  "GstName": "SGST",
  "Percentage": 9
}
```

### 5. Delete GST Rate

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/gst/:id`
- **Description:** Delete a GST rate
- **URL Parameter:** `id` (GST MongoDB ID)

---

## Items/Item Master Routes

### 1. Get All Items

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/createitem/`
- **Description:** Retrieve all item master records
- **Response:** Array of item objects

### 2. Get Item by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/createitem/:id`
- **Description:** Retrieve a specific item
- **URL Parameter:** `id` (Item MongoDB ID)

### 3. Create Item

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/createitem/`
- **Description:** Create a new item master record
- **Request Body:**

```json
{
  "ItemName": "Portland Cement Bag",
  "ItemNumber": 50,
  "CategoryId": "63970d336ec0b89a7afcb987",
  "SubCategoryId": "63970d336ec0b89a7afcb988",
  "UomId": "63970d336ec0b89a7afcb989",
  "GstId": "63970d336ec0b89a7afcb990",
  "Specification": "50 kg bag, Grade OPC"
}
```

### 4. Update Item

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/createitem/:id`
- **Description:** Update item details
- **URL Parameter:** `id` (Item MongoDB ID)
- **Request Body:**

```json
{
  "ItemName": "Rapid Hardening Cement",
  "ItemNumber": 51,
  "CategoryId": "63970d336ec0b89a7afcb987",
  "SubCategoryId": "63970d336ec0b89a7afcb988",
  "UomId": "63970d336ec0b89a7afcb989",
  "GstId": "63970d336ec0b89a7afcb990",
  "Specification": "25 kg bag, Grade RHC"
}
```

### 5. Delete Item

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/createitem/:id`
- **Description:** Delete an item
- **URL Parameter:** `id` (Item MongoDB ID)

---

## Site Master Routes

### 1. Get All Sites

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/createsite/`
- **Description:** Retrieve all site master records
- **Response:** Array of site objects

### 2. Get Site by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/createsite/:id`
- **Description:** Retrieve a specific site
- **URL Parameter:** `id` (Site MongoDB ID)

### 3. Create Site

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/createsite/`
- **Description:** Create a new site master record
- **Request Body:**

```json
{
  "siteName": "Mumbai Construction Site",
  "location": "Bandra, Mumbai",
  "code": 001,
  "deliveryAddress": "Site Office, Plot 123, Bandra",
  "storeManager": "Rajesh Kumar",
  "storeManagerNumber": 9876543210,
  "siteManagerEmail": "rajesh@example.com"
}
```

### 4. Update Site

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/createsite/:id`
- **Description:** Update site information
- **URL Parameter:** `id` (Site MongoDB ID)
- **Request Body:**

```json
{
  "siteName": "Mumbai Main Site",
  "location": "Worli, Mumbai",
  "code": 002,
  "deliveryAddress": "Main Site Office, Plot 456, Worli",
  "storeManager": "Priya Singh",
  "storeManagerNumber": 9876543211,
  "siteManagerEmail": "priya@example.com"
}
```

### 5. Delete Site

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/createsite/:id`
- **Description:** Delete a site
- **URL Parameter:** `id` (Site MongoDB ID)

---

## Vendor Master Routes

### 1. Get All Vendors

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/vendor/`
- **Description:** Retrieve all vendor master records
- **Response:** Array of vendor objects

### 2. Get Vendor by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/vendor/:id`
- **Description:** Retrieve a specific vendor
- **URL Parameter:** `id` (Vendor MongoDB ID)

### 3. Create Vendor

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/vendor/`
- **Description:** Create a new vendor master record
- **Request Body:**

```json
{
  "vendorName": "Cement Corp Ltd",
  "categoryId": "63970d336ec0b89a7afcb987",
  "officeAddress": "123 Industrial Park, Mumbai",
  "contactPerson": "Amit Sharma",
  "phoneNumber": 9876543210,
  "gst": "27AABCT1234H1Z0",
  "pan": "AAACT1234H",
  "email": "vendor@cementcorp.com",
  "paymentTerms": "Net 30",
  "termsCondition": "Standard commercial terms"
}
```

### 4. Update Vendor

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/vendor/:id`
- **Description:** Update vendor information
- **URL Parameter:** `id` (Vendor MongoDB ID)
- **Request Body:**

```json
{
  "vendorName": "Cement Corp India Ltd",
  "categoryId": "63970d336ec0b89a7afcb987",
  "officeAddress": "456 Business Hub, Mumbai",
  "contactPerson": "Vikram Singh",
  "phoneNumber": 9876543211,
  "gst": "27AABCT1234H1Z1",
  "pan": "AABCT1234H",
  "email": "vikram@cementcorp.com",
  "paymentTerms": "Net 45",
  "termsCondition": "Updated commercial terms"
}
```

### 5. Delete Vendor

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/vendor/:id`
- **Description:** Delete a vendor
- **URL Parameter:** `id` (Vendor MongoDB ID)

---

## Organisation Master Routes

### 1. Get All Organisations

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/organisation/`
- **Description:** Retrieve all organization master records
- **Response:** Array of organization objects

### 2. Get Organisation by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/organisation/:id`
- **Description:** Retrieve a specific organization
- **URL Parameter:** `id` (Organisation MongoDB ID)

### 3. Create Organisation

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/organisation/`
- **Description:** Create a new organization master record
- **Request Body:**

```json
{
  "orgLocation": "Mumbai, Maharashtra",
  "contactPerson": "Mr. Patel",
  "designation": "Managing Director",
  "phoneNumber": 9876543210,
  "gst": "27AABCU1234H1Z0",
  "pan": "AABCU1234H",
  "email": "info@organization.com",
  "address": "100 Corporate Avenue, Mumbai",
  "attachments": "https://example.com/gst_certificate.pdf"
}
```

### 4. Update Organisation

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/organisation/:id`
- **Description:** Update organization details
- **URL Parameter:** `id` (Organisation MongoDB ID)
- **Request Body:**

```json
{
  "orgLocation": "Bangalore, Karnataka",
  "contactPerson": "Ms. Verma",
  "designation": "Director",
  "phoneNumber": 9876543211,
  "gst": "29AABCU1234H1Z0",
  "pan": "AABCU1234H",
  "email": "contact@organization.com",
  "address": "200 Tech Park, Bangalore",
  "attachments": "https://example.com/updated_gst.pdf"
}
```

### 5. Delete Organisation

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/organisation/:id`
- **Description:** Delete an organization
- **URL Parameter:** `id` (Organisation MongoDB ID)

---

## Purchase Request Routes

### 1. Get All Purchase Requests

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/purchaserequest/`
- **Description:** Retrieve all purchase requests
- **Response:** Array of purchase request objects

### 2. Get Purchase Request by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/purchaserequest/:id`
- **Description:** Retrieve a specific purchase request
- **URL Parameter:** `id` (Purchase Request MongoDB ID)

### 3. Create Purchase Request

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/purchaserequest/`
- **Description:** Create a new purchase request
- **Request Body:**

```json
{
  "requestTitle": "Cement Supply Request",
  "requestDate": "2024-12-08T00:00:00Z",
  "requiredBy": "2024-12-20T00:00:00Z",
  "purchaseRequestNumber": "PR-2024-001",
  "siteName": "Mumbai Site",
  "localPurchase": 1,
  "items": [
    {
      "itemId": "63970d336ec0b89a7afcb987",
      "qty": "100",
      "intendedUse": "Construction - Foundation",
      "attachment": "https://example.com/spec.pdf",
      "remark": "OPC Grade only"
    }
  ],
  "status": 1,
  "newRequest": 1,
  "remarks": "Urgent requirement"
}
```

### 4. Update Purchase Request

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/purchaserequest/:id`
- **Description:** Update purchase request details
- **URL Parameter:** `id` (Purchase Request MongoDB ID)
- **Request Body:**

```json
{
  "requestTitle": "Updated Cement Supply",
  "requestDate": "2024-12-09T00:00:00Z",
  "requiredBy": "2024-12-22T00:00:00Z",
  "purchaseRequestNumber": "PR-2024-001-REV",
  "siteName": "Mumbai Main Site",
  "localPurchase": 1,
  "items": [
    {
      "itemId": "63970d336ec0b89a7afcb987",
      "qty": "150",
      "intendedUse": "Construction - Foundation & Structure",
      "attachment": "https://example.com/updated_spec.pdf",
      "remark": "OPC Grade or PPC Grade"
    }
  ],
  "status": 2,
  "newRequest": 0,
  "remarks": "Updated quantity due to scope increase"
}
```

### 5. Delete Purchase Request

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/purchaserequest/:id`
- **Description:** Delete a purchase request
- **URL Parameter:** `id` (Purchase Request MongoDB ID)

---

## Rate Approval Routes

### 1. Get All Rate Approvals

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/rateapproval/`
- **Description:** Retrieve all rate approval records
- **Response:** Array of rate approval objects

### 2. Get Rate Approval by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/rateapproval/:id`
- **Description:** Retrieve a specific rate approval
- **URL Parameter:** `id` (Rate Approval MongoDB ID)

### 3. Create Rate Approval

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/rateapproval/`
- **Description:** Create a new rate approval record
- **Request Body:**

```json
{
  "requestTitle": "Cement Rate Approval",
  "requestDate": "2024-12-08T00:00:00Z",
  "requiredBy": "2024-12-20T00:00:00Z",
  "purchaseRequestNumber": "PR-2024-001",
  "siteName": "Mumbai Site",
  "localPurchase": 1,
  "handledBy": "John Manager",
  "purchaseRequestId": "63970d336ec0b89a7afcb987",
  "items": [
    {
      "itemId": "63970d336ec0b89a7afcb989",
      "qty": "100",
      "intendedUse": "Construction - Foundation",
      "attachment": "https://example.com/spec.pdf",
      "remark": "OPC Grade",
      "vendors": [
        {
          "vendorId": "63970d336ec0b89a7afcb991",
          "vendorName": "Cement Corp Ltd",
          "itemRate": 350,
          "amount": 35000
        }
      ]
    }
  ],
  "status": 1,
  "newRequest": 1,
  "remarks": "Approved for procurement"
}
```

### 4. Update Rate Approval

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/rateapproval/:id`
- **Description:** Update rate approval details
- **URL Parameter:** `id` (Rate Approval MongoDB ID)
- **Request Body:**

```json
{
  "requestTitle": "Updated Cement Rate Approval",
  "requestDate": "2024-12-09T00:00:00Z",
  "requiredBy": "2024-12-22T00:00:00Z",
  "purchaseRequestNumber": "PR-2024-001-REV",
  "siteName": "Mumbai Main Site",
  "localPurchase": 1,
  "handledBy": "Jane Approver",
  "purchaseRequestId": "63970d336ec0b89a7afcb987",
  "items": [
    {
      "itemId": "63970d336ec0b89a7afcb989",
      "qty": "150",
      "intendedUse": "Construction - Foundation & Structure",
      "attachment": "https://example.com/updated_spec.pdf",
      "remark": "OPC or PPC Grade",
      "vendors": [
        {
          "vendorId": "63970d336ec0b89a7afcb991",
          "vendorName": "Cement Corp Ltd",
          "itemRate": 340,
          "amount": 51000
        }
      ]
    }
  ],
  "status": 2,
  "newRequest": 0,
  "remarks": "Approved with rate reduction"
}
```

### 5. Delete Rate Approval

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/rateapproval/:id`
- **Description:** Delete a rate approval record
- **URL Parameter:** `id` (Rate Approval MongoDB ID)

---

## Purchase Order Routes

### 1. Get All Purchase Orders

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/purchaseorder/`
- **Description:** Retrieve all purchase orders
- **Response:** Array of purchase order objects

### 2. Get Purchase Order by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/purchaseorder/:id`
- **Description:** Retrieve a specific purchase order
- **URL Parameter:** `id` (Purchase Order MongoDB ID)

### 3. Create Purchase Order

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/purchaseorder/`
- **Description:** Create a new purchase order
- **Request Body:**

```json
{
  "purchaseorder": [
    {
      "vendors": [
        {
          "vendorId": "63970d336ec0b89a7afcb991",
          "billingAddress": {
            "company": "Cement Corp Ltd",
            "address": "123 Industrial Park, Mumbai",
            "gst": "27AABCT1234H1Z0",
            "pan": "AAACT1234H",
            "contactPerson": "Amit Sharma",
            "email": "vendor@cementcorp.com"
          },
          "deliveryAddress": {
            "date": "2024-12-20T00:00:00Z",
            "validity": "2024-12-25T00:00:00Z",
            "poNumber": "PO-2024-001",
            "address": "Site Office, Plot 123, Bandra",
            "contactPerson": "Rajesh Kumar"
          },
          "vendorDetails": {
            "address": "123 Industrial Park, Mumbai",
            "pan": "AAACT1234H",
            "gst": "27AABCT1234H1Z0",
            "terms": "Net 30"
          },
          "items": [
            {
              "itemId": "63970d336ec0b89a7afcb989",
              "itemNumber": "50",
              "itemDescription": "Portland Cement Bag",
              "grossVolume": 100,
              "uom": {
                "uomId": "63970d336ec0b89a7afcb992",
                "uomName": "Metric Ton"
              },
              "qty": 100,
              "rate": 350,
              "amount": 35000,
              "gst": {
                "gstId": "63970d336ec0b89a7afcb990",
                "gstPercentage": 5
              },
              "remarks": "OPC Grade 43"
            }
          ]
        }
      ],
      "totalAmount": 35000,
      "gstAmount": 1750,
      "frieght": 2000,
      "frieghtGst": 100,
      "grandTotal": 38850,
      "paymentTerms": "Net 30"
    }
  ],
  "status": 1,
  "newRequest": 1,
  "remarks": "First order placement"
}
```

### 4. Update Purchase Order

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/purchaseorder/:id`
- **Description:** Update purchase order details
- **URL Parameter:** `id` (Purchase Order MongoDB ID)
- **Request Body:** Similar structure to Create Purchase Order

### 5. Delete Purchase Order

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/purchaseorder/:id`
- **Description:** Delete a purchase order
- **URL Parameter:** `id` (Purchase Order MongoDB ID)

---

## Line Graph Routes

### 1. Get All Line Graph Data

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/lineGraph/`
- **Description:** Retrieve all line graph data points
- **Response:** Array of line graph records

### 2. Get Line Graph by Project ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/lineGraph/:id`
- **Description:** Get line graph data for a specific project
- **URL Parameter:** `id` (Project MongoDB ID)

### 3. Get Line Graph with Date Filter

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/lineGraph/date-filter`
- **Description:** Get line graph data filtered by date and project
- **Request Body:**

```json
{
  "date": "2024-12-08T00:00:00Z",
  "projectId": "63970d336ec0b89a7afcb987"
}
```

---

## Recent Activity Routes

### 1. Get All Recent Activities

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/recentActivity/`
- **Description:** Retrieve all recent activities (sorted by latest)
- **Response:** Array of recent activity objects, latest first
- **Note:** Activities are automatically created when projects, tasks, users, and roles are created/updated

---

## Permissions Routes

### 1. Get All Permissions

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/permissions/`
- **Description:** Retrieve all permission definitions
- **Response:** Array of permission objects

### 2. Get Permission by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/permissions/:id`
- **Description:** Retrieve a specific permission
- **URL Parameter:** `id` (Permission MongoDB ID)

### 3. Create Permission

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/permissions/`
- **Description:** Create a new permission
- **Request Body:**

```json
{
  "permission": "view_dashboard"
}
```

### 4. Update Permission

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/permissions/:id`
- **Description:** Update permission name
- **URL Parameter:** `id` (Permission MongoDB ID)
- **Request Body:**

```json
{
  "permission": "view_analytics_dashboard"
}
```

### 5. Delete Permission

- **Endpoint:** `DELETE https://pr.avidusinteractive.com/api/permissions/:id`
- **Description:** Delete a permission
- **URL Parameter:** `id` (Permission MongoDB ID)

---

## About Us Routes

### 1. Get About Us Information

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/aboutUs/`
- **Description:** Retrieve all about us entries
- **Response:** Array of about us objects

### 2. Get About Us by ID

- **Endpoint:** `GET https://pr.avidusinteractive.com/api/aboutUs/:id`
- **Description:** Retrieve a specific about us entry
- **URL Parameter:** `id` (About Us MongoDB ID)

### 3. Create About Us Information

- **Endpoint:** `POST https://pr.avidusinteractive.com/api/aboutUs/`
- **Description:** Create new about us information
- **Request Body:**

```json
{
  "about": "We are a leading construction and infrastructure company with 20+ years of experience in delivering quality projects across India."
}
```

### 4. Update About Us Information

- **Endpoint:** `PUT https://pr.avidusinteractive.com/api/aboutUs/:id`
- **Description:** Update about us information
- **URL Parameter:** `id` (About Us MongoDB ID)
- **Request Body:**

```json
{
  "about": "We are a premier construction and infrastructure company with 25+ years of excellence in delivering quality projects across India and Southeast Asia."
}
```

---

## Notes

- **Base URL:** All endpoints use `https://pr.avidusinteractive.com` as the base URL
- **Authentication:** Login endpoint returns JWT token for authenticated requests
- **Date Format:** Use ISO 8601 format for all date fields (YYYY-MM-DDTHH:MM:SSZ)
- **MongoDB IDs:** All IDs are MongoDB ObjectIds (24-character hexadecimal strings)
- **Error Handling:** Failed operations return descriptive error messages
- **Recent Activities:** Automatically logged for all CRUD operations on projects, tasks, users, and roles
