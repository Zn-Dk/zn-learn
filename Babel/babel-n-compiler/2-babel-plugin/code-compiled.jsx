const element = <div>hello</div>;
const element2 = <div test={<a foo="1" bar="hello">linkElement</a>}>123</div>;
function add(a, b) {
  return a + b;
}
function log(msg) {
  console.log('[LOG]:', msg);
}
