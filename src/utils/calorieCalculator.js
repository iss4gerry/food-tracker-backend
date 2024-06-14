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
  
  module.exports = { calculateCalories }
  