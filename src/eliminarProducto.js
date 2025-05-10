const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.eliminarProducto = async (event) => {
  try {
    const { id } = event.pathParameters;

    const params = {
      TableName: process.env.PRODUCTOS_TABLE || 'Productos',
      Key: { id }
    };

    await dynamoDB.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Producto eliminado correctamente',
        id
      })
    };

  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al eliminar producto',
        error: error.message
      })
    };
  }
};
