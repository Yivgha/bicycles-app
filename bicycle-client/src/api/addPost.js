export default async function addPost(values) {
  const res = await fetch("http://localhost:5000/api/bicycles/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).catch((error) => {
    console.log(error);
    return;
  });
  return res;
}
