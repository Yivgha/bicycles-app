export default async function fetchEditById(id, values) {
  const res = await fetch(`http://localhost:5000/api/bicycles/${id}`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
    return;
  });
  return res;
}
