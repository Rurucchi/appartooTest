export default async function getFriends() {
  let token = localStorage.getItem('token');
  if (token != undefined) {
    try {
      const request = await fetch('http://localhost:4000/friend/get', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      return request.json();
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
}
