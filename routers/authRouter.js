const express = require('express');
const authController = require('../controllers/authController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router.post('/login',
  /*
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "email": {
                type: "string",
                format: "email",
              },
              password: {
                type: "string",
                example: "test1234"
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        "description": "Log in successfully",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentResponse'
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Invalid request was sent',
        schema: {
          $ref: '#/components/schemas/ValidationError'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          $ref: '#/components/schemas/NotFoundError'
        }
      }
    */
  callbackErrorHandler(authController.userLogin)
);

module.exports = router;
