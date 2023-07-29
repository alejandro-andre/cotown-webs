const originalLog = console.log;

console.log = function() {
  const date = new Date().toISOString();
  const args = Array.from(arguments);
  args.unshift(date);
  originalLog.apply(this, args);
}