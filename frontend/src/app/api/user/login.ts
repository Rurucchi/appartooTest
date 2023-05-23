export default async function login(username: string, password: string) {
  try {
    const data = { password, username };
    const request = await fetch('http://localhost:4000/pangolin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => localStorage.setItem('token', data.token));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
