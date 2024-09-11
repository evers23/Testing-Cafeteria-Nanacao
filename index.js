//index.js
const express = require('express');
const app = express();

app.use(express.json());

let cafes = [
  { id: 1, name: 'Café Americano' },
  { id: 2, name: 'Café Expreso' }
];

// Ruta GET para obtener todos los cafés
app.get('/cafes', (req, res) => {
  res.status(200).json(cafes);
});

// Ruta POST para agregar un nuevo café
app.post('/cafes', (req, res) => {
  const newCafe = req.body;
  if (!newCafe.id || !newCafe.name) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }
  cafes.push(newCafe);
  res.status(201).json(newCafe);
});

// Ruta DELETE para eliminar un café por id
app.delete('/cafes/:id', (req, res) => {
  const { id } = req.params;
  const cafeIndex = cafes.findIndex(c => c.id === parseInt(id));
  if (cafeIndex !== -1) {
    cafes.splice(cafeIndex, 1);
    return res.status(200).json({ message: 'Café eliminado con éxito' });
  } else {
    return res.status(404).json({ message: 'Café no encontrado' });
  }
});

// Ruta PUT para actualizar un café
app.put('/cafes/:id', (req, res) => {
  const { id } = req.params;
  const updatedCafe = req.body;
  if (parseInt(id) !== updatedCafe.id) {
    return res.status(400).json({ message: 'El id del parámetro no coincide con el id del café recibido' });
  }
  const cafeIndex = cafes.findIndex(c => c.id === parseInt(id));
  if (cafeIndex !== -1) {
    cafes[cafeIndex] = updatedCafe;
    return res.status(200).json(updatedCafe);
  } else {
    return res.status(404).json({ message: 'Café no encontrado' });
  }
});

// Exporta la app para usarla en los tests
module.exports = app;

// Inicia el servidor
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
  });
}

//comnado para ejecutar tests -->  npm run test


