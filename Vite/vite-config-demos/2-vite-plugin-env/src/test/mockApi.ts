console.log('========= mockApi =========');
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(
    'MOCK [/api/users] response \n',
    data))