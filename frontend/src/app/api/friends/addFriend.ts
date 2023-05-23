export default async function addFriend(friendName: String) {
  let token = localStorage.getItem('token');
  if (token != undefined) {
    try {
      const request = await fetch('http://localhost:4000/friend/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ friendName: friendName }),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
}
