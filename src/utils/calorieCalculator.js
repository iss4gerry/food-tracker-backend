const { calculateAge } = require('./dateUtils')

const calculateCalories = (gender, weight, height, age) => {
    let calories
    if (gender === 'male') {
      calories = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
    } else if (gender === 'female') {
      calories = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)
    } else {
      throw new Error('Invalid gender. Please specify "male" or "female".')
    }
  
    return calories
  }
  
const calculateDailyNutrition = (user) => {
  const age = calculateAge(user.dateOfBirth)
  const calories = calculateCalories(user.gender, user.weight, user.height, age)
  const proteins = user.weight * 0.8
  const fat = 0.2 * calories
  const carbohydrate = (0.6 * calories)/4
  const sugar = 50

  return {
    calories,
    proteins, 
    fat,
    carbohydrate, 
    sugar
  }
}

const calculateTotalNutrition = (user, nutritionLeft) => {
  const dailyNutrition = calculateDailyNutrition(user)
  const totalCalories = Math.round(dailyNutrition.calories - nutritionLeft.dailyCalorie)
  const totalCarbohydrate = Math.round(dailyNutrition.carbohydrate - nutritionLeft.dailyCarbohydrate)
  const totalProtein = Math.round(dailyNutrition.proteins - nutritionLeft.dailyProtein)
  const totalFat = Math.round(dailyNutrition.fat - nutritionLeft.dailyFat)
  const totalSugar = Math.round(dailyNutrition.sugar - nutritionLeft.dailySugar)

  return {
    totalCalories,
    totalCarbohydrate,
    totalProtein,
    totalFat,
    totalSugar
  }
}

module.exports = { 
  calculateCalories, 
  calculateDailyNutrition,
  calculateTotalNutrition
}
  