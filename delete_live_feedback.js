const fetch = require('node-fetch');

const BASE_URL = 'https://s-systems-portfolio.onrender.com';
const email = 'admin@jssystems.dev';
const password = 'changeme123'; // from .env

async function run() {
  console.log('Logging in...');
  let res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  let data = await res.json();
  if (!res.ok) throw new Error(data.error);
  const token = data.token;
  console.log('Logged in! Token received.');

  console.log('Fetching feedbacks...');
  res = await fetch(`${BASE_URL}/api/feedback`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  data = await res.json();
  const feedbacks = data.feedback;
  console.log('Feedbacks found:', feedbacks.length);

  for (const fb of feedbacks) {
    console.log(`Deleting feedback ID ${fb.id} from ${fb.name}...`);
    const delRes = await fetch(`${BASE_URL}/api/feedback/${fb.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (delRes.ok) console.log(`Deleted ID ${fb.id}`);
    else console.log(`Failed to delete ID ${fb.id}`);
  }
  console.log('Done!');
}

run().catch(console.error);
