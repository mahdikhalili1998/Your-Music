self.addEventListener("install", function (event) {
    console.log("sw is installing");
  });
  
  self.addEventListener("activate", function (event) {
    console.log("sw is activating ");
  });