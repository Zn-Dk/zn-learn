import('remote/addList').then(({ addList }) => {
  const app = document.getElementById('app');
  app.innerHTML = `<h2>Host</h2>`;
  addList();
});
