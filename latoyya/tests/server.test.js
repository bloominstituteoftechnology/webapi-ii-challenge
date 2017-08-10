const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../src/server.js');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH = '/posts';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

// allows us to make and test HTTP requests
chai.use(chaiHTTP);

const expect = chai.expect;

/* Expects the status code expected from the given response, res. Throws
 * a useful error message if the expectation is not met. The request
 * method is used to improve error messages. */
const expectStatus = (expected, res, method) => {
  // We assume the status *isn't* expected to be STATUS_SERVER_ERROR or
  // STATUS_NOT_FOUND; in these cases, we have custom error messages that
  // help the student out (see switch statement below).
  if (expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
    throw new Error(
      'The expected status should be something other than ' +
      `${STATUS_SERVER_ERROR} and ${STATUS_NOT_FOUND}`
    );
  }

  switch (res.status) {
    case STATUS_SERVER_ERROR:
      throw new Error(
        `Your server threw an error during ${method} ${PATH} (status code ` +
        '500); scroll up to see the expection and backtrace'
      );

    case STATUS_NOT_FOUND:
      throw new Error(
        `You haven't implemented a handler for ${method} ${PATH} (status ` +
        'code 404)'
      );

    default:
      if (expected !== res.status) {
        const msg = `Expected status ${expected} but got ${res.status} from ` +
          `${method} ${PATH}`;
        throw new Error(msg);
      }

      /* eslint no-unused-expressions: 0 */
      // This is the correct way to make the expectation, even though it seems odd.
      expect(res).to.be.json;

      if (expected === STATUS_USER_ERROR) {
        expect(res.body).to.have.property('error');
      }
  }
};

/* Makes a request using the given method to the provided path. If body is
 * given, sends it along with the request. Checks for the expected status. */
const req = (method, status, body = null, path = PATH) => {
  const property = method.toLowerCase();
  let request = chai.request(server.server)[property](path);

  if (body) {
    request = request.send(body);
  }

  return request
    .catch((err) => {
      // For status codes like 404, 500, and 422, the promise fails and contains
      // a response property in the error object. We want to rescue these cases
      // and return the response object normally. That way we can have a single
      // handler that checks status properly in all cases.
      if (err.response) {
        return err.response;
      }
      throw err;
    })
    .then((res) => {
      expectStatus(status, res, method);
      return res.body;
    });
};

/* Adds the given post object to the array of posts by making a request. Sets
 * the post object's id based on what's returned by the server. */
const addPost = (post) => {
  return req(METHOD_POST, STATUS_OK, post).then((newPost) => {
    expect(newPost).to.have.property('title').that.equals(post.title);
    expect(newPost).to.have.property('contents').that.equals(post.contents);
    expect(newPost).to.have.property('id').that.is.a('number');

    // We do this so the post object is always up-to-date. It can then be
    // compared to the existing posts during a subsequent get request.
    post.id = newPost.id;
    return post;
  });
};

