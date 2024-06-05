# Food Tracker Using Express, Gemini API, Prisma, MYSQL

## Install Depedencies

    npm install

## Run the app

    npm run dev

## API End Point

### AUTH Route

User Register : `POST /auth/register`
User Login : `POST /auth/login`

### FOOD Route

Calorie Tracker : `POST /food/calorie`
Your payload must be like this : {
    image: {
      data: imageBase64,
      mimeType: imageFile.type
    }
  }

## Function to convert file to base64
 async function fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
}