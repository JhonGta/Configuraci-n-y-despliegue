const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.obtenerProducto = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamoDB.get({
      TableName: process.env.PRODUCTOS_TABLE || 'Productos',
      Key: { id }
    }).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Producto no encontrado' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Producto obtenido correctamente',
        data: result.Item
      })
    };

  } catch (error) {
    console.error('Error al obtener producto:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al obtener producto',
        error: error.message
      })
    };
  }
};
