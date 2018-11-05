exports.seed = function(knex, Promise) {
  return knex('posts')
    .del() // delete existing posts
    .then(function() {
      return knex('posts').insert([
        {
          title:
            'I wish the ring had never come to me. I wish none of this had happened.',
          contents: 'Frodo Baggins'
        },
        {
          title: 'I think we should get off the road. Get off the road! Quick!',
          contents: 'Frodo Baggins'
        },
        {
          title:
            "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.",
          contents: 'Samwise Gamgee'
        },
        {
          title:
            "N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",
          contents: 'Samwise Gamgee'
        },
        {
          title:
            'You need people of intelligence on this sort of mission...quest...thing.',
          contents: 'Peregrin Took'
        },
        {
          title:
            'All you have to do is decide what to do with the time that is given to you.',
          contents: 'Gandalf the Gray'
        },
        {
          title:
            'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
          contents: 'Gandalf the Gray'
        },
        {
          title:
            'Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
          contents: 'Gandalf the Gray'
        },
        {
          title:
            'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
          contents: 'Gimli, son of Gloin'
        }
      ]);
    });
};