describe('Request', () => {
  beforeEach(() => {
    // Reset posts before each test. Note that we must modify the array inline,
    // not reassign the array.
    server.posts.splice(0, server.posts.length);
  });

  describe(`${METHOD_GET} ${PATH}`, () => {
    it('retrieves the list of posts', () => {
      return req(METHOD_GET, STATUS_OK)
        .then(posts => expect(posts).to.have.length(0));
    });

    it('filters the post by title if a search term if given', () => {
      const posts = [
        { title: 'first title', contents: 'contents' },
        { title: 'second', contents: 'contents' },
        { title: 'third title', contents: 'contents' },
      ];

      return Promise.all(posts.map(p => addPost(p)))
        .then(() => req(METHOD_GET, STATUS_OK, null, `${PATH}?term=title`))
        .then((found) => {
          expect(found).to.have.length(2);
          expect(found).to.deep.include(posts[0]);
          expect(found).to.deep.include(posts[2]);
        });
    });

    it('filters the post by contents if a search term if given', () => {
      const posts = [
        { title: 'title', contents: 'hi there' },
        { title: 'title', contents: 'hello' },
        { title: 'title', contents: 'hey there' },
      ];

      return Promise.all(posts.map(p => addPost(p)))
        .then(() => req(METHOD_GET, STATUS_OK, null, `${PATH}?term=hello`))
        .then((found) => {
          expect(found).to.have.length(1);
          expect(found).to.deep.include(posts[1]);
        });
    });
  });

  describe(`${METHOD_POST} ${PATH}`, () => {
    it('adds a post', () => {
      const post = { title: 'first title', contents: 'first contents' };
      return addPost(post)
        .then(() => req(METHOD_GET, STATUS_OK))
        .then((posts) => {
          expect(posts).to.have.length(1);
          expect(posts[0]).to.deep.equal(post);
        });
    });

    it('reports a missing title', () => {
      return req(METHOD_POST, STATUS_USER_ERROR, { contents: 'contents' });
    });

    it('reports missing contents', () => {
      return req(METHOD_POST, STATUS_USER_ERROR, { title: 'title' });
    });
  });

  describe(`${METHOD_PUT} ${PATH}`, () => {
    it('updates a post', () => {
      const post1 = { title: 'first title', contents: 'first contents' };
      const post2 = { title: 'second title', contents: 'second contents' };
      const updates = { title: 'new title', contents: 'new contents' };

      return Promise.all([addPost(post1), addPost(post2)])
        .then(() => {
          // post2's id property is set in the addPost() call
          const updatedPost = Object.assign({ id: post2.id }, updates);
          return req(METHOD_PUT, STATUS_OK, updatedPost);
        })
        .then((updatedPost) => {
          expect(updatedPost).to.deep.equal(Object.assign({}, post2, updates));
          return req(METHOD_GET, STATUS_OK);
        })
        .then((posts) => {
          expect(posts).to.have.length(2);
          expect(posts).to.deep.include(post1);
          expect(posts).to.deep.include(Object.assign({}, post2, updates));
        });
    });

    it('reports a missing id', () => {
      const body = { title: 'new title', contents: 'new contents' };
      return req(METHOD_PUT, STATUS_USER_ERROR, body);
    });

    it('reports a bad id', () => {
      const body = { id: 1, title: 'new title', contents: 'new contents' };
      return req(METHOD_PUT, STATUS_USER_ERROR, body);
    });

    it('reports a missing title', () => {
      return addPost({ title: 'title', contents: 'contents' })
        .then((post) => {
          const body = { id: post.id, contents: 'new contents' };
          return req(METHOD_PUT, STATUS_USER_ERROR, body);
        });
    });

    it('reports missing contents', () => {
      return addPost({ title: 'title', contents: 'contents' })
        .then((post) => {
          const body = { id: post.id, title: 'new title' };
          return req(METHOD_PUT, STATUS_USER_ERROR, body);
        });
    });
  });

  describe(`${METHOD_DELETE} ${PATH}`, () => {
    it('deletes a post', () => {
      const post1 = { title: 'first title', contents: 'first contents' };
      const post2 = { title: 'second title', contents: 'second contents' };

      return Promise.all([addPost(post1), addPost(post2)])
        .then(() => {
          // post1's id property is set in the addPost() call
          return req(METHOD_DELETE, STATUS_OK, { id: post1.id });
        })
        .then((body) => {
          expect(body).to.deep.equal({ success: true });
          return req(METHOD_GET, STATUS_OK);
        })
        .then((posts) => {
          expect(posts).to.have.length(1);
          expect(posts).to.deep.include(post2);
        });
    });

    it('reports a missing id', () => {
      return req(METHOD_DELETE, STATUS_USER_ERROR);
    });

    it('reports a bad id', () => {
      return req(METHOD_DELETE, STATUS_USER_ERROR, { id: 1 });
    });
  });
});
