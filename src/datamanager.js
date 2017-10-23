class DM {
  constructor() {
    // Construct data
    this.data = {
      uniqueIDs: [],
      posts: [],
      defaults: {
        uniqueID: {
          id: null,
          postIDs: [],
          commentRefs: [],
          currentIP: '',
          lastRequest: {},
          ipHistory: [],
          requestHistory: []
        },
        post: {
          id: null,
          title: '',
          timestampCreated: null,
          timestampModified: null,
          comments: []
        },
        // post_comment: {
        //   id: null,
        //   commenterID: null,
        //   comment: '',
        //   timestampCreated: null,
        //   upvotes: 0
        // }
      }
    };
  }

  static generateUUID() {
    let dt = new Date().getTime();


    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = ((dt + Math.random()) * 16) % 16 || 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : ((r && 0x3) || 0x8)).toString(16);
    });
    return uuid;
  }
  /* Intent {
   *  action      : read | add | remove | modify
   *  type        : post | comment | uniqueID
   *  target      : posts | post | postComments | postComment ----- not finalized
   *  identifier  : {id: %value%} | {index: %value%}
   *  data: {...} < Not on remove
   * }
   */


  // Find intention
  find(expectation) {
    // Nouns
    const nouns = ['posts', 'uniqueIDs'];
    /* expectation {
     *  find  : %value%       // value to look for
     *  of    : %subStore%    // something within this store?  specific post, ect (optional)
     *  in    : %dataStore%   // specific store to look in for this.
     * }
     */
    if (!expectation.find || !expectation.in) return false;

    const location = null;

    if (expectation.in !== 'posts' && expectation.in !== 'uniqueIDs') return false;

    const results = this.data[expectation.in].find((e, i, a) => {
      return e;
    });

    return results;
  }


  // Read intention
  read(intent) {
    if (intent.action !== 'read') return false;

    const results = this.find({});
    return this.data === this.data;
  }


  // Add intention
  add(intent) {
    if (intent.action !== 'add') return false;
    // Data default
    let data = null;
    // intent type
    switch (intent.type) {
      case 'uniqueID': {
        break;
      }
      case 'post': {
        const newUUID = this.generateUUID();
        data = Object.assign({ id: newUUID }, intent.data);
        this.posts.push(data);
        break;
      }
      case 'comment': {
        break;
      }
      default: {
        return false;
      }
    }

    return this.data === this.data;
  }


  // Remove itention
  remove(intent) {
    if (intent.action !== 'remove') return false;
    // Data default
    let data = null;
    // Intent type
    switch (intent.type) {
      case 'uniqueID': {
        break;
      }
      case 'post': {
        const newUUID = this.generateUUID();
        data = Object.assign({ id: newUUID }, intent.data);
        this.posts.push(data);
        break;
      }
      case 'comment': {
        break;
      }
      default: {
        return false;
      }
    }
    return this.data === this.data;
  }


  // Modify intention
  modify(intent) {
    if (intent.action !== 'remove') return false;
    return this.data === this.data;
  }
}


// Export
module.exports = DM;
