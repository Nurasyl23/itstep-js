window.addEventListener("load", async () => {

    const db = await DbContext.open();

    db.seed(generateLocations);

    console.log(db);

});