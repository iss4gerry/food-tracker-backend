# Food Tracker Using Express, Gemini API, Prisma, MYSQL

## Install Depedencies

    npm install

### ADD .env File

    DATABASE_URL = "YOUR URL"
    JWT_SECRET = YOUR_SECRET_KEY

## Run the app

    npm run dev

## API End Point

**- AUTH Route** \
User Register: `POST /auth/register`\
User Login: `POST /auth/login`

**- Profile Route** \
Get All Profile              : `GET profile/`\
Create Profile               : `POST profile/`\
Get Profile By ID            : `GET profile/:profileId`\
Update Profile By ID         : `PATCH profile/:profileId`\
Delete Profile By ID         : `DELETE profile/:profileId`\
Get Total Nutrition Needed   : `GET profile/nutrition/:userId`\

**- Food Route** \
Nutrition Tracker            : `PATCH /food/nutrition/:userId`\
Get History                  : `GET /food/history/`\
Get User History             : `GET /food/history/:userId`\
Delete User History          : `DELETE /food/history/:userId`\
Get Daily Nutrition Left     : `GET /food/nutrition/:userId`\
Get Progress Nutrition       : `GET /food/nutrition/progress/:userId`\
Get Food Recommendation      : `Get /food/recommendation/:userId`\

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
password          (string, required)
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

**- Food Nutrition Route**
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

**Get All Profile -> GET /profile/**
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
    "id": "9e7746fe-adbf-4937-b320-51fb628f597c",
    "userId": "d5790195-555d-42f1-807d-9752667e7fc2",
    "gender": "male",
    "dateOfBirth": "2003-12-20",
    "allergies": "",
    "weight": 57,
    "height": 170,
    "createdAt": "2024-06-17T06:40:52.916Z",
    "updatedAt": "2024-06-17T06:40:52.916Z",
    "user": {
      "name": "gerry",
      "email": "gerry"
    }
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
**Image Tracker -> PUT /food/nutrition**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
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
}
"

```
**Daily Nutrition Left -> GET /food/nutrition/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
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
}

```
**Get Total Nutrition -> GET /profile/nutrition/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "a56c8dc2-7014-465f-9251-b65d2d46c2b1",
    "userId": "ea64b167-325b-49ed-9fea-fc920a1e7e74",
    "dailyCalorie": 1642.97,
    "dailyCarbohydrate": 246.4455,
    "dailySugar": 50,
    "dailyFat": 328.5940000000001,
    "dailyProtein": 64,
    "createdAt": "2024-06-14T08:20:16.342Z",
    "updatedAt": "2024-06-17T04:15:36.082Z"
  }
}

```
**Get Progress Nutrition -> GET /food/nutrition/progress/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "totalCalories": 0,
    "totalCarbohydrate": 0,
    "totalProtein": 0,
    "totalFat": 0,
    "totalSugar": 0
  }
}
```
**Get Food Recommendation -> GET /food/recommentaion/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "food1": {
      "foodName": "Kentang Manis Panggang",
      "information": "Kentang manis panggang kaya akan serat, vitamin A, dan antioksidan, menjadikannya makanan yang mengenyangkan dan menyehatkan dengan 99 kalori, 22 gram karbohidrat, 0 gram lemak, dan 1,6 gram protein."
    },
    "food2": {
      "foodName": "Ayam Panggang",
      "information": "Ayam panggang tanpa kulit merupakan sumber protein yang sangat baik dengan 165 kalori, 0 gram karbohidrat, 21 gram lemak, dan 25 gram protein. Ini dapat membantu Anda merasa kenyang dan puas."
    },
    "food3": {
      "foodName": "Brokoli Kukus",
      "information": "Brokoli kukus adalah sayuran rendah kalori dan kaya nutrisi dengan 30 kalori, 6 gram karbohidrat, 0 gram lemak, dan 2,6 gram protein. Ini juga merupakan sumber vitamin C, serat, dan antioksidan."
    }
  }
}
```
**Delete Food History -> Delete /food/history/:userId**
```JSON
{
  "status": 200,
  "message": "Success",
  "data": {
    "count": 35
  }
}
```


