/* eslint-disable no-undef */
const connection = require('../server/database/config/connection');
const dbBuilder = require('../server/database/build/build');
const {
  getPostsQuery,
  checkExistUserQuery,
  getUserProfileQuery,
  checkUserHasVoteQuery,
  getPostVoteQuery,
  addPostVoteQuery,
  updatePostVoteQuery,
  getCommentsPostQuery,
  deleteCommentsPostQuery,
  createPostCommentQuery,
} = require('../server/database/queries');

const TimeNow = new Date();

// run after each test
beforeEach(() => dbBuilder());

// run after all test runs
afterAll(() => connection.end());

// Test ::  ===>  Table Users <=== :: In DataBase
describe('Test ::  ===>  Table Users <=== :: In DataBase', () => {
  test('Test Get User by Email  Should return (One), we have One user', () =>
    checkExistUserQuery('ahmed_qeshta@gmail.com').then(({ rowCount }) => {
      expect(rowCount).toBe(1);
    }));

  test('Test Get User by Email  Should return Zero - not found this user', () =>
    checkExistUserQuery('this.email.not.exist@gmail.com').then(
      ({ rowCount }) => {
        expect(rowCount).toBe(0);
      },
    ));

  test('Test Get User by ID Should return (One), we have One user', () =>
    getUserProfileQuery(1).then(({ rowCount }) => {
      expect(rowCount).toBe(1);
    }));

  test('Test Get User by ID Should return Zero - not found this user', () =>
    getUserProfileQuery(123515132).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    }));
});

// Test ::  ===>  Table Posts <=== :: In DataBase
describe('Test ::  ===>  Table Posts <=== :: In DataBase', () => {
  test('Test Get All Posts Should return (Three), we have three post', () =>
    getPostsQuery().then(({ rowCount }) => {
      expect(rowCount).toBe(3);
    }));
});

// Test ::  ===>  Table Votes  <=== :: In DataBase
describe('Test ::  ===>  Table Votes <=== :: In DataBase', () => {
  test('Test get Voted Post Should return (One), this have vote', () =>
    getPostVoteQuery(1).then(({ rowCount }) => {
      expect(rowCount).toBe(1);
    }));

  test('Test Check user has vote for post Should return (1), he has voted for this post', () =>
    checkUserHasVoteQuery(1, 1).then(({ rowCount }) => {
      expect(rowCount).toBe(1);
    }));

  test('Test get Voted Post Should return (One), this  have not vote', () =>
    getPostVoteQuery(123321).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    }));

  test('Test Check user has vote for post Should return (1), he has not voted for this post', () =>
    checkUserHasVoteQuery(1, 113215).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    }));

  test('Test user Create vote up for post Should return (1)', () =>
    addPostVoteQuery(3, 1, 1).then(({ rowCount, rows }) => {
      expect(rowCount).toBe(1);
      expect(rows[0].vote_number).toBe(1);
    }));

  test('Test user Create vote Down for post Should return (1)', () =>
    addPostVoteQuery(3, 1, -1).then(({ rowCount, rows }) => {
      expect(rowCount).toBe(1);
      expect(rows[0].vote_number).toBe(-1);
    }));

  test('Test user  Update vote to  Down for post Should return (1)', () =>
    updatePostVoteQuery(1, 1, 1, -1).then(({ rowCount, rows }) => {
      expect(rowCount).toBe(1);
      expect(rows[0].vote_number).toBe(-1);
    }));

  test('Test user Update vote to  Up for post Should return (1)', () =>
    updatePostVoteQuery(2, 1, 2, 1).then(({ rowCount, rows }) => {
      expect(rowCount).toBe(1);
      expect(rows[0].vote_number).toBe(1);
    }));
});

// Test ::  ===>  Table Comments  <=== :: In DataBase
describe('Test ::  ===>  Table Comments <=== :: In DataBase', () => {
  test('Test get Comments Post Should return true', () =>
    getCommentsPostQuery(1).then(({ rowCount }) => {
      expect(rowCount).toBe(3);
    }));

  test('Test create Post Comment Should return true', () =>
    createPostCommentQuery(1, 1, 'this is comment', TimeNow).then(
      ({ rowCount, rows }) => {
        expect(rowCount).toBe(1);
        expect(rows[0].post_id).toBe(1);
        expect(rows[0].user_id).toBe(1);
        expect(rows[0].content).toBe('this is comment');
      },
    ));
  test('Test delete Comments Post Should return true', () =>
    deleteCommentsPostQuery(9, 1).then(({ rowCount, rows }) => {
      expect(rowCount).toBe(1);
      expect(rows[0].id).toBe(9);
      expect(rows[0].post_id).toBe(3);
      expect(rows[0].user_id).toBe(1);
      expect(rows[0].content).toBe('This is the third comment for delete');
    }));

  test('Test get Comments Post Should return False, not found', () =>
    getCommentsPostQuery(10).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    }));

  test('Test delete Comments Post Should return False, not found', () =>
    deleteCommentsPostQuery(10, 1).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    }));
});
