/* eslint-disable valid-typeof */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const authContainer = querySelector('#auth-container');
const logoutContainer = querySelector('#logout-container');
const authUsername = querySelector('#auth-username');
const btnLogout = querySelector('#auth-logout');
const loading = querySelector('#loading');

const textEmail = querySelector('#profile-email');
const textAge = querySelector('#profile-age');
const textBio = querySelector('#profile-bio');
const textPostCounts = querySelector('#profile-post-counts');
const textCommentPostCounts = querySelector('#profile-comment-post-counts');
const textVotePostCounts = querySelector('#profile-vote-post-counts');
const textImage = querySelector('#profile-image');
const userID = window.location.href.split('/')[5];

const profileBody = querySelector('#profile-body');

window.onload = () => {
  fetchCheckAuthLoginApi()
    .then(({ status, username }) => {
      if (status !== 200) {
        throw customError('Sorry You are not logged in', 400);
      }
      logoutContainer.classList.remove('hidden');
      authContainer.classList.add('hidden');
      authUsername.textContent = username;
    })
    .catch(() => {
      authContainer.classList.remove('hidden');
      logoutContainer.classList.add('hidden');
      authUsername.textContent = '';
    });
  // ---------------------- *** ------------------     Fetch Profile    ----------- *** --------------------------------
  fetchShowUserProfileApi(userID)
    .then(({ status, message, data }) => {
      if (status !== 200) {
        throw customError(
          'Sorry This User is not Exist! Please Use Valid user',
          400,
        );
      }

      if (data && !Array.isArray(data)) {
        const {
          email,
          username,
          age,
          bio,
          url_image: urlImage,
          post_counts: postCounts,
          comment_counts: commentCounts,
          vote_counts: voteCounts,
        } = data;
        authUsername.textContent = username;

        if (urlImage) {
          textImage.src = urlImage;
        }

        textEmail.textContent = `Email: ${email}`;
        textAge.textContent = `Age: ${age}` ?? '';
        textBio.textContent = `Bio: ${bio}` ?? '';
        textPostCounts.textContent =
          `You have : ${postCounts} Posts` ?? "You have't nay Post";
        textCommentPostCounts.textContent =
          `You have : ${commentCounts} Comments` ?? "You have't nay comment";
        textVotePostCounts.textContent =
          `You have : ${voteCounts} Votes` ?? "You have't nay Vote";
      } else {
        throw customError(message, 400);
      }
    })
    .catch(({ message }) => {
      profileBody.textContent = '';
      const notFound = createElement('p', 'not-found-user', profileBody);
      notFound.textContent = message;
    });

  // ---------------------- *** ------------------     handle Logout    ----------- *** --------------------------------
  const handleLogout = () => {
    fetchLogoutApi()
      .then(({ status, message }) => {
        if (status !== 200) {
          throw customError('Sorry You are not logged in', 400);
        }

        useAlert('Success', message, 'success', 'Ok', 'center', 2000, false);
        window.location.href = '/';
      })
      .catch(() =>
        useAlert(
          'Error',
          'Something was wrong ?',
          'error',
          'Ok',
          'center',
          2000,
          false,
        ),
      );
  };
  addListener('#auth-logout', 'click', handleLogout);

  loading.classList.add('hidden');
};
