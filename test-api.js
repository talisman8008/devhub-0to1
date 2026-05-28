const data = {
  fullName: "Test User",
  contactNumber: "+91 9876543210",
  email: `test-user-${Date.now()}@example.com`,
  collegeName: "DevHub Institute",
  city: "Mumbai",
  courseBackground: "BTech Computer Science"
};

fetch('http://localhost:4000/api/waitlist', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
.then(async (res) => {
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
})
.catch(err => {
  console.error('Error:', err);
});
