export default async function removeFriend(friendName: String) {
  let token = localStorage.getItem('token');
  if (token != undefined) {
    try {
      const request = await fetch('http://localhost:4000/friend/remove', {
        method: 'DELETE',
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
