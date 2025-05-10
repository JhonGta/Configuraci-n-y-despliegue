const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerProductos = async () => {
  try {
    const params = {
      TableName: process.env.PRODUCTOS_TABLE || 'Productos'
    };

    const data = await dynamoDB.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Productos obtenidos correctamente',
        data: data.Items
      })
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener productos',
        error: error.message
      })
    };
  }
};
