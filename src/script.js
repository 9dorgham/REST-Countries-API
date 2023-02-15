async function getData() {
    try {
        let respon = await fetch('./data.json');

        if (!respon.ok) {
            throw new Error(`HTTP error: ${respon.status}`)
        }

        let ob = await respon.json()
        return ob;
    }catch (er) {
        console.log(`Could not get data, Error type: ${er}`)
    }
}


// getData().then((ob) => {
//     console.log(ob);
// })