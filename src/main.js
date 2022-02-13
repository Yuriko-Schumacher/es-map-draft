import App from './App.svelte';

// const app = new App({
//   target: document.body,
//   props: {
//   }
// });

function passCheck(){
  let password = prompt("Please enter your password")
  if (password == "globeesmap") {
    const app = new App({
      target: document.body,
      props: {
      }
    });
  } else {
    alert("Password is incorrect.")
    passCheck()
  }
}
passCheck();

export default app;
