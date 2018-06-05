// import your node modules
const express = require( 'express' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const cors = require( 'cors' );

const db = require( './data/db.js' );

// add your server code starting here
const server = express();

//middleware
server.use( morgan( 'dev' ) );
server.use( helmet() );
server.use( express.json() );
server.use( cors() );

// i compare to app.js run this to make sure server is running
server.get( '/', function ( req, res )
{
    res.send( { api: 'Running..' } );

} );

// (1) | GET | /api/users | Returns an array of all the user objects contained in the database.
server.get( '/api/posts', ( req, res ) =>
{
    //get the users            //homies
    db
        .find()
        .then( posts =>
        {
            res.json( posts );
        } )
        .catch( error =>
        {
            res.status( 500 ).json( error );
            //do something with error
        } );
} );

// (2) | GET | /api/users /: id | Returns the user object with the specified id.   
server.get( '/api/posts/:id', ( req, res ) =>
{
    //grab the id from url parameters
    const { id } = req.params;


    db
        .findById( id )
        .then( posts =>
        {
            // console.log("my post", posts);
            if ( posts.length === 0 )
            {

                res.status( 404 ).json( { message: "The post with the specified ID does not exist." } )
            } else
            {

                res.json( posts );
            }
        } )
        .catch( error =>
        {
            //do something with error
            res.status( 500 ).json( { error: "The post information could not be retrieved." } );
        } );
} );

// (3) | POST | /api/users | Creates a user using the information sent inside the`request body`. 
//removes the user with the specified id and returns
server.post( '/api/posts', ( req, res ) =>
{
    const { title, contents } = req.body;
    if ( title === undefined || contents === undefined )
    {
        res.status( 400 ).json( { errorMessage: "Please provide title and contents for the post." } );
    } else
    {
        db
            .insert( req.body )
            .then( response =>
            {
                //if the information about the post is valid
                res.status( 201 ).json( response );
            } )
            .catch( err =>
            {

                // if the request body is missing title or contents
                if ( err.errno === title || contents )
                {
                    res.status( 400 ).json( {
                        msg: "Please provide title and contents for the post."
                    } );
                    //if there was a problem saving the post
                } else
                {

                    res.status( 500 ).json( { msg: "There was an error while saving the post to the database" } );

                }

            } );

    }


} );


//http://foo.com?search=bar&sort=asc
//req.query ==={search:'bar', sort:'asc'}
// (4) | DELETE | /api/users /: id | Removes the user with the specified id and returns the deleted user.  
server.delete( '/api/posts/:id', function ( req, res )
{
    let { id } = req.params;
    id = Number( id );


    db.remove( id )
        .then( result =>
        {
            if ( result === 0 )
            {
                res.status( 404 ).json( { message: "The post with the specified ID does not exist." } )
            } else
            {
                res.json( result )
            }
        } )
        .catch( error =>
        {
            res.status( 500 ).json( { error: "The post could not be removed" } );
        } )

} );




// (5) | PUT | /api/users /: id | Updates the user with the specified`id` using data from the`request body`.Returns the modified document, ** NOT the original **. |
//return the modifiyed document.
server.put( '/api/posts/:id', ( req, res ) =>
{
    //grab the id fromurl parameters
    const { id } = req.params;
    const update = req.body;


    db
        .update( id, update )
        .then( count =>
        {
            if ( count > 0 )
            {
                db.findById( id ).then( updatedposts =>
                {
                    res.status( 200 ).json( updatedpost )
                } );

            } else
            {
                res
                    .status( 404 )
                    .json( { message: 'The user with the specified ID does not exsist.' } );

            }

        } )


        .catch( error =>
        {
            res.status( 500 ).json( post );
            //do something with error
        } );

} );

const port = 5000;
server.listen( port, () => console.log( 'Server running on port ' ) );
