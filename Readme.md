# Food Tracker Using Express, Gemini API, Prisma, MYSQL

## Install Depedencies

    npm install

### ADD .env File

    DATABASE_URL = "YOUR URL"
    JWT_SECRET = YOUR_SECRET_KEY

## Run the app

    npm run dev

## API End Point

### AUTH Route

User Register : `POST /auth/register`
User Login : `POST /auth/login`

### FOOD Route

Calorie Tracker : `POST /food/calorie`
Your payload must be like this : 
  {
      base64Image: imageBase64,
  }

Daily Calorie Left : `GET /food/calorie/:userId`



## Function to convert file to base64
 async function fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
}

# Inventory-System : Express JS, Prisma, MySQL

## API End Point
**- AUTH Route** \
User Register: `POST /auth/register`\
User Login: `POST /auth/login`

**- Profile Route** \
Get Profile                  : `GET profile/`\
Create Profile               : `POST profile/`\
Get Profile By ID            : `POST profile/:profileId`\
Update Profile By ID         : `PATCH profile/:profileId`\
Delete Profile By ID         : `DELETE profile/:profileId`\

**- Food Route** \
Calorie Tracker              : `POST /food/calorie`\
Get History                  : `GET /food/history/`\
Get User History             : `GET /food/history/:userId`\

## Input in Each Route
**- Login Route**
```
email             (unique, email format, required)
password          (string, required)
```

**- Register Route**
```
name              (string, required)
email             (unique, email format, required)
passowrd          (string, required)
```

**- Profile Route**
```
userId            String        @unique
gender            String
dateOfBirth       String       (year/month/date)
allergies         String?       
weight            Float
height            Float
```

**- Food Calorie Route**
```
userId            (string, required)
base64Image       (string, required)
```

## Sucessfull Response API
**Register User -> POST /auth/register**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "7fd96354-da07-4420-8272-4f9a3df5f425",
    "name": "gerry",
    "email": "gerry",
    "password": "$2a$08$c7ohbZar4gRBTARnr1e5guy/flMP9H1Yc6HANNu3q4Y5/Zvg5IC2.",
    "role": "user",
    "createdAt": "2024-06-14T04:46:25.371Z",
    "updatedAt": "2024-06-14T04:46:25.371Z",
    "isEmailVerified": false
  }
}
```

**Login User -> POST /auth/login**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "7fd96354-da07-4420-8272-4f9a3df5f425",
    "name": "gerry",
    "email": "gerry",
    "password": "$2a$08$c7ohbZar4gRBTARnr1e5guy/flMP9H1Yc6HANNu3q4Y5/Zvg5IC2.",
    "role": "user",
    "createdAt": "2024-06-14T04:46:25.371Z",
    "updatedAt": "2024-06-14T04:46:25.371Z",
    "isEmailVerified": false
  }
}
```
**Create Profile -> POST /profile/**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "profile": {
      "id": "4e246afd-ec97-4aae-ae76-8290a830c61b",
      "userId": "7fd96354-da07-4420-8272-4f9a3df5f425",
      "gender": "male",
      "dateOfBirth": "2003-12-20",
      "allergies": null,
      "weight": 57,
      "height": 171,
      "createdAt": "2024-06-14T04:54:04.425Z",
      "updatedAt": "2024-06-14T04:54:04.425Z"
    },
    "nutrition": {
      "id": "232abeb7-b3f8-4c95-907c-fe978133b17d",
      "userId": "7fd96354-da07-4420-8272-4f9a3df5f425",
      "dailyCalorie": 1570.763,
      "dailyCarbohydrate": 235.61445,
      "dailySugar": 50,
      "dailyFat": 314.1526,
      "dailyProtein": 45.6,
      "createdAt": "2024-06-14T04:54:05.302Z",
      "updatedAt": "2024-06-14T04:54:05.302Z"
    }
  }
}
```

**Get Profile -> GET /profile/**
```json
{
  "status": 200,
  "message": "Success",
  "data": [
    {
      "id": "bca8139d-b46f-4313-91cb-41c256868380",
      "userId": "7c143809-047a-4dba-9cea-67a023b4c4e3",
      "gender": "male",
      "dateOfBirth": "2003-12-20",
      "allergies": "udang",
      "weight": 57,
      "height": 170,
      "createdAt": "2024-06-08T03:32:59.060Z",
      "updatedAt": "2024-06-08T03:32:59.060Z"
    }
  ]
}
```
**Get Profile By ID -> GET /profile/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "bca8139d-b46f-4313-91cb-41c256868380",
    "userId": "7c143809-047a-4dba-9cea-67a023b4c4e3",
    "gender": "male",
    "dateOfBirth": "2003-12-20",
    "allergies": "udang",
    "weight": 57,
    "height": 170,
    "createdAt": "2024-06-08T03:32:59.060Z",
    "updatedAt": "2024-06-08T03:32:59.060Z"
  }
}
```
**Update Profile -> PATCH /profile/**
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "updatedProfile": {
      "id": "a4badde0-4a9b-4466-a9d4-38208d4d08b5",
      "userId": "ea64b167-325b-49ed-9fea-fc920a1e7e74",
      "gender": "female",
      "dateOfBirth": "2003-12-20",
      "allergies": null,
      "weight": 80,
      "height": 171,
      "createdAt": "2024-06-14T08:20:15.059Z",
      "updatedAt": "2024-06-14T08:51:23.697Z"
    },
    "newNutrition": {
      "id": "a56c8dc2-7014-465f-9251-b65d2d46c2b1",
      "userId": "ea64b167-325b-49ed-9fea-fc920a1e7e74",
      "dailyCalorie": 1642.97,
      "dailyCarbohydrate": 246.4455,
      "dailySugar": 50,
      "dailyFat": 328.5940000000001,
      "dailyProtein": 64,
      "createdAt": "2024-06-14T08:20:16.342Z",
      "updatedAt": "2024-06-14T08:51:24.574Z"
    }
  }
}
```
**Image Tracker -> PUT /food/calorie**
```JSON
{
      "foodInfo": {
          "foodName": "Salad Sayuran",
          "calorie": 124,
          "sugar": 3,
          "carbohydrate": 14,
          "fat": 7,
          "protein": 9
      },
      "totalNutrition": {
          "totalCalories": 1674.0000000000002,
          "totalCarbohydrate": 279.00000000000006,
          "totalProtein": 109,
          "totalFat": 91.99999999999994,
          "totalSugar": 68
      }
  }
```
**Daily Calorie Left -> GET /food/calorie/:userId**
```JSON
{
    "id": "a56c8dc2-7014-465f-9251-b65d2d46c2b1",
    "userId": "ea64b167-325b-49ed-9fea-fc920a1e7e74",
    "dailyCalorie": -31.02999999999997,
    "dailyCarbohydrate": -32.5545,
    "dailySugar": -18,
    "dailyFat": 236.5940000000001,
    "dailyProtein": -45,
    "createdAt": "2024-06-14T08:20:16.342Z",
    "updatedAt": "2024-06-16T09:35:12.119Z"
  }
```




