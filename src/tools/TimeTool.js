module.exports = function timetoolEntry(command, clearMem, writer, setInside) {
  if (command) {
    writer("hello from timetool");
    clearMem();
  }
}
function getCurrentTime() {}
