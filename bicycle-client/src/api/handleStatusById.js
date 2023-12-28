export default async function handleStatusById(id, selectedValues) {
  const response = await fetch(
    `http://localhost:5000/api/bicycles/${id}/status/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: selectedValues,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.log("An error occured with status");
  }
  const record = await response.json();
  if (!record) {
    console.log("Status not changed");
  }
}
