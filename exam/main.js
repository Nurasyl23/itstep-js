window.addEventListener("load", async () => {

    const db = await DbContext.open();

    await db.seed(generateLocations);


    const inputFirst = document.forms["search"].elements["query1"];

    inputFirst.addEventListener("input", e => {

        const { value } = inputFirst;

        value = value.trim();

        if (!value) {
            return;
        }

        const predicate = location => {
            location.name.search(value);
        }

        const locations = await db.findLocations(predicate);

        renderLocations(locations)
    });

    console.log(db);

});