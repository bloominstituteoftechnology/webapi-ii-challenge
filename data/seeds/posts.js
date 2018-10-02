exports.seed = function(knex, Promise) {
  return knex('posts')
    .del() // delete existing posts
    .then(function() {
      return knex('posts').insert([
        {
          title: 'Frodo Baggins',
          contents: 'I wish the ring had never come to me. I wish none of this had happened.'
        },
        {
          title: 'Guess who said this',
          contents: 'I think we should get off the road. Get off the road! Quick!'
        },
        {
          title: 'Guess who said this',
          contents:
            "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.", 
        },
        {
          title: 'Guess who said this',
          contents:
            " N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",         
        },
        {
          title: 'Guess who said this',
          contents:
            'You need people of intelligence on this sort of mission...quest...thing.',        
        },
        {
          title: 'Guess who said this',
          contents:
            'All you have to do is decide what to do with the time that is given to you.',   
        },
        {
          title: 'Guess who said this',
          contents: 'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
        },
        {
          title: 'Guess who said this',
          contents:
            ' Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
        },
        {
          title: 'Guess who said this',
          contents:
            'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
        },
      ]);
    });
};
