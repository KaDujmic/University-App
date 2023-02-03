const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'University App',
    description: 'University App Documentation of endpoints with request, body and response examples'
  },
  host: 'localhost:4000',
  schemes: ['http'],
  components: {
    '@schemas': {
      ValidationErrorDetail: {
        type: 'object',
        properties: {
          msg: {
            type: 'string'
          },
          param: {
            type: 'string'
          },
          location: {
            type: 'string'
          }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      NotFoundError: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      AuthorizationError: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      },
      ProfessorBody: {
        type: 'object',
        properties: {
          full_name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          address: {
            type: 'string',
            example: '1st Blvd'
          },
          phone_number: {
            type: 'string',
            example: '+385915969819'
          },
          department_id: {
            type: 'string',
            format: 'uuid'
          },
          password: {
            type: 'string',
            example: 'password'
          }
        }
      },
      ProfessorResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          full_name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          address: {
            type: 'string',
            example: '1st Blvd'
          },
          phone_number: {
            type: 'string',
            example: '+385915969819'
          },
          department_id: {
            type: 'string',
            format: 'uuid'
          },
          role: {
            type: 'string',
            example: 'professor'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      StudentBody: {
        type: 'object',
        properties: {
          full_name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          address: {
            type: 'string',
            example: '1st Blvd'
          },
          phone_number: {
            type: 'string',
            example: '+385915969819'
          },
          major_id: {
            type: 'string',
            format: 'uuid'
          },
          password: {
            type: 'string',
            example: 'test1234'
          }
        }
      },
      StudentResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          full_name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          address: {
            type: 'string',
            example: '1st Blvd'
          },
          phone_number: {
            type: 'string',
            example: '+385915969819'
          },
          major_id: {
            type: 'string',
            format: 'uuid'
          },
          role: {
            type: 'string',
            example: 'student'
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
