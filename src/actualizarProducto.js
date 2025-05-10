const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.actualizarProducto = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { name, description, price, stock, category_id } = JSON.parse(event.body);

    if (!name || !description || price == null || stock == null || !category_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Todos los campos son obligatorios' })
      };
    }

    const params = {
      TableName: process.env.PRODUCTOS_TABLE || 'Productos',
      Key: { id },
      UpdateExpression: 'set #n = :n, description = :d, price = :p, stock = :s, category_id = :c',
      ExpressionAttributeNames: {
        '#n': 'name'
      },
      ExpressionAttributeValues: {
        ':n': name,
        ':d': description,
        ':p': price,
        ':s': stock,
        ':c': category_id
      },
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDB.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Producto actualizado correctamente',
        data: result.Attributes
      })
    };

  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al actualizar producto',
        error: error.message
      })
    };
  }
};
