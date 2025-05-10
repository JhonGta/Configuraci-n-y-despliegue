// src/agregarProducto.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.agregarProducto = async (event) => {
  try {
    const { name, description, price, stock, category_id } = JSON.parse(event.body);

    if (!name || !description || price == null || stock == null || !category_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Todos los campos son obligatorios' })
      };
    }

    const producto = {
      id: uuidv4(),
      name,
      description,
      price,
      stock,
      category_id
    };

    await dynamoDB.put({
      TableName: process.env.PRODUCTOS_TABLE || 'Productos',
      Item: producto
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Producto agregado correctamente',
        data: producto
      })
    };

  } catch (error) {
    console.error('Error al agregar producto:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error al agregar producto',
        error: error.message
      })
    };
  }
};
