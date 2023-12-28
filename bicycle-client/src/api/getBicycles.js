export default async function getAllBicycles() {
  const response = await fetch(`http://localhost:5000/api/bicycles/`, {
    method: "GET",
  });
  const records = await response.json();

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    console.log(message);
    return;
  }

  return records;
}
