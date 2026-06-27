const fs = require("node:fs");

fs.writeFile("hello.txt", "hello world !!", function (err) {
  err ? console.log(err) : console.log("Created");
});

fs.appendFile("hello.txt", "hello Anshu !!", function (err) {
  err ? console.log(err) : console.log("Updated");
});

fs.rename("hello.txt", "hyy.txt", function (err) {
  err ? console.log(err) : console.log("Renamed");
});

fs.copyFile("hyy.txt", "./copy/hello.txt", function (err) {
  err ? console.log(err) : console.log("Copied");
});

fs.unlink("./copy/hello.txt", function (err) {
  err ? console.log(err) : console.log("Deleted");
});

fs.rmdir("./copy", function (err) {
  err ? console.log(err) : console.log("Removed");
});


