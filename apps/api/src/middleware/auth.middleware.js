const { supabase } = require('../lib/supabase.lib');
const { failure } = require('../lib/response.lib');

function getBearerToken(authorizationHeader) {
  if (!authorizationHeader || typeof authorizationHeader !== 'string') {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return null;
  }

  return token;
}

async function requireAuth(req, res, next) {
  try {
    const token = getBearerToken(req.get('authorization'));

    if (!token) {
      return failure(res, 'Authorization bearer token is required', 401);
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return failure(res, 'Invalid or expired token', 401);
    }

    req.user = data.user;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { requireAuth };
