const { supabaseAuth } = require('../lib/supabase.lib');
const { success, failure } = require('../lib/response.lib');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return failure(res, 'Email and password are required', 400);
    }

    const { data, error } = await supabaseAuth.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      if (error.code === 'user_already_exists') {
        return failure(res, error.message, 409);
      }
      return failure(res, error.message, 400);
    }

    return success(res, { user: data.user, session: data.session }, 201);
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return failure(res, 'Invalid credentials', 401);
    }

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return failure(res, 'Invalid credentials', 401);
    }

    return success(res, { user: data.user, session: data.session });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login };
