const sleep = (delay) => new Promise((resolve) =>{
    setTimeout(resolve, delay);
});

window.addEventListener("load", async () => {
    console.log("start");

    await sleep(1000);

    console.log("end");
});