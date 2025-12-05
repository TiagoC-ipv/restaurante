const fs = require('fs');
 
function lerFicheiro(caminho) {
  if (!fs.existsSync(caminho)) {
    return [];
  }
  try {
    const data = fs.readFileSync(caminho, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}
 
function gravarFicheiro(caminho, array) {
  const data = JSON.stringify(array, null, 2);
  fs.writeFileSync(caminho, data, 'utf8');
}
 
module.exports = { lerFicheiro, gravarFicheiro };