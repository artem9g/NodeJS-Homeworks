import { body } from 'express-validator'

class CarValidator {
  // static carValidationRules = [
  //   body('email').isEmail().withMessage('Invalid email address'),
  //   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  //   body('name').not().isEmpty().withMessage('Name is required'),
  // ]

  static carSchema = {
    title: {
      notEmpty: {
        errorMessage: 'Car brand is required',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'Car brand must be at least 2 characters long',
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },

    price: {
      notEmpty: {
        errorMessage: 'Car Price is required',
      },
      isNumeric: {
        errorMessage: 'Car Price must be numeric value, at least 3 characters long',
      },
      isInt: { options: { min: 100, max: 2000000 }, errorMessage: 'Car Price must be between 100 and 2000000' },
      trim: true,
      escape: true,
    },

    licenseNumber: {
      matches: {
        options: /^[A-Z]{2}[A-Z0-9]{4}[A-Z]{2}$/i,
        errorMessage:
          'Ukrainian car number must be in the format "AA0000AA", where: ' +
          'the first two and last two characters are Latin letters, ' +
          'and the middle four characters can be Latin letters or digits.',
      },
      trim: true,
      escape: true,
    },

    yearProduction: {
      isInt: {
        options: { min: 1886, max: new Date().getFullYear() },
        errorMessage: `Year of production must be a number between 1886 and ${new Date().getFullYear()}`,
      },
      trim: true,
      escape: true,
    },
  }
}

export default CarValidator
