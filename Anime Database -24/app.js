const express = require('express');
const port = 3000;
const app = express();
const path = require('path');

//setting access to static files and client data
app.use(express.static(path.join(__dirname, 'public')));

// setting views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// #FIXME REFACTOR FUNCTION FOR REUSABILITY;
//* RENDERING ANIME DATA
app.get('/', async (req, res) => {
    try {
        const animeData = await getAnime();
        //!this logic should really be in the controller function. will work when refactoring entire project
        const attributes = animeData.map(({ attributes }) => {
            console.log(attributes);
            const {

                canonicalTitle: title,
                averageRating: rating,
                synopsis,
                posterImage: { original: image }
            } = attributes;
            return { title, rating, synopsis, image };
            //!end of logic that should be moved to controller

        });
        res.render('pages/index', { attributes });
    } catch (error) {
        console.log(error);
    };
});
//* FETCHING ANIME DATA FROM THE API
const getAnime = async () => {
    try {
        const response = await fetch('https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=4');
        if (response.status !== 200) {
            throw new Error(`REJECTED FETCH: Cannot fetch the data, ${response.status} ${response.statusText}`);
        }
        //* takes the above response data from the endpoint and converts it to json
        const { data } = await response.json();
        return data;
        // }
    } catch (error) {
        console.error(`Request Failed: ${error.message}} `);
    };
};

// #FIXME SETUP FUNCTION TO RETRIEVE TRENDING ANIME FOR CAROUSEL;


app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
});

