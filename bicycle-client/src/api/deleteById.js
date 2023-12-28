export default async function deleteBicycleById(id) {
  await fetch(`http://localhost:5000/api/bicycles/${id}`, {
    method: "DELETE",
  });
}
