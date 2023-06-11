// Méthode pour convertir les données en format x-www-form-urlencoded
export function serializeFormData(data: any) {
  const encodedData = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
  return encodedData;
}
