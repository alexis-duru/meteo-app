const formatedDateToFrench = (dateTimeString: string) => {
  const parts = dateTimeString.split(' ');
  const datePart = parts[0];
  const timePart = parts[1];
  const dateParts = datePart.split('-');
  const timeParts = timePart.split(':');
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const hour = (parseInt(timeParts[0]) + 1).toString(); // Ajouter 1 heure
  const minute = timeParts[1];
  const second = timeParts[2];
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
};

export default formatedDateToFrench;
