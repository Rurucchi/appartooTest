export default async function updateUser(
  toChange: String,
  changeInput: String
) {
  let token = localStorage.getItem('token');
  if (token != undefined) {
    try {
      const request = await fetch('http://localhost:4000/pangolin/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ toChange: toChange, changeInput: changeInput }),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
